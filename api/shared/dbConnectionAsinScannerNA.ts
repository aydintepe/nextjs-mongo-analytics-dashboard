import mongoose from "mongoose";

/**
 * Prevent the app from starting if there's no DB.
 */
const DATABASE_URI = process.env.API_DATABASE_ASIN_SCANNER_NA || "";
if (!DATABASE_URI) {
  throw new Error("No API_DATABASE_ASIN_SCANNER_NA provided in env");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  var mongoose: any;
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnectionAsinScannerNA() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(DATABASE_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export function DbConnectionAsinScannerNA() {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      await dbConnectionAsinScannerNA();
      const result = await originalMethod.apply(this, args);
      return result;
    };

    return descriptor;
  };
}

export default dbConnectionAsinScannerNA;
