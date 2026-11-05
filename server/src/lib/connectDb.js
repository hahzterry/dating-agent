
import mongoose from "mongoose";

let pendingConnection;

export async function connectDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  if (!pendingConnection) {
    pendingConnection = mongoose.connect(
      process.env.MONGODB_URI,
      {
        serverSelectionTimeoutMS: 10000
      }
    ).catch((error) => {
      pendingConnection = undefined;
      throw error;
    });
  }

  await pendingConnection;
  return mongoose.connection;
}
