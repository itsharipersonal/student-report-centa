import { app } from "./app";
import { connectToDatabase } from "./database/db";

const start = async () => {
  console.log("starting...");

  connectToDatabase();

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
