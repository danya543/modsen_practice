import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainPage } from '../pages/MainPage';
import { Error404 } from '../pages/ErrorPage';


const routerSchema = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />
      },
      /* {
        path: 'sign-in',
        element: <SignInPage />
      },
      {
        path: 'sign-up',
        element: <SignUpPage />
      },*/
  {
    path: '*',
    element: <Error404 />
  }
]);

export const AppRouter = () => <RouterProvider router={routerSchema} />;
