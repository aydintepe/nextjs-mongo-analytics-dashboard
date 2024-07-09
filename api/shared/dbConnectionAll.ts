import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

/**
 * Prevent the app from starting if there's no DB.
 */
const ADMIN_DATABASE_URI = process.env.API_DATABASE || "";
if (!ADMIN_DATABASE_URI) {
  throw new Error("No API_DATABASE_ALL provided in env");
}



export function DbConnectionAll(databaseName: string) {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      await mongoose.connect(ADMIN_DATABASE_URI, {
        dbName: databaseName
      })
      const result = await originalMethod.apply(this, args);
      return result;
    };

    return descriptor;
  };
}
