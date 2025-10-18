import { z } from "zod";

export const createPaymentSchema = z.object({
  bookingId: z
    .string({
      required_error: "Booking ID is required",
    })
    .uuid("Booking ID must be a valid UUID"),

  amount: z.coerce // Add coerce to convert string to number automatically
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0")
    .refine((val) => {
      const str = val.toString();
      const parts = str.split(".");
      if (parts.length === 1) return true;
      return parts[0].length <= 10 && parts[1].length <= 2;
    }, "Amount must have at most 10 digits and 2 decimal places"),

  notes: z.string().optional().nullable(),
});

export const payShortageSchema = z.object({
  paymnetId: z
    .string({
      required_error: "Payment ID is required",
    })
    .uuid("Payment ID must be a valid UUID"),

  shortageAmount: z.coerce // Add coerce to convert string to number automatically
    .number({
      required_error: "Shortage Amount is required",
      invalid_type_error: "Shortage Amount must be a number",
    })
    .positive("Shortage Amount must be greater than 0")
    .refine((val) => {
      const str = val.toString();
      const parts = str.split(".");
      if (parts.length === 1) return true;
      return parts[0].length <= 10 && parts[1].length <= 2;
    }, "Shortage Amount must have at most 10 digits and 2 decimal places"),
});
