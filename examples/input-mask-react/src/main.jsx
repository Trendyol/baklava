import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@trendyol/baklava';
import '@trendyol/baklava/dist/themes/default.css';
import { setIconPath } from '@trendyol/baklava';
setIconPath('https://cdn.jsdelivr.net/npm/@trendyol/baklava@3.0.0/dist/assets');

import './styles/global.css';

import Root from './examples/Root';
import Maskito from './examples/maskito/Maskito';
import IMask from './examples/imask/IMask';

const router = createBrowserRouter([
  {
    path: '/maskito',
    element: <Maskito />,
  },
  {
    path: '/imask',
    element: <IMask />,
  },
  {
    path: '/',
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
