import {z} from "zod";

export const criarLinkSchema = z.object({
    nome_link: z.string().min(1, 'Este campo é obrigatório.'),
    url_link:z.string().min(1, 'Este campo é obrigatório.').url('Digite uma URL válida.'),
    cor_fundo_link: z.string().min(1, 'Escolha uma cor válida.'),
    cor_texto_link: z.string().min(1, 'Escolha uma cor válida.')
})

