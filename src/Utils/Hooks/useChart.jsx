import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllChartData } from "@/Utils/Apis/ChartApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";


// useChart.jsx
export const useChartData = () =>
  useQuery({
    queryKey: ["chart", "all"],
    queryFn: getAllChartData,
    select: (res) => res.data,
  });