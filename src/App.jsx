import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import './App.css';
import { SuspenseLoadingComponent } from './components/SuspenseLoadingComponent';
import { store } from './redux/store.';
import { AlertaRertyProvider } from './provider/AlertaRetryProvider/AlertaRerty.provider';
import { ContenedorDeToast } from '@/components/ContenedorDeToast/ContenedorDeToast';

const Sucursales = lazy(() => import('./screens/Sucursales'))
const StockScreen = lazy(() => import("./screens/SistemaDeStock/Stock.screen"))
const NuevoStockScreen = lazy(() => import("./screens/SistemaDeStock/screens/NuevoStock.screen"))
const ProductosScreen = lazy(() => import("@/screens/SistemaDeStock/screens/Productos.screen"))
const GestionStockScreen = lazy(() => import("./screens/SistemaDeStock/screens/GestionStock.screen"))

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL

const router = createBrowserRouter([
  {
    path: "/stock",
    element: <SuspenseLoadingComponent > <StockScreen /> </SuspenseLoadingComponent>,
    children: [
      {
        path: "productos",
        element: <SuspenseLoadingComponent texto={"Cargando productos"}><ProductosScreen /> </SuspenseLoadingComponent>,
      },

      {
        path: "gestion",
        element: <SuspenseLoadingComponent texto={"Cargando gestor de stock"}> <GestionStockScreen /> </SuspenseLoadingComponent>,
      },
      {
        path: "nuevo",
        element: <SuspenseLoadingComponent texto="Cargando nueva tabla"><NuevoStockScreen /></SuspenseLoadingComponent>,
      },

    ]
  },
  {
    path: "sucursales",
    element: <SuspenseLoadingComponent ><Sucursales /></SuspenseLoadingComponent>,
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
      <AlertaRertyProvider>
        <Provider store={store}>
          <ContenedorDeToast>
            <RouterProvider router={router}></RouterProvider>
          </ContenedorDeToast>
        </Provider>
      </AlertaRertyProvider>
    </Suspense>
  )
}

export default App