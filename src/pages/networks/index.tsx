import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {db} from "../../services/firebaseConnection";
import { doc, getDoc, setDoc} from "firebase/firestore"
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const criarRedesSociaisSchema = z.object({
    facebook: z.string().min(1, 'Este campo é obrigatório.').url('Digite um link válido.'),
    instagram: z.string().min(1, 'Este campo é obrigatório.').url("Digite um link válido."),
    youtube: z.string().url("Digite um link válido.").optional()
})

type CriarRedesSociasProps = z.infer<typeof criarRedesSociaisSchema>;
export interface RedesSociaisProps extends CriarRedesSociasProps{
    createdAt: Date;
}

const Networks = ()=>{
    const [redesSocias, setRedesSociais] = useState<CriarRedesSociasProps>();
    const {handleSubmit, register, formState:{errors}, reset} = useForm<CriarRedesSociasProps>({
        mode:"all",
        criteriaMode:"all",
        resolver: zodResolver(criarRedesSociaisSchema),
    });

    const save = async(data: CriarRedesSociasProps)=>{
        try{
            await setDoc(doc(db, 'networks', 'link'), {...data, createdAt: new Date()})
            toast.success('Redes sociais cadastradas com sucesso!')
            reset();
        }catch(err){
            toast.error("Houve um erro ao cadastrar.")
        }
    }

    useEffect(()=>{
        const loadLinks = async ()=>{
            const docRef = doc(db, 'networks', 'link');
            try{
                const snapshot = await getDoc(docRef);
                setRedesSociais({
                    facebook: snapshot.data()?.facebook,
                    instagram: snapshot.data()?.instagram,
                    youtube: snapshot.data()?.youtube,
                })
            }catch(err){
                console.log(err);
            }
        }
        loadLinks();
    },[]);

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais </h1>

            <form onSubmit={handleSubmit(save)} className="flex flex-col max-w-xl w-full">
                <label className="text-white font-medium mb-2 mt-2" htmlFor="">Link do Facebook:</label>
                    <Input 
                        type="url"
                        placeholder="Digite a URL"
                        register={register("facebook")}
                        error={errors.facebook?.message}
                        defaultValue={redesSocias?.facebook}
                    />

                <label className="text-white font-medium mb-2 mt-2" htmlFor="">Link do Instagram:</label>
                    <Input 
                        type="url"
                        placeholder="Digite a URL"
                        register={register("instagram")}
                        error={errors.instagram?.message}
                        defaultValue={redesSocias?.instagram}
                    />

                <label className="text-white font-medium mb-2 mt-2" htmlFor="">Link do YouTube:</label>
                    <Input 
                        type="url"
                        placeholder="Digite a URL"
                        register={register("youtube")}
                        error={errors.youtube?.message}
                        defaultValue={redesSocias?.youtube}
                    />
                
                <button
                    type="submit"
                    className="h-9 font-medium text-white bg-blue-600 rounded border-0 text-lg"
                >Cadastrar</button>
            </form>
        </div>

    )
}

export default Networks;