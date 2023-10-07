import { Request, Response } from "express";
import { BadRequestError } from "@hkticket/common";
import { client } from "../../database/db";
import { generateOTP } from "../../utils/otp-genarator";
import { CombinedData } from "../../utils/combineData";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Password } from "../../services/password";
import csv from "csv-parser";
import xlsx from "xlsx";
import { sendEmail } from "../../services/mailer";

const adminControllers = {
  signin: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
      // Check if the user already exists in the database
      const existingUser = await client.query(
        "SELECT * FROM  admin_table WHERE email = $1",
        [email]
      );

      const admin = existingUser.rows[0];
      if (existingUser.rows.length === 0) {
        throw new BadRequestError("Invalid credentials");
      }

      const passwordsMatch = await Password.compare(admin.password, password);

      if (!passwordsMatch) {
        throw new BadRequestError("Invalid Credentials");
      }
      delete admin.password;

      const userJwt = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      res.send(admin);
    } catch (error: any) {
      console.error(error);
      throw new BadRequestError(
        error.message || "Error occurred during OTP generation or email sending"
      );
    }
  },

  upload: async (req: Request, res: Response) => {
    try {
      const fileBuffer = req.file?.buffer;
      const fileType = req.file?.mimetype;

      let data: any[] = [];

      if (
        fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Handle Excel file (XLSX)
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      } else if (fileType === "text/csv") {
        // Handle CSV file
        data = [];
        const stream = csv({ separator: "," })
          .on("data", (row) => {
            data.push(row);
          })
          .on("end", () => {
            console.log("csv");
          });
        stream.end(fileBuffer);
      } else {
        return res.status(400).send("Unsupported file type");
      }
      const insertQuery = `
  INSERT INTO student_mark_list_table (
    full_name, email, phone, subject, test_taking_date, full_marks, mark_obtained, overall_percentage
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  ON CONFLICT (email) DO NOTHING
`;

      const insertPromises = data.map(async (record) => {
        const values = [
          record["Full name"],
          record.Email,
          record.Phone,
          record.Subject,
          record["Test taking date"],
          record["Full marks"],
          record["Mark obtained"],
          record["Overall percentage"],
        ];
        return await client.query(insertQuery, values);
      });

      const selectQuery = "SELECT * FROM student_mark_list_table";

      client
        .query(selectQuery)
        .then((result) => {
          console.log("result", result.rows);

          res.status(201).send(result.rows);
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while fetching data." });
        });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error processing the file");
    }
  },

  signout: (req: Request, res: Response) => {
    req.session = null;
    res.send({});
  },

  studentMarklist: (req: Request, res: Response) => {
    const selectQuery = "SELECT * FROM student_mark_list_table";

    client
      .query(selectQuery)
      .then((result) => {
        res.status(201).send(result.rows);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching data." });
      });
  },

  generateReportcard: (req: Request, res: Response) => {
    console.log("hey");

    const generateReportcardQuery = `
      INSERT INTO student_report_card_table (
        full_name,
        email,
        phone,
        subject,
        test_taking_date,
        full_marks,
        mark_obtained,
        overall_percentage
      )
      SELECT
        full_name,
        email,
        phone,
        subject,
        test_taking_date,
        full_marks,
        mark_obtained,
        overall_percentage
      FROM student_mark_list_table src
      WHERE CAST(REPLACE(src.overall_percentage, '%', '') AS NUMERIC) >= 60
      AND NOT EXISTS (
        SELECT 1
        FROM student_report_card_table dest
        WHERE dest.email = src.email
      )
    `;

    client
      .query(generateReportcardQuery)
      .then((result) => {
        const insertStudentsData = `
    INSERT INTO students_table (name, email, report_card_id)
    SELECT full_name, email,id
    FROM student_report_card_table;
`;
        client.query(insertStudentsData).then((result) => {
          console.log(result, "insert student");

          // Fetch student data including email and name from the database
          const fetchStudentEmailsQuery = `
      SELECT email, full_name
      FROM student_report_card_table;
    `;

          client.query(fetchStudentEmailsQuery).then((result) => {
            const students = result.rows;

            // Iterate through the students and send emails
            students.forEach((student) => {
              const { email, full_name } = student;
              sendEmail(email, full_name);
            });

            res.status(201).send({ inserted: true });
          });
        });
      })

      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching data." });
      });
  },

  currentUser: (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  },
};

export { adminControllers };
