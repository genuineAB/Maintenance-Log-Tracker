import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import PUBLIC_ROUTES from "../routing/unprotectedRoute";

const AppWrapper = () => {
  const routes = useRoutes(PUBLIC_ROUTES);
  return routes;
};

const UnAuthenticated = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};
export default UnAuthenticated;
