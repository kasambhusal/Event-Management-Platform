"use server";

import { prisma } from "../prisma";
import { signUpSchema, loginSchema } from "../schemas/authSchemas";
import bcrypt from "bcryptjs";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  // Validate input
  const parsed = signUpSchema.safeParse(data);
  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((err) => err.message).join(", ");
    return { success: false, message: errorMessages };
  }

  const { name, email, password } = parsed.data;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}


export async function loginUser(data: {
  email: string;
  password: string;
}) {
  // Validate input
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((err) => err.message).join(", ");
    return { success: false, message: errorMessages };
  }

  const { email, password } = parsed.data;

  try {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid credentials" };
    }

    // Return success message along with user's name and email
    return { 
      success: true, 
      message: "Login successful",
      data: {
        id:user.id,
        name: user.name,
        email: user.email,
        role:user.role
      }
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}



