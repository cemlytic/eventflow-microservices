import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("MongoDB connected.")
  } catch (error) {
    console.error(error);
  }
}
