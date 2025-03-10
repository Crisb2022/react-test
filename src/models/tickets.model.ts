import {ColumnDef} from "@tanstack/react-table";

export interface Ticket {
    idCustomer?: number;
    idCatalog?: number;
    observation?: string;
    estado?: string;
    requiredTime?: string;
    [key: string]: any;
}

export interface TicketTable {
    customerId?: string;
    catalogId?: string;
    observation?: string;
    estado?: string;
    requiredTime?: string;
    [key: string]: any;
}

export const TICKETS_INITIAL_STATE: Ticket = {
    idCustomer: 0,
    idCatalog: 0,
    observation: "",
    estado: "",
    requiredTime: "",
};

export const TICKETS_TABLE_INITIAL_STATE: TicketTable = {
    customerId: "",
    catalogId: "",
    observation: "",
    estado: "",
    requiredTime: "",
};


export const TICKETS_COLUMNS_TABLE: ColumnDef<TicketTable>[] = [
    {
        header: 'Número de Ticket',
        accessorKey: 'id',
    },
    {
        header: 'Cliente',
        accessorKey: 'customerId',
    },
    {
        header: 'Catálogo',
        accessorKey: 'catalogId',
    },
    {
        header: 'Observación',
        accessorKey: 'observation',
    },
    {
        header: 'Estado',
        accessorKey: 'estado',
    },
    {
        header: 'Tiempo requerido',
        accessorKey: 'requiredTime',
    },
    {
        header: 'Hora de Registro',
        accessorKey: 'registryDate',
    }
];
