
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import VERIFY_ROUTES from "../routing/unverifiedRoute";

const AppWrapper = () => {
  const routes = useRoutes(VERIFY_ROUTES);
  return routes;
};

const unVerified = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};
export default unVerified;
