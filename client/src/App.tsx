import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Toast from './components/Toast';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' Component={Root} errorElement={<NotFound />}>
        <Route index Component={Products} />
        <Route path='p/:id' Component={SingleProduct} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

const Root = () => {
  return (
    <>
      <Toast />
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
