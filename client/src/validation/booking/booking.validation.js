import { z } from "zod";

export const createBookingSchema = z
  .object({
    checkInDate: z
      .string()
      .min(1, "Check-in date is required")
      .refine((date) => {
        const checkIn = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return checkIn > today;
      }, "Check-in date must be in the future"),

    checkOutDate: z
      .string()
      .min(1, "Check-out date is required")
      .refine((date) => {
        const checkOut = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return checkOut > today;
      }, "Check-out date must be in the future"),

    numberOfGuests: z
      .number({
        required_error: "Number of guests is required",
        invalid_type_error: "Number of guests must be a number",
      })
      .int("Number of guests must be an integer")
      .min(1, "Number of guests must be at least 1")
      .max(50, "Number of guests must not exceed 50"),

    bookingType: z.enum(["APARTMENT", "ROOM"], {
      required_error: "Booking type is required",
    }),

    userId: z
      .string({
        required_error: "User ID is required",
      })
      .uuid("User ID must be a valid UUID"),

    hotelId: z
      .string({
        required_error: "Hotel ID is required",
      })
      .uuid("Hotel ID must be a valid UUID"),

    apartmentId: z
      .string()
      .uuid("Apartment ID must be a valid UUID")
      .optional()
      .nullable(),

    roomId: z
      .string()
      .uuid("Room ID must be a valid UUID")
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      const checkIn = new Date(data.checkInDate);
      const checkOut = new Date(data.checkOutDate);
      return checkOut > checkIn;
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["checkOutDate"],
    }
  );
