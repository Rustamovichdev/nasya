import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#f5f7fb]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4">
        <Header />

        <main className="min-h-0 flex-1 overflow-auto rounded-xl bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;