import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export function NovoPedido() {

    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm({
        defaultValues: {
            clienteId: "",
            produtoId: "",
            quantidade: "",

        }
    });
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

    function listaClientes() {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    function listaProdutos() {
        axios.get("http://localhost:3001/produtos")
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        listaClientes();
        listaProdutos();
    }, []);


    function onSubmit(data) {
        axios.post("http://localhost:3001/pedidos", data)
            .then(response => {
                toast.success("Pet adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/pedidos");
            })
            .catch(error => {
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
    }


    return (
        <div className="container mt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating mb-2">
                    <select className={!isSubmitted ? "form-select" : (errors.clienteId ? "form-select is-invalid" : "form-select is-valid")}
                        id="clienteId" {...register("clienteId", { required: "O cliente é obrigatório." })}>
                        <option value="" disabled>Selecione</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                        ))}
                    </select>
                    <label htmlFor="clienteId">Cliente</label>
                    <div className="invalid-feedback">
                        {errors.clienteId && errors.clienteId.message}
                    </div>
                </div>
                <div className="form-floating mb-2">
                    <select className={!isSubmitted ? "form-select" : (errors.produtoId ? "form-select is-invalid" : "form-select is-valid")}
                        id="produtoId" {...register("produtoId", { required: "O cliente é obrigatório." })}>
                        <option value="" disabled>Selecione</option>
                        {produtos.map(produto => (
                            <option key={produto.id} value={produto.id}>{produto.nome}</option>
                        ))}
                    </select>
                    <label htmlFor="produtoId">Produto</label>
                    <div className="invalid-feedback">
                        {errors.produtoId && errors.produtoId.message}
                    </div>
                </div>
                <div className="form-floating mb-2">
                    <input type="number" className={!isSubmitted ? "form-control" : (errors.quantidade ? "form-control is-invalid" : "form-control is-valid")}
                        id="quantidade" {...register("quantidade", { required: "O quantidade é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
                    <label htmlFor="quantidade">quantidade de pedidos </label>
                    <div className="invalid-feedback">
                        {errors.quantidade && errors.quantidade.message}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );

};