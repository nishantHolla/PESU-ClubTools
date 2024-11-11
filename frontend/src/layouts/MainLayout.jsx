import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="main-layout">
      <div className="background-gradient"></div>
      <div className="background"></div>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
