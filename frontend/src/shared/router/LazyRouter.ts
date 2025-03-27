import { lazy } from "react";

const Offers = lazy(() => import("../../pages/Offers/Offers"));

const NewOffer = lazy(() => import("../../pages/Offers/New/NewOffer"));

// Users
const Users = lazy(() => import("../../pages/Users/Users"));
// const NewUser = lazy(() => import("../../pages/Users/New/NewUser"));

//
export { Offers, NewOffer, Users };
