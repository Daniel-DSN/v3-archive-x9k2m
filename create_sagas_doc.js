const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer, 
        AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType, 
        VerticalAlign, PageNumber, PageBreak, TableOfContents } = require('docx');
const fs = require('fs');

const colors = {
  primary: "0B1220",
  body: "0F172A",
  secondary: "2B2B2B",
  accent: "9AA6B2",
  tableBg: "F1F5F9",
  headerBg: "E2E8F0",
  saga1: "E3F2FD",
  saga2: "FFF3E0",
  saga3: "FFEBEE",
  saga4: "F3E5F5"
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: colors.accent };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const createParagraph = (text, options = {}) => {
  return new Paragraph({
    alignment: options.alignment || AlignmentType.JUSTIFIED,
    spacing: { line: 312, before: options.before || 0, after: options.after || 120 },
    indent: options.indent ? { firstLine: 480 } : undefined,
    children: [new TextRun({ text, size: 22, font: "Times New Roman", ...options.textOptions })]
  });
};

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
      { reference: "numbered-4", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    // CAPA
    {
      properties: { page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } } },
      children: [
        new Paragraph({ spacing: { before: 4000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "UNIVERSO DE ALYNDRAS", size: 72, bold: true, color: colors.primary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "AS QUATRO SAGAS DE YGGORATH", size: 48, bold: true, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Estrutura Cinematográfica para OVAs", size: 28, italics: true, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 2500 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 22, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "SAGA I: INFÂNCIA", size: 24, bold: true, color: "1565C0", font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "SAGA II: DESENVOLVIMENTO E ASCENSÃO", size: 24, bold: true, color: "E65100", font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "SAGA III: CLÍMAX FINAL", size: 24, bold: true, color: "C62828", font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "SAGA IV: FUGA E SACRIFÍCIO", size: 24, bold: true, color: "6A1B9A", font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 22, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // SUMÁRIO E CONTEÚDO
    {
      properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: {
        default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Universo de Alyndras - As Quatro Sagas de Yggorath", size: 18, color: colors.accent, font: "Times New Roman" })] })] })
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
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Introdução às Sagas")] }),
        createParagraph("Este documento apresenta a estrutura completa das quatro sagas que compõem a história de Yggorath, desde sua infância até o momento crucial de seu sacrifício e transcendência. Cada saga foi estruturada como um arco narrativo independente que pode ser adaptado para diferentes formatos: novelas, roteiros de animação, mangás ou qualquer outra mídia visual ou textual.", { indent: true }),
        createParagraph("A estrutura segue princípios de narrativa épica onde cada saga aumenta progressivamente as apostas, desenvolve os personagens através de conflitos significativos, e culmina em um clímax que redefine completamente o status quo. As batalhas são coreografadas para serem visuais e dinâmicas, mas sempre ancoradas em desenvolvimento de personagem e consequências emocionais reais.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Estrutura Visual Proposta")] }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2340, 2340, 2340, 2340],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Saga", 2340),
              createHeaderCell("Episódios", 2340),
              createHeaderCell("Duração Estimada", 2340),
              createHeaderCell("Foco Narrativo", 2340)
            ]}),
            new TableRow({ children: [
              createCell("I: Infância", { width: 2340, center: true, fill: colors.saga1 }),
              createCell("6-8 episódios", { width: 2340, center: true }),
              createCell("180-240 minutos", { width: 2340, center: true }),
              createCell("Descoberta e Formação", { width: 2340, center: true })
            ]}),
            new TableRow({ children: [
              createCell("II: Ascensão", { width: 2340, center: true, fill: colors.saga2 }),
              createCell("8-10 episódios", { width: 2340, center: true }),
              createCell("240-300 minutos", { width: 2340, center: true }),
              createCell("Conquista e Poder", { width: 2340, center: true })
            ]}),
            new TableRow({ children: [
              createCell("III: Clímax", { width: 2340, center: true, fill: colors.saga3 }),
              createCell("10-12 episódios", { width: 2340, center: true }),
              createCell("300-360 minutos", { width: 2340, center: true }),
              createCell("Guerra e Revelações", { width: 2340, center: true })
            ]}),
            new TableRow({ children: [
              createCell("IV: Sacrifício", { width: 2340, center: true, fill: colors.saga4 }),
              createCell("8-10 episódios", { width: 2340, center: true }),
              createCell("240-300 minutos", { width: 2340, center: true }),
              createCell("Batalha Final e Legado", { width: 2340, center: true })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        // =====================================
        // SAGA I: INFÂNCIA
        // =====================================
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("SAGA I: INFÂNCIA")] }),
        new Paragraph({
          shading: { fill: colors.saga1, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "\"Toda lenda começa com uma centelha\"", size: 24, italics: true, color: colors.secondary, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 Visão Geral da Saga")] }),
        createParagraph("A primeira saga estabelece o mundo de Aetherion em sua plenitude - uma civilização tecnológica e espiritualmente avançada que alcançou prosperidade inigualável. Através dos olhos da jovem Yggorath, o público descobre as maravilhas e também as fissuras desta sociedade utópica. A saga centra-se no desenvolvimento inicial da protagonista, sua relação complexa com Alyndra, e a descoberta gradual de verdades que mudarão tudo.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.2 Personagens Principais")] }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2000, 2500, 4860],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Personagem", 2000),
              createHeaderCell("Papel", 2500),
              createHeaderCell("Descrição", 4860)
            ]}),
            new TableRow({ children: [
              createCell("YGGORATH", { width: 2000, center: true, textOptions: { bold: true } }),
              createCell("Protagonista", { width: 2500, center: true }),
              createCell("Jovem herdeira de linhagem nobre. Aethra nutritivo excepcional. Personalidade protetora e empática.", { width: 4860 })
            ]}),
            new TableRow({ children: [
              createCell("ALYNDRA", { width: 2000, center: true, textOptions: { bold: true } }),
              createCell("Irmã Secreta", { width: 2500, center: true }),
              createCell("Três anos mais velha. Ambiciosa, determinada. Publicamente apresentada como 'prima'.", { width: 4860 })
            ]}),
            new TableRow({ children: [
              createCell("THAELYON", { width: 2000, center: true, textOptions: { bold: true } }),
              createCell("Mentor", { width: 2500, center: true }),
              createCell("Mestre Ancião do Conselho. Professor de ambas. Guardião de segredos antigos.", { width: 4860 })
            ]}),
            new TableRow({ children: [
              createCell("KRYSTARA", { width: 2000, center: true, textOptions: { bold: true } }),
              createCell("Rival/Amiga", { width: 2500, center: true }),
              createCell("Herdeira de família rival. Competitiva mas honrada. Primeira amizade genuína de Yggorath.", { width: 4860 })
            ]}),
            new TableRow({ children: [
              createCell("VORYMIR", { width: 2000, center: true, textOptions: { bold: true } }),
              createCell("Interesse Romântico", { width: 2500, center: true }),
              createCell("Jovem cientista do continente Tempestra. Curioso, idealista. Primeiro amor de Yggorath.", { width: 4860 })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.3 Estrutura Episódica")] }),

        // EPISÓDIO 1
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 1: \"A Cidade nas Nuvens\"")] }),
        createParagraph("O episódio abre com uma sequência visual estonteante de Aetherion - cidades flutuando entre nuvens iridescentes, pontes de luz conectando ilhas artificiais, esferas Dyson parciais capturando a luz da estrela central. A câmera mergulha através de camadas atmosféricas até focar em uma jovem Yggorath (aproximadamente 50 anos, mas com aparência de adolescente) treinando em um jardim suspenso.", { indent: true }),
        createParagraph("Através de sua rotina, estabelecemos seu Aethra único - enquanto outros manipulam elementos de forma destrutiva, Yggorath faz florescerem plantas, cura ferimentos em árvores, purifica água contaminada. Seu mentor Thaelyon observa com expressão preocupada, murmurando algo sobre 'profecias' e 'pesos demais para ombros tão jovens'.", { indent: true }),
        createParagraph("O ponto de virada ocorre quando Alyndra chega para uma 'visita oficial' entre famílias nobres. Em privado, num jardim isolado, as duas revelam sua verdadeira relação - são irmãs de sangue, separadas por três anos, mantendo o segredo por razões que Alyndra não explica completamente. A conexão entre elas é visível - quando tocam, o Aethra ao redor ressoa em frequência única.", { indent: true }),
        createParagraph("O episódio termina com Thaelyon revelando a Yggorath que seu treinamento será diferente. 'Você não foi feita para destruir, criança. Você foi feita para nutrir. E isso é muito mais perigoso.'", { indent: true }),

        // EPISÓDIO 2
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 2: \"Sombras na Luz\"")] }),
        createParagraph("Yggorath é apresentada à Academia de Aethra, onde jovens nobres treinam para servir a civilização. Krystara, herdeira de uma família que historicamente rivaliza com a linhagem de Yggorath, imediatamente a desafia para um duelo amistoso. A luta demonstra o contraste de estilos - Krystara usa fogo explosivo e agressivo; Yggorath responde com água que absorve e redireciona, nunca contra-atacando diretamente.", { indent: true }),
        createParagraph("Enquanto isso, Alyndra participa de reuniões do Conselho onde discussões sobre 'expansão' e 'destino maior' de Aetherion ocorrem. Ela defende posições controversas sobre harnessar o Vazio Primordial - algo que muitos consideram perigoso demais. Thaelyon é um dos poucos opositores abertos.", { indent: true }),
        createParagraph("O episódio introduz Vorymir, um jovem cientista que Yggorath encontra acidentalmente durante uma exploração dos níveis inferiores da cidade flutuante. Ele está trabalhando em tecnologia de 'memória genética' - a capacidade de gravar conhecimento no DNA. A química entre eles é imediata, baseada em curiosidade intelectual compartilhada.", { indent: true }),
        createParagraph("O clímax mostra Yggorath descobrindo que Alyndra tem estado secretamente envolvida com o 'Projeto Abismo' - a iniciativa para acessar o Vazio Primordial. Quando confrontada, Alyndra não nega, mas pede confiança. 'Eu vi coisas, mana. Coisas que preciso preparar. Confie em mim.' Yggorath concorda, mas uma semente de dúvida é plantada.", { indent: true }),

        // EPISÓDIO 3
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 3: \"O Primeiro Sacrificio\"")] }),
        createParagraph("Uma missão de treinamento dá errado quando um deslocamento tectônico artificial ameaça uma colônia de mineração em um planeta próximo. Yggorath, Krystara e outros cadetes são destacados para ajudar - uma situação real que rapidamente escalona além do esperado. A colônia está à beira do colapso, e evacuação completa é impossível no tempo disponível.", { indent: true }),
        createParagraph("Este é o episódio onde Yggorath demonstra pela primeira vez o verdadeiro potencial de seu Aethra nutritivo. Enquanto outros tentam conter o desastre com força bruta, ela conecta-se à própria estrutura geológica do planeta, 'conversando' com a terra, persuadindo-a a estabilizar. O esforço quase a mata - ela passa dias em coma regenerativo.", { indent: true }),
        createParagraph("Durante seu coma, Yggorath tem visões de uma entidade vasta e benevolente - a Árvore da Existência se comunicando com ela em nível subconsciente. A experiência a muda fundamentalmente. Quando acorda, seus olhos têm uma qualidade diferente, como se vissem além do físico.", { indent: true }),
        createParagraph("Alyndra visita Yggorath durante sua recuperação. Em um momento de vulnerabilidade, revela que sabia que Yggorath era especial desde o nascimento - 'Quando você nasceu, as plantas do jardim da família floresceram instantaneamente. Mamãe disse que era um sinal. Eu disse que era um peso.' A ligação entre as irmãs se aprofunda.", { indent: true }),

        // EPISÓDIO 4
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 4: \"Correntes Ocultas\"")] }),
        createParagraph("Yggorath retorna ao treinamento, mas algo mudou. Seu Aethra é mais forte, mas também mais imprevisível. Às vezes, plantas crescem espontaneamente ao seu redor; outras vezes, ela percebe emoções de pessoas distantes. Thaelyon explica que ela está desenvolvendo 'Sensibilidade Primordial' - uma conexão direta com a Árvore da Existência que apenas alguns indivíduos em eons manifestam.", { indent: true }),
        createParagraph("Paralelamente, Vorymir convida Yggorath para visitar os laboratórios de Tempestra, onde o Projeto Abismo está sediado. A instalação é impressionante - tecnologia que Yggorath nunca viu, cientistas trabalhando em portais dimensionais, cristais de ressonância pulsando com energia estranha. Vorymir está claramente empolgado com o potencial de descobertas.", { indent: true }),
        createParagraph("Mas Yggorath sente algo errado. Sua nova sensibilidade percebe ecos de... algo... nos corredores. Vozes que não deveriam estar lá. Pensamentos que não pertencem a nenhum dos cientistas. Quando menciona isso a Vorymir, ele ri nervosamente e atribui a 'resíduos energéticos'. Ela não está convencida.", { indent: true }),
        createParagraph("O episódio termina com Alyndra convocando Yggorath para uma conversa privada. 'Preciso que você confie em mim completamente a partir de agora. Coisas vão acontecer que parecerão... erradas. Traiçoeiras até. Mas prometa que quando chegar o momento, você fará o que precisa ser feito.' Yggorath promete, sem entender completamente o que está concordando.", { indent: true }),

        // EPISÓDIO 5
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 5: \"Fruto Proibido\"")] }),
        createParagraph("Alyndra leva Yggorath a um local secreto - uma câmara antiga sob os alicerces da cidade principal. Lá, guardada por milênios, está uma esfera de energia pulsante que Alyndra identifica como um 'Fruto da Existência' - um que se formou e foi preservado antes mesmo de Aetherion existir como civilização.", { indent: true }),
        createParagraph("Alyndra explica que está prestes a consumir um Fruto que a Árvore recentemente produziu, mas queria que Yggorath visse este primeiro. 'Quando eu consumir o Fruto, vou ver coisas. Coisas sobre o futuro. Coisas sobre você, sobre nós, sobre tudo. E não vou poder contar a ninguém - nem a você. O conhecimento seria demasiado.'", { indent: true }),
        createParagraph("O ritual de consumo do Fruto é mostrado em sequência impressionante - Alyndra em transe, energia cósmica fluindo através dela, visões do universo inteiro passando por seus olhos. Yggorath assiste, sentindo a conexão entre elas esticar como um fio de luz. Quando termina, Alyndra está mudada - mais poderosa, mas também mais triste. 'Agora sei o que preciso fazer. E o que você precisará ser.'", { indent: true }),
        createParagraph("O episódio termina com a revelação de que Thaelyon sabia sobre o Fruto o tempo todo. 'Sua irmã carrega agora o destino de todos nós. E você, criança, será a bênção que permite que esse destino seja suportável.'", { indent: true }),

        // EPISÓDIO 6
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 6: \"Despedidas\"")] }),
        createParagraph("A saga de infância encerra com um episódio de transição que estabelece as peças para o futuro. Yggorath é promovida a oficial júnior das forças de defesa de Aetherion - não por status, mas por mérito demonstrado. Krystara, que testemunhou seu sacrifício na missão de resgate, torna-se sua aliada genuína, selando uma amizade que durará vidas.", { indent: true }),
        createParagraph("Vorymir se despede de Yggorath, explicando que foi transferido para um projeto especial em Tempestra - 'algo que vai mudar tudo'. Ele promete manter contato, mas algo em seus olhos sugere que ele mesmo não acredita nisso. Yggorath sente que está perdendo algo, mas não sabe o quê.", { indent: true }),
        createParagraph("Alyndra, agora transformada pelo Fruto, parece mais distante, mais calculista. Quando Yggorath tenta conversar sobre suas preocupações sobre Tempestra, Alyndra a interrompe: 'Tudo será revelado no tempo certo. Continue treinando. Continue nutrindo. E quando eu não puder mais estar aqui, lembre-se: o amor que nos une não é fraqueza. É a força mais poderosa que existe.'", { indent: true }),
        createParagraph("A cena final mostra Yggorath sozinha em um jardim, praticando técnicas de cura. Ao seu redor, flores desabrocham. Acima dela, a cidade brilha. E muito longe, em Tempestra, uma luz estranha pisca nas profundezas de um laboratório.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.4 Temas Centrais da Saga I")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Descoberta de Identidade: Yggorath aprende quem é e o que seu poder realmente significa", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Segredos e Confiança: A dinâmica entre irmãs que amam mas não podem ser completamente honestas", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Poder como Responsabilidade: Aethra não é apenas força, mas conexão e dever", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Primeiros Amores e Perdas: O romance com Vorymir como artifício trágico", size: 22, font: "Times New Roman" })] }),

        // =====================================
        // SAGA II: DESENVOLVIMENTO E ASCENSÃO
        // =====================================
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("SAGA II: DESENVOLVIMENTO E ASCENSÃO")] }),
        new Paragraph({
          shading: { fill: colors.saga2, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "\"O poder verdadeiro é aquele que se escolhe não usar\"", size: 24, italics: true, color: colors.secondary, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Visão Geral da Saga")] }),
        createParagraph("A segunda saga acompanha Yggorath durante séculos de serviço como General Primaz das forças de Aetherion. A civilização está em sua era de maior expansão, e Yggorath lidera operações que estabelecem colônias em sistemas estelares distantes. Mas sob a superfície brilhante, a corrupção dos Nihilaryth começa a se espalhar, e Alyndra orquestra eventos que Yggorath não compreende completamente.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Novos Personagens")] }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2000, 2500, 4860],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Personagem", 2000),
              createHeaderCell("Papel", 2500),
              createHeaderCell("Descrição", 4860)
            ]}),
            new TableRow({ children: [
              createCell("VAELOR", { width: 2000, center: true, textOptions: { bold: true } }),
              createCell("Comandante", { width: 2500, center: true }),
              createCell("Segundo em comando de Yggorath. Lealdade absoluta. Segredo: está sendo manipulado.", { width: 4860 })
            ]}),
            new TableRow({ children: [
              createCell("LYRIANNA", { width: 2000, center: true, textOptions: { bold: true } }),
              createCell("Embaixadora", { width: 2500, center: true }),
              createCell("Diplomata de civilização alienígena. Primeira a perceber algo errado em Aetherion.", { width: 4860 })
            ]}),
            new TableRow({ children: [
              createCell("THORMUND", { width: 2000, center: true, textOptions: { bold: true } }),
              createCell("Rival", { width: 2500, center: true }),
              createCell("General de facção política oposta. Inimigo declarado que se torna aliado.", { width: 4860 })
            ]}),
            new TableRow({ children: [
              createCell("XARYNTHA", { width: 2000, center: true, textOptions: { bold: true } }),
              createCell("Vilã Oculta", { width: 2500, center: true }),
              createCell("A Sussurrante. Primeira aparição direta de um Nihilaryth na história.", { width: 4860 })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 Estrutura Episódica")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 1: \"O General Protetor\"")] }),
        createParagraph("Séculos se passaram desde a Saga I. Yggorath é agora General Primaz, comandando frotas que estabelecem colônias em toda a galáxia. O episódio abre com uma operação de resgate em um planeta à beira do colapso ambiental - Yggorath não apenas salva a população, mas restaura o ecossistema usando seu Aethra nutritivo em escala planetária.", { indent: true }),
        createParagraph("A operação demonstra porque Yggorath é amada por cidadãos comuns e temida por rivais políticos. Seu poder não é destrutivo, mas criativo - ela pode fazer mundos inteiros florescerem. Porém, o esforço a deixa exausta por meses, sugerindo que nem mesmo seu poder é ilimitado.", { indent: true }),
        createParagraph("Alyndra aparece brevemente, agora claramente transformada pelo Fruto. Ela move-se diferentemente, fala em camadas de significado. Observa Yggorath com uma mistura de orgulho e tristeza que a irmã não consegue interpretar. 'Você está pronta, mana. Para o que vier. Não duvide disso.'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 2: \"A Primeira Sombra\"")] }),
        createParagraph("Durante uma missão diplomática, Yggorath encontra Lyrianna, embaixadora de uma civilização que Aetherion está considerando absorver. Lyrianna é a primeira a expressar preocupações sobre Aetherion - 'Vocês são maravilhosos, mas há algo... errado. Decisões que não fazem sentido. Políticas que contradizem seus próprios valores.'", { indent: true }),
        createParagraph("Yggorath inicialmente defende sua civilização, mas Lyrianna planta uma semente de dúvida. 'Pergunte a si mesma: quando foi a última vez que uma decisão importante do Conselho realmente beneficiou alguém que não fosse do círculo interno? Quando foi a última vez que vocês não expandiram?'", { indent: true }),
        createParagraph("O clímax do episódio é assustadoramente sutil: Yggorath percebe que tomou uma decisão que parecia sua, mas que agora, analisando, não fazia sentido para ela. Foi influenciada? Por quem? Quando? A primeira sombra do verdadeiro inimigo é lançada.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 3: \"O Segredo de Vorymir\"")] }),
        createParagraph("Yggorath reencontra Vorymir após séculos. Ele está mudado - mais velho, mais cansado, mas com uma luz maníaca nos olhos quando fala sobre o Projeto Abismo. 'Estamos tão perto, Yggorath! Vamos abrir uma porta para o próprio Vazio Primordial! Imagina o potencial!'", { indent: true }),
        createParagraph("Yggorath sente algo terrivelmente errado. Seu Aethra nutritivo percebe fragmentos de... algo... nos pensamentos de Vorymir. Pensamentos que não pertencem a ele. Quando tenta investigar, Vorymir se afasta bruscamente. 'Você não entende. Ninguém entende. Isso é maior que todos nós.'", { indent: true }),
        createParagraph("Alyndra aparece após o encontro. 'Não tente salvá-lo. Já é tarde demais para ele. Foque em quem ainda pode ser salvo.' Yggorath fica chocada com a frieza da irmã, sem saber que Alyndra viu tudo isso em suas visões do Fruto - e sabe que tentativas de salvamento apenas acelerariam a corrupção.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 4: \"A Guerra das Sombras\"")] }),
        createParagraph("Um conflito armado explode em uma região fronteiriça - civilizações menores que Aetherion absorveu estão se rebelando. Yggorath é enviada para 'pacificar', mas descobre que a rebelião foi provocada por ações de Aetherion que ela mesma não recorda ter aprovado.", { indent: true }),
        createParagraph("A guerra é apresentada com batalhas épicas, mas o foco é o dilema moral de Yggorath. Ela pode esmagar a rebelião facilmente, mas seu Aethra a impede de causar sofrimento desnecessário. Em vez disso, encontra uma solução diplomática que satisfaz ambas as partes - uma vitória que surpreende a todos.", { indent: true }),
        createParagraph("Porém, alguém manipulou os registros para parecer que Yggorath ordenou os ataques iniciais. Thormund, general rival, a confronta publicamente. A disputa política que se segue revela facções dentro de Aetherion - e Yggorath percebe que está no centro de um jogo que não compreende.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 5: \"A Voz\"")] }),
        createParagraph("Este é o episódio de terror psicológico. Yggorath começa a ouvir uma voz suave em momentos de cansaço ou dúvida. A voz é gentil, oferecendo conselhos que parecem sábios. 'Você merece mais reconhecimento. Eles não valorizam seu sacrifício.' 'Alyndra guarda segredos que poderiam machucá-la.'", { indent: true }),
        createParagraph("Xaryntha, a Sussurrante, faz sua presença conhecida. Não como inimiga declarada, mas como 'amiga' que entende a solidão de Yggorath. A manipulação é insidiosa porque usa verdades parciais - Alyndra realmente tem segredos; Yggorath realmente não é valorizada como deveria.", { indent: true }),
        createParagraph("O ponto de virada ocorre quando Xaryntha sugere que Yggorath deveria 'verificar' os laboratórios de Tempestra por si mesma. A tentação é forte. Mas Alyndra aparece no momento crítico, não para impedir, mas para perguntar: 'Você confia em mim?' Yggorath hesita - e essa hesitação é o que Xaryntha queria. A semente de desconfiança foi plantada.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 6: \"Aliança Improvável\"")] }),
        createParagraph("Thormund, o rival de Yggorath, solicita uma reunião secreta. Ele revela que também percebeu algo errado em Aetherion - decisões sendo tomadas que ninguém lembra de tomar, pessoas agindo fora de caráter. 'Não sei o que está acontecendo, mas sei que você é a única pessoa poderosa demais para ser afetada. Ou está?'", { indent: true }),
        createParagraph("Juntos, eles começam uma investigação clandestina. Descobrem que a corrupção não é física ou tecnológica - é algo que afeta a mente e a vontade. Lyrianna, a embaixadora alienígena, junta-se a eles, trazendo perspectivas de fora que Aetherion não pode perceber.", { indent: true }),
        createParagraph("O episódio termina com uma revelação aterrorizante: Vorymir, o primeiro amor de Yggorath, está no centro de algo em Tempestra. E quando Yggorath tenta contatá-lo, seus olhos estão diferentes. 'Não se preocupe, Yggorath. Em breve, todos entenderão.'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 7: \"O Fruto do Conhecimento\"")] }),
        createParagraph("Alyndra convoca Yggorath para uma conversa que mudará tudo. Ela revela o que aprendeu através do Fruto: os Nihilaryth existem, estão infiltrados em Aetherion há séculos, e a civilização está condenada. 'Eu vi o fim, mana. E vi que não há como evitá-lo. Mas vi também como preparar o que vem depois.'", { indent: true }),
        createParagraph("A revelação destrói Yggorath emocionalmente. Tudo que ela construiu, protegeu, amou - condenado. Mas Alyndra explica o plano: extrair a essência espiritual de Aetherion antes da queda, preservar as sementes que podem renascer, preparar Yggorath para ser a mãe de uma nova esperança.", { indent: true }),
        createParagraph("'Por que você?' Yggorath pergunta. 'Porque seu Aethra é nutritivo,' Alyndra responde. 'Você pode criar vida do nada. Sustentar existência. Quando Aetherion cair, você será a única que pode carregar a semente do que virá.'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 8: \"A Criação da Armadura\"")] }),
        createParagraph("Alyndra revela seu projeto secreto: a Armadura Primordial. Usando poder do Fruto, ela forjou uma armadura capaz de amplificar o Aethra de seu usuário a níveis divinos temporários. 'Não para mim,' ela explica. 'Para você. Para quando chegar o momento final.'", { indent: true }),
        createParagraph("O processo de criação é visualizado em sequência impressionante - Alyndra manipulando as próprias leis da física, forjando matéria a partir de energia pura, incorporando fragmentos da Árvore da Existência na estrutura da armadura. Cada parte representa um aspecto diferente de poder e proteção.", { indent: true }),
        createParagraph("A armadura não está completa. Alyndra explica que algumas partes precisam ser separadas e escondidas - 'Se os Nihilaryth conseguissem a armadura completa, seria catastrófico. Mesmo que não possam usá-la, poderiam impedir que você a usasse.'", { indent: true }),

        // =====================================
        // SAGA III: CLÍMAX FINAL
        // =====================================
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("SAGA III: CLÍMAX FINAL")] }),
        new Paragraph({
          shading: { fill: colors.saga3, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "\"Às vezes, a única vitória possível é a sobrevivência\"", size: 24, italics: true, color: colors.secondary, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Visão Geral da Saga")] }),
        createParagraph("A terceira saga marca o início do fim. O Portal de Tempestra é ativado, os Nihilaryth atravessam, e Aetherion começa a desmoronar de dentro para fora. Yggorath assiste impotente enquanto tudo que ela amou é corrompido ou destruído. Alyndra executa a primeira fase de seu plano, enquanto Yggorath deve escolher entre tentar salvar o irrecuperável ou preservar o que pode renascer.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 Estrutura Episódica")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 1: \"O Portal Abre\"")] }),
        createParagraph("O episódio opens com a ativação do Portal Quântico em Tempestra. Vorymir, agora completamente corrompido, lidera a cerimônia. Milhares assistem via transmissão, esperando ver o Vazio Primordial. O que vem é pior - as essências dos Nihilaryth atravessam em uma explosão de energia que, para a maioria, parece como sucesso científico.", { indent: true }),
        createParagraph("Yggorath sente a mudança instantaneamente. Seu Aethra nutritivo percebe algo fundamentalmente errado entrando no universo. Ela corre para Tempestra, mas já é tarde demais. As essências não permanecem visíveis - elas se espalham, buscando hospedeiros entre os espectadores.", { indent: true }),
        createParagraph("O horror é sutil primeiro: pessoas agindo estranhamente, decisões políticas mudando da noite para o dia, aliados tornando-se inimigos sem explicação clara. Yggorath encontra Vorymir, que a reconhece brevemente - há um momento de luta em seus olhos - antes que a corrupção retome o controle. 'Yggorath... corra... não é... sua...' Ele se afasta, claramente sofrendo.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 2: \"A Corrupção se Espalha\"")] }),
        createParagraph("Semanas após a abertura do Portal, Aetherion está irreconhecível. Não há invasão aberta, não há exércitos inimigos - apenas uma podridão sutil que se espalha. Políticas absurdas são aprovadas, aliados se voltam uns contra os outros, paranoia cresce. Thormund, o aliado de Yggorath, é o primeiro a ser exposto publicamente como 'traidor' - uma armadilha montada pelos corrompidos.", { indent: true }),
        createParagraph("Yggorath tenta salvar Thormund, mas descobre que ele realmente cometeu atos que não lembra - a corrupção funciona através de manipulação de escolhas genuínas. Ele não foi controlado, foi influenciado a fazer coisas que acreditou serem certas. A distinção é crucial e aterrorizante.", { indent: true }),
        createParagraph("Lyrianna, a embaixadora, consegue escapar de Aetherion com algumas evidências. 'Sua civilização está condenada,' ela diz a Yggorath. 'O que você decidir fazer, decida rápido. E não tente salvar todos - isso é exatamente o que eles esperam.'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 3: \"A Primeira Batalha\"")] }),
        createParagraph("Os Nihilaryth revelam-se pela primeira vez de forma aberta. Um dos Dez - Krythanna, a Ilusionista - manifesta-se através de um hospedeiro voluntário e ataca uma colônia frontal. Yggorath enfrenta sua primeira batalha real contra um Primordial Corrupto.", { indent: true }),
        createParagraph("A luta é visualmente espetacular e emocionalmente devastadora. Krythanna não apenas combate fisicamente - ela cria ilusões de entes queridos de Yggorath sofrendo, de Yggorath falhando, de futuros terríveis. O Aethra nutritivo de Yggorath permite que ela perceba as ilusões, mas cada uma planta sementes de dúvida.", { indent: true }),
        createParagraph("Yggorath vence a batalha, mas não a guerra. Krythanna é forçada a recuar, mas deixa Yggorath emocionalmente abalada. 'Sua irmã sabia sobre nós,' a Ilusionista sussurra ao partir. 'Alyndra viu tudo isso e escolheu não impedir. Pergunte a si mesma: por que?'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 4: \"A Verdade de Alyndra\"")] }),
        createParagraph("Yggorath confronta Alyndra com o que aprendeu. A conversa que se segue é uma das mais emocionalmente intensas da história. Alyndra revela tudo: o que viu através do Fruto, a inevitabilidade da queda, o plano que vem executando por séculos.", { indent: true }),
        createParagraph("'Você me manipulou,' Yggorath acusa. 'Você me preparou para ser sua... substituta? Ferramenta?' Alyndra não nega. 'Preparei você para ser a mãe do que virá depois. Para carregar a esperança quando tudo mais falhar. Isso é mais importante do que você ou eu.'", { indent: true }),
        createParagraph("O momento de ruptura entre as irmãs é devastador. Yggorath afasta-se, sentindo-se traída. Mas Alyndra a deixa com uma última verdade: 'Eu vi minha morte no momento em que consumi o Fruto. Vi que era necessária. E vi que você precisaria me odiar para fazer o que precisa ser feito. Por isso nunca contei a verdade completa.'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 5: \"Escolhas Impossíveis\"")] }),
        createParagraph("A corrupção atinge o Conselho de Aetherion. Metade dos membros está sob influência direta dos Nihilaryth, e a guerra civil começa. Não é uma guerra convencional - é uma guerra de manipulação onde cada batalha destrói mais a estrutura da civilização.", { indent: true }),
        createParagraph("Yggorath está dividida. Seu instinto é proteger, salvar, curar. Mas Alyndra explicou que tentar salvar Aetherion apenas prolonga o sofrimento e arrisca a corrupção espalhar-se mais. A escolha impossível: assistir sua civilização morrer ou acelerar a queda.", { indent: true }),
        createParagraph("Krystara, a rival tornada amiga, aparece para Yggorath. Ela também percebeu a verdade. 'Vamos perder, não é?' Yggorath confirma. 'Então o que fazemos?' A resposta de Yggorath define sua transformação: 'Preparamos o que vem depois.'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 6: \"O Êxodo Silencioso\"")] }),
        createParagraph("Enquanto a guerra civil consome Aetherion, Alyndra e Yggorath trabalham secretamente na extração da essência espiritual do planeta. Não é uma evacuação física - é a preservação da alma da civilização, seus conhecimentos, memórias, potencial.", { indent: true }),
        createParagraph("O processo é mostrado em detalhes impressionantes: Alyndra usando poder do Fruto para acessar o núcleo espiritual do planeta, Yggorath usando seu Aethra nutritivo para nutrir e preservar a essência extraída. Juntas, elas criam as Sementes que serão dispersadas pelo universo.", { indent: true }),
        createParagraph("O planeta começa a morrer no processo. Cidades flutuantes perdem altitude, sistemas energéticos falham, a atmosfera se deteriora. Para o mundo exterior, parece como desastre natural. Apenas Alyndra e Yggorath sabem que estão matando o planeta para preservar sua alma.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 7: \"Vorymir\"")] }),
        createParagraph("Yggorath encontra Vorymir uma última vez. Ele está profundamente corrompido, mas fragmentos de sua personalidade original ainda existem. A cena é um reverso do romance da Saga I - onde havia esperança, agora há tragédia.", { indent: true }),
        createParagraph("'Eu sinto... o que fizeram comigo,' Vorymir diz, lutando. 'Não é... controle. É... persuasão. Eu escolhi... tudo. Achei que eram... minhas ideias.' A revelação é devastadora - a corrupção não remove livre-arbítrio, ela manipula escolhas.", { indent: true }),
        createParagraph("Vorymir pede para Yggorath matá-lo, mas ela não consegue. Em vez disso, ela usa seu Aethra nutritivo para preservar os fragmentos de consciência que restam - não para salvá-lo, mas para que ele possa testemunhar o que acontece quando morrer naturalmente. Um ato de misericórdia ambígua.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 8: \"O Confronto\"")] }),
        createParagraph("Os Nihilaryth percebem o plano de Alyndra e Yggorath. Vorynthrix, o líder, manifesta-se através de múltiplos hospedeiros simultaneamente, confrontando as irmãs juntas pela primeira vez. A batalha que se segue é de escala nunca antes vista.", { indent: true }),
        createParagraph("Vorynthrix não é um inimigo convencional. Ele ataca através de manipulação, mostrando às irmãs visões de futuros onde falham, onde uma trai a outra, onde tudo foi em vão. O combate é tanto psicológico quanto físico, cada movimento carregado de significado simbólico.", { indent: true }),
        createParagraph("Alyndra demonstra pela primeira vez o verdadeiro poder do Fruto. Ela resiste a Vorynthrix não através de força bruta, mas através de compreensão - ela viu tudo isso em suas visões, preparou-se para este momento. 'Você não pode me surpreender,' ela diz. 'Porque eu já vivi isso todas as vezes que importava.'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 9: \"A Morte de Krystara\"")] }),
        createParagraph("Enquanto Alyndra confronta Vorynthrix, os outros Nihilaryth atacam as instalações onde as Sementes estão sendo preparadas. Krystara, que Yggorath treinou pessoalmente, lidera a defesa.", { indent: true }),
        createParagraph("A batalha é desesperada. Krystara enfrenta três Primordiais Corruptos simultaneamente, sabendo que não pode vencer - apenas ganhar tempo. Seu sacrifício é mostrado em detalhes emocionais, cada momento carregado de significado.", { indent: true }),
        createParagraph("Yggorath chega tarde demais para salvá-la, mas a tempo de preservar sua essência. 'Você foi a rival que se tornou amiga,' Yggorath chora. 'Você foi a melhor de nós.' Krystara, nos últimos momentos, sorri. 'Então honre isso. Viva. Crie algo melhor.'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 10: \"Preparação Final\"")] }),
        createParagraph("As Sementes estão prontas. Os Nanobots Primordiais finais estão completos. A Armadura aguarda Yggorath. Alyndra explica o que acontecerá: ela enfrentará os Nihilaryth diretamente, usando todo o poder do Fruto para dilatá-los pelo universo.", { indent: true }),
        createParagraph("'Isso vai te matar,' Yggorath finalmente entende. 'Você sabia o tempo todo.' Alyndra confirma. 'Vi no momento em que consumi o Fruto. Cada visão mostrava minha morte como necessária. Tentei encontrar outro caminho. Não existe.'", { indent: true }),
        createParagraph("As irmãs compartilham um momento de reconciliação. Não há perdão completo - não pode haver, após tantas manipulações - mas há compreensão. Yggorath entende que Alyndra sacrificou tudo, inclusive a relação entre elas, pelo bem maior. E Alyndra entende que Yggorath carregará o peso dessa escolha para sempre.", { indent: true }),

        // =====================================
        // SAGA IV: FUGA E SACRIFÍCIO
        // =====================================
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("SAGA IV: FUGA E SACRIFÍCIO")] }),
        new Paragraph({
          shading: { fill: colors.saga4, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "\"Do sacrifício nasce a esperança\"", size: 24, italics: true, color: colors.secondary, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 Visão Geral da Saga")] }),
        createParagraph("A saga final é a mais intensa e emocional de todas. Alyndra executa seu sacrifício, Yggorath enfrenta a batalha de sua vida usando a Armadura Primordial, e tudo culmina na fuga para o Paraíso Espiritual onde Yggorath renascerá como Árvore Primordial. Esta saga define o legado que ecoará através de todas as eras futuras.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 A Armadura Primordial")] }),
        createParagraph("Antes de entrar na batalha final, Yggorath recebe a Armadura Primordial - não completa, mas suficiente para a batalha que virá. A armadura é descrita em detalhes visuais impressionantes:", { indent: true }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2340, 3120, 3900],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Parte", 2340),
              createHeaderCell("Função", 3120),
              createHeaderCell("Descrição Visual", 3900)
            ]}),
            new TableRow({ children: [
              createCell("Elmo", { width: 2340, center: true }),
              createCell("Percepção ampliada", { width: 3120 }),
              createCell("Coroa de luz cristalina, olhos que veem além do físico", { width: 3900 })
            ]}),
            new TableRow({ children: [
              createCell("Peitoral", { width: 2340, center: true }),
              createCell("Proteção absoluta", { width: 3120 }),
              createCell("Placas de energia solidificada, pulsando com Aethra", { width: 3900 })
            ]}),
            new TableRow({ children: [
              createCell("Manoplas", { width: 2340, center: true }),
              createCell("Amplificação de Aethra", { width: 3120 }),
              createCell("Luvas que canalizam poder como extensão do corpo", { width: 3900 })
            ]}),
            new TableRow({ children: [
              createCell("Grevas", { width: 2340, center: true }),
              createCell("Mobilidade transcendente", { width: 3120 }),
              createCell("Pernas que permitem movimento entre planos", { width: 3900 })
            ]}),
            new TableRow({ children: [
              createCell("Capa/Asas", { width: 2340, center: true }),
              createCell("Voo e defesa", { width: 3120 }),
              createCell("Asas de energia que protegem e propulsionam", { width: 3900 })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 Estrutura Episódica")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 1: \"O Presente de Despedida\"")] }),
        createParagraph("Alyndra presenteia Yggorath com a Armadura Primordial. A cena é íntima e triste - duas irmãs que sabem que nunca se encontrarão novamente. Alyndra ajuda Yggorath a vestir cada peça, explicando suas funções.", { indent: true }),
        createParagraph("'Eu a criei para você,' Alyndra explica. 'Cada parte foi forjada com um propósito específico. Juntas, elas amplificarão seu Aethra nutritivo a níveis que permitirão criar vida do nada. Sustentar existência. Ser... uma mãe para o que virá.'", { indent: true }),
        createParagraph("A armadura não é apenas equipamento - é um legado. Fragmentos da consciência de Alyndra foram incorporados à estrutura, permitindo que Yggorath 'converse' com a memória de sua irmã nos momentos mais difíceis. Não é ressurreição, mas é algo.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 2: \"A Batalha dos Dez\"")] }),
        createParagraph("Os Dez Nihilaryth se reúnem para a batalha final. Pela primeira vez, todos se manifestam simultaneamente, cada um através de um hospedeiro diferente. Eles não pretendem destruir Aetherion - pretendem consumir sua essência para retornar à existência plena.", { indent: true }),
        createParagraph("Alyndra e Yggorath, vestida na Armadura Primordial, enfrentam os Dez juntos. A batalha é de escala cósmica - não apenas física, mas espiritual. Cada golpe troca significado, cada defesa carrega memória, cada ataque é uma escolha.", { indent: true }),
        createParagraph("A dinâmica de combate mostra a diferença entre as irmãs: Alyndra destrói com precisão cirúrgica, seu poder do Fruto permitindo que ela enfrente múltiplos inimigos simultaneamente; Yggorath protege e nutre, seu Aethra curando aliados, criando barreiras que regeneram, sustentando a batalha como um todo.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 3: \"O Sacrifício de Alyndra\"")] }),
        createParagraph("O momento culminante da história. Alyndra determina que a única forma de derrotar os Nihilaryth é usar TODO o poder do Fruto de uma vez - não para destruí-los, mas para dilatá-los pelo universo. O processo consumirá completamente sua força vital.", { indent: true }),
        createParagraph("A despedida entre as irmãs é breve mas completa. 'Você me odeia?' Alyndra pergunta. 'Você me manipulou, usou, mentiu,' Yggorath responde. 'E eu te amo mais do que qualquer coisa neste universo moribundo.'", { indent: true }),
        createParagraph("Alyndra executa o sacrifício em uma sequência de beleza trágica. Seu corpo dissipa-se em luz, seu poder espalha-se pelo cosmos, e os Nihilaryth são rasgados, suas essências dilatadas por distâncias incompreensíveis. Levará eras para se recomporem - tempo comprado para o universo.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 4: \"Yggorath Sozinha\"")] }),
        createParagraph("Com Alyndra morta e os Nihilaryth dispersos temporariamente, Yggorath fica sozinha em um planeta morrendo. Aetherion está devastado, a maioria da população morta ou corrompida, as cidades em ruínas. Mas as Sementes estão seguras.", { indent: true }),
        createParagraph("Este é o episódio mais introspectivo. Yggorath processa seu luto, sua raiva, sua perda. Conversa com os fragmentos de Alyndra na armadura. Recorda Vorymir, Krystara, todos os que perdeu. Questiona se valeu a pena.", { indent: true }),
        createParagraph("A resposta vem de uma fonte inesperada - a própria Árvore da Existência se comunica com Yggorath através de sua Sensibilidade Primordial. 'Você carrega a esperança. A semente do que virá. O destino do universo agora repousa em seus ombros.'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 5: \"A Coleta\"")] }),
        createParagraph("Yggorath viaja pelo que resta de Aetherion, coletando as últimas Sementes e os Nanobots Primordiais que Alyndra preparou. Encontra bolsões de sobreviventes, alguns corruptos, outros não. Deve escolher quem salvar.", { indent: true }),
        createParagraph("As escolhas são impossíveis. Não há espaço para todos nas Sementes. Alguns que parecem salvos estão corrompidos de formas sutis. Yggorath deve usar seu Aethra nutritivo para testar a pureza de cada um - um processo que causa dor genuína.", { indent: true }),
        createParagraph("Uma revelação aterrorizante: Thormund, seu aliado, está corrompido. Não completamente, mas o suficiente. Ele implora para ser levado, jurando lealdade. Yggorath deve decidir - arriscar a corrupção se espalhando ou abandonar um amigo.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 6: \"O Êxodo\"")] }),
        createParagraph("Yggorath lidera os sobreviventes puros em uma jornada para fora do sistema Aetherion. Usando a Armadura Primordial, ela cria uma bolha de existência estável ao redor de uma nave de evacuação - o Aethra nutritivo sustentando vida onde não deveria haver.", { indent: true }),
        createParagraph("A jornada é longa e perigosa. Fragmentos dos Nihilaryth, embora dispersos, ainda representam ameaça. Yggorath enfrenta batalhas constantes enquanto simultaneamente mantém a bolha de existência.", { indent: true }),
        createParagraph("Durante a viagem, Yggorath descobre que está mudando. A Armadura Primordial, combinada com seu uso constante de Aethra nutritivo em escala cósmica, está transformando sua própria natureza. Ela está se tornando... algo mais.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 7: \"O Paraíso Espiritual\"")] }),
        createParagraph("A nave chega ao Paraíso Espiritual Inicial - um plano de existência entre o material e o Vazio, onde Yggorath pode estabelecer um refúgio. Mas para sustentar este refúgio permanentemente, ela precisará se fundir com o próprio local.", { indent: true }),
        createParagraph("A decisão é pesada. Yggorath entende que se fundir ao Paraíso Espiritual significa abandonar sua forma física, sua mobilidade, sua capacidade de interferir diretamente no mundo material. Em troca, ela poderá criar e nutrir vida de formas impossíveis antes.", { indent: true }),
        createParagraph("'É isso que você queria, mana?' Yggorath pergunta aos fragmentos de Alyndra na armadura. 'Me transformar em uma árvore que observa sem poder agir?' A resposta vem como eco de memória: 'Eu queria que você tivesse a escolha que eu não tive.'", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Episódio 8: \"A Transformação\"")] }),
        createParagraph("O episódio final da saga mostra a transformação de Yggorath na Árvore Primordial. Não é morte - é transcendência. Seu corpo físico dissolve-se em energia, seu Aethra expande-se para preencher todo o Paraíso Espiritual, sua consciência funde-se com a estrutura do próprio plano.", { indent: true }),
        createParagraph("A transformação é visualizada como uma árvore crescendo de onde Yggorath estava - não uma árvore comum, mas uma estrutura de energia e possibilidade que conecta este plano a todos os outros. Raízes no Vazio, galhos tocando o material, tronco sustentando existência.", { indent: true }),
        createParagraph("Antes de completar a fusão, Yggorath cria os Seraphyens - dez filhos nascidos de seu próprio Aethra, cada um representando um elemento primordial. Ela os cria com memória genética, conhecimento de Aetherion, e a missão de preparar o universo para o que virá.", { indent: true }),
        createParagraph("A cena final mostra a Árvore Primordial brilhando no Paraíso Espiritual. Ao seu redor, os dez Seraphyens recém-nascidos. No plano material, as Sementes de Aetherion espalhando-se pelo universo. E muito distante, fragmentos dos Nihilaryth começando a lenta jornada de reconstituição.", { indent: true }),
        createParagraph("A última linha pertence à voz de Yggorath, agora parte da Árvore: 'Alyndra, minha irmã. Eu entendo agora. O amor que nos une não é fraqueza. É a força mais poderosa que existe. E através de nossos filhos, e dos filhos de nossos filhos, um dia... vamos acabar com isso de uma vez por todas.'", { indent: true }),

        // CONCLUSÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Conclusão das Sagas")] }),
        createParagraph("As Quatro Sagas de Yggorath estabelecem a fundação para todo o universo de Alyndras. Cada saga constrói sobre a anterior, elevando as apostas e aprofundando os personagens. O arco de Yggorath - de criança descobrindo seu poder a entidade transcendente nutrindo toda existência - é o modelo para os arcos futuros de Grazielly e Iris.", { indent: true }),
        createParagraph("A estrutura proposta permite adaptação para diferentes formatos mantendo a essência narrativa. Cada episódio contém momentos de ação, desenvolvimento de personagem, e progressão de enredo, evitando os problemas de obras que priorizam um aspecto sobre outros.", { indent: true }),
        createParagraph("O legado destas sagas ecoará através das Eras subsequentes, com elementos estabelecidos aqui retornando em contextos novos e inesperados. A Armadura Primordial, os Nanobots, as Sementes, os Seraphyens - todos são sementes plantadas para histórias futuras.", { indent: true })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Quatro_Sagas_Yggorath.docx", buffer);
  console.log("Four Sagas document created successfully!");
});
