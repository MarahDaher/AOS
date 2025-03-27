import { RouterProvider } from "react-router";
import { router } from "./Route";

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
