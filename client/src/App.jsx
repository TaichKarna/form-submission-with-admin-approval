import "./App.css";

import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import useUserStore from "./store/store";

const apiUlr = import.meta.env.VITE_API_URL;
export { apiUlr} ;

function App() {


  return (
    <div className="w-full min-h-screen">
      <Navbar/>
      <Outlet />
    </div>
  );
}

export default App;
