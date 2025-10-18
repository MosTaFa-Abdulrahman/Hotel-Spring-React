import { z } from "zod";

export const createApartmentSchema = z.object({
  apartmentNumber: z
    .string()
    .min(1, "Apartment number is required")
    .max(90, "Apartment number must not exceed 90 characters"),

  name: z
    .string()
    .min(1, "Name is required")
    .max(300, "Name must not exceed 300 characters"),

  description: z.string().min(1, "Description is required"),

  imageUrl: z
    .string()
    .min(1, "Image is required")
    .url("Must be a valid image URL"),

  pricePerNight: z
    .string()
    .min(1, "Price per night is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0.01, {
      message: "Price per night must be greater than 0",
    }),

  totalCapacity: z
    .string()
    .min(1, "Total capacity is required")
    .refine(
      (val) => {
        const num = parseInt(val);
        return !isNaN(num) && num >= 1 && num <= 20;
      },
      {
        message: "Total capacity must be between 1 and 20",
      }
    ),

  numberOfBedrooms: z
    .string()
    .min(1, "Number of bedrooms is required")
    .refine(
      (val) => {
        const num = parseInt(val);
        return !isNaN(num) && num >= 0 && num <= 10;
      },
      {
        message: "Number of bedrooms must be between 0 and 10",
      }
    ),

  numberOfBathrooms: z
    .string()
    .min(1, "Number of bathrooms is required")
    .refine(
      (val) => {
        const num = parseInt(val);
        return !isNaN(num) && num >= 1 && num <= 10;
      },
      {
        message: "Number of bathrooms must be between 1 and 10",
      }
    ),

  floorNumber: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = parseInt(val);
        return !isNaN(num) && num >= 0 && num <= 100;
      },
      {
        message: "Floor number must be between 0 and 100",
      }
    ),

  areaSqm: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0.01;
      },
      {
        message: "Area must be greater than 0",
      }
    ),

  roomsBookableSeparately: z.boolean().optional(),
  hasKitchen: z.boolean().optional(),
  hasLivingRoom: z.boolean().optional(),
  hasDiningArea: z.boolean().optional(),
  hasBalcony: z.boolean().optional(),
  hasWifi: z.boolean().optional(),
  hasAirConditioning: z.boolean().optional(),
  hasParking: z.boolean().optional(),
  hasLaundry: z.boolean().optional(),

  apartmentType: z.string().min(1, "Apartment type is required"),

  hotelId: z.string().min(1, "Hotel selection is required"),
});

export const updateApartmentSchema = z.object({
  apartmentNumber: z
    .string()
    .max(90, "Apartment number must not exceed 90 characters")
    .optional(),

  name: z.string().max(300, "Name must not exceed 300 characters").optional(),

  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),

  imageUrl: z.string().url("Must be a valid image URL").optional(),

  pricePerNight: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return !isNaN(parseFloat(val)) && parseFloat(val) >= 0.01;
      },
      {
        message: "Price per night must be greater than 0",
      }
    ),

  totalCapacity: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = parseInt(val);
        return !isNaN(num) && num >= 1 && num <= 20;
      },
      {
        message: "Total capacity must be between 1 and 20",
      }
    ),

  numberOfBedrooms: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = parseInt(val);
        return !isNaN(num) && num >= 0 && num <= 10;
      },
      {
        message: "Number of bedrooms must be between 0 and 10",
      }
    ),

  numberOfBathrooms: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = parseInt(val);
        return !isNaN(num) && num >= 1 && num <= 10;
      },
      {
        message: "Number of bathrooms must be between 1 and 10",
      }
    ),

  floorNumber: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = parseInt(val);
        return !isNaN(num) && num >= 0 && num <= 100;
      },
      {
        message: "Floor number must be between 0 and 100",
      }
    ),

  areaSqm: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0.01;
      },
      {
        message: "Area must be greater than 0",
      }
    ),

  isAvailable: z.boolean().optional(),
  roomsBookableSeparately: z.boolean().optional(),
  hasKitchen: z.boolean().optional(),
  hasLivingRoom: z.boolean().optional(),
  hasDiningArea: z.boolean().optional(),
  hasBalcony: z.boolean().optional(),
  hasWifi: z.boolean().optional(),
  hasAirConditioning: z.boolean().optional(),
  hasParking: z.boolean().optional(),
  hasLaundry: z.boolean().optional(),

  apartmentType: z.string().optional(),
});
