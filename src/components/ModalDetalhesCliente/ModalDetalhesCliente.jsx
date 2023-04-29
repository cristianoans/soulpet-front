import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Loader } from "../Loader/Loader";

export function ModalDetalhesCliente({ cliente, show, handleClose }) {

    const [pets, setPets] = useState(null);
    const [endereco, setEndereco] = useState(null);



    function listaPets(id) {
        axios.get(`http://localhost:3001/clientes/${id}/pets`)
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function listaendereco(id) {
        axios.get(`http://localhost:3001/clientes/${id}/endereco`)
            .then(response => {
                setEndereco(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (show) {
            listaPets(cliente?.id);
            listaendereco(cliente?.id);
        }
    }, [cliente?.id, show]);

    return (
        <Modal size="lg" className="" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title bsPrefix="modal-title">
                    {cliente?.nome}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column align-items-center">
                    {pets === null || endereco === null ? (
                        <Loader />
                    ) : (
                        <div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{cliente.nome}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{endereco.cidade}</h6>
                                    <p className="card-text">
                                        {endereco.rua}, {endereco.numero}, {endereco.uf}, CEP: {endereco.cep}<br />
                                        Telefone: {cliente.telefone}
                                    </p>
                                    <a href={`mailto:${cliente.email}`} className="card-link">{cliente.email}</a>
                                </div>
                            </div>

                            <div>
                                <div className="d-flex flex-column align-items-center mt-3">
                                    Lista de Pets do Cliente
                                </div>
                                    <hr />
                                
                                <table className="table">

                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Tipo</th>
                                            <th>Porte</th>
                                            <th>DataNasc</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pets.map((pet) => {
                                            return (
                                                <tr key={pet.id}>
                                                    <td>{pet.nome}</td>
                                                    <td>{pet.tipo}</td>
                                                    <td>{pet.porte}</td>
                                                    <td>{pet.dataNasc}</td>
                                                    <td className="d-flex gap-2">
                                                        <button className="btn btn-outline-primary"><i className="bi bi-trash-fill"></i></button>
                                                        <button className="btn btn-outline-primary"><i className="bi bi-pencil-fill"></i></button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}
