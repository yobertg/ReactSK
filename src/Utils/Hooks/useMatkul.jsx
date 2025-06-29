// Utils/Hooks/useMataKuliah.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMatkul,
  storeMatkul,
  updateMatkul,
  deleteMatkul,
} from "@/Utils/Apis/MatkulApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

export const useMatkul = (query = {}) =>
  useQuery({
    queryKey: ["matkul", query],
    queryFn: () => getAllMatkul(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res.headers["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
  });

 // Tambah
export const useStoreMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMatkul,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matkul"] });
      toastSuccess("matkul berhasil ditambahkan!");
    },
    onError: () => toastError("Gagal menambahkan matkul."),
  });
};

// Edit
export const useUpdateMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMatkul(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matkul"] });
      toastSuccess("matkul berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui matkul."),
  });
};

// Hapus
export const useDeleteMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMatkul,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matkul"] });
      toastSuccess("matkul berhasil dihapus!");
    },
    onError: () => toastError("Gagal menghapus matkul."),
  });
}; 