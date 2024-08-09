import { ReactNode, useState, useEffect } from "react";
import {auth} from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom";

interface PrivateProps{
    children: ReactNode,
}

const Private = ({children}:PrivateProps):any=>{
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        
        const unSub = onAuthStateChanged(auth, (user)=>{
            if(user){
                const userData = {
                    uuid: user.uid,
                    email: user.email
                }
                localStorage.setItem("@aurolinks", JSON.stringify(userData));
                setLoading(false);
                setSigned(true);
            }else{
                setLoading(false);
                setSigned(false);
            }
        })
        
        return ()=>{
            unSub();
        }

    },[])

    if(loading){
        return <></>
    }

    if(!signed){
        return navigate("/login")
    }

    return children
}


export default Private;