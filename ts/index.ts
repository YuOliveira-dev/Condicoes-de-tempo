
// Pega o formulário dentro da barra de pesquisa
const form = document.querySelector("#search-form > form");

// input recebe a localização que o usuário digitar
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

  // Informa as condições de tempo
  const sectionInfos = document.querySelector('#tempo-info')

  // No evento de submit, não deixa recarregar a página e pega o evento
form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Previne que o input não retorne nulo
  if (!input || sectionInfos === null) return;
  const localizacao = input?.value;

  // Se a localização for menor que 3 digitos, retorna um erro
  if (localizacao.length < 3) {
    alert("O local precisa ter pelo menos 3 letras");
    return;
  }

  // Envolve a requisição da API dentro de um try e tenta fazer a requisição de informações, caso erro, retorna um erro no console
  try {
    const reponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=2f98989eee2a54d3cc6a452fd981dbde&lang=pt_br&units=metric`
      );
    
      // Pega o JSON da requisiçao 
      const data = await reponse.json();
    
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
            `
  } catch (err) {
    console.log('Deu um erro na obtenção dos dados da API.', err)
  }
});
