"use server";

import { clearSession } from "@/lib/auth/session";

export async function logoutUser() {
  await clearSession();
}
