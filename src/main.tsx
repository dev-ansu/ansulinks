import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {router} from './App.tsx'
import {RouterProvider} from "react-router-dom"
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer autoClose={3000} position='top-right' />
  </StrictMode>,
)
