import React from 'react';

function MahasiswaTable({ mahasiswa = [], onEdit, onDelete, onDetail, getTotalSks }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max SKS</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {mahasiswa.map((mhs) => {
                        const totalSks = getTotalSks(mhs.id);
                        return (
                            <tr key={mhs.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.nim}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.max_sks}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        onClick={() => onDetail(mhs.id)}
                                        className="text-indigo-600 hover:text-red-900 mr-4"
                                    >
                                        Detail
                                    </button>
                                    <button
                                        onClick={() => onEdit(mhs)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(mhs.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default MahasiswaTable;
