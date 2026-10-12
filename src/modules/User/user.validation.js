import z from "zod";
import { GenderEnum } from "./user.types.js";

export const signupSchema = {
  body: z.strictObject({
    fullname: z.string(),
    email: z.email(),
    phone: z.string(),
    password: z.string().min(10).max(15),
    age: z.number().optional(),
    gender: z.enum(GenderEnum),
    userName: z.string(),
    bio: z.string().optional(),
  }),
  query: z.strictObject({
    id: z.string(),
  }),
};
