import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { registerSchema } from "../../schemas/Register";
import { z } from "zod";
import {auth, db} from "../../services/firebaseConnection";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {toast} from "react-toastify"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

type RegisterSchema = z.infer<typeof registerSchema>;

const Register = ()=>{
    const {handleSubmit, reset, formState: { errors }, register } = useForm<RegisterSchema>({
        mode:"all",
        criteriaMode:"all",
        resolver: zodResolver(registerSchema)
    });
    const navigate = useNavigate();

    const submit = async(data: RegisterSchema)=>{
        if(Object.keys(errors).length <= 0){
            data.username = data.username.toLowerCase().trim();
            const usuariosRef = collection(db, 'usuarios');
            const q = query(usuariosRef, where('username', '==', data.username))
 
            try{
                const querySnapshot = await getDocs(q);
                if(!querySnapshot.empty){
                    toast.error("Já existe um usuário com este username. Escolha outro.");
                    throw new Error('Já há um usuário com este username');
                    return;
                }
                const user = await createUserWithEmailAndPassword(auth, data.email, data.password)
                const docref = await setDoc(doc(db, 'usuarios', user.user.uid), {username: data.username, createdAt: new Date()})
                console.log(docref)
                toast.success("Usuário cadastrado com sucesso.");
                reset();
                navigate("/login", {replace: true});
            }catch(err){
                toast.error("Credenciais inválidas. Tente novamente!");
                reset();
            }
                        
        }
    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
                    Auro
                    <span className="bg-gradient-to-r from-purple-900 to-yellow-200 bg-clip-text text-transparent">Links</span>
                </h1>
            </Link>

            <form onSubmit={handleSubmit(submit)} className="w-full max-w-xl flex flex-col px-2">
                    
                <Input
                    placeholder="Crie um nome de usuário único"
                    type="text"
                    register={register('username')}
                    error={errors.username?.message}
                    
                />

                <Input
                    placeholder="Digite o seu e-mail"
                    type="email"
                    register={register('email')}
                    error={errors.email?.message}
                    
                    />

                <Input
                    placeholder="Digite sua senha"
                    type="password"
                    register={register('password')}
                    error={errors.password?.message}
                />               

                <button
                    type="submit"
                    className="h-9 font-medium text-white bg-blue-600 rounded border-0 text-lg"
                >Acessar</button>
                <Link to="/login" className="text-blue-400">Já tem login? Faça login por aqui.</Link>


            </form>
        </div>
    )
}

export default Register;