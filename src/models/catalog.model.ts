import {ColumnDef} from "@tanstack/react-table";

export interface Catalog {
    catalogName?: string;
    catalogDetail?: string;
    requiredTime?: string;
    [key: string]: any;
}

export const CATALOG_INITIAL_STATE: Catalog = {
    catalogName: "",
    catalogDetail: "",
    requiredTime: "",
}


export const CATALOG_COLUMNS_TABLE: ColumnDef<Catalog>[] = [
    {
        header: 'Nombre Catalogo',
        accessorKey: 'catalogName',
    },
    {
        header: 'Detalle',
        accessorKey: 'catalogDetail',
    },
    {
        header: 'SLA',
        accessorKey: 'requiredTime',
    },
];