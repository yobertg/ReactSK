import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../Utils/Apis/UserApi';
import { toastError } from '../Utils/Helpers/ToastHelpers';

function UserDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserDetail();
    }, [id]);

    const fetchUserDetail = async () => {
        try {
            setLoading(true);
            const response = await getUser(id);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user detail:', error);
            toastError('Gagal mengambil data user');
        } finally {
            setLoading(false);
        }
    };

    const getRoleBadgeStyle = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'dosen':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'mahasiswa':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">User Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-6">User dengan ID {id} tidak ditemukan dalam sistem.</p>
                    <button
                        onClick={() => navigate('/admin/user')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Kembali ke Daftar User
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Detail User</h1>
                    <p className="text-gray-600 mt-1">Informasi lengkap user sistem</p>
                </div>
                <button
                    onClick={() => navigate('/admin/user')}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali
                </button>
            </div>

            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header Card */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="text-white">
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                            <p className="text-blue-100">{user.email}</p>
                            <div className="mt-2">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeStyle(user.role)} bg-white`}>
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detail Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                                Informasi Dasar
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">ID User</label>
                                    <p className="mt-1 text-sm text-gray-900">{user.id}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Nama Lengkap</label>
                                    <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Email</label>
                                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Role</label>
                                    <p className="mt-1">
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getRoleBadgeStyle(user.role)}`}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Permissions */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                                Permissions ({user.permission?.length || 0})
                            </h3>
                            {user.permission && user.permission.length > 0 ? (
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {user.permission.map((permission, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-2 bg-gray-50 rounded-md"
                                        >
                                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm text-gray-700">{permission}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-gray-500">Tidak ada permission yang diberikan</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Security Information */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Informasi Keamanan
                        </h3>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                            <div className="flex">
                                <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h4 className="text-sm font-medium text-yellow-800">Password</h4>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        Password user disembunyikan untuk alasan keamanan. Untuk mengubah password, gunakan fitur edit user.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
                        <button
                            onClick={() => navigate(`/admin/user`)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Edit User
                        </button>
                        <button
                            onClick={() => navigate('/admin/user')}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Kembali ke Daftar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;