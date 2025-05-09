import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './routes/Login/Login.jsx'
import Alunos from './routes/Alunos/Alunos.jsx'
import NovoAluno from './routes/NovoAluno/NovoAluno.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/alunos",
        element: <Alunos />
      },
      {
        path: "/aluno/novo/:alunoId",
        element: <NovoAluno />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
