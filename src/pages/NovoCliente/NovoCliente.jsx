import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { listaCidades, listaEstados } from "../../api/IBGE";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";

export function NovoCliente() {

    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            endereco: { uf: "" }
        }
    });
    const ufSelecionada = watch("endereco.uf");
    const [ufs, setUFs] = useState(null);
    const [cidades, setCidades] = useState();
    const navigate = useNavigate();


    useEffect(() => { // função disparada quando a página é carregada
        listaEstados().then(response => { // função que lista as UFs
            setUFs(response.data);
        });
    }, [])

    useEffect(() => { // função que é disparada quando ocorre alteração na UF
        listaCidades(ufSelecionada).then(response => { // função que lista as cidades com base na UF
            setCidades(response.data);
            })
    }, [ufSelecionada])

    function onSubmit(data) {
        axios.post("http://localhost:3001/clientes", data)
            .then(response => {
                toast.success("Cliente adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/clientes");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h1>Novo Cliente</h1>
            {ufs === null ? <Loader /> :
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
                            {ufs.map(uf => (
                                <option key={uf.id} value={uf.sigla}>{uf.sigla}</option>
                            ))}
                        </select>
                        <label htmlFor="endereco.uf">UF</label>
                        <div className="invalid-feedback">
                            {errors.endereco?.uf && errors.endereco?.uf.message}
                        </div>
                    </div>

                    {ufSelecionada ?
                        <div className="form-floating mb-2">
                            <select className="form-select"
                                id="endereco.cidade" {...register("endereco.cidade", { required: "A cidade é obrigatório." })}>
                                <option value="" disabled>Selecione</option>
                                {cidades.map(cidade => (
                                    <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
                                ))}
                            </select>
                            <label htmlFor="endereco.cidade">Cidade</label>
                            <div className="invalid-feedback">
                                {errors.endereco?.cidade && errors.endereco?.cidade.message}
                            </div>
                        </div>
                        :
                        <div className="form-floating mb-2">
                            <select className="form-select"
                                id="endereco.cidade" {...register("endereco.cidade", { required: "A cidade é obrigatório." })} disabled>
                                <option value="" disabled>Selecione</option>
                            </select>
                            <label htmlFor="endereco.cidade">Cidade</label>
                            <div className="invalid-feedback">
                                {errors.endereco?.cidade && errors.endereco?.cidade.message}
                            </div>
                        </div>
                    }

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
                        Cadastrar
                    </Button>
                </Form>
            }

        </div>
    );
}