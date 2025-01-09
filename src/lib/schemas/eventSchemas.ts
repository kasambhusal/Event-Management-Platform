import { z } from "zod";
export type EventInput = z.infer<typeof eventSchema>;
// Validation schema for events
export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().datetime("Invalid date format"),
  location: z.string().min(1, "Location is required"),
});
