import React from "react";
import Button from "./button";
import { useAuthStateContext } from "@/Pages/Context/AuthContext";


const Header = () => {
  // Fungsi untuk toggle menu profil
  const { user } = useAuthStateContext();
  const toggleProfileMenu = () => {
    const menu = document.getElementById("profileMenu");
    if (menu) {
      menu.classList.toggle("hidden");
    }
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800">Mahasiswa</h1>
      <h1>Login sebagai: <strong>{user?.role}</strong></h1>
      <div className="relative">
        {/* <button
          onClick={toggleProfileMenu}
          className="w-8 h-8 rounded-full bg-gray-300 focus:outline-none"
        ></button> */}
        {/* Contoh penggunaan komponen Button */}
        <Button onClick={toggleProfileMenu} tulisanButton="" classname="w-8 h-8 rounded-full bg-gray-300 focus:outline-none" />
        <div
          id="profileMenu"
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg hidden"
        >
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profil
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
