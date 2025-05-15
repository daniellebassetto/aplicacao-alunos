import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './routes/Login/Login.jsx'
import Alunos from './routes/Alunos/Alunos.jsx'
import NovoAluno from './routes/NovoAluno/NovoAluno.jsx'
import PrivateRoute from './routes/PrivateRoute/PrivateRoute.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Login /></PrivateRoute>
      },
      {
        path: "/alunos",
        element: <PrivateRoute><Alunos /></PrivateRoute>
      },
      {
        path: "/aluno/novo/:alunoId",
        element: <PrivateRoute><NovoAluno /></PrivateRoute>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
