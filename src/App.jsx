import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { Suspense, lazy } from 'react';

const Sucursales = lazy(() => import('./screens/Sucursales'))
const Stock = lazy(() => import("./screens/SistemaDeStock"))
const ContenedorDeGestion = lazy(() => import("./containers/SistemaDeStock/ContenedorDeGestion/ContenedorDeGestion"))


const router = createBrowserRouter([
  {
    path: "/stock",
    element: <SuspenseLoadingComponent> <Stock /> </SuspenseLoadingComponent>,
    children: [
      {
        path: "gestion",
        element: <SuspenseLoadingComponent> <ContenedorDeGestion /> </SuspenseLoadingComponent>
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
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  )
}

export default App
