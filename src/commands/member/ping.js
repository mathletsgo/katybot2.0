const { PREFIX } = require("../../config");

module.exports = {
  name: "ping",
  description: "Verificar se o bot está online",
  commands: ["ping"],
  usage: `${PREFIX}ping`,
  handle: async ({ sendReply, sendReact }) => {
    try {
      const start = Date.now();
      const now = new Date();
      const formattedDate = now.toLocaleDateString("pt-BR");
      const formattedTime = now.toLocaleTimeString("pt-BR");

      // Definir saudação de acordo com a hora
      const hours = now.getHours();
      const greeting = hours < 5 ? "🌌 Boa madrugada" 
                    : hours < 12 ? "🌅 Bom dia" 
                    : hours < 18 ? "🌞 Boa tarde" 
                    : "🌙 Boa noite";

      // Calcular uptime do bot
      const uptimeSeconds = Math.floor(process.uptime());
      const uptimeHours = Math.floor(uptimeSeconds / 3600);
      const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60);
      const uptimeSecondsRemaining = uptimeSeconds % 60;
      const uptime = `${uptimeHours}h ${uptimeMinutes}m ${uptimeSecondsRemaining}s`;

      // Mensagens e reações aleatórias
      const responses = ["Pong"];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const reactions = ["🔥", "🚀", "💥", "⚡", "🌟"];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

      // Formatar mensagem
      const message = `
│ ${greeting}!
│📅 Data: ${formattedDate}
│⏰ Hora: ${formattedTime}
│🚀 Speed: ${Date.now() - start}ms 
│⏳ Uptime: ${uptime}
`;

      await sendReact(randomReaction);
      await sendReply(message);
    } catch (error) {
      console.error("Erro no comando ping:", error);
      await sendReply("Ops! Houve um problema ao executar o comando.");
    }
  },
};