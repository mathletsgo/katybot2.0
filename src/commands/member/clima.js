const { sendText, PREFIX } = require("../../config");
const axios = require("axios");

module.exports = {
  name: "clima",
  description: "Comando para obter clima baseado no DDD",
  commands: ["clima"],
  usage: `${PREFIX}clima [DDD]`,
  handle: async ({ args, sendText, sendReact }) => {
    // Pega o DDD informado
    const ddd = args[0];

    const dddToCity = {
      "11": "São Paulo",
      "12": "São José dos Campos",
      "13": "Santos",
      "14": "Bauru",
      "15": "Sorocaba",
      "16": "Ribeirão Preto",
      "17": "São José do Rio Preto",
      "18": "Presidente Prudente",
      "19": "Campinas",
      "21": "Rio de Janeiro",
      "22": "Campos dos Goytacazes",
      "24": "Volta Redonda",
      "27": "Vitória",
      "28": "Serra",
      "31": "Belo Horizonte",
      "32": "Juiz de Fora",
      "33": "Governador Valadares",
      "34": "Uberaba",
      "35": "Divinópolis",
      "37": "Varginha",
      "41": "Curitiba",
      "42": "Ponta Grossa",
      "43": "Londrina",
      "44": "Maringá",
      "45": "Foz do Iguaçu",
      "46": "Cascavel",
      "47": "Chapecó",
      "51": "Porto Alegre",
      "53": "Pelotas",
      "54": "Caxias do Sul",
      "55": "Santa Maria",
      "61": "Brasília",
      "62": "Goiânia",
      "63": "Palmas",
      "64": "Cuiabá",
      "65": "Rondonópolis",
      "66": "Sinop",
      "67": "Campo Grande",
      "68": "Rio Branco",
      "69": "Porto Velho",
      "71": "Salvador",
      "73": "Feira de Santana",
      "74": "Juazeiro",
      "75": "Ilhéus",
      "77": "Teixeira de Freitas",
      "79": "Aracaju",
      "81": "Recife",
      "82": "Maceió",
      "83": "João Pessoa",
      "84": "Natal",
      "85": "Fortaleza",
      "86": "Teresina",
      "87": "Caruaru",
      "88": "Ceará-Mirim",
      "89": "Picos",
      "91": "Belém",
      "92": "Manaus",
      "93": "Marabá",
      "94": "Santarém",
      "95": "Boa Vista",
      "96": "Macapá",
      "97": "Maceió",
      "98": "São Luís",
      "99": "Imperatriz",
    };

    // Verifica se o DDD é válido
    const city = dddToCity[ddd];

    if (!city) {
      return sendText("Erro: DDD inválido. Digite o comando `/clima` seguido do seu DDD.");
    }

    // Realiza a requisição para a API de clima com a cidade
    try {
      const apiKey = "84d57f8e9b80f1967c7f996845fab3b0"; // Sua chave da API do OpenWeather
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      const temperature = weatherData.data.main.temp;
      const weatherDescription = weatherData.data.weather[0].description;
      const emojiClima = weatherDescription.includes("nublado")
        ? "☁️"
        : weatherDescription.includes("chuva")
        ? "🌧️"
        : "🌞";

      // Obtém a data e hora atual
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = currentDate.toLocaleTimeString("pt-BR");

      // Reação de clima
      await sendReact("🌦️");

      // Formatação da mensagem com clima, data, hora e detalhes
      const message = `
*🏙️ ${city}*
*🌡️ Temperatura:* ${temperature}°C ${emojiClima}
*☁️ Condição:* ${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}
*⏰ ${formattedTime} ${formattedDate}*.
`;

      // Envia a resposta formatada
      return sendText(message);
    } catch (error) {
      console.error(error);
      return sendText("🏴‍☠️ Erro ao buscar clima, tente novamente.");
    }
  },
};