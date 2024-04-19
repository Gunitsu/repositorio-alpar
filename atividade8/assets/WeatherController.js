// WeatherController.js

import { ModeloClima } from "./WeatherModel.js";
import { VisaoClima } from "./WeatherView.js";

class ControladorClima {
    constructor() {
        this.modelo = new ModeloClima();
        this.visao = new VisaoClima();

        this.visao.vincularBuscarCidade(this.lidarComBuscaCidade);
        this.visao.vincularBuscarLocalizacao(this.lidarComBuscaLocalizacao);

        document.addEventListener("DOMContentLoaded", () => {
            this.inicializar();
        });
    }

    async inicializar() {
        try {
            const cidadePadrao = "Carapicuíba";
            const climaPadrao = await this.modelo.obterClimaAtual(cidadePadrao);
            const previsaoPadrao = await this.modelo.obterPrevisaoClima(cidadePadrao);
            this.visao.exibirClima(climaPadrao);
            this.visao.exibirPrevisao(previsaoPadrao);
        } catch (erro) {
            console.error("Erro ao inicializar a aplicação:", erro);
        }
    }

    lidarComBuscaCidade = async (cidade) => {
        try {
            const clima = await this.modelo.obterClimaAtual(cidade);
            const previsao = await this.modelo.obterPrevisaoClima(cidade);
            this.visao.exibirClima(clima);
            this.visao.exibirPrevisao(previsao);
        } catch (erro) {
            console.error("Erro ao buscar pela cidade:", erro);
        }
    };

    lidarComBuscaLocalizacao = () => {
        navigator.geolocation.getCurrentPosition(async (posicao) => {
            try {
                const latitude = posicao.coords.latitude;
                const longitude = posicao.coords.longitude;
                const clima = await this.modelo.obterClimaPorCoordenadas(latitude, longitude);
                const previsao = await this.modelo.obterPrevisaoPorCoordenadas(latitude, longitude);
                this.visao.exibirClima(clima);
                this.visao.exibirPrevisao(previsao);
            } catch (erro) {
                console.error("Erro ao buscar pela localização:", erro);
            }
        });
    };
}

const controlador = new ControladorClima();
