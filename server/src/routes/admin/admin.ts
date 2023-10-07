import express from "express";
import { body } from "express-validator";
import { currentUser, validateRequest } from "@hkticket/common";
import multer from "multer";

import { adminControllers } from "../../controllers/admin-controllers/admin-controllers";
import { requireAuth } from "../../middleware/require-auth";

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
router.get("/currentuser", currentUser, adminControllers.currentUser);

router.post(
  "/upload",
  requireAuth,
  upload.single("file"),
  adminControllers.upload
);

router.get("/studentmarklist", requireAuth, adminControllers.studentMarklist);

router.post(
  "/generatereportcard",
  requireAuth,
  adminControllers.generateReportcard
);

router.post("/signout", adminControllers.signout);

export { router as adminRouter };



