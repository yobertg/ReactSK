import React, { useState, useEffect} from 'react';
import MahasiswaModal from './MahasiswaModal';
import MahasiswaTable from './MahasiswaTable';
// import mahasiswaList from '../data/mahasiswaList.json';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '../Utils/Helpers/ToastHelpers';
import { confirmDelete, confirmUpdate } from '../Utils/Helpers/SwalHelpers';
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "../Utils/Apis/MahasiswaApi";
import { getAllKelas } from "../Utils/Apis/KelasApi";
import { getAllMatkul } from "../Utils/Apis/MatkulApi"
import { useMahasiswa } from '../Utils/Hooks/useMahasiswa';
import { useMatkul } from '../Utils/Hooks/useMatkul';
import { useKelas } from '../Utils/Hooks/useKelas';
import { useStoreMahasiswa, useUpdateMahasiswa, useDeleteMahasiswa } from '../Utils/Hooks/useMahasiswa';
 // boundary error : 
 // 1. disebabkan karena bisa jadi struktur data salah pada saat fetch atau post data, 
 // 2. passing props child dan parent berbeda

function Mahasiswa() {

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("name");
    const [order, setOrder] = useState("asc");
    const [search, setSearch] = useState("");

  const {
    data: result = { data: [], total: 0 },
    isLoading: isLoadingMahasiswa,
  } = useMahasiswa({
    q: search,
    _sort: sort,
    _order: order,
    _page: page,
    _limit: perPage
  });

 
  const { data: mahasiswa = [] } = result;
  // const { data: kelas = [] } = resultKelas;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / perPage);
  // const { data: kelas = [] } = useKelas();
  // const { data: mataKuliah = [] } = useMatkul();

  const { data: kelasResult = { data: [] } } = useKelas();
  const { data: matkulResult = { data: [] } } = useMatkul();

  const kelas = kelasResult.data || [];
  const mataKuliah = matkulResult.data || [];

  const { mutate: store } = useStoreMahasiswa();
  const { mutate: update } = useUpdateMahasiswa();
  const { mutate: remove } = useDeleteMahasiswa();



  // const [kelas, setKelas] = useState([]);
  // const [mataKuliah, setMataKuliah] = useState([]);
  // const [mahasiswa, setMahasiswa] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
            id: '',
            nim: '',
            nama: '',
            // prodi: '',
            // angkatan: ''
        })
        const navigate = useNavigate();
        // useEffect(() => {
        //     setTimeout(() => fetchData(), 500);
        //   }, []);

        // const fetchData = async () => {
        //     const [resKelas, resMahasiswa, resMataKuliah] = await Promise.all([
        //       getAllKelas(),
        //       getAllMahasiswa(),
        //       getAllMatkul(),
        //     ]);
        //     setKelas(resKelas.data);
        //     setMahasiswa(resMahasiswa.data);
        //     setMataKuliah(resMataKuliah.data);
        // };  
          
        //   const fetchMahasiswa = async () => {
        //      getAllMahasiswa().then((res) => setMahasiswa(res.data));
        //   };
        
    const openAddModal = () => {
        setForm({ nim: "", nama: "",  max_sks: 0});
        setIsModalOpen(true);
    };
    const handleEdit = (mhs) => {
        setForm({ id: mhs.id, nim: mhs.nim, nama: mhs.nama, max_sks: mhs.max_sks });
        setIsEdit(true);
        setIsModalOpen(true);
      };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        if (!form.nim || !form.nama || !form.max_sks) {
          toastError("Semua Kolom Wajib di isi")
          return;
        }
      
        if (isEdit) {
          confirmUpdate(() => {
            if (form.nama.length < 3) {
              toastError('Nama harus terdiri dari minimal 3 huruf!');
              return false; // gagal
            }
        
            // updateMahasiswa(form.id, form);
            update({ id: form.id, data: form });
            setForm({ nim: "", nama: "", max_sks: 0});
            toastSuccess('Mahasiswa berhasil diupdate!');
            return true; // sukses
          });
        } else {
          const exists = mahasiswa.find((m) => m.nim === form.nim);
          if (exists) {
            toastError("NIM sudah terdaftar")
            return;
          }
          const validIds = mahasiswa
            .map(mhs => parseInt(mhs.id))
            .filter(id => !isNaN(id));

          const newId = validIds.length
            ? (Math.max(...validIds) + 1).toString()
            : "1";

              
           const { id, ...newData } = form;
            newData.id = newId;  // Menambahkan ID baru sebagai string
              
            store(newData);
          toastSuccess('Mahasiswa berhasil ditambah!')
        }
      
        setForm({ nim: "", nama: "", max_sks: 0});
        setIsEdit(false);
        setIsModalOpen(false);
      }

      const handleDelete = async (id) => {
       
        confirmDelete(()=>{
          // deleteMahasiswa(id);
          remove(id);
          toastSuccess('Berhasil Hapus data')
        });

      }
      // logika ini digunakan dan dipassing di saat menampilkan komponen table
      const getTotalSks = (mhsId) => {
        return kelas
          .filter(k => k.mahasiswa_ids.includes(mhsId))
          .map(k => mataKuliah.find(mk => mk.id === k.mata_kuliah_id)?.sks || 0)
          .reduce((a, b) => a + b, 0);
      };
      const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
      const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Mahasiswa</h1>
            <button
                onClick={openAddModal}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Tambah Mahasiswa
            </button>
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Search */}
              <input
                type="text"
                placeholder="Cari nama/NIM..."
                className="border px-3 py-1 rounded flex-grow"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              {/* Sort By Field */}
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="border px-3 py-1 rounded"
              >
                <option value="nama">Sort by Nama</option>
                <option value="nim">Sort by NIM</option>
                <option value="max_sks">Sort by Max SKS</option>
              </select>

              {/* Sort Order */}
              <select
                value={order}
                onChange={(e) => {
                  setOrder(e.target.value);
                  setPage(1);
                }}
                className="border px-3 py-1 rounded"
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
            <MahasiswaModal
                isModalOpen={isModalOpen}
                isEdit={isEdit}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                form={form}
                handleChange={handleChange}
            />
            <MahasiswaTable
                mahasiswa={mahasiswa}
                getTotalSks={getTotalSks}  // passing props ke komponen table
                onDelete={handleDelete}
                onEdit={handleEdit}
                onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
                isLoading={isLoadingMahasiswa}
            />
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm">
                Halaman {page} dari {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  onClick={handlePrev}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <button
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  onClick={handleNext}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
        </div>
    );
}

export default Mahasiswa;