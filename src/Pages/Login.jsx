import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Form from './Auth/Components/form'; // Pastikan path-nya benar
import { toastError, toastSuccess } from '../Utils/Helpers/ToastHelpers';
import { login } from "../Utils/Apis/AuthApi";
import { useAuthStateContext } from './Context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useAuthStateContext();

  if (user) return <Navigate to="/admin" />;


 const handleLogin = async (e) => {
  e.preventDefault();
  // const { email } = email;
  // const { password } = password;

  try {
    const user = await login(email, password);
    setUser(user); // ini akan simpan ke context + localStorage
    localStorage.setItem("user", JSON.stringify(user));
    toastSuccess("Login berhasil");
   setTimeout(() => {
      navigate("/admin/dashboard");
    }, 10);
  } catch (err) {
    toastError(err.message);
  }
};

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Login
      </h2>
      <Form 
        onSubmit={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <p className="text-sm text-center text-blue-600 mt-4">
        Belum punya akun?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Daftar
        </a>
      </p>
    </>
  );
}

export default Login;