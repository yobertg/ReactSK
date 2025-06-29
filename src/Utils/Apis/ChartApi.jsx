// ChartApi.jsx
import axios from "@/Utils/AxiosInstance";

export const getAllChartData = () => axios.get("/chart");