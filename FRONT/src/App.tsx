import React from 'react';
import logo from './logo.svg';
import './App.css';
import Example from './components/Example';
import Pokedex from './components/Pokedex';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CreateUserForm from './screens/CreateUserForm';
import Reminders from './screens/Reminders';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Reminders/>,
  },
  {
    path: "/pokedex",
    element: (
      <Pokedex></Pokedex>
    ),
  },
  {
    path: "/user-form",
    element: <CreateUserForm></CreateUserForm>,
  },
  {
    path: "/reminders",
    element: <Reminders/>,
  },
]);

function App() {
  return (
    <main className="App">
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </main>
  );
}

export default App;
