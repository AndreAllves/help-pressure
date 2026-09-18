// ---------------------------------------------------------------------
// Alimentos específicos (para perguntas como "posso comer banana?")
// Para adicionar um alimento novo, copie um bloco e mude os dados.
//   nomes:    palavras que o usuário pode digitar (sem acento)
//   resposta: o que o bot responde
// ---------------------------------------------------------------------
const ALIMENTOS = [
  {
    nomes: ["banana"],
    resposta: "Sim, banana está inclusa! 🍌\nEla é rica em potássio, que ajuda a controlar a pressão."
  },
  {
    nomes: ["linguica"],
    resposta: "Não, linguiça não está inclusa. 🚫\nEla tem muito sal e gordura. Prefira frango sem pele ou peixe."
  },
  {
    nomes: ["cafe"],
    resposta: "Café pode, com moderação! ☕\nUma ou duas xícaras por dia costuma ser seguro. Se a pressão subir depois do café, converse com seu médico."
  }
];

// ---------------------------------------------------------------------
// Base de conhecimento por assunto
// ---------------------------------------------------------------------
const RESPOSTAS = {
  saudacao: "Olá! 😊 Eu sou o Nutri-Amigo, seu assistente sobre alimentação e pressão alta. Pode me perguntar, por exemplo: 'quais frutas posso comer?' ou 'posso comer banana?'.",
  despedida: "Foi um prazer conversar com você! Cuide-se e lembre-se de seguir as orientações do seu médico. Até logo! 👋",
  ajuda: "Posso te ajudar com estes assuntos:\n🍎 Frutas e verduras\n🧂 Sal e sódio\n🥩 Carnes e proteínas\n🥛 Leite e derivados\n🍞 Pães e cereais\n🍟 Alimentos industrializados\n💧 Água e líquidos\n🍫 Doces e açúcar\n☕ Café\n🍽️ Dieta DASH (dica geral)\n\nVocê também pode perguntar sobre um alimento, como \"posso comer banana?\", \"posso comer linguiça?\" ou \"posso tomar café?\".",
  frutas_verduras: "Frutas e verduras são ótimas aliadas! 🍎🥦\nPrefira: banana, laranja, mamão, melancia, folhas verdes escuras (couve, espinafre), abóbora, cenoura, beterraba e tomate.\nEles têm potássio, que ajuda a controlar a pressão. Coma pelo menos 5 porções por dia, de preferência in natura.",
  sal_sodio: "O sal (sódio) é o principal vilão da pressão alta! 🧂\nEvite: sal de cozinha em excesso, caldos e temperos prontos, embutidos (presunto, salsicha, linguiça) e conservas.\nPrefira temperar a comida com ervas, alho, cebola, limão e especiarias no lugar do sal. O ideal é usar no máximo 1 colher de chá rasa de sal por dia (cerca de 5g).",
  carnes_proteinas: "Sobre carnes e proteínas: 🥩🐟\nPrefira: peixes (sardinha, salmão), frango sem pele, ovos e leguminosas (feijão, lentilha, grão de bico).\nEvite: carnes gordurosas, frituras, embutidos e vísceras. Retire a gordura visível e a pele antes de preparar.",
  leite_derivados: "Leite e derivados: 🥛\nPrefira as versões desnatadas ou semidesnatadas de leite, iogurte e queijos brancos (como ricota e cottage), que têm menos sal e gordura. Evite queijos amarelos muito salgados, como o parmesão em excesso.",
  paes_cereais: "Pães e cereais: 🍞🌾\nPrefira os integrais: pão integral, arroz integral, aveia e granola sem açúcar. Eles têm mais fibras e ajudam o coração. Cuidado com pães e biscoitos industrializados, que costumam ter bastante sal.",
  industrializados: "Alimentos industrializados merecem atenção redobrada! ⚠️\nEvite: macarrão instantâneo, salgadinhos, temperos prontos (tipo 'sazon' ou caldo de galinha), enlatados, embutidos e fast-food. Eles costumam ter muito sódio escondido, mesmo quando não têm gosto salgado. Leia sempre o rótulo!",
  agua_liquidos: "Água e líquidos: 💧\nBeber água ao longo do dia é importante (cerca de 1,5 a 2 litros, salvo orientação médica diferente). Evite refrigerantes, sucos de caixinha e bebidas alcoólicas, que podem elevar a pressão.",
  doces_acucar: "Doces e açúcar: 🍫🍬\nConsuma com moderação. O excesso de açúcar favorece o ganho de peso, o que também eleva a pressão arterial. Prefira frutas para matar a vontade de doce.",
  cafe: "Sobre o café: ☕\nEm quantidade moderada (1 a 2 xícaras por dia), o café costuma ser seguro para a maioria das pessoas com hipertensão. Se notar que a pressão sobe depois de tomar café, converse com seu médico.",
  dieta_dash: "A dieta DASH é a mais recomendada para hipertensão! 🍽️\nEla é rica em frutas, verduras, grãos integrais, laticínios magros e proteínas magras, e pobre em sal, açúcar e gordura saturada. É simples: coma comida de verdade, colorida e temperada com ervas naturais no lugar do sal.",
  desconhecido: "Desculpe, não entendi muito bem. 🤔 Você pode perguntar sobre frutas, sal, carnes, leite, pães, industrializados, água, doces ou café. Digite 'ajuda' para ver todos os temas."
};

const PALAVRAS_CHAVE = {
  saudacao: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "eae", "e ai"],
  despedida: ["tchau", "ate logo", "adeus", "sair", "encerrar", "flw"],
  ajuda: ["ajuda", "menu", "opcoes", "o que voce sabe", "temas"],
  frutas_verduras: ["fruta", "verdura", "legume", "salada", "banana", "laranja", "folha"],
  sal_sodio: ["sal", "sodio", "tempero", "salgado", "caldo"],
  carnes_proteinas: ["carne", "frango", "peixe", "ovo", "proteina", "feijao", "linguica", "presunto"],
  leite_derivados: ["leite", "queijo", "iogurte", "laticinio", "derivado"],
  paes_cereais: ["pao", "cereal", "aveia", "arroz", "macarrao", "integral"],
  industrializados: ["industrializado", "processado", "enlatado", "instantaneo", "fast food", "salgadinho", "pronto"],
  agua_liquidos: ["agua", "liquido", "refrigerante", "suco", "beber", "bebida", "alcool"],
  doces_acucar: ["doce", "acucar", "chocolate", "bala", "sobremesa"],
  cafe: ["cafe", "cafeina"],
  dieta_dash: ["dash", "dieta", "regime", "dica geral", "resumo"]
};

const PERGUNTAS_RAPIDAS = [
  "Posso comer banana?",
  "Posso comer linguiça?",
  "Posso tomar café?",
  "Quais frutas posso comer?",
  "Posso comer sal?",
  "O que é a dieta DASH?"
];

function normalizar(texto) {
  return texto.toLowerCase().trim()
    .replace(/[áàãâ]/g, "a").replace(/[éê]/g, "e").replace(/í/g, "i")
    .replace(/[óõô]/g, "o").replace(/ú/g, "u").replace(/ç/g, "c");
}

function obterResposta(mensagem) {
  if (!mensagem || !mensagem.trim()) return RESPOSTAS.desconhecido;
  const texto = normalizar(mensagem);

  // 1º: procura um alimento específico ("posso comer banana?")
  for (const alimento of ALIMENTOS) {
    for (const nome of alimento.nomes) {
      if (new RegExp("\\b" + nome).test(texto)) return alimento.resposta;
    }
  }

  // 2º: procura um assunto geral (frutas, sal, carnes...)
  for (const categoria in PALAVRAS_CHAVE) {
    for (const palavra of PALAVRAS_CHAVE[categoria]) {
      const padrao = new RegExp("\\b" + normalizar(palavra));
      if (padrao.test(texto)) return RESPOSTAS[categoria];
    }
  }
  return RESPOSTAS.desconhecido;
}

// ---------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------
const mensagensDiv = document.getElementById("mensagens");
const campoMensagem = document.getElementById("campo-mensagem");
const perguntasDiv = document.getElementById("perguntas-rapidas");
const statusTopo = document.getElementById("status");

PERGUNTAS_RAPIDAS.forEach(pergunta => {
  const btn = document.createElement("button");
  btn.className = "pergunta-btn";
  btn.textContent = pergunta;
  btn.onclick = () => enviarMensagem(pergunta);
  perguntasDiv.appendChild(btn);
});

function horaAgora() {
  const agora = new Date();
  return String(agora.getHours()).padStart(2, "0") + ":" +
         String(agora.getMinutes()).padStart(2, "0");
}

function rolarParaBaixo() {
  mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
}

function adicionarMensagem(texto, autor) {
  const balao = document.createElement("div");
  balao.className = "msg " + (autor === "usuario" ? "usuario" : "bot");
  balao.textContent = texto;

  const hora = document.createElement("span");
  hora.className = "hora";
  hora.textContent = horaAgora();
  balao.appendChild(hora);

  mensagensDiv.appendChild(balao);
  rolarParaBaixo();
}

// Balão com as três bolinhas, enquanto o bot "digita"
function mostrarDigitando() {
  const balao = document.createElement("div");
  balao.className = "msg bot digitando";
  balao.id = "digitando";
  balao.innerHTML = "<span></span><span></span><span></span>";
  mensagensDiv.appendChild(balao);
  statusTopo.textContent = "digitando...";
  rolarParaBaixo();
}

function esconderDigitando() {
  const balao = document.getElementById("digitando");
  if (balao) balao.remove();
  statusTopo.textContent = "online";
}

function enviarMensagem(texto) {
  if (!texto.trim()) return;
  adicionarMensagem(texto, "usuario");
  campoMensagem.value = "";

  mostrarDigitando();
  setTimeout(() => {
    esconderDigitando();
    adicionarMensagem(obterResposta(texto), "bot");
  }, 700);
}

document.getElementById("form-chat").addEventListener("submit", (evento) => {
  evento.preventDefault();
  enviarMensagem(campoMensagem.value);
});

// Primeira mensagem do bot ao abrir a página
adicionarMensagem(
  "Olá! 😊 Eu sou o Nutri-Amigo. Posso te ajudar a saber quais alimentos são bons para quem tem pressão alta.\nPergunte, por exemplo, \"posso comer banana?\", ou toque em um dos botões abaixo.",
  "bot"
);
