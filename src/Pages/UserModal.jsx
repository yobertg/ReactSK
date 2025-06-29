import React from 'react';

function UserModal({ 
    isModalOpen, 
    isEdit, 
    onClose, 
    onSubmit, 
    form, 
    handleChange, 
    handlePermissionChange,
    availablePermissions 
}) {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {isEdit ? 'Edit User' : 'Tambah User'}
                </h2>
               
                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nama */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
                                placeholder="contoh@email.com"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
                                placeholder="Minimal 6 karakter"
                                required
                                minLength={6}
                            />
                        </div>

                        {/* Role */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
                                required
                            >
                                <option value="mahasiswa">Mahasiswa</option>
                                <option value="dosen">Dosen</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    {/* Permissions */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Permissions
                        </label>
                        <div className="border border-gray-300 rounded-md p-4 max-h-48 overflow-y-auto">
                            {availablePermissions[form.role] && availablePermissions[form.role].length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {availablePermissions[form.role].map((permission) => (
                                        <label key={permission} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={form.permission.includes(permission)}
                                                onChange={() => handlePermissionChange(permission)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{permission}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">Tidak ada permission tersedia untuk role ini</p>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Permission akan otomatis disesuaikan berdasarkan role yang dipilih
                        </p>
                    </div>

                    {/* Selected Permissions Preview */}
                    {form.permission.length > 0 && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Selected Permissions ({form.permission.length})
                            </label>
                            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md max-h-32 overflow-y-auto">
                                {form.permission.map((perm, index) => (
                                    <span 
                                        key={index}
                                        className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                                    >
                                        {perm}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {isEdit ? 'Update' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserModal;