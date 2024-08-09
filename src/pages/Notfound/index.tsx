import { Link } from "react-router-dom";

const NotFound = ()=>{
    return (
        <div className="flex w-full justify-center items-center  flex-col min-h-screen">
        <h1 className="font-bold text-4xl mt-4 mb-4 text-white">Página não encontrada</h1>
        <p className="text-white font-medium">Está perdido? Volte para a página inicial <Link to="/" className="text-blue-400 font-medium">clicando aqui</Link></p>
        </div>
    )
}

export default NotFound;