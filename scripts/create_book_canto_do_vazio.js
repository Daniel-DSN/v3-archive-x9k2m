const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType, PageNumber, TableOfContents, HeadingLevel, PageBreak } = require('docx');
const fs = require('fs');

// Book content - Livro 1: O Canto do Vazio
const chapters = [
  {
    title: "Parte I: A Menina dos Sonhos",
    isPart: true,
    content: []
  },
  {
    title: "Capítulo 1 — Vida Comum, Sonhos Estranhos",
    content: [
      "Grazielly acordou mais uma vez com o coração acelerado. O sonho tinha voltado.",
      "Não era um pesadelo — pelo menos não do tipo que faz você gritar. Era algo diferente. Uma presença imensa, gentil, que a observava de algum lugar muito longe. Uma luz suave que parecia chamá-la, como uma mãe que chama o filho para casa ao entardecer.",
      "Ela se sentou na cama e olhou pela janela. A vila de Thornhaven ainda dormia, coberta pela neblina suave da manhã. As casas de pedra e madeira pareciam pequenas demais para conter os mistérios que seu coração sentia.",
      "\"Grazielly! O café está pronto!\" — a voz de Ayla, sua mãe, subiu as escadas.",
      "\"Já vou, mãe!\" — ela respondeu, ainda olhando pela janela.",
      "Ayla era uma mulher tranquila, de sorriso fácil e olhos que guardavam segredos. Grazielly sempre desconfiou que a mãe escondia algo — respostas evasivas quando ela perguntava sobre o pai, olhares preocupados quando o assunto era o futuro, e aquele jeito de mudar de assunto sempre que Grazielly mencionava os sonhos.",
      "No café, a rotina se repetia. Pão fresco, chá quente, e a pergunta que Ayla fazia todas as manhãs:",
      "\"Como você dormiu, filha?\"",
      "\"Bem\" — Grazielly sempre respondia a mesma coisa. Não fazia sentido contar sobre a presença, a luz, a sensação de ser observada. Sua mãe ficaria preocupada, e preocupação significava mais segredos.",
      "A escola de Thornhaven era pequena, uma construção antiga que já foi celeiro antes de ser transformada em sala de aula. Grazielly gostava de aprender, mas sempre sentiu que havia algo faltando — como se o mundo fosse maior do que a professora descrevia.",
      "\"Hoje vamos falar sobre os elementos\" — a professora Elara anunciou, e Grazielly sentiu um arrepio. Elementos. Aquela palavra sempre a intrigou.",
      "\"Existem sete elementos primordiais\" — continuou a professora, escrevendo no quadro. \"Fogo, Água, Terra, Vento, Raio, Luz e Trevas. Dizem que, nos tempos antigos, algumas pessoas podiam manipular esses elementos. Hoje, isso é apenas lenda.\"",
      "\"Lenda?\" — Grazielly murmurou, desapontada.",
      "\"Sim, querida. Histórias que contamos às crianças antes de dormir. Ninguém realmente controla fogo ou água. Isso seria... impossível.\"",
      "Mas Grazielly não estava convencida. Ela já tinha visto coisas — pequenos acontecimentos que ninguém mais notava. Como a água do seu copo girava quando ela estava nervosa. Como o ar ficava mais frio ao seu redor quando estava triste.",
      "Talvez não fossem lendas. Talvez fosse apenas... segredo.",
      "Naquela noite, o sonho foi mais forte.",
      "Desta vez, a presença falou. Não com palavras — mas com algo mais profundo, uma voz que não era voz.",
      "\"Você está despertando, criança.\"",
      "Grazielly tentou responder, mas não tinha boca, não tinha corpo. Era apenas consciência, flutuando em uma luz infinita.",
      "\"Em breve, você entenderá. Em breve, será chamada.\"",
      "E então, como sempre, a luz se desfez e ela acordou — com o coração acelerado e uma pergunta queimando dentro dela:",
      "Quem era ela, realmente?"
    ]
  },
  {
    title: "Capítulo 2 — O Dia do Teste",
    content: [
      "Três semanas depois, o mensageiro chegou.",
      "Ele veio montado em um cavalo negro, com manto cinza e um símbolo estranho bordado no peito — um círculo com sete pontos, como uma constelação.",
      "\"Em nome da Academia Aether\" — ele anunciou na praça central, sua voz carregando até as últimas casas. \"Chegou a hora do Teste. Todos os jovens entre doze e quatorze anos devem se apresentar.\"",
      "Grazielly estava no mercado com Ayla quando ouviu. Sua mãe parou no meio do movimento, o rosto pálido.",
      "\"Mãe? O que é a Academia Aether?\" — Grazielly perguntou.",
      "\"Nada que você precise se preocupar\" — Ayla respondeu rápido demais. \"Vamos para casa.\"",
      "Mas não havia como evitar. Pela lei do reino, todos os jovens na idade certa deviam ser testados. Recusar significava punição para toda a família.",
      "No dia seguinte, Grazielly estava na fila com outros jovens da vila. O avaliador era um homem de idade avançada, barba branca e olhos que pareciam ver além do que estava à frente.",
      "Um por um, os jovens colocavam as mãos sobre uma esfera de cristal. A maioria não acontecia nada. Alguns faziam a esfera brilhar fracamente.",
      "\"Próxima\" — o avaliador chamou.",
      "Grazielly avançou. Quando suas mãos tocaram o cristal, o mundo mudou.",
      "A esfera não apenas brilhou — ela EXPLODIU em luz. Uma luz azul-prateada, fria como o inverno mais profundo, que inundou a praça inteira. O ar ao redor de Grazielly congelou, e pequenos flocos de neve começaram a cair — em pleno verão.",
      "O silêncio que se seguiu foi ensurdecedor.",
      "\"Impossible...\" — o avaliador murmurou, os olhos arregalados. \"Gelo. Elemento Gelo. Uma fusão... Água e Vento combinados.\"",
      "Ele se virou para um assistente.",
      "\"Marque esta jovem para a Academia Aether. Nível de prioridade... máximo.\"",
      "Grazielly não entendeu completamente. Mas quando olhou para sua mãe, parada entre a multidão, viu algo que nunca tinha visto antes.",
      "Ayla estava chorando. E não eram lágrimas de alegria.",
      "Eram lágrimas de medo."
    ]
  },
  {
    title: "Capítulo 3 — Gelo? Mas Como?",
    content: [
      "A casa estava em silêncio quando Grazielly e Ayla retornaram.",
      "\"Mãe, o que há de errado? Por que você está assim?\"",
      "Ayla se sentou na cadeira de madeira da cozinha, as mãos tremendo. Por um longo momento, ela não disse nada. Quando finalmente falou, sua voz era um sussurro.",
      "\"Eu esperava que isso não acontecesse. Eu rezei para que não acontecesse.\"",
      "\"Mas mãe, o avaliador disse que é bom, não disse? Prioridade máxima — isso é bom, certo?\"",
      "Ayla olhou para a filha, e havia dor em seus olhos.",
      "\"Não existe 'bom' ou 'ruim' quando se trata de poder, Grazielly. Existe apenas... responsabilidade. E perigo.\"",
      "\"Eu não entendo.\"",
      "\"Você não precisa entender ainda.\" — Ayla se levantou, sua compostura voltando aos poucos. \"A Academia vai te ensinar. Eles vão te proteger.\"",
      "\"E você? Você não vai me proteger?\"",
      "\"Eu...\" — Ayla hesitou. \"Eu sempre vou te proteger, filha. Mas há coisas que estão além de mim. Coisas que eu não posso explicar.\"",
      "\"Sobre meu pai?\" — Grazielly arriscou.",
      "O rosto de Ayla endureceu.",
      "\"Não. Sobre você.\"",
      "Naquela noite, Grazielly tentou descobrir o que podia fazer. Sozinha no quarto, ela concentrou-se na sensação do cristal — aquela energia fria que tinha explodido dela.",
      "Primeiro, nada aconteceu. Depois, devagar, o ar ao redor de suas mãos começou a mudar. A temperatura caiu. E quando ela abriu os olhos, havia flocos de gelo flutuando ao seu redor, girando como pequenas estrelas.",
      "\"Eu consigo controlar isso\" — ela sussurrou, maravilhada e aterrorizada.",
      "O problema era que, quando ela se emocionava, o controle escapava. Se ficava feliz, a sala inteira esfriava. Se ficava triste, geada cobria as janelas. E se ficava irritada... bem, ela ainda não tinha descoberto, e esperava nunca descobrir.",
      "O mensageiro da Academia retornou três dias depois com uma carta selada.",
      "\"Grazielly de Thornhaven está aceita como aluna da Academia Aether\" — ele leu em voz alta. \"A matrícula será efetuada no início do próximo ciclo lunar. A Academia provê moradia, alimentação e materiais de estudo.\"",
      "Ele estendeu a carta para Ayla, não para Grazielly.",
      "\"A mãe ou responsável deve assinar aqui.\"",
      "Ayla pegou a carta, mas não assinou imediatamente. Em vez disso, olhou para o mensageiro.",
      "\"Há algo que você precise me dizer? Algo que não está na carta?\"",
      "O mensageiro hesitou por uma fração de segundo.",
      "\"Sua filha tem um talento raro, senhora. Muito raro. O Conselho terá interesse nela.\"",
      "\"Que Conselho?\"",
      "\"O Conselho dos Mestres. Eles... observam jovens promissores.\"",
      "Grazielly percebeu que sua mãe já sabia disso. A forma como Ayla apertou os lábios, a forma como seus olhos se estreitaram — não era surpresa. Era confirmação.",
      "\"Mãe?\" — Grazielly chamou. \"O que está acontecendo?\"",
      "Ayla assinou a carta.",
      "\"Você vai para a Academia, filha. É o melhor lugar para você agora.\"",
      "\"Mas —\"",
      "\"Sem perguntas. Por favor.\" — havia um pedido desesperado nos olhos de Ayla. \"Eu te amo, Grazielly. Tudo o que eu fiz, foi para te proteger. Lembre-se disso.\"",
      "Grazielly não entendeu. Mas ela sabia uma coisa: sua vida estava prestes a mudar completamente."
    ]
  },
  {
    title: "Capítulo 4 — A Mãe Fica Estranha",
    content: [
      "As semanas antes da partida foram as mais estranhas que Grazielly já viveu.",
      "Ayla mudou. Não dramaticamente — não de uma forma que outros notassem. Mas Grazielly percebeu. A maneira como a mãe a observava quando pensava que não estava olhando. As conversas interrompidas quando Grazielly entrava no cômodo. As cartas que chegavam sem remetente e que Ayla escondia rapidamente.",
      "Uma noite, Grazielly acordou e ouviu vozes. A mãe estava falando com alguém na sala.",
      "\"— não é o momento. Ela ainda não está pronta.\" — a voz de Ayla era baixa, urgente.",
      "Grazielly se aproximou em silêncio, tentando ouvir a resposta. Mas não havia outra voz — apenas o silêncio, depois o som de algo sendo fechado.",
      "Quando Grazielly entrou na sala, Ayla estava sozinha, sentada em frente a uma pequena caixa de madeira que Grazielly nunca tinha visto.",
      "\"Mãe? Com quem você estava falando?\"",
      "\"Com ninguém, filha. Apenas... pensando em voz alta.\" — Ayla escondeu a caixa rapidamente. \"Volte para a cama. Você precisa descansar para a viagem.\"",
      "\"Que caixa é essa?\"",
      "\"Nada importante. Uma lembrança antiga.\"",
      "\"Mãe, por que você não me conta a verdade? Sobre meu pai, sobre o que está acontecendo, sobre —\"",
      "\"CHEGA!\" — Ayla se levantou abruptamente, e havia algo em seus olhos que Grazielly nunca tinha visto. Medo. Medo genuíno. \"Grazielly, existem coisas que você NÃO PODE saber. Ainda não. Talvez nunca. É para o seu bem.\"",
      "Elas ficaram em silêncio por um momento.",
      "\"Você não confia em mim\" — Grazielly disse finalmente, a voz quebrando.",
      "\"Eu confio em você mais do que em qualquer coisa neste mundo\" — Ayla respondeu, lágrimas nos olhos. \"É por isso que eu não posso contar. O conhecimento é perigoso, filha. Às vezes, não saber é a única proteção que existe.\"",
      "Grazielly voltou para o quarto, mais não conseguiu dormir. Ela ficou acordada, olhando pela janela, pensando em todas as perguntas que sua mãe se recusava a responder.",
      "Quem era seu pai? Por que sua mãe tinha tanto medo? O que havia naquela caixa?",
      "E, a pergunta mais importante: quem era ela, realmente?",
      "Os sonhos continuaram, mais agora eram diferentes. A presença luminosa não apenas falava — ela mostrava. Imagens fragmentadas de lugares que Grazielly nunca tinha visto. Uma árvore imensa no centro de um vazio infinito. Uma figura feminina de luz que a observava com tristeza. E palavras, sempre palavras:",
      "\"A verdade está guardada. Você deve encontrá-la.\"",
      "Grazielly não sabia o que isso significava. Mas ela sabia uma coisa: a Academia Aether não era apenas uma escola.",
      "Era o começo de uma jornada. E essa jornada a levaria a respostas — ou a mais perguntas.",
      "Ela só precisava estar pronta para ambas."
    ]
  },
  {
    title: "Capítulo 5 — O Convite da Academia",
    content: [
      "O dia da partida chegou mais rápido do que Grazielly esperava.",
      "Ayla a acompanhou até a estrada principal, onde uma carruagem da Academia esperava. Não era luxuosa — feita de madeira escura, com o mesmo símbolo de sete pontos que o mensageiro trazia.",
      "\"Lembre-se do que eu disse\" — Ayla segurou as mãos de Grazielly com força. \"Não confie em todos. Nem todos os sorrisos são sinceros. E não...\" — ela hesitou. \"Não procure seu pai.\"",
      "\"Mãe!\"",
      "\"Prometa-me, Grazielly. Não procure seu pai. Não ainda.\"",
      "\"Eu não sei nem quem é ele! Como eu poderia procurar?\"",
      "\"Exatamente. Mantenha-se assim. Por favor.\"",
      "Grazielly olhou para a mãe, confusa e frustrada. Mas havia algo no rosto de Ayla — um pedido tão desesperado — que ela não conseguiu negar.",
      "\"Eu prometo. Não vou procurar meu pai.\"",
      "\"Obrigada.\" — Ayla a abraçou forte. \"Eu te amo, minha filha. Mais do que você vai jamais saber.\"",
      "A carruagem partiu. Grazielly olhou pela janela traseira, vendo a figura de sua mãe diminuir até desaparecer na neblina da manhã.",
      "Havia outros jovens na carruagem — três, para ser exato. Um garoto magro de cabelos castanhos que lia um livro grosso e não levantou os olhos quando Grazielly entrou. Uma menina de cabelos negros que a observou com curiosidade aberta. E outro garoto, mais velho, que parecia sonolento.",
      "\"Eu sou Tanya\" — a menina de cabelos negros disse. \"Você também é do Teste?\"",
      "\"Sim. Grazielly.\"",
      "\"Que elemento?\"",
      "\"Gelo.\"",
      "Tanya arregalou os olhos.",
      "\"Gelo? Isso é... raro. Muito raro.\"",
      "\"Eu sei.\"",
      "\"O meu é Terra\" — Tanya disse, um pouco desapontada. \"Comum. Mas eu sou boa com plantas.\"",
      "O garoto que lia finalmente levantou os olhos.",
      "\"Gelo é uma fusão de Água e Vento\" — ele disse, como se estivesse recitando um fato de um livro. \"Apenas 0,4% dos Ressonantes manifestam fusões. E Gelo é uma das mais difíceis de controlar.\"",
      "\"Ressonantes?\" — Grazielly perguntou.",
      "\"Pessoas com Aethra ativo\" — ele respondeu, voltando ao livro. \"Você vai aprender na Academia.\"",
      "\"Eu sou Noah\" — ele acrescentou sem levantar os olhos novamente. \"E antes que pergunte: não tenho elemento.\"",
      "\"Como assim não tem?\"",
      "\"Sou um Silentis. Aethra adormecido.\" — ele virou uma página. \"A Academia me aceitou por causa da minha inteligência, não por causa de poder.\"",
      "\"Ah.\" — Grazielly não soube o que dizer.",
      "A viagem durou três dias. A paisagem mudou gradualmente — de vilarejos rurais para florestas densas, depois para montanhas imponentes. E finalmente, no horizonte, Grazielly viu algo que a deixou sem fôlego.",
      "Uma estrutura imensa, parcialmente construída dentro de uma montanha cristalina que brilhava com luz própria. Torres que alcançavam as nuvens. Pontes de energia que conectavam prédios flutuantes. E no centro, um edifício circular tão grande que parecia uma pequena cidade.",
      "\"A Academia Aether\" — Tanya sussurrou, impressionada.",
      "Grazielly não conseguiu falar. Seus sonhos tinham mostrado lugares estranhos, mas nada como isso.",
      "\"Bem-vindos ao começo de suas vidas\" — o cocheiro anunciou quando a carruagem atravessou os portões. \"Ou ao fim delas. Depende de vocês.\"",
      "Grazielly engoliu em seco. Ela não sabia se estava pronta para qualquer uma das opções."
    ]
  },
  {
    title: "Capítulo 6 — Partida e Perguntas",
    content: [
      "A Academia era ainda mais impressionante por dentro.",
      "Corredores amplos iluminados por cristais que brilhavam sem chama. Salas de aula com paredes de vidro que davam para jardins impossíveis — plantas de cores que Grazielly nunca tinha visto, flores que cantavam quando o vento passava.",
      "\"Os iniciantes ficam no Edifício Oriental\" — um estudante mais velho os guiou. \"Quartos compartilhados, quatro pessoas por quarto. As aulas começam amanhã ao nascer do sol.\"",
      "Grazielly foi designada para um quarto com Tanya e outras duas meninas — Lira, uma garota tímida de olhos grandes que mal falava, e Kesha, animada e falante demais.",
      "\"Vocês viram o Salão Principal?\" — Kesha perguntou assim que Grazielly entrou. \"É ENORME! Dizem que cabe mil pessoas!\"",
      "\"Eu quero ver a biblioteca\" — Tanya disse. \"Ouvi dizer que tem livros de mil anos atrás.\"",
      "\"Eu quero saber quando vamos comer\" — Grazielly respondeu, e todas riram.",
      "Mas por baixo do sorriso, Grazielly estava inquieta. A Academia era maravilhosa, mas havia algo mais — algo que ela não conseguia definir. Uma sensação de que cada porta escondia um segredo, cada corredor levava a uma verdade que não era para ela.",
      "Naquela noite, deitada em sua cama no dormitório, Grazielly olhou para o teto. Os sonhos não vieram — apenas o silêncio, e uma pergunta que ecoava em sua mente:",
      "\"Quem era seu pai?\"",
      "Sua mãe tinha pedido para não procurar. Mas como encontrar algo que você nem sabe o que é?",
      "No dia seguinte, as aulas começaram. E a primeira lição foi sobre algo que Grazielly nunca tinha ouvido falar.",
      "\"Bem-vindos à Academia Aether\" — a professora, uma mulher de cabelos grisalhos e olhos gentis, disse. \"Meu nome é Mirella. Serei a tutora de vocês nos primeiros meses. Antes de aprender a controlar seus elementos, precisam entender o que são.\"",
      "Ela escreveu uma palavra no quadro: AETHRA.",
      "\"Aethra é a energia espiritual que conecta todos os seres vivos ao mundo ao redor. É através do Aethra que podemos manipular os elementos. Mas Aethra não é apenas poder — é também memória, é herança, é legado.\"",
      "Grazielly prestou atenção, fascinada.",
      "\"Para alguns de vocês, o Aethra despertou naturalmente. Para outros, ainda está adormecido. Mas todos vocês têm Aethra — é o que os trouxe aqui.\"",
      "\"Professora\" — um aluno levantou a mão. \"É verdade que existem níveis de Aethra?\"",
      "\"Sim. Existem seis níveis reconhecidos. Despertar, Canalização, Ressonância, Transcendência, Primordial e Divino. A maioria dos alunos desta Academia está no nível um ou dois. Apenas lendas alcançam os níveis superiores.\"",
      "\"E qual é o nosso nível?\" — outro aluno perguntou.",
      "\"Isso vocês vão descobrir com o tempo. O Aethra não é algo que se mede em um dia — é algo que se desenvolve ao longo de uma vida.\"",
      "Depois da aula, Grazielly foi até Mirella.",
      "\"Professora, posso fazer uma pergunta?\"",
      "\"Claro, querida.\"",
      "\"O que significa ter uma fusão de elementos?\"",
      "Mirella olhou para ela com interesse.",
      "\"Você tem uma fusão?\"",
      "\"Gelo. O avaliador disse que é Água e Vento combinados.\"",
      "\"Isso é... raro.\" — Mirella pausou, escolhendo as palavras. \"Fusões são poderosas, mas também perigosas. Dois elementos diferentes convivendo no mesmo corpo podem criar conflito. Você vai precisar de treinamento especial.\"",
      "\"Treinamento especial?\"",
      "\"Sim. Mas não se preocupe — a Academia tem os melhores mestres. Você vai ficar bem.\"",
      "Grazielly assentiu, mas sua mente estava longe. Treinamento especial. Elementos em conflito. Sua mãe tinha dito que poder significava responsabilidade e perigo.",
      "Pela primeira vez, ela começou a entender o que isso queria dizer."
    ]
  },
  {
    title: "Parte II: A Academia",
    isPart: true,
    content: []
  },
  {
    title: "Capítulo 7 — Primeiro Dia, Primeira Surpresa",
    content: [
      "O primeiro dia completo na Academia trouxe mais surpresas do que Grazielly poderia imaginar.",
      "Pela manhã, aulas teóricas sobre a história dos elementos. À tarde, práticas básicas de controle. E à noite, algo que nenhum deles esperava — uma assembléia no Salão Principal.",
      "Todos os alunos foram reunidos, dos iniciantes aos veteranos. No palco, uma figura imponente aguardava — um homem alto, de ombros largos e barba negra, vestido com robes que pareciam feitos de sombras e luz.",
      "\"Bem-vindos, alunos da Academia Aether\" — sua voz ecoou pelo salão. \"Eu sou Mestre Varian, diretor desta instituição. Alguns de vocês me conhecem. Outros vão me conhecer. Todos vão me respeitar.\"",
      "Houve um silêncio respeitoso.",
      "\"Antes de começarem sua jornada, há algo que precisam saber. O mundo fora destes muros é diferente. Existem forças que vocês ainda não compreendem. Existem perigos que vocês ainda não imaginam. E existem verdades que foram escondidas de vocês por razões que... não posso revelar.\"",
      "Grazielly sentiu um arrepio. \"Verdades escondidas\" — era exatamente o que sua mãe fazia.",
      "\"A Academia vai ensiná-los a controlar seus poderes. Mas mais do que isso, vai ensiná-los a pensar. A questionar. A buscar respostas.\" — Mestre Varian olhou diretamente para Grazielly por um momento, e ela sentiu que ele sabia algo. \"Porque as respostas que vocês procuram não vão ser entregues. Elas precisam ser encontradas.\"",
      "A assembléia terminou com um aviso prático: o Torneio de Iniciação aconteceria em três meses. Todos os novos alunos eram obrigados a participar.",
      "\"É uma competição?\" — Grazielly perguntou para Tanya enquanto voltavam ao dormitório.",
      "\"Mais ou menos. Não é sobre vencer — é sobre provar que você tem controle suficiente para continuar na Academia.\"",
      "\"E se não tiver?\"",
      "\"Você é transferida para uma escola comum. E esquece tudo sobre Aethra.\"",
      "\"Esquece? Como?\"",
      "\"Existem métodos. Eu não sei os detalhes.\" — Tanya deu de ombros. \"Mas não se preocupa — Gelo é poderoso. Você vai passar fácil.\"",
      "\"O problema não é o poder\" — Grazielly murmurou. \"É o controle.\"",
      "Naquela noite, Grazielly teve outro sonho. Mas este era diferente.",
      "Não havia presença luminosa. Não havia voz gentil. Em vez disso, ela viu uma figura encapuzada observando-a de longe. E quando a figura se aproximou, Grazielly percebeu que não tinha rosto — apenas uma escuridão vazia.",
      "\"Você não deveria estar aqui\" — a figura disse, e sua voz era como gelo. \"Alguns segredos são guardados por razões.\"",
      "Grazielly acordou gritando.",
      "Kesha, Tanya e Lira acordaram também.",
      "\"Grazielly! O que aconteceu?\" — Tanya perguntou.",
      "\"N-nada. Apenas um pesadelo.\"",
      "Mas enquanto ela se sentava na cama, tremendo, Grazielly percebeu algo estranho.",
      "Suas mãos estavam cobertas de geada. E o quarto inteiro estava congelado."
    ]
  },
  {
    title: "Capítulo 8 — Elainy, a Rival Impossível",
    content: [
      "No dia seguinte, a aula prática foi sobre controle básico.",
      "Os alunos foram levados a um arena ao ar livre, com chão de pedra e bancadas que podiam acomodar centenas de espectadores. Mirella estava lá, junto com outros instrutores.",
      "\"Hoje vamos avaliar o nível de controle de cada um\" — ela anunciou. \"Formem uma fila. Quando eu chamar seu nome, venha à frente e demonstre o que consegue fazer.\"",
      "Grazielly observou seus colegas. A maioria conseguia coisas simples — fazer uma chama aparecer, mover pequenas pedras, criar uma brisa. Nada impressionante.",
      "\"Elainy de Kaelor.\"",
      "Uma garota se destacou da fila. Ela era alta, de cabelos vermelhos como fogo e olhos âmbar que pareciam queimar. Seu rosto era sério, quase severo, e ela caminhou até o centro da arena com a confiança de alguém que sabe exatamente quem é.",
      "\"Fogo\" — ela disse simplesmente, e estendeu a mão.",
      "O que aconteceu depois deixou Grazielly sem fôlego. Não era apenas uma chama — era uma explosão controlada de fogo que tomou a forma de uma fênix, asas abertas, olhos flamejantes. A fênix de fogo pairou no ar por um momento antes de se dissipar em centelhas douradas.",
      "\"Muito bem, Elainy\" — Mirella disse, mas havia uma tensão em sua voz. \"Controle de nível três. Excelente.\"",
      "Os alunos murmuraram, impressionados. Elainy voltou para a fila sem sorrir, sem sequer olhar para os outros.",
      "\"Grazielly de Thornhaven.\"",
      "Grazielly avançou, nervosa. Suas mãos ainda estavam um pouco frias do incidente da noite anterior.",
      "\"Gelo\" — ela disse, tentando soar confiante.",
      "Ela se concentrou na sensação que conhecia — aquele frio que vinha de dentro, não de fora. Devagar, gelo começou a se formar ao redor de suas mãos. Depois, seus braços. E então, sem que ela quisesse, o gelo se espalhou pelo chão, subiu pelas paredes da arena, criou cristais que brilhavam como diamantes.",
      "Grazielly tentou parar. Mas não conseguia. O gelo continuava crescendo, expandindo, tomando forma de algo que parecia uma grande flor congelada.",
      "\"PARE!\" — Mirella gritou.",
      "Grazielly finalmente conseguiu quebrar a concentração. O gelo parou de crescer, mas os danos estavam feitos — metade da arena estava coberta de cristais de gelo.",
      "\"Isso...\" — Mirella disse, os olhos arregalados. \"Isso não é nível três. Isso é...\"",
      "\"Descontrole\" — uma voz fria interrompeu. Elainy tinha se aproximado. \"Poder sem controle não é poder. É perigo.\"",
      "Grazielly sentiu o rosto queimar de vergonha.",
      "\"Eu ainda estou aprendendo\" — ela disse, tentando defender-se.",
      "\"Alguns nunca aprendem\" — Elainy respondeu. \"Poder demais, controle de menos. Você vai ser um problema para esta Academia.\"",
      "\"CHEGA!\" — Mirella interveio. \"Elainy, volte para o seu lugar. Grazielly, venha comigo.\"",
      "Grazielly seguiu a professora para fora da arena, sentindo os olhos de todos nas costas.",
      "\"Não se preocupe, querida\" — Mirella disse gentilmente. \"Poder bruto é uma bênção. Você só precisa aprender a controlá-lo.\"",
      "\"Mas Elainy disse —\"",
      "\"Elainy tem suas próprias batalhas. Não deixe que as palavras dela o magoem.\" — Mirella sorriu. \"Agora, temos muito trabalho a fazer. Você precisa de treinamento especial.\"",
      "Grazielly assentiu. Mas no fundo, ela sabia que Elainy estava certa sobre uma coisa.",
      "Poder sem controle era perigoso. E ela tinha muito poder."
    ]
  },
  {
    title: "Capítulo 9 — Noah, o Menino Sem Elemento",
    content: [
      "Três semanas depois, Grazielly ainda estava lutando com o controle.",
      "O treinamento especial era exaustivo — horas de meditação, exercícios de respiração, e tentativas frustradas de fazer o gelo obedecer. Mirella era paciente, mas Grazielly podia ver a preocupação crescendo nos olhos da professora.",
      "Uma tarde, depois de outra sessão desastrosa onde Grazielly congelou acidentalmente meio lago de treinamento, ela se sentou sozinha em um banco do jardim, frustrada.",
      "\"Você está fazendo errado.\"",
      "Grazielly levantou os olhos. Era Noah, o garoto Silentis da carruagem. Ele estava segurando um caderno cheio de anotações e diagramas.",
      "\"O que você sabe? Você nem tem elemento.\"",
      "\"Eu sei física. E termodinâmica. E a teoria por trás do Aethra.\" — ele se sentou ao lado dela, sem pedir permissão. \"O problema é que você está lutando contra seu poder. Você deveria trabalhar com ele.\"",
      "\"Fácil falar. Como?\"",
      "Noah abriu o caderno, mostrando um diagrama complexo.",
      "\"Gelo é água + temperatura baixa + estrutura molecular. Você não está apenas resfriando as coisas — está reorganizando moléculas. Isso requer precisão, não força.\"",
      "\"Precisão?\" — Grazielly olhou o diagrama, confusa. \"Eu não entendo nada disso.\"",
      "\"Porque ninguém te explicou. A Academia ensina pelo método antigo — intuição e prática. Mas existem métodos mais... científicos.\"",
      "Ele começou a explicar. Moléculas. Estrutura cristalina. A relação entre temperatura e movimento. Grazielly não entendeu tudo, mas algo fez sentido.",
      "\"Então eu não preciso forçar o gelo a aparecer? Eu preciso... guiar as moléculas?\"",
      "\"Exatamente. Você é um maestro, não um garçom. Não carrega o gelo — você o conduz.\"",
      "Grazielly tentou. Fechou os olhos, imaginou as moléculas de água no ar, visualizou-as desacelerando, se organizando em padrões. Devagar, uma pequena flor de gelo se formou na palma de sua mão — perfeita, controlada, estável.",
      "\"Eu consegui!\" — ela exclamou.",
      "\"Interessante\" — Noah murmurou, anotando algo. \"Sua taxa de aprendizado é mais rápida quando o método é explicado logicamente. Isso sugere que seu Aethra responde melhor a compreensão do que a intuição.\"",
      "\"Obrigada, Noah. De verdade.\"",
      "\"Não agradeça. Foi um experimento.\" — ele fechou o caderno. \"Eu preciso entender como o Aethra funciona. Como eu não tenho elemento, preciso estudar os outros.\"",
      "\"Por que você não tem elemento?\"",
      "\"Nasci assim. Silentis. Aethra adormecido.\" — ele deu de ombros. \"Minha família achava que eu era inútil. Por isso me mandaram para a Academia — esperam que eu encontre um jeito de despertar.\"",
      "\"Você vai encontrar.\"",
      "\"Talvez. Ou talvez eu me torne útil de outra forma.\" — ele se levantou. \"Continue praticando. E tente não congelar mais nenhum lago.\"",
      "Grazielly sorriu. Pela primeira vez em semanas, ela sentiu esperança.",
      "Talvez o controle não fosse impossível. Ela só precisava da abordagem certa."
    ]
  },
  {
    title: "Capítulo 10 — Mirella, a Tutora Gentil",
    content: [
      "Os meses passaram, e o Torneio de Iniciação se aproximava.",
      "Grazielly melhorou muito com a ajuda de Noah. Seu controle ainda não era perfeito, mas ela podia criar gelo sem destruir meia arena. Era um começo.",
      "Mirella a chamou para uma conversa particular uma semana antes do torneio.",
      "\"Grazielly, eu preciso te falar algo.\" — a tutora parecia preocupada. \"Houve discussões sobre você no Conselho.\"",
      "\"Discussões? Sobre o quê?\"",
      "\"Sobre seu nível de poder. Alguns mestres acham que você deveria ser transferida para uma classe avançada. Outros acham que você representa um risco.\"",
      "\"Um risco? Mas eu estou melhorando!\"",
      "\"Eu sei, querida. E eu estou defendendo você.\" — Mirella colocou uma mão no ombro de Grazielly. \"Mas você precisa entender algo. Poder como o seu... desperta interesses. E nem todos os interesses são bons.\"",
      "\"O que isso significa?\"",
      "\"Significa que você precisa ter cuidado. Confie em poucas pessoas. Observe mais do que fala. E, acima de tudo, não revele todo o seu potencial no torneio.\"",
      "\"Por que não?\"",
      "\"Porque\" — Mirella baixou a voz — \"existem aqueles que gostariam de usar você. E quanto menos eles souberem sobre o que você pode fazer, melhor.\"",
      "Grazielly engoliu em seco.",
      "\"A senhora sabe quem é meu pai?\"",
      "Mirella hesitou por um momento longo demais.",
      "\"Não. Eu não sei.\"",
      "Mas Grazielly percebeu — ela estava mentindo.",
      "Naquela noite, Grazielly foi até a biblioteca. Ela precisava de respostas, e se ninguém ia dar a ela, ela mesma ia procurar.",
      "A biblioteca da Academia era enorme — três andares de estantes que pareciam não ter fim. Havia livros sobre tudo: história dos elementos, técnicas de combate, biografias de mestres famosos.",
      "Grazielly foi até a seção de genealogias. Se ela pudesse descobrir que elementos sua família tinha, talvez pudesse descobrir mais sobre seu pai.",
      "Ela procurou \"Thornhaven\" — nada. \"Ayla\" — nada. Ela nem sabia o sobrenome de sua mãe.",
      "Foi então que ela encontrou uma seção diferente. Uma seção que parecia escondida, em uma prateleira no fundo da biblioteca. Os livros ali eram antigos, empoeirados, com títulos que faziam o ar ao redor parecer mais pesado.",
      "Um livro em particular chamou sua atenção. O título estava desbotado, mas ela ainda podia ler:",
      "\"O Canto do Vazio — Registro da Era Primordial.\"",
      "Grazielly abriu o livro. As páginas estavam amareladas, a tinta desbotada. Mas as palavras ainda eram legíveis:",
      "\"No princípio, havia apenas o Vazio. Não era escuridão — era ausência. Não havia onde estar, nem quem ser. Então... algo despertou.\"",
      "Grazielly continuou lendo, fascinada. O livro contava histórias de uma criação antiga — de uma figura chamada Yggorath, a Grande Mãe; de Dez filhos nascidos da luz; de uma traição que partiu os céus.",
      "Mas havia algo estranho. As histórias não faziam sentido completo. Havia lacunas, contradições, passagens que pareciam ter sido rasgadas ou apagadas.",
      "\"O que aconteceu?\" — Grazielly murmurou. \"O que está faltando?\"",
      "Ela não sabia, mas uma coisa era certa: esse livro tinha respostas. Respostas que alguém tinha tentado esconder."
    ]
  },
  {
    title: "Capítulo 11 — O Livro Antigo na Biblioteca",
    content: [
      "\"O que você está lendo?\"",
      "Grazielly quase deixou o livro cair. Ela se virou e viu Noah parado atrás dela, uma pilha de livros nos braços.",
      "\"Nada. Apenas... um livro antigo.\"",
      "Noah olhou para o título e seus olhos se estreitaram.",
      "\"O Canto do Vazio. Esse livro está na lista de proibidos. Como você encontrou?\"",
      "\"Proibidos? Mas estava na prateleira normal.\"",
      "\"Não estava.\" — Noah colocou seus livros na mesa. \"Eu conheço essa biblioteca melhor do que os bibliotecários. Esse livro deveria estar na Seção Restrita.\"",
      "\"Por que é proibido?\"",
      "\"Não sei. Nunca consegui acesso.\" — Noah abriu o livro, olhando as páginas com fascinação. \"Mas dizem que contém a verdade sobre a criação do mundo. Uma verdade que a Academia não quer que os alunos saibam.\"",
      "\"Que verdade?\"",
      "Noah leu em voz alta:",
      "\"E dos Dez, um se voltou contra os outros. Não por maldade — por algo mais profundo. Por algo que os textos antigos não ousam nomear.\"",
      "Ele fez uma pausa.",
      "\"Interessante. A versão oficial diz que os Dez eram todos corruptos. Mas esse livro sugere algo diferente.\"",
      "\"Quem são os Dez?\" — Grazielly perguntou.",
      "\"Ninguém sabe ao certo. A história diz que eram 'filhos da luz' criados por Yggorath. Mas os nomes foram perdidos.\"",
      "Grazielly folheou o livro, procurando mais informações. Mas as lacunas eram frustrantes. Cada vez que parecia haver uma resposta, a página seguinte estava rasgada ou ilegível.",
      "\"Alguém não quer que a verdade seja conhecida\" — ela murmurou.",
      "\"Ou alguém quer que a verdade seja descoberta apenas pelos dignos.\" — Noah sugeriu. \"Talvez as lacunas sejam intencionais.\"",
      "\"Por que alguém faria isso?\"",
      "\"Porque conhecimento é poder. E poder em mãos erradas...\" — Noah não completou a frase.",
      "Grazielly olhou para o livro, depois para Noah.",
      "\"Você pode me ajudar a entender isso?\"",
      "\"Eu já disse que não consigo acessar a Seção Restrita.\"",
      "\"Não a seção. O livro.\" — Grazielly tocou a página. \"Você entende teoria. Eu entendo... instinto. Juntos, talvez possamos preencher as lacunas.\"",
      "Noah hesitou por um momento. Então um pequeno sorriso apareceu em seu rosto — a primeira expressão que não era analítica ou distante que Grazielly tinha visto nele.",
      "\"Isso seria... um experimento interessante.\"",
      "\"Vamos chamar de parceria.\"",
      "\"Vamos chamar de investigação.\"",
      "Eles se olharam por um momento, e Grazielly sentiu que tinha encontrado algo valioso — não no livro, mas na pessoa ao seu lado.",
      "Pela primeira vez desde que chegou à Academia, ela não estava sozinha."
    ]
  },
  {
    title: "Capítulo 12 — O Canto do Vazio",
    content: [
      "O livro era mais misterioso do que Grazielly imaginava.",
      "Nas noites seguintes, ela e Noah se encontravam na biblioteca — sempre em horários diferentes, sempre em cantos diferentes — para estudar o livro proibido.",
      "\"O Canto do Vazio não é um livro comum\" — Noah explicou. \"Ele muda. As páginas se reorganizam. As histórias se adaptam.\"",
      "\"Como isso é possível?\"",
      "\"Aethra. O livro foi criado por alguém com poder de memória. Ele registra não apenas palavras, mas a essência do que foi.\"",
      "\"Mas por que está incompleto?\"",
      "\"Porque a memória do mundo está incompleta.\" — Noah virou uma página. \"Alguém apagou partes da história. E esse alguém tinha poder suficiente para afetar até mesmo um artefato como este.\"",
      "Grazielly leu um treco em voz alta:",
      "\"Yggorath, a Grande Mãe, criou os Dez de sua própria luz. Eram eles: [ILEGÍVEL], [ILEGÍVEL], [ILEGÍVEL]... e o Décimo, cujo nome não pode ser pronunciado.\"",
      "\"Os nomes foram apagados\" — ela disse. \"Todos os nomes.\"",
      "\"Exceto um que não pode ser pronunciado. Interessante.\" — Noah anotou algo. \"Isso sugere que o Décimo era diferente dos outros. Mais perigoso, talvez.\"",
      "Eles continuaram lendo. O livro contava a história da criação — de como Yggorath tinha formado o mundo, dado vida aos elementos, criado os Dez como guardiões. E então, algo tinha dado errado.",
      "\"A Fratura\" — Grazielly leu. \"Os textos não concordam sobre o que aconteceu. Alguns dizem que um dos Dez traiu. Outros dizem que todos caíram. Outros ainda dizem que a própria Yggorath...\" — a frase terminava no meio da página, e o resto estava rasgado.",
      "\"Que Yggorath o quê?\" — Noah perguntou.",
      "\"Não diz. Mas parece importante.\"",
      "Eles chegaram a uma seção sobre algo chamado \"O Fruto\".",
      "\"Antes de partir, Yggorath criou o Fruto da Existência. Um poder infinito, capaz de moldar a realidade. Mas o Fruto foi [RASGADO]. Alguns dizem que foi destruído. Outros dizem que foi escondido. Outros dizem que [ILEGÍVEL].\"",
      "\"Fruto da Existência?\" — Grazielly olhou para Noah. \"O que é isso?\"",
      "\"Nunca ouvi falar. Mas 'moldar a realidade' é um poder extraordinário.\" — Noah parecia fascinado. \"Se algo assim existe, haveria muitos interessados em encontrá-lo.\"",
      "\"Por isso esconderam a verdade?\"",
      "\"Talvez. Ou talvez haja outra razão.\"",
      "Grazielly fechou o livro, sua mente girando com perguntas.",
      "\"Noah, o que você acha que está acontecendo? Por que a Academia esconderia isso?\"",
      "Noah ficou em silêncio por um momento.",
      "\"Eu não sei, Grazielly. Mas eu sei uma coisa: se eles esconderam, é porque temem o que acontece se as pessoas descobrirem.\"",
      "\"Descobrirem o quê?\"",
      "\"A verdade. Toda a verdade. Sobre Yggorath, sobre os Dez, sobre o Fruto.\" — Noah olhou para ela com seriedade. \"E talvez... sobre você.\"",
      "\"Sobre mim? O que eu tenho a ver com isso?\"",
      "\"Eu não sei. Mas você tem um poder raro. Seus sonhos são incomuns. E você encontrou este livro como se ele quisesse ser encontrado.\"",
      "Grazielly não respondeu. Ela não tinha respostas — apenas perguntas. E as perguntas estavam ficando mais pesadas a cada dia."
    ]
  },
  {
    title: "Parte III: Perguntas e Sombras",
    isPart: true,
    content: []
  },
  {
    title: "Capítulo 13 — Contradições na História",
    content: [
      "O Torneio de Iniciação estava a apenas dois dias de distância, mas Grazielly mal conseguia se concentrar.",
      "As contradições no Canto do Vazio a atormentavam. Cada página revelava mais perguntas do que respostas. E quanto mais ela lia, mais sentia que havia algo errado com a história oficial.",
      "\"Você parece distraída\" — Tanya comentou durante o café da manhã.",
      "\"Estou bem. Apenas nervosa para o torneio.\"",
      "\"Você vai ficar bem. Noah está te ajudando, não está?\"",
      "Grazielly quase engasgou.",
      "\"Como você sabe?\"",
      "\"Eu vejo coisas. Vocês dois sempre desaparecem ao mesmo tempo.\" — Tanya deu de ombros. \"Não se preocupa, não vou contar. Mas tenha cuidado. Segredos são perigosos aqui.\"",
      "Naquela tarde, Grazielly foi até a aula de história. O professor, um homem idoso chamado Mestre Aldric, estava falando sobre as eras antigas.",
      "\"A Era Primordial terminou com a partida de Yggorath\" — ele explicou. \"Ela deixou para trás os Serphyens — guardiões dos elementos — para proteger o mundo.\"",
      "\"Professor\" — uma aluna levantou a mão. \"Por que Yggorath partiu?\"",
      "\"Os registros não são claros. Alguns dizem que ela se cansou do mundo. Outros dizem que teve que partir por razões maiores.\"",
      "\"Mas o que são os Serphyens, exatamente?\"",
      "\"Os Serphyens são... guardiões. Cada um representa um aspecto dos elementos. Existem dez no total, embora raramente sejam vistos.\"",
      "Grazielly levantou a mão.",
      "\"Professor, os Serphyens têm relação com os Dez mencionados nos textos antigos?\"",
      "A sala ficou em silêncio. Mestre Aldric olhou para Grazielly com uma expressão que ela não conseguiu ler.",
      "\"Onde você ouviu falar dos Dez?\"",
      "\"Eu... em um livro. Na biblioteca.\"",
      "\"Que livro?\"",
      "\"O Canto do Vazio.\"",
      "O rosto de Mestre Aldric mudou. Por um momento, pareceu preocupado — até assustado.",
      "\"Esse livro não deve ser lido por alunos. Ele contém... interpretações incorretas. Histórias distorcidas.\"",
      "\"Mas professor, se as histórias estão distorcidas, por que não corrigi-las? Por que não contar a verdade?\"",
      "\"PORQUE A VERDADE É PERIGOSA!\" — Mestre Aldric gritou, e a sala inteira estremeceu. Ele percebeu o que tinha feito e recuperou a compostura. \"Desculpem. A aula está encerrada.\"",
      "Grazielly saiu da sala com as mãos tremendo. O professor tinha medo. Medo genuíno.",
      "\"O que está acontecendo aqui?\" — ela sussurrou para si mesma.",
      "Noah a encontrou no corredor.",
      "\"Eu ouvi. Você foi longe demais.\"",
      "\"Eu só fiz uma pergunta.\"",
      "\"Uma pergunta sobre algo que ninguém quer que seja questionado.\" — Noah olhou ao redor, certificando-se de que ninguém estava ouvindo. \"Grazielly, você precisa ter mais cuidado. Há pessoas observando.\"",
      "\"Quem?\"",
      "\"Eu não sei. Mas desde que começamos a ler o livro, notei... sombras. Movimentos. Como se alguém estivesse nos seguindo.\"",
      "Grazielly sentiu um arrepio.",
      "\"Acha que a Academia está nos vigiando?\"",
      "\"Ou alguém dentro dela.\"",
      "Eles se olharam em silêncio. Pela primeira vez, Grazielly sentiu o peso do que estavam fazendo.",
      "Eles não estavam apenas lendo um livro proibido. Estavam desenterrando segredos que alguém tinha trabalhado muito para enterrar."
    ]
  },
  {
    title: "Capítulo 14 — Quem Foram os Dez?",
    content: [
      "Na noite antes do torneio, Grazielly não conseguiu dormir.",
      "Ela foi até a biblioteca, esperando que Noah estivesse lá. Ele estava — sentado no canto habitual, o Canto do Vazio aberto à sua frente.",
      "\"Eu descobri algo\" — ele disse quando ela se aproximou. \"Os Dez não eram guardiões.\"",
      "\"O que?\"",
      "\"Os textos dizem que eram 'filhos da luz', mas há outra interpretação. Aqui.\" — ele apontou para uma passagem que Grazielly não tinha notado antes. \"Os Dez foram 'rejeitados pelo Vazio'. Não nasceram da luz — foram expulsos para a luz.\"",
      "\"Expulsos? De onde?\"",
      "\"De algum lugar... pior. De um lugar entre a existência e a não-existência.\"",
      "Grazielly leu a passagem várias vezes, tentando entender.",
      "\"Então os Dez não eram bons? Eram... exilados?\"",
      "\"Isso explicaria a traição. Eles nunca foram leais a Yggorath. Eles a usaram.\"",
      "\"Mas o livro diz que Yggorath os criou. Como ela poderia criar algo que já existia?\"",
      "\"Essa é a contradição.\" — Noah fechou o livro. \"Grazielly, e se a história que conhecemos estiver completamente errada? E se Yggorath não criou os Dez — e se ela os aprisionou?\"",
      "\"Aprisionou?\"",
      "\"No plano material. Longe de onde quer que eles estivessem antes.\"",
      "Grazielly sentiu a cabeça girar. Era muita informação, muitas possibilidades.",
      "\"Por que ninguém nos conta isso?\"",
      "\"Porque conhecimento é perigoso. Se as pessoas soubessem que os Dez eram... algo pior... poderiam perder a fé. Poderiam questionar tudo.\"",
      "\"Mas não é melhor saber a verdade?\"",
      "\"Para alguns, sim. Para outros, a verdade é mais assustadora que qualquer mentira.\"",
      "Noah se levantou.",
      "\"Você precisa descansar. O torneio é amanhã.\"",
      "\"Como posso descansar sabendo de tudo isso?\"",
      "\"Você não tem escolha. Se não passar no torneio, será expulsa. E se for expulsa, nunca vai descobrir a verdade.\"",
      "Grazielly assentiu lentamente. Noah tinha razão. Ela precisava vencer o torneio — não pelo orgulho, mas pela oportunidade de continuar buscando respostas.",
      "\"E depois?\" — ela perguntou.",
      "\"Depois, continuamos. Até descobrirmos tudo.\"",
      "\"E se descobrirmos algo que não queremos saber?\"",
      "Noah ficou em silêncio por um momento.",
      "\"Então lidamos com isso. Juntos.\"",
      "Grazielly voltou ao dormitório, mas não dormiu. Ela ficou acordada, olhando para o teto, pensando nos Dez, em Yggorath, no Fruto, em seu pai, em sua mãe, em tudo que estava escondido.",
      "O torneio era amanhã. E depois dele, nada seria igual."
    ]
  },
  {
    title: "Capítulo 15 — Sonhos Mais Fortes",
    content: [
      "O torneio começou ao nascer do sol.",
      "Grazielly estava nervosa, mas concentrada. Noah tinha revisado com ela todas as técnicas de controle que tinham praticado. Mirella tinha lhe dado um conselho final:",
      "\"Não mostre tudo. Guarde algo para quando precisar.\"",
      "A arena estava cheia — alunos, professores, e figuras misteriosas em vestes escuras que Grazielly não reconheceu. Observadores do Conselho, talvez. Ou algo mais.",
      "A primeira rodada foi simples: demonstrar controle básico. Grazielly criou uma estrutura de gelo elegante, precisando manter sua forma por um minuto. Ela conseguiu, embora tenha sentido o poder querer explodir várias vezes.",
      "A segunda rodada era combate — não para ferir, mas para demonstrar habilidade. Grazielly foi colocada contra um garoto do elemento Terra.",
      "\"Comecem!\" — o árbitro anunciou.",
      "O garoto lançou pedras rapidamente. Grazielly congelou-as no ar, uma por uma, depois criou uma barreira de gelo quando ele tentou um ataque mais forte. Finalmente, ela avançou, criando uma rampa de gelo sob os pés dele, desequilibrando-o.",
      "\"Vitória: Grazielly de Thornhaven!\"",
      "A terceira rodada foi mais difícil. Ela enfrentou uma garota do elemento Vento que era rápida demais. Grazielly mal conseguia acompanhá-la. Mas então ela se lembrou das palavras de Noah:",
      "\"Você é um maestro, não um garçom.\"",
      "Em vez de perseguir a garota, Grazielly criou uma névoa congelada que se espalhou pela arena. A garota não podia ver — e Grazielly podia sensear onde o gelo estava.",
      "\"Vitória: Grazielly de Thornhaven!\"",
      "A final foi contra Elainy.",
      "As duas se encararam no centro da arena. Elainy tinha um sorriso confiante.",
      "\"Vamos ver se você aprendeu algo.\"",
      "\"Eu aprendi o suficiente.\"",
      "Elainy atacou primeiro — uma onda de fogo que derreteria aço. Grazielly criou um escudo de gelo, mas o fogo era intenso demais. O gelo derretia mais rápido do que ela podia recriar.",
      "\"Isso é tudo?\" — Elainy zombou.",
      "Grazielly não respondeu. Ela se concentrou, lembrando as lições de Noah, a calma de Mirella, as palavras do Canto do Vazio. E então ela fez algo que nunca tinha tentado antes.",
      "Em vez de lutar contra o fogo, ela absorveu o calor. Não todo — apenas o suficiente para criar um vácuo frio ao redor de Elainy. As chamas da rival vacilaram, privadas do oxigênio.",
      "\"O que —\" Elainy começou, surpresa.",
      "Grazielly não perdeu a oportunidade. Ela criou uma corrente de gelo ao redor dos pulsos de Elainy, prendendo-a no lugar.",
      "\"Vitória: Grazielly de Thornhaven!\"",
      "A arena explodiu em aplausos. Mas Grazielly mal ouviu. Seus olhos estavam fixos em uma figura encapuzada nas bancadas — a mesma figura sem rosto de seus sonhos.",
      "Ela piscou, e a figura desapareceu.",
      "\"Grazielly!\" — Tanya correu para abraçá-la. \"Você venceu! Você realmente venceu!\"",
      "\"Eu... sim.\" — Grazielly respondeu automaticamente, mas sua mente estava longe.",
      "Quem era aquela figura? Por que estava em seus sonhos? E por que apareceu agora, no momento de sua vitória?",
      "Pela primeira vez, Grazielly percebeu que sua jornada era apenas o começo. E que o caminho à frente seria muito mais perigoso do que ela imaginava."
    ]
  },
  {
    title: "Capítulo 16 — Uma Pergunta à Mãe",
    content: [
      "Uma semana depois do torneio, Grazielly recebeu permissão para visitar casa.",
      "Foi uma surpresa — normalmente os alunos não podiam sair no primeiro ano. Mas Mirella tinha arranjado algo, dizendo que era importante para o \"desenvolvimento emocional\" de Grazielly.",
      "A viagem de volta a Thornhaven pareceu mais curta do que a ida. Grazielly mal percebeu a paisagem passando pela janela da carruagem. Sua mente estava cheia de perguntas que ela precisava fazer.",
      "Quando finalmente chegou, Ayla a esperava na porta. Sua mãe parecia diferente — mais velha, mais cansada, mas também mais... aliviada.",
      "\"Filha!\" — Ayla a abraçou forte. \"Eu soube do torneio. Você venceu!\"",
      "\"Mãe, preciso falar com você.\"",
      "Ayla se afastou, o sorriso desaparecendo.",
      "\"Sobre o que?\"",
      "\"Sobre tudo. Pai, os sonhos, os Dez, o Canto do Vazio —\"",
      "\"Como você sabe sobre os Dez?\" — o rosto de Ayla ficou pálido.",
      "\"Eu encontrei um livro. Na biblioteca da Academia.\"",
      "\"Grazielly, eu te disse para não —\"",
      "\"Não procurar meu pai. Eu sei. Mas isso não é sobre ele. É sobre mim.\" — Grazielly olhou firmemente para a mãe. \"Mãe, o que está acontecendo? Quem sou eu? Por que tenho esses sonhos? Por que meu poder é diferente?\"",
      "Ayla se sentou, as mãos tremendo.",
      "\"Eu não posso te contar tudo. Ainda não.\"",
      "\"POR QUÊ?!\" — Grazielly quase gritou. \"Eu tenho direito de saber!\"",
      "\"NÃO TEM!\" — Ayla respondeu, a voz quebrando. \"Você não tem direito de saber porque saber pode te matar!\"",
      "O silêncio que se seguiu foi ensurdecedor.",
      "\"Matar?\" — Grazielly sussurrou.",
      "\"Há pessoas... forças... que não querem que a verdade seja conhecida. E se você descobrir demais, elas vão vir atrás de você.\" — Ayla olhou para a filha com olhos cheios de lágrimas. \"Eu escondi de você para te proteger. Não por maldade, mas por amor.\"",
      "\"Quem são essas pessoas?\"",
      "\"Eu não posso dizer.\"",
      "\"E meu pai? Ele está entre elas?\"",
      "Ayla não respondeu. Mas o silêncio disse tudo.",
      "Grazielly se levantou, o coração acelerado.",
      "\"Eu vou descobrir, mãe. Com ou sem sua ajuda.\"",
      "\"Grazielly, por favor —\"",
      "\"Não.\" — Grazielly se afastou. \"Eu passei a vida inteira sem saber. Eu não vou passar mais um dia assim.\"",
      "Ela saiu de casa, sem olhar para trás. Mas quando atravessou a porta, ela ouviu a voz de Ayla, fraca e desesperada:",
      "\"Ele te amava, Grazielly. Ele te amava tanto que preferiu partir.\"",
      "Grazielly parou por um momento. Depois continuou andando.",
      "Ela tinha descoberto algo importante: seu pai estava vivo. E alguém tinha feito ele partir."
    ]
  },
  {
    title: "Capítulo 17 — Algo se Move nas Sombras",
    content: [
      "Quando Grazielly retornou à Academia, algo tinha mudado.",
      "Não era algo visível — os corredores eram os mesmos, os alunos os mesmos, as aulas as mesmas. Mas havia uma tensão no ar, como se o mundo estivesse prendendo a respiração.",
      "\"Você parece diferente\" — Noah comentou quando eles se encontraram na biblioteca.",
      "\"Eu descobri algo. Sobre meu pai.\"",
      "\"O quê?\"",
      "\"Ele está vivo. E minha mãe sabe onde ele está.\"",
      "Noah absorveu a informação em silêncio.",
      "\"Isso complica as coisas.\"",
      "\"Complica? Eu finalmente tenho uma pista real!\"",
      "\"Sim, mas se ele está escondido, há uma razão. E se sua mãe não quer contar, a razão é grave.\" — Noah abaixou a voz. \"Grazielly, desde que você foi embora, notei coisas. Sombras se movendo. Pessoas me seguindo. Alguém está observando nós.\"",
      "\"Quem?\"",
      "\"Eu não sei. Mas acho que nossa investigação chamou atenção.\"",
      "Grazielly sentiu um arrepio. Ela tinha achado que estava apenas procurando respostas sobre sua própria família. Mas parecia que tinha se envolvido em algo muito maior.",
      "\"O que fazemos agora?\"",
      "\"Continuamos. Mas com mais cuidado.\" — Noah abriu o Canto do Vazio em uma página específica. \"Eu encontrei algo enquanto você estava fora. Uma passagem sobre os Serphyens.\"",
      "\"Os guardiões?\"",
      "\"Sim. Mas o livro diz algo diferente.\" — Noah leu em voz alta: \"E Yggorath criou os Serphyens como fragmentos de si mesma. Não guardiões — extensões. Partes de sua alma que continuariam existindo mesmo após sua partida.\"",
      "\"Fragmentos de Yggorath?\"",
      "\"Isso significa que os Serphyens não são apenas guardiões. Eles são... pedaços de uma deusa.\"",
      "Grazielly tentou processar a informação.",
      "\"Mas o que isso tem a ver comigo?\"",
      "\"Eu não sei ainda. Mas você tem um poder raro, sonhos estranhos, e uma conexão com esse livro. Tudo aponta para algo.\"",
      "\"Para o quê?\"",
      "\"Para a verdade. Sobre você. Sobre o mundo. Sobre tudo.\"",
      "Grazielly fechou os olhos por um momento. A jornada que tinha começado como uma busca por seu pai estava se transformando em algo muito maior.",
      "\"Você vai continuar comigo?\" — ela perguntou.",
      "\"Até o fim.\" — Noah respondeu sem hesitar.",
      "Nesse momento, a porta da biblioteca se abriu. Elainy entrou, seus olhos fixos em Grazielly.",
      "\"Podemos falar?\" — ela perguntou. \"Em particular.\"",
      "Grazielly e Noah trocaram olhares.",
      "\"Está bem.\" — Grazielly se levantou.",
      "Elainy a levou para um canto isolado.",
      "\"Eu observei você.\" — ela disse. \"No torneio, depois do torneio, na biblioteca com aquele livro. Você está procurando algo.\"",
      "\"E se estiver?\"",
      "\"Então você precisa ter cuidado.\" — Elainy disse algo que surpreendeu Grazielly. \"Há forças nesta Academia que não querem que você encontre. E elas são mais perigosas do que você imagina.\"",
      "\"Por que está me avisando?\"",
      "Elainy hesitou.",
      "\"Porque... minha família sabe como é ser perseguida. E porque eu acho que você pode ser a chave para algo maior.\"",
      "\"Chave para o quê?\"",
      "\"Para a verdade. A verdade que foi escondida de todos nós.\""
    ]
  },
  {
    title: "Capítulo 18 — O Caminho se Abre",
    content: [
      "Os meses passaram, e o primeiro ano na Academia chegou ao fim.",
      "Grazielly tinha mudado muito desde sua chegada. Seu controle sobre o gelo tinha melhorado dramaticamente. Sua compreensão do Canto do Vazio tinha se aprofundado. E suas alianças tinham crescido — Noah, o amigo cientista; Tanya, a observadora silenciosa; e, surpreendentemente, Elainy, a rival que se tornou uma aliada improvável.",
      "No último dia do ano letivo, os alunos foram reunidos no Salão Principal para uma cerimônia de encerramento.",
      "\"Vocês completaram o primeiro ano\" — Mestre Varian anunciou. \"Mas a jornada de vocês apenas começou. Nos anos que virão, vocês vão descobrir não apenas seus poderes, mas também a si mesmos. E vão entender que o verdadeiro poder não está no que vocês podem fazer — está no que vocês escolhem fazer.\"",
      "Grazielly quase não ouviu as palavras. Sua mente estava no futuro — nas perguntas não respondidas, nas verdades não reveladas.",
      "Depois da cerimônia, ela encontrou Noah perto do lago.",
      "\"Pronto para o próximo ano?\" — ela perguntou.",
      "\"Sempre.\" — ele respondeu. \"E o Canto do Vazio?\"",
      "\"Ainda há muito para descobrir. Os Dez, o Fruto, Yggorath... e meu pai.\"",
      "\"Nós vamos descobrir. Juntos.\"",
      "Grazielly olhou para o céu, onde as estrelas começavam a aparecer.",
      "\"Noah, você acha que a verdade vai ser difícil de aceitar?\"",
      "\"Provavelmente. As verdades mais importantes sempre são.\"",
      "\"Mas ainda vale a pena procurar?\"",
      "Noah ficou em silêncio por um momento.",
      "\"Grazielly, eu passei a vida inteira sendo chamado de inútil porque não tinha elemento. A Academia me deu uma chance quando ninguém mais deu. Mas foi você que me mostrou que eu tinha valor — que minha inteligência podia fazer diferença.\"",
      "Ele olhou para ela.",
      "\"Então sim, vale a pena. Porque a verdade não é apenas sobre descobrir algo. É sobre descobrir quem somos.\"",
      "Grazielly sorriu.",
      "\"Então vamos descobrir.\"",
      "Longe, nas sombras, uma figura observava. Não era a figura sem rosto dos sonhos — era algo diferente. Algo que observava e esperava.",
      "\"Em breve\" — uma voz sussurrou. \"Em breve, tudo será revelado.\"",
      "Grazielly não ouviu. Ela estava olhando para as estrelas, sonhando com o futuro.",
      "Mas o futuro estava olhando de volta.",
      "E quando os dois se encontrassem, nada seria igual."
    ]
  }
];

async function createBook() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Times New Roman", size: 24 }
        }
      },
      paragraphStyles: [
        {
          id: "Title",
          name: "Title",
          basedOn: "Normal",
          run: { size: 56, bold: true, color: "1a1a2e", font: "Times New Roman" },
          paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER }
        },
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 32, bold: true, color: "16213e", font: "Times New Roman" },
          paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 28, bold: true, color: "0f3460", font: "Times New Roman" },
          paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
        },
        {
          id: "PartTitle",
          name: "Part Title",
          basedOn: "Normal",
          run: { size: 36, bold: true, italics: true, color: "1a1a2e", font: "Times New Roman" },
          paragraph: { spacing: { before: 600, after: 400 }, alignment: AlignmentType.CENTER }
        }
      ]
    },
    sections: [
      // Cover Page Section
      {
        properties: {
          page: {
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
          }
        },
        children: [
          new Paragraph({ spacing: { before: 6000 }, children: [] }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({ text: "ALYNDRAS", size: 72, bold: true, color: "1a1a2e", font: "Times New Roman" })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━", size: 28, color: "0f3460", font: "Times New Roman" })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
            children: [
              new TextRun({ text: "Livro I", size: 36, italics: true, color: "16213e", font: "Times New Roman" })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: "O CANTO DO VAZIO", size: 48, bold: true, color: "0f3460", font: "Times New Roman" })
            ]
          }),
          new Paragraph({ spacing: { before: 4000 }, children: [] }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Daniel", size: 28, italics: true, color: "333333", font: "Times New Roman" })
            ]
          })
        ]
      },
      // TOC Section
      {
        properties: {
          page: {
            margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: "Alyndras — O Canto do Vazio", italics: true, size: 20, color: "666666", font: "Times New Roman" })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "— ", size: 20, font: "Times New Roman" }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 20, font: "Times New Roman" }),
                  new TextRun({ text: " —", size: 20, font: "Times New Roman" })
                ]
              })
            ]
          })
        },
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: "Sumário", font: "Times New Roman" })]
          }),
          new TableOfContents("Sumário", {
            hyperlink: true,
            headingStyleRange: "1-2"
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200 },
            children: [
              new TextRun({ text: "Nota: Clique com o botão direito no Sumário e selecione 'Atualizar Campo' para visualizar os números de página corretos.", size: 18, color: "999999", italics: true, font: "Times New Roman" })
            ]
          }),
          new Paragraph({ children: [new PageBreak()] }),
          // Book Content
          ...generateContent()
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('/home/z/my-project/download/Alyndras_Livro1_O_Canto_do_Vazio.docx', buffer);
  console.log('Book created successfully!');
}

function generateContent() {
  const content = [];
  
  for (const chapter of chapters) {
    if (chapter.isPart) {
      // Part title
      content.push(
        new Paragraph({
          style: "PartTitle",
          children: [new TextRun({ text: chapter.title, font: "Times New Roman" })]
        })
      );
    } else {
      // Chapter title
      content.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: chapter.title, font: "Times New Roman" })]
        })
      );
      
      // Chapter content
      for (const para of chapter.content) {
        content.push(
          new Paragraph({
            spacing: { line: 312, after: 200 },
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 480 },
            children: [new TextRun({ text: para, size: 24, font: "Times New Roman" })]
          })
        );
      }
      
      // Add spacing after chapter
      content.push(new Paragraph({ spacing: { after: 400 }, children: [] }));
    }
  }
  
  return content;
}

createBook().catch(console.error);
