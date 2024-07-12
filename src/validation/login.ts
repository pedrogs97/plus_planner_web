import * as z from "zod"

export const loginSchema = z.object({
  username: z.string({
    required_error: "Digite o seu nome de usuário",
  }).trim(),
  password: z.string({
    required_error: "Digite a sua senha",
  }).trim()
})

export type FormLoginData = z.infer<typeof loginSchema>;