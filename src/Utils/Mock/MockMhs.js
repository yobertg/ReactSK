import axios from "axios";
import MockAdapter from "axios-mock-adapter";



const api = axios.create({ baseURL: "/api" });
const mock = new MockAdapter(api, { delayResponse: 100});

let mahasiswa = [
    {id: 1, nama: "Obed", nim: "A11.2022.13962", prodi: "TI", angkatan: "2004"},
    {id: 2, nama: "Nico", nim: "A11.2022.13943", prodi: "TI", angkatan: "2004"},
];

// get a-------ll mahasiswa
mock.onGet("/mahasiswa").reply(() => {
  console.log('Mengembalikan data untuk GET /mahasiswa:', JSON.stringify(mahasiswa, null, 2));
  return [200, mahasiswa];
});

// crate mahasiswa
mock.onPost("/mahasiswa").reply(config => {
    const newData = JSON.parse(config.data);
    newData.id = Date.now();
    mahasiswa.push(newData);
    return [201, newData];
})

// delete mahasiswa
mock.onDelete(/\/mahasiswa\/.+/).reply(config => {
    const nim = config.url.split("/").pop();
    mahasiswa = mahasiswa.filter( m => m.nim.toString() != nim.toString());
    return [200];
})

// uodate mahasiswa
mock.onPut(/\/mahasiswa\/.+/).reply(config => {
  const nim = config.url.split("/").pop();
  console.log('NIM dari URL:', nim, 'Tipe:', typeof nim);
  console.log('Array mahasiswa sebelum update:', mahasiswa);
  const newData = JSON.parse(config.data);
  console.log('Data baru:', newData);
  const found = mahasiswa.some(m => {
    console.log(`Membandingkan m.nim (${m.nim}, tipe: ${typeof m.nim}) dengan nim (${nim}, tipe: ${typeof nim})`);
    return m.nim.toString() === nim.toString();
  });
  if (!found) {
    console.error(`Mahasiswa dengan NIM ${nim} tidak ditemukan`);
    return [404, { message: `Mahasiswa dengan NIM ${nim} tidak ditemukan` }];
  }
  mahasiswa = mahasiswa.map(m => m.nim.toString() === nim.toString() ? { ...m, ...newData, id: m.id } : m);
  console.log('Array mahasiswa setelah update:', mahasiswa);
  return [200, newData];
});

export default api;