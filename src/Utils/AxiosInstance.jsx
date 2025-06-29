import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://json-api-react-obed.vercel.app", // alamat json-server
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;