import {z} from "zod";

export const updateProfileSchema = z.object({
    name: z.string().min(3, 'O campo é obrigatório'),
    background: z.string().min(3,'O campo é obrigatório.')
})

export type UpdateProfile = z.infer<typeof updateProfileSchema>

