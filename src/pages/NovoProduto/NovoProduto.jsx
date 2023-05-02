import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from 'moment-timezone';
import { useEffect, useState } from "react";


export function NovoProduto() {
    const { register, handleSubmit, formState: { errors, isSubmitted }} = useForm({
      defaultValues: {
        nome: "",
        preco: "",
        descricao: "",
        desconto: "",
        dataDesconto: "",
        categoria: "",
      }
    });
    
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      listaProdutos();
    }, []);
  
    function onSubmit(data) {
      const dataAlterada = moment.tz(data.dataDesconto, 'America/Sao_Paulo');
      data.dataDesconto = dataAlterada;
  
      axios.post('http://localhost:3001/produtos', data)
        .then(response => {
            toast.success("Produto criado.", { position: "bottom-right", duration: 2000 });
            navigate("/produtos");
        })
        .catch(error => {
          toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
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
  return (
    <div className="container">
      <h1>Novo Produto</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
          {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preço</Form.Label>
          <Form.Control type="text" className={errors.preco && "is-invalid"} {...register("preco", { required: "O preço é obrigatório." })} />
          {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control type="text" className={errors.descricao && "is-invalid"} {...register("descricao", { required: "A descrição é obrigatória." })} />
          {errors.descricao && <Form.Text className="invalid-feedback">{errors.descricao.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Desconto</Form.Label>
          <Form.Control type="text" className={errors.desconto && "is-invalid"} {...register("desconto")} />
          {errors.desconto && <Form.Text className="invalid-feedback">{errors.desconto.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data Desconto</Form.Label>
          <Form.Control type="date" className={errors.dataDesconto && "is-invalid"} {...register("dataDesconto", { required: "A data de desconto é obrigatória." })} />
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
                    Adicionar
                </Button>
            </Form>
        </div>
    );
}