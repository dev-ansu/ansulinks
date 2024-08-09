import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    error?:string;
    register?:UseFormRegisterReturn;
}

const Input = ({error,register,  ...props}:InputProps)=>{
    return (
        <>
        {error && <span className="text-red-500 text-sm">{error}</span>} {/* Exibe a mensagem de erro */}
        <input
            className={`border-0 h-9 rounded-md outline-none px-2 mb-3 ${error ? 'border-red-500 border' : ''}`}
            {...props}
            {...register}
            />
        </>
    )
}

export default Input;