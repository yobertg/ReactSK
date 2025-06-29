import React, { useState } from "react";
import Button from "./button";
import Input from "./input";

const ModalEdit = ({ closeModal, mahasiswa, handleUpdateMahasiswa }) => {
  const [nim, setNim] = useState(mahasiswa.NIM);
  const [nama, setNama] = useState(mahasiswa.nama);
  const [status, setStatus] = useState(mahasiswa.status);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (window.confirm("Apakah Anda yakin ingin memperbarui data mahasiswa ini?")) {
      handleUpdateMahasiswa({ NIM: nim, nama, status });
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Mahasiswa</h2>
          <Button onClick={closeModal} tulisanButton="×" classname="text-gray-600 hover:text-gray-800" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              classname="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
              placeholder="NIM"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              disabled
            />
          </div>
          <div className="mb-4">
            <Input
              classname="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <select
              className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="true">Aktif</option>
              <option value="false">Tidak Aktif</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={closeModal} classname="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded mr-2" tulisanButton="Batal" />
            <Button type="submit" classname="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" tulisanButton="Simpan" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
