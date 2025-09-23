import { useQuery } from "@tanstack/react-query"
import { getAdminDashboardData, getCustomerDashboardData, getDelivaryDashboardData } from "../services/dashboardServices"

export const useGetAllAdminDashboardData = () => {
    return useQuery({
        queryKey: ["GET_ADMIN_DASHBOARD"],
        queryFn: async () =>await  getAdminDashboardData(),
        
        
    })
}
export const  useGetCustomerOverviewData = () => {
    return useQuery({
        queryKey: ["GET_CUSTOMER_DASHBOARD"],
        queryFn: async () =>await getCustomerDashboardData(),
        
        
    })
}
export const  useGetDelivaryOverviewData = () => {
    return useQuery({
        queryKey: ["GET_DELIVARY_DASHBOARD"],
        queryFn: async () => await getDelivaryDashboardData(),
        
        
    })
}