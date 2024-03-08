import { ContenedorDeToast } from '@/components//ContenedorDeToast/ContenedorDeToast';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { Outlet, RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import './App.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { axiosInterceptor } from './helpers/axios.interceptor';
import { InformacionInicialProvider } from './provider/informacionInicialProvider/informacionInicial.provider';
import { store } from './store/store.';
import { AlertaPromisesProvider } from './provider/AlertaRetryProvider/AlertaPromises.provider';

const SucursalesScreen = lazy(() => import('./screens/Sucursales.screen'))
const StockScreen = lazy(() => import("./screens/SistemaDeStock/Stock.screen"))
const NuevoStockScreen = lazy(() => import("./screens/SistemaDeStock/screens/NuevoStock.screen"))
const ProductosScreen = lazy(() => import("@/screens/SistemaDeStock/screens/Productos.screen"))
const GestionStockScreen = lazy(() => import("./screens/SistemaDeStock/screens/GestionStock.screen"))
const UsuariosScreen = lazy(() => import("./screens/Usuarios.screen"))

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <AlertaPromisesProvider>
        <InformacionInicialProvider>
          <Outlet />
        </InformacionInicialProvider>
      </AlertaPromisesProvider>,
    children: [
      {
        path: "/stock",
        element: <SuspenseLoadingComponent > <StockScreen /> </SuspenseLoadingComponent>,
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
        loader: async () => {
          const response = axios.get(`${BACK_END_URL}/sucursales`)
          return defer({
            lista_de_sucursales: response
          })
        }
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
    <Suspense>
      <Provider store={store}>
        <ContenedorDeToast />
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  )
}

export default App