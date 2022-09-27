import { Navigate } from "react-router-dom";
import Auth from "../components/auth/Auth";

const UNPROTECTED_ROUTES = [
  { path: "/auth", element: <Auth /> },
  // { path: "/auth", element: <div>can you see me</div> },
  { path: "/", element: <Navigate to="/auth" /> },

  { path: "*", element: <div>Page not found</div> },
];

export default UNPROTECTED_ROUTES;
