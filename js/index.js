"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Pega o formulário dentro da barra de pesquisa
const form = document.querySelector("#search-form > form");
// input recebe a localização que o usuário digitar
const input = document.querySelector("#input-localizacao");
// Informa as condições de tempo
const sectionInfos = document.querySelector('#tempo-info');
// No evento de submit, não deixa recarregar a página e pega o evento
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    // Previne que o input não retorne nulo
    if (!input || sectionInfos === null)
        return;
    const localizacao = input === null || input === void 0 ? void 0 : input.value;
    // Se a localização for menor que 3 digitos, retorna um erro
    if (localizacao.length < 3) {
        alert("O local precisa ter pelo menos 3 letras");
        return;
    }
    // Envolve a requisição da API dentro de um try e tenta fazer a requisição de informações, caso erro, retorna um erro no console
    try {
        const reponse = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=2f98989eee2a54d3cc6a452fd981dbde&lang=pt_br&units=metric`);
        // Pega o JSON da requisiçao 
        const data = yield reponse.json();
        // info recebe os dados dentro da API, Temperatura, local e icone
        const infos = {
            // math.round pra retornar o valor inteiro da temperatura
            temperatura: Math.round(data.main.temp),
            local: data.name,
            icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
        // Renderiza o HTML caso a requisição dê certo
        sectionInfos.innerHTML = `<div class="tempo-dados">
            <h2>${infos.local}</h2>
    
            <span>${infos.temperatura}ºC</span>
            </div>
            <img src="${infos.icone}" />
            `;
    }
    catch (err) {
        console.log('Deu um erro na obtenção dos dados da API.', err);
    }
}));
