import { z } from "zod";

// Enums
export const RoomTypeEnum = z.enum([
  "BEDROOM",
  "MASTER_BEDROOM",
  "SINGLE_BEDROOM",
  "DOUBLE_BEDROOM",
  "STANDARD",
  "DELUXE",
  "SUITE",
  "PRESIDENTIAL_SUITE",
  "FAMILY_ROOM",
]);

export const createRoomSchema = z.object({
  roomNumber: z
    .string()
    .min(1, "Room number is required")
    .max(90, "Room number must not exceed 90 characters"),

  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" }),

  imageUrl: z.string().url({ message: "Invalid image URL" }).optional(),

  pricePerNight: z
    .string()
    .min(1, "Price per night is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0.01, {
      message: "Price per night must be greater than 0",
    }),

  capacity: z
    .string()
    .min(1, "Capacity is required")
    .max(10, { message: "Capacity must not exceed 10" }),

  // Boolean amenities
  hasWifi: z.boolean().optional(),
  hasAirConditioning: z.boolean().optional(),
  hasTv: z.boolean().optional(),
  hasMiniBar: z.boolean().optional(),
  hasBalcony: z.boolean().optional(),
  hasPrivateBathroom: z.boolean().optional(),
  bookableIndividually: z.boolean().optional(),

  roomType: RoomTypeEnum,

  hotelId: z
    .string({ required_error: "Hotel ID is required" })
    .uuid({ message: "Invalid hotel ID" }),

  apartmentId: z
    .string()
    .optional()
    .refine(
      (val) => {
        // If undefined or empty string, it's valid (optional field)
        if (!val || val === "") return true;
        // If has value, must be valid UUID
        const uuidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(val);
      },
      {
        message: "Invalid apartment ID",
      }
    ),
});

export const updateRoomSchema = z.object({
  roomNumber: z
    .string()
    .min(1, "Room number is required")
    .max(90, "Room number must not exceed 90 characters"),

  description: z.string().optional(),

  imageUrl: z
    .string()
    .url({ message: "Invalid image URL" })
    .optional()
    .or(z.literal("")),

  pricePerNight: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === "") return true; // Allow empty
        return !isNaN(parseFloat(val)) && parseFloat(val) >= 0.01;
      },
      {
        message: "Price per night must be greater than 0",
      }
    ),

  capacity: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === "") return true; // Allow empty
        const num = parseInt(val);
        return !isNaN(num) && num >= 1 && num <= 10;
      },
      {
        message: "Capacity must be between 1 and 10",
      }
    ),

  isAvailable: z.boolean().optional(),
  hasWifi: z.boolean().optional(),
  hasAirConditioning: z.boolean().optional(),
  hasTv: z.boolean().optional(),
  hasMiniBar: z.boolean().optional(),
  hasBalcony: z.boolean().optional(),
  hasPrivateBathroom: z.boolean().optional(),
  bookableIndividually: z.boolean().optional(),

  roomType: RoomTypeEnum.optional(),

  hotelId: z
    .string({ required_error: "Hotel ID is required" })
    .uuid({ message: "Invalid hotel ID" })
    .optional(),

  apartmentId: z.string().uuid({ message: "Invalid apartment ID" }).optional(),
});
