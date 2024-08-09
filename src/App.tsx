import {createBrowserRouter} from "react-router-dom"
import Home from "./pages/home";
import Login from "./pages/login";
import Networks from "./pages/networks";
import Admin from "./pages/admin";
import Private from "./routes/Private";
import NotFound from "./pages/Notfound";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home />
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path: "/admin",
    children:[
      {
        index:true,
        element:
        <Private> 
          <Admin /> 
        </Private>
      },
      {
        path:"social",
        element:
        <Private>
          <Networks />
        </Private>
      }
    ]
  },
  {
    path:"*",
    element:<NotFound />
  }
]);

export {router};