import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoPedido() {
    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm({
        defaultValues: {
            clienteId: "",
            produtoId: "",
            quantidade: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "pedidos",
    });

    const navigate = useNavigate();

    function onSubmit(data) {
        let { pedidos, clienteId } = data;
        pedidos = pedidos.map((pedido) => {
            return {
                ...pedido,
                clienteId,
            };
        });

        console.log(pedidos)
        axios
            .post("http://localhost:3001/pedidos", { pedidos })
            .then((response) => {
                toast.success("Pedido adicionado.", {
                    position: "bottom-right",
                    duration: 2000,
                });
                // navigate("/pedidos"); 
            })
            .catch((error) => {
                toast.error("Algo deu errado", {
                    position: "bottom-right",
                    duration: 2000,
                });
            });
    }

    useEffect(() => {
        mapearProdutos();
        mapearClientes();
    }, []);

    function mapearProdutos() {
        axios
            .get("http://localhost:3001/produtos")
            .then((response) => {
                const produtos = response.data.map((produto) => ({
                    id: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                }));
                setProdutos(produtos);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function mapearClientes() {
        axios
            .get("http://localhost:3001/clientes")
            .then((response) => {
                const clientes = response.data.map((cliente) => ({
                    id: cliente.id,
                    nome: cliente.nome,
                }));
                setClientes(clientes);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h1>Novo Pedido</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select
                        className={errors.clienteId && "is-invalid"}
                        {...register("clienteId", {
                            required: "Escolher um cliente é obrigatório.",
                            message: "Escolha um cliente",
                        })}
                        onChange={(event) => {
                            setValue("clienteId", event.target.value);
                        }}
                    >
                        <option disabled value="">Selecione um cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </Form.Select>
                    {errors.clienteId && (
                        <Form.Text className="invalid-feedback">
                            {errors.clienteId.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" style={{ marginTop: "10px" }}>
                    <Form.Label>Produtos</Form.Label>
                    <ul>
                        {fields.map((item, index) => (
                            <li
                                key={item.id}
                                style={{ listStyle: "none", marginTop: "10px" }}
                            >
                                <Form.Select
                                    className={errors.produtoId && "is-invalid"}
                                    {...register(`pedidos.${index}.produtoId`, {
                                        required:
                                            "Escolher um produto é obrigatório.",
                                        message: "Escolha um produto",
                                    })}
                                    onChange={(event) => {
                                        setValue(
                                            "produtoId",
                                            event.target.value
                                        );
                                    }}
                                >
                                    <option disabled value="">
                                        Selecione um produto
                                    </option>

                                    {produtos.map((produto) => (
                                        <option
                                            key={produto.id}
                                            value={produto.id}
                                        >
                                            {produto.nome} - R$ {produto.preco}
                                        </option>
                                    ))}
                                </Form.Select>
                                <br />

                                <Form.Control

                                    type="number"
                                    placeholder="Digite a quantidade"


                                    {...register(
                                        `pedidos.${index}.quantidade`,
                                        {
                                            required:
                                                "A quantidade é obrigatória.",
                                            maxLength: {
                                                value: 5,
                                                message:
                                                    "Limite de 99999 produtos.",
                                            },
                                        }
                                    )}
                                    name={`pedidos.${index}.quantidade`}
                                    control={control}
                                />

                                <Button
                                    type="button"
                                    variant="danger"
                                    onClick={() => remove(index)}
                                    style={{ marginTop: "10px" }}
                                >
                                    <i className="bi bi-trash3-fill"></i>
                                </Button>
                                <br />
                            </li>
                        ))}
                        {errors.produtoId && (
                            <Form.Text className="invalid-feedback">
                                {errors.produtoId.message}
                            </Form.Text>
                        )}
                        {errors.quantidade && (
                            <Form.Text className="invalid-feedback">
                                {errors.quantidade.message}
                            </Form.Text>
                        )}
                    </ul>

                    <Button
                        type="button"

                        onClick={() =>
                            append({ produtoId: "", quantidade: "" })
                        }
                    >
                        <i className="bi bi-plus-lg"></i>
                    </Button>
                </Form.Group>

                <Button
                    type="submit"

                >
                    Finalizar pedido
                </Button>
            </Form>
        </div>
    );
}