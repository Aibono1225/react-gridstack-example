import Login from './Login';
import './App.css';
import { Router, useRoutes } from 'react-router-dom';
import routes from './router/index'

function App() {
  // const GetRoutes = () => useRoutes(routes)
  const element = useRoutes(routes)
  return (
    <>
    {element}
    </>
  );
}

export default App;
