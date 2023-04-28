import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Pets() {
    const [listaPets, setListaPets] = useState(null);
    const [show, setShow] = useState(false);
    const [idPet, setIPet] = useState(null);


    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/pets")
            .then((response) => {
                setListaPets(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            
    }
    const handleClose = () => {
        setIPet(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIPet(id);
        setShow(true)
    };
    function onDelete() {
        axios.delete(`http://localhost:3001/pets/${idPet}`)
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


return (
    <div className="pets container">
        <div className="d-flex justify-content-between align-items-center">
            <h1>Pets</h1>
            <Button as={Link} to="/pets/novo">
                <i className="bi bi-plus-lg me-2"></i> Pet
            </Button>
        </div>
        {listaPets === null ? (
            <Loader />
        ) : (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Porte</th>
                        <th>DataNasc</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPets.map((pet) => {
                        return (
                            <tr key={pet.id}>
                                <td>{pet.nome}</td>
                                <td>{pet.tipo}</td>
                                <td>{pet.porte}</td>
                                <td>{pet.dataNasc}</td>
                                <td className="d-flex gap-2">
                                    <Button onClick={() => handleShow(pet.id)}>
                                        <i className="bi bi-trash-fill"></i>
                                    </Button>
                                    <Button as={Link} to={`/pets/editar/${pet.id}`}>
                                        <i className="bi bi-pencil-fill"></i>
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
    </div>
);
                }