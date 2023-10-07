import { Request, Response } from "express";
import { BadRequestError } from "@hkticket/common";
import { client } from "../../database/db";
import { generateOTP } from "../../utils/otp-genarator";
import * as schedule from "node-schedule";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const userControllers = {
  signup: async (req: Request, res: Response) => {
    const { email, rollno, fullname } = req.body;

    try {
      // Check if the user already exists in the database
      const existingUser = await client.query(
        "SELECT * FROM  admin_student_table WHERE rollno = $1",
        [rollno]
      );

      const user = existingUser.rows[0];

      if (!user) {
        throw new Error("Student with this roll number not exists");
      }
      console.log(user);

      const otp: number = generateOTP();
      console.log(`Generated OTP: ${otp} ${typeof otp}`);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "cardstudent030@gmail.com",
          pass: "aaiw gbhs wohr ajpt",
        },
      });

      const mailOptions = {
        from: "cardstudent030@gmail.com",
        to: email,
        subject: `OTP for registration is: ${otp}`,
        html: `
          <div style="background-color: #f2f2f2; padding: 20px; text-align: center;">
            <h1 style="color: #0073e6; font-weight: bold;">Greetings from TT University</h1>
            <h3 style="color: #333;">OTP for account verification is:</h3>
            <h1 style="color: #0073e6; font-weight: bold; background-color: #fff; padding: 10px;">${otp}</h1>
          </div>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      //BEFORE SENDING OTP I WANT TO CONFIRM NO OTPS ATTCHED TO THIS ROLLNO
      const deleteQuery =
        "DELETE FROM student_otp_table WHERE student_rollno = $1";
      const deleted = await client.query(deleteQuery, [rollno]);
      console.log("deleted", deleted);
      //INSERTING
      const insertQuery =
        "INSERT INTO student_otp_table (student_rollno, otp) VALUES ($1, $2) RETURNING *";
      // Execute the query to insert data
      client.query(insertQuery, [rollno, otp]);

      // Define a function to delete old OTP records
      async function deleteOldOTPRecords() {
        try {
          const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000); // 2 minutes ago

          // Execute the SQL query to delete old OTP records
          const query = "DELETE FROM student_otp_table WHERE created_at < $1";
          const result = await client.query(query, [twoMinutesAgo]);

          console.log(`Deleted ${result.rowCount} old OTP records`);
        } catch (error) {
          console.error("Error deleting old OTP records:", error);
        }
      }

      // Schedule the task to run every minute (adjust as needed)
      const job = schedule.scheduleJob("* * * * *", deleteOldOTPRecords);

      console.log("Cron job for deleting old OTP records started.");

      res.send(user);
    } catch (error: any) {
      console.log("hey");

      console.error(error);
      throw new BadRequestError(
        error.message || "Error occurred during OTP generation or email sending"
      );
    }
  },

  verify: async (req: Request, res: Response) => {
    console.log(req.body);

    try {
      const { otp, rollno } = req.body;

      // Convert the input OTP to a number
      const inputOtp = parseInt(otp);

      //fetching otp from psql with rollno from client
      const selectQuery =
        "SELECT * FROM student_otp_table WHERE student_rollno = $1";
      const otpFetch = await client.query(selectQuery, [rollno]);

      const serverOtp = otpFetch.rows[0];
      const otpOrg = parseInt(serverOtp.otp);
      console.log(otpOrg);

      if (inputOtp !== otpOrg) {
        throw new BadRequestError("OTP is not valid");
      } else {
        console.log("matches");
        const deleteQuery =
          "DELETE FROM student_otp_table WHERE student_rollno = $1";
        const deleted = await client.query(deleteQuery, [rollno]);
        console.log("deleted", deleted);
      }
      const user = { rollno };
      res.status(200).json({ user });
    } catch (error: any) {
      console.error(error);
      throw new BadRequestError(
        error.message || "Error occurred during OTP verification"
      );
    }
  },

  signout: (req: Request, res: Response) => {
    req.session!.studentSession = null;
    console.log("session", req.session);

    res.send({});
  },
};

export { userControllers };
