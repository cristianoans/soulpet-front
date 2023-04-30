import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

export function Servicos() {
    const [listaServicos, setListaServicos] = useState(null);

    useEffect(() => {
        initializeTable();
    }, []);

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
                                        <Button>
                                            <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                        <Button>
                                            <i class="bi bi-trash-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
}