import { useQuery } from "@tanstack/react-query";
import { getMyAllPayments } from "../services/paymentService";

export const useGetMyAllPayments = (query:any) => {
  return useQuery({
    queryKey: ["GET_ALL_Payments", query], // param include করে cache differentiate
    queryFn: () =>getMyAllPayments(query),
    
  });
};