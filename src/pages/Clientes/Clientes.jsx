import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import { ModalDetalhesCliente } from "../../components/ModalDetalhesCliente/ModalDetalhesCliente"
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export function Clientes() {

    const [clientes, setClientes] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [show, setShow] = useState(false);
    const [idCliente, setIdCliente] = useState(null);
    // Estado para mostrar ou ocultar o modal de detalhes do cliente
    const [showDetalhesCliente, setShowDetalhesCliente] = useState(false);

    const handleClose = () => {
        setIdCliente(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdCliente(id);
        setShow(true)
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function onDelete() {
        axios.delete(`http://localhost:3001/clientes/${idCliente}`)
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

    // Função que exibe o modal de detalhes do livro
    function openDetalhesCliente(cliente) {
        setCliente(cliente); // Atualiza o estado do Livro com o livro selecionado
        setShowDetalhesCliente(true); // Ativa o estado para mostrar o modal de detalhes do livro
    }

    // Função para fechar o modal de detalhes do livro
    function closeDetalhesCliente() {
        setShowDetalhesCliente(false); // Desative o estado para ocultar o modal de detalhes do livro
    }

    async function gerarRelatorio() {
        const response = await axios.get("http://localhost:3001/pdf");
        const html = await response.data;
        const doc = new jsPDF();
        const range = document.createRange();
        const fragment = range.createContextualFragment(html); // html é a sua string de HTML
        const table = fragment.querySelector('table');
        doc.autoTable({
            html: table,
        });
        const pdfBlob = new Blob([doc.output('blob')], { type: 'application/pdf' });
        const pdfUrl =  window.URL.createObjectURL(pdfBlob);
        console.log(pdfBlob);
        window.open(pdfUrl)
    }
    return (
        <div className="clientes container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Clientes</h1>
                <Button as={Link} to="/clientes/novo">
                    <i className="bi bi-plus-lg me-2"></i> Cliente
                </Button>
            </div>
            {
                clientes === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => {
                                return (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.telefone}</td>
                                        <td className="d-flex gap-2">
                                            <Button onClick={() => handleShow(cliente.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/clientes/editar/${cliente.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button onClick={() => openDetalhesCliente(cliente)}>
                                                <i className="bi bi-info-lg"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
            <Button onClick={gerarRelatorio}>gerar relatorio</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o cliente?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <ModalDetalhesCliente
                    cliente={cliente}
                    show={showDetalhesCliente}
                    handleClose={closeDetalhesCliente}
                />
            </div>
        </div>
    );
}