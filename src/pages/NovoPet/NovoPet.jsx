import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export function NovoPet() {

    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm({
        defaultValues: {
            clienteId: "",
            nome: "",
            tipo: "",
            porte: "",
            dataNasc: "",
        }
    });
    const [clientes, setClientes] = useState([]);
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

    useEffect(() => {
        listaClientes();
    }, []);


    function onSubmit(data) {
        axios.post("http://localhost:3001/pets", data)
            .then(response => {
                toast.success("Pet adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/pets");
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
                    <input type="text" className={!isSubmitted ? "form-control" : (errors.nome ? "form-control is-invalid" : "form-control is-valid")}
                        id="nome" {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
                    <label htmlFor="nome">Nome do Pet</label>
                    <div className="invalid-feedback">
                        {errors.nome && errors.nome.message}
                    </div>
                </div>
                <div className="form-floating mb-2">
                    <input type="text" className={!isSubmitted ? "form-control" : (errors.tipo ? "form-control is-invalid" : "form-control is-valid")}
                        id="tipo" {...register("tipo", { required: "O tipo é obrigatório.", maxLength: { value: 100, message: "Limite de 100 caracteres." } })} />
                    <label htmlFor="tipo">Tipo</label>
                    <div className="invalid-feedback">
                        {errors.tipo && errors.tipo.message}
                    </div>
                </div>
                <div className="form-floating mb-2">
                    <input type="text" className={!isSubmitted ? "form-control" : (errors.porte ? "form-control is-invalid" : "form-control is-valid")}
                        id="porte" {...register("porte", { required: "O porte é obrigatório.", maxLength: { value: 100, message: "Limite de 100 caracteres." } })} />
                    <label htmlFor="porte">Porte</label>
                    <div className="invalid-feedback">
                        {errors.porte && errors.porte.message}
                    </div>
                </div>
                <div className="form-floating mb-2">
                    <input type="date" className={!isSubmitted ? "form-control" : (errors.dataNasc ? "form-control is-invalid" : "form-control is-valid")}
                        id="dataNasc" {...register("dataNasc", { required: "A data de nascimento é obrigatória." })} />
                    <label htmlFor="dataNasc">Data de Nascimento</label>
                    <div className="invalid-feedback">
                        {errors.dataNasc && errors.dataNasc.message}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );

};