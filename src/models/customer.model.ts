import {ColumnDef} from "@tanstack/react-table";
import {Pokemon} from "./pokemon.model";

export interface Customer {
    name?: string;
    lastName?: string;
    mail?: string;
    phone?: string;
    identification?: string;
    userName?: string;
    password?: string;
    [key: string]: any;
}

export const CUSTOMER_INITIAL_STATE: Customer = {
    name: "",
    lastName: "",
    mail: "",
    phone: "",
    identification: "",
    userName: "",
    password: ""
}


export const CUSTOMER_COLUMNS_TABLE: ColumnDef<Customer>[] = [
    {
        header: 'Nombre',
        accessorKey: 'name',
    },
    {
        header: 'Apellido',
        accessorKey: 'lastName',
    },
    {
        header: 'Correo',
        accessorKey: 'mail',
    },
    {
        header: 'Telefono',
        accessorKey: 'phone',
    },
    {
        header: 'Identificacion',
        accessorKey: 'identification',
    },
    {
        header: 'Usuario',
        accessorKey: 'userName',
    },

];