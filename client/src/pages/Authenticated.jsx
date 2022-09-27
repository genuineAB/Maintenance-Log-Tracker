import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import PRIVATE_ROUTES from "../routing/protectedRoute";

const AppWrapper = () => {
  const routes = useRoutes(PRIVATE_ROUTES);
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
