import {createBrowserRouter} from "react-router-dom"
import Home from "./pages/home";
import Login from "./pages/login";
import Networks from "./pages/networks";
import Admin from "./pages/admin";
import NotFound from "./pages/Notfound";
import Register from "./pages/register/Index";
import Private from "./routes/Private";
import Profile from "./pages/profile";
import Main from "./pages/main";


const router = createBrowserRouter([
  {
    path:"/:uid",
    element:<Home />
  },
  {
    path:"/",
    element: <Main />,
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/register",
    element:<Register />
  },
  {
        element: <Private />,
        children:[
        {
            index: true,
            path:"app",
            element: <Admin /> 
        },
        {
            path:"app/social",
            element:
            <Networks />
        },
        {
            path:"app/perfil",
  
            element: <Profile />
        }
        ]
  },
  {
    path:"*",
    element:<NotFound />
  }
]);

export {router};