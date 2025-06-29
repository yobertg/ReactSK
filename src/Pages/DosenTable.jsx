import React from 'react';

function DosenTable({ dosen = [], onEdit, onDelete, onDetail }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Dosen</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max SKS</th>
                       
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dosen.map((dsn) => (
                        <tr key={dsn.id}>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dsn.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dsn.nama}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dsn.max_sks}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                    onClick={() => onDetail(dsn.id)}
                                    className="text-indigo-600 hover:text-red-900 mr-4"
                                >
                                    Detail
                                </button>
                                <button
                                    onClick={() => onEdit(dsn)}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(dsn.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DosenTable;