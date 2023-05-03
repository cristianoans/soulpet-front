import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Servicos() {
    const [listaServicos, setListaServicos] = useState(null);
    const [servico, setServico] = useState(null);
    const [show, setShow] = useState(false);
    const [idServico, setIdServico] = useState(null); // estado


    const handleClose = () => {
        setIdServico(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdServico(id);
        setShow(true)
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function onDelete() {
        axios.delete(`http://localhost:3001/servicos/${idServico}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                initializeTable();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleClose();
    }

    function initializeTable() {
        axios.get("http://localhost:3001/servicos")
            .then((response) => {
                setListaServicos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="servicos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Serviços</h1>
                <Button as={Link} to="/servicos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Serviços
                </Button>
            </div>
            {listaServicos === null ? (
                <Loader />
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaServicos.map((servico) => {
                            return (
                                <tr key={servico.id}>
                                    <td>{servico.nome}</td>
                                    <td>{servico.preco}</td>
                                    <td className="d-flex gap-2">
                                        <Button
                                                variant = "primary"
                                                as={Link}
                                                to={`/servicos/editar/${servico.id}`}
                                                data-toggle="tooltip"
                                                title="Editar"
                                            >
                                        </Button>
                                        <Button>
                                            <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                        <Button onClick={() => handleShow(servico.id)}>
                                            <i class="bi bi-trash-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir esse serviço?</Modal.Body>
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