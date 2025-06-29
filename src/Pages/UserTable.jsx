import React from 'react';

function UserTable({ users = [], onEdit, onDelete, onDetail }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    user.role === 'admin' 
                                        ? 'bg-red-100 text-red-800' 
                                        : user.role === 'dosen'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <div className="max-w-xs">
                                    {user.permission && user.permission.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {user.permission.slice(0, 3).map((perm, index) => (
                                                <span 
                                                    key={index}
                                                    className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                                                >
                                                    {perm}
                                                </span>
                                            ))}
                                            {user.permission.length > 3 && (
                                                <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-500 rounded">
                                                    +{user.permission.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">No permissions</span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                    onClick={() => onDetail(user.id)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                    Detail
                                </button>
                                <button
                                    onClick={() => onEdit(user)}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(user.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {users.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    Tidak ada data user
                </div>
            )}
        </div>
    );
}

export default UserTable;