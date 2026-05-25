import { CardContent } from '../components/SwipeCard';

// Metáfora
export const metaforaCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Metáfora?',
    content: (
      <div>
        <p className="mb-4">
          A metáfora é uma figura de linguagem que compara dois elementos diferentes sem usar conectivos de comparação (como, tal qual, etc.).
        </p>
        <p className="mb-4">
          <strong>Características:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Comparação implícita</li>
          <li>Transferência de significado</li>
          <li>Linguagem figurada</li>
          <li>Expressividade e criatividade</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Metáfora',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Minha vida é um livro aberto."</p>
          <p className="italic">"Aquele homem é um leão."</p>
          <p className="italic">"Seus olhos são duas estrelas brilhantes."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Em cada exemplo, há uma comparação implícita (vida = livro, homem = leão, olhos = estrelas).
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Metáfora',
    question: 'Qual alternativa apresenta uma metáfora?',
    options: [
      'Ela é linda como uma flor.',
      'Ela é uma flor.',
      'Ela gosta de flores.',
      'Ela comprou flores.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta uma metáfora, comparando "ela" a uma "flor" de forma implícita, sem usar conectivos de comparação.',
  },
  {
    type: 'exercicio',
    title: 'Exercício Extra - Metáfora vs Comparação',
    question: 'Qual das frases abaixo é uma metáfora (não uma comparação)?',
    options: [
      'João é forte como um touro.',
      'João é um touro na luta.',
      'João luta como um touro.',
      'João parece um touro.',
    ],
    correctAnswer: 1,
    content: 'Correto! "João é um touro na luta" é uma metáfora porque compara implicitamente a força de João à de um touro, sem usar "como".',
  },
  {
    type: 'feedback',
    title: 'Resumo - Metáfora',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente!</strong>
        </p>
        <p className="mb-4">
          A metáfora COMPARA sem usar "como", criando imagens poéticas e expressivas.
        </p>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-semibold text-purple-900">💡 Dica:</p>
          <p className="text-purple-800">
            Metáfora = comparação escondida. Não usa "como", mas o sentido está lá!
          </p>
        </div>
      </div>
    ),
  },
];

// Metonímia
export const metonimiaCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Metonímia?',
    content: (
      <div>
        <p className="mb-4">
          A metonímia é uma figura de linguagem que substitui uma palavra por outra que tenha relação de proximidade ou associação de sentido.
        </p>
        <p className="mb-4">
          <strong>Tipos principais:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Parte pelo todo:</strong> "Faltam braços na colheita" (pessoas)</li>
          <li><strong>Autor pela obra:</strong> "Li Machado de Assis" (livros do autor)</li>
          <li><strong>Continente pelo conteúdo:</strong> "Bebi dois copos" (de água)</li>
          <li><strong>Marca pelo produto:</strong> "Comprei um Danone" (iogurte)</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Metonímia',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Ganhei o meu pão trabalhando." <span className="text-sm text-gray-600">(pão = sustento)</span></p>
          <p className="italic">"O Brasil ganhou a Copa." <span className="text-sm text-gray-600">(país = seleção)</span></p>
          <p className="italic">"Preciso de uma mão aqui." <span className="text-sm text-gray-600">(mão = ajuda)</span></p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Em cada caso, uma palavra substitui outra com sentido relacionado.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Metonímia',
    question: 'Em qual alternativa há metonímia?',
    options: [
      'A sala estava cheia de pessoas.',
      'Li Clarice Lispector ontem.',
      'Comprei um livro novo.',
      'A autora escreveu muitos textos.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta metonímia (autor pela obra): "Clarice Lispector" substitui "livros de Clarice Lispector".',
  },
  {
    type: 'feedback',
    title: 'Resumo - Metonímia',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Muito bem!</strong>
        </p>
        <p className="mb-4">
          A metonímia SUBSTITUI uma palavra por outra relacionada (parte/todo, autor/obra, etc.).
        </p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-semibold text-green-900">💡 Dica:</p>
          <p className="text-green-800">
            Procure por substituições onde há uma relação lógica entre as palavras.
          </p>
        </div>
      </div>
    ),
  },
];

// Hipérbole
export const hiperboleCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Hipérbole?',
    content: (
      <div>
        <p className="mb-4">
          A hipérbole é uma figura de linguagem que consiste no exagero intencional de uma ideia para criar impacto ou ênfase.
        </p>
        <p className="mb-4">
          <strong>Características:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Exagero proposital</li>
          <li>Intensificação da mensagem</li>
          <li>Efeito dramático ou cômico</li>
          <li>Comum na linguagem cotidiana</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Hipérbole',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Estou morrendo de fome!"</p>
          <p className="italic">"Já te disse isso um milhão de vezes!"</p>
          <p className="italic">"Chorei rios de lágrimas."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Em todos os casos, há um exagero intencional para dar ênfase à mensagem.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Hipérbole',
    question: 'Qual alternativa apresenta hipérbole?',
    options: [
      'Estou com um pouco de fome.',
      'Não comi ainda hoje.',
      'Estou morrendo de fome!',
      'Preciso almoçar logo.',
    ],
    correctAnswer: 2,
    content: 'A alternativa C apresenta hipérbole: "morrendo de fome" é um exagero intencional para expressar muita fome.',
  },
  {
    type: 'exercicio',
    title: 'Exercício Extra - Hipérbole no Cotidiano',
    question: 'Qual dessas frases do dia a dia contém uma hipérbole?',
    options: [
      'Preciso beber água.',
      'Estou com sede.',
      'Estou morrendo de sede!',
      'Quero beber alguma coisa.',
    ],
    correctAnswer: 2,
    content: 'Correto! "Estou morrendo de sede" é uma hipérbole comum no português brasileiro para expressar muita sede.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Hipérbole',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Ótimo trabalho!</strong>
        </p>
        <p className="mb-4">
          A hipérbole EXAGERA para dar ênfase e criar impacto.
        </p>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="font-semibold text-orange-900">💡 Dica:</p>
          <p className="text-orange-800">
            Procure por expressões exageradas que intensificam a mensagem.
          </p>
        </div>
      </div>
    ),
  },
];

// Personificação
export const personificacaoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Personificação?',
    content: (
      <div>
        <p className="mb-4">
          A personificação (ou prosopopeia) é uma figura de linguagem que atribui características humanas a seres inanimados ou irracionais.
        </p>
        <p className="mb-4">
          <strong>Características:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Humanização de objetos ou animais</li>
          <li>Atribuição de sentimentos e ações humanas</li>
          <li>Muito usada em fábulas e poesias</li>
          <li>Torna o texto mais expressivo</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Personificação',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"O vento sussurrava segredos."</p>
          <p className="italic">"As flores dançavam ao vento."</p>
          <p className="italic">"O sol sorria no céu azul."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Vento, flores e sol recebem ações humanas (sussurrar, dançar, sorrir).
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Personificação',
    question: 'Qual alternativa apresenta personificação?',
    options: [
      'A lua estava brilhante.',
      'A lua iluminava a noite.',
      'A lua observava a cidade silenciosamente.',
      'A lua é um satélite natural.',
    ],
    correctAnswer: 2,
    content: 'A alternativa C apresenta personificação: a lua "observava", ação humana atribuída a um objeto celeste.',
  },
  {
    type: 'exercicio',
    title: 'Exercício Extra - Personificação em Poemas',
    question: 'Na frase "O vento sussurrava segredos", qual elemento recebe características humanas?',
    options: [
      'Os segredos',
      'A noite',
      'O vento',
      'As árvores',
    ],
    correctAnswer: 2,
    content: 'Correto! O vento "sussurrava", que é uma ação tipicamente humana, criando uma personificação poética.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Personificação',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Perfeito!</strong>
        </p>
        <p className="mb-4">
          A personificação DÁ VIDA a objetos e seres não humanos.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold text-blue-900">💡 Dica:</p>
          <p className="text-blue-800">
            Procure por objetos ou animais fazendo coisas que só humanos fazem!
          </p>
        </div>
      </div>
    ),
  },
];

// Comparação
export const comparacaoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Comparação?',
    content: (
      <div>
        <p className="mb-4">
          A comparação é uma figura de linguagem que estabelece uma relação de semelhança entre dois elementos usando conectivos comparativos.
        </p>
        <p className="mb-4">
          <strong>Conectivos usados:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>como</li>
          <li>tal qual</li>
          <li>assim como</li>
          <li>que nem</li>
          <li>feito</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          <strong>Diferença:</strong> Metáfora = comparação implícita; Comparação = comparação explícita
        </p>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Comparação',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Ela é linda <strong>como</strong> uma rosa."</p>
          <p className="italic">"Forte <strong>que nem</strong> um touro."</p>
          <p className="italic">"Rápido <strong>tal qual</strong> um raio."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Todas usam conectivos de comparação explicitamente.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Comparação',
    question: 'Qual alternativa apresenta uma comparação?',
    options: [
      'Pedro é um gênio.',
      'Pedro é inteligente como Einstein.',
      'Pedro estuda muito.',
      'Pedro passou no vestibular.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta comparação explícita usando o conectivo "como" entre Pedro e Einstein.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Comparação',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Parabéns!</strong>
        </p>
        <p className="mb-4">
          A comparação COMPARA usando conectivos como "como", "tal qual", "que nem".
        </p>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-semibold text-purple-900">💡 Dica:</p>
          <p className="text-purple-800">
            Se tem "como" ou "tal qual", é comparação, não metáfora!
          </p>
        </div>
      </div>
    ),
  },
];

// Catacrese
export const catacreseCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Catacrese?',
    content: (
      <div>
        <p className="mb-4">
          A catacrese é uma figura de linguagem que consiste no emprego impróprio de uma expressão, geralmente por desconhecer sua origem ou significado correto.
        </p>
        <p className="mb-4">
          <strong>Características:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Uso incorreto de expressões idiomáticas</li>
          <li>Desconhecimento da origem da palavra</li>
          <li>Pode gerar ambiguidade ou comicidade</li>
          <li>Comum na linguagem cotidiana</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Catacrese',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Você pode me dar uma mesada de 15 em 15 dias?" <span className="text-sm text-gray-600">(mesada é mensal)</span></p>
          <p className="italic">"Ele é um lobo solitário." <span className="text-sm text-gray-600">(lobos não são solitários)</span></p>
          <p className="italic">"A verdade nua e crua." <span className="text-sm text-gray-600">(verdade não usa roupa)</span></p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Em cada caso, há um emprego impróprio da expressão.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Catacrese',
    question: 'Qual alternativa apresenta catacrese?',
    options: [
      'Subi para cima da árvore.',
      'Você pode me dar uma mesada semanal?',
      'Ela é uma pessoa muito trabalhadora.',
      'Ele dorme como um bebê.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta catacrese: "mesada semanal" é incorreto, pois mesada é um valor dado mensalmente.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Catacrese',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Bom trabalho!</strong>
        </p>
        <p className="mb-4">
          A catacrese é o USO IMPRÓPRIO de expressões idiomáticas.
        </p>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="font-semibold text-yellow-900">💡 Dica:</p>
          <p className="text-yellow-800">
            Procure por expressões que parecem erradas ou usadas de forma inadequada.
          </p>
        </div>
      </div>
    ),
  },
];

// Perífrase ou Antonomásia
export const perifrasedCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Perífrase?',
    content: (
      <div>
        <p className="mb-4">
          A perífrase (ou antonomásia) é uma figura de linguagem que substitui uma palavra ou expressão por outra que a caracterize ou descreva.
        </p>
        <p className="mb-4">
          <strong>Tipos:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Perífrase:</strong> Substituição por descrição (coisas/animais)</li>
          <li><strong>Antonomásia:</strong> Substituição por nome próprio (pessoas)</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Perífrase',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"A cidade-luz" <span className="text-sm text-gray-600">(Paris)</span></p>
          <p className="italic">"O rei da selva" <span className="text-sm text-gray-600">(leão)</span></p>
          <p className="italic">"A rainha do soul" <span className="text-sm text-gray-600">(Aretha Franklin)</span></p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Cada expressão substitui o nome direto por uma descrição.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Perífrase',
    question: 'Qual alternativa apresenta perífrase?',
    options: [
      'Paris é uma cidade bonita.',
      'A cidade-luz é romântica.',
      'Viajei para a França.',
      'A capital francesa é linda.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta perífrase: "cidade-luz" substitui "Paris" por uma característica da cidade.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Perífrase',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente!</strong>
        </p>
        <p className="mb-4">
          A perífrase SUBSTITUI por uma descrição ou característica.
        </p>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="font-semibold text-indigo-900">💡 Dica:</p>
          <p className="text-indigo-800">
            Procure por expressões descritivas que substituem nomes diretos.
          </p>
        </div>
      </div>
    ),
  },
];

// Sinestesia
export const sinestesiaCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Sinestesia?',
    content: (
      <div>
        <p className="mb-4">
          A sinestesia é uma figura de linguagem que combina dois ou mais sentidos humanos em uma mesma expressão.
        </p>
        <p className="mb-4">
          <strong>Sentidos envolvidos:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Visão (ver)</li>
          <li>Audação (ouvir)</li>
          <li>Tato (tocar)</li>
          <li>Paladar (provar)</li>
          <li>Olfato (cheirar)</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Sinestesia',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"O brilho da manhã não eliminava o fel da minha existência." <span className="text-sm text-gray-600">(visão + paladar)</span></p>
          <p className="italic">"Ouço cores vibrantes na música." <span className="text-sm text-gray-600">(audição + visão)</span></p>
          <p className="italic">"Sinto o perfume gelado da noite." <span className="text-sm text-gray-600">(tato + olfato)</span></p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Cada exemplo combina sentidos diferentes.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Sinestesia',
    question: 'Qual alternativa apresenta sinestesia?',
    options: [
      'A música é alta.',
      'Ouço cores na sinfonia.',
      'A orquestra tocou bem.',
      'Gosto dessa melodia.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta sinestesia: combina audição ("ouço") com visão ("cores").',
  },
  {
    type: 'feedback',
    title: 'Resumo - Sinestesia',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Perfeito!</strong>
        </p>
        <p className="mb-4">
          A sinestesia MISTURA sentidos diferentes em uma expressão.
        </p>
        <div className="bg-pink-50 p-4 rounded-lg">
          <p className="font-semibold text-pink-900">💡 Dica:</p>
          <p className="text-pink-800">
            Procure por expressões onde um sentido é descrito usando outro sentido.
          </p>
        </div>
      </div>
    ),
  },
];

// Litotes
export const litotesCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Litotes?',
    content: (
      <div>
        <p className="mb-4">
          A litotes é uma figura de linguagem que consiste na declaração caracterizada pela negação do contrário.
        </p>
        <p className="mb-4">
          <strong>Como funciona:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Diz o oposto do que quer afirmar</li>
          <li>Usa negação para expressar positividade</li>
          <li>Cria efeito de modéstia ou ironia</li>
          <li>Comum em linguagem formal</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Litotes',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Não é boba" <span className="text-sm text-gray-600">(= é esperta)</span></p>
          <p className="italic">"Não está nada mal" <span className="text-sm text-gray-600">(= está bom)</span></p>
          <p className="italic">"Não é feio" <span className="text-sm text-gray-600">(= é bonito)</span></p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> A negação expressa o oposto do que está escrito.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Litotes',
    question: 'Qual alternativa apresenta litotes?',
    options: [
      'Ela é muito inteligente.',
      'Ela não é boba.',
      'Ela estuda bastante.',
      'Ela é uma boa aluna.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta litotes: "não é boba" significa "é esperta", negando o contrário.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Litotes',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Muito bem!</strong>
        </p>
        <p className="mb-4">
          A litotes DIZ O CONTRÁRIO para afirmar algo positivo.
        </p>
        <div className="bg-teal-50 p-4 rounded-lg">
          <p className="font-semibold text-teal-900">💡 Dica:</p>
          <p className="text-teal-800">
            Procure por negações que expressam qualidades positivas.
          </p>
        </div>
      </div>
    ),
  },
];

// Eufemismo
export const eufemismoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Eufemismo?',
    content: (
      <div>
        <p className="mb-4">
          O eufemismo é uma figura de linguagem que utiliza um termo ou expressão que suaviza ou ameniza uma declaração.
        </p>
        <p className="mb-4">
          <strong>Objetivos:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Suavizar temas delicados</li>
          <li>Evitar palavras diretas ou rudes</li>
          <li>Mostrar educação e respeito</li>
          <li>Usado em contextos sociais</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Eufemismo',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Ele partiu desta para melhor" <span className="text-sm text-gray-600">(= morreu)</span></p>
          <p className="italic">"Ela está em estado interessante" <span className="text-sm text-gray-600">(= grávida)</span></p>
          <p className="italic">"Ele teve um acidente de trânsito" <span className="text-sm text-gray-600">(= acidente grave)</span></p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Cada expressão suaviza um tema delicado ou negativo.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Eufemismo',
    question: 'Qual alternativa apresenta eufemismo?',
    options: [
      'Ele morreu ontem.',
      'Ele partiu desta para melhor.',
      'O funeral foi hoje.',
      'A família está triste.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta eufemismo: "partiu desta para melhor" suaviza a ideia de morte.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Eufemismo',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente!</strong>
        </p>
        <p className="mb-4">
          O eufemismo SUAVIZA temas delicados ou negativos.
        </p>
        <div className="bg-rose-50 p-4 rounded-lg">
          <p className="font-semibold text-rose-900">💡 Dica:</p>
          <p className="text-rose-800">
            Procure por expressões que evitam palavras diretas sobre temas sensíveis.
          </p>
        </div>
      </div>
    ),
  },
];

// Ironia
export const ironiaCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Ironia?',
    content: (
      <div>
        <p className="mb-4">
          A ironia é uma figura de linguagem que consiste em expressar o oposto do que se afirma, geralmente com intenção crítica ou humorística.
        </p>
        <p className="mb-4">
          <strong>Tipos:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Ironia verbal:</strong> Dizer o contrário do que pensa</li>
          <li><strong>Ironia situacional:</strong> Situação oposta ao esperado</li>
          <li><strong>Ironia dramática:</strong> Personagem não sabe algo que o público sabe</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Ironia',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Como eu amo pessoas desorganizadas!" <span className="text-sm text-gray-600">(= odeia)</span></p>
          <p className="italic">"Que dia maravilhoso!" <span className="text-sm text-gray-600">(em dia de chuva)</span></p>
          <p className="italic">"Você é mesmo inteligente!" <span className="text-sm text-gray-600">(para alguém burro)</span></p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> O sentido real é o oposto do que está escrito.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Ironia',
    question: 'Qual alternativa apresenta ironia?',
    options: [
      'Que dia bonito!',
      'Como eu amo acordar cedo!',
      'Gosto de dias ensolarados.',
      'Prefiro manhãs tranquilas.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta ironia: "amo acordar cedo" significa o oposto, já que ninguém gosta de acordar cedo.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Ironia',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Parabéns!</strong>
        </p>
        <p className="mb-4">
          A ironia DIZ O CONTRÁRIO do que realmente pensa.
        </p>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="font-semibold text-red-900">💡 Dica:</p>
          <p className="text-red-900">
            Procure por expressões onde o sentido real é oposto ao literal.
          </p>
        </div>
      </div>
    ),
  },
];

// Antítese
export const antiteseCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Antítese?',
    content: (
      <div>
        <p className="mb-4">
          A antítese é uma figura de linguagem que expressa uma oposição ou contraste entre ideias ou elementos.
        </p>
        <p className="mb-4">
          <strong>Características:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Contraste entre opostos</li>
          <li>Cria tensão ou equilíbrio</li>
          <li>Usada para enfatizar diferenças</li>
          <li>Comum em discursos e poesias</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Antítese',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Sinto o calor de seus olhos e o frio de suas mãos."</p>
          <p className="italic">"É melhor ser temido do que amado."</p>
          <p className="italic">"Do luto ao riso, da dor ao prazer."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Cada exemplo apresenta oposição entre elementos contrastantes.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Antítese',
    question: 'Qual alternativa apresenta antítese?',
    options: [
      'Ela é bonita e inteligente.',
      'Sinto calor e frio ao mesmo tempo.',
      'Ela canta e dança bem.',
      'Ele corre e pula alto.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta antítese: oposição entre "calor" e "frio" cria contraste.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Antítese',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Ótimo!</strong>
        </p>
        <p className="mb-4">
          A antítese CONTRASTA ideias opostas para criar efeito.
        </p>
        <div className="bg-cyan-50 p-4 rounded-lg">
          <p className="font-semibold text-cyan-900">💡 Dica:</p>
          <p className="text-cyan-800">
            Procure por expressões que colocam opostos lado a lado.
          </p>
        </div>
      </div>
    ),
  },
];

// Paradoxo ou Oximoro
export const paradoxoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Paradoxo?',
    content: (
      <div>
        <p className="mb-4">
          O paradoxo (ou oximoro) é uma figura de linguagem que apresenta uma antítese acompanhada de contradição aparente.
        </p>
        <p className="mb-4">
          <strong>Diferença da antítese:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Antítese = oposição simples</li>
          <li>Paradoxo = oposição + contradição lógica</li>
          <li>Cria reflexão e profundidade</li>
          <li>Paradoxo verdadeiro faz sentido apesar da contradição</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Paradoxo',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"A morte é essencial para a continuação da vida."</p>
          <p className="italic">"Preciso gastar dinheiro para ganhar dinheiro."</p>
          <p className="italic">"Quanto mais sei, mais percebo que nada sei."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Cada afirmação parece contraditória, mas faz sentido profundo.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Paradoxo',
    question: 'Qual alternativa apresenta paradoxo?',
    options: [
      'Dia e noite se alternam.',
      'A morte dá vida às espécies.',
      'O sol nasce e se põe.',
      'A água molha as plantas.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta paradoxo: a morte (oposta à vida) é essencial para a continuação da vida.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Paradoxo',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente reflexão!</strong>
        </p>
        <p className="mb-4">
          O paradoxo APRESENTA contradição que faz sentido profundo.
        </p>
        <div className="bg-violet-50 p-4 rounded-lg">
          <p className="font-semibold text-violet-900">💡 Dica:</p>
          <p className="text-violet-800">
            Procure por afirmações que parecem impossíveis, mas são verdadeiras.
          </p>
        </div>
      </div>
    ),
  },
];

// Apóstrofe
export const apostrofeCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Apóstrofe?',
    content: (
      <div>
        <p className="mb-4">
          A apóstrofe é uma figura de linguagem que consiste na interrupção do enunciado para interpelar ou invocar alguém ou algo.
        </p>
        <p className="mb-4">
          <strong>Características:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Interrupção do discurso</li>
          <li>Dirigir-se diretamente a alguém/algo</li>
          <li>Cria dramaticidade e emoção</li>
          <li>Comum em discursos e poesias</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Apóstrofe',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"A dor, ó irmão, pode ser benéfica."</p>
          <p className="italic">"Vinde, ó musas, inspirai-me!"</p>
          <p className="italic">"Tu, liberdade, és o meu sonho."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> O discurso se interrompe para dirigir-se diretamente ao interlocutor.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Apóstrofe',
    question: 'Qual alternativa apresenta apóstrofe?',
    options: [
      'A dor pode ser benéfica.',
      'A dor, ó amigo, pode ser benéfica.',
      'A dor é benéfica às vezes.',
      'Sinto dor no peito.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta apóstrofe: "ó amigo" interrompe o enunciado para dirigir-se diretamente.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Apóstrofe',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Muito bem!</strong>
        </p>
        <p className="mb-4">
          A apóstrofe INTERRUPTE para dirigir-se diretamente a alguém.
        </p>
        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="font-semibold text-amber-900">💡 Dica:</p>
          <p className="text-amber-800">
            Procure por interpelações diretas que interrompem o fluxo normal do texto.
          </p>
        </div>
      </div>
    ),
  },
];

// Gradação
export const gradacaoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Gradação?',
    content: (
      <div>
        <p className="mb-4">
          A gradação é uma figura de linguagem que consiste na sucessão de ideias em ordem crescente ou decrescente de intensidade.
        </p>
        <p className="mb-4">
          <strong>Tipos:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Crescente:</strong> Intensidade aumenta progressivamente</li>
          <li><strong>Decrescente:</strong> Intensidade diminui progressivamente</li>
          <li>Cria ritmo e ênfase</li>
          <li>Comum em discursos políticos</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Gradação',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Vim, vi, venci." <span className="text-sm text-gray-600">(crescente)</span></p>
          <p className="italic">"Uma música, um poema, um sonho." <span className="text-sm text-gray-600">(crescente)</span></p>
          <p className="italic">"Reis, príncipes, plebeus." <span className="text-sm text-gray-600">(decrescente)</span></p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> As ideias se sucedem em ordem de intensidade crescente ou decrescente.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Gradação',
    question: 'Qual alternativa apresenta gradação?',
    options: [
      'Ele canta, dança e pula.',
      'Vim, vi, venci.',
      'Ele é alto e forte.',
      'Ela corre e salta.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta gradação crescente: cada verbo representa uma intensidade maior de ação.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Gradação',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Perfeito!</strong>
        </p>
        <p className="mb-4">
          A gradação SUCESSÃO ideias em ordem crescente/decrescente.
        </p>
        <div className="bg-lime-50 p-4 rounded-lg">
          <p className="font-semibold text-lime-900">💡 Dica:</p>
          <p className="text-lime-800">
            Procure por sequências onde cada elemento aumenta ou diminui a intensidade.
          </p>
        </div>
      </div>
    ),
  },
];

// Elipse
export const elipseCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Elipse?',
    content: (
      <div>
        <p className="mb-4">
          A elipse é uma figura de linguagem que consiste na omissão de uma palavra ou expressão que está implícita na estrutura do enunciado.
        </p>
        <p className="mb-4">
          <strong>Tipos:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Elipse simples:</strong> Omissão de termo facilmente subentendido</li>
          <li><strong>Zeugma:</strong> Omissão de termo repetido</li>
          <li>Economia de linguagem</li>
          <li>Mais concisa e elegante</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Elipse',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"No automóvel, três pessoas: eu, meu amigo e meu irmão." <span className="text-sm text-gray-600">(implícito: estavam)</span></p>
          <p className="italic">"João foi ao mercado, Maria à praia." <span className="text-sm text-gray-600">(implícito: foi)</span></p>
          <p className="italic">"Pensava mais em comida do que em esportes." <span className="text-sm text-gray-600">(zeugma)</span></p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Palavras foram omitidas, mas o sentido permanece claro.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Elipse',
    question: 'Qual alternativa apresenta elipse?',
    options: [
      'João foi ao mercado e Maria foi à praia.',
      'No carro estavam três pessoas.',
      'No carro, três pessoas: eu, meu amigo e meu irmão.',
      'João e Maria foram passear.',
    ],
    correctAnswer: 2,
    content: 'A alternativa C apresenta elipse: omite o verbo "estavam" que está subentendido.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Elipse',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente!</strong>
        </p>
        <p className="mb-4">
          A elipse OMITTE palavras que estão implícitas no contexto.
        </p>
        <div className="bg-emerald-50 p-4 rounded-lg">
          <p className="font-semibold text-emerald-900">💡 Dica:</p>
          <p className="text-emerald-800">
            Procure por frases onde faltam palavras, mas o sentido ainda é claro.
          </p>
        </div>
      </div>
    ),
  },
];

// Anáfora
export const anaforaCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Anáfora?',
    content: (
      <div>
        <p className="mb-4">
          A anáfora é uma figura de linguagem que consiste na repetição de uma ou mais palavras no início de versos ou orações.
        </p>
        <p className="mb-4">
          <strong>Funções:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cria ritmo e musicalidade</li>
          <li>Enfatiza ideias importantes</li>
          <li>Usada em discursos e poesias</li>
          <li>Fortalece a mensagem</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Anáfora',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"O que será, que será?"</p>
          <p className="italic">"Que andam suspirando pelas alcovas<br/>Que andam sussurrando em versos e trovas"</p>
          <p className="italic">"Não vou, não posso, não quero."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> A mesma palavra ou expressão se repete no início de cada verso/oração.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Anáfora',
    question: 'Qual alternativa apresenta anáfora?',
    options: [
      'Será que vai chover?',
      'O que será, que será?',
      'Será um dia bonito.',
      'O que você quer?',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta anáfora: "que" se repete no início de cada parte da pergunta.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Anáfora',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Muito bem!</strong>
        </p>
        <p className="mb-4">
          A anáfora REPETE palavras no início para criar ritmo.
        </p>
        <div className="bg-sky-50 p-4 rounded-lg">
          <p className="font-semibold text-sky-900">💡 Dica:</p>
          <p className="text-sky-800">
            Procure por repetições no começo de frases ou versos.
          </p>
        </div>
      </div>
    ),
  },
];

// Pleonasmo
export const pleonasmoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Pleonasmo?',
    content: (
      <div>
        <p className="mb-4">
          O pleonasmo é uma figura de linguagem que consiste na repetição intencional de uma ideia para enfatizar ou expressar melhor um conceito.
        </p>
        <p className="mb-4">
          <strong>Tipos:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Figurativo:</strong> Ênfase intencional (correto)</li>
          <li><strong>Vício:</strong> Repetição desnecessária (incorreto)</li>
          <li>Usado em discursos e textos persuasivos</li>
          <li>Fortalece a mensagem</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Pleonasmo',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"A mim nada me convence." <span className="text-sm text-gray-600">(ênfase)</span></p>
          <p className="italic">"Vi com meus próprios olhos." <span className="text-sm text-gray-600">(ênfase)</span></p>
          <p className="italic">"Subi para cima da árvore." <span className="text-sm text-gray-600">(vício)</span></p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Quando usado como figura, reforça a ideia; como vício, é redundante.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Pleonasmo Figurativo',
    question: 'Qual alternativa apresenta pleonasmo figurativo?',
    options: [
      'Subi na árvore.',
      'Vi com meus próprios olhos.',
      'Ela é bonita.',
      'Ele corre rápido.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta pleonasmo figurativo: "com meus próprios olhos" enfatiza a certeza da visão.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Pleonasmo',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Bom trabalho!</strong>
        </p>
        <p className="mb-4">
          O pleonasmo REPETE para ENFATIZAR (quando usado como figura).
        </p>
        <div className="bg-stone-50 p-4 rounded-lg">
          <p className="font-semibold text-stone-900">💡 Dica:</p>
          <p className="text-stone-800">
            Pleonasmo bom = ênfase intencional; Pleonasmo ruim = repetição desnecessária.
          </p>
        </div>
      </div>
    ),
  },
];

// Polissíndeto
export const polissindetoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Polissíndeto?',
    content: (
      <div>
        <p className="mb-4">
          O polissíndeto é uma figura de linguagem que consiste na repetição intencional da conjunção "e" para dar ritmo e ênfase.
        </p>
        <p className="mb-4">
          <strong>Características:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Repetição da conjunção "e"</li>
          <li>Cria ritmo acelerado</li>
          <li>Dá ênfase e dramaticidade</li>
          <li>Comum em discursos inflamados</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Polissíndeto',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"O povo sofre, e chora, e grita, e protesta, e aceita o inevitável enfim."</p>
          <p className="italic">"Vim, e vi, e venci."</p>
          <p className="italic">"Correu, e pulou, e voou, e venceu."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> A conjunção "e" se repete criando um ritmo crescente.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Polissíndeto',
    question: 'Qual alternativa apresenta polissíndeto?',
    options: [
      'O povo sofre e protesta.',
      'O povo sofre, chora e protesta.',
      'O povo sofre, e chora, e grita, e protesta.',
      'O povo está sofrendo.',
    ],
    correctAnswer: 2,
    content: 'A alternativa C apresenta polissíndeto: repetição intencional da conjunção "e" para dar ritmo.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Polissíndeto',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente!</strong>
        </p>
        <p className="mb-4">
          O polissíndeto REPETE "e" para criar ritmo e ênfase.
        </p>
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="font-semibold text-slate-900">💡 Dica:</p>
          <p className="text-slate-800">
            Procure por sequências onde "e" aparece muitas vezes seguidas.
          </p>
        </div>
      </div>
    ),
  },
];

// Aliteração
export const aliteracaoCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Aliteração?',
    content: (
      <div>
        <p className="mb-4">
          A aliteração é uma figura de linguagem que consiste na repetição de consoantes ou sílabas em palavras próximas.
        </p>
        <p className="mb-4">
          <strong>Características:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Repetição de sons consonantais</li>
          <li>Cria musicalidade e ritmo</li>
          <li>Usada principalmente em poesia</li>
          <li>Em prosa, pode virar vício de linguagem</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Aliteração',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"Paulo pediu ao pedreiro para pregar o prego na parede."</p>
          <p className="italic">"O rato roeu a roupa do rei de Roma."</p>
          <p className="italic">"Três tigres tristes."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Sons consonantais se repetem (p/p, r/r, t/t).
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Aliteração',
    question: 'Qual alternativa apresenta aliteração?',
    options: [
      'O gato comeu o rato.',
      'O rato roeu a roupa.',
      'O cachorro latiu.',
      'O pássaro voou.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta aliteração: repetição do som "r" em rato, roeu, roupa.',
  },
  {
    type: 'exercicio',
    title: 'Exercício Extra - Aliteração com "P"',
    question: 'Qual frase apresenta aliteração com o som "p"?',
    options: [
      'João pulou o muro.',
      'Pedro pediu pão.',
      'Maria comprou flores.',
      'Carlos correu rápido.',
    ],
    correctAnswer: 1,
    content: 'Correto! "Pedro pediu pão" apresenta aliteração com o som "p" repetido em Pedro, pediu, pão.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Aliteração',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Perfeito!</strong>
        </p>
        <p className="mb-4">
          A aliteração REPETE sons consonantais para criar musicalidade.
        </p>
        <div className="bg-fuchsia-50 p-4 rounded-lg">
          <p className="font-semibold text-fuchsia-900">💡 Dica:</p>
          <p className="text-fuchsia-800">
            Leia em voz alta e preste atenção aos sons que se repetem.
          </p>
        </div>
      </div>
    ),
  },
];

// Assonância
export const assonanciaCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Assonância?',
    content: (
      <div>
        <p className="mb-4">
          A assonância é uma figura de linguagem que consiste na repetição de vogais em palavras próximas.
        </p>
        <p className="mb-4">
          <strong>Diferença da aliteração:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Aliteração = consoantes</li>
          <li>Assonância = vogais</li>
          <li>Cria harmonia sonora</li>
          <li>Muito usada em poesia</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Assonância',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"A Cláudia falava da lágrima que cala."</p>
          <p className="italic">"O vento uiva na noite escura."</p>
          <p className="italic">"Amor, dor, flor, cor."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> Vogais se repetem criando harmonia (a/a, u/u, o/o).
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Assonância',
    question: 'Qual alternativa apresenta assonância?',
    options: [
      'O gato pulou o muro.',
      'A lua brilha no céu.',
      'O vento uiva na noite.',
      'O sol brilha forte.',
    ],
    correctAnswer: 2,
    content: 'A alternativa C apresenta assonância: repetição das vogais "e" e "i" (vento, uiva, noite).',
  },
  {
    type: 'feedback',
    title: 'Resumo - Assonância',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente!</strong>
        </p>
        <p className="mb-4">
          A assonância REPETE vogais para criar harmonia sonora.
        </p>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-semibold text-purple-900">💡 Dica:</p>
          <p className="text-purple-800">
            Foque nas vogais - elas que criam a musicalidade da assonância.
          </p>
        </div>
      </div>
    ),
  },
];

// Onomatopeia
export const onomatopeiaCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Onomatopeia?',
    content: (
      <div>
        <p className="mb-4">
          A onomatopeia é uma figura de linguagem em que a palavra imita o som que representa.
        </p>
        <p className="mb-4">
          <strong>Características:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Imitação sonora</li>
          <li>Palavras que "soam" como o que representam</li>
          <li>Torna o texto mais vivo</li>
          <li>Comum em histórias infantis</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Onomatopeia',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"O tique-taque do relógio era ensurdecedor."</p>
          <p className="italic">"Foi só o gato fazer miau, que a cachorrada disparou a latir."</p>
          <p className="italic">"Plim, plim, plim... a chuva caía."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> As palavras imitam os sons que descrevem.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Onomatopeia',
    question: 'Qual alternativa apresenta onomatopeia?',
    options: [
      'O cachorro latiu alto.',
      'O cachorro fez au-au.',
      'O cachorro correu.',
      'O cachorro dormiu.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta onomatopeia: "au-au" imita o som do latido do cachorro.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Onomatopeia',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Muito bem!</strong>
        </p>
        <p className="mb-4">
          A onomatopeia IMITA sons através de palavras.
        </p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-semibold text-green-900">💡 Dica:</p>
          <p className="text-green-800">
            Procure por palavras que parecem fazer o som que descrevem.
          </p>
        </div>
      </div>
    ),
  },
];

// Paronomásia
export const paronomasiaCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'O que é Paronomásia?',
    content: (
      <div>
        <p className="mb-4">
          A paronomásia é uma figura de linguagem que consiste no uso de palavras parecidas (parônimas) para criar jogos de palavras, trocadilhos ou efeitos sonoros.
        </p>
        <p className="mb-4">
          <strong>Características:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Uso de palavras homófonas ou parônimas</li>
          <li>Criação de jogos de palavras</li>
          <li>Efeito humorístico ou poético</li>
          <li>Comum em trocadilhos e publicidade</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Paronomásia',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
          <p className="italic">"O rato roeu a roupa do rei de Roma."</p>
          <p className="italic">"Mais vale um pássaro na mão do que dois voando."</p>
          <p className="italic">"Quem não tem cão caça com gato."</p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Observe:</strong> As palavras semelhantes criam ritmo e jogos sonoros.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Paronomásia',
    question: 'Qual alternativa apresenta paronomásia?',
    options: [
      'O gato caça ratos.',
      'O rato roeu a roupa do rei.',
      'O rei mora em Roma.',
      'A roupa estava suja.',
    ],
    correctAnswer: 1,
    content: 'A alternativa B apresenta paronomásia com as palavras "roeu" e "rei" criando um jogo sonoro.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Paronomásia',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente!</strong>
        </p>
        <p className="mb-4">
          A paronomásia CRIA JOGOS DE PALAVRAS com sons semelhantes.
        </p>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-semibold text-purple-900">💡 Dica:</p>
          <p className="text-green-800">
            Procure por palavras que "rimam" ou soam parecidas no contexto.
          </p>
        </div>
      </div>
    ),
  },
];

// Exercícios do Módulo 1 - Revisão
export const exerciciosModulo1Cards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Revisão dos Tipos Textuais',
    content: (
      <div>
        <p className="mb-4">
          Antes de avançar nas figuras de linguagem, vamos revisar os tipos textuais do Módulo 1. Aqui você encontrará exercícios práticos para testar seus conhecimentos sobre:
        </p>
        <p className="mb-4">
          <strong>Tipos textuais revisados:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Narrativo:</strong> Conta uma história com enredo, personagens, tempo e espaço</li>
          <li><strong>Descritivo:</strong> Mostra características detalhadas usando adjetivos e verbos de ligação</li>
          <li><strong>Dissertativo:</strong> Apresenta tese e argumentos para convencer</li>
          <li><strong>Expositivo:</strong> Informa e explica de forma objetiva</li>
          <li><strong>Injuntivo:</strong> Orienta e instrui usando verbos no imperativo</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          <strong>💡 Dica:</strong> Este tópico é opcional! Use-o para revisar conceitos antes de continuar.
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Exercício 1 - Texto Narrativo',
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
    type: 'exercicio',
    title: 'Exercício 2 - Texto Descritivo',
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
    type: 'exercicio',
    title: 'Exercício 3 - Texto Dissertativo',
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
    type: 'exercicio',
    title: 'Exercício 4 - Texto Expositivo',
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
    type: 'exercicio',
    title: 'Exercício 5 - Texto Injuntivo',
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
    type: 'exercicio',
    title: 'Exercício 6 - Identificação Combinada',
    question: 'Analise o texto: "João acordou cedo, tomou banho rapidamente e correu para o trabalho. O trânsito estava intenso, mas ele conseguiu chegar no horário." Que tipo textual é este?',
    options: [
      'Descritivo - foca nas características físicas',
      'Narrativo - conta uma sequência de ações',
      'Dissertativo - apresenta argumentos',
      'Injuntivo - dá instruções',
    ],
    correctAnswer: 1,
    content: 'Correto! É um texto narrativo porque apresenta uma sequência de ações realizadas por um personagem (João) em um determinado tempo e espaço.',
  },
  {
    type: 'exercicio',
    title: 'Exercício 7 - Análise de Propósito',
    question: 'Qual é o principal objetivo de um texto expositivo?',
    options: [
      'Contar uma história emocionante',
      'Convencer o leitor de uma opinião',
      'Informar e explicar de forma objetiva',
      'Dar instruções para executar tarefas',
    ],
    correctAnswer: 2,
    content: 'Correto! O texto expositivo tem como objetivo principal informar e explicar conceitos, fatos ou processos de forma objetiva e imparcial.',
  },
  {
    type: 'feedback',
    title: 'Revisão Concluída!',
    content: (
      <div>
        <p className="mb-4">
          🎉 <strong>Parabéns por revisar os tipos textuais!</strong>
        </p>
        <p className="mb-4">
          Você completou todos os exercícios de revisão do Módulo 1. Agora está preparado para continuar estudando as figuras de linguagem com uma base sólida.
        </p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-semibold text-green-900">📚 Próximos passos:</p>
          <p className="text-green-800">
            Continue explorando as figuras de linguagem! Cada uma delas pode aparecer em diferentes tipos textuais.
          </p>
        </div>
      </div>
    ),
  },
];
