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
  warning: "FFF3CD",
  danger: "F8D7DA",
  success: "D4EDDA"
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
      { reference: "numbered-3", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    // CAPA
    {
      properties: { page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } } },
      children: [
        new Paragraph({ spacing: { before: 5000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "UNIVERSO DE ALYNDRAS", size: 72, bold: true, color: colors.primary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 300 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "SABATINA CRÍTICA", size: 56, bold: true, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Análise de Inconsistências, Lacunas e Soluções", size: 32, italics: true, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 3500 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Para Fãs Exigentes e Críticos Atentos", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Todas as Respostas Definitivas", size: 22, color: colors.accent, font: "Times New Roman", italics: true })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // CONTEÚDO
    {
      properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: {
        default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Universo de Alyndras - Sabatina Crítica", size: 18, color: colors.accent, font: "Times New Roman" })] })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "— ", size: 18, font: "Times New Roman" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Times New Roman" }), new TextRun({ text: " —", size: 18, font: "Times New Roman" })] })] })
      },
      children: [
        // INTRODUÇÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Introdução à Sabatina")] }),
        createParagraph("Este documento representa uma análise crítica exaustiva do universo de Alyndras, examinando cada aspecto da cosmologia, personagens, mecânicas de poder e cronologia em busca de inconsistências, lacunas narrativas e questões que fãs exigentes poderiam levantar. O objetivo não é encontrar falhas por encontrar, mas garantir que o universo tenha solidez suficiente para resistir ao escrutínio de leitores atentos e críticos dedicados.", { indent: true }),
        createParagraph("Cada questão identificada vem acompanhada de uma resposta concreta e definitiva, estabelecendo elementos canônicos que devem ser respeitados em qualquer expansão futura do universo. Esta sabatina serve como fundação para garantir consistência narrativa em todas as histórias derivadas, sejam romances, roteiros, jogos ou qualquer outra mídia.", { indent: true }),

        // CATEGORIA 1: COSMOLOGIA
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Questões Cosmológicas")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 O Criador e a Árvore da Existência")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 1: O Criador ainda existe?")] }),
        createParagraph("Se a Vontade Pura criou o universo, ela ainda existe como entidade consciente? Ou dissipou-se na criação? Isso afeta a natureza do universo - há um deus que observa e julga, ou o universo opera autonomamente?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "A Vontade Pura (O Criador) não existe mais como entidade consciente separada. Ela transformou-se completamente na estrutura do universo - suas características tornaram-se as leis fundamentais, sua consciência fragmentou-se em infinitas centelhas que se tornaram as primeiras formas de vida. O Criador escolheu a não-existência como entidade para permitir a existência de tudo mais. Por isso a Lei da Pureza não é imposta por um juiz externo, mas é uma lei intrínseca da realidade, como a gravidade. Não há ninguém para apelar, negociar ou desafiar - apenas consequências naturais de ações.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 2: Quem criou o Criador?")] }),
        createParagraph("Se tudo precisa de uma origem, o que existia antes do Vazio Primordial? Há uma regressão infinita de criadores?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "O conceito de 'antes' não se aplica ao Vazio Primordial porque tempo não existia. O Vazio é eterno e sem causa - é o estado natural de não-existência que sempre foi e sempre será. A Vontade Pura não foi 'criada', ela 'despertou' - foi uma flutuação espontânea no potencial infinito do Vazio. Assim como na física quântica partículas podem surgir do vácuo, a Vontade surgiu do Vazio. Não há regressão infinita porque o Vazio não é um objeto que precisa de origem - é a ausência de qualquer coisa, incluindo ausência de origem.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 3: Por que apenas UM Fruto por eons?")] }),
        createParagraph("Se a Árvore é tão poderosa, por que produz apenas um Fruto de tempos em tempos? Isso parece limitação arbitrária para criar escassez dramática.", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "O Fruto representa a cristalização de TODO o potencial processado pela Árvore durante um ciclo. A Árvore funciona continuamente filtrando potencial do Vazio e transformando-o em realidade estável. O 'excesso' de processamento é acumulado até atingir massa crítica - momento em que se torna um Fruto. A produção não é lenta por limitação, mas porque acumular poder suficiente para reescrever a realidade leva eons de processamento contínuo. Frutos múltiplos simultâneos seriam instáveis - a Árvore só pode manter uma concentração de potencial por vez. Além disso, Frutos não consumidos eventualmente dissipam-se de volta para o sistema, nutrindo o próprio universo.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 A Lei da Pureza")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 4: O critério de 'Pureza' é objetivo ou subjetivo?")] }),
        createParagraph("Como a pureza é medida? Por intenções? Por consequências? Por adesão a um código moral específico? Diferentes culturas têm diferentes morais - quem define o padrão?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "A Pureza é medida pela HARMONIA com a estrutura fundamental do universo, não por moralidade cultural. O universo opera em princípios de equilíbrio, interconexão e causalidade responsável. Ações que fortalecem estas estruturas aumentam pureza; ações que as enfraquecem diminuem. Não é sobre 'bem' e 'mal' culturais - um guerreiro que mata para proteger pode ter pureza maior que um pacifista cuja inação permite sofrimento massivo. O julgamento considera: intenção consciente, conhecimento disponível, alternativas viáveis, consequências reais, e impacto no tecido da realidade. Mortais não têm acesso total a esta informação, por isso o julgamento ocorre na morte quando a perspectiva completa torna-se disponível.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 5: Os Nihilaryth podem ser redimidos?")] }),
        createParagraph("Se a Lei da Pureza tem exceções e o universo busca equilíbrio, existe algum caminho para os Nihilaryth serem perdoados ou reintegrados?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "Teoricamente, SIM. Os Nihilaryth estão presos porque suas essências foram corrompidas ao tentar criar um universo separado. Se suas essências fossem purificadas - um processo que requer genuíno arrependimento, compreensão completa das consequências de seus atos, e disposição para dissolução voluntária caso a purificação falhe - o Vazio poderia aceitá-los novamente. Na prática, NINGUÉM entre os Nihilaryth atuais busca redenção - eles são definidos por sua rejeição do universo existente. Iris, como síntese de todas as linhagens e portadora de evolução constante, será a única capaz de oferecer este caminho de redenção durante o confronto final.", size: 22, font: "Times New Roman" })]
        }),

        // CATEGORIA 2: CIVILIZAÇÃO AETHERION
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Questões sobre Aetherion")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Tecnologia e Sociedade")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 6: Por que uma civilização tão avançada caiu para manipulação psicológica?")] }),
        createParagraph("Aetherion tinha tecnologia para curar corpos e almas, mas não conseguiu detectar a corrupção dos Nihilaryth? Isso parece incoerente.", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "A corrupção Nihilaryth não é uma doença ou vírus que pode ser detectado por tecnologia. Ela é INSIDIOSA precisamente porque funciona através de manipulação de escolhas genuínas. Os cientistas de Tempestra não estavam 'infectados' - eles estavam sendo guiados por intuições que pareciam suas próprias ideias brilhantes. A tecnologia de Aetherion detectava alterações forçadas no Aethra, mas os Nihilaryth não forçavam nada - eles influenciavam sutilmente de forma que as vítimas escolhessem voluntariamente o caminho da corrupção. Alyndra percebeu porque sua conexão com o Fruto lhe dava percepção de causalidade em escala universal - ela viu o PADRÃO, não infecções individuais. A lição: tecnologia avançada não protege contra manipulação quando esta respeita o livre-arbítrio das vítimas.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 7: Outras civilizações existiam?")] }),
        createParagraph("Aetherion era a única civilização avançada do universo? Se não, por que os Nihilaryth escolheram especificamente Aetherion?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "Outras civilizações existiam, mas Aetherion era única em um aspecto crucial: sua pesquisa de acesso direto ao Vazio Primordial. A maioria das civilizações avançadas explorava energia física, dimensões alternativas, ou manipulação de espaço-tempo convencional. Aetherion era a ÚNICA tentando abrir portas para o próprio Vazio - e isso era precisamente o que os Nihilaryth precisavam para retornar à existência. Os Nihilaryth não escolheram Aetherion aleatoriamente; eles cultivaram a civilização por milênios, influenciando seu desenvolvimento tecnológico e espiritual para criar as condições do experimento de Tempestra. Aetherion foi 'preparada' como vaso perfeito para a invasão.", size: 22, font: "Times New Roman" })]
        }),

        // CATEGORIA 3: AS IRMÃS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Questões sobre Alyndra e Yggorath")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 O Segredo e a Profecia")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 8: Quem fez a profecia das irmãs?")] }),
        createParagraph("Profecias pressupõem um profeta ou entidade que prevê o futuro. Quem profetizou sobre Alyndra e Yggorath?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "A 'profecia' não foi feita por um indivíduo, mas está GRAVADA na própria Árvore da Existência. A Árvore, como estrutura que conecta todos os planos e processa todo potencial, contém dentro de si padrões de probabilidade que se manifestam como 'profecias'. Certos Mestres de Aethra de Aetherion desenvolveram técnicas para ler estes padrões - não vendo o futuro determinado, mas vendo as linhas de probabilidade mais fortes. A profecia das irmãs era um padrão tão forte e antigo que estava inscrito nas 'fibras' da Árvore desde antes mesmo de Aetherion existir. É um padrão arquetípico que o universo tende a repetir quando busca evolução.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 9: Por que Yggorath não percebeu a verdade sobre Alyndra?")] }),
        createParagraph("Yggorath era General Primaz e tinha poder comparável a Alyndra em natureza diferente. Como não percebeu que estava sendo manipulada?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "Yggorath não percebeu porque Alyndra NUNCA a manipulou diretamente. Alyndra manipulou CIRCUNSTÂNCIAS ao redor de Yggorath - missões designadas, informações filtradas, aliados posicionados. Yggorath sempre tomou suas próprias decisões baseada em informação genuína; a manipulação estava em QUAL informação ela recebia. Alyndra usou seu poder do Fruto para ver quais experiências moldariam Yggorath na pessoa que precisava ser. Não houve controle mental ou engano direto - houve jardinagem cuidadosa de uma vida inteira. Yggorath só perceberia a verdade após a morte de Alyndra, quando fragmentos de memória do Fruto seriam transmitidos através do vínculo de sangue que as irmãs compartilhavam.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 10: Alyndra sabia que morreria?")] }),
        createParagraph("Ela consumiu o Fruto sabendo que o sacrifício seria necessário? Isso muda a natureza de suas escolhas.", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "SIM. Alyndra viu sua própria morte no momento em que consumiu o Fruto, e viu que era NECESSÁRIA. O Fruto não concedeu apenas poder - concedeu compreensão. Alyndra entendeu que sua morte era o único caminho porque: (1) Ela precisava usar TODO o poder do Fruto para dilatar os Nihilaryth, o que consumiria sua força vital; (2) Sua existência contínua atrairia os Nihilaryth reformados para a civilização remanescente; (3) O universo precisava do 'modelo' de sacrifício de amor que ela estabeleceria. Alyndra escolheu o Fruto SABENDO que era sua sentença de morte, e aceitou isso voluntariamente. Isto não diminui sua escolha - aumenta seu significado.", size: 22, font: "Times New Roman" })]
        }),

        // CATEGORIA 4: NIHILARYTH
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Questões sobre os Nihilaryth")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 11: Por que são exatamente DEZ?")] }),
        createParagraph("O número 10 parece arbitrário. Há significado ou é apenas escolha narrativa?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "Os dez Nihilaryth correspondem aos DEZ LÍDERES ORIGINAIS da civilização anterior que consumiram do Fruto anterior. Eram um conselho de governo que decidiu coletivamente buscar transcendência através da criação de um universo próprio. O número não é místico - é histórico. Porém, o universo tem forma de reconhecer padrões, e os DEZ ELEMENTOS PRIMORDIAIS (Fogo, Água, Terra, Ar, Raio, Luz, Trevas, Éter, Vazio, Tempo) formam uma estrutura de dez que se reflete em várias camadas da realidade. Coincidentemente ou não, os dez corruptos 'encaixam' em posições que seriam de elementos complementares, como se o universo tivesse 'lugares' para dez primordiais.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 12: Vorynthrix pode ser derrotado sem destruir os outros?")] }),
        createParagraph("Se Vorynthrix é o líder, derrotá-lo não dispersaria os outros? Eles funcionam como unidade ou individualmente?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "Os Nihilaryth são INDEPENDENTES, não uma mente coletiva. Vorynthrix é líder por ser o mais poderoso e mais antigo, não por controle sobre os outros. Derrotá-lo diminuiria significativamente a ameaça, mas os outros nove ainda existiriam e buscariam retorno à existência. A batalha final DEVE envolver todos os dez porque cada um representa uma forma diferente de corrupção e tentação. Derrotar Vorynthrix seria como derrotar um general - o exército continua, apenas sem coordenação central. Iris precisará enfrentar cada um em seu momento específico, usando métodos adaptados a cada forma de corrupção.", size: 22, font: "Times New Roman" })]
        }),

        // CATEGORIA 5: CRONOLOGIA
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. Questões Cronológicas")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 13: Quanto tempo passou entre cada era?")] }),
        createParagraph("A cronologia é vaga. Milênios? Milhões de anos? Isso afeta a credibilidade da preservação de memória e tecnologia.", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "ERA PRIMORDIAL: ~500 milhões de anos (desenvolvimento de Aetherion até queda). ERA DE YGGORATH: ~10.000 anos (período no Paraíso Espiritual antes da criação dos Seraphyens). ERA DOS SERAPHYENS: ~50.000 anos (até a Guerra e selamento). ERA DE GRAZIELLY: 2.000 anos após selamento (tempo de vida reduzido a 120 anos). ERA DE IRIS: Começa imediatamente após sacrifício de Grazy. A preservação de memória através de linhagens é explicada pela MEMÓRIA GENÉTICA (tecnologia Aetherion) que Yggorath incorporou em seus filhos Seraphyens. A tecnologia preservada (Nanobots, Armadura) foi intencionalmente escondida por Alyndra antes de sua morte em locais que só descendentes dignos poderiam acessar.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 14: Se Yggorath renasceu, Alyndra pode renascer?")] }),
        createParagraph("Se Yggorath tornou-se Árvore Primordial e criou os Seraphyens, existe possibilidade de Alyndra também retornar de alguma forma?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "NÃO no mesmo sentido. Yggorath renasceu porque NÃO consumiu o Fruto e morreu com pureza intacta, permitindo que sua consciência se fundisse com o universo. Alyndra consumiu o Fruto e usou TODO seu poder na batalha contra os Nihilaryth - sua essência foi CONSUMIDA no processo. Porém, fragmentos de sua consciência e memória existem em dois lugares: (1) Nos Nanobots Primordiais que ela criou, que podem 'falar' com Iris em momentos críticos; (2) No próprio Fruto da Existência, que guarda vestígios de todos que o consumiram. Iris poderá 'comunicar-se' com a memória de Alyndra, mas não é ressurreição verdadeira - é como consultar um registro gravado.", size: 22, font: "Times New Roman" })]
        }),

        // CATEGORIA 6: PODERES
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. Questões sobre Sistema de Poder")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 15: Por que os Seraphyens eram mais poderosos que os mortais?")] }),
        createParagraph("Se Yggorath criou os Seraphyens, por que eles tinham poderes tão superiores aos mortais atuais? O que mudou?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "Os Seraphyens foram criados DIRETAMENTE por Yggorath quando ela era uma com a Árvore Primordial. Eles receberam concentrações de Aethra que seriam impossíveis para corpos mortais normais sustentarem. Além disso, o selamento de Ilios e Nyxalor teve EFEITO COLATERAL de reduzir drasticamente o Aethra disponível no plano material. O planeta Aetherion da Era de Grazielly está em um universo 'empobrecido' de Aethra comparado ao que existia antes. Os Seraphyens eram 'deuses menores' por natureza; mortais atuais precisam trabalhar uma vida inteira para alcançar uma fração do que Seraphyens tinham ao nascer.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 16: Nanobots podem ser replicados?")] }),
        createParagraph("Se Noah era Silentis mas criou tecnologia, e Iris nasceu com nanobots no DNA, não seria possível replicar os nanobots e criar exércitos de super-soldados?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "Os Nanobots Primordiais são PARASITÁRIOS por natureza - eles se vinculam ao Aethra do hospedeiro e tornam-se parte dele. Tentar remover ou copiar nanobots de um hospedeiro vivo é fatal para o hospedeiro. Os nanobots que Iris herdou foram transmitidos através do DNA de Grazielly, mas esta transmissão só funciona através de HERANÇA BIOLÓGICA DIRETA. Noah estudou os nanobots por anos e conseguiu criar uma versão INFERIOR para sua armadura, mas replicar os Primordiais originais é impossível sem o conhecimento perdido de Aetherion. Além disso, os nanobots têm uma forma de 'consciência' rudimentar que REJEITA hospedeiros indignos - tentativas de forçar vínculo resultam em rejeição fatal.", size: 22, font: "Times New Roman" })]
        }),

        // CATEGORIA 7: A QUEDA
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. Questões sobre a Queda de Aetherion")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 17: Por que Alyndra não usou o Fruto para purificar Aetherion?")] }),
        createParagraph("Se o Fruto pode moldar realidade, por que não usou para remover a corrupção em vez de destruir a civilização?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "Alyndra TENTOU. O Fruto mostrou que a corrupção Nihilaryth não é algo que pode ser 'removido' porque não é uma substância - é uma MANIPULAÇÃO DE ESCOLHAS. Remover a corrupção significaria reescrever as mentes e memórias de todos que foram influenciados, o que: (1) Violaria seu livre-arbítrio fundamental; (2) Destruiria quem eles eram antes da influência; (3) Criaria uma civilização de marionetes sem alma genuína. Alyndra viu que qualquer caminho que tentasse 'salvar' Aetherion transformaria-a em algo pior que a destruição. A única opção verdadeira era permitir a queda, preservar as sementes do que poderia renascer, e preparar o futuro. Escolha trágica, não falta de poder.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 18: O que aconteceu com os corpos dos Aetherions?")] }),
        createParagraph("Quando o planeta morreu, bilhões de habitantes morreram. Seus corpos permaneceram? Foram consumidos? A biologia Aetherion era diferente?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "Quando Alyndra extraiu a essência espiritual do planeta, ela não matou os habitantes diretamente - ela 'colheu' suas almas junto com a alma do planeta. Os corpos físicos permaneceram no planeta morto, entrando em estado de preservação natural quando a atmosfera dissipou-se. O planeta Aetherion original ainda existe como um corpo celeste morto no espaço, coberto por bilhões de corpos preservados no vácuo. É um cemitério planetário que futuras civilizações poderiam descobrir. Alguns destes corpos foram encontrados e estudados por Noah, que aprendeu com eles a criar sua armadura tecnológica.", size: 22, font: "Times New Roman" })]
        }),

        // CATEGORIA 8: A ARMADURA
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("9. Questões sobre a Armadura Suprema")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 19: Quem criou a Armadura Suprema?")] }),
        createParagraph("A Armadura foi criada para Ilios, mas por quem? Yggorath? Alyndra? Tecnologia Aetherion?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "A Armadura Primordial foi criada por ALYNDRA antes de sua morte, usando poder do Fruto. Ela viu que Ilios precisaria de proteção e poder amplificado no futuro, então forjou a Armadura usando fragmentos da própria estrutura do universo. Cada parte da Armadura foi criada com um propósito específico e enviada para locais onde poderiam ser encontradas quando necessário. Alyndra também estabeleceu o RITO DE ILIOS - a cerimônia que permite a um usuário digno conectar-se completamente com a Armadura e receber poder temporário comparável ao divino.", size: 22, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("QUESTÃO 20: A Armadura pode ser usada pelo lado errado?")] }),
        createParagraph("Se a Armadura é tão poderosa, o que impede um vilão de usá-la para destruição?", { indent: true }),
        new Paragraph({
          shading: { fill: colors.success, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "RESPOSTA DEFINITIVA: ", bold: true, size: 22, font: "Times New Roman" }), new TextRun({ text: "A Armadura tem proteções intrínsecas: (1) Cada parte só se revela para alguém com LINHAGEM ESPECÍFICA (descendentes de Ilios ou Yggorath); (2) O Rito de Ilios só pode ser completado por alguém com PUREZA DE CORAÇÃO comprovada - tentar o rito com intenções corruptas resulta em rejeição fatal; (3) A Armadura 'conhece' seu usuário legítimo e pode recusar ativação mesmo se fisicamente vestida. Grazy do Futuro possuída consegue usar partes roubadas (Bota e Luva) porque ela AINDA É descendente de Ilios e fisicamente capaz, mas nunca conseguirá reunir a Armadura completa ou completar o Rito.", size: 22, font: "Times New Roman" })]
        }),

        // TABELA RESUMO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("10. Resumo das Questões Críticas")] }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [600, 3500, 2500, 2760],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("#", 600),
              createHeaderCell("Questão", 3500),
              createHeaderCell("Categoria", 2500),
              createHeaderCell("Status", 2760)
            ]}),
            new TableRow({ children: [createCell("1", { width: 600, center: true }), createCell("O Criador ainda existe?", { width: 3500 }), createCell("Cosmologia", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("2", { width: 600, center: true }), createCell("Quem criou o Criador?", { width: 3500 }), createCell("Cosmologia", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("3", { width: 600, center: true }), createCell("Por que apenas um Fruto?", { width: 3500 }), createCell("Cosmologia", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("4", { width: 600, center: true }), createCell("Critério de Pureza?", { width: 3500 }), createCell("Lei da Pureza", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("5", { width: 600, center: true }), createCell("Nihilaryth podem ser redimidos?", { width: 3500 }), createCell("Lei da Pureza", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("6", { width: 600, center: true }), createCell("Civilização avançada caiu para manipulação?", { width: 3500 }), createCell("Aetherion", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("7", { width: 600, center: true }), createCell("Outras civilizações existiam?", { width: 3500 }), createCell("Aetherion", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("8", { width: 600, center: true }), createCell("Quem fez a profecia?", { width: 3500 }), createCell("Irmãs", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("9", { width: 600, center: true }), createCell("Yggorath não percebeu a verdade?", { width: 3500 }), createCell("Irmãs", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("10", { width: 600, center: true }), createCell("Alyndra sabia que morreria?", { width: 3500 }), createCell("Irmãs", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("11", { width: 600, center: true }), createCell("Por que 10 Nihilaryth?", { width: 3500 }), createCell("Nihilaryth", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("12", { width: 600, center: true }), createCell("Vorynthrix pode ser derrotado sozinho?", { width: 3500 }), createCell("Nihilaryth", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("13", { width: 600, center: true }), createCell("Cronologia entre eras?", { width: 3500 }), createCell("Cronologia", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("14", { width: 600, center: true }), createCell("Alyndra pode renascer?", { width: 3500 }), createCell("Cronologia", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("15", { width: 600, center: true }), createCell("Seraphyens mais poderosos que mortais?", { width: 3500 }), createCell("Poderes", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("16", { width: 600, center: true }), createCell("Nanobots podem ser replicados?", { width: 3500 }), createCell("Poderes", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("17", { width: 600, center: true }), createCell("Por que não purificar Aetherion?", { width: 3500 }), createCell("A Queda", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("18", { width: 600, center: true }), createCell("O que aconteceu com os corpos?", { width: 3500 }), createCell("A Queda", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("19", { width: 600, center: true }), createCell("Quem criou a Armadura?", { width: 3500 }), createCell("Armadura", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] }),
            new TableRow({ children: [createCell("20", { width: 600, center: true }), createCell("Armadura pode ser usada pelo mal?", { width: 3500 }), createCell("Armadura", { width: 2500 }), createCell("RESOLVIDO", { width: 2760, fill: colors.success, center: true })] })
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        // CONCLUSÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("11. Conclusão da Sabatina")] }),
        createParagraph("Esta sabatina identificou 20 questões críticas que fãs exigentes poderiam levantar, e estabeleceu respostas definitivas para cada uma. O universo de Alyndras demonstra consistência interna robusta, com cada elemento conectando-se logicamente aos outros. As principais descobertas da análise incluem:", { indent: true }),

        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "O Criador não é uma entidade ativa, mas dissipou-se na criação, tornando a Lei da Pureza uma lei natural, não um julgamento divino.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "A corrupção Nihilaryth é insidiosa precisamente porque respeita o livre-arbítrio das vítimas, tornando-a indetectável por tecnologia convencional.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Alyndra sabia que morreria e escolheu voluntariamente, elevando seu sacrifício de tragédia para heroísmo consciente.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "A cronologia é precisa: ~500 milhões de anos para Aetherion, escalas menores para eras subsequentes.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "A Armadura tem proteções intrínsecas contra uso malicioso, preservando o equilíbrio de poder.", size: 22, font: "Times New Roman" })] }),

        createParagraph("O universo está preparado para expansão narrativa com consistência interna sólida. A próxima etapa é estruturar as sagas de Yggorath, estabelecendo os eventos específicos que moldaram a história entre a queda de Aetherion e o nascimento dos Seraphyens.", { indent: true })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Sabatina_Critica.docx", buffer);
  console.log("Sabatina document created successfully!");
});
