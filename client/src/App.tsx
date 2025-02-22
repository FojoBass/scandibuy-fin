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

/*
This is how the attributes for orders looks like

[{"id": "Size", "selItem": {"id": "40", "value": "40", "__typename": "Attribute", "displayValue": "40"}}]



*/

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
