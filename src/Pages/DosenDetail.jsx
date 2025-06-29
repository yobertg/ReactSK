import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getDosen } from "@/Utils/Apis/DosenApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

function DosenDetail() {
  const { id } = useParams();
  const [dosen, setDosen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDosen();
  }, [id]);
  
  const fetchDosen = async () => {
    try {
      const res = await getDosen(id);
      setDosen(res.data);
    } catch (err) {
      toastError("Gagal mengambil data Dosen: ", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Memuat data...</p>;
  return (
    
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Dosen</h1>
      {dosen ? (
        <div className="bg-white p-4 rounded shadow">
        
          <p><strong>Nama Dosen:</strong> {dosen.nama}</p>
          <p><strong>Max SKS:</strong> {dosen.max_sks}</p>
         
        </div>
      ) : (
        <p className="text-red-500">Data dosen tidak ditemukan.</p>
      )}
    </div>
  );
}

export default DosenDetail;
