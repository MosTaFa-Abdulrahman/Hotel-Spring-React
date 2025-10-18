import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username must not exceed 50 characters")
      .trim(),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Email should be valid")
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must not exceed 50 characters")
      .trim(),

    confirmPassword: z.string().min(1, "Please confirm your password").trim(),

    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must not exceed 50 characters")
      .trim(),

    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must not exceed 50 characters")
      .trim(),

    phoneNumber: z.string().min(1, "Phone number is required").trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email should be valid")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters")
    .trim(),
});
