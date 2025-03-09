import {ColumnDef} from "@tanstack/react-table";

export interface Catalog {
    catalog_name?: string;
    catalog_detail?: string;
    required_time?: string;
    [key: string]: any;
}

export const CATALOG_INITIAL_STATE: Catalog = {
    catalog_name: "",
    catalog_detail: "",
    required_time: "",
}


export const CATALOG_COLUMNS_TABLE: ColumnDef<Catalog>[] = [
    {
        header: 'Nombre Catalogo',
        accessorKey: 'catalog_name',
    },
    {
        header: 'Detalle',
        accessorKey: 'catalog_detail',
    },
    {
        header: 'SLA',
        accessorKey: 'required_time',
    },
];