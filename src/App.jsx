import { RouterProvider, createBrowserRouter, defer, useLocation, useSearchParams } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { Suspense, lazy } from 'react';
import { AlertasProvider } from './provider/AlertaProvider/AlertasProvider';
import axios from 'axios';

const Sucursales = lazy(() => import('./screens/Sucursales'))
const Stock = lazy(() => import("./screens/SistemaDeStock/SistemaDeStock"))
const ContenedorDeGestion = lazy(() => import("./containers/SistemaDeStock/ContenedorDeGestion/ContenedorDeGestion"))
const ContendoDeNuevoStock = lazy(() => import("./containers/SistemaDeStock/ContenedorDeNuevoStock/ContendoDeNuevoStock"))
const ContenedorDeProductos = lazy(() => import('./containers/SistemaDeStock/ContenedorDeProductos/ContenedorDeProductos'))

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL

const router = createBrowserRouter([
  {
    path: "/stock",
    element: <SuspenseLoadingComponent > <Stock /> </SuspenseLoadingComponent>,

    children: [
      {
        path: "productos",
        element: <SuspenseLoadingComponent texto={"Cargando productos"}><ContenedorDeProductos /> </SuspenseLoadingComponent>,
        loader: async ({ request }) => {

            const queryParams = new URL(request.url)

            const response = axios.get(`${BACK_END_URL}/productos${queryParams.search}`)

            return defer({
              productos: response,

            })
        
        }
      },

      {
        path: "gestion",
        element: <SuspenseLoadingComponent texto={"Cargando gestor de stock"}> <ContenedorDeGestion /> </SuspenseLoadingComponent>,
      },
      {
        path: "nuevo",
        element: <SuspenseLoadingComponent texto="Cargando nueva tabla"><ContendoDeNuevoStock /></SuspenseLoadingComponent>,
      },

    ]
  },
  {
    path: "sucursales",
    element: <SuspenseLoadingComponent><Sucursales /></SuspenseLoadingComponent>,
    loader: async () => {
      const response = axios.get(`${BACK_END_URL}/sucursales`)

      return defer({
        lista_de_sucursales: response
      })
    }
  },
])

function App() {

  return (
    <Suspense fallback="">
      <AlertasProvider>
        <RouterProvider router={router}></RouterProvider>
      </AlertasProvider>
    </Suspense>
  )
}

export default App
