import { useQuery } from "@tanstack/react-query"

import { getAllVariants } from "../services/variantsServices"
export const useGetAllVariants = () => {
    return useQuery({
        queryKey: ["GET_ALL_Variants"],
        queryFn: async () =>await getAllVariants(),
        
        
    })
}