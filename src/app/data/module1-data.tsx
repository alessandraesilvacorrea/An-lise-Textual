import { CardContent } from '../components/SwipeCard';

// Narrativo
export const narrativoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Texto Narrativo',
    content: (
      <div>
        <p className="mb-4">
          O tipo textual narrativo se caracteriza pela presença de um enredo em que podem aparecer acontecimentos reais ou ficcionais. Nesses textos, há a presença de narrador(es), personagens, tempo e espaço.
        </p>
        <p className="mb-4">
          <strong>Elementos principais:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Narrador:</strong> 1ª pessoa (vivencia) ou 3ª pessoa (relata)</li>
          <li><strong>Personagens:</strong> principais (protagonista/antagonista) ou secundários</li>
          <li><strong>Tempo:</strong> cronológico ou psicológico</li>
          <li><strong>Espaço:</strong> físico, social ou psicológico</li>
          <li><strong>Enredo:</strong> sequência de acontecimentos</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Textos Narrativos',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-semibold mb-2">Conto:</p>
          <p className="italic text-sm mb-4">
            "Era uma vez uma menina chamada Ana que adorava ler. Certa manhã, ao passar pela biblioteca da escola, encontrou um livro antigo esquecido em um banco. Curiosa, abriu-o e descobriu que se tratava de um diário misterioso..."
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          <strong>Gêneros narrativos:</strong>
        </p>
        <ul className="text-sm text-gray-600 list-disc pl-6 space-y-1">
          <li>Romance, novela, conto</li>
          <li>Biografia, autobiografia</li>
          <li>Fábula, apólogo, mito</li>
          <li>Crônica narrativa, diário</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Texto Narrativo',
    question: 'Qual das alternativas apresenta características do tipo textual narrativo?',
    options: [
      'A casa era grande, com janelas azuis e jardim florido.',
      'Pedro acordou, vestiu-se rapidamente e correu para a escola onde encontrou seus amigos.',
      'A educação é fundamental para o desenvolvimento da sociedade.',
      'Misture os ingredientes e leve ao forno por 30 minutos.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B é narrativa porque apresenta uma sequência de ações (acordou, vestiu-se, correu, encontrou) realizadas por um personagem (Pedro) em um determinado tempo e espaço.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Texto Narrativo',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Parabéns! Você completou este tópico!</strong>
        </p>
        <p className="mb-4">
          Textos narrativos CONTAM uma história com enredo, personagens, tempo e espaço. O narrador pode estar em 1ª pessoa (participa) ou 3ª pessoa (observa).
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold text-blue-900">💡 Lembre-se:</p>
          <p className="text-blue-800">
            Identifique: Quem? (personagens) | O quê? (enredo) | Quando? (tempo) | Onde? (espaço)
          </p>
        </div>
      </div>
    ),
  },
];

// Descritivo
export const descritivoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Texto Descritivo',
    content: (
      <div>
        <p className="mb-4">
          O tipo textual descritivo expõe as propriedades de seres, locais, paisagens, produtos, sensações, sentimentos etc. Busca apresentar características de forma detalhada.
        </p>
        <p className="mb-4">
          <strong>Recursos linguísticos:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Verbos de ligação (ser, estar, parecer, ficar)</li>
          <li>Adjetivos e locuções adjetivas</li>
          <li>Advérbios de modo</li>
          <li>Analogias e metáforas</li>
        </ul>
        <p className="mt-4">
          <strong>Tipos:</strong> Descrição objetiva (imparcial) ou subjetiva (com avaliações pessoais)
        </p>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplo de Texto Descritivo',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="italic text-sm mb-3">
            "A velha casa era imensa, com paredes de tijolos à vista cobertas por hera. Suas janelas altas e estreitas tinham vidros embaçados pelo tempo. O portão de ferro enferrujado rangia ao menor toque do vento."
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          <strong>Observe:</strong> Uso de adjetivos (velha, imensa, altas, estreitas, embaçados, enferrujado) que criam uma imagem mental detalhada.
        </p>
        <p className="text-sm text-gray-600">
          <strong>Gêneros descritivos:</strong> Anúncio de classificados, relatório, currículo.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Texto Descritivo',
    question: 'Qual alternativa apresenta características descritivas?',
    options: [
      'João saiu, caminhou pela rua e encontrou Maria.',
      'Você deve misturar farinha, ovos e açúcar.',
      'O gato era grande, peludo, com olhos verdes brilhantes e focinho rosado.',
      'A reciclagem é importante porque reduz o impacto ambiental.',
    ],
    correctAnswer: 2,
    content: 'A alternativa C é descritiva porque apresenta múltiplas características do gato (grande, peludo, olhos verdes brilhantes, focinho rosado), criando uma imagem detalhada.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Texto Descritivo',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Ótimo trabalho!</strong>
        </p>
        <p className="mb-4">
          Textos descritivos MOSTRAM como algo é, usando adjetivos, verbos de ligação e detalhes sensoriais para criar imagens mentais.
        </p>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-semibold text-purple-900">💡 Lembre-se:</p>
          <p className="text-purple-800">
            Descrição = características detalhadas. Procure adjetivos e verbos de estado!
          </p>
        </div>
      </div>
    ),
  },
];

// Dissertativo
export const dissertativoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Texto Dissertativo',
    content: (
      <div>
        <p className="mb-4">
          O tipo textual dissertativo apresenta o posicionamento do autor em defesa de um tema. Busca persuadir o leitor através de argumentos, justificativas, dados e conceitos.
        </p>
        <p className="mb-4">
          <strong>Estrutura clássica:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Introdução:</strong> contextualiza e apresenta a tese</li>
          <li><strong>Desenvolvimento:</strong> argumentos que comprovam a tese</li>
          <li><strong>Conclusão:</strong> retoma argumentos e reafirma a tese</li>
        </ul>
        <p className="mt-4 text-sm">
          <strong>Exemplos de gêneros:</strong> artigo de opinião, editorial, resenha crítica, dissertação argumentativa, monografia.
        </p>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplo de Texto Dissertativo',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="italic text-sm">
            <strong className="text-gray-900">Tese:</strong> "A leitura é fundamental para o desenvolvimento humano."
          </p>
          <p className="italic text-sm mt-2">
            <strong className="text-gray-900">Argumentos:</strong> Primeiro, porque amplia o vocabulário e melhora a expressão. Além disso, estimula o pensamento crítico e a criatividade.
          </p>
          <p className="italic text-sm mt-2">
            <strong className="text-gray-900">Conclusão:</strong> Portanto, é essencial incentivar o hábito da leitura desde a infância.
          </p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Presença de tese + argumentos + conclusão, com operadores argumentativos (primeiro, além disso, portanto).
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Texto Dissertativo',
    question: 'Qual alternativa apresenta um texto dissertativo?',
    options: [
      'Maria acordou, tomou café e foi trabalhar.',
      'O prédio era alto, moderno, com fachada de vidro.',
      'O exercício físico é essencial porque previne doenças e melhora a qualidade de vida.',
      'Adicione açúcar, misture bem e sirva gelado.',
    ],
    correctAnswer: 2,
    content: 'A alternativa C é dissertativa porque apresenta uma tese (exercício é essencial) e argumentos que a sustentam (previne doenças, melhora qualidade de vida).',
  },
  {
    type: 'feedback',
    title: 'Resumo - Texto Dissertativo',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente!</strong>
        </p>
        <p className="mb-4">
          Textos dissertativos DEFENDEM uma tese usando argumentos lógicos. Estrutura: introdução (tese) + desenvolvimento (argumentos) + conclusão.
        </p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-semibold text-green-900">💡 Lembre-se:</p>
          <p className="text-green-800">
            Identifique a tese (ideia defendida) e os argumentos (justificativas).
          </p>
        </div>
      </div>
    ),
  },
];

// Expositivo
export const expositivoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Texto Expositivo',
    content: (
      <div>
        <p className="mb-4">
          O tipo textual expositivo busca apresentar, expor e explicar um tema de forma clara e objetiva, sem juízos de valor. É caracterizado como informativo-expositivo.
        </p>
        <p className="mb-4">
          <strong>Recursos utilizados:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Descrição</li>
          <li>Conceituação e definição</li>
          <li>Enumeração</li>
          <li>Comparação</li>
        </ul>
        <p className="mt-4 text-sm">
          <strong>Exemplos:</strong> verbete de dicionário/enciclopédia, resumo expositivo, seminário, entrevista.
        </p>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplo de Texto Expositivo',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="italic text-sm">
            "A fotossíntese é o processo pelo qual as plantas transformam luz solar em energia química. Durante esse processo, a planta absorve dióxido de carbono do ar e água do solo. Na presença de luz solar e clorofila, esses elementos são convertidos em glicose e oxigênio."
          </p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Linguagem objetiva e impessoal, apresentando informações científicas sem opiniões ou argumentações.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Texto Expositivo',
    question: 'Qual alternativa apresenta um texto expositivo?',
    options: [
      'Eu acredito que a ciência é fundamental para o progresso.',
      'Lave as mãos com água e sabão por 20 segundos.',
      'A água é composta por dois átomos de hidrogênio e um de oxigênio (H₂O).',
      'Pedro estava nervoso enquanto aguardava o resultado.',
    ],
    correctAnswer: 2,
    content: 'A alternativa C é expositiva porque apresenta uma informação científica objetiva, sem opiniões ou julgamentos, apenas expondo um fato.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Texto Expositivo',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Muito bem!</strong>
        </p>
        <p className="mb-4">
          Textos expositivos INFORMAM e EXPLICAM de forma objetiva, sem opiniões ou argumentações. Foco em apresentar conhecimento.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold text-blue-900">💡 Lembre-se:</p>
          <p className="text-blue-800">
            Expositivo = informação pura. Sem "eu acho" ou "você deve"!
          </p>
        </div>
      </div>
    ),
  },
];

// Injuntivo
export const injuntivoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Texto Injuntivo (Instrucional)',
    content: (
      <div>
        <p className="mb-4">
          O tipo textual injuntivo expressa ordens, instruções ou pedidos, com objetivo de que alguma ação seja tomada pelo leitor.
        </p>
        <p className="mb-4">
          <strong>Características principais:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Uso de verbos no imperativo</li>
          <li>Linguagem clara e objetiva</li>
          <li>Sequência de passos ou instruções</li>
          <li>Orientação para ação</li>
        </ul>
        <p className="mt-4 text-sm">
          <strong>Exemplos:</strong> receita culinária, bula de remédio, manual de instruções, regulamento, anúncio publicitário.
        </p>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplo de Texto Injuntivo',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-semibold text-sm mb-2">Receita de Chá:</p>
          <ol className="list-decimal pl-6 space-y-1 italic text-sm">
            <li>Ferva a água em uma chaleira.</li>
            <li>Coloque o sachê de chá na xícara.</li>
            <li>Despeje a água quente sobre o sachê.</li>
            <li>Aguarde 3 minutos.</li>
            <li>Retire o sachê e adoce a gosto.</li>
          </ol>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Verbos no imperativo (ferva, coloque, despeje, aguarde, retire) orientando ações em sequência.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Texto Injuntivo',
    question: 'Qual alternativa apresenta um texto injuntivo?',
    options: [
      'A tecnologia transformou a forma como nos comunicamos.',
      'O aplicativo possui interface intuitiva e design moderno.',
      'Clique no botão "Entrar", digite sua senha e confirme.',
      'João instalou o aplicativo e começou a usá-lo.',
    ],
    correctAnswer: 2,
    content: 'A alternativa C é injuntiva porque usa verbos no imperativo (clique, digite, confirme) para instruir o leitor sobre ações que deve realizar.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Texto Injuntivo',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Parabéns!</strong>
        </p>
        <p className="mb-4">
          Textos injuntivos INSTRUEM e ORIENTAM usando verbos no imperativo. Objetivo: fazer o leitor executar ações.
        </p>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="font-semibold text-orange-900">💡 Lembre-se:</p>
          <p className="text-orange-800">
            Procure por comandos: "faça", "coloque", "clique", "misture"!
          </p>
        </div>
      </div>
    ),
  },
];
