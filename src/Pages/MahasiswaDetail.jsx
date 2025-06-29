import { useParams } from 'react-router-dom';
import mahasiswaList from '../data/mahasiswaList.json';
import { getMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

function MahasiswaDetail() {
  const { id } = useParams();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMahasiswa();
  }, [id]);
  
  const fetchMahasiswa = async () => {
    try {
      const res = await getMahasiswa(id);
      setMahasiswa(res.data);
    } catch (err) {
      toastError("Gagal mengambil data mahasiswa: ", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Memuat data...</p>;
  return (
    
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Mahasiswa</h1>
      {mahasiswa ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>NIM:</strong> {mahasiswa.nim}</p>
          <p><strong>Nama:</strong> {mahasiswa.nama}</p>
         
        </div>
      ) : (
        <p className="text-red-500">Data mahasiswa tidak ditemukan.</p>
      )}
    </div>
  );
}

export default MahasiswaDetail;
