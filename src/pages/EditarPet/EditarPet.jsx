import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditaPet() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        axios.put(`http://localhost:3001/pets/${id}`, data)
            .then(response => {
                toast.success("Pet editado.", { position: "bottom-right", duration: 2000 });
                navigate("/pets");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/pets/${id}`)
            .then(response => {
                const { nome, tipo, dataNasc, porte} = response.data;
                reset({ nome, tipo, dataNasc, porte});
            })
    }, [id, reset])

    return (
        <div className="container">
            <h1>Editar Pet</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."} })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control type="text" className={errors.tipo && "is-invalid"} {...register("tipo", { required: "O tipo é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres."} })} />
                    {errors.tipo && <Form.Text className="invalid-feedback">{errors.tipo.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>data de Nascimento</Form.Label>
                    <Form.Control type="date" className={errors.dataNasc && "is-invalid"} {...register("dataNasc", { required: "data Nascimento é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres."} })} />
                    {errors.dataNasc && <Form.Text className="invalid-feedback">{errors.dataNasc.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>porte</Form.Label>
                    <Form.Control type="text" className={errors.porte && "is-invalid"} {...register("porte", { required: "data Nascimento é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres."} })} />
                    {errors.porte && <Form.Text className="invalid-feedback">{errors.porte.message}</Form.Text>}
                </Form.Group>

                

                <Button variant="primary" type="submit">
                    Editar
                </Button>
            </Form>
        </div>
    );
}