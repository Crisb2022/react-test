import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";
import {useListCatalog, useListCustomer, useListTickets, usePostTickets} from "./useTicketsMethods";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {TICKETS_COLUMNS_TABLE, TICKETS_INITIAL_STATE} from "../../../models/tickets.model";
import {Table, Container, Card, Alert, Navbar, Nav} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from "yup";

export const TicketForm = () => {
    const {data = []} = useListTickets();
    const {dataCustomer = [],} = useListCustomer();
    const {dataCatalog = []} = useListCatalog();
    const postTicket = usePostTickets();
    const columns = TICKETS_COLUMNS_TABLE;
    const table = useReactTable({columns, data, getCoreRowModel: getCoreRowModel()});

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const statusOptions = [
        {value: 'Ingresado', label: 'Ingresado'},
        {value: 'En progreso', label: 'En progreso'},
        {value: 'En revisión', label: 'En revisión'},
        {value: 'Terminado', label: 'Terminado'},
    ];

    const customerOptions = dataCustomer.map((customer) => ({
        value: customer.id,  // Valor numérico
        label: `${customer.name} ${customer.lastName}`,  // Label en texto
    }));

    const catalogOptions = dataCatalog.map((catalog) => ({
        value: catalog.id,  // Valor numérico
        label: catalog.catalogName,  // Label en texto
    }));

    const formik = useFormik({
        initialValues: TICKETS_INITIAL_STATE,
        validationSchema: Yup.object({
            idCustomer: Yup.number().required("El cliente es obligatorio"),
            idCatalog: Yup.number().required("El catálogo es obligatorio"),
            observation: Yup.string().required("La observación es obligatoria"),
            estado: Yup.string().required("El estado es obligatorio"),
        }),
        onSubmit: (values, {resetForm}) => {
            const formattedValues = {
                idCustomer: values.idCustomer,
                idCatalog: values.idCatalog,
                observation: values.observation,
                estado: values.estado,
            };

            postTicket.mutate(formattedValues, {
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
            {/* ENCABEZADO CON NAVBAR */}
            <header className="d-flex align-items-center w-100 px-4 py-3"
                    style={{backgroundColor: "#007bff", color: "white"}}>
                <div className="d-flex">
                    <Navbar expand="lg" className="p-0">
                        <Nav>
                            <Nav.Link href="/" className="text-white">Inicio</Nav.Link>
                            <Nav.Link href="./tickets-pages/TicketForm" className="text-white">Tickets</Nav.Link>
                            <Nav.Link href="./customer-pages/CustomerForm" className="text-white">Clientes</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>
                <h2 className="flex-grow-1 text-center m-0">SISTEMA DE TICKETS</h2>
            </header>

            <Container className="d-flex flex-column align-items-center mt-4">
                {/* FORMULARIO EN UN CARD */}
                <Card className="shadow-lg p-4 mb-4 bg-white rounded" style={{width: "80%"}}>
                    <Card.Title className="text-center mb-3">Registro de Ticket</Card.Title>
                    {showSuccessMessage &&
                        <Alert variant="success" className="text-center">Ticket registrado correctamente</Alert>}
                    {showErrorMessage &&
                        <Alert variant="danger" className="text-center">Error al registrar ticket</Alert>}

                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="idCustomer">ID Cliente</label>
                            <select
                                id="idCustomer"
                                name="idCustomer"
                                onChange={(e) => formik.setFieldValue("idCustomer", Number(e.target.value))}
                                value={formik.values.idCustomer}
                            >
                                <option value="">Seleccione un cliente</option>
                                {customerOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.idCustomer && formik.touched.idCustomer && (
                                <div>{formik.errors.idCustomer}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="idCatalog">ID Catálogo</label>
                            <select
                                id="idCatalog"
                                name="idCatalog"
                                onChange={(e) => formik.setFieldValue("idCatalog", Number(e.target.value))}
                                value={formik.values.idCatalog}
                            >
                                <option value="">Seleccione un catálogo</option>
                                {catalogOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.idCatalog && formik.touched.idCatalog && (
                                <div>{formik.errors.idCatalog}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="observation">Observación</label>
                            <input
                                id="observation"
                                name="observation"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.observation}
                            />
                            {formik.errors.observation && formik.touched.observation && (
                                <div>{formik.errors.observation}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="estado">Estado</label>
                            <select
                                id="estado"
                                name="estado"
                                onChange={formik.handleChange}
                                value={formik.values.estado}
                            >
                                <option value="">Seleccione un estado</option>
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.estado && formik.touched.estado && (
                                <div>{formik.errors.estado}</div>
                            )}
                        </div>

                        <button type="submit">Enviar</button>
                    </form>
                </Card>

                {/* TABLA MEJORADA */}
                <Card className="shadow-sm p-3 mb-4 bg-white rounded" style={{width: "80%"}}>
                    <Card.Title className="text-center text-primary">Tickets Registrados</Card.Title>
                    <div style={{overflowX: "auto"}}>
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
