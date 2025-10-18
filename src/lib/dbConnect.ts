import mongoose from "mongoose";

type ConnectObject = {
  isConnected?: number;
};

const connection: ConnectObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("db", db);
    console.log("Database connection state:", db.connections);
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

export default dbConnect;
