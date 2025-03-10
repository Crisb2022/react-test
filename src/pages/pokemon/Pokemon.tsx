import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {TicketForm} from "./tickets-pages/TicketForm";

const queryClient = new QueryClient();

export const Pokemon = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TicketForm />
        </QueryClientProvider>
    );
};