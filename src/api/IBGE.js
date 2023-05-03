import axios from "axios";

    export async function listaEstados() {
        const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        return response;
    }

    export async function listaCidades(uf) {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        return response;
    }