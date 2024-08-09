import Social from "../../components/Social";
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa"
import {db} from "../../services/firebaseConnection"
import {getDocs, collection, orderBy, query, doc, getDoc} from "firebase/firestore"
import { useEffect, useState } from "react";
import { CriarLinkSchema } from "../admin";
import { RedesSociaisProps } from "../networks";

const Home = ()=>{
    const [links, setLinks] = useState<CriarLinkSchema[]>();
    const [socialLinks, setSocialLinks] = useState<RedesSociaisProps>();

    useEffect(()=>{
        const loadLinks = async()=>{
            const linksRef = collection(db, 'links');
            const queryRef = query(linksRef, orderBy('createdAt', 'asc'));
            try{
                const snapshot = await getDocs(queryRef);
                const lista = [] as CriarLinkSchema[];
                snapshot.forEach((doc) =>{
                    lista.push({
                        cor_fundo_link: doc.data().cor_fundo_link,
                        nome_link: doc.data().nome_link,
                        cor_texto_link: doc.data().cor_texto_link,
                        url_link: doc.data().url_link
                    })
                })
                setLinks(lista);
            }catch(err){
                console.log(err)
            }
        }
        loadLinks();
    },[])

    useEffect(()=>{
        const loadSocialLinks = ()=>{
                const docRef = doc(db, 'networks', 'link');
                getDoc(docRef).then(snapshot=>{
                if(snapshot.data() != undefined){
                    setSocialLinks({
                        facebook: snapshot.data()?.facebook,
                        instagram: snapshot.data()?.instagram,
                        youtube: snapshot.data()?.youtube,
                        createdAt: snapshot.data()?.createdAt,
                    });
                }
            })
        }   
        loadSocialLinks();
    },[])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Anderson Souza</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links && links.map(link => (
                    <section style={{background: link.cor_fundo_link}} className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                        <a style={{color:link.cor_texto_link}} target="_blank" href={`${link.url_link}`}>
                            <p className="text-base md:text-lg">{link.nome_link}</p>
                        </a>
                    </section>
                ))}
                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">
                        <Social url={`${socialLinks?.facebook}`}>
                            <FaFacebook size={35} color="#fff" />
                        </Social>
                        <Social url={`${socialLinks?.instagram}`}>
                            <FaYoutube size={35} color="#fff" />
                        </Social>
                        <Social url={`${socialLinks?.youtube}`}>
                            <FaInstagram size={35} color="#fff" />
                        </Social>
                    </footer>
                )}
            </main>
        </div>
    )
}

export default Home;