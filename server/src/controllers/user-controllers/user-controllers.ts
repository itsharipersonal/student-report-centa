import { Request, Response } from "express";
import { BadRequestError } from "@hkticket/common";
import { client } from "../../database/db";
import { generateOTP } from "../../utils/otp-genarator";
import * as schedule from "node-schedule";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { currentStudent } from "../../middleware/currentStudent";

const userControllers = {
  signup: async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      // Check if the user already exists in the database
      const existingUser = await client.query(
        "SELECT * FROM students_table WHERE email = $1",
        [email]
      );

      const user = existingUser.rows[0];

      if (!user) {
        throw new Error("Student with this Email not exists");
      }
      console.log(user, "user is avilable");

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
      //Otp saving in session
      req.session!.otp = otp;
      req.session!.email = email;

      // Define a function to delete old OTP records
      async function deleteOldOTPRecords() {
        try {
          const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000); // 2 minutes age
          //Deleting session
          req.session!.otp = null;
          console.log(`Deleted ${req.session!.otp} old OTP records`);
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
    try {
      const { otp } = req.body;
      if (!otp == req.session?.otp) {
        throw new BadRequestError("otp didnt match");
      }
      req.session!.otp = null;
      req.session!.user = req.session!.email;
      req.session!.email = null;
      console.log(req.session!.user);
      const user = req.session!.user;

      res.send({ user });
    } catch (error: any) {
      console.error(error);
      throw new BadRequestError(
        error.message || "Error occurred during OTP verification"
      );
    }
  },
  currentStudent: (req: Request, res: Response) => {
    res.send({ currentStudent: req.session!.user || null });
  },
  signout: (req: Request, res: Response) => {
    req.session!.studentSession = null;
    console.log("session", req.session);

    res.send({});
  },
  viewfiles: async (req: Request, res: Response) => {
    const { isAuth } = req.body;
    console.log(req.body);
    try {
      const fetchVerifiedUserDataQuery = `
        SELECT
            students_table.student_id,
            students_table.name,
            students_table.email,
            student_report_card_table.id,
            student_report_card_table.subject,
            student_report_card_table.phone,
            student_report_card_table.test_taking_date,
            student_report_card_table.full_marks,
            student_report_card_table.mark_obtained,
            student_report_card_table.overall_percentage
        FROM
            students_table
        INNER JOIN
            student_report_card_table
        ON
            students_table.email = student_report_card_table.email
        WHERE
            students_table.email = $1;
      `;

      const result = await client.query(fetchVerifiedUserDataQuery, [isAuth]);

      if (result.rows.length > 0) {
        console.log(
          "Verified User Data and Report Card Data (by email match):"
        );
        console.table(result.rows[0]);
        res.send(result.rows[0]);
      } else {
        console.log(`No verified data found for email: ${isAuth}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
};

export { userControllers };
