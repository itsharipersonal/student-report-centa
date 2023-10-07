import { Request, Response } from "express";
import { BadRequestError } from "@hkticket/common";
import { client } from "../../database/db";
import { generateOTP } from "../../utils/otp-genarator";
import { CombinedData } from "../../utils/combineData";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Password } from "../../services/password";

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
  signout: (req: Request, res: Response) => {
    req.session = null;
    res.send({});
  },
};

export { adminControllers };
