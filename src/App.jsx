import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { Suspense, lazy } from 'react';
import { Sucursales } from './screens/Sucursales';


const Stock = lazy(() => import("./screens/SistemaDeStock"))
const router = createBrowserRouter([
  {
    path: "/stock",
    element: <SuspenseLoadingComponent> <Stock /> </SuspenseLoadingComponent>,
  },
  {
    path: "stock/:seccion",
    element: <SuspenseLoadingComponent> <Stock /> </SuspenseLoadingComponent>,
  },
  {
    path: "/",
    loader: () => redirect("/sucursales")
  },
  {
    path: "sucursales",
    element: <Sucursales />
  }
])

function App() {

  return (
    <Suspense fallback="">
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  )
}

export default App
