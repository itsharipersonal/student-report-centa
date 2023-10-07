import express from "express";
import { body } from "express-validator";

import { validateRequest } from "@hkticket/common";

import { userControllers } from "../../controllers/user-controllers/user-controllers";
import { currentStudent } from "../../middleware/currentStudent";

const router = express.Router();

router.post(
  "/users/signup",
  [body("email").isEmail().withMessage("Email must be valid")],
  validateRequest,
  userControllers.signup
);

router.post(
  "/users/verify",
  [
    body("otp")
      .isNumeric()
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP must be a 6-digit number"),
  ],
  validateRequest,
  userControllers.verify
);
router.get(
  "/users/currentstudent/",currentStudent,
  userControllers.currentStudent
);
router.post("/users/signout", userControllers.signout);
router.post("/users/viewfiles",userControllers.viewfiles)

export { router as userRouter };
