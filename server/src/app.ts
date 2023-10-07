import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { errorHandler, NotFoundError } from "@hkticket/common";

import cookieSession from "cookie-session";
import { userRouter } from "./routes/user/user";
import { adminRouter } from "./routes/admin/admin";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    name: "session",
    signed: false,
    secure: process.env.NODE_ENV !== "test",
    maxAge: 20 * 60 * 60 * 1000,
  })
);

app.use("/api", userRouter);
app.use("/api/admin", adminRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
