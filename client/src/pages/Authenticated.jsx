
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import PROTECTED_ROUTES from "../routing/protectedRoute";

const AppWrapper = () => {
  const routes = useRoutes(PROTECTED_ROUTES);
  return routes;
};

const Authenticated = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};
export default Authenticated;
