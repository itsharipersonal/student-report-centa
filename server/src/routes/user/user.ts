import express from "express";
import { body } from "express-validator";

import { validateRequest } from "@hkticket/common";

import { userControllers } from "../../controllers/user-controllers/user-controllers";
import { checkSession } from "../../middleware/verifyAuth";

const router = express.Router();

router.post(
  "/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("rollno")
      .isNumeric()
      .isLength({ min: 6, max: 6 })
      .withMessage("RollNo must be a 6-digit number"),
    body("fullname")
      .isString()
      .isLength({ min: 4, max: 30 })
      .withMessage("Fullname must be between 4 and 30 characters"),
  ],
  validateRequest,
  userControllers.signup
);

router.post(
  "/users/verify",
  checkSession,
  [
    body("otp")
      .isNumeric()
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP must be a 6-digit number"),
  ],
  validateRequest,
  userControllers.verify
);

router.post("/users/signout", userControllers.signout);

export { router as userRouter };
