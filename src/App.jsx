import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { LoginChecker, RouteProtected } from "./routes/ProtectedRoutes";
import CricketHomePage from "./game_routes/Cricket";
import NotFound from "./components/NotFound";
import TeamSelection from "./Game_Section/Teams";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginChecker>
        <Login />
      </LoginChecker>
    ),
  },
  {
    path: "/signup",
    element: (
      <LoginChecker>
        <Signup />
      </LoginChecker>
    ),
  },
  {
    path: "/Cricket",
    element: (
      <RouteProtected>
        <CricketHomePage />
      </RouteProtected>
    ),
  },
  {
    path: "/teams",
    element: (
      <RouteProtected>
        <TeamSelection />
      </RouteProtected>
    ),
  },
  {
    path: "*",
    element: <NotFound />, // No RouteProtected for 404
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
