"use server";

import { authenticateWithAvailableSource } from "@/lib/auth/authenticate";
import { loginSchema } from "@/lib/auth/login-schema";

export type LoginFormState = {
  status: "idle" | "error" | "success";
  message: string;
  source?: "database" | "demo";
};

export async function authenticateUser(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = loginSchema.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Datos invalidos.",
    };
  }

  const { identifier, password } = parsed.data;
  const result = await authenticateWithAvailableSource(identifier, password);

  if (!result.ok) {
    return {
      status: "error",
      message: result.message,
    };
  }

  return {
    status: "success",
    source: result.source,
    message: result.message,
  };
}
