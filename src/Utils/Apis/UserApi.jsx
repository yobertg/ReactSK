import axios from "@/Utils/AxiosInstance";

export const getAllUser = () => axios.get("/users");
export const getUser = (id) => axios.get(`/users/${id}`);
export const storeUser = (data) => axios.post("/users", data);
export const updateUser = (id, data) => axios.put(`/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`/users/${id}`);
export const getUserByEmail = (email) => axios.get(`/users?email=${email}`);
export const updateUserPassword = (id, passwordData) => axios.put(`/users/${id}/password`, passwordData);
export const updateUserRole = (id, roleData) => axios.put(`/users/${id}/role`, roleData);
export const updateUserPermissions = (id, permissionData) => axios.put(`/users/${id}/permissions`, permissionData);
export const getUsersByRole = (role) => axios.get(`/users?role=${role}`);
export const validateUser = (credentials) => axios.post("/users/validate", credentials);