import React from 'react';

function MatkulModal({ isModalOpen, isEdit, onClose, onSubmit, form, handleChange}) {


    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {isEdit ? 'Edit Matkul' : 'Tambah Matkul'}
                </h2>
               
                <form onSubmit={onSubmit}>
                    
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nama Matkul</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">SKS Matkul</label>
                        <input
                            type="number"
                            name="sks"
                            value={form.sks}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                    
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

export default MatkulModal;