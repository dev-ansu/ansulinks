import { Link } from "react-router-dom";

const Main = ()=>{
    return (
        <>
            <div className="max-w-8xl m-auto p-4 h-screen flex justify-start items-center flex-col">
                <Link to="/">
                    <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
                        Auro
                        <span className="bg-gradient-to-r from-purple-900 to-yellow-200 bg-clip-text text-transparent">Links</span>
                    </h1>
                </Link>

                <div className="w-full text-2xl font-bold flex justify-between py-8 px-9 rounded-full bg-white">
                    <Link to="/">
                        Home
                    </Link>
                    <div className="flex gap-4">
                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/register">
                        Cadastrar
                    </Link>
                    </div>
                    
                </div>

                <h1 className="py-8  text-6xl font-bold self-start max-w-4xl text-orange-500">
                    Crie uma árvore de links de forma fácil e gratuita
                </h1>


            </div>
        
        </>
    )
}

export default Main;