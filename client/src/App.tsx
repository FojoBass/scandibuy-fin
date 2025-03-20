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
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
