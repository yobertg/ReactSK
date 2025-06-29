// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// import Form from "./Pages/Auth/Components/form";
import LayoutAdmin from "./Pages/Layouts/layoutAdmin";
import LayoutAuth from "./Pages/Layouts/layoutAuth";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Pages/components/ProtectedRoute';

import Dashboard from '@/Pages/Dashboard';
// import Mahasiswa from './Pages/mahasiswa';
import Mahasiswa from './Pages/Mahasiswa2';

import Login from "@/Pages/Login";
import MatkulDetail from "./Pages/MatkulDetail";
import DosenDetail from "./Pages/DosenDetail";
import MahasiswaDetail from "./Pages/MahasiswaDetail";
import UserDetail from "./Pages/UserDetail";
import Register from "./Pages/Register";
import Dosen from "./Pages/Dosen";
import Matkul from "./Pages/Matkul";
import User from "./Pages/User";
import RencanaStudi from "./Pages/RencanaStudi";

const App = () => {
  return (  <>
    <BrowserRouter>
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<LayoutAuth />}>
          <Route index element={<Login/>} />
      </Route>
      <Route path="/register" element={<LayoutAuth />}>
          <Route index element={<Register/>} />
      </Route>
      
      {/* Admin Routes */}
      <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Mahasiswa Routes */}
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:id" element={<MahasiswaDetail/>} />

          {/* Dosen Routes */}
          <Route path="dosen" element={<Dosen />} />
          <Route path="dosen/:id" element={<DosenDetail/>} />

          {/* Matkul Routes */}
          <Route path="matkul" element={<Matkul />} />
          <Route path="matkul/:id" element={<MatkulDetail/>} />

          {/* User Routes */}
          <Route path="user" element={<User />} />
          <Route path="user/:id" element={<UserDetail/>} />

          <Route path="rencana-studi" element={<RencanaStudi />} />
        </Route>
    </Routes>
    </BrowserRouter>

    
    </>
  );
};

export default App;