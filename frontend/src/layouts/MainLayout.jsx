import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="main-layout">
      <div className="background-gradient"></div>
      <div className="background"></div>
      <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
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
