import { Client } from "pg";

const POSTGRES_URI: string | undefined = process.env.POSTGRES_URI;

console.log("starting...");
if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be defined");
}

const client = new Client({
  connectionString: POSTGRES_URI,
});

async function connectToDatabase(): Promise<void> {
  try {
    // Connect to the PostgreSQL server
    await client.connect();
    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
  }
}

export { client, connectToDatabase };
