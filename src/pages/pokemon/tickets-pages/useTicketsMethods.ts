import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Ticket, TicketTable} from "../../../models/tickets.model";
import {Catalog} from "../../../models/catalog.model";
import {Customer} from "../../../models/customer.model";

export const useListTickets = () => {
    const wait = (message: number) => new Promise((resolve) => setTimeout(resolve, message));

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            await wait(100);
            const { data } = await axios.get('http://127.0.0.1:8081/ticket/listar-ticket');
            return data as TicketTable[];
        },
        queryKey: ["ticket"],
    });

    return { data: data ?? [], isLoading };
}

export const useListCustomer = () => {
    const wait = (message: number) => new Promise((resolve) => setTimeout(resolve, message));

    const { data, isLoading } = useQuery<Customer[]>({
        queryFn: async () => {
            await wait(100);
            const { data } = await axios.get('http://127.0.0.1:8081/customer/listar-clientes');
            return data;
        },
        queryKey: ["customers"],
    });

    return { dataCustomer: data ?? [], isLoading };
};

export const useListCatalog = () => {
    const wait = (message: number) => new Promise((resolve) => setTimeout(resolve, message));

    const { data, isLoading } = useQuery<Catalog[]>({
        queryFn: async () => {
            await wait(100);
            const { data } = await axios.get('http://127.0.0.1:8081/catalog/listar-catalogo');
            return data;
        },
        queryKey: ["catalog"],
    });

    return { dataCatalog: data ?? [], isLoading };
};

export const usePostTickets = () => {
    return useMutation({
        mutationFn: (values: Ticket) => {
            return axios.post('http://127.0.0.1:8081/ticket/crear-ticket', values)
        }
    });
}