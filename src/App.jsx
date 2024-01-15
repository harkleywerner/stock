import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { Suspense, lazy } from 'react';

const ContenedorDeStock = lazy(() => import('./containers/SistemaDeStock/ContenedorDeStock/ContenedorDeStock'))
const Sucursales = lazy(() => import('./screens/Sucursales'))
const Stock = lazy(() => import("./screens/SistemaDeStock"))
const ContenedorDeGestion = lazy(()=> import("./containers/SistemaDeStock/ContenedorDeGestion/ContenedorDeGestion"))


const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspenseLoadingComponent> <Stock /> </SuspenseLoadingComponent>,
    children: [
      {
        path: "gestion",
        element: <SuspenseLoadingComponent> <ContenedorDeGestion /> </SuspenseLoadingComponent>
      },
      {
        path: "stock",
        element: <SuspenseLoadingComponent> <ContenedorDeStock /> </SuspenseLoadingComponent>,
      },
      {
        path: "stock/:seccion",
        element: <SuspenseLoadingComponent> <ContenedorDeStock /> </SuspenseLoadingComponent>,
      },
    ]
  },
  {
    path: "/",
    loader: () => redirect("/sucursales")
  },
  {
    path: "sucursales",
    element: <SuspenseLoadingComponent><Sucursales /></SuspenseLoadingComponent>
  },

])

function App() {

  return (
    <Suspense fallback="">
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  )
}

export default App
