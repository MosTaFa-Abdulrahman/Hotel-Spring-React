import { z } from "zod";

export const createHotelSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email should be valid"),

  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name must not exceed 200 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),

  address: z.string().min(1, "Address is required"),

  city: z.string().min(1, "City is required"),

  country: z.string().min(1, "Country is required"),

  postalCode: z.string().min(1, "Postal Code is required"),

  phoneNumber: z
    .string()
    .min(1, "Phone Number is required")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Invalid phone number format"
    ),

  imageUrl: z
    .string()
    .min(1, "Image is required")
    .url("Must be a valid image URL"),
});

export const updateHotelSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name must not exceed 200 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),

  address: z.string().min(1, "Address is required"),

  city: z.string().min(1, "City is required"),

  country: z.string().min(1, "Country is required"),

  postalCode: z.string().min(1, "Postal Code is required"),

  phoneNumber: z
    .string()
    .min(1, "Phone Number is required")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Invalid phone number format"
    ),

  imageUrl: z
    .string()
    .min(1, "Image is required")
    .url("Must be a valid image URL"),
});
