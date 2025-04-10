import Social from "../../components/Social";
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa"
import {db} from "../../services/firebaseConnection"
import {getDocs, collection, query, doc, getDoc, where} from "firebase/firestore"
import { useEffect, useState } from "react";
import { CriarLinkSchema } from "../admin";
import { RedesSociaisProps } from "../networks";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export interface UserFound{
    uid: string;
    createdAt: Date;
    username: string;
    name: string;
    background: string;
} 

const Home = ()=>{
    const [links, setLinks] = useState<CriarLinkSchema[]>();
    const [socialLinks, setSocialLinks] = useState<RedesSociaisProps>();
    const { username } = useParams();
    const [userFound, setUserFound] = useState({} as UserFound);
    const navigate = useNavigate();
    if(!username){
        return <Navigate to="/notfound" replace={true} />
    }

    useEffect(()=>{
        const userFound = async()=>{
            
            try{
                const usuariosRef = collection(db, "usuarios");
                const q = query(usuariosRef, where("username", "==", username));
                const querySnapshot = await getDocs(q);
       
                if(querySnapshot.empty){
                    throw new Error('Usuário não encontrado.')
                }
                
                const doc = querySnapshot.docs[0];
                const user = {uid: doc.id, ...doc.data()} as UserFound;
                setUserFound(user);
            }catch(err){
                navigate("/")
            }
        }
        
        userFound();
    },[])

    useEffect(()=>{
        
        
        const loadLinks = async()=>{
            const linksRef = collection(db, 'links');
            const queryRef = query(linksRef, where('uid', '==', userFound.uid));

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
    },[userFound])

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
        <div style={{background: userFound.background}} className={`flex h-screen flex-col w-full py-4 items-center justify-start`}>
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">{ userFound.name ?? userFound?.username }</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex  flex-col w-11/12 max-w-xl text-center">
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