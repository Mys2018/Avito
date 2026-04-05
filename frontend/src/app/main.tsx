import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/globals.css'
import './styles/variables.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";
import {QueryProvider} from "./providers/QueryProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router}/>
    </QueryProvider>
  </StrictMode>,
)
