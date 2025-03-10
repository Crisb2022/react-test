import "bootstrap/dist/css/bootstrap.min.css";
import { useListCatalog, usePostCatalog } from "./useCatalogMethods";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button, Table, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {CATALOG_COLUMNS_TABLE, CATALOG_INITIAL_STATE} from "../../../models/catalog.model";

export const CatalogForm = () => {
    const { data = [] } = useListCatalog();
    const postCatalog = usePostCatalog();
    const columns = CATALOG_COLUMNS_TABLE;
    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });

    const formik = useFormik({
        initialValues: CATALOG_INITIAL_STATE,
        validationSchema: Yup.object({
            catalogName: Yup.string().required("Catalogo Requerido"),
            catalogDetail: Yup.string().required("Detalle requerido"),
            requiredTime: Yup.string().required("Tiempo requerido")
        }),
        onSubmit: (values) => {
            postCatalog.mutate(values);
        },
    });

    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                {Object.keys(CATALOG_INITIAL_STATE).map((key) => (
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
                <Button variant="primary" type="submit" disabled={postCatalog.isPending}>
                    {postCatalog.isPending ? "Enviando..." : "Enviar"}
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