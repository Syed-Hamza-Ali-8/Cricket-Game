import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { LoginChecker, RouteProtected } from "./routes/ProtectedRoutes";
import CricketHomePage from "./game_routes/Cricket";
import NotFound from "./components/NotFound";
import TeamSelection from "./Game_Section/Teams";
import Playing11 from "./Game_Section/Players";
import Toss from "./Game_Section/Toss";

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
    path: "/playing11",
    element: (
      <RouteProtected>
        <Playing11 />
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
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
