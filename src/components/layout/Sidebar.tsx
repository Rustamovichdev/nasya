
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  Users,
  Wallet,
  MessageSquare,
  PhoneCall,
  Settings,
  Plus,
  Store,
} from "lucide-react";

import "./Sidebar.css";

const menuItems = [
  { title: "Boshqaruv paneli", path: "/dashboard", icon: LayoutDashboard },
  { title: "Mijozlar & Qarzdorlar", path: "/debts-customers", icon: Users },
  { title: "Kirim & Chiqim", path: "/cashflow", icon: Wallet },
  { title: "SMS Xabarnomalar", path: "/messages", icon: MessageSquare },
  { title: "Ovozli qo'ng'iroqlar", path: "/voice-calls", icon: PhoneCall },
  { title: "Sozlamalar & Bot", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  const [storeName, setStoreName] = useState("");
  const [editing, setEditing] = useState(false);
  const [inputName, setInputName] = useState("");

  const addStore = () => {
    if (inputName.trim()) {
      setStoreName(inputName.trim());
      setEditing(false);
      setInputName("");
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <BookOpen size={25} />
        </div>
        <div className="sidebar-brand-text">
          <h2>QarzDaftar</h2>
          <span>Nasiya Boshqaruvi</span>
        </div>
      </div>

      <div className="store-card">
        {storeName ? (
          <div className="added-store">
            <Store size={18} />
            <span>{storeName}</span>
            <button onClick={() => setEditing(true)}>✎</button>
          </div>
        ) : editing ? (
          <div className="store-input-area">
            <input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Do'kon nomi"
              autoFocus
            />
            <button onClick={addStore}>Qo'shish</button>
          </div>
        ) : (
          <button
            className="add-store-button"
            onClick={() => setEditing(true)}
          >
            <Plus size={19} />
          </button>
        )}
      </div>

      <div className="sidebar-section-title">
        ASOSIY BO'LIMLAR
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-menu-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} className="menu-icon" />
              <span className="menu-title">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-decoration">
        <div className="decoration-shape shape-one"></div>
        <div className="decoration-shape shape-two"></div>
      </div>
    </aside>
  );
};

export default Sidebar;
