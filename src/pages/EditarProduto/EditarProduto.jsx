import axios from "axios";
import { useEffect, } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns'; // para formatar a data que vem do banco de dados.
import moment from 'moment-timezone';


export function EditaProduto() {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        const dataAlterada = moment.tz(data.dataDesconto,'America/Sao_Paulo');

        data.dataDesconto = dataAlterada
        axios.put(`http://localhost:3001/produtos/${id}`, data)
            .then(response => {
                toast.success("Produto editado.", { position: "bottom-right", duration: 2000 });
                navigate("/produtos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/produtos/${id}`)
            .then(response => {
                const { nome, preco, descricao, desconto, categoria } = response.data;
                var { dataDesconto } = response.data;
                const date = new Date(dataDesconto)
                const dataFormatada = format(date, 'yyyy-MM-dd');
                dataDesconto = dataFormatada
                reset({ nome, preco, descricao, desconto, dataDesconto, categoria });
            })
    }, [id, reset])

    return (
        <div className="container">
            <h1>Editar Produto</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>preço</Form.Label>
                    <Form.Control type="float" className={errors.preco && "is-invalid"} {...register("preco", { required: "O preco é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres." } })} />
                    {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" className={errors.descricao && "is-invalid"} {...register("descricao", { required: "O descrição é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres." } })} />
                    {errors.descricao && <Form.Text className="invalid-feedback">{errors.descricao.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Desconto</Form.Label>
                    <Form.Control type="text" className={errors.desconto && "is-invalid"} {...register("desconto", { required: "O desconto é obrigatória.", maxLength: { value: 255, message: "Limite de 255 caracteres." } })} />
                    {errors.desconto && <Form.Text className="invalid-feedback">{errors.desconto.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>data Desconto</Form.Label>
                    <Form.Control type="date" className={errors.dataDesconto && "is-invalid"} {...register("dataDesconto", { required: "O data desconto é obrigatório." })} />
                    {errors.dataDesconto && <Form.Text className="invalid-feedback">{errors.dataDesconto.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select className={!isSubmitted ? "form-select" : (errors.categoria ? "form-select is-invalid" : "form-select is-valid")}
                        id="categoria" {...register("categoria", { required: "A categoria é obrigatório." })}>
                        <option value="Brinquedos">Brinquedos</option>
                        <option value="Conforto">Conforto</option>
                        <option value="Higiene">Higiene</option>
                    </Form.Select>
                    {errors.categoria && <Form.Text className="invalid-feedback">{errors.categoria.message}</Form.Text>}

                </Form.Group>


                <Button variant="primary" type="submit">
                    Editar
                </Button>
            </Form>
        </div>
    );
}