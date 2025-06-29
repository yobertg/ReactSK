import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getMatkul } from "@/Utils/Apis/MatkulApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

function MatkulDetail() {
  const { id } = useParams();
  const [matkul, setMatkul] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatkul();
  }, [id]);
  
  const fetchMatkul = async () => {
    try {
      const res = await getMatkul(id);
      setMatkul(res.data);
    } catch (err) {
      toastError("Gagal mengambil data Matkul: ", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Memuat data...</p>;
  return (
    
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Matkul</h1>
      {matkul ? (
        <div className="bg-white p-4 rounded shadow">
        
          <p><strong>Nama Matkul:</strong> {matkul.name}</p>
          <p><strong>Jumlah SKS:</strong> {matkul.sks}</p>
         
        </div>
      ) : (
        <p className="text-red-500">Data matkul tidak ditemukan.</p>
      )}
    </div>
  );
}

export default MatkulDetail;
