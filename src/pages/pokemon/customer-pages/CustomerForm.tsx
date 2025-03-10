import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useListCustomer, usePostCustomer } from "./useCustomerMethods";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CUSTOMER_COLUMNS_TABLE, CUSTOMER_INITIAL_STATE } from "../../../models/customer.model";
import { Button, Table, Form, Container, Card, Alert, Navbar, Nav } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

export const CustomerForm = () => {
    const { data = [] } = useListCustomer();
    const postCustomer = usePostCustomer();
    const columns = CUSTOMER_COLUMNS_TABLE;
    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const formik = useFormik({
        initialValues: CUSTOMER_INITIAL_STATE,
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            lastName: Yup.string().required("El apellido es obligatorio"),
            mail: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
            phone: Yup.string().required("El teléfono es obligatorio"),
            identification: Yup.string().required("La identificación es obligatoria"),
            userName: Yup.string().required("El usuario es obligatorio"),
            password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
        }),
        onSubmit: (values, { resetForm }) => {
            postCustomer.mutate(values, {
                onSuccess: () => {
                    setShowSuccessMessage(true);
                    setShowErrorMessage(false);
                    resetForm();
                    setTimeout(() => setShowSuccessMessage(false), 3000);
                },
                onError: () => {
                    setShowErrorMessage(true);
                    setShowSuccessMessage(false);
                    setTimeout(() => setShowErrorMessage(false), 3000);
                },
            });
        },
    });

    return (
        <Container fluid className="p-0">
            <header className="d-flex align-items-center w-100 px-4 py-3" style={{ backgroundColor: "#007bff", color: "white" }}>
                <div className="d-flex">
                    <Navbar expand="lg" className="p-0">
                        <Nav>
                            <Nav.Link href="/" className="text-white">Inicio</Nav.Link>
                            <Nav.Link href="/customers" className="text-white">Clientes</Nav.Link>
                            <Nav.Link href="/settings" className="text-white">Configuración</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>
                <h2 className="flex-grow-1 text-center m-0">SISTEMA DE CLIENTES</h2>
            </header>

            <Container className="d-flex flex-column align-items-center mt-4">
                <Card className="shadow-lg p-4 mb-4 bg-white rounded" style={{ width: "80%" }}>
                    <Card.Title className="text-center mb-3">Registro de Cliente</Card.Title>
                    {showSuccessMessage && <Alert variant="success" className="text-center">Cliente registrado correctamente</Alert>}
                    {showErrorMessage && <Alert variant="danger" className="text-center">Error al registrar cliente</Alert>}

                    <Form onSubmit={formik.handleSubmit}>
                        {Object.keys(CUSTOMER_INITIAL_STATE).map((key) => (
                            <Form.Group key={key} controlId={key} className="mb-3">
                                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                                <Form.Control
                                    type={key === "password" ? "password" : "text"}
                                    name={key}
                                    value={formik.values[key] || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched[key] && !!formik.errors[key]}
                                    isValid={formik.touched[key] && !formik.errors[key]}
                                    placeholder={`Ingrese ${key}`}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors[key] as string}</Form.Control.Feedback>
                            </Form.Group>
                        ))}
                        <Button variant="primary" type="submit" disabled={postCustomer.isPending || !formik.isValid} className="w-100">
                            {postCustomer.isPending ? "Enviando..." : "Enviar"}
                        </Button>
                    </Form>
                </Card>

                <Card className="shadow-sm p-3 mb-4 bg-white rounded" style={{ width: "80%" }}>
                    <Card.Title className="text-center text-primary">Clientes Registrados</Card.Title>
                    <div style={{ overflowX: "auto" }}>
                        <Table striped bordered hover size="sm" className="mb-0">
                            <thead className="bg-primary text-white">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="text-center">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="table-light">
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="text-center">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </Container>
        </Container>
    );
};
