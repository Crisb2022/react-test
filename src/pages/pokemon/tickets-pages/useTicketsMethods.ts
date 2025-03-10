import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Ticket} from "../../../models/tickets.model";

export const useListTickets = () => {
    const wait = (message: number) => new Promise((resolve) => setTimeout(resolve, message));

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            await wait(2000);
            const { data } = await axios.get('http://127.0.0.1:8081/ticket/listar-ticket');
            return data as Ticket[];
        },
        queryKey: ["ticket"],
    });

    return { data: data ?? [], isLoading };
}

export const usePostTickets = () => {
    return useMutation({
        mutationFn: (values: Ticket) => {
            return axios.post('http://127.0.0.1:8081/ticket/crear-ticket', values)
        }
    });
}