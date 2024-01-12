import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { Suspense, lazy } from 'react';


const Stock = lazy(() => import("./screens/Stock"))
const router = createBrowserRouter([
  {
    path: "/stock",
    element: <SuspenseLoadingComponent> <Stock /> </SuspenseLoadingComponent>
  },
  {
    path: "/",
    loader: () => redirect("/stock")
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
