import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Customer} from "../../../models/customer.model";


// useQuery
export const useListTickets = () => {
    // wait Promise
    const wait = (message: number) => new Promise((resolve) => setTimeout(resolve, message));

    // key Vars
    const keyVar1 = '';
    const keyVar2 = '';

    // Query consult
    const {data, isLoading} = useQuery({
        queryFn: async () => {
            await wait(2000)
            const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon')
            return data.results as Customer[]
        },
        queryKey: ["tokens", {keyVar1, keyVar2}], // para el macronutrient en cache
    });
    console.log(typeof data);
    return {data: data ?? [], isLoading};
}

// useMutation
// crisApi: https://crisapi.free.beeceptor.com
export const usePostTickets = () => { 
    console.log('hola')
    return useMutation({

        mutationFn: (values: Customer) => {
            return axios.post('http://localhost:8081/customer/crear-usuario', values)
        }
    });
}