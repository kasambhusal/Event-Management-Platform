import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // Optional: Log queries in development
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
