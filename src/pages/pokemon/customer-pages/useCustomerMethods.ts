import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Customer} from "../../../models/customer.model";

export const useListCustomer = () => {
    const wait = (message: number) => new Promise((resolve) => setTimeout(resolve, message));

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            await wait(2000);
            const { data } = await axios.get('http://127.0.0.1:8081/customer/listar-clientes');
            return data as Customer[];
        },
        queryKey: ["customers"],
    });

    return { data: data ?? [], isLoading };
};

export const usePostCustomer = () => {
    return useMutation({
        mutationFn: (values: Customer) => {
            return axios.post('http://127.0.0.1:8081/customer/crear-usuario', values)
        }
    });
}