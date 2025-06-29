// import Form from "/Admin/Components/Form";
import Label from "@/Pages/Admin/Components/Label";
import Button from "@/Pages/Admin/Components/button";
import Form from "./Admin/Components/Form";

const RencanaStudiModal = ({
    isOpen,
    onClose,
    onSubmit,
    onChange,
    form,
    dosen,
    mataKuliah
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Tambah Kelas Baru</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl">
            &times;
          </button>
        </div>

        <Form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="mata_kuliah_id">Mata Kuliah</Label>
            <select
              name="mata_kuliah_id"
              value={form.mata_kuliah_id}
              onChange={onChange}
              className="w-full border px-2 py-1 rounded"
              required
            >
              <option value="">-- Pilih --</option>
              {mataKuliah.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="dosen_id">Dosen Pengampu</Label>
            <select
              name="dosen_id"
              value={form.dosen_id}
              onChange={onChange}
              className="w-full border px-2 py-1 rounded"
              required
            >
              <option value="">-- Pilih --</option>
              {dosen.map((d) => (
                <option key={d.id} value={d.id}>{d.nama}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RencanaStudiModal;