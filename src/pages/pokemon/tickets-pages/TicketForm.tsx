import "bootstrap/dist/css/bootstrap.min.css";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button, Table, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useListTickets, usePostTickets} from "./useTicketsMethods";
import {TICKETS_COLUMNS_TABLE, TICKETS_INITIAL_STATE} from "../../../models/tickets.model";

export const TicketForm = () => {
    const { data = [] } = useListTickets(); // Evita que `data` sea undefined
    const postCustomer = usePostTickets();
    const columns = TICKETS_COLUMNS_TABLE;
    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });

    const formik = useFormik({
        initialValues: TICKETS_INITIAL_STATE,
        validationSchema: Yup.object({
            idCustomer: Yup.number().required("El nombre es obligatorio"),
            idCatalog: Yup.number().required("El apellido es obligatorio"),
            observation: Yup.string().required("El correo es obligatorio"),
            estado: Yup.string().required("El teléfono es obligatorio"),
        }),
        onSubmit: (values) => {
            postCustomer.mutate(values);
        },
    });

    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                {Object.keys(TICKETS_INITIAL_STATE).map((key) => (
                    <Form.Group key={key} controlId={key} className="mb-3">
                        <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                        <Form.Control
                            type={key === "password" ? "password" : "text"}
                            name={key}
                            value={formik.values[key] || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched[key] && !!formik.errors[key]}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors[key] as string}
                        </Form.Control.Feedback>
                    </Form.Group>
                ))}
                <Button variant="primary" type="submit" disabled={postCustomer.isPending}>
                    {postCustomer.isPending ? "Enviando..." : "Enviar"}
                </Button>
            </Form>

            <Table striped bordered hover size="sm" variant="light">
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};