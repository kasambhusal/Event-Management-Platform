import { z } from "zod";

export const updateUserSchema = z.object({
  id: z
    .string()
    .regex(/^c[a-z0-9]{24}$/, "Invalid user ID"), // Regex for CUIDs
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
});
