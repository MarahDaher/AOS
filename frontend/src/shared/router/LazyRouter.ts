import { lazy } from "react";

const Offers = lazy(() => import("../../pages/Offers/Offers"));

const OfferForm = lazy(() => import("../../pages/Offers/New/OfferForm"));

// Users
const Users = lazy(() => import("../../pages/Users/Users"));
// const NewUser = lazy(() => import("../../pages/Users/New/NewUser"));

//
export { Offers, OfferForm, Users };
