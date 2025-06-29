import React, { useState, useEffect} from 'react';
import UserModal from './UserModal';
import UserTable from './UserTable';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '../Utils/Helpers/ToastHelpers';
import { confirmDelete, confirmUpdate } from '../Utils/Helpers/SwalHelpers';
import {
  getAllUser,
  storeUser,
  updateUser,
  deleteUser,
} from "../Utils/Apis/UserApi";

function User() {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        role: 'mahasiswa',
        permission: []
    });

    const navigate = useNavigate();

   
    const availablePermissions = {
        admin: [
            'dashboard.page',
            'mahasiswa.page',
            'mahasiswa.read',
            'mahasiswa.create',
            'mahasiswa.update',
            'mahasiswa.delete',
            'matkul.page',
            'matkul.read',
            'matkul.create',
            'matkul.update',
            'matkul.delete',
            'user.page',
            'user.read',
            'user.create',
            'user.update',
            'user.delete'
        ],
        mahasiswa: [
            'krs.page',
            'krs.read',
            'profile.page',
            'profile.update'
        ],
        dosen: [
            'jadwal.page',
            'jadwal.read',
            'nilai.page',
            'nilai.read',
            'nilai.update'
        ]
    };

    useEffect(() => {
        setTimeout(() => fetchUsers(), 500);
    }, []);
    
    const fetchUsers = async () => {
        getAllUser().then((res) => setUsers(res.data));
    };

    const openAddModal = () => {
        setForm({ 
            name: "", 
            email: "", 
            password: "", 
            role: "mahasiswa", 
            permission: availablePermissions.mahasiswa 
        });
        setIsEdit(false);
        setIsModalOpen(true);
    };

    const handleEdit = (user) => {
        setForm({ 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            password: user.password,
            role: user.role,
            permission: user.permission || []
        });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'role') {
            
            setForm({ 
                ...form, 
                [name]: value,
                permission: availablePermissions[value] || []
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handlePermissionChange = (permission) => {
        const updatedPermissions = form.permission.includes(permission)
            ? form.permission.filter(p => p !== permission)
            : [...form.permission, permission];
        
        setForm({ ...form, permission: updatedPermissions });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validasi input
        if (!form.name || !form.email || !form.password || !form.role) {
            toastError("Semua Kolom Wajib diisi");
            return;
        }

        if (form.name.length < 3) {
            toastError('Nama harus terdiri dari minimal 3 huruf!');
            return;
        }

        if (!validateEmail(form.email)) {
            toastError('Format email tidak valid!');
            return;
        }

        if (form.password.length < 6) {
            toastError('Password harus minimal 6 karakter!');
            return;
        }

        
        const emailExists = users.some(user => 
            user.email === form.email && user.id !== form.id
        );
        
        if (emailExists) {
            toastError('Email sudah digunakan!');
            return;
        }
      
        if (isEdit) {
            confirmUpdate(() => {
                updateUser(form.id, form);
                toastSuccess('User berhasil diupdate!');
                fetchUsers(); 
                return true;
            });
        } else {
            const validIds = users
                .map(user => parseInt(user.id))
                .filter(id => !isNaN(id));

            const newId = validIds.length
                ? (Math.max(...validIds) + 1).toString()
                : "1";
                
            const { id, ...newData } = form;
            newData.id = newId; 
          
            storeUser(newData);
            toastSuccess('User berhasil ditambah!');
            fetchUsers(); // Refresh data
        }
      
        setForm({
            name: "",
            email: "",
            password: "",
            role: "mahasiswa",
            permission: []
        });
        setIsEdit(false);
        setIsModalOpen(false);
    };

    const handleDelete = async (id) => {
        confirmDelete(() => {
            deleteUser(id);
            toastSuccess('Berhasil Hapus User');
            fetchUsers(); // Refresh data
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data User</h1>
            <button
                onClick={openAddModal}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Tambah User
            </button>
            <UserModal
                isModalOpen={isModalOpen}
                isEdit={isEdit}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                form={form}
                handleChange={handleChange}
                handlePermissionChange={handlePermissionChange}
                availablePermissions={availablePermissions}
            />
            <UserTable
                users={users}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onDetail={(id) => navigate(`/admin/user/${id}`)}
            />
        </div>
    );
}

export default User;