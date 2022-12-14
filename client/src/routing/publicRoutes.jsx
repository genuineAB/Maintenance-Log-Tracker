import { Navigate } from "react-router-dom";
import { PUBLIC_PATHS, PROTECTED_PATHS} from "./pagePath";
import Login from "../pages/Login";
import PasswordPage from "../pages/PasswordPage";
import ResetPassword from "../pages/ResetPassword";

const { LOGIN } = PUBLIC_PATHS;

const PUBLIC_ROUTES = [
  { path: LOGIN, element: <Login /> },
  { path: "/", element: <Login /> },
  // this enables you not to access the protected routes when logged in
  ...Object.values(PROTECTED_PATHS).map((route) => {
    return {
      path: route,
      element: <Navigate to="/" />,
    };
  }),

  {path: "/forgotpassword", element: <div><PasswordPage /></div> },

  {path: "/resetpassword", element: <div><ResetPassword /></div> },

  { path: "*", element: <div>Page not found</div> },
];

export default PUBLIC_ROUTES;
