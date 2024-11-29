import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { LoginChecker, RouteProtected } from "./routes/ProtectedRoutes";
import CricketHomePage from "./game_routes/Cricket";
import Teams from "./Game_Section/Teams";
import Toss from "./Game_Section/Toss"; // Import Toss page
import Match from "./game_routes/Match";

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
        <Teams />
      </RouteProtected>
    ),
  },
  {
    path: "/toss",
    element: (
      <RouteProtected>
        <Toss />
      </RouteProtected>
    ),
  },
  {
    path: "/match",
    element: (
      <RouteProtected>
        <Match />
      </RouteProtected>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
