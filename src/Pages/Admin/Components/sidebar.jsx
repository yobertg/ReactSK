import React from "react";
import { NavLink } from 'react-router-dom';
import Logout from "../../components/Logout";
import { useAuthStateContext } from "../../Context/AuthContext";


const Sidebar = () => {
  const { user } = useAuthStateContext();
  return (
    <aside className="bg-blue-800 text-white h-full transition-all duration-300 w-20 lg:w-64 fixed">
      <div className="p-4">
        {user && user.permission && user.permission.includes("dashboard.page") && (
          <NavLink 
            to="/admin/dashboard"
            className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`}
          >
            <span className="text-lg">🏠</span>
            <span className="menu-text hidden lg:inline">Dashboard</span>
          </NavLink>
        )}
        {user && user.permission && user.permission.includes("mahasiswa.page") && (
          <NavLink 
            to="/admin/mahasiswa"
            className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`}
          >
            <span className="text-lg">👩‍🎓</span>
            <span className="menu-text hidden lg:inline">Mahasiswa</span>
          </NavLink>
        )}
        <NavLink 
          to="/admin/dosen"
          className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`}
        >
          <span className="text-lg">👩‍🎓</span>
          <span className="menu-text hidden lg:inline">Dosen</span>
        </NavLink>
        <NavLink 
          to="/admin/matkul"
          className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`}
        >
          <span className="text-lg">👩‍🎓</span>
          <span className="menu-text hidden lg:inline">Mata Kuliah</span>
        </NavLink>
         <NavLink 
          to="/admin/user"
          className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`}
        >
          <span className="text-lg">👩‍🎓</span>
          <span className="menu-text hidden lg:inline">Mengelola User</span>
        </NavLink>
        {user.permission.includes("rencana-studi.page") && (
          <NavLink to="/admin/rencana-studi" className="...">
            <span>📚</span>
            <span className="menu-text hidden lg:inline">Rencana Studi</span>
          </NavLink>
        )}
        <Logout className="flex items-center space-x-2 px-6 py-2 rounded hover:bg-blue-700" />
      </div>
    </aside>
  );
};

export default Sidebar;
