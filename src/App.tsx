import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingView from "./pages/LandingView";
import PostView from "./pages/PostView";
import UserView from "./pages/UserView";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingView />,
  },

  {
    path: "/post/:id",
    element: <PostView />,
  },
  {
    path: "user/:id",
    element: <UserView />,
  },
]);

function App() {
  return (
    <div className="App">
      <div className="main-nav">Forum</div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
