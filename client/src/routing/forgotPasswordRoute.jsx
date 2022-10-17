import { Navigate } from "react-router-dom";
import { PUBLIC_PATHS, PROTECTED_PATHS, FORGOTPASSWORD_PATHS } from "./pagePath";
import Verify from "../pages/Verify";

const { FORGOT_PASSWORD } = FORGOTPASSWORD_PATHS;

const VERIFY_ROUTES = [
  { path: FORGOT_PASSWORD, element: <Verify /> },
  { path: "/", element: <Navigate to={FORGOT_PASSWORD} /> },
  // this enables you not to access the protected routes when logged in
  ...Object.values(PROTECTED_PATHS).map((route) => {
    return {
      path: route,
      element: <Navigate to="/" />,
    };
  }),
  ...Object.values(PUBLIC_PATHS).map((route) => {
    return {
      path: route,
      element: <Navigate to="/" />,
    };
  }),
  { path: "*", element: <div>Page not found</div> },
];

export default VERIFY_ROUTES;