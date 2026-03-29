const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, VerticalAlign, LevelFormat, PageBreak, 
        TableOfContents, Header, Footer, PageNumber } = require('docx');
const fs = require('fs');

const colors = {
  primary: "26211F",
  body: "3D3735",
  secondary: "6B6361",
  accent: "C19A6B",
  tableBg: "FDFCFB",
  divine: "D4A574",
  shadow: "4A4A4A"
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: colors.secondary };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24, color: colors.body } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 72, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: colors.accent, font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    // === CAPA ===
    { properties: { page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } } },
      children: [
        new Paragraph({ spacing: { before: 3000 }, children: [] }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "ALYNDRA", size: 120, bold: true, color: colors.primary, font: "Times New Roman" })]
        }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [new TextRun({ text: "Glossário Oficial do Universo", size: 40, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          spacing: { before: 800 },
          children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 28, color: colors.accent })]
        }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [new TextRun({ text: "Definições, Terminologia e Conceitos Fundamentais", size: 28, italics: true, color: colors.secondary })]
        }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "Documento de Referência — Versão 1.0", size: 22, color: colors.secondary })]
        }),
        new Paragraph({ spacing: { before: 4000 }, children: [] }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "\"Conhecer o nome é o primeiro passo para conhecer a essência.\"", size: 24, italics: true, color: colors.accent })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // === CONTEÚDO PRINCIPAL ===
    { properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "ALYNDRA — Glossário Oficial", size: 18, color: colors.secondary, italics: true })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "— ", size: 20, color: colors.secondary }), new TextRun({ children: [PageNumber.CURRENT], size: 20, color: colors.secondary }), new TextRun({ text: " —", size: 20, color: colors.secondary })]
        })] })
      },
      children: [
        // === SUMÁRIO ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Sumário")] }),
        new TableOfContents("Sumário", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER, 
          spacing: { before: 100 },
          children: [new TextRun({ text: "Nota: Clique com o botão direito no sumário e selecione \"Atualizar Campo\" para os números de página corretos.", size: 18, color: "999999", italics: true })]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === AETHRA ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("AETHRA")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Definição Fundamental")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Aethra é a energia vital espiritual, a manifestação física da alma e da essência de vida de todo ser vivo. É ao mesmo tempo o combustível que move as técnicas espirituais e a própria expressão material da existência consciente. Diferente de energia física ou mera força vital, o Aethra carrega consigo a identidade, memórias e natureza profunda do indivíduo — danificar o Aethra é danificar a própria alma.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O Aethra flui de Yggorath, a Árvore Primordial, que canaliza o potencial infinito do Vazio Primordial para todos os planos da existência. Cada ser vivo recebe sua porção de Aethra no momento de sua concepção, e esta energia espiritual o acompanha até a morte — ou transcendência. Todo ser vivo possui Aethra em diferentes escalas e intensidades, desde as menores criaturas até as entidades divinas.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Unidade de Medida: Æ (Aether)")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A unidade **Æ** (lê-se \"aether\") é o padrão métrico para quantificação de Aethra, estabelecida pelos antigos Aetheri e refinada através de milênios. A medição considera tanto a **quantidade** de energia quanto sua **qualidade** e **pureza**. Tecnologias como o Aethrímetro permitem medição precisa em tempo real.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Os Oito Estágios do Despertar")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A hierarquia espiritual não é meramente uma classificação de poder — representa os estágios de despertar da consciência e profundidade de conexão com a estrutura do universo. Cada estágio representa uma transformação fundamental na natureza do ser:")]
        }),

        new Table({
          columnWidths: [900, 1500, 2000, 4960],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 900, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Estágio", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 1500, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Faixa de Æ", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nome", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 4960, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Significado Místico", bold: true, color: colors.primary, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "I", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "0 - 50 Æ", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Latente", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4960, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A alma existe mas permanece adormecida", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "II", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "50 - 200 Æ", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Despertante", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4960, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Primeira centelha de consciência espiritual", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "III", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "200 - 500 Æ", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Convergente", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4960, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Aethra converge para centros energéticos", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IV", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "500 - 1.000 Æ", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Cultivador", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4960, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Treinamento formal, técnicas podem ser aprendidas", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "V", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1.000 - 5.000 Æ", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Transcendente", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4960, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Aethra transcende limitações físicas", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VI", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5.000 - 50.000 Æ", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Luminar", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4960, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\"Pequeno sol\" espiritual, irradia Aethra", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VII", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "50.000 - 500.000 Æ", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Primordial", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4960, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Conexão direta com forças primordiais", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VIII", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "500.000+ Æ", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Divino", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4960, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ilyos, Nyxalor, Yggorath — um com a existência", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 1: Os Oito Estágios do Despertar", size: 18, italics: true, color: colors.secondary })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Títulos Honoríficos por Estágio")] }),
        new Table({
          columnWidths: [2340, 3120, 3900],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Estágio", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Título Honorífico", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3900, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Forma de Tratamento", bold: true, color: colors.primary, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "I - Latente", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "—", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sem título especial", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "II - Despertante", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Neófito", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\"Jovem [Nome]\"", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "III - Convergente", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Adepto", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\"Adepto [Nome]\"", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IV - Cultivador", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Mestre", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\"Mestre [Nome]\"", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "V - Transcendente", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Arconte", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\"Arconte [Nome]\"", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VI - Luminar", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Hierarca", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\"Venerável [Nome]\"", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VII - Primordial", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Primordial", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\"Senhor [Nome], o [Título]\"", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VIII - Divino", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Divino", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Apenas nomes próprios", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 2: Títulos Honoríficos por Estágio", size: 18, italics: true, color: colors.secondary })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("As Facetas do Aethra")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Além da quantidade (Æ), o Aethra possui qualidades que determinam como se manifesta. São três as facetas principais: **Afinidade Elemental**, **Polaridade Espiritual** e **Pureza**.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Afinidade Elemental")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Todo ser possui afinidade natural com um ou mais elementos. A afinidade determina como o Aethra se expressa através do indivíduo:")]
        }),
        new Table({
          columnWidths: [2500, 2000, 4860],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2500, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tipo", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Raridade", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true, color: colors.primary, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Afinidade Única", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Comum (85%)", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Aethra manifesta-se através de um único elemento", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Afinidade Dupla", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Incomum (12%)", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Dois elementos, geralmente complementares", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Afinidade Tripla", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Rara (2.5%)", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Três elementos, grande versatilidade", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Afinidade Quádrupla", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Extrema (0.4%)", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Quatro elementos, quase lendário", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Afinidade Quíntupla", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Lendária (0.09%)", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Apenas Seraphyens possuem naturalmente", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Afinidade Universal", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Única", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Apenas Yggorath e os Divinos", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 3: Tipos de Afinidade Elemental", size: 18, italics: true, color: colors.secondary })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Polaridade Espiritual")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O Aethra carrega polaridade que determina sua tendência natural. A polaridade não é moral — Luz e Sombra são forças complementares necessárias para o equilíbrio universal:")]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Luz (Construtiva/Entrópica): ", bold: true }), new TextRun("Criação, expansão, geração de energia. Tendência a criar e expandir.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Sombra (Destrutiva/Equilibradora): ", bold: true }), new TextRun("Reciclagem, contenção, preservação. Tendência a equilibrar e reciclar.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Equilibrada: ", bold: true }), new TextRun("Pode manifestar ambas as polaridades com igual facilidade.")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Pureza do Aethra")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A pureza determina a harmonia entre o Aethra do indivíduo e a estrutura fundamental do universo:")]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Puro: ", bold: true }), new TextRun("Após a morte, a alma pode transcender e tornar-se imortal.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Misto: ", bold: true }), new TextRun("A alma será julgada; alguns aspectos podem transcender.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Corrompido: ", bold: true }), new TextRun("A alma é rejeitada pelo Vazio e pelo universo.")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Esgotamento e A Regra do Zero")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O Aethra pode ser \"queimado\" para amplificar poder, mas o esgotamento traz consequências severas:")]
        }),

        new Table({
          columnWidths: [2340, 2000, 5020],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nível", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Æ Restante", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 5020, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Consequência", bold: true, color: colors.primary, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Leve", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "60-80%", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 5020, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fadiga, recuperação em horas", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Moderado", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "40-60%", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 5020, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Exaustão, recuperação em dias", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Severo", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "20-40%", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 5020, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Coma regenerativo, recuperação em semanas", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Crítico", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5-20%", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 5020, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Risco de danos permanentes à alma", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: "4A2020", type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TOTAL", bold: true, color: "FFFFFF", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: "4A2020", type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "0 Æ", bold: true, color: "FFFFFF", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: "4A2020", type: ShadingType.CLEAR }, width: { size: 5020, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MORTE INSTANTÂNEA E INEVITÁVEL", bold: true, color: "FFFFFF", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 4: Níveis de Esgotamento de Aethra", size: 18, italics: true, color: colors.secondary })] }),

        new Paragraph({ 
          spacing: { before: 200, after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "A REGRA DO ZERO — MORTE ESPIRITUAL: ", bold: true, color: "8B0000" }), new TextRun("O Aethra é a manifestação física da alma. Se o Æ chegar a zero — seja por uso excessivo de técnicas, drenagem externa, contaminação, ou qualquer outro meio — o indivíduo morre instantaneamente. Não há exceções. Não há ressurreição. A alma dissolve-se de volta ao Vazio Primordial, e o indivíduo deixa de existir como entidade consciente.")]
        }),

        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "Esgotamento Sustentado: ", bold: true }), new TextRun("Um indivíduo pode \"queimar\" Aethra para manter funções corporais comprometidas. Quando o Æ atinge zero, todas as lesões mantidas artificialmente se manifestam instantaneamente. Se não houver mais Æ para sustentar o corpo, a morte é imediata.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Silentis — O Aethra Inacessível")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Silentis são indivíduos cujo Aethra permanece inacessível apesar de presente. Esta condição pode ter causas genéticas (bloqueio natural), psicológicas (traumas, crenças limitantes), ou espirituais (bloqueio cármico). A verdade oculta é que muitos Silentis possuem Æ extraordinário, mas completamente inacessível — podem ter mais energia bruta que um Arconte, mas jamais acessá-la conscientemente.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O despertar de um Silentis é extremamente raro, requerendo trauma de morte quase certa, intervenção divina, ou tecnologia específica. O exemplo canônico é Noah, cujo Æ latente massivo permaneceu inacessível, mas sua genialidade criou tecnologia que compensava sua incapacidade espiritual.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Micro Aethrites — Tecnologia Primordial")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Micro Aethrites são partículas microscópicas de Aethra cristalizado, criadas pela tecnologia Aetheri na Era Primordial. Sincronizam-se com o Aethra do usuário, permitindo armazenamento de Æ excedente, regeneração acelerada de tecidos, preservação de memórias e conhecimento, adaptação automática a condições ambientais, e amplificação de técnicas espirituais.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "Limitação Crítica: ", bold: true }), new TextRun("Os Micro Aethrites são parasitários por natureza — não podem ser removidos de um hospedeiro vivo sem causar fatalidade. Podem ser transmitidos através do DNA biológico, como ocorreu entre Alyndra, Grazielly e Iris.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Tecnologia de Medição e Manipulação")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A escala métrica de Æ permitiu o desenvolvimento de tecnologias avançadas:")]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Aethrímetro: ", bold: true }), new TextRun("Mede o Æ total de um indivíduo em tempo real.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Espectro de Afinidade: ", bold: true }), new TextRun("Analisa afinidades elementais e polaridade espiritual.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Câmara de Ressonância: ", bold: true }), new TextRun("Amplifica a recuperação de Æ durante descanso.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Condutor de Aethra: ", bold: true }), new TextRun("Transfere Æ entre recipientes compatíveis.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Inibidor Espiritual: ", bold: true }), new TextRun("Bloqueia temporariamente o acesso ao Æ de um alvo.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Gerador de Aethra Artificial: ", bold: true }), new TextRun("Cria Æ sintético — extremamente custoso e de qualidade inferior ao natural.")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Conexões com Outros Termos")] }),
        new Table({
          columnWidths: [3120, 6240],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Termo", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 6240, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Conexão com Aethra", bold: true, color: colors.primary, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Yggorath", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fonte última do Aethra no universo atual", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Árvore da Existência", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Estrutura que processa e distribui Aethra", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Lei da Pureza", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Julga a qualidade e pureza do Aethra", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fruto da Existência", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Cristalização suprema de Aethra", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seraphyens", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nasceram com Æ no estágio Primordial", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nihilaryth", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Corrompem o Aethra de outros seres", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Técnicas Espirituais", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Manifestações controladas de Aethra", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Armadura de Alyndra", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Amplifica e canaliza o Æ do usuário", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 5: Conexões do Aethra com Outros Termos", size: 18, italics: true, color: colors.secondary })] }),

        new Paragraph({ 
          spacing: { before: 400 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })]
        }),
        new Paragraph({ 
          spacing: { before: 200 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "\"Conhecer o nome é o primeiro passo para conhecer a essência.\"", italics: true, color: colors.accent })]
        }),
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Glossario_Oficial.docx", buffer);
  console.log("✅ Documento criado: Alyndra_Glossario_Oficial.docx");
});
