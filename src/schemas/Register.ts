import {z} from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, 'O campo é obrigatório'),
    email: z.string().min(3, "O campo é obrigatório.").email("Digite um e-mail válido."),
    password: z.string().min(3, {message:"O campo é obrigatório."})
})

