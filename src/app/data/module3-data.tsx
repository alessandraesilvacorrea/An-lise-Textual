import { CardContent } from '../components/SwipeCard';

// Ideia Central
export const ideiaCentralCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Identificando a Ideia Central',
    content: (
      <div>
        <p className="mb-4">
          A ideia central (ou ideia principal) é a mensagem mais importante que o autor quer transmitir no texto.
        </p>
        <p className="mb-4">
          <strong>Como identificar:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Leia o texto completo com atenção</li>
          <li>Identifique o tema geral</li>
          <li>Pergunte: "Sobre o que o autor está falando?"</li>
          <li>Procure a informação que se repete ou é destacada</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplo Prático',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="italic mb-3">
            "A leitura é uma das atividades mais enriquecedoras para o ser humano. Através dos livros, podemos viajar para outros mundos, conhecer diferentes culturas e épocas. Além disso, a leitura amplia nosso vocabulário e melhora nossa capacidade de expressão. Por isso, é fundamental cultivar o hábito de ler desde cedo."
          </p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Ideia central:</strong> A importância da leitura para o desenvolvimento humano.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Exercício',
    question: 'Leia: "O aquecimento global é causado principalmente pela emissão de gases poluentes. Esses gases criam uma camada na atmosfera que retém calor. Como consequência, as temperaturas aumentam, causando problemas ambientais graves." Qual é a ideia central?',
    options: [
      'Os gases poluentes são prejudiciais.',
      'As causas e consequências do aquecimento global.',
      'As temperaturas estão aumentando.',
      'Os problemas ambientais são graves.',
    ],
    correctAnswer: 1,
    content: 'A ideia central é "as causas e consequências do aquecimento global", pois o texto aborda tanto a origem (gases) quanto os efeitos (aumento de temperatura e problemas ambientais).',
  },
  {
    type: 'feedback',
    title: 'Resumo - Ideia Central',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Muito bem!</strong>
        </p>
        <p className="mb-4">
          Sempre procure a mensagem PRINCIPAL que o autor quer transmitir.
        </p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-semibold text-green-900">💡 Dica:</p>
          <p className="text-green-800">
            A ideia central geralmente aparece no início ou no final do texto!
          </p>
        </div>
      </div>
    ),
  },
];

// Inferência
export const inferenciaCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Inferência?',
    content: (
      <div>
        <p className="mb-4">
          Inferência é a capacidade de compreender informações que não estão explícitas no texto, mas que podem ser deduzidas através de pistas e conhecimentos prévios.
        </p>
        <p className="mb-4">
          <strong>Como fazer inferências:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Leia nas entrelinhas</li>
          <li>Use seu conhecimento de mundo</li>
          <li>Relacione as informações do texto</li>
          <li>Tire conclusões lógicas</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplo de Inferência',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="italic mb-3">
            "Maria pegou o guarda-chuva ao sair de casa. As ruas estavam molhadas e havia poças por todos os lados."
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Inferências possíveis:</strong>
        </p>
        <ul className="text-sm text-gray-600 list-disc pl-6">
          <li>Estava chovendo ou havia chovido recentemente</li>
          <li>Maria previu que poderia chover</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Exercício de Inferência',
    question: 'Leia: "João olhou para o relógio e começou a correr. O portão da escola já estava quase fechando." O que podemos inferir?',
    options: [
      'João está atrasado para a aula.',
      'João gosta de correr.',
      'A escola é longe.',
      'O relógio está quebrado.',
    ],
    correctAnswer: 0,
    content: 'Podemos inferir que João está atrasado, pois ele corre ao ver as horas e o portão está fechando - sinais de que ele precisa chegar rápido à escola.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Inferência',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente raciocínio!</strong>
        </p>
        <p className="mb-4">
          Inferir é LER NAS ENTRELINHAS, descobrindo o que não está escrito diretamente.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold text-blue-900">💡 Dica:</p>
          <p className="text-blue-800">
            Use as pistas do texto + seu conhecimento = inferência correta!
          </p>
        </div>
      </div>
    ),
  },
];

// Argumentação
export const argumentacaoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Entendendo Argumentação',
    content: (
      <div>
        <p className="mb-4">
          Argumentação é o conjunto de raciocínios usados para defender uma ideia ou ponto de vista.
        </p>
        <p className="mb-4">
          <strong>Tipos de argumentos:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>De autoridade:</strong> citação de especialistas</li>
          <li><strong>Por exemplificação:</strong> casos concretos</li>
          <li><strong>Por dados:</strong> estatísticas e pesquisas</li>
          <li><strong>Por causa e consequência:</strong> relações lógicas</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplo de Argumentação',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="italic mb-3">
            <strong>Tese:</strong> "O exercício físico é essencial para a saúde."
          </p>
          <p className="italic mb-2">
            <strong>Argumentos:</strong>
          </p>
          <ul className="italic list-disc pl-6 space-y-1">
            <li>Segundo a OMS, reduz riscos de doenças (autoridade)</li>
            <li>Pessoas ativas vivem mais (dados)</li>
            <li>Previne obesidade e diabetes (causa/consequência)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Argumentos',
    question: 'Qual é um argumento forte para defender que "a reciclagem é importante"?',
    options: [
      'Eu acho a reciclagem legal.',
      'Meus amigos reciclam.',
      'A reciclagem reduz 30% do lixo nos aterros, segundo estudos.',
      'Reciclagem é uma palavra bonita.',
    ],
    correctAnswer: 2,
    content: 'A alternativa C apresenta um argumento por dados (estatística), que é objetivo e convincente, diferente de opiniões pessoais.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Argumentação',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Ótimo trabalho!</strong>
        </p>
        <p className="mb-4">
          Bons argumentos são BASEADOS EM FATOS, não apenas em opiniões.
        </p>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-semibold text-purple-900">💡 Dica:</p>
          <p className="text-purple-800">
            Procure por dados, exemplos concretos e citações de especialistas!
          </p>
        </div>
      </div>
    ),
  },
];

// Contexto
export const contextoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'A Importância do Contexto',
    content: (
      <div>
        <p className="mb-4">
          O contexto é o conjunto de circunstâncias em que o texto foi produzido ou em que uma palavra/frase está inserida.
        </p>
        <p className="mb-4">
          <strong>Tipos de contexto:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Histórico:</strong> época e circunstâncias</li>
          <li><strong>Linguístico:</strong> palavras ao redor</li>
          <li><strong>Situacional:</strong> situação comunicativa</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplo de Contexto',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="italic mb-3">
            A palavra "manga" pode ter significados diferentes:
          </p>
          <p className="italic mb-2">
            1. "Cortei a <strong>manga</strong> da camisa." (parte da roupa)
          </p>
          <p className="italic">
            2. "Comi uma <strong>manga</strong> deliciosa." (fruta)
          </p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> O contexto das frases determina o significado correto da palavra.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Interpretando pelo Contexto',
    question: 'Em "O banco da praça estava ocupado", a palavra "banco" significa:',
    options: [
      'Instituição financeira',
      'Assento para sentar',
      'Grupo de peixes',
      'Base de dados',
    ],
    correctAnswer: 1,
    content: 'Pelo contexto ("da praça" e "estava ocupado"), entendemos que "banco" refere-se a um assento, não a uma instituição financeira.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Contexto',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Perfeito!</strong>
        </p>
        <p className="mb-4">
          O CONTEXTO determina o significado correto das palavras e frases.
        </p>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="font-semibold text-orange-900">💡 Dica:</p>
          <p className="text-orange-800">
            Sempre leia o que vem antes e depois para entender melhor!
          </p>
        </div>
      </div>
    ),
  },
];

// Intenção do Autor
export const intencaoAutorCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Identificando a Intenção do Autor',
    content: (
      <div>
        <p className="mb-4">
          A intenção do autor é o objetivo que ele tem ao escrever o texto: informar, convencer, entreter, criticar, etc.
        </p>
        <p className="mb-4">
          <strong>Principais intenções:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Informar:</strong> transmitir conhecimento</li>
          <li><strong>Persuadir:</strong> convencer o leitor</li>
          <li><strong>Entreter:</strong> divertir, emocionar</li>
          <li><strong>Criticar:</strong> apontar problemas</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Intenções',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div>
            <p className="font-semibold mb-1">Informar:</p>
            <p className="italic text-sm">"A água ferve a 100°C ao nível do mar."</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Persuadir:</p>
            <p className="italic text-sm">"Vote em mim para uma cidade melhor!"</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Entreter:</p>
            <p className="italic text-sm">"Era uma vez, em um reino distante..."</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando a Intenção',
    question: 'Qual é a intenção do autor em: "Não jogue lixo nas ruas! Mantenha nossa cidade limpa para todos."?',
    options: [
      'Informar sobre limpeza urbana',
      'Entreter o leitor',
      'Persuadir a ter boas práticas',
      'Descrever a cidade',
    ],
    correctAnswer: 2,
    content: 'A intenção é persuadir, pois o autor usa imperativo ("não jogue", "mantenha") para convencer o leitor a mudar seu comportamento.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Intenção do Autor',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente análise!</strong>
        </p>
        <p className="mb-4">
          Sempre pergunte: "POR QUE o autor escreveu isso? O que ele quer?"
        </p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-semibold text-green-900">💡 Dica:</p>
          <p className="text-green-800">
            Observe o tom do texto e as palavras escolhidas pelo autor!
          </p>
        </div>
      </div>
    ),
  },
];
