import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { ModalDetalhesPets } from "../../components/ModalDetalhesPets/ModalDetalhesPets";
import { Link } from "react-router-dom";

export function Pets() {
    const [listaPets, setListaPets] = useState(null);
    const [Pet, setPet] = useState(null);
    const [page ,setPage] = useState(1);
    const [nextPage ,setNextPage] = useState();
    const [prevPage ,setPrevPage] = useState();

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
        initializeTable(page);
    }, []);

    function initializeTable(page) {
        axios.get(`http://localhost:3001/pets?page=${page}`)
            .then((response) => {
                console.log(response);
                console.log(page);
                setListaPets(response.data.pets);
                setNextPage(response.data.pagination.next_page_url);
                setPrevPage(response.data.pagination.prev_page_url);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function btnPrev() {
        if (prevPage>=1) {
            initializeTable(prevPage)
            
        }
    }

    function btnNext() {
        if (nextPage>=1) {
            initializeTable(nextPage)
        }
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
                                        <Button>
                                            <i className="bi bi-trash-fill"></i>
                                        </Button>
                                        <Button>
                                            <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                        <Button onClick={() => openDetalhesPet(pet)}>
                                            <i className="bi bi-info-lg"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
            <div className="d-flex justify-content-between align-items-center">
            <Button onClick={btnPrev}>prev</Button>
            <Button onClick={btnNext}>next</Button>

            </div>
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