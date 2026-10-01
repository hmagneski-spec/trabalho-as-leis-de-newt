export interface Law {
  id: number;
  name: string;
  title: string;
  statement: string;
  formula: string;
  formulaMeaning: string;
  image: string;
  imageAlt: string;
  examples: { title: string; description: string; icon: string }[];
  color: string;
  accent: string;
}

export const laws: Law[] = [
  {
    id: 1,
    name: "Primeira Lei",
    title: "Lei da Inércia",
    statement:
      "Todo corpo permanece em seu estado de repouso ou de movimento retilíneo uniforme, a menos que seja forçado a mudar esse estado por forças aplicadas sobre ele.",
    formula: "ΣF = 0  →  v = constante",
    formulaMeaning: "Se a soma das forças é zero, a velocidade não muda.",
    image: "https://images.pexels.com/photos/11479921/pexels-photo-11479921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Astronauta flutuando em gravidade zero",
    color: "from-sky-500 to-cyan-400",
    accent: "sky",
    examples: [
      {
        title: "Astronauta no espaço",
        description:
          "No espaço, sem resistência do ar ou atrito significativo, um objeto lançado continua se movendo na mesma direção e velocidade indefinidamente.",
        icon: "Rocket",
      },
      {
        title: "Passageiro no ônibus",
        description:
          "Quando o ônibus freia bruscamente, seu corpo tende a continuar em movimento — é a inércia empurrando você para a frente.",
        icon: "Bus",
      },
      {
        title: "Livro sobre a mesa",
        description:
          "Um livro em repouso sobre a mesa permanece parado. A gravidade puxa para baixo, a mesa empurra para cima, e as forças se equilibram.",
        icon: "BookOpen",
      },
    ],
  },
  {
    id: 2,
    name: "Segunda Lei",
    title: "Lei da Aceleração",
    statement:
      "A aceleração de um corpo é diretamente proporcional à força resultante que atua sobre ele, e inversamente proporcional à sua massa. A direção da aceleração coincide com a da força resultante.",
    formula: "F = m · a",
    formulaMeaning: "Força igual à massa vezes aceleração.",
    image: "https://images.pexels.com/photos/23795/rocket-launch-space-discovery.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Foguete decolando com chamas e fumaça",
    color: "from-orange-500 to-amber-400",
    accent: "orange",
    examples: [
      {
        title: "Lançamento de foguete",
        description:
          "Os motores geram uma enorme força (F) que impulsiona a massa (m) do foguete, produzindo uma aceleração (a) que o leva ao espaço.",
        icon: "Rocket",
      },
      {
        title: "Empurrando um carrinho",
        description:
          "Um carrinho vazio acelera mais rápido que um carregado com a mesma força. Mais massa significa menos aceleração.",
        icon: "ShoppingCart",
      },
      {
        title: "Bola sendo chutada",
        description:
          "Quanto maior a força do chute, maior a aceleração da bola. Uma bola leve acelera mais que uma pesada com o mesmo chute.",
        icon: "CircleDot",
      },
    ],
  },
  {
    id: 3,
    name: "Terceira Lei",
    title: "Lei de Ação e Reação",
    statement:
      "A toda ação corresponde uma reação de mesma intensidade, mesma direção e sentido oposto. As forças atuam sempre em pares sobre corpos diferentes.",
    formula: "F₁₂ = −F₂₁",
    formulaMeaning: "A força de A sobre B é igual e oposta à força de B sobre A.",
    image: "https://images.pexels.com/photos/30664881/pexels-photo-30664881.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Bolas de bilhar coloridas sob luz verde",
    color: "from-emerald-500 to-teal-400",
    accent: "emerald",
    examples: [
      {
        title: "Bolas de bilhar",
        description:
          "Quando a bola branca atinge outra, ambas recebem forças de mesma intensidade em direções opostas — uma para frente, outra para trás.",
        icon: "CircleDot",
      },
      {
        title: "Nadadora na piscina",
        description:
          "A nadadora empurra a água para trás com os pés; a água empurra a nadadora para a frente. É assim que o movimento acontece.",
        icon: "Waves",
      },
      {
        title: "Pássaro voando",
        description:
          "As asas empurram o ar para baixo e o ar empurra o pássaro para cima. Sem esse par de forças, não haveria voo.",
        icon: "Bird",
      },
    ],
  },
];

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Um livro está parado sobre uma mesa. Qual é a força resultante sobre ele?",
    options: ["Igual ao peso do livro, para baixo", "Zero, pois as forças se equilibram", "Igual à força da mesa, para cima", "Indefinida sem saber a massa"],
    correctIndex: 1,
    explanation: "Pela Primeira Lei, um corpo em repouso permanece em repouso quando a força resultante é zero. A gravidade e a normal da mesa se cancelam.",
  },
  {
    question: "Se você aplicar a mesma força em duas bolas, uma leve e uma pesada, qual acelera mais?",
    options: ["A pesada, pois tem mais inércia", "A leve, pois F = m·a", "Ambas igualmente", "Depende do material"],
    correctIndex: 1,
    explanation: "Pela Segunda Lei (F = m·a), com a mesma força, menor massa significa maior aceleração. A bola leve acelera mais.",
  },
  {
    question: "Quando você caminha, o que permite que você avance?",
    options: ["Seus músculos puxam o corpo", "O chão empurra seus pés para frente", "A gravidade puxa você", "O ar empurra suas costas"],
    correctIndex: 1,
    explanation: "Pela Terceira Lei, seus pés empurram o chão para trás e o chão reage empurrando seus pés (e você) para frente. Sem o par ação-reação, não há movimento.",
  },
  {
    question: "No espaço, um astronauta empurra uma ferramenta solta. O que acontece com a ferramenta?",
    options: ["Para logo por falta de gravidade", "Continua se movendo em linha reta", "Volta para o astronauta", "Acelera cada vez mais"],
    correctIndex: 1,
    explanation: "Sem forças significativas de atrito ou resistência, a Primeira Lei garante que a ferramenta continue em movimento retilíneo uniforme.",
  },
  {
    question: "Um foguete sobe porque os gases são expelidos para baixo. Qual lei melhor explica isso?",
    options: ["Primeira Lei", "Segunda Lei", "Terceira Lei", "Lei da gravidade"],
    correctIndex: 2,
    explanation: "O foguete expulsa gases para baixo (ação) e os gases empurram o foguete para cima (reação). É a Terceira Lei de Newton em ação.",
  },
  {
    question: "Um carro a 100 km/h freia bruscamente e para. Por que os passageiros são jogados para a frente?",
    options: ["A força de frenagem os empurra", "A inércia mantém seu movimento", "O cinto de segurança os puxa", "A gravidade aumenta ao frear"],
    correctIndex: 1,
    explanation: "Pela Primeira Lei (Inércia), os passageiros tendem a continuar em movimento retilíneo uniforme. O carro para, mas seus corpos querem continuar na mesma velocidade.",
  },
  {
    question: "Uma força de 20 N atua sobre um corpo de 4 kg. Qual é a aceleração produzida?",
    options: ["80 m/s²", "5 m/s²", "16 m/s²", "0,2 m/s²"],
    correctIndex: 1,
    explanation: "Pela Segunda Lei, a = F/m = 20/4 = 5 m/s². A acelação é diretamente proporcional à força e inversamente proporcional à massa.",
  },
  {
    question: "Uma pessoa empurra uma parede com 50 N de força. Qual é a força que a parede exerce sobre a pessoa?",
    options: ["Zero, a parede não se move", "50 N na mesma direção", "50 N na direção oposta", "Depende da massa da parede"],
    correctIndex: 2,
    explanation: "Pela Terceira Lei, a parede exerce uma força de reação de mesma intensidade (50 N) e direção oposta. O fato de a parede não se mover deve-se à sua enorme massa e à fixação ao solo.",
  },
  {
    question: "Por que é mais difícil empurrar um caminhão parado do que uma bicicleta parada?",
    options: ["O caminhão tem mais atrito com o ar", "O caminhão tem mais massa (maior inércia)", "A bicicleta tem rodas melhores", "A gravidade afeta menos a bicicleta"],
    correctIndex: 1,
    explanation: "A inércia é proporcional à massa. Pela Primeira Lei, quanto maior a massa, maior a resistência à mudança de estado de movimento. Por isso é mais difícil colocar um caminhão em movimento.",
  },
  {
    question: "Dois patinadores se empurram simultaneamente. Um pesa 80 kg e o outro 40 kg. O que acontece?",
    options: ["O mais pesado se afasta mais rápido", "O mais leve se afasta mais rápido", "Ambos se afastam na mesma velocidade", "Nenhum se move"],
    correctIndex: 1,
    explanation: "Pela Terceira Lei, as forças são iguais e opostas. Mas pela Segunda Lei (a = F/m), o patinador com metade da massa sofre o dobro da aceleração, afastando-se mais rápido.",
  },
];
