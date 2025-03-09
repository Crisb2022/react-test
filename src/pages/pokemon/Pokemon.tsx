import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {CustomerForm} from "./customer-pages/CustomerForm";

const queryClient = new QueryClient();

export const Pokemon = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CustomerForm />
        </QueryClientProvider>
    );
};