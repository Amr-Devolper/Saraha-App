import mongoose from "mongoose";
import chalk from "chalk";
import {config} from "dotenv"

config({ path : "./config/.env" })

export const DBconnection = async () => {
  try {
    await  mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(chalk.green("MongoDB connected successfully"));
  } catch (error) {
    console.log(chalk.red("MongoDB connection failed"));
  }
};
