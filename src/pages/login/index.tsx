import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { loginSchema } from "../../schemas/Login";
import { z } from "zod";
import {auth} from "../../services/firebaseConnection";
import {signInWithEmailAndPassword} from "firebase/auth"
import {toast} from "react-toastify"

type LoginSchema = z.infer<typeof loginSchema>;

const Login = ()=>{
    const {handleSubmit, reset, formState: { errors }, register } = useForm<LoginSchema>({
        mode:"all",
        criteriaMode:"all",
        resolver: zodResolver(loginSchema)
    });
    const navigate = useNavigate();
    const login = async(data: LoginSchema)=>{
        if(Object.keys(errors).length <= 0){
            try{
                await signInWithEmailAndPassword(auth, data.email, data.password)
                toast.success("Usuário logado com sucesso.");
                navigate("/admin", {replace: true});
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

            <form onSubmit={handleSubmit(login)} className="w-full max-w-xl flex flex-col px-2">
                    
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
            </form>
        </div>
    )
}

export default Login;