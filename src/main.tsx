import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import Result from './Result/index.tsx';
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyle from './theme/globalStyles.ts';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main style={{ width: '100vw', height:'100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <RouterProvider router={router} />
      </main>
    </ThemeProvider>
  </React.StrictMode>,
)
