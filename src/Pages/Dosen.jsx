import React, { useState, useEffect} from 'react';
import DosenModal from './DosenModal';
import DosenTable from './DosenTable';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '../Utils/Helpers/ToastHelpers';
import { confirmDelete, confirmUpdate } from '../Utils/Helpers/SwalHelpers';
// import {
//   getAllDosen,
//   storeDosen,
//   updateDosen,
//   deleteDosen,
// } from "../Utils/Apis/DosenApi";
import { useDosen } from '../Utils/Hooks/useDosen';
import { useStoreDosen, useUpdateDosen, useDeleteDosen } from '../Utils/Hooks/useDosen';
 // boundary error : 
 // 1. disebabkan karena bisa jadi struktur data salah pada saat fetch atau post data, 
 // 2. passing props child dan parent berbeda

function Dosen() {

      const [page, setPage] = useState(1);
      const [perPage, setPerPage] = useState(5);
      const [sort, setSort] = useState("name");
      const [order, setOrder] = useState("asc");
      const [search, setSearch] = useState("");
  
    const {
      data: result = { data: [], total: 0 },
      isLoading: isLoadingDosen,
    } = useDosen({
      q: search,
      _sort: sort,
      _order: order,
      _page: page,
      _limit: perPage
    });
    const { data: dosen = [] } = result;
    const totalCount = result.total;
    const totalPages = Math.ceil(totalCount / perPage);

  //  const { data: dosen = [] } = useDosen();
   const { mutate: store } = useStoreDosen();
   const { mutate: update } = useUpdateDosen();
   const { mutate: remove } = useDeleteDosen();

    // const [dosen, setDosen] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
            id: '',
            nama: '',
            max_sks: 0
            
        });

        const navigate = useNavigate();

        // useEffect(() => {
        //     setTimeout(() => fetchDosen(), 500);
        //   }, []);
          
        //   const fetchDosen = async () => {
        //      getAllDosen().then((res) => setDosen(res.data));
        //   };

    const openAddModal = () => {
        setForm({ nama: "", max_sks: 0});
        setIsModalOpen(true);
    };

    const handleEdit = (dsn) => {
        setForm({ id: dsn.id, nama: dsn.nama, max_sks: dsn.max_sks });
        setIsEdit(true);
        setIsModalOpen(true);
      };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nama || !form.max_sks)  {
          toastError("Semua Kolom Wajib di isi")
          return;
        }
      
        if (isEdit) {
          confirmUpdate(() => {
            if (form.nama.length < 3) {
              toastError('Nama harus terdiri dari minimal 3 huruf!');
              return false; // gagal
            }
        
             update({ id: form.id, data: form });
             setForm({nama: "", max_sks: 0});
            toastSuccess('Dosen berhasil diupdate!');
            return true; // sukses
          });
        } else {
          const validIds = dosen
            .map(dsn => parseInt(dsn.id))
            .filter(id => !isNaN(id));

          const newId = validIds.length
            ? (Math.max(...validIds) + 1).toString()
            : "1";

              
           const { id, ...newData } = form;
            newData.id = newId; 
          
            toastSuccess('Dosen berhasil ditambah!')
          store(newData);
          
        }
      
        setForm({nama: "", max_sks: 0});
        setIsEdit(false);
        setIsModalOpen(false);
      }

      const handleDelete = async (id) => {
       
        confirmDelete(()=>{
          remove(id);
          toastSuccess('Berhasil Hapus data')
        });

      }
      const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
      const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Dosen</h1>
            <button
                onClick={openAddModal}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Tambah Dosen
            </button>
             <div className="flex flex-wrap gap-2 mb-4">
              {/* Search */}
              <input
                type="text"
                placeholder="Cari nama..."
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
            <DosenModal
                isModalOpen={isModalOpen}
                isEdit={isEdit}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                form={form}
                handleChange={handleChange}
            />
            <DosenTable
                dosen={dosen}
               
                onDelete={handleDelete}
                onEdit={handleEdit}
                onDetail={(id) => navigate(`/admin/dosen/${id}`)}
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

export default Dosen;