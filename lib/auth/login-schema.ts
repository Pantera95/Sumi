import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, "Ingresa tu usuario o correo."),
  password: z
    .string()
    .min(6, "La contrasena debe tener al menos 6 caracteres."),
});

export type LoginInput = z.infer<typeof loginSchema>;
