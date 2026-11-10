import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./Sidebar";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-content">
        <Header />

        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;