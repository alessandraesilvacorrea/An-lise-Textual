import { CardContent } from '../components/SwipeCard';

// Verificar Fonte
export const verificarFonteCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Verificando a Fonte da Informação',
    content: (
      <div>
        <p className="mb-4">
          Verificar a fonte é o primeiro passo para identificar notícias falsas. Fontes confiáveis são transparentes sobre sua origem.
        </p>
        <p className="mb-4">
          <strong>Como verificar:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Procure pelo autor da notícia</li>
          <li>Verifique se o site é conhecido e respeitado</li>
          <li>Desconfie de sites sem "Sobre nós" ou contato</li>
          <li>Confira se há outros veículos noticiando o mesmo</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplo - Fontes Confiáveis vs Suspeitas',
    content: (
      <div>
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <p className="font-semibold text-green-800 mb-2">✅ Fonte Confiável:</p>
          <p className="text-sm">
            Site de jornal conhecido, com nome do jornalista, data, e a mesma notícia em outros veículos respeitados.
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="font-semibold text-red-800 mb-2">❌ Fonte Suspeita:</p>
          <p className="text-sm">
            Site desconhecido, sem autor identificado, apenas em um lugar, com URL estranha (ex: "noticiasverdadeiras123.com").
          </p>
        </div>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Fonte Confiável',
    question: 'Qual característica indica que uma fonte é MAIS confiável?',
    options: [
      'Não mostra quem escreveu a notícia',
      'O site tem um nome muito chamativo',
      'A notícia aparece em vários veículos respeitados',
      'Usa muitas letras maiúsculas no título',
    ],
    correctAnswer: 2,
    content: 'Quando uma notícia aparece em vários veículos respeitados, há mais chances de ser verdadeira, pois múltiplas fontes verificaram a informação.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Verificar Fonte',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Ótimo!</strong>
        </p>
        <p className="mb-4">
          Sempre CHEQUE A FONTE antes de acreditar ou compartilhar uma notícia.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold text-blue-900">💡 Dica:</p>
          <p className="text-blue-800">
            Se algo parece sensacional demais, provavelmente é falso!
          </p>
        </div>
      </div>
    ),
  },
];

// Linguagem Emocional
export const linguagemEmocionalCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Linguagem Emocional Exagerada',
    content: (
      <div>
        <p className="mb-4">
          Fake news frequentemente usam linguagem emotiva e sensacionalista para manipular os sentimentos do leitor.
        </p>
        <p className="mb-4">
          <strong>Sinais de alerta:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Títulos com MUITAS LETRAS MAIÚSCULAS</li>
          <li>Uso excessivo de pontos de exclamação!!!</li>
          <li>Palavras como "CHOCANTE", "URGENTE", "INACREDITÁVEL"</li>
          <li>Apelo ao medo ou à raiva</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplos de Linguagem',
    content: (
      <div>
        <div className="bg-red-50 p-4 rounded-lg mb-4">
          <p className="font-semibold text-red-800 mb-2">❌ Suspeito (Emotivo):</p>
          <p className="text-sm italic">
            "URGENTE!!! DESCOBERTA CHOCANTE QUE ELES NÃO QUEREM QUE VOCÊ SAIBA!!!"
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-semibold text-green-800 mb-2">✅ Confiável (Neutro):</p>
          <p className="text-sm italic">
            "Pesquisa revela novos dados sobre mudanças climáticas"
          </p>
        </div>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Identificando Linguagem Suspeita',
    question: 'Qual título é mais suspeito de ser fake news?',
    options: [
      'Estudo mostra benefícios da atividade física',
      'ABSURDO!!! Você não vai ACREDITAR no que descobrimos!!!',
      'Pesquisadores anunciam nova descoberta científica',
      'Governo anuncia mudanças na educação',
    ],
    correctAnswer: 1,
    content: 'A alternativa B usa linguagem excessivamente emotiva, com maiúsculas e múltiplas exclamações, características comuns em fake news.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Linguagem Emocional',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Muito bem!</strong>
        </p>
        <p className="mb-4">
          DESCONFIE de títulos sensacionalistas que querem provocar emoções fortes.
        </p>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-semibold text-purple-900">💡 Dica:</p>
          <p className="text-purple-800">
            Notícias sérias usam linguagem neutra e profissional!
          </p>
        </div>
      </div>
    ),
  },
];

// Checar Data
export const checarDataCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Verificando Data e Contexto',
    content: (
      <div>
        <p className="mb-4">
          Notícias antigas podem ser republicadas fora de contexto para enganar. Sempre verifique a data e se a informação ainda é relevante.
        </p>
        <p className="mb-4">
          <strong>O que verificar:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Data de publicação original</li>
          <li>Se o contexto mudou desde então</li>
          <li>Se a notícia foi atualizada</li>
          <li>Se imagens/vídeos são recentes</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Exemplo de Notícia Antiga',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="italic mb-3">
            Uma notícia de 2015 sobre "nova descoberta científica" é compartilhada em 2026 como se fosse atual, mas aquela descoberta já foi refutada ou está desatualizada.
          </p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Problema:</strong> Informação verdadeira em 2015, mas falsa ou imprecisa em 2026. O contexto mudou!
        </p>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Importância da Data',
    question: 'Por que verificar a data de uma notícia é importante?',
    options: [
      'Para saber se a informação ainda é atual e relevante',
      'Apenas para organização pessoal',
      'Notícias antigas são sempre falsas',
      'A data não importa para o conteúdo',
    ],
    correctAnswer: 0,
    content: 'A data é crucial porque o contexto muda com o tempo. Uma informação verdadeira em um momento pode estar desatualizada ou ser enganosa em outro contexto.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Checar Data',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Excelente!</strong>
        </p>
        <p className="mb-4">
          Sempre VERIFIQUE A DATA e considere o contexto temporal da informação.
        </p>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="font-semibold text-orange-900">💡 Dica:</p>
          <p className="text-orange-800">
            Pergunte: "Quando isso foi publicado? O contexto ainda é o mesmo?"
          </p>
        </div>
      </div>
    ),
  },
];

// Fotos e Vídeos Manipulados
export const fotosManipuladasCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Identificando Mídia Manipulada',
    content: (
      <div>
        <p className="mb-4">
          Fotos e vídeos podem ser editados, tirados de contexto ou serem de eventos diferentes. Aprenda a identificar sinais de manipulação.
        </p>
        <p className="mb-4">
          <strong>Como verificar:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Faça busca reversa de imagens (Google Images)</li>
          <li>Procure por inconsistências na imagem</li>
          <li>Verifique se a imagem já foi usada antes</li>
          <li>Analise se a imagem combina com o texto</li>
        </ul>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Sinais de Manipulação',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div>
            <p className="font-semibold mb-1">🚨 Foto de outro evento:</p>
            <p className="text-sm">Imagem de manifestação de 2015 usada como se fosse de 2026</p>
          </div>
          <div>
            <p className="font-semibold mb-1">🚨 Edição digital:</p>
            <p className="text-sm">Foto editada para adicionar ou remover elementos</p>
          </div>
          <div>
            <p className="font-semibold mb-1">🚨 Fora de contexto:</p>
            <p className="text-sm">Imagem real mas com legenda enganosa</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Verificando Imagens',
    question: 'Qual é a melhor forma de verificar se uma foto é verdadeira?',
    options: [
      'Acreditar se parece real',
      'Fazer busca reversa de imagens no Google',
      'Ver quantas curtidas tem',
      'Confiar em quem compartilhou',
    ],
    correctAnswer: 1,
    content: 'A busca reversa de imagens permite descobrir a origem da foto, quando foi tirada originalmente e em que contexto, revelando possíveis manipulações ou uso indevido.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Mídia Manipulada',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Ótimo trabalho!</strong>
        </p>
        <p className="mb-4">
          VERIFIQUE imagens e vídeos com ferramentas de busca reversa.
        </p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-semibold text-green-900">💡 Dica:</p>
          <p className="text-green-800">
            Use Google Images ou TinEye para rastrear a origem de fotos suspeitas!
          </p>
        </div>
      </div>
    ),
  },
];

// Fact-Checking
export const factCheckingCards: CardContent[] = [
  {
    type: 'teoria',
    title: 'Usando Agências de Fact-Checking',
    content: (
      <div>
        <p className="mb-4">
          Agências de fact-checking são organizações especializadas em verificar a veracidade de informações circulando na internet.
        </p>
        <p className="mb-4">
          <strong>Agências confiáveis no Brasil:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Agência Lupa</li>
          <li>Aos Fatos</li>
          <li>Estadão Verifica</li>
          <li>Fato ou Fake (G1)</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          Essas agências investigam e classificam notícias como verdadeiras, falsas ou imprecisas.
        </p>
      </div>
    ),
  },
  {
    type: 'exemplo',
    title: 'Como Usar Fact-Checking',
    content: (
      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="mb-3">
            <strong>Passo a passo:</strong>
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li>Recebeu uma notícia suspeita? Não compartilhe ainda!</li>
            <li>Copie parte do texto ou o título</li>
            <li>Pesquise em sites de fact-checking</li>
            <li>Veja se já foi verificada e qual o resultado</li>
            <li>Só compartilhe se for verificadamente verdadeira</li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    type: 'exercicio',
    title: 'Fact-Checking na Prática',
    question: 'Você recebe uma notícia impressionante. Qual deve ser seu primeiro passo?',
    options: [
      'Compartilhar imediatamente com amigos',
      'Verificar em agências de fact-checking',
      'Acreditar se veio de alguém conhecido',
      'Ignorar completamente',
    ],
    correctAnswer: 1,
    content: 'Antes de compartilhar qualquer notícia, especialmente as impressionantes, deve-se verificar sua veracidade em agências de fact-checking confiáveis.',
  },
  {
    type: 'feedback',
    title: 'Resumo - Fact-Checking',
    content: (
      <div>
        <p className="mb-4">
          ✅ <strong>Parabéns!</strong>
        </p>
        <p className="mb-4">
          USE agências de fact-checking para verificar notícias suspeitas antes de compartilhar.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold text-blue-900">💡 Dica:</p>
          <p className="text-blue-800">
            Salve nos favoritos: Lupa, Aos Fatos, Estadão Verifica e Fato ou Fake!
          </p>
        </div>
      </div>
    ),
  },
];
