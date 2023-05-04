import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import '../../index.css'
import gato from "../../assets/gato.png"
import sacolaPedido from "../../assets/pet-shop.png"
import peso from "../../assets/peso.png"
import tosa from "../../assets/tosa-de-animais-de-estimacao.png"
import produtoImg from "../../assets/grosa.png"
import clienteImg from "../../assets/clientes.png"

export function Home() {
    const [totalClientes, setTotalClientes] = useState(null)
    const [totalPets, setTotalPets] = useState(null)
    const [totalProdutos, setTotalProdutos] = useState(null)
    const [totalServicos, setTotalServicos] = useState(null)
    const [totalAgendamentos, setTotalAgendamentos] = useState(null)
    const [totalPedidos, setTotalPedidos] = useState(null)
    useEffect(() => {
        pegarDados()
    }, [])

    function pegarDados() {

        axios.get('http://localhost:3001/dashboard').then(response => {
            setTotalClientes(response.data.clientes)
            setTotalPets(response.data.pets)
            setTotalProdutos(response.data.produtos)
            setTotalServicos(response.data.servicos)
            setTotalAgendamentos(response.data.agendamentos)
            setTotalPedidos(response.data.pedidos)
        })

    }

    return (
        <div className="home d-flex flex-column align-items-center justify-content-around ">
            <h1> DASHBOARD </h1>
            <div className="d-flex flex-wrap justify-content-center align-items-center  gap-5 dashboard">
                
                <Card style={{ width: '150px',height:'246px' }} className="card d-flex justify-content-center align-items-center shadow p-3 rounded">
                    <Card.Img variant="top" src={clienteImg} />
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                        <Card.Title>Total Clientes</Card.Title>
                        <Card.Text>
                            {totalClientes}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '150px',height:'246px' }} className="card d-flex justify-content-center align-items-center shadow p-3 rounded" >
                    <Card.Img variant="top" src={gato} className="mt-2"  />
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center ">
                        <Card.Title>Total Pets</Card.Title>
                        <Card.Text>
                            {totalPets}
                        </Card.Text>
                    </Card.Body>
                </Card>
                {totalProdutos !== 0 && <Card style={{ width: '150px', height:'246px'}} className=" card d-flex justify-content-center align-items-center shadow p-3 rounded">
                    <Card.Img variant="top" src={produtoImg} className="mt-2" />
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center ">
                        <Card.Title>Total Produtos</Card.Title>
                        <Card.Text>
                            {totalProdutos}
                        </Card.Text>
                    </Card.Body>
                </Card>}
                {totalServicos !== 0 && <Card style={{ width: '150px',height:'246px' }} className="card d-flex justify-content-center align-items-center shadow p-3 rounded">
                    <Card.Img variant="top" src={tosa} className="mt-2" />
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center ">
                        <Card.Title>Total Serviços</Card.Title>
                        <Card.Text>
                            {totalServicos}
                        </Card.Text>
                    </Card.Body>
                </Card>}
                {totalAgendamentos !== 0 && <Card style={{ width: '150px',height:'246px' }} className="card card d-flex justify-content-center align-items-center shadow p-3 rounded">
                    <Card.Img variant="top" src={peso} className="mt-2" />
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center ">
                        <Card.Title>Total Agendamentos</Card.Title>
                        <Card.Text>
                            {totalAgendamentos}
                        </Card.Text>
                    </Card.Body>
                </Card>}
                {totalPedidos !== 0 && <Card style={{ width: '150px',height:'246px' }} className="card card d-flex justify-content-center align-items-center shadow p-3 rounded">
                    <Card.Img variant="top" src={sacolaPedido} className="mt-2" />
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                        <Card.Title>Total pedidos </Card.Title>
                        <Card.Text>
                            {totalPedidos}
                        </Card.Text>
                    </Card.Body>
                </Card>}
            </div>

        </div>
    );
}