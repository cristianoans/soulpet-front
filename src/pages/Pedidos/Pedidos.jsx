import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";


export function Pedidos() {

    const [pedidos, setPedidos] = useState(null);
    const [show, setShow] = useState(false);
    const [codigoPedido, setCodigoPedido] = useState(null);

    const handleClose = () => {
        setCodigoPedido(null);
        setShow(false)
    };

    const handleShow = (codigo) => {
        setCodigoPedido(codigo);
        setShow(true)
    };

    function onDelete() {
        axios.delete(`http://localhost:3001/pedidos/${codigoPedido}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                consultarPedidos();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleClose();
    }

    useEffect(() => {
        consultarPedidos();
    }, []);

    function consultarPedidos() {
        axios.get("http://localhost:3001/pedidos")
            .then(response => {
                setPedidos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Pedidos</h1>
                <Button as={Link} to="/pedidos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Pedido
                </Button>
            </div>
            {
                pedidos === null ?
                    <Loader />
                    :
                    <Table bsPrefix="table table-bordered table-striped table-hover align-middle text-center">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map(pedido => {
                                return (
                                    <tr key={pedido.codigo}>
                                        <td>{pedido.cliente.nome}</td>
                                        <td>{pedido.produto.nome}</td>
                                        <td>{pedido.quantidade}</td>
                                        <td className="d-flex justify-content-center gap-2">
                                            <Button onClick={() => handleShow(pedido.codigo)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o pedido?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}