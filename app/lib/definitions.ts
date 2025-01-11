import { z } from "zod";

export const validateForm = z.object({
  name: z
    .string()
    .min(2, { message: "Length of name should be greater than 2" })
    .max(50, { message: "Name should be less than 50" })
    .trim(),

  email: z
    .string()
    .min(2, { message: "Length of name should be greater than 2" })
    .max(50, { message: "Name should be less than 50" })
    .trim(),

  password: z
    .string()
    .min(2, { message: "Length of name should be greater than 2" })
    .max(50, { message: "Name should be less than 50" })
    .trim(),
});
