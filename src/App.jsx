import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { Suspense, lazy } from 'react';

const retrasoTest = (imp, sec = 1) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(imp)
    }, 1000 * sec);
  })
}

const Sucursales = lazy(() => import('./screens/Sucursales'))
const Stock = lazy(() => retrasoTest(import("./screens/SistemaDeStock")))
const ContenedorDeGestion = lazy(() => retrasoTest(import("./containers/SistemaDeStock/ContenedorDeGestion/ContenedorDeGestion")))


const router = createBrowserRouter([
  {
    path: "/stock",
    element: <SuspenseLoadingComponent texto={"Cargando stock"}> <Stock /> </SuspenseLoadingComponent>,
    children: [
      {
        path: "gestion",
        element: <SuspenseLoadingComponent texto={"Cargando gestor de stock"}> <ContenedorDeGestion /> </SuspenseLoadingComponent>
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
