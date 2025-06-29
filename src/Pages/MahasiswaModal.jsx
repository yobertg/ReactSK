import React from 'react';

function MahasiswaModal({ isModalOpen, isEdit, onClose, onSubmit, form, handleChange}) {


    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {isEdit ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}
                </h2>
              
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">NIM</label>
                        <input
                            type="text"
                            name="nim"
                            value={form.nim}
                            readOnly={isEdit}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                            
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                        <input
                            type="text"
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Max SKS</label>
                        <input
                            type="number"
                            name="max_sks"
                            value={form.max_sks}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Prodi</label>
                        <input
                            type="text"
                            name="prodi"
                            value={form.prodi}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Angkatan</label>
                        <input
                            type="text"
                            name="angkatan"
                            value={form.angkatan}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                        />
                    </div> */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MahasiswaModal;