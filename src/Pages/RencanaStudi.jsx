import React, { useState, useEffect} from 'react';
import RencanaStudiModal from './RencanaStudiModal';
import RencanaStudiTable from './RencanaStudiTable';
import { useNavigate } from 'react-router-dom';
import { useAuthStateContext } from './Context/AuthContext';
import { toastSuccess, toastError } from '../Utils/Helpers/ToastHelpers';
import { confirmDelete, confirmUpdate } from '../Utils/Helpers/SwalHelpers';
import { useDosen } from '../Utils/Hooks/useDosen';
import { useKelas } from '../Utils/Hooks/useKelas';
import { useMatkul } from '../Utils/Hooks/useMatkul';
import { useMahasiswa } from '../Utils/Hooks/useMahasiswa';
import { useStoreKelas, useUpdateKelas, useDeleteKelas } from '../Utils/Hooks/useKelas';

function RencanaStudi() {

    const { user } = useAuthStateContext();

              const [page, setPage] = useState(1);
              const [perPage, setPerPage] = useState(5);
              const [sort, setSort] = useState("name");
              const [order, setOrder] = useState("asc");
              const [search, setSearch] = useState("");
          
            const {
              data: result = { data: [], total: 0 },
              isLoading: isLoadingKelas,
            } = useKelas({
              q: search,
              _sort: sort,
              _order: order,
              _page: page,
              _limit: perPage
            });
            const { data: kelas = [] } = result;
            const totalCount = result.total;
            const totalPages = Math.ceil(totalCount / perPage);


              const { data: matkulResult = { data: [] } } = useMatkul();
              const { data: dosenResult = { data: [] } } = useDosen();
              const { data: mahasiswaResult = { data: [] } } = useMahasiswa();
              const dosen = dosenResult.data || [];
              const mahasiswa = mahasiswaResult.data || [];
              const mataKuliah = matkulResult.data || [];

           const { mutate: store } = useStoreKelas();
           const { mutate: update } = useUpdateKelas();
           const { mutate: remove } = useDeleteKelas();
           

    const [selectedMhs, setSelectedMhs] = useState({});
    const [selectedDsn, setSelectedDsn] = useState({});

    const [form, setForm] = useState({ mata_kuliah_id: "", dosen_id: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mataKuliahSudahDipakai = kelas.map(k => k.mata_kuliah_id);
    const mataKuliahBelumAdaKelas = mataKuliah.filter(m => !mataKuliahSudahDipakai.includes(m.id));

    const getMaxSks = (id) => mahasiswa.find(m => m.id === id)?.max_sks || 0;
    const getDosenMaxSks = (id) => dosen.find(d => d.id === id)?.max_sks || 0;

    const handleAddMahasiswa = async (kelasItem, mhsId) => {
        const matkul = mataKuliah.find(m => m.id === kelasItem.mata_kuliah_id);
        const sks = matkul?.sks || 0;

        const totalSksMahasiswa = kelas
            .filter(k => k.mahasiswa_ids.includes(mhsId))
            .map(k => mataKuliah.find(m => m.id === k.mata_kuliah_id)?.sks || 0)
            .reduce((acc, curr) => acc + curr, 0);

        const maxSks = getMaxSks(mhsId);
        
        if (totalSksMahasiswa + sks > maxSks) {
            toastError(`SKS melebihi batas maksimal (${maxSks})`);
            return;
        }
        
        if (kelasItem.mahasiswa_ids.includes(mhsId)) {
            toastError("Mahasiswa sudah terdaftar");
            return;
        }

        const updated = {
            ...kelasItem,
            mahasiswa_ids: [...kelasItem.mahasiswa_ids, mhsId]
        };

        await update({id: kelasItem.id, data: updated});
        toastSuccess("Mahasiswa ditambahkan");
        setSelectedMhs(prev => ({ ...prev, [kelasItem.id]: "" }));
    };

    const handleDeleteMahasiswa = async (kelasItem, mhsId) => {
        const updated = {
            ...kelasItem,
            mahasiswa_ids: kelasItem.mahasiswa_ids.filter(id => id !== mhsId)
        };

         await update({id: kelasItem.id, data: updated});
        toastSuccess("Mahasiswa dihapus");
        fetchData();
    };

    const handleChangeDosen = async (kelasItem) => {
        const dsnId = selectedDsn[kelasItem.id];
        if (!dsnId) return;

        const totalSksDosen = kelas
            .filter(k => k.dosen_id === dsnId)
            .map(k => mataKuliah.find(m => m.id === k.mata_kuliah_id)?.sks || 0)
            .reduce((acc, curr) => acc + curr, 0);

        const kelasSks = mataKuliah.find(m => m.id === kelasItem.mata_kuliah_id)?.sks || 0;
        const maxSks = getDosenMaxSks(dsnId);

        if (totalSksDosen + kelasSks > maxSks) {
            toastError(`Dosen melebihi batas maksimal SKS (${maxSks})`);
            return;
        }

        await update({id: kelasItem.id, data:{ ...kelasItem, dosen_id: dsnId }});
        toastSuccess("Dosen diperbarui");
        fetchData();
    };

    const handleDeleteKelas = async (kelasId) => {
        confirmDelete(async () => {
            await remove(kelasId);
            toastSuccess("Kelas dihapus");
            fetchData();
        });
    };

    const openAddModal = () => {
        setForm({ mata_kuliah_id: "", dosen_id: "" });
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.mata_kuliah_id || !form.dosen_id) {
            toastError("Form tidak lengkap");
            return;
        }
        await store({ ...form, mahasiswa_ids: [] });
        setIsModalOpen(false);
        toastSuccess("Kelas ditambahkan");
        fetchData();
    };
      const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
      const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

    return(
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data kelas</h1>
            {user.permission.includes("rencana-studi.page") && (
                <button 
                onClick={openAddModal}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        + Tambah Kelas
                </button>
            )}
            
            <RencanaStudiTable
                kelas={kelas}
                mahasiswa={mahasiswa}
                dosen={dosen}
                mataKuliah={mataKuliah}
                selectedMhs={selectedMhs}
                setSelectedMhs={setSelectedMhs}
                selectedDsn={selectedDsn}
                setSelectedDsn={setSelectedDsn}
                handleAddMahasiswa={handleAddMahasiswa}
                handleDeleteMahasiswa={handleDeleteMahasiswa}
                handleChangeDosen={handleChangeDosen}
                handleDeleteKelas={handleDeleteKelas}
            />
            <RencanaStudiModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onChange={handleChange}
                onSubmit={handleSubmit}
                form={form}
                dosen={dosen}
                mataKuliah={mataKuliahBelumAdaKelas}
             />
        </div>
    );
}



export default RencanaStudi;
