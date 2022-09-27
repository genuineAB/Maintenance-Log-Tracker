import Home from "../pages/Home";

const PROTECTED_ROUTES = [
  { path: "/", element: <Home /> },
  // { path: "/", element: <div>can you see me</div> },

  { path: "*", element: <div>Page not found</div> },
];

export default PROTECTED_ROUTES;
