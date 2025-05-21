import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Cadastro from './pages/Cadastro.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AddContact from './pages/AddContact.jsx';
import Chats from './pages/Chats.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/add-contact",
    element: <AddContact />,
  },
  {
    path: "/chats",
    element: <Chats />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);