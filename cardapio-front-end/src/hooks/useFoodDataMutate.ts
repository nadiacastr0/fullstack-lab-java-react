import axios from "axios";
import type { FoodData } from "../interface/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const postData = async (data: FoodData): Promise<FoodData> => {
    const response = await axios.post<FoodData>(`${API_URL}/food`, data);
    return response.data;
};

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: postData,
        retry: (failureCount, error) => {
            // Retry apenas para erros de rede
            if (axios.isAxiosError(error) && error.response?.status && error.response.status >= 400 && error.response.status < 500) {
                return false;
            }
            return failureCount < 2;
        },
        onSuccess: (newData) => {
            // Invalida e recarrega os dados
            queryClient.invalidateQueries({
                queryKey: ['food-data']
            });
            
            // Opcionalmente, atualiza o cache diretamente para feedback mais rápido
            queryClient.setQueryData<FoodData[]>(['food-data'], (old) => {
                return old ? [...old, newData] : [newData];
            });
        },
        onError: (error) => {
            console.error('Erro ao criar item:', error);
        }
    });

    return mutation;
}