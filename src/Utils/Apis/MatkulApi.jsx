import axios from "@/Utils/AxiosInstance";

// Ambil semua mahasiswa
export const getAllMatkul = (params = {}) =>
    axios.get("/matkul", { params });

// Ambil 1 matkul
export const getMatkul = (id) => axios.get(`/matkul/${id}`);

// Tambah matkul
export const storeMatkul = (data) => axios.post("/matkul", data);

// Update matkul
export const updateMatkul = (id, data) => axios.put(`/matkul/${id}`, data);

// Hapus matkul
export const deleteMatkul = (id) => axios.delete(`/matkul/${id}`);