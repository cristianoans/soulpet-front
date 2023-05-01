import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function NovoServico() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const usenavigate = useNavigate();

  function inserirServico(servico) {
    console.log(servico);
    axios
      .post("http://localhost:3001/servicos", servico)
      .then(() => {
        toast.success("Serviço adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
        usenavigate("/servicos")
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
  }

 
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
            {...register("nome", {
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
            {...register("preco", {
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
    </div>
  );
}
