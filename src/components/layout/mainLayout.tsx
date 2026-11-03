import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./navbar";

const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen gap-2">
            <Header />
            <div className="flex flex-1 gap-2">
                <Sidebar />
                <main className="flex-1 overflow-auto p-4 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;