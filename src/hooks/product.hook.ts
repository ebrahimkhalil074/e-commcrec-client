
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getAllFeaturedProducts, getAllProducts, getJustForYouProducts, getProductById, updateProduct } from "../services/productService";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateProduct = () => {
    return useMutation({
        mutationKey: ["CREATE_PRODUCT"],
        mutationFn: async (productData: FieldValues) =>await createProduct(productData),
        
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
}
export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["GET_ALL_PRODUCTS"],
        queryFn: async () =>await getAllProducts(),
        
        
    })
}
export const useGetAllFeaturedProducts = () => {
    return useQuery({
        queryKey: ["GET_ALL_FETURED_PRODUCTS"],
        queryFn: async () =>await getAllFeaturedProducts(),
        
        
    })
}
export const useGetJustForYouProducts = () => {
    return useQuery({
        queryKey: ["JUST-FOR-YOU_PRODUCTS"],
        queryFn: async () =>await getJustForYouProducts(),
        
        
    })
}
export const useGetProductById = (productId: string) => {
    return useQuery({
        queryKey: ["GET_PRODUCT_BY_ID", productId],
        queryFn: async () =>await getProductById(productId),
        
        
    })
}
// export const useUpdateProduct = (id) => {
//     return useMutation({
//         mutationKey: ["UPDATE_PRODUCT", id],
//         mutationFn: async (productData: FieldValues) => updateProduct(id, productData),
        
//         onSuccess: (data) => {
//             toast.success(data.message);
//         },
//         onError: (error) => {
//             toast.error(error.message);
//         },
//     })
// }
export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: async ({ id, productData }: { id: string; productData: FormData }) =>await
      updateProduct(id, productData),

    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useSoftDeleteProduct = () => {
     const queryClient = useQueryClient ();
    return useMutation({
        mutationKey: ["DELETE_PRODUCT", ],
        mutationFn: async (id:string) => deleteProduct(id),
        
        onSuccess: (data,variables) => {
            toast.success(data.message);
            queryClient.refetchQueries({ queryKey: ["GET_ALL_PRODUCTS"] });

//              if (variables) {
//    queryClient.invalidateQueries({ queryKey: ["GET_ALL_PRODUCTS"], exact: false });
//   }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
}