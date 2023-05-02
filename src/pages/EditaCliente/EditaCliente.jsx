import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { listaCidades, listaEstados } from "../../api/IBGE";


export function EditaCliente({}) {

    const { register, watch, handleSubmit, formState: { errors }, reset } = useForm();
    const ufSelecionada = watch("endereco.uf");
    const [ufs, setUFs] = useState([]);
    const [cidades, setCidades] = useState(null);
    const [cidade, setCidade] = useState(); // armazena a cidade cadastrada no banco de dados
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        axios.put(`http://localhost:3001/clientes/${id}`, data)
            .then(response => {
                toast.success("Cliente editado.", { position: "bottom-right", duration: 2000 });
                navigate("/clientes");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        // função que lista as UFs
        listaEstados().then(response => { 
            setUFs(response.data);
        });
        // função que recupera os dados gravados no banco de dados
        axios.get(`http://localhost:3001/clientes/${id}`)
            .then(response => {
                const { nome, email, telefone, endereco: { cidade, uf, cep, rua, numero } } = response.data;
                setCidade(response.data.endereco.cidade) // armazena o estado da cidade recuperada do banco de dados
                reset({ nome, email, telefone, endereco: { cidade, uf, cep, rua, numero } }); // preenche os dados do formulário
            })
    }, [id, reset, cidade]) // escuta a cidade para renderizar corretamente o select/option de cidade no formulário

    useEffect(() => { // função executada quando selecionamos novaUF no formulário
        if (ufSelecionada) { // esta condição é para evitar esta consulta na renderização inicial do componente
            listaCidades(ufSelecionada).then(response => {
                setCidades(response.data)
            })
        }
    }, [ufSelecionada])



    return (
        <div className="container">
            <h1>Editar Cliente</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" className={errors.email && "is-invalid"} {...register("email", { required: "O e-mail é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres." } })} />
                    {errors.email && <Form.Text className="invalid-feedback">{errors.email.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="tel" className={errors.telefone && "is-invalid"} {...register("telefone", { required: "O telefone é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres." } })} />
                    {errors.telefone && <Form.Text className="invalid-feedback">{errors.telefone.message}</Form.Text>}
                </Form.Group>

                <div className="form-floating mb-2">
                    <select className="form-select"
                        id="endereco.uf" {...register("endereco.uf", { required: "O UF é obrigatório." })}>
                        <option value="" disabled>Selecione</option>
                        {ufs?.map(uf => (
                            <option key={uf.id} value={uf.sigla}>{uf.sigla}</option>
                        ))}
                    </select>
                    <label htmlFor="endereco.uf">UF</label>
                    <div className="invalid-feedback">
                        {errors.endereco?.uf && errors.endereco?.uf.message}
                    </div>
                </div>

                <div className="form-floating mb-2">
                    <select className="form-select"
                        id="endereco.cidade" {...register("endereco.cidade", { required: "A cidade é obrigatório." })}>
                        <option value="" disabled>Selecione</option>
                        {cidades?.map(c => (
                            <option key={c.id} value={c.nome}>{c.nome}</option>
                        ))}       
                    </select>
                    <label htmlFor="endereco.cidade">Cidade</label>
                    <div className="invalid-feedback">
                        {errors.endereco?.cidade && errors.endereco?.cidade.message}
                    </div>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control type="text" className={errors.endereco?.cep && "is-invalid"} {...register("endereco.cep", { required: "O CEP é obrigatório.", maxLength: { value: 9, message: "Limite de 9 caracteres." } })} />
                    {errors.endereco?.cep && <Form.Text className="invalid-feedback">{errors.endereco?.cep.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rua</Form.Label>
                    <Form.Control type="text" className={errors.endereco?.rua && "is-invalid"} {...register("endereco.rua", { required: "A rua é obrigatória.", maxLength: { value: 255, message: "Limite de 255 caracteres." } })} />
                    {errors.endereco?.rua && <Form.Text className="invalid-feedback">{errors.endereco?.rua.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Numero</Form.Label>
                    <Form.Control type="text" className={errors.endereco?.numero && "is-invalid"} {...register("endereco.numero", { required: "O número é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres." } })} />
                    {errors.endereco?.numero && <Form.Text className="invalid-feedback">{errors.endereco?.numero.message}</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Editar
                </Button>
            </Form>

        </div>
    );
}