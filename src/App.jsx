import Login from "./Login";
import "./App.css";
import { Router, useRoutes } from "react-router-dom";
import routes from "./router/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  // const GetRoutes = () => useRoutes(routes)
  const element = useRoutes(routes);
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {element}
        {/* <App /> */}
      </DndProvider>
    </>
  );
}

export default App;
