"use server";

import { prisma } from "../prisma";
import { updateUserSchema } from "../schemas/userSchemas";

export async function updateUser(data: {
  id: string;
  name: string;
  email: string;
}) {
  // Validate input with Zod schema
  const parsed = updateUserSchema.safeParse(data);
  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((err) => err.message).join(", ");
    return { success: false, message: errorMessages };
  }

  const { id, name, email } = parsed.data;

  try {
    // Check if email is already in use by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id,
        },
      },
    });

    if (existingUser) {
      return { success: false, message: "Email is already in use" };
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    return { 
      success: true, 
      message: "User updated successfully",
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    };
  } catch (error) {
    console.error("Update user error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
