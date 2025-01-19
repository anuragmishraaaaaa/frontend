import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login/login';
import SignUp from './pages/Signup/signup';
import Dashboard from './pages/Dashboard/eventDisplay';
import Dashboards from './pages/Dashboard/eventCreation';

import './App.css';
import EditEvent from './pages/Dashboard/eventEdit';

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/eventDisplay", element: <Dashboard /> },
  { path: "/eventCreation", element: <Dashboards /> },
  { path: "/edit/:id", element: <EditEvent /> }
])
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
