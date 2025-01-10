import { useAuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";


const Private = ()=>{
    const {loadingAuth, signed} = useAuthContext();
    
    if(loadingAuth){
        return (
            <div className="min-h-96 flex justify-center items-center">
                <h1 className="text-7xl md:text-3xl lg:text-5xl font-bold text-center">Carregando...</h1>
            </div>
        )
    }

    if(!signed){
        return <Navigate to="/login" replace={true} />
    }
    
    return <Outlet />;
}

export default Private;