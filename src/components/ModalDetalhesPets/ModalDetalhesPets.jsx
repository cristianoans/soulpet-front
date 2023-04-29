import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export function ModalDetalhesPets({ pet, show, handleClose }) {

    const [cliente, setCliente] = useState('');

    function listarClientes(id) {
        axios.get(`http://localhost:3001/clientes/${id}`)
        .then((response)=>{
            setCliente(response.data)
        })
    }

    useEffect(() => {
        if(show) {
            listarClientes(pet?.clienteId);
        }
    }, [pet?.clienteId, show]);

    return (
        <Modal size="lg" className="" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title bsPrefix="modal-title">
                    {pet?.nome}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column align-items-center">
                    <p>Proprietário do Pet: {cliente?.nome} </p>
                    <p>Telefone de contato: {cliente?.telefone} </p>
                    <p>Email: {cliente?.email} </p>
                    </div>
            </Modal.Body>
        </Modal>
    );
}
