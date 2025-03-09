import {ColumnDef} from "@tanstack/react-table";

export interface Ticket {
    id_customer?: string;
    id_catalag?: string;
    observation?: string;
    estado?: string;
    [key: string]: any;
}

export const TICKETS_INITIAL_STATE: Ticket = {
    id_customer: "",
    id_catalag: "",
    observation: "",
    estado: ""
}


export const TICKETS_COLUMNS_TABLE: ColumnDef<Ticket>[] = [
    {
        header: 'Id Usuario',
        accessorKey: 'id_customer',
    },
    {
        header: 'id Catalogo',
        accessorKey: 'id_catalag',
    },
    {
        header: 'Observacion',
        accessorKey: 'observation',
    },
    {
        header: 'Estado',
        accessorKey: 'estado',
    }
];