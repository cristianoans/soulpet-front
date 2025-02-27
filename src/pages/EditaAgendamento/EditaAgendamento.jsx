import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from 'date-fns'; // para formatar a data que vem do banco de dados.
import moment from 'moment-timezone';

export function EditaAgendamento() {

    const { register, handleSubmit, reset, formState: { errors, isSubmitted } } = useForm({
        defaultValues: {
            petId: "",
            servicoId: "",
            dataAgendada: "",
            realizada: "",
        }
    });
    const [pets, setPets] = useState([]);
    const [servicos, setServicos] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    function listaPets() {
        axios.get("http://localhost:3001/pets")
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        listaPets();
        listaServicos();
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/agendamentos/${id}`)
            .then(response => {
                const { realizada, petId, servicoId } = response.data;
                let { dataAgendada } = response.data;
                const date = new Date(dataAgendada)
                const dataFormatada = format(date, 'yyyy-MM-dd');
                dataAgendada = dataFormatada
                reset({ dataAgendada, realizada, petId, servicoId });
            })
    }, [id, reset])

    function listaServicos() {
        axios.get("http://localhost:3001/servicos")
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function onSubmit(data) {
        // Faz a inclusão do timezone na dataAgendada, para evitar erros ao gravar no banco de dados.
        const dataAlterada = moment.tz(data.dataAgendada,'America/Sao_Paulo');
        data.dataAgendada = dataAlterada;

        axios.put(`http://localhost:3001/agendamentos/${id}`, data)
            .then(response => {
                toast.success("Agendamento adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/agendamentos");
            })
            .catch(error => {
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
    }

    return (
        <div className="container mt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating mb-2">
                    <select className={!isSubmitted ? "form-select" : (errors.petId ? "form-select is-invalid" : "form-select is-valid")}
                        id="petId" {...register("petId", { required: "O pet é obrigatório." })}>
                        <option value="" disabled>Selecione</option>
                        {pets.map(pet => (
                            <option key={pet.id} value={pet.id}>{pet.nome}</option>
                        ))}
                    </select>
                    <label htmlFor="petId">Pet</label>
                    <div className="invalid-feedback">
                        {errors.petId && errors.petId.message}
                    </div>
                </div>
                <div className="form-floating mb-2">
                    <select className={!isSubmitted ? "form-select" : (errors.servicoId ? "form-select is-invalid" : "form-select is-valid")}
                        id="servicoId" {...register("servicoId", { required: "O servico é obrigatório." })}>
                        <option value="" disabled>Selecione</option>
                        {servicos.map(servico => (
                            <option key={servico.id} value={servico.id}>{servico.nome}</option>
                        ))}
                    </select>
                    <label htmlFor="servicoId">Servico</label>
                    <div className="invalid-feedback">
                        {errors.servicoId && errors.servicoId.message}
                    </div>
                </div>
    
                <div className="form-floating mb-2">
                    <input type="date" className={!isSubmitted ? "form-control" : (errors.dataAgendada ? "form-control is-invalid" : "form-control is-valid")}
                        id="dataAgendada" {...register("dataAgendada", { required: "A data agendada é obrigatória." })} />
                    <label htmlFor="dataAgendada">Data</label>
                    <div className="invalid-feedback">
                        {errors.dataAgendada && errors.dataAgendada.message}
                    </div>
                </div>

                <div className="form-floating mb-2">
                    <select className={!isSubmitted ? "form-select" : (errors.realizada ? "form-select is-invalid" : "form-select is-valid")}
                        id="realizada" {...register("realizada")}>
                        <option value="false">Não</option>
                        <option value="true">Sim</option>
                    </select>
                    <label htmlFor="realizada">Realizada?</label>
                </div>

                <button type="submit" className="btn btn-primary">Editar</button>
            </form>
        </div>
    );
};