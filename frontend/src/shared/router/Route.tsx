import { createBrowserRouter } from "react-router-dom";
import { Offers, NewOffer, Users } from "./LazyRouter";
// Components
import LoginPage from "@pages/Auth/Login";
import Layout from "@components/Layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

export const RoutePages = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Offers />
      </ProtectedRoute>
    ),
    label: "Angebote/Aufträge",
  },
  {
    path: "/angebote/neu", //new offer
    element: (
      <ProtectedRoute>
        <NewOffer />
      </ProtectedRoute>
    ),
    label: "Neuen Angebot erstellen",
  },
  {
    path: "/benutzer", // users
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
    label: "Benutzer",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: RoutePages,
  },
  {
    path: "/anmelden",
    element: <LoginPage />,
  },
  // { path: "*", element: <NotFoundPage /> },
]);
