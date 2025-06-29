// Utils/Hooks/useKelas.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllKelas, storeKelas,
  updateKelas,
  deleteKelas,} from "@/Utils/Apis/KelasApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

export const useKelas = (query = {}) =>
  useQuery({
    queryKey: ["elas", query],
    queryFn: () => getAllKelas(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res.headers["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
  });

 // Tambah
export const useStoreKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      toastSuccess("kelas berhasil ditambahkan!");
    },
    onError: () => toastError("Gagal menambahkan kelas."),
  });
};


// Edit
export const useUpdateKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateKelas(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      toastSuccess("kelas berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui kelas."),
  });
};

// Hapus
export const useDeleteKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      toastSuccess("kelas berhasil dihapus!");
    },
    onError: () => toastError("Gagal menghapus kelas."),
  });
};
 