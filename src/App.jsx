import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { Suspense, lazy } from 'react';
import { NotificacionesProvider } from './provider/NotificacionesProvider/NotificacionesProvider';
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
    element: <SuspenseLoadingComponent ><Sucursales /></SuspenseLoadingComponent>,
    loader: async () => {
      const response =  axios.get(`${BACK_END_URL}/sucursales`)
          

      return defer({
        lista_de_sucursales: response
      })
    }
  },
])

function App() {

  return (
    <Suspense fallback="">
      <NotificacionesProvider>
        <RouterProvider router={router}></RouterProvider>
      </NotificacionesProvider>
    </Suspense>
  )
}

export default App