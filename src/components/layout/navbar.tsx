import { NavLink } from "react-router-dom";
import { menuData } from "../../constants/data";

const Sidebar = () => {
    return <aside className="w-64 bg-white shadow-md">

       {
        menuData.map(item => (
            <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer">
                <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                        `flex items-center gap-2 ${isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`
                    }
                >
                    <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                    <span>{item.title}</span>
                </NavLink>
            </div>
        ))
       }

    </aside>
}
export default Sidebar;