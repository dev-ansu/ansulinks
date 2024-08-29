import {FiTrash} from "react-icons/fi"
import { useEffect, useState } from "react";
import {onSnapshot, doc, collection,deleteDoc, query, orderBy} from "firebase/firestore"
import {db} from "../../services/firebaseConnection";
import { CriarLinkSchema } from "../../pages/admin";
import { toast } from "react-toastify";

interface LinkProps extends CriarLinkSchema{
    id: string;
};
const LinksList = ()=>{
    const [links, setLinks] = useState<LinkProps[]>();

    useEffect(()=>{
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("createdAt", "asc"));
        const unSub = onSnapshot(queryRef, (snapshot)=>{
            let lista: LinkProps[] = [];
            snapshot.forEach((doc)=>{
                lista.push({
                    id:doc.id,
                    nome_link: doc.data().nome_link,
                    url_link:doc.data().url_link,
                    cor_fundo_link: doc.data().cor_fundo_link,
                    cor_texto_link: doc.data().cor_texto_link,
                });
            })
            setLinks(lista);
        })
        return () =>{ unSub() } 
    },[])

    const handleDeleteLink = async(id: string)=>{
        const confirm = window.confirm("Deseja realmente excluir o link?")
        if(confirm){
            try{
                const docRef = doc(db, 'links', id);
                await deleteDoc(docRef);
                toast.success("Link deletado com sucesso!")
            }catch(err){
                toast.error("Houve um erro ao tentar deletar o link.")
            }
        }
    }

    return(
        <>
            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus links
            </h2>
            {links && links.map((link) => (
                <article 
                className="w-11/12 max-w-lg flex items-center justify-between rounded py-3 px-2 mb-2 select-none"
                style={{background:link.cor_fundo_link}}
                >
                    <p className="font-medium" style={{color:link.cor_texto_link}}>{link.nome_link}</p>
                    <div className="bg-black p-2 rounded-md border border-dashed flex items-center ">
                        <button onClick={()=> handleDeleteLink(link.id) } ><FiTrash size={18} color="#fff" /></button>
                    </div>
                </article>
                ))
            }
        </>
    )
}

export default LinksList;
