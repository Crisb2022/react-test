import {ColumnDef} from "@tanstack/react-table";

export interface Ticket {
    idCustomer?: number;
    idCatalog?: number;
    observation?: string;
    estado?: string;
    [key: string]: any;
}

export const TICKETS_INITIAL_STATE: Ticket = {
    idCustomer: 0,
    idCatalog: 0,
    observation: "",
    estado: "",
}


export const TICKETS_COLUMNS_TABLE: ColumnDef<Ticket>[] = [
    {
        header: 'Numero de Ticket',
        accessorKey: 'id',
    },
    {
        header: 'Usuario',
        accessorKey: 'idCustomer',
    },
    {
        header: 'Catalogo',
        accessorKey: 'idCatalog',
    },
    {
        header: 'Observacion',
        accessorKey: 'observation',
    },
    {
        header: 'Estado',
        accessorKey: 'estado',
    },
    {
        header: 'Hora de Registro',
        accessorKey: 'registryDate',
    }
];