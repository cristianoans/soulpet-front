import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { ModalDetalhesPets } from "../../components/ModalDetalhesPets/ModalDetalhesPets";

export function Pets() {
    const [listaPets, setListaPets] = useState(null);
    const [Pet, setPet] = useState(null);

    // Estado para mostrar ou ocultar o modal de detalhes do pet
    const [showDetalhesPet, setShowDetalhesPet] = useState(false);

    // Função que exibe o modal de detalhes do pet
    function openDetalhesPet(pet) {
        setPet(pet); // Atualiza o estado do Pet com o pet selecionado
        setShowDetalhesPet(true); // Ativa o estado para mostrar o modal de detalhes do pet
    }

    // Função para fechar o modal de detalhes do pet
    function closeDetalhesPet() {
        setShowDetalhesPet(false); // Desative o estado para ocultar o modal de detalhes do pet
    }

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

    return (
        <div className="pets container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Pets</h1>
                <Button>
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
                                        <Button>
                                            <i className="bi bi-trash-fill"></i>
                                        </Button>
                                        <Button>
                                            <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                        <Button onClick={() => openDetalhesPet(pet)}>
                                            <i class="bi bi-info-lg"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
            <div>
                <ModalDetalhesPets
                    pet={Pet}
                    show={showDetalhesPet}
                    handleClose={closeDetalhesPet}
                />
            </div>
        </div>
    );
}