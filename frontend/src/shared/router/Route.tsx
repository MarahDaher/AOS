import { createBrowserRouter } from "react-router-dom";
import { Offers, NewOffer, Users } from "./LazyRouter";
// Components
import LoginPage from "@pages/Auth/Login";
import Layout from "@components/Layout/Layout";

export const RoutePages = [
  {
    path: "/",
    element: <Offers />,
    label: "Angebote/Aufträge",
  },
  {
    path: "/angebote/neu", //new offer
    element: <NewOffer />,
    label: "Neuen Angebot erstellen",
  },
  {
    path: "/benutzer", // users
    element: <Users />,
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
