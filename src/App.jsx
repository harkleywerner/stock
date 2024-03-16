import { ContenedorDeToast } from '@/components//ContenedorDeToast/ContenedorDeToast';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Suspense, lazy, memo, useCallback, useState } from 'react';
import { Provider } from 'react-redux';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { axiosInterceptor } from './helpers/axios.interceptor';
import { AlertaPromisesProvider } from './provider/AlertaPromisesProvider/AlertaPromises.provider';
import { store } from './store/store.';

const SucursalesScreen = lazy(() => import('./screens/Sucursales.screen'))
const StockScreen = lazy(() => import("./screens/SistemaDeStock/Stock.screen"))
const NuevoStockScreen = lazy(() => import("./screens/SistemaDeStock/screens/NuevoStock.screen"))
const ProductosScreen = lazy(() => import("@/screens/SistemaDeStock/screens/Productos.screen"))
const GestionStockScreen = lazy(() => import("./screens/SistemaDeStock/screens/GestionStock.screen"))
const UsuariosScreen = lazy(() => import("./screens/Usuarios.screen"))

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <AlertaPromisesProvider>
        <Outlet />
      </AlertaPromisesProvider >,
    children: [
      {
        path: "/stock",
        element:
          <SuspenseLoadingComponent >
            <StockScreen />
          </SuspenseLoadingComponent>,
        children: [
          {
            path: "productos",
            element: <SuspenseLoadingComponent ><ProductosScreen /> </SuspenseLoadingComponent>,
          },
          {
            path: "gestion",
            element: <SuspenseLoadingComponent> <GestionStockScreen /> </SuspenseLoadingComponent>,
          },
          {
            path: "nuevo",
            element: <SuspenseLoadingComponent ><NuevoStockScreen /></SuspenseLoadingComponent>,
          },

        ]
      },
      {
        path: "sucursales",
        element: <SuspenseLoadingComponent ><SucursalesScreen /></SuspenseLoadingComponent>,
      },
      {
        path: "usuarios",
        element: <UsuariosScreen />
      }
    ]
  }
])


axiosInterceptor()

function App() {


  return (
      <Provider store={store}>
        <ContenedorDeToast />
        <RouterProvider router={router} />
      </Provider>
  )
}

export default App

