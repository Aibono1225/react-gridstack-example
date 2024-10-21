import Login from "../Login.jsx";
import NewLogin from "../NewLogin.jsx";
import Callback from "../Callback.jsx";
import Demo from "../Demo.jsx";
import Demo1 from "../Demo1.jsx";
import Demo2 from "../Demo2.jsx";
import Demo3 from "../Demo3.jsx";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "/demo1",
    element: <Demo1 />,
  },
  {
    path: "/demo2",
    element: <Demo2 />,
  },
  {
    path: "/demo3",
    element: <Demo3 />,
  },
  {
    path: "/newlogin",
    element: <NewLogin />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
];

export default routes;
