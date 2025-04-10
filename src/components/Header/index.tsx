import {BiLogOut} from "react-icons/bi"
import {Link, useNavigate} from "react-router-dom"
import { auth, db } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth"
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { UserFound } from "../../pages/home";

const Header = ()=>{
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [userFound, setUserFound] = useState<UserFound>();
    const handleLogout = async(e: any)=>{
        e.preventDefault();
        await signOut(auth);        
        return;
    }

    useEffect(()=>{
        const userFound = async()=>{
            
            try{
                const docSnap = await getDoc(doc(db, "usuarios", user?.uid as string));
        
                if(!docSnap.exists()){
                    throw new Error('Usuário não encontrado.')
                }
                
        
                const newUser = {uid: docSnap.id, ...docSnap.data() } as UserFound;
                setUserFound(newUser);
            }catch(err){
                navigate("/")
            }
        }
        
        userFound();
    },[])

    return( 
        <header className="w-full max-w-2xl mt-4 px-1">
            <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
                <div className="flex gap-4 font-medium">
                    <Link to={`/${userFound?.username}`}>Home</Link>
                    <Link to="/app">Links</Link>
                    <Link to="/app/social">Redes sociais</Link>
                    <Link to="/app/perfil">Perfil</Link>
                </div>

                <button onClick={handleLogout}>
                    <BiLogOut size={28} color="#db2629" />
                </button>
            </nav>
        </header>
    )
}


export default Header;