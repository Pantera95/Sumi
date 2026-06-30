import { PrismaClient } from "@prisma/client";

declare global {
  var __sumiPrisma: PrismaClient | undefined;
}

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!globalThis.__sumiPrisma) {
    globalThis.__sumiPrisma = new PrismaClient();
  }

  return globalThis.__sumiPrisma;
}

export const prisma = createPrismaClient();

export function hasDatabaseConnection() {
  return Boolean(process.env.DATABASE_URL && prisma);
}
