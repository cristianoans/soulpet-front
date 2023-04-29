import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

export function NovoServico() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [servicos, setServicos] = useState([]);

  function listaServicos() {
    axios
      .get("http://localhost:3001/servicos")
      .then((response) => {
        setServicos(response.data);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
  }

  function inserirServico(servico) {
    axios
      .post("http://localhost:3001/servicos", servico)
      .then(() => {
        reset();
        toast.success("Serviço adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
        listaServicos();
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
  }

  if (servicos.length === 0) {
    return (
      <div className="container">
        <h1>Serviços</h1>
        <form onSubmit={handleSubmit(inserirServico)}>
          <div className="form-floating mb-2">
            <input
              type="text"
              className={
                !errors.nomeServico ? "form-control" : "form-control is-invalid"
              }
              id="nomeServico"
              {...register("nomeServico", {
                required: "O nome do serviço é obrigatório.",
              })}
            />
            <label htmlFor="nomeServico">Nome do Serviço</label>
            <div className="invalid-feedback">
              {errors.nomeServico && errors.nomeServico.message}
            </div>
          </div>

          <div className="form-floating mb-2">
            <input
              type="number"
              className={
                !errors.precoServico
                  ? "form-control"
                  : "form-control is-invalid"
              }
              id="precoServico"
              {...register("precoServico", {
                required: "O preço do serviço é obrigatório.",
              })}
            />
            <label htmlFor="precoServico">Preço do Serviço</label>

            <div className="invalid-feedback">
              {errors.precoServico && errors.precoServico.message}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Adicionar Serviço
          </button>
        </form>

        <h2>Lista de Serviços</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Preço</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((servico) => (
              <tr key={servico.id}>
                <td>{servico.nome}</td>
                <td>{servico.preco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
