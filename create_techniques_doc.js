const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer, 
        AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType, 
        VerticalAlign, PageNumber, PageBreak, TableOfContents } = require('docx');
const fs = require('fs');

// Colors - Ink & Zen palette
const colors = {
  primary: "0B1220",
  body: "0F172A",
  secondary: "2B2B2B",
  accent: "9AA6B2",
  tableBg: "F1F5F9",
  headerBg: "E2E8F0"
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: colors.accent };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// Helper function for creating styled paragraphs
const createParagraph = (text, options = {}) => {
  return new Paragraph({
    alignment: options.alignment || AlignmentType.JUSTIFIED,
    spacing: { line: 312, before: options.before || 0, after: options.after || 120 },
    indent: options.indent ? { firstLine: 480 } : undefined,
    children: [new TextRun({ text, size: 22, font: "Times New Roman", ...options.textOptions })]
  });
};

// Helper for table cells
const createCell = (content, options = {}) => {
  const children = Array.isArray(content) ? content : [
    new Paragraph({
      alignment: options.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      spacing: { line: 276 },
      children: [new TextRun({ text: content, size: 20, font: "Times New Roman", ...options.textOptions })]
    })
  ];
  return new TableCell({
    borders: cellBorders,
    width: { size: options.width || 3000, type: WidthType.DXA },
    shading: { fill: options.fill || "FFFFFF", type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children
  });
};

// Create header cell
const createHeaderCell = (text, width) => createCell(text, { width, fill: colors.headerBg, center: true, textOptions: { bold: true, size: 20 } });

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: colors.body, font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-1", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-2", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-3", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-4", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-5", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-6", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-7", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    // CAPA
    {
      properties: { page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } } },
      children: [
        new Paragraph({ spacing: { before: 6000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "UNIVERSO DE ALYNDRAS", size: 72, bold: true, color: colors.primary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "HIERARQUIA COMPLETA DE TÉCNICAS", size: 48, bold: true, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Do Básico ao Divino", size: 32, italics: true, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 4000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Sistema de Aethra & Stigmas", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Versão 7.0", size: 20, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // SUMÁRIO E CONTEÚDO
    {
      properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: {
        default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Universo de Alyndras - Hierarquia de Técnicas", size: 18, color: colors.accent, font: "Times New Roman" })] })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "— ", size: 18, font: "Times New Roman" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Times New Roman" }), new TextRun({ text: " —", size: 18, font: "Times New Roman" })] })] })
      },
      children: [
        // SUMÁRIO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Sumário")] }),
        new TableOfContents("Sumário", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 400 },
          children: [new TextRun({ text: "Nota: Clique com o botão direito no sumário e selecione 'Atualizar Campo' para corrigir os números de página.", size: 18, color: "999999", font: "Times New Roman", italics: true })]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // INTRODUÇÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Introdução ao Sistema de Técnicas")] }),
        createParagraph("O universo de Alyndras possui um sistema complexo e hierarquizado de técnicas espirituais fundamentado na manipulação de Aethra, a energia que conecta o plano quântico ao material. Este sistema foi desenvolvido ao longo de milênios, desde a Era Primordial da civilização Aetherion até a Era de Grazielly, passando por diversas refinamentos e adaptações que moldaram a forma como os seres manipulam os elementos e a própria realidade.", { indent: true }),
        createParagraph("A hierarquia de técnicas não é meramente uma classificação de poder, mas reflete o profundo entendimento que cada nível proporciona sobre a natureza da existência. As técnicas básicas ensinam o controle fundamental do fluxo de Aethra através do corpo, enquanto as técnicas divinas permitem manipular as próprias leis que governam a realidade. Cada nível representa não apenas maior poder, mas também maior compreensão e responsabilidade sobre como a energia espiritual interage com o tecido da existência.", { indent: true }),
        createParagraph("O domínio de técnicas avançadas requer não apenas talento nato, mas décadas de dedicação intensiva, experiência em combate real, e frequentemente, orientação de mestres que já percorreram o caminho. A maioria dos praticantes jamais ultrapassa o nível intermediário, enquanto apenas uma fração minúscula alcança técnicas de nível GM ou superior. Técnicas primordiais e divinas são consideradas lendas para a maioria da população, existindo apenas em registros fragmentados ou na memória de entidades imortais.", { indent: true }),

        // NÍVEIS DE CLASSIFICAÇÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Níveis de Classificação")] }),
        createParagraph("A hierarquia técnica de Alyndras é organizada em oito níveis principais, cada um representando um degrau significativo em poder, complexidade e raridade. Esta estrutura foi estabelecida durante a Era dos Seraphyens e permanece como padrão reconhecido em todo o planeta Aetherion, sendo ensinada nas academias de combate e reverenciada pelos conselhos regionais.", { indent: true }),

        // Tabela de Níveis
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1800, 2200, 2800, 2560],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                createHeaderCell("Nível", 1800),
                createHeaderCell("Usuários", 2200),
                createHeaderCell("Características", 2800),
                createHeaderCell("Raridade", 2560)
              ]
            }),
            new TableRow({ children: [createCell("Básico", { width: 1800, center: true }), createCell("Estudantes, Cidadãos", { width: 2200 }), createCell("Controle elemental rudimentar", { width: 2800 }), createCell("Comum (90%+)", { width: 2560, center: true })] }),
            new TableRow({ children: [createCell("Acadêmico", { width: 1800, center: true }), createCell("Soldados, Guardas", { width: 2200 }), createCell("Técnicas padronizadas de combate", { width: 2800 }), createCell("Frequente (60%)", { width: 2560, center: true })] }),
            new TableRow({ children: [createCell("Stigma Inicial", { width: 1800, center: true }), createCell("Guerreiros, Mercenários", { width: 2200 }), createCell("Técnicas seladas, poder elevado", { width: 2800 }), createCell("Incomum (25%)", { width: 2560, center: true })] }),
            new TableRow({ children: [createCell("ADM", { width: 1800, center: true }), createCell("Conselheiros, Líderes", { width: 2200 }), createCell("Domínio regional, liderança", { width: 2800 }), createCell("Raro (8%)", { width: 2560, center: true })] }),
            new TableRow({ children: [createCell("GM", { width: 1800, center: true }), createCell("Grande Mestre", { width: 2200 }), createCell("Poder notável, reconhecido mundialmente", { width: 2800 }), createCell("Muito Raro (3%)", { width: 2560, center: true })] }),
            new TableRow({ children: [createCell("Superior", { width: 1800, center: true }), createCell("Mestres Ancestrais", { width: 2200 }), createCell("Técnicas ancestrais, poder extraordinário", { width: 2800 }), createCell("Extremo (0.5%)", { width: 2560, center: true })] }),
            new TableRow({ children: [createCell("Primordial", { width: 1800, center: true }), createCell("Lendários", { width: 2200 }), createCell("Segredos proibidos, manipulação avançada", { width: 2800 }), createCell("Lendário (<0.01%)", { width: 2560, center: true })] }),
            new TableRow({ children: [createCell("Divino", { width: 1800, center: true }), createCell("Ilios, Nyxalor, Yggorath", { width: 2200 }), createCell("Manipulação absoluta da realidade", { width: 2800 }), createCell("Único", { width: 2560, center: true })] })
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        // 2.1 Nível Básico
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Nível Básico")] }),
        createParagraph("O Nível Básico representa o primeiro contato formal com a manipulação de Aethra e elementos. Neste estágio, os praticantes aprendem a sentir o fluxo de energia através de seu corpo, identificar sua afinidade elemental natural, e executar manifestações simples de seu elemento. A grande maioria da população Ressonante nunca ultrapassa este nível, utilizando suas habilidades apenas para tarefas cotidianas ou autodefesa básica.", { indent: true }),
        createParagraph("As técnicas básicas focam em três pilares fundamentais: sensibilização, ativação e projeção. A sensibilização envolve desenvolver a capacidade de perceber o Aethra fluindo tanto no próprio corpo quanto no ambiente ao redor. A ativação consiste em voluntariamente fazer o Aethra fluir através dos canais energéticos do corpo, enquanto a projeção é a habilidade de direcionar essa energia para fora do corpo físico, manifestando o elemento correspondente à afinidade do indivíduo.", { indent: true }),
        createParagraph("Estudantes deste nível passam meses apenas aprendendo a meditar corretamente e sentir seu Aethra interno. Somente após dominar a sensibilização é que recebem instrução sobre como ativar seu elemento pela primeira vez. A projeção de elemento puro geralmente requer pelo menos um ano de prática consistente, e muitos estudantes abandonam o treinamento antes de alcançar este marco, satisfeitos com melhorias modestas em seus atributos físicos.", { indent: true }),

        // 2.2 Nível Acadêmico
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Nível Acadêmico")] }),
        createParagraph("O Nível Acadêmico é alcançado por aqueles que completam o treinamento formal em uma academia de combate ou instituição militar. Este nível representa a transição de estudante para guerreiro funcional, com técnicas padronizadas que podem ser aplicadas em situações de combate real. Soldados, guardas e mercenários tipicamente operam neste patamar, possuindo técnicas suficientes para cumprir suas funções sem aspirar a grandes feitos heroicos.", { indent: true }),
        createParagraph("As academias de Aethra ensinam um currículo padronizado que inclui técnicas defensivas, ofensivas e de suporte para cada elemento. Este sistema permite que guerreiros de diferentes regiões lutem de forma coordenada, utilizando formas reconhecidas que podem ser combinadas em formação. Um batalhão de soldados acadêmicos pode executar técnicas em uníssono, multiplicando sua eficácia através de sincronização.", { indent: true }),
        createParagraph("O treinamento acadêmico típico dura de três a cinco anos, durante os quais o estudante aprende aproximadamente quinze a vinte técnicas fundamentais. A avaliação final envolve demonstrar proficiência em combate contra múltiplos oponentes, resistência prolongada e execução precisa de todas as técnicas aprendidas. Aqueles que falham podem repetir o treinamento ou aceitar posições subalternas que não requerem combate direto.", { indent: true }),

        // 2.3 Stigma Inicial
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 Nível Stigma Inicial")] }),
        createParagraph("O conceito de Stigma representa uma das mais fascinantes evoluções no sistema de técnicas de Alyndras. Stigmas são técnicas especiais seladas no próprio Aethra do usuário, permitindo acesso a poderes significativamente superiores ao que seu nível de treinamento normalmente permitiria. Existem Stigmas hereditários, passados através de linhagens familiares, e Stigmas adquiridos, conquistados através de provações ou rituais específicos.", { indent: true }),
        createParagraph("Os Stigmas Iniciais são aqueles que manifestam naturalmente ou podem ser adquiridos sem requisitos extraordinários. Eles representam um salto qualitativo em relação às técnicas acadêmicas, conferindo aos guerreiros habilidades que os distinguem claramente dos soldados comuns. Um portador de Stigma Inicial é reconhecido como um guerreiro de verdade, capaz de cumprir missões perigosas e enfrentar ameaças que destruiriam um esquadrão de soldados acadêmicos.", { indent: true }),
        createParagraph("A ativação de um Stigma geralmente requer condições específicas: algumas precisam de ativação voluntária com palavras-chave ou gestos, outras respondem a emoções intensas, e algumas poucas estão permanentemente ativas, consumindo uma porção do Aethra do usuário continuamente. O uso excessivo de Stigmas pode drenar completamente o Aethra do usuário, levando à exaustão ou até mesmo à morte, motivo pelo qual seu uso é ensinado com extrema cautela.", { indent: true }),

        // 2.4 Nível ADM
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.4 Nível ADM (Administrativo)")] }),
        createParagraph("O Nível ADM é reservado para conselheiros, líderes regionais e autoridades que governam territórios ou instituições. A sigla deriva de 'Administrativo', refletindo que estes indivíduos não apenas possuem poder de combate, mas também responsabilidade sobre outros seres e recursos. Um ADM é esperado que possa defender seu território sozinho contra ameaças menores e liderar forças contra ameaças maiores.", { indent: true }),
        createParagraph("Técnicas de nível ADM frequentemente incorporam aspectos de liderança e domínio territorial. Alguns podem criar campos de Aethra que afetam áreas extensas, fortalecendo aliados ou enfraquecendo inimigos dentro de sua jurisdição. Outros possuem técnicas de comunicação que permitem coordenar forças distribuídas por vastas distâncias. O poder de um ADM transcende o combate individual, abrangendo a capacidade de comandar e proteger comunidades inteiras.", { indent: true }),
        createParagraph("A promoção ao nível ADM requer não apenas proficiência técnica, mas também demonstração de sabedoria, liderança e serviço à comunidade. Conselhos regionais avaliam candidatos baseando-se em seu histórico de missões completadas, testemunhos de aliados e subordinados, e desempenho em provas específicas que testam tanto poder quanto discernimento. Um ADM falho pode ser destituído por voto de seu conselho ou por intervenção de um Grande Mestre.", { indent: true }),

        // 2.5 Nível GM
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.5 Nível GM (Grande Mestre)")] }),
        createParagraph("O título de Grande Mestre representa o ápice do que um mortal pode alcançar através de treinamento convencional. Apenas doze GMs existem em qualquer momento, cada um governando um dos reinos principais do planeta Aetherion. Um Grande Mestre é reconhecido mundialmente, sua fama atravessando oceanos e continentes. Seu poder é tal que podem alterar o curso de batalhas campais sozinhos, e suas técnicas são estudadas e reverenciadas por guerreiros de todo o mundo.", { indent: true }),
        createParagraph("As técnicas de nível GM são frequentemente únicas, desenvolvidas pelo próprio Grande Mestre ao longo de décadas de dedicação intensiva. Cada GM possui um estilo distintivo que reflete sua personalidade, história e filosofia de combate. Alguns desenvolveram técnicas ofensivas de poder devastador, outros especializaram-se em defesa impenetrável, e outros ainda dominam habilidades de suporte que podem virar o destino de guerras inteiras.", { indent: true }),
        createParagraph("A seleção de um novo Grande Mestre ocorre através do Torneio Sagrado, onde os candidatos mais poderosos competem para demonstrar sua dignidade. O Torneio não é meramente um teste de força, mas avalia também caráter, estratégia e a capacidade de inspirar outros. Um GM deve ser não apenas o mais poderoso, mas também o mais digno de liderar. A tradição dos Doze GMs remonta à Era dos Seraphyens, sendo uma das instituições mais antigas e respeitadas do mundo.", { indent: true }),

        // 2.6 Nível Superior
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.6 Nível Superior (Ancestral)")] }),
        createParagraph("O Nível Superior abrange técnicas ancestrais desenvolvidas por mestres de eras passadas, preservadas em textos sagrados, gravadas em artefatos ou transmitidas através de linhagens especiais. Estas técnicas representam o conhecimento acumulado de civilizações anteriores, frequentemente superando o que mestres contemporâneos conseguem desenvolver independentemente. Uma técnica Superior pode ser relativamente simples em execução mas devastadora em efeito, ou extraordinariamente complexa, requerendo anos apenas para compreender seus fundamentos.", { indent: true }),
        createParagraph("Muitas técnicas Superiores foram desenvolvidas durante a Era dos Seraphyens, quando a esperança de vida se estendia por milênios e mestres podiam dedicar séculos ao aprimoramento de uma única técnica. Outras originam-se da Era de Yggorath, quando os primeiros habitantes do planeta Aetherion descobriram como adaptar técnicas primordiais para corpos mortais. Algumas poucas são fragmentos de conhecimento da Era Primordial, preservados através de artefatos que sobreviveram à queda de Aetherion.", { indent: true }),
        createParagraph("A aprendizagem de técnicas Superiores raramente ocorre em academias convencionais. Elas são tipicamente guardadas por ordens secretas, famílias nobres ou entidades antigas que escolhem cuidadosamente quem pode recebê-las. Alguns guerreiros gastam vidas inteiras buscando uma técnica Superior específica, apenas para descobrir que o conhecimento foi perdido ou protegido por guardiões implacáveis. A posse de uma técnica Superior eleva um guerreiro acima dos Grandes Mestres comuns.", { indent: true }),

        // 2.7 Nível Primordial
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.7 Nível Primordial")] }),
        createParagraph("As técnicas Primordiais representam segredos proibidos e conhecimento esquecido sobre a manipulação avançada de Aethra que beira o divino. Estas técnicas foram desenvolvidas pelos Seraphyens originais, os dez filhos criados diretamente por Yggorath, ou derivam de princípios descobertos durante a Era Primordial. Seu poder é tal que podem afetar a estrutura fundamental da realidade, manipulando não apenas elementos, mas conceitos como espaço, tempo, vida e morte.", { indent: true }),
        createParagraph("Técnicas Primordiais são classificadas como 'proibidas' não por serem intrinsecamente malignas, mas porque seu uso inadequado pode causar catástrofes incompreensíveis. Uma técnica Primordial de fogo mal executada poderia incendiar a atmosfera de um continente inteiro. Uma técnica de espaço falha poderia rasgar o tecido dimensional, permitindo que entidades do Vazio invadissem o plano material. Por estas razões, o conhecimento destas técnicas é rigorosamente controlado.", { indent: true }),
        createParagraph("Aqueles que aprendem técnicas Primordiais frequentemente o fazem através de conexões extraordinárias: herança direta de linhagens Seraphyen, descoberta de artefatos primordiais que imprintam conhecimento diretamente na mente, ou pactos com entidades antigas que possuem este conhecimento. Grazielly, por exemplo, recebeu conhecimento Primordial através dos nanobots primordiais integrados ao seu corpo, enquanto Elainy acessou técnicas desta magnitude através de sua conexão com a linhagem de Elaris e eventualmente com Nyxalor.", { indent: true }),

        // 2.8 Nível Divino
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.8 Nível Divino")] }),
        createParagraph("O Nível Divino é alcançado apenas por entidades que transcenderam completamente as limitações mortais: Ilios, Nyxalor, Yggorath renascida, e os antagonistas Nihilaryth mais poderosos. Técnicas Divinas não manipulam Aethra, elas são Aethra em sua forma mais pura e absoluta. O usuário não canaliza energia através de seu corpo, mas torna-se um com a energia, sua vontade se tornando lei na realidade ao seu redor.", { indent: true }),
        createParagraph("Uma técnica Divina não é 'aprendida' no sentido convencional. Ela emerge da própria natureza do ser divino, expressão natural de sua existência. Quando Ilios manipula luz, ela não está projetando energia através de canais de Aethra, ela está simplesmente desejando que a luz se comporte de certa forma, e a realidade obedece. Quando Nyxalor corrompe, ele não está usando uma técnica, está exercendo sua natureza intrínseca como Senhor das Trevas.", { indent: true }),
        createParagraph("Yggorath renascida representa o ápice deste nível, pois ela incorpora não apenas divindade, mas a própria função de nutrir e sustentar a existência. Suas técnicas não manipulam a realidade, elas a criam e sustentam. Onde Ilios e Nyxalor podem alterar o que existe, Yggorath pode fazer existir o que antes não existia. Este nível de poder é literalmente criativo em sua natureza, aproximando-se do poder do Grande Atrator e da Árvore da Existência.", { indent: true }),

        // TÉCNICAS POR ELEMENTO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Técnicas por Elemento")] }),
        createParagraph("O planeta Aetherion reconhece seis elementos fundamentais que formam a base de toda manipulação de Aethra: Fogo, Água, Terra, Ar, Raio e Gelo. Além destes, existem elementos compostos formados pela fusão de dois ou mais elementos fundamentais, técnicas especiais que transcendem elementos convencionais, e a manipulação pura de Aethra sem afinidade elemental específica.", { indent: true }),

        // 3.1 Elemento Fogo
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Elemento Fogo")] }),
        createParagraph("O elemento Fogo é associado à paixão, transformação e destruição renovadora. Manipuladores de fogo tendem a ser intensos, determinados e frequentemente temperamentais, sua personalidade refletindo a natureza volátil de seu elemento. O fogo é o elemento mais ofensivo por natureza, com técnicas que priorizam dano sobre defesa ou utilidade, embora especialistas criativos tenham desenvolvido aplicações surpreendentes.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Técnicas Básicas de Fogo")] }),
        new Paragraph({ numbering: { reference: "numbered-1", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Ignição - Capacidade de gerar chamas a partir das palmas das mãos. É a técnica mais fundamental, ensinada a todos os estudantes de fogo. Requer concentração para manter a chama estável.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-1", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Toque Flamejante - Transfere calor através do contato físico, causando queimaduras sem chamas visíveis. Útil para combate próximo discreto.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-1", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Esfera de Calor - Cria uma região de ar superaquecido ao redor do usuário, desconfortável para inimigos próximos mas não letal.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-1", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Luz de Fogo - Gera iluminação através de chamas controladas, útil para exploração de ambientes escuros.", size: 22, font: "Times New Roman" })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Técnicas Acadêmicas de Fogo")] }),
        new Paragraph({ numbering: { reference: "numbered-2", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Projétil Flamejante - Lança bolas de fogo a distância média com precisão razoável. Técnica padrão de combate para soldados de fogo.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-2", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Muralha de Chamas - Cria uma barreira de fogo que bloqueia ataques físicos e causa dano a quem atravessa. Duração limitada.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-2", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Explosão Controlada - Detona Aethra inflamado em área designada, causando dano em área mas exigindo preparação.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-2", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Lâmina de Fogo - Reveste arma ou membro com chamas, aumentando dano em combate próximo.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-2", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Rajada Ardente - Sequência rápida de pequenas chamas projetadas para suprimir inimigos.", size: 22, font: "Times New Roman" })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Stigmas de Fogo")] }),
        createParagraph("Stigmas de fogo são entre os mais poderosos e perigosos, frequentemente concedendo poderes destrutivos extraordinários mas com riscos significativos ao usuário. Alguns Stigmas de fogo conhecidos incluem:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Coração Vulcânico - O sangue do usuário torna-se magma, permitindo gerar fogo e calor sem limitação de Aethra, mas consumindo vitalidade.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Fênix Interior - Permite regeneração através do consumo de chamas, inclusive as próprias feridas podem ser curadas queimando-as.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Chamas da Purificação - Fogo que não queima fisicamente mas destrói toxinas, doenças e corrupções no corpo de quem toca.", size: 22, font: "Times New Roman" })] }),

        // 3.2 Elemento Água
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 Elemento Água")] }),
        createParagraph("O elemento Água representa adaptação, fluidez e persistência. Manipuladores de água tendem a ser calmos, pacientes e estrategistas naturais, capazes de contornar obstáculos em vez de enfrentá-los diretamente. A água é o elemento mais versátil, com aplicações que variam de cura a combate, de exploração a sobrevivência em ambientes hostis.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Técnicas Básicas de Água")] }),
        new Paragraph({ numbering: { reference: "numbered-3", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Condensação - Reúne umidade do ar para formar pequenas quantidades de água. Base para todas as técnicas de água.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-3", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Manipulação Líquida - Controle básico de água existente, movendo-a conforme a vontade do usuário.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-3", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Esfera Aquática - Cria uma bolha de água que pode ser lançada ou usada como escudo temporário.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-3", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Purificação - Remove impurezas básicas da água, tornando-a potável.", size: 22, font: "Times New Roman" })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Técnicas Acadêmicas de Água")] }),
        new Paragraph({ numbering: { reference: "numbered-4", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Lâmina Líquida - Comprime água em forma de lâmina cortante, eficaz contra armaduras leves.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-4", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Onda de Pressão - Libera água sob alta pressão em jato direcionado, capaz de perfurar.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-4", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Cura Menor - Acelera regeneração natural através de água infundida com Aethra.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-4", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Prisão Aquática - Envolve oponente em esfera de água, imobilizando-o por afogamento controlado.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-4", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Névoa Ocultante - Gera neblina densa que obscurece visão, útil para retiradas.", size: 22, font: "Times New Roman" })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Stigmas de Água")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Sangue Aquático - Permite manipular qualquer líquido, incluindo sangue dentro de corpos vivos. Extremamente perigoso.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Forma Líquida - O corpo pode tornar-se água temporariamente, evitando danos físicos.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Cura Profunda - Regeneração acelerada que pode curar feridas graves instantaneamente ao custo de Aethra significativo.", size: 22, font: "Times New Roman" })] }),

        // 3.3 Elemento Terra
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 Elemento Terra")] }),
        createParagraph("O elemento Terra simboliza estabilidade, resistência e fundação. Manipuladores de terra tendem a ser firmes, confiáveis e pragmáticos, sua personalidade refletindo a natureza sólida de seu elemento. A terra é o elemento mais defensivo por natureza, com técnicas que priorizam proteção e controle de terreno sobre dano direto, embora golpes terra sejam devastadores quando conectam.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Técnicas Básicas de Terra")] }),
        new Paragraph({ numbering: { reference: "numbered-5", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Sensibilidade Telúrica - Permite sentir vibrações no solo, detectando movimento de seres próximos através da terra.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-5", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Manipulação de Pedra - Controle básico de rochas e solo solto, movendo-os conforme vontade.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-5", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Pele de Pedra - Endurece temporariamente a pele do usuário, proporcionando proteção contra golpes básicos.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-5", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Escudo de Terra - Ergue uma barreira de solo diante do usuário, bloqueando ataques frontais.", size: 22, font: "Times New Roman" })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Técnicas Acadêmicas de Terra")] }),
        new Paragraph({ numbering: { reference: "numbered-6", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Terremoto Localizado - Cria vibrações sísmicas em área limitada, desequilibrando oponentes.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-6", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Lançamento de Rochas - Projeta pedras em alta velocidade como projéteis.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-6", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Muralha de Terra - Cria uma parede sólida de rocha comprimida, altamente resistente.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-6", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Armadura de Pedra - Reveste o corpo do usuário com rocha, aumentando defesa mas reduzindo mobilidade.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-6", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Areia Movediça - Transforma solo em lama ou areia movediça para prender oponentes.", size: 22, font: "Times New Roman" })] }),

        // 3.4 Elemento Ar
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.4 Elemento Ar")] }),
        createParagraph("O elemento Ar representa liberdade, movimento e comunicação. Manipuladores de ar tendem a ser independentes, curiosos e difíceis de prender, sua personalidade refletindo a natureza intangível de seu elemento. O ar é o elemento mais evasivo, com técnicas que priorizam mobilidade e controle de campo sobre confronto direto.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Técnicas Básicas de Ar")] }),
        new Paragraph({ numbering: { reference: "numbered-7", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Sensação de Vento - Permite sentir movimento de ar ao redor, detectando presenças pela perturbação que causam.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-7", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Brisa Controlada - Gera correntes de ar suaves para mover objetos leves ou resfriar ambientes.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-7", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Respiração Prolongada - Permite prender a respiração por períodos estendidos ou respirar em ambientes pobres em oxigênio.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-7", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Impulso de Ar - Usa rajadas de ar para saltar mais alto ou amortecer quedas.", size: 22, font: "Times New Roman" })] }),

        // 3.5 Elemento Raio
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.5 Elemento Raio")] }),
        createParagraph("O elemento Raio representa velocidade, precisão e poder explosivo. Manipuladores de raio tendem a ser intensos, decisivos e frequentemente impulsivos, sua personalidade refletindo a natureza instantânea de seu elemento. O raio é o elemento mais rápido, com técnicas que priorizam golpes decisivos sobre combate prolongado.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Técnicas Básicas de Raio")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Faísca - Gera pequenas descargas elétricas das pontas dos dedos, suficiente para atordoar ou iniciar fogos.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Campo Estático - Cria uma aura de eletricidade estática ao redor do usuário, causando formigamento em quem toca.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Aceleração Neural - Estimula o sistema nervoso, aumentando reflexos temporariamente.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Absorção Elétrica - Pode absorver pequenas quantidades de eletricidade externa para recarregar Aethra.", size: 22, font: "Times New Roman" })] }),

        // 3.6 Elemento Gelo (Cryonys)
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.6 Elemento Gelo (Cryonys)")] }),
        createParagraph("O elemento Gelo, ou Cryonys na terminologia ancestral, é um elemento composto formado pela fusão de Água e Ar. É extremamente raro, manifestando-se em apenas uma pequena fração dos Ressonantes. Manipuladores de gelo combinam a adaptabilidade da água com a liberdade do ar, criando técnicas únicas de controle térmico e cristalização.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Técnicas Básicas de Gelo")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Congelamento Tocante - Reduz temperatura de objetos ou seres através do contato físico.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Cristal de Gelo - Forma pequenos cristais de gelo que podem ser lançados como projéteis.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Pista Congelada - Congela superfícies sob os pés, permitindo deslizamento rápido.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Aura Gélida - Reduz temperatura ao redor do usuário, desacelerando reações inimigas.", size: 22, font: "Times New Roman" })] }),

        // PERSONAGENS PRINCIPAIS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Técnicas dos Personagens Principais")] }),

        // ELAINY
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 Elainy - Escolhida do Fogo")] }),
        createParagraph("Elainy representa uma das linhagens mais poderosas do planeta Aetherion, sendo descendente direta de Elaris, o Seraphyen de Fogo que se sacrificou para proteger Ilios durante a Grande Guerra Seraphyen. Sua afinidade primária com o Fogo é complementada por uma afinidade secundária com Terra, permitindo-lhe acessar técnicas compostas de Lava e, eventualmente, Fusão Nuclear.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Linhagem e Afinidades")] }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [3120, 3120, 3120],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [createHeaderCell("Elemento", 3120), createHeaderCell("Nível", 3120), createHeaderCell("Especialização", 3120)] }),
            new TableRow({ children: [createCell("Fogo", { width: 3120, center: true }), createCell("Primário (Mestre)", { width: 3120, center: true }), createCell("Chamas Viventes", { width: 3120, center: true })] }),
            new TableRow({ children: [createCell("Terra", { width: 3120, center: true }), createCell("Secundário (Avançado)", { width: 3120, center: true }), createCell("Lava/Magma", { width: 3120, center: true })] }),
            new TableRow({ children: [createCell("Fusão", { width: 3120, center: true }), createCell("Primordial", { width: 3120, center: true }), createCell("Fusão Nuclear", { width: 3120, center: true })] })
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Evolução das Chamas")] }),
        createParagraph("O poder de Elainy evolui através de estágios distintos de manifestação flamejante, cada um representando não apenas maior poder, mas uma transformação fundamental na natureza de suas chamas:", { indent: true }),

        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Ignis Fenrix (Nível 1-2) - Chamas rubro-douradas com formato de fênix. Controladas, precisas, representam o fogo em sua forma mais pura e nobre. O calor é intenso mas não destrutivo além do alvo.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Fenrix Escarlate (Nível 3) - Chamas carmesins que queimam o próprio ar ao redor, criando vácuo temporário. Mais poderosas mas também mais difíceis de controlar, exigindo estado emocional estável.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Fenrix Umbra (Nível 4) - Chamas negras que consomem não apenas matéria, mas energia. Podem extinguir outras chamas e drenar Aethra de oponentes. Representam o estágio onde fogo e escuridão começam a se fundir.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Prime Fenrix (Nível 5) - A forma final, onde as chamas tornam-se 'vivas', possuindo uma forma de consciência rudimentar que busca combustível ativamente. Podem existir independentemente do usuário por períodos limitados.", size: 22, font: "Times New Roman" })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Estilo Lava")] }),
        createParagraph("A fusão de Fogo primário com Terra secundário permite a Elainy acessar o Estilo Lava, uma forma de combate devastadora que combina a destrutividade do fogo com a solidez da terra:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Magma Palma - Golpes de palma que transferem magma liquefeito através do contato, causando dano interno massivo.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Erupção Localizada - Cria gêiseres de magma do solo, explosivos e imprevisíveis.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Armamento Vulcânico - Forja armas temporárias de rocha vulcânica que retêm calor extremo.", size: 22, font: "Times New Roman" })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Fusão Nuclear - O Pináculo")] }),
        createParagraph("O estágio mais avançado do poder de Elainy representa a replicação de processos estelares. Através da compressão extrema de suas chamas, ela pode iniciar reações de fusão nuclear semelhantes às que ocorrem no núcleo de estrelas:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Núcleo Estelar - Cria uma esfera de plasma incandescente que emula o núcleo de uma estrela. A temperatura atinge milhões de graus, vaporizando praticamente qualquer matéria.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Nova - Liberação explosiva de energia acumulada, similar a uma supernova em escala reduzida. Destrutiva o suficiente para devastar uma pequena cidade. Requer preparação extensa e deixa Elainy exausta.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Supernova - O ataque definitivo, alcançado apenas no auge final com esforço extremo mortal. Libera energia comparável à explosão de uma estrela. Uso único, provavelmente fatal.", size: 22, font: "Times New Roman" })] }),

        // GRAZIELLY
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 Grazielly - SynDraryn de Cryonys")] }),
        createParagraph("Grazielly representa uma anomalia no sistema de técnicas, possuindo um poder que transcende as classificações convencionais. Como SynDraryn (portadora de Sangue Real) de Cryonys, ela herdou não apenas a linhagem de Ilios, mas também conexões diretas com Yggorath através dos nanobots primordiais integrados ao seu corpo desde a infância.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Linhagem e Afinidades")] }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [3120, 3120, 3120],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [createHeaderCell("Elemento", 3120), createHeaderCell("Nível", 3120), createHeaderCell("Especialização", 3120)] }),
            new TableRow({ children: [createCell("Gelo (Cryonys)", { width: 3120, center: true }), createCell("Primário (SynDraryn)", { width: 3120, center: true }), createCell("Compressão Atômica", { width: 3120, center: true })] }),
            new TableRow({ children: [createCell("Água", { width: 3120, center: true }), createCell("Secundário (Nato)", { width: 3120, center: true }), createCell("Manipulação Pura", { width: 3120, center: true })] }),
            new TableRow({ children: [createCell("Vento", { width: 3120, center: true }), createCell("Secundário (Nato)", { width: 3120, center: true }), createCell("Controle Térmico", { width: 3120, center: true })] }),
            new TableRow({ children: [createCell("Fusão", { width: 3120, center: true }), createCell("Primordial/Divino", { width: 3120, center: true }), createCell("Unidade Universal", { width: 3120, center: true })] })
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Sistema de Nanobots (Níveis 1-5)")] }),
        createParagraph("Os nanobots primordiais integrados ao corpo de Grazielly representam tecnologia da Era Primordial, capazes de manipular matéria em nível subatômico. Cada nível representa maior integração e poder, mas também maior risco de perda de controle:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Nível 1 - Ativação básica dos nanobots. Aumento de 50% em todos os atributos físicos. Regeneração acelerada de feridas leves. Controle preciso de gelo.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Nível 2 - Nanobots começam a integrar-se com Aethra. Dobro de força e velocidade. Capacidade de congelar instantaneamente. Técnicas de compressão básicas.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Nível 3 - Integração profunda. Quintuplica atributos. Pode manipular temperatura absoluta. Compressão atômica de pequenas massas. Aura de gelo visível.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Nível 4 - Estado de combate sério. Dez vezes os atributos normais. Manipulação de estrutura molecular. Congelamento de energia. Risco de instabilidade emocional.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Nível 5 - PERIGOSO. Estado de fusão parcial com nanobots. Poder massivo mas controle incerto. Pode afetar aliados. Aumento de temperatura corporal paradoxal. Risco de colapso.", size: 22, font: "Times New Roman" })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Unidade Absoluta → Unidade Universal")] }),
        createParagraph("A técnica suprema de Grazielly evolui através de estágios de compressão e fusão:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Unidade Absoluta - Compressão de matéria até o limite molecular. Cria estruturas de gelo de densidade extrema, praticamente indestrutíveis. Base para técnicas superiores.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Compressão Atômica - Compressão além do limite molecular, forçando átomos a se fundirem. Cria materiais exóticos com propriedades únicas. Difícil de sustentar.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Unidade Universal - O estágio final teórico: compressão extrema de massa massiva até criar uma estrela de nêutrons hipermassiva, quase um buraco negro. Altamente destrutivo. Atingido apenas no climax final do poder.", size: 22, font: "Times New Roman" })] }),

        // DIFERENÇAS ENTRE ELAINY E GRAZY
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 Comparação: Elainy vs Grazielly")] }),
        createParagraph("A dinâmica entre Elainy e Grazielly reflete um contraste fundamental em como o poder se manifesta:", { indent: true }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2340, 3510, 3510],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [createHeaderCell("Aspecto", 2340), createHeaderCell("Elainy", 3510), createHeaderCell("Grazielly", 3510)] }),
            new TableRow({ children: [createCell("Acesso ao Poder", { width: 2340, center: true }), createCell("DIFÍCIL de conseguir", { width: 3510 }), createCell("PODER abundante", { width: 3510 })] }),
            new TableRow({ children: [createCell("Controle", { width: 2340, center: true }), createCell("FÁCIL de controlar", { width: 3510 }), createCell("DIFÍCIL de controlar", { width: 3510 })] }),
            new TableRow({ children: [createCell("Evolução", { width: 2340, center: true }), createCell("Progressão gradual e estável", { width: 3510 }), createCell("Saltos explosivos e instáveis", { width: 3510 })] }),
            new TableRow({ children: [createCell("Risco", { width: 2340, center: true }), createCell("Exaustão por uso excessivo", { width: 3510 }), createCell("Perda de controle/colapso", { width: 3510 })] }),
            new TableRow({ children: [createCell("Clímax", { width: 2340, center: true }), createCell("Supernova (fatal)", { width: 3510 }), createCell("Unidade Universal (destrutivo)", { width: 3510 })] })
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        // NOAH
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.4 Noah - O Silentis")] }),
        createParagraph("Noah representa uma categoria única: um Silentis que compensou a falta de poderes espirituais com genialidade tecnológica. Sem Aethra ativo, ele não pode usar técnicas convencionais, mas desenvolveu uma armadura tecnológica que permite rivalizar com guerreiros de alto nível.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Armadura Tecnológica")] }),
        createParagraph("A armadura de Noah foi desenvolvida ao longo de anos, incorporando tecnologia que imita efeitos de técnicas de Aethra:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Reatores de Energia - Simulam liberação de Aethra, fornecendo energia para sistemas da armadura.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Sistemas de Voo - Propulsão que imita técnicas de mobilidade aérea.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Armas Energéticas - Canhões que disparam rajadas similares a técnicas de fogo ou raio.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Sensores - Detectam fluxo de Aethra, compensando falta de sensibilidade espiritual.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Escudos - Campos de força que bloqueiam técnicas até nível GM.", size: 22, font: "Times New Roman" })] }),

        // IRIS
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.5 Iris - A Espada Final")] }),
        createParagraph("Iris, filha de Grazielly e Noah, representa a síntese perfeita entre poder espiritual hereditário e tecnologia. Nascida com nanobots integrados ao seu DNA, ela não possui 'nííveis' tradicionais, mas sim uma evolução constante e permanente que a torna cada vez mais poderosa ao longo do tempo.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Características Únicas")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Evolução Constante - Não possui transformações ou níveis. Seu poder cresce continuamente sem saltos dramáticos.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Trânsito Planar - Pode mover-se entre planos de existência e através do tempo.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Inteligência Híbrida - Combina consciência humana com processamento de IA dos nanobots.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Limitação - Não pode intervir em eventos fixados no tempo, como o sacrifício da mãe.", size: 22, font: "Times New Roman" })] }),

        // TÉCNICAS DIVINAS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Técnicas Divinas")] }),
        createParagraph("O nível Divino representa técnicas que não são aprendidas ou desenvolvidas, mas que emergem da própria natureza de entidades que transcenderam a mortalidade. Ilios, Nyxalor e Yggorath renascida operam em um patamar onde a vontade se torna lei e a realidade obedece naturalmente.", { indent: true }),

        // ILIOS
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 Ilios - Luz Primordial")] }),
        createParagraph("Ilios, filha de Yggorath e herdeira legítima do legado Seraphyen, incorpora a luz em sua forma mais pura. Suas técnicas não manipulam luz, elas são a própria essência luminosa manifestada:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Amanecer Eterno - Iluminação absoluta que dissipa qualquer escuridão, inclusive corrupções espirituais.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Julgamento Radiante - Luz que revela a verdade absoluta, impossível de enganar ou corromper.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Rito de Transcendência - Cerimônia que pode elevar um mortal a poder temporário comparável ao divino.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Selamento Eterno - Capacidade de prender entidades ou energias por milênios.", size: 22, font: "Times New Roman" })] }),

        // NYXALOR
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 Nyxalor - Trevas Corrompidas")] }),
        createParagraph("Nyxalor, filho de Alyndra e primo de Ilios, representa a corrupção das trevas que originalmente eram neutras. Possuído por Vorynthrix, líder dos Nihilaryth, suas técnicas corrompem e destroem:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Vazio Consumidor - Trevas que não apenas obscurecem, mas apagam matéria e energia.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Corrupção Espiritual - Contaminação de Aethra que transforma aliados em inimigos.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Possessão - Capacidade de habitar corpos de outros, especialmente aqueles com afinidade trevas/fogo.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Quebra de Selos - Pode romper selamentos criados por entidades de poder equivalente.", size: 22, font: "Times New Roman" })] }),

        // YGGORATH
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.3 Yggorath Renascida - Mãe da Existência")] }),
        createParagraph("Yggorath representa o ápice do poder Divino, pois sua natureza não é apenas manipular a realidade, mas nutrir e sustentar a própria existência. Renascida como Árvore Primordial, suas técnicas são criativas em sentido literal:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Sopro da Criação - Capacidade de criar vida e matéria do nada, através da energia do Fruto da Existência.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Sustentação - Mantém a existência de planos e dimensões apenas existindo.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Conexão Universal - Percepção de tudo que existe dentro dos planos conectados à Árvore da Existência.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Sacrifício Cósmico - Pode ceder sua essência para criar ou restaurar em escala universal.", size: 22, font: "Times New Roman" })] }),

        // MULTI-ELEMENTO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. Manipulação Multi-Elemental")] }),
        createParagraph("A capacidade de manipular múltiplos elementos varia drasticamente de acordo com o nível de poder e treinamento. Enquanto a maioria dos Ressonantes possui afinidade com apenas um elemento, existem exceções que quebram esta regra de formas distintas.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 Escala de Multi-Elemento")] }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2340, 2340, 4680],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [createHeaderCell("Elementos", 2340), createHeaderCell("Raridade", 2340), createHeaderCell("Exemplos", 4680)] }),
            new TableRow({ children: [createCell("1 Elemento", { width: 2340, center: true }), createCell("Comum (85%)", { width: 2340, center: true }), createCell("Maioria dos Ressonantes", { width: 4680 })] }),
            new TableRow({ children: [createCell("2 Elementos", { width: 2340, center: true }), createCell("Incomum (12%)", { width: 2340, center: true }), createCell("GMs, alguns ADMs, Elainy, Grazielly", { width: 4680 })] }),
            new TableRow({ children: [createCell("3 Elementos", { width: 2340, center: true }), createCell("Raro (2.5%)", { width: 2340, center: true }), createCell("Alguns GMs históricos", { width: 4680 })] }),
            new TableRow({ children: [createCell("4 Elementos", { width: 2340, center: true }), createCell("Extremo (0.4%)", { width: 2340, center: true }), createCell("Raros GMs excepcionais", { width: 4680 })] }),
            new TableRow({ children: [createCell("5 Elementos", { width: 2340, center: true }), createCell("Lendário (0.09%)", { width: 2340, center: true }), createCell("Apenas Seraphyens", { width: 4680 })] }),
            new TableRow({ children: [createCell("6 Elementos", { width: 2340, center: true }), createCell("Divino (0.01%)", { width: 2340, center: true }), createCell("Ilios, Nyxalor (e não dominam todos)", { width: 4680 })] }),
            new TableRow({ children: [createCell("Todos", { width: 2340, center: true }), createCell("Único", { width: 2340, center: true }), createCell("Yggorath renascida", { width: 4680 })] })
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),
        createParagraph("É crucial notar que mesmo os Seraphyens, apesar de sua longevidade e poder, não conseguiam manipular todos os elementos simultaneamente. Apenas Yggorath renascida possui esta capacidade, pois ela incorpora a própria função de nutrir toda existência.", { indent: true }),

        // RARIDADE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. Raridade e Distribuição")] }),
        createParagraph("A distribuição de poder no planeta Aetherion segue padrões previsíveis que foram estudados e documentados ao longo de milênios. Estes padrões determinam a estrutura social, as oportunidades disponíveis para cada indivíduo, e as expectativas que a sociedade impõe sobre seus membros.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.1 Classes Sociais e Poder")] }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2340, 3120, 3900],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [createHeaderCell("Classe", 2340), createHeaderCell("Característica", 3120), createHeaderCell("Limitação Típica", 3900)] }),
            new TableRow({ children: [createCell("Ressonantes", { width: 2340, center: true }), createCell("Aethra ativo", { width: 3120 }), createCell("Técnicas até nível Acadêmico", { width: 3900 })] }),
            new TableRow({ children: [createCell("Silentis", { width: 2340, center: true }), createCell("Aethra adormecido", { width: 3120 }), createCell("Sem técnicas espirituais", { width: 3900 })] }),
            new TableRow({ children: [createCell("Impuros", { width: 2340, center: true }), createCell("Mestiço Luz+Trevas", { width: 3120 }), createCell("Poderes voláteis, risco de corrupção", { width: 3900 })] })
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.2 Probabilidade de Avanço")] }),
        createParagraph("A progressão através dos níveis de técnica não é linear nem garantida. Fatores como linhagem, treinamento, experiência em combate, oportunidades e até simples sorte influenciam quem consegue ascender:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Básico → Acadêmico: 67% dos que tentam conseguem. Principal barreira: dedicação ao treinamento formal.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Acadêmico → Stigma: 42% dos que tentam conseguem. Principal barreira: encontrar/adquirir um Stigma compatível.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Stigma → ADM: 31% dos que tentam conseguem. Principal barreira: demonstrar liderança e conquistar reconhecimento.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "ADM → GM: 12% dos que tentam conseguem. Principal barreira: vencer o Torneio Sagrado ou ser escolhido.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "GM → Superior: 8% dos que tentam conseguem. Principal barreira: descobrir técnicas ancestrais ou desenvolver as próprias.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Superior → Primordial: 0.5% dos que tentam conseguem. Principal barreira: circunstâncias extraordinárias, linhagem especial, ou pactos.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Primordial → Divino: Impossível para mortais. Apenas através de transcendência completa da natureza mortal.", size: 22, font: "Times New Roman" })] }),

        // CONCLUSÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. Considerações Finais")] }),
        createParagraph("Este documento representa uma compilação abrangente do sistema de técnicas do universo de Alyndras, organizado desde as formas mais básicas de manipulação até os poderes que transcendem a compreensão mortal. A hierarquia apresentada serve como guia para desenvolvimento de personagens, planejamento de arcos narrativos e estabelecimento de limites claros para o que cada categoria de ser pode accomplish.", { indent: true }),
        createParagraph("É importante ressaltar que o poder por si só não determina o valor de um personagem. Noah, um Silentis sem qualquer poder espiritual, demonstrou que determinação, inteligência e amor podem rivalizar com os poderes mais formidáveis. Iris, nascida da união entre poder espiritual hereditário e tecnologia, representa um novo paradigma que desafia as classificações tradicionais. O sacrifício de Grazielly e a jornada de Elainy demonstram que poder vem com custos, e que às vezes a maior força está em saber quando ceder.", { indent: true }),
        createParagraph("O sistema de técnicas de Alyndras continua evoluindo à medida que novas histórias são contadas e novos personagens descobrem formas únicas de interagir com o Aethra. Este documento deve ser considerado uma base viva, sujeita a expansões e refinamentos conforme o universo se desenvolve.", { indent: true })
      ]
    }
  ]
});

// Generate the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Hierarquia_Tecnicas.docx", buffer);
  console.log("Document created successfully!");
});
