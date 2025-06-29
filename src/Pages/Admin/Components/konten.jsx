import React, { useState } from "react";
import Button from "./button";
import Modal from "./modal"; // Import Modal component

const Konten = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="flex-1 p-6 overflow-x-auto">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-end mb-4">
            <Button
              onClick={openModal}
              tulisanButton="+ Tambah Mahasiswa" // Perbaiki typo
              classname="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            />
          </div>
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4">NIM</th>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">Jurusan</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4">12345</td>
                <td className="py-2 px-4">James Smith</td>
                <td className="py-2 px-4">Teknik Informatika</td>
                <td className="py-2 px-4">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">
                    Hapus
                  </button>
                </td>
              </tr>
              <tr className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4">34564</td>
                <td className="py-2 px-4">Jane Bow</td>
                <td className="py-2 px-4">Sistem Informasi</td>
                <td className="py-2 px-4">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">
                    Hapus
                  </button>
                </td>
              </tr>
              <tr className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4">13962</td>
                <td className="py-2 px-4">The, Obed Danny K. T</td>
                <td className="py-2 px-4">Teknik Informatika</td>
                <td className="py-2 px-4">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      {/* Render Modal di sini dan kontrol visibilitasnya */}
      {isModalOpen && <Modal closeModal={closeModal} />}
    </>
  );
};

export default Konten;