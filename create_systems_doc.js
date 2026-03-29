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
  time: "E8F5E9",
  measure: "E3F2FD",
  money: "FFF8E1"
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
      { reference: "numbered-1", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
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
          children: [new TextRun({ text: "SISTEMAS DE MENSURAÇÃO", size: 48, bold: true, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Cronologia, Medidas e Economia", size: 32, italics: true, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 3500 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Sistema Temporal • Unidades de Medida • Sistema Monetário", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Fundamentos para Coerência Narrativa", size: 22, color: colors.accent, font: "Times New Roman", italics: true })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // CONTEÚDO
    {
      properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: {
        default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Universo de Alyndras - Sistemas de Mensuração", size: 18, color: colors.accent, font: "Times New Roman" })] })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "— ", size: 18, font: "Times New Roman" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Times New Roman" }), new TextRun({ text: " —", size: 18, font: "Times New Roman" })] })] })
      },
      children: [
        // INTRODUÇÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Introdução aos Sistemas")] }),
        createParagraph("Uma civilização avançada como Aetherion, capaz de harnessar a energia de estrelas e manipular Aethra em escala planetária, desenvolveria sistemas de mensuração baseados em fenômenos universais e constantes físicas, não em referências arbitrárias como a rotação de um planeta específico. Este documento estabelece os sistemas oficiais utilizados em Aetherion e, posteriormente, adaptados pelas civilizações descendentes.", { indent: true }),
        createParagraph("Para o público, equivalências aproximadas são fornecidas através de contexto narrativo, permitindo compreensão sem quebrar a imersão. Um personagem pode comentar que 'um thera é aproximadamente o tempo que leva para uma chápix de água ferver em temperatura ambiente', dando referência prática sem usar unidades terrestres.", { indent: true }),

        // ==========================================
        // SISTEMA TEMPORAL
        // ==========================================
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Sistema Temporal Aetheriano")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Fundamento Científico")] }),
        createParagraph("Os Aetherions basearam seu sistema temporal em dois fenômenos universais constantes: a vibração fundamental da Árvore da Existência e a frequência de ressonância do Aethra puro. Diferente de sistemas baseados em rotação planetária (que variam de mundo para mundo), estes fenômenos são consistentes em todo o universo, permitindo comunicação precisa entre colônias em diferentes sistemas estelares.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Unidades de Tempo")] }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1800, 2200, 2600, 2760],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Nome", 1800),
              createHeaderCell("Definição", 2200),
              createHeaderCell("Equivalência Narrativa", 2600),
              createHeaderCell("Equivalência Terra", 2760)
            ]}),
            new TableRow({ children: [
              createCell("PULSAR", { width: 1800, center: true, fill: colors.time, textOptions: { bold: true } }),
              createCell("Menor unidade mensurável", { width: 2200 }),
              createCell("Um piscar de olhos", { width: 2600 }),
              createCell("~0.1 segundos", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("THERA", { width: 1800, center: true, fill: colors.time, textOptions: { bold: true } }),
              createCell("100 pulsares", { width: 2200 }),
              createCell("Um suspiro profundo", { width: 2600 }),
              createCell("~10 segundos", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("CYON", { width: 1800, center: true, fill: colors.time, textOptions: { bold: true } }),
              createCell("60 thera", { width: 2200 }),
              createCell("Tempo de uma refeição leve", { width: 2600 }),
              createCell("~10 minutos", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("VARYM", { width: 1800, center: true, fill: colors.time, textOptions: { bold: true } }),
              createCell("6 cyon", { width: 2200 }),
              createCell("Uma sessão de treinamento", { width: 2600 }),
              createCell("~1 hora", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("LUMEN", { width: 1800, center: true, fill: colors.time, textOptions: { bold: true } }),
              createCell("24 varym", { width: 2200 }),
              createCell("Um período de vigília", { width: 2600 }),
              createCell("~1 dia", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("SEKTRA", { width: 1800, center: true, fill: colors.time, textOptions: { bold: true } }),
              createCell("30 lumen", { width: 2200 }),
              createCell("Um ciclo lunar completo", { width: 2600 }),
              createCell("~1 mês", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("AETHER", { width: 1800, center: true, fill: colors.time, textOptions: { bold: true } }),
              createCell("12 sektra", { width: 2200 }),
              createCell("Uma estação completa", { width: 2600 }),
              createCell("~1 ano", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("CYCLUS", { width: 1800, center: true, fill: colors.time, textOptions: { bold: true } }),
              createCell("100 aether", { width: 2200 }),
              createCell("Uma vida mortal longa", { width: 2600 }),
              createCell("~1 século", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("MILLENNIUM", { width: 1800, center: true, fill: colors.time, textOptions: { bold: true } }),
              createCell("1000 aether", { width: 2200 }),
              createCell("Uma era histórica", { width: 2600 }),
              createCell("~1 milênio", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("AION", { width: 1800, center: true, fill: colors.time, textOptions: { bold: true } }),
              createCell("1.000.000 aether", { width: 2200 }),
              createCell("Tempo além da compreensão mortal", { width: 2600 }),
              createCell("~1 milhão de anos", { width: 2760, center: true })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 Calendário Aetheriano")] }),
        createParagraph("O calendário oficial de Aetherion não contava anos a partir de um ponto arbitrário, mas marcava Eras baseadas em eventos significativos da civilização. Cada Era tinha um nome descritivo em vez de número, permitindo que qualquer cidadão compreendesse o contexto histórico de uma data.", { indent: true }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2340, 3120, 3900],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Era", 2340),
              createHeaderCell("Duração", 3120),
              createHeaderCell("Evento Marcante", 3900)
            ]}),
            new TableRow({ children: [
              createCell("ERA DO DESPERTAR", { width: 2340, center: true }),
              createCell("~50.000 aether", { width: 3120, center: true }),
              createCell("Formação inicial da civilização Aetherion", { width: 3900 })
            ]}),
            new TableRow({ children: [
              createCell("ERA DA ASCENSÃO", { width: 2340, center: true }),
              createCell("~200.000 aether", { width: 3120, center: true }),
              createCell("Dominio de energia estelar e tecnologia de Aethra", { width: 3900 })
            ]}),
            new TableRow({ children: [
              createCell("ERA DA EXPANSÃO", { width: 2340, center: true }),
              createCell("~150.000 aether", { width: 3120, center: true }),
              createCell("Colonização de sistemas estelares múltiplos", { width: 3900 })
            ]}),
            new TableRow({ children: [
              createCell("ERA DAS IRMÃS", { width: 2340, center: true }),
              createCell("~50.000 aether", { width: 3120, center: true }),
              createCell("Nascimento de Alyndra e Yggorath", { width: 3900 })
            ]}),
            new TableRow({ children: [
              createCell("ERA DO FRUTO", { width: 2340, center: true }),
              createCell("~5.000 aether", { width: 3120, center: true }),
              createCell("Alyndra consome o Fruto da Existência", { width: 3900 })
            ]}),
            new TableRow({ children: [
              createCell("ERA DO ABISMO", { width: 2340, center: true }),
              createCell("~500 aether", { width: 3120, center: true }),
              createCell("Abertura do Portal e queda de Aetherion", { width: 3900 })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.4 Sistema Pós-Queda")] }),
        createParagraph("Após a queda de Aetherion, as civilizações descendentes adaptaram o sistema temporal para suas realidades. O planeta Aetherion (novo mundo colonizado) manteve as unidades básicas, mas o calendário foi reestruturado em torno do Selamento de Ilios e Nyxalor:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Antes do Selamento (A.S.) - Período desde a chegada ao novo planeta até o Grande Selamento", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Depois do Selamento (D.S.) - Período atual, iniciando com o selamento de Ilios e Nyxalor", size: 22, font: "Times New Roman" })] }),
        createParagraph("Na Era de Grazielly, a data atual seria aproximadamente 2.000 D.S. (Dois Mil Aethers Depois do Selamento).", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.5 Exemplos de Uso Narrativo")] }),
        createParagraph("O narrador pode situar o público sem quebrar imersão usando comparações naturais:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "\"Yggorath esperou três thera - tempo suficiente para uma xícara de chá esfriar.\" (≈30 segundos)", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "\"A batalha durou seis varym - seis sessões de treinamento completas de exaustão.\" (≈6 horas)", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "\"Não víamos Alyndra há três sektra - três ciclos de lua cheia.\" (≈3 meses)", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "\"A civilização durou quinhentos cyclus - quinhentas vidas mortais completas.\" (≈50.000 anos)", size: 22, font: "Times New Roman" })] }),

        // ==========================================
        // SISTEMA DE MEDIDAS
        // ==========================================
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Sistema de Medidas Aetheriano")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Fundamento Científico")] }),
        createParagraph("As unidades de medida de Aetherion derivam de constantes físicas universais e propriedades do Aethra. A unidade base de comprimento, por exemplo, é definida pela distância que Aethra puro percorre em um pulsar através de vácuo perfeito - uma constante universal independente de gravidade ou atmosfera.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 Medidas de Comprimento")] }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1800, 2400, 2800, 2360],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Nome", 1800),
              createHeaderCell("Definição", 2400),
              createHeaderCell("Referência Narrativa", 2800),
              createHeaderCell("Equivalência Terra", 2360)
            ]}),
            new TableRow({ children: [
              createCell("SPAERA", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("Menor unidade mensurável", { width: 2400 }),
              createCell("Espessura de um fio de cabelo", { width: 2800 }),
              createCell("~1 milímetro", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("PESAR", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("100 spaera", { width: 2400 }),
              createCell("Largura de uma mão aberta", { width: 2800 }),
              createCell("~10 centímetros", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("STRIA", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("10 pesar", { width: 2400 }),
              createCell("Um passo largo", { width: 2800 }),
              createCell("~1 metro", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("KRYON", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("1000 stria", { width: 2400 }),
              createCell("Caminhada de um quarto de lumen", { width: 2800 }),
              createCell("~1 quilômetro", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("VASTIS", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("1000 kryo", { width: 2400 }),
              createCell("Distância entre cidades vizinhas", { width: 2800 }),
              createCell("~1.000 km", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("ASTRA", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("1.000.000 kryo", { width: 2400 }),
              createCell("Distância impossível de caminhar", { width: 2800 }),
              createCell("~1 milhão km", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("LUMINIS", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("Distância luz em um varym", { width: 2400 }),
              createCell("Distância entre estrelas próximas", { width: 2800 }),
              createCell("~1 ano-luz", { width: 2360, center: true })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 Medidas de Peso/Massa")] }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1800, 2400, 2800, 2360],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Nome", 1800),
              createHeaderCell("Definição", 2400),
              createHeaderCell("Referência Narrativa", 2800),
              createHeaderCell("Equivalência Terra", 2360)
            ]}),
            new TableRow({ children: [
              createCell("GRAINIS", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("Peso de um cristal de Aethra puro", { width: 2400 }),
              createCell("Um grão de areia", { width: 2800 }),
              createCell("~1 grama", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("MORA", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("100 grainis", { width: 2400 }),
              createCell("Uma maçã pequena", { width: 2800 }),
              createCell("~100 gramas", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("STELLA", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("10 mora", { width: 2400 }),
              createCell("Uma espada leve", { width: 2800 }),
              createCell("~1 quilo", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("HABOR", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("100 stella", { width: 2400 }),
              createCell("Um homem adulto médio", { width: 2800 }),
              createCell("~100 kg", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("MONTIS", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("1000 habor", { width: 2400 }),
              createCell("Um elefante grande", { width: 2800 }),
              createCell("~100 toneladas", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("PLANUS", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("1.000.000 habor", { width: 2400 }),
              createCell("Uma pequena montanha", { width: 2800 }),
              createCell("~100.000 toneladas", { width: 2360, center: true })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.4 Medidas de Volume")] }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1800, 2400, 2800, 2360],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Nome", 1800),
              createHeaderCell("Definição", 2400),
              createHeaderCell("Referência Narrativa", 2800),
              createHeaderCell("Equivalência Terra", 2360)
            ]}),
            new TableRow({ children: [
              createCell("GUTTA", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("Volume de uma lágrima", { width: 2400 }),
              createCell("Uma gota de água", { width: 2800 }),
              createCell("~1 mililitro", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("POCULA", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("100 gutta", { width: 2400 }),
              createCell("Uma xícara de chá", { width: 2800 }),
              createCell("~100 ml", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("AMPHORA", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("10 pocula", { width: 2400 }),
              createCell("Um balde grande", { width: 2800 }),
              createCell("~1 litro", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("CISTERNA", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("1000 amphora", { width: 2400 }),
              createCell("Uma pequena piscina", { width: 2800 }),
              createCell("~1.000 litros", { width: 2360, center: true })
            ]}),
            new TableRow({ children: [
              createCell("LACUS", { width: 1800, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("1.000.000 amphora", { width: 2400 }),
              createCell("Um lago pequeno", { width: 2800 }),
              createCell("~1.000.000 litros", { width: 2360, center: true })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.5 Medidas de Temperatura")] }),
        createParagraph("Aetherion utilizava um sistema de temperatura baseado em estados da água e do Aethra, com zero sendo o ponto de congelamento da água pura:", { indent: true }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2000, 3000, 2500, 1860],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Nome", 2000),
              createHeaderCell("Ponto de Referência", 3000),
              createHeaderCell("Escala", 2500),
              createHeaderCell("Equivalência", 1860)
            ]}),
            new TableRow({ children: [
              createCell("FRIGUS", { width: 2000, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("Zero Aetheriano - Água congela", { width: 3000 }),
              createCell("0°Frig", { width: 2500, center: true }),
              createCell("0°C", { width: 1860, center: true })
            ]}),
            new TableRow({ children: [
              createCell("TEPIDUS", { width: 2000, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("Temperatura corporal saudável", { width: 3000 }),
              createCell("37°Frig", { width: 2500, center: true }),
              createCell("37°C", { width: 1860, center: true })
            ]}),
            new TableRow({ children: [
              createCell("CALIDUS", { width: 2000, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("Água ferve ao nível do mar", { width: 3000 }),
              createCell("100°Frig", { width: 2500, center: true }),
              createCell("100°C", { width: 1860, center: true })
            ]}),
            new TableRow({ children: [
              createCell("IGNIS", { width: 2000, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("Aethra começa a cristalizar", { width: 3000 }),
              createCell("1.000°Frig", { width: 2500, center: true }),
              createCell("1.000°C", { width: 1860, center: true })
            ]}),
            new TableRow({ children: [
              createCell("STELLARIS", { width: 2000, center: true, fill: colors.measure, textOptions: { bold: true } }),
              createCell("Temperatura de superfície estelar", { width: 3000 }),
              createCell("6.000°Frig", { width: 2500, center: true }),
              createCell("~6.000°C", { width: 1860, center: true })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        // ==========================================
        // SISTEMA MONETÁRIO
        // ==========================================
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Sistema Monetário Aetheriano")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 Fundamento Econômico")] }),
        createParagraph("Uma civilização capaz de harnessar energia estelar e criar matéria através de Aethra desenvolveria um sistema econômico baseado em algo mais fundamental que metais preciosos ou papel-moeda. Aetherion utilizava um sistema de crédito energético, onde a moeda representava unidades de energia processada e verificada pela rede de Cristais de Ressonância.", { indent: true }),
        createParagraph("O valor era intrinsecamente ligado a Aethra e energia pura - coisas que não podiam ser falsificadas ou inflacionadas artificialmente. Cada unidade monetária era respaldada por uma quantidade específica de energia processada, garantindo estabilidade econômica impossível em sistemas baseados em fé governamental.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 Moedas Principais")] }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1600, 2200, 2400, 1600, 1560],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Nome", 1600),
              createHeaderCell("Material", 2200),
              createHeaderCell("Valor Relativo", 2400),
              createHeaderCell("Poder de Compra", 1600),
              createHeaderCell("Equivalência", 1560)
            ]}),
            new TableRow({ children: [
              createCell("SPARK", { width: 1600, center: true, fill: colors.money, textOptions: { bold: true } }),
              createCell("Cristal sintético básico", { width: 2200 }),
              createCell("Unidade base", { width: 2400, center: true }),
              createCell("Uma refeição simples", { width: 1600 }),
              createCell("~$1 USD", { width: 1560, center: true })
            ]}),
            new TableRow({ children: [
              createCell("GLOW", { width: 1600, center: true, fill: colors.money, textOptions: { bold: true } }),
              createCell("Cristal com traço de Aethra", { width: 2200 }),
              createCell("100 sparks", { width: 2400, center: true }),
              createCell("Uma noite de hospedagem", { width: 1600 }),
              createCell("~$100 USD", { width: 1560, center: true })
            ]}),
            new TableRow({ children: [
              createCell("SHINE", { width: 1600, center: true, fill: colors.money, textOptions: { bold: true } }),
              createCell("Cristal de ressonância média", { width: 2200 }),
              createCell("100 glows", { width: 2400, center: true }),
              createCell("Uma arma comum", { width: 1600 }),
              createCell("~$10.000 USD", { width: 1560, center: true })
            ]}),
            new TableRow({ children: [
              createCell("RADIANT", { width: 1600, center: true, fill: colors.money, textOptions: { bold: true } }),
              createCell("Cristal de ressonância superior", { width: 2200 }),
              createCell("100 shines", { width: 2400, center: true }),
              createCell("Uma casa modesta", { width: 1600 }),
              createCell("~$1.000.000 USD", { width: 1560, center: true })
            ]}),
            new TableRow({ children: [
              createCell("LUMINARY", { width: 1600, center: true, fill: colors.money, textOptions: { bold: true } }),
              createCell("Cristal primordial autêntico", { width: 2200 }),
              createCell("100 radiants", { width: 2400, center: true }),
              createCell("Uma cidade pequena", { width: 1600 }),
              createCell("~$100M USD", { width: 1560, center: true })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 Sistema Pós-Queda")] }),
        createParagraph("Após a queda de Aetherion, o sistema monetário fragmentou-se. Cada reino desenvolveu sua própria moeda baseada nos recursos locais, mas manteve conceitos similares de valor energético:", { indent: true }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1800, 2400, 2400, 2760],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Reino", 1800),
              createHeaderCell("Moeda Base", 2400),
              createHeaderCell("Material", 2400),
              createHeaderCell("Equivalência", 2760)
            ]}),
            new TableRow({ children: [
              createCell("Fogo (Ignarra)", { width: 1800, center: true }),
              createCell("EMBER", { width: 2400, center: true }),
              createCell("Moeda de cobre com núcleo aquecido", { width: 2400 }),
              createCell("~1 spark", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("Água (Aqualyss)", { width: 1800, center: true }),
              createCell("PEARL", { width: 2400, center: true }),
              createCell("Pérola cultivada com Aethra", { width: 2400 }),
              createCell("~1 spark", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("Terra (Lithorra)", { width: 1800, center: true }),
              createCell("STONE", { width: 2400, center: true }),
              createCell("Pedra semipreciosa comum", { width: 2400 }),
              createCell("~1 spark", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("Vento (Velarya)", { width: 1800, center: true }),
              createCell("WHISPER", { width: 2400, center: true }),
              createCell("Cristal oco que ressoa ao vento", { width: 2400 }),
              createCell("~1 spark", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("Raio (Tempestra)", { width: 1800, center: true }),
              createCell("VOLT", { width: 2400, center: true }),
              createCell("Cristal que brilha com estática", { width: 2400 }),
              createCell("~1 spark", { width: 2760, center: true })
            ]}),
            new TableRow({ children: [
              createCell("Sanctrum (GM)", { width: 1800, center: true }),
              createCell("AETHER (oficial)", { width: 2400, center: true }),
              createCell("Cristal de ressonância padrão", { width: 2400 }),
              createCell("1 glow", { width: 2760, center: true })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.4 Taxas de Câmbio Comuns")] }),
        createParagraph("O comércio entre reinos exigia entendimento de taxas flutuantes. Mercadores usavam cristais de conversão - artefatos que podiam avaliar o conteúdo de Aethra em qualquer moeda:", { indent: true }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [3120, 3120, 3120],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Moeda", 3120),
              createHeaderCell("Em Sparks", 3120),
              createHeaderCell("Em Aether (Sanctrum)", 3120)
            ]}),
            new TableRow({ children: [
              createCell("1 Ember (Fogo)", { width: 3120, center: true }),
              createCell("1.2 sparks", { width: 3120, center: true }),
              createCell("0.012 aether", { width: 3120, center: true })
            ]}),
            new TableRow({ children: [
              createCell("1 Pearl (Água)", { width: 3120, center: true }),
              createCell("1.5 sparks", { width: 3120, center: true }),
              createCell("0.015 aether", { width: 3120, center: true })
            ]}),
            new TableRow({ children: [
              createCell("1 Stone (Terra)", { width: 3120, center: true }),
              createCell("0.8 sparks", { width: 3120, center: true }),
              createCell("0.008 aether", { width: 3120, center: true })
            ]}),
            new TableRow({ children: [
              createCell("1 Whisper (Vento)", { width: 3120, center: true }),
              createCell("1.0 sparks", { width: 3120, center: true }),
              createCell("0.010 aether", { width: 3120, center: true })
            ]}),
            new TableRow({ children: [
              createCell("1 Volt (Raio)", { width: 3120, center: true }),
              createCell("1.3 sparks", { width: 3120, center: true }),
              createCell("0.013 aether", { width: 3120, center: true })
            ]}),
            new TableRow({ children: [
              createCell("1 Aether (Sanctrum)", { width: 3120, center: true }),
              createCell("100 sparks", { width: 3120, center: true }),
              createCell("1.0 aether", { width: 3120, center: true })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.5 Exemplos de Uso Narrativo")] }),
        createParagraph("O sistema monetário pode ser introduzido naturalmente através de transações:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "\"Três glows por uma espada? Isso é roubo!\" -Negociação em mercado", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "\"O bounty pela cabeça do criminoso é de quinhentos shines - suficiente para comprar uma vila inteira.\"", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "\"Um luminary... nunca vi um na vida real. Dizem que apenas os GMs lidam com moedas desse valor.\"", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "\"Meus sessenta embers não compram nem uma noite em Sanctrum. Lá, tudo é em aethers.\"", size: 22, font: "Times New Roman" })] }),

        // ==========================================
        // TABELA CONSOLIDADA
        // ==========================================
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Guia Rápido de Referência")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 Conversões Comuns")] }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2340, 3510, 3510],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Categoria", 2340),
              createHeaderCell("Unidade Aetheriana", 3510),
              createHeaderCell("Equivalência Prática", 3510)
            ]}),
            new TableRow({ children: [
              createCell("Tempo pequeno", { width: 2340, center: true }),
              createCell("Thera", { width: 3510, center: true }),
              createCell("10 segundos / um suspiro", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Tempo médio", { width: 2340, center: true }),
              createCell("Varym", { width: 3510, center: true }),
              createCell("1 hora / uma sessão de treino", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Tempo grande", { width: 2340, center: true }),
              createCell("Lumen", { width: 3510, center: true }),
              createCell("1 dia / um período de vigília", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Tempo ano", { width: 2340, center: true }),
              createCell("Aether", { width: 3510, center: true }),
              createCell("1 ano / uma estação", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Distância curta", { width: 2340, center: true }),
              createCell("Stria", { width: 3510, center: true }),
              createCell("1 metro / um passo", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Distância média", { width: 2340, center: true }),
              createCell("Kryon", { width: 3510, center: true }),
              createCell("1 km / caminhada curta", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Distância grande", { width: 2340, center: true }),
              createCell("Vastis", { width: 3510, center: true }),
              createCell("1000 km / entre cidades", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Peso pequeno", { width: 2340, center: true }),
              createCell("Mora", { width: 3510, center: true }),
              createCell("100g / uma maçã", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Peso médio", { width: 2340, center: true }),
              createCell("Stella", { width: 3510, center: true }),
              createCell("1 kg / uma espada leve", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Peso grande", { width: 2340, center: true }),
              createCell("Habor", { width: 3510, center: true }),
              createCell("100 kg / um homem", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Moeda pequena", { width: 2340, center: true }),
              createCell("Spark", { width: 3510, center: true }),
              createCell("Refeição simples", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Moeda média", { width: 2340, center: true }),
              createCell("Glow", { width: 3510, center: true }),
              createCell("Hospedagem/noturno", { width: 3510 })
            ]}),
            new TableRow({ children: [
              createCell("Moeda grande", { width: 2340, center: true }),
              createCell("Shine", { width: 3510, center: true }),
              createCell("Arma/casa modesta", { width: 3510 })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 Prefixos Numéricos Aetherianos")] }),
        createParagraph("Para números grandes, Aetherion utilizava prefixos baseados em potências de 100:", { indent: true }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2340, 2340, 2340, 2340],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              createHeaderCell("Prefixo", 2340),
              createHeaderCell("Multiplicador", 2340),
              createHeaderCell("Exemplo", 2340),
              createHeaderCell("Valor", 2340)
            ]}),
            new TableRow({ children: [
              createCell("UNA", { width: 2340, center: true }),
              createCell("1x", { width: 2340, center: true }),
              createCell("Una stria", { width: 2340, center: true }),
              createCell("1 metro", { width: 2340, center: true })
            ]}),
            new TableRow({ children: [
              createCell("CENTA", { width: 2340, center: true }),
              createCell("100x", { width: 2340, center: true }),
              createCell("Centa stria", { width: 2340, center: true }),
              createCell("100 metros", { width: 2340, center: true })
            ]}),
            new TableRow({ children: [
              createCell("KILA", { width: 2340, center: true }),
              createCell("1.000x", { width: 2340, center: true }),
              createCell("Kila stria", { width: 2340, center: true }),
              createCell("1 km", { width: 2340, center: true })
            ]}),
            new TableRow({ children: [
              createCell("MEGA", { width: 2340, center: true }),
              createCell("1.000.000x", { width: 2340, center: true }),
              createCell("Mega stria", { width: 2340, center: true }),
              createCell("1.000 km", { width: 2340, center: true })
            ]}),
            new TableRow({ children: [
              createCell("GIGA", { width: 2340, center: true }),
              createCell("1.000.000.000x", { width: 2340, center: true }),
              createCell("Giga stria", { width: 2340, center: true }),
              createCell("1.000.000 km", { width: 2340, center: true })
            ]})
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        // CONCLUSÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. Implementação Narrativa")] }),
        createParagraph("A chave para uso efetivo destes sistemas é a introdução gradual e contextual. O público não precisa memorizar conversões - precisa sentir que o mundo é consistente e real. Algumas diretrizes para escritores:", { indent: true }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Sempre fornecer contexto: 'três kryo de distância - uma caminhada de meio lumen'", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Usar comparações práticas: 'pesava duas habor - o dobro de um homem adulto'", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Permitir que personagens novatos perguntem: 'O que é um shine? Ah, suficiente para comprar minha vila'", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "Consistência é mais importante que precisão: usar as mesmas unidades para situações similares", size: 22, font: "Times New Roman" })] }),
        createParagraph("Com estes sistemas estabelecidos, o universo de Alyndras ganha uma camada adicional de autenticidade que fãs exigentes apreciarão. A coerência interna reforça a verossimilhança e permite que a história se desenrole sem quebras de imersão.", { indent: true })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Sistemas_Mensuracao.docx", buffer);
  console.log("Measurement systems document created successfully!");
});
