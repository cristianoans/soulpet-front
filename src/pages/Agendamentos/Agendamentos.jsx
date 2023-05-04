import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { format } from 'date-fns'; // para formatar a data que vem do banco de dados.
import { toast } from "react-hot-toast";


export function Agendamentos() {

    const [agendamentos, setAgendamentos] = useState(null);
    const [show, setShow] = useState(false);
    const [idAgendamento, setIdAgendamento] = useState(null);

    const handleClose = () => {
        setIdAgendamento(null);
        setShow(false)
    };

    const handleShow = (id) => {
        setIdAgendamento(id);
        setShow(true)
    };

    function onDelete() {
        axios.delete(`http://localhost:3001/agendamentos/${idAgendamento}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                consultarAgendamentos();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleClose();
    }

    useEffect(() => {
        consultarAgendamentos();
    }, []);

    function consultarAgendamentos() {
        axios.get("http://localhost:3001/agendamentos")
            .then(response => {
                setAgendamentos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="clientes container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Agendamentos</h1>
                <Button as={Link} to="/agendamentos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Agendamento
                </Button>
            </div>
            {
                agendamentos === null ?
                    <Loader />
                    :
                    <Table bsPrefix="table table-bordered table-striped table-hover align-middle text-center">
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>Data agendada</th>
                                <th>Pet</th>
                                <th>Realizada</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map(agendamento => {
                                
                                //formatar a data de: 2023-05-01T00:00:00.000Z para 01/05/2023.
                                const data = new Date(agendamento.dataAgendada);
                                const dataFormatada = format(data, 'dd/MM/yyyy');
                                
                                return (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.servico.nome}</td>
                                        <td>{dataFormatada}</td>
                                        <td>{agendamento.pet.nome}</td>
                                        <td>{agendamento.realizada === false ? "Não" : "Sim"}</td>
                                        <td className="d-flex justify-content-center gap-2">
                                            <Button onClick={() => handleShow(agendamento.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/agendamentos/editar/${agendamento.id}`}>
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
                <Modal.Body>Tem certeza que deseja excluir o agendamento?</Modal.Body>
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