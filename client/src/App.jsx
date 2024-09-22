import "./App.css";

import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import useUserStore from "./store/store";

function App() {

  const setUser = useUserStore(state => state.setUser)
  setUser(null);
  return (
    <div className="w-full min-h-screen">
      <Navbar/>
      <Outlet />
    </div>
  );
}

export default App;
