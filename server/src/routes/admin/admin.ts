import express from "express";
import { body } from "express-validator";
import { currentUser, validateRequest } from "@hkticket/common";

import { adminControllers } from "../../controllers/admin-controllers/admin-controllers";

const router = express.Router();


router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  adminControllers.signin
);
router.get("/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

router.post("/signout", adminControllers.signout);

export { router as adminRouter };
