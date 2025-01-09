import { z } from "zod";

// Define the schema for updating user information
export const updateUserSchema = z.object({
  id: z.string().uuid("Invalid user ID"), // Direct UUID validation using Zod
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
});
