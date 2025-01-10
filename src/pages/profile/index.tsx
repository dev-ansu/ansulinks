import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { useAuthContext } from "../../contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, UpdateProfile } from "../../schemas/updateProfile";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { updateProfile, User } from "firebase/auth";
import { ChangeEvent, useEffect, useState } from "react";

interface UserType{
    createdAt: Date;
    name: string;
    username: string;
    background: string;
}

const Profile = ()=>{

    const {user, handleInfoUser} = useAuthContext();
    const [userFound, setUserFound] = useState<UserType>();

    const {handleSubmit, register, formState:{errors}, reset} = useForm<UpdateProfile>({
        mode:"all",
        criteriaMode:"all",
        resolver: zodResolver(updateProfileSchema),
    });

    console.log(userFound);

    useEffect(()=>{
        const loadUser = async()=>{
            try{
                if(user?.uid){
                    const userFoundd = await getDoc(doc(db, 'usuarios', user?.uid));
                    setUserFound(userFoundd.data() as UserType);
                }
            }catch(err){
    
            }
        }
        loadUser();
    },[])

    const resetBackgroundColor = async()=>{
        try{
            if(user?.uid){
                await updateDoc(doc(db, 'usuarios', user?.uid), {background: ""})
                if(userFound){
                    setUserFound({...userFound, background: ''});
                }
                toast.success('Padrão de cor resetado com sucesso!')
                reset();
            }
        }catch(err){
            toast.error("Houve um erro ao cadastrar.")
        }
    }

    const save = async(data: UpdateProfile)=>{
        try{
            if(user?.uid){
                await updateDoc(doc(db, 'usuarios', user?.uid), data)
                if(user){
                    await updateProfile(auth?.currentUser as User, {displayName: data.name});
                }
                if(userFound){
                    setUserFound({...userFound, background: data.background});
                }
                toast.success('Nome cadastrado com sucesso!')
                handleInfoUser({name: data.name, uid: user.uid, email: user.email})
                reset();
            }
        }catch(err){
            toast.error("Houve um erro ao cadastrar.")
        }
    }

    return(
        <>
        <div style={{background: userFound?.background}} className={`flex  items-center flex-col min-h-screen pb-7 px-2`}>
        <Header />
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais </h1>

            <form onSubmit={handleSubmit(save)} className="flex flex-col max-w-xl w-full">
                <label className="text-white font-medium mb-2 mt-2" htmlFor="">Texto do cabeçalho:</label>
                    <Input 
                        type="text"
                        placeholder="Texto do cabeçalho"
                        register={register("name")}
                        error={errors.name?.message}
                        defaultValue={user?.name as any}
                    /> 
                <label className="text-white font-medium mb-2 mt-2" htmlFor="">Cor de fundo:</label>
                    <Input 
                        type="color"
                        placeholder="Cor de fundo"
                        register={register("background")}
                        error={errors.background?.message}
                        defaultValue={userFound?.background}
                    />        
                         
                <button
                    type="submit"
                    className="h-9 font-medium text-white bg-blue-600 rounded border-0 text-lg"
                >Cadastrar</button>
            </form>
            <button onClick={resetBackgroundColor} className="h-9 px-4 font-medium text-white bg-red-600 rounded border-0 text-lg my-4">Resetar cor de fundo padrão</button>
        </div>
        </>

    )
}

export default Profile;