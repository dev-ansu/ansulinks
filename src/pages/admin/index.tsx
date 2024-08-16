import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import Input from "../../components/Input";
import {criarLinkSchema} from "../../schemas/cadastrarLink";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import {db} from "../../services/firebaseConnection"
import {addDoc, collection} from "firebase/firestore"
import { toast } from "react-toastify";
import LinksList from "../../components/LinksList";

export type CriarLinkSchema = z.infer<typeof criarLinkSchema>;

const Admin = ()=>{
    const {handleSubmit, formState:{errors}, reset, register} = useForm<CriarLinkSchema>({
        mode:"all",
        criteriaMode:"all",
        resolver: zodResolver(criarLinkSchema)
    });
    const [nameInput, setNameInput] = useState('');
    const [backgroundLinkColor, setBackgroundLinkColor] = useState('#f1f1f1');
    const [textLinkColor, setTextLinkColor] = useState('#000');

    const save = async(data:CriarLinkSchema)=>{
        try{
            await addDoc(collection(db, 'links'), {...data, createdAt: new Date()})        
            toast.success("Link criado com sucesso!");
            reset();
        }catch(err){
            toast.error("Erro ao criar o link.");
        }
    }


    return (
        <div className="flex  items-center flex-col min-h-screen pb-7 px-2">   
            <Header />

            <form onSubmit={handleSubmit(save)} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
                <label className="text-white font-medium mt-2 mb2 " htmlFor="">Nome do link:</label>
                <Input
                    placeholder="Digite o nome do link"
                    register={register('nome_link')}
                    error={errors.nome_link?.message}
                    onInput={(e:ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb2 " htmlFor="">URL do link:</label>
                <Input
                    placeholder="Digite a URL do link"
                    register={register('url_link')}
                    type="url"
                    error={errors.url_link?.message}
                />
                
                <section className="flex my-4 gap-5">
                    <div>
                        <label className="text-white font-medium mt-2 mb2 " htmlFor="">Fundo do link:</label>
                        <input onInput={(e:ChangeEvent<HTMLInputElement>) => setBackgroundLinkColor(e.target.value)} defaultValue={backgroundLinkColor}  type="color" {...register('cor_fundo_link')}  />
                        {errors.cor_fundo_link?.message && <span className="text-red-500 text-sm">{errors.cor_fundo_link.message}</span>} {/* Exibe a mensagem de erro */}
                    </div>
                    <div>
                        <label className="text-white font-medium mt-2 mb2 " htmlFor="">Cor do link:</label>
                        <input onInput={(e:ChangeEvent<HTMLInputElement>) => setTextLinkColor(e.target.value)} defaultValue={textLinkColor}  type="color" {...register('cor_texto_link')}  />
                        {errors.cor_texto_link?.message && <span className="text-red-500 text-sm">{errors.cor_texto_link.message}</span>} {/* Exibe a mensagem de erro */}
                    </div>
                </section>

                {nameInput &&
                <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                    <label className="text-white font-medium mt-2 mb2 " htmlFor="">Veja como ficará</label>
                    <article className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3" style={{marginBottom:8, marginTop:8, background:backgroundLinkColor}}>
                        <p className="font-medium" style={{color:textLinkColor}}>{nameInput}</p>
                    </article>
                </div>
                }

                <button
                    type="submit"
                    className="mb-7 h-9 font-medium text-white bg-blue-600 rounded border-0 text-lg"
                >Cadastrar</button>
            </form>
            <LinksList />
        </div>
    )
}

export default Admin;