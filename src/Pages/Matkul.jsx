import React, { useState, useEffect} from 'react';
import MatkulModal from './MatkulModal';
import MatkulTable from './MatkulTable';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '../Utils/Helpers/ToastHelpers';
import { confirmDelete, confirmUpdate } from '../Utils/Helpers/SwalHelpers';
import { useMatkul } from '../Utils/Hooks/useMatkul';
import { useStoreMatkul, useUpdateMatkul, useDeleteMatkul } from '../Utils/Hooks/useMatkul';

function Matkul() {

          const [page, setPage] = useState(1);
          const [perPage, setPerPage] = useState(5);
          const [sort, setSort] = useState("name");
          const [order, setOrder] = useState("asc");
          const [search, setSearch] = useState("");
      
        const {
          data: result = { data: [], total: 0 },
          isLoading: isLoadingMatkul,
        } = useMatkul({
          q: search,
          _sort: sort,
          _order: order,
          _page: page,
          _limit: perPage
        });
        const { data: matkul = [] } = result;
        const totalCount = result.total;
        const totalPages = Math.ceil(totalCount / perPage);

       const { mutate: store } = useStoreMatkul();
       const { mutate: update } = useUpdateMatkul();
       const { mutate: remove } = useDeleteMatkul();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
            id: '',
            name: '',
            sks: 0
        });

        const navigate = useNavigate();


    const openAddModal = () => {
        setForm({ name: "", sks: 0});
        setIsModalOpen(true);
    };
    

   

    const handleEdit = (mtkl) => {
        setForm({ id: mtkl.id, name: mtkl.name, sks: mtkl.sks });
        setIsEdit(true);
        setIsModalOpen(true);
      };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.sks)  {
          toastError("Semua Kolom Wajib di isi")
          return;
        }
      
        if (isEdit) {
          confirmUpdate(() => {
            if (form.name.length < 3) {
              toastError('name harus terdiri dari minimal 3 huruf!');
              return false; // gagal
            }
        
            update({ id: form.id, data: form });
            toastSuccess('Matkul berhasil diupdate!');
            return true; // sukses
          });
        } else {
          const validIds = matkul
            .map(mtkl => parseInt(mtkl.id))
            .filter(id => !isNaN(id));

          const newId = validIds.length
            ? (Math.max(...validIds) + 1).toString()
            : "1";

              
           const { id, ...newData } = form;
            newData.id = newId; 
          
            toastSuccess('Matkul berhasil ditambah!')
          store(newData);
          
        }
      
        setForm({name: ""});
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
            <h1 className="text-2xl font-bold mb-4">Data Matkul</h1>
            <button
                onClick={openAddModal}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Tambah Matkul
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
                <option value="name">Sort by Nama Matkul</option>
                <option value="sks">Sort by  SKS Matkul</option>
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
            <MatkulModal
                isModalOpen={isModalOpen}
                isEdit={isEdit}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                form={form}
                handleChange={handleChange}
            />
            <MatkulTable
                matkul={matkul}
               
                onDelete={handleDelete}
                onEdit={handleEdit}
                onDetail={(id) => navigate(`/admin/matkul/${id}`)}
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

export default Matkul;