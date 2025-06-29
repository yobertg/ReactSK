import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormRegister from './Auth/Components/formRegister'; // Pastikan path-nya benar
import { toastError, toastSuccess } from '../Utils/Helpers/ToastHelpers';
import { register } from "../Utils/Apis/AuthApi";

function Register() {
 const [form, setForm] = useState({
             id: '',
             name: '',
             email: '',
             password: ''
         });
  const navigate = useNavigate();
  const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


 const handleRegister = async (e) => {
  e.preventDefault();

            register(form);
            toastSuccess('Berhasil Registrasi')
            navigate("/");

};

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Register
      </h2>
      <FormRegister              
        onSubmit={handleRegister}
        form={form}
        handleChange={handleChange}
      />
      
    </>
  );
}

export default Register;