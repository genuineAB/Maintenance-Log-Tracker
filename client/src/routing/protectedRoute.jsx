import { Navigate } from "react-router-dom";
import { PROTECTED_PATHS, VERIFY_PATHS, PUBLIC_PATHS } from "./pagePath";
import Dashboard from "../pages/Dashboard";

const { DASHBOARD } = PROTECTED_PATHS;

const PROTECTED_ROUTES = [
  { path: DASHBOARD, element: <Dashboard /> },
  { path: "/", element: <Navigate to={DASHBOARD} /> },
  // this enables you not to access the public routes when logged in
  ...Object.values(VERIFY_PATHS).map((route) => {
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

export default PROTECTED_ROUTES;