import axios from "@/Utils/AxiosInstance";

export const login = async ( email, password ) => {
    const res = await axios.get("/users", { params: { email } });
    const user = res.data[0];

    if (!user) throw new Error("Email tidak ditemukan");
    if (user.password !== password) throw new Error("Password salah");

    return user;
};

export const register = (data) => axios.post("/users", data);