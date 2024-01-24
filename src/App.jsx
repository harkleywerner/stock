import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { Suspense, lazy } from 'react';
import { AlertasProvider } from './provider/AlertaProvider/AlertasProvider';

const Sucursales = lazy(() => import('./screens/Sucursales'))
const Stock = lazy(() => import("./screens/SistemaDeStock/SistemaDeStock"))
const ContenedorDeGestion = lazy(() => import("./containers/SistemaDeStock/ContenedorDeGestion/ContenedorDeGestion"))
const ContendoDeNuevoStock = lazy(() => import("./containers/SistemaDeStock/ContenedorDeNuevoStock/ContendoDeNuevoStock"))
const ContenedorDeProductos = lazy(() => import('./containers/SistemaDeStock/ContenedorDeProductos/ContenedorDeProductos'))

const router = createBrowserRouter([
  {
    path: "/stock",
    element: <SuspenseLoadingComponent > <Stock /> </SuspenseLoadingComponent>,
    children: [
      {
        path: "productos",
        element: <SuspenseLoadingComponent texto={"Cargando productos"}><ContenedorDeProductos /> </SuspenseLoadingComponent>
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
    element: <SuspenseLoadingComponent><Sucursales /></SuspenseLoadingComponent>
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
