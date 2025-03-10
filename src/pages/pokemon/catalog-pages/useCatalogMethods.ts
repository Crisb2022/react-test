import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Catalog} from "../../../models/catalog.model";

export const useListCatalog = () => {
    const wait = (message: number) => new Promise((resolve) => setTimeout(resolve, message));

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            await wait(2000);
            const { data } = await axios.get('http://127.0.0.1:8081/catalog/listar-catalogo');
            return data as Catalog[];
        },
        queryKey: ["catalog"],
    });

    return { data: data ?? [], isLoading };
};

export const usePostCatalog = () => {
    return useMutation({
        mutationFn: (values: Catalog) => {
            return axios.post('http://127.0.0.1:8081/catalog/crear-catalogo', values)
        }
    });
}