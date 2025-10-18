import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .max(50, { message: "First name cannot exceed 50 characters" })
    .optional(),

  lastName: z
    .string()
    .max(50, { message: "Last name cannot exceed 50 characters" })
    .optional(),

  phoneNumber: z
    .string()
    .regex(/^(010|011|012|015)[0-9]{8}$/, {
      message: "Phone number must be a valid Egyptian number (010/011/012/015)",
    })
    .optional(),

  profileImageUrl: z
    .string()
    .max(255, { message: "Profile image URL cannot exceed 255 characters" })
    .optional(),
});
