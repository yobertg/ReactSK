import Swal from "sweetalert2";

export const confirmLogout = (onConfirm) => {
  Swal.fire({
    title: "Yakin ingin logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, logout",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire("Logout berhasil", "", "success");
    }
  });
};

export const confirmDelete = (onConfirm) => {
  Swal.fire({
    title: "Yakin ingin menghapus data ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire("Dihapus!", "Data berhasil dihapus.", "success");
    }
  });
};

export const confirmUpdate = (onConfirm) => {
  Swal.fire({
    title: "Yakin ingin memperbarui data ini?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, perbarui",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      const success = onConfirm(); // harus return true/false

      if (success) {
        Swal.fire("Diperbarui!", "Data berhasil diperbarui.", "success");
      } else {
        Swal.fire("Gagal", "Update data gagal", "error");
      }
    }
  });
};
