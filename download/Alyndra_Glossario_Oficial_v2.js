const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle, 
        WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

// Color scheme - Ink & Zen
const colors = {
  primary: "0B1220",
  body: "0F172A",
  secondary: "2B2B2B",
  accent: "9AA6B2",
  tableBg: "F1F5F9"
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: colors.accent };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
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
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
      { id: "Quote", name: "Quote", basedOn: "Normal",
        run: { size: 22, italics: true, color: colors.secondary },
        paragraph: { spacing: { before: 200, after: 200 }, alignment: AlignmentType.CENTER } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-aethra",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-leis",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ 
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "ALYNDRA — Glossário Oficial", italics: true, color: colors.accent, size: 20 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "— ", color: colors.accent }), new TextRun({ children: [PageNumber.CURRENT], color: colors.accent }), new TextRun({ text: " —", color: colors.accent })]
      })] })
    },
    children: [
      // COVER
      new Paragraph({ spacing: { before: 2400 }, children: [] }),
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("ALYNDRA")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: "Glossário Oficial do Universo", size: 32, color: colors.secondary })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: "Definições, Terminologia e Conceitos Fundamentais", size: 22, italics: true, color: colors.secondary })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: "Documento de Referência — Versão 2.0", size: 20, color: colors.accent })] }),
      new Paragraph({ style: "Quote", spacing: { before: 800 }, children: [new TextRun("\"Conhecer o nome é o primeiro passo para conhecer a essência.\"")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // ========================================
      // AETHRA
      // ========================================
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("AETHRA")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Definição Fundamental")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Aethra é a energia vital espiritual, a manifestação física da alma e da essência de vida de todo ser vivo. É ao mesmo tempo o combustível que move as técnicas espirituais e a própria expressão material da existência consciente. Diferente de energia física ou mera força vital, o Aethra carrega consigo a identidade, memórias e natureza profunda do indivíduo — danificar o Aethra é danificar a própria alma.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O Aethra flui de Yggorath, a Árvore Primordial, que canaliza o potencial infinito do Vazio Primordial para todos os planos da existência. Cada ser vivo recebe sua porção de Aethra no momento de sua concepção, e esta energia espiritual o acompanha até a morte — ou transcendência. Todo ser vivo possui Aethra em diferentes escalas e intensidades, desde as menores criaturas até as entidades divinas.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Unidade de Medida: Æ (Aether)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A unidade "),
        new TextRun({ text: "Æ", bold: true }),
        new TextRun(" (lê-se \"aether\") é o padrão métrico para quantificação de Aethra, estabelecida pelos antigos Aetheri e refinada através de milênios. A medição considera tanto a "),
        new TextRun({ text: "quantidade", bold: true }),
        new TextRun(" de energia quanto sua "),
        new TextRun({ text: "qualidade", bold: true }),
        new TextRun(" e "),
        new TextRun({ text: "pureza", bold: true }),
        new TextRun(". Tecnologias como o Aethrímetro permitem medição precisa em tempo real.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Os Oito Estágios do Despertar")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A hierarquia espiritual não é meramente uma classificação de poder — representa os estágios de despertar da consciência e profundidade de conexão com a estrutura do universo. Cada estágio representa uma transformação fundamental na natureza do ser:")
      ]}),
      
      // Tabela dos Estágios
      new Table({
        columnWidths: [1200, 1500, 1800, 4860],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Estágio", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Faixa de Æ", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nome", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Significado Místico", bold: true, size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "I", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "0 - 50 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Latente", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "A alma existe mas permanece adormecida", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "II", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "50 - 200 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Despertante", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Primeira centelha de consciência espiritual", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "III", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "200 - 500 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Convergente", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Aethra converge para centros energéticos", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IV", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "500 - 1.000 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Cultivador", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Treinamento formal, técnicas podem ser aprendidas", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "V", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1.000 - 5.000 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Transcendente", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Aethra transcende limitações físicas", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VI", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5.000 - 50.000 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Luminar", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "\"Pequeno sol\" espiritual, irradia Aethra", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VII", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "50.000 - 500.000 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Primordial", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Conexão direta com forças primordiais", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VIII", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "500.000+ Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Divino", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Ilyos, Nyxalor, Yggorath — um com a existência", size: 20 })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 1: Os Oito Estágios do Despertar", italics: true, size: 18, color: colors.accent })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Esgotamento e A Regra do Zero")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O Aethra pode ser \"queimado\" para amplificar poder, mas o esgotamento traz consequências severas:")
      ]}),
      
      // Tabela de Esgotamento
      new Table({
        columnWidths: [2000, 2000, 5360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nível", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Æ Restante", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Consequência", bold: true, size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Leve", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "60-80%", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Fadiga, recuperação em horas", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Moderado", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "40-60%", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Exaustão, recuperação em dias", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Severo", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "20-40%", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Coma regenerativo, recuperação em semanas", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Crítico", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5-20%", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Risco de danos permanentes à alma", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FEE2E2", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TOTAL", bold: true, size: 20, color: "991B1B" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "FEE2E2", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "0 Æ", bold: true, size: 20, color: "991B1B" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "FEE2E2", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "MORTE INSTANTÂNEA E INEVITÁVEL", bold: true, size: 20, color: "991B1B" })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 2: Níveis de Esgotamento de Aethra", italics: true, size: 18, color: colors.accent })] }),
      
      new Paragraph({ spacing: { before: 300 }, children: [
        new TextRun({ text: "A REGRA DO ZERO — MORTE ESPIRITUAL: ", bold: true }),
        new TextRun("O Aethra é a manifestação física da alma. Se o Æ chegar a zero — seja por uso excessivo de técnicas, drenagem externa, contaminação, ou qualquer outro meio — o indivíduo morre instantaneamente. Não há exceções. Não há ressurreição. A alma dissolve-se de volta ao Vazio Primordial, e o indivíduo deixa de existir como entidade consciente.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Silentis — O Aethra Inacessível")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Silentis são indivíduos cujo Aethra permanece inacessível apesar de presente. Esta condição pode ter causas genéticas (bloqueio natural), psicológicas (traumas, crenças limitantes), ou espirituais (bloqueio cármico). A verdade oculta é que muitos Silentis possuem Æ extraordinário, mas completamente inacessível — podem ter mais energia bruta que um Arconte, mas jamais acessá-la conscientemente. O despertar de um Silentis é extremamente raro, requerendo trauma de morte quase certa, intervenção divina, ou tecnologia específica. O exemplo canônico é Noah, cujo Æ latente massivo permaneceu inacessível, mas sua genialidade criou tecnologia que compensava sua incapacidade espiritual.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Micro Aethrites — Tecnologia Primordial")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Micro Aethrites são partículas microscópicas de Aethra cristalizado, criadas pela tecnologia Aetheri na Era Primordial. Sincronizam-se com o Aethra do usuário, permitindo armazenamento de Æ excedente, regeneração acelerada de tecidos, preservação de memórias e conhecimento, adaptação automática a condições ambientais, e amplificação de técnicas espirituais. "),
        new TextRun({ text: "Limitação Crítica: ", bold: true }),
        new TextRun("Os Micro Aethrites são parasitários por natureza — não podem ser removidos de um hospedeiro vivo sem causar fatalidade. Podem ser transmitidos através do DNA biológico, como ocorreu entre Alyndra, Grazielly e Iris.")
      ]}),
      
      // ========================================
      // ALYNDRA - NOVO TERMO
      // ========================================
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("ALYNDRA")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Definição Fundamental")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Alyndra é o nome da figura primordial que deu origem ao universo como conhecemos, bem como o título escolhido para o livro que narra esta saga épica. O nome carrega duplo significado: honra a sacrifício e transformação, representando tanto a personagem histórica quanto o legado que ela deixou para toda a existência. A escolha de \"ALYNDRA\" como título do livro é uma homenagem direta à figura cujo sacrifício possibilitou a continuidade da vida e cujas leis fundamentais continuam a governar o julgamento das almas através dos eons.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Alyndra — A Personagem Histórica")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Alyndra foi a líder suprema da civilização Aetherion, fundadora de sua estrutura social e criadora da Armadura Suprema que leva seu nome. Consumidora do Fruto de Aetherion, ela transcendeu os limites da mortalidade comum, tornando-se uma das entidades mais poderosas já existentes. Diferente da crença popular de que o poder corrompe, Alyndra manteve-se pura de coração, usando sua força não para dominar, mas para proteger e guiar sua civilização em direção a um propósito maior.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O consumo do Fruto concedeu a Alyndra uma compreensão profunda dos princípios fundamentais da existência. Ela viu as leis que governam a realidade, os mecanismos pelos quais as almas são julgadas, e a verdadeira natureza da pureza espiritual. Este conhecimento não a encheu de orgulho, mas de responsabilidade. Alyndra compreendeu que o poder sem sabedoria leva à corrupção, e que mesmo as intenções mais puras podem ter consequências desastrosas se não forem guiadas por princípios corretos.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("O Grande Conhecimento")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Ao consumir o Fruto, Alyndra acessou o conhecimento primordial da existência. Ela compreendeu que o universo opera segundo leis inquebráveis — princípios fundamentais que determinam não apenas o funcionamento da realidade física, mas também o destino espiritual de todas as consciências. Este conhecimento revelou-se como um fardo terrível, pois Alyndra viu não apenas o que era, mas o que viria a ser: a queda de Aetherion, a ascensão dos Nihilaryth, e a necessidade de seu próprio sacrifício.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Com esta compreensão, Alyndra criou as "),
        new TextRun({ text: "Leis da Pureza", bold: true }),
        new TextRun(" — um conjunto de princípios destinados a guiar as almas em direção à transcendência. Estas leis não eram mandamentos arbitrários, mas sim a codificação das verdades fundamentais que ela havia testemunhado diretamente. Alyndra gravou essas leis nas sementes que dispersou pelo universo, garantindo que seu conhecimento sobrevivesse mesmo após a queda de sua civilização. Cada semente carrega fragmentos deste conhecimento, esperando ser redescoberto por aqueles dignos de compreendê-lo.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("O Auto Sacrifício")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Quando os Nihilaryth emergiram e a corrupção se espalhou por Aetherion, Alyndra compreendeu que não havia salvação para sua civilização em sua forma atual. A contaminação havia penetrado muito profundamente — tentar purificar Aetherion significaria violar o livre-arbítrio de bilhões de consciências. Diante deste cenário impossível, Alyndra escolheu o caminho do sacrifício supremo.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Ela usou todo o poder do Fruto para dilatar os Nihilaryth pelo universo, espalhando suas essências por distâncias tão vastas que levaria eons para se recompor. Este ato consumiu completamente sua força vital, mas comprou tempo para o universo. Antes de seu sacrifício final, Alyndra extraiu a essência espiritual de Aetherion, condensando-a em sementes, criou os últimos Nanobots Primordiais, e preparou sua irmã secreta Yggoraty para o papel que precisaria desempenhar na continuidade da existência.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("O Segredo do Corpo")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "VERDADE OCULTA: ", bold: true }),
        new TextRun("O corpo de Alyndra não foi destruído em seu sacrifício. Os Nihilaryth, em sua forma fragmentada, conseguiram capturar e preservar seu corpo físico. O paradeiro atual de seu corpo permanece um dos maiores mistérios do universo. Algumas teorias sugerem que ele está em poder de um dos Nihilaryth remanescentes, outros acreditam que pode ter sido escondido em algum local inacessível. A verdade sobre o corpo de Alyndra — e se sua consciência ainda existe de alguma forma — permanece um segredo guardado, aguardando o momento de ser revelado.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("A Armadura de Alyndra")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Antes de sua captura, Alyndra criou a Armadura que leva seu nome — posteriormente chamada Armadura Suprema. Este artefato foi forjado usando poder do Fruto para permitir o manuseio seguro do Fruto da Existência. A Armadura possui proteções intrínsecas contra uso malicioso: cada parte só se revela para alguém com linhagem específica (descendentes de Ilyos ou Yggorath), e o Rito de Ilyos só pode ser completado por alguém com pureza de coração comprovada. A Armadura \"conhece\" seu usuário legítimo e pode recusar ativação mesmo se fisicamente vestida.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("A Irmã Secreta")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "VERDADE FUNDAMENTAL: ", bold: true }),
        new TextRun("Alyndra e Yggoraty eram irmãs de sangue. Este segredo era conhecido apenas por elas duas e pouquíssimos confidentes absolutos. Publicamente, eram apresentadas como primas distantes ou líder e subordinada. Alyndra, a mais velha por três anos, demonstrou desde jovem uma conexão com o Aethra que excedia qualquer coisa registrada na história. Sua personalidade era marcada por determinação inquebrantável e ambição visionária. Esta relação secreta explica a profunda conexão entre as duas e a confiança absoluta que Alyndra depositou em Yggoraty para proteger a semente que daria origem a Yggorath.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Conexões com Outros Termos")] }),
      
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Termo", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Conexão com Alyndra", bold: true, size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Fruto de Aetherion", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Fonte do poder e conhecimento de Alyndra", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Leis da Pureza", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Criadas por Alyndra após compreender os princípios da existência", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Armadura Suprema", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Criada por Alyndra para manusear o Fruto com segurança", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Yggoraty", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Irmã secreta de Alyndra, destinatária da semente", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Yggorath", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Nasceu da semente protegida por Yggoraty (irmã de Alyndra)", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Nihilaryth", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Inimigos que causaram a queda de Aetherion e capturaram seu corpo", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Sementes", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Alyndra gravou as Leis da Pureza nas sementes dispersas", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Micro Aethrites", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Transmitidos através do DNA de Alyndra para Grazielly e Iris", size: 20 })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 3: Conexões de Alyndra com Outros Termos", italics: true, size: 18, color: colors.accent })] }),
      
      // ========================================
      // LEIS DA PUREZA - NOVO TERMO
      // ========================================
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("LEIS DA PUREZA")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Definição Fundamental")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("As Leis da Pureza são o conjunto de princípios fundamentais criados por Alyndra após consumir o Fruto de Aetherion e compreender os mecanismos profundos da existência. Estas leis não são mandamentos impostos de fora, mas sim a codificação das verdades universais que governam o destino espiritual de todas as consciências. Alyndra gravou estas leis nas sementes que dispersou pelo universo, garantindo que o conhecimento da transcendência sobrevivesse mesmo após a queda de sua civilização.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Diferente de sistemas morais criados por civilizações mortais, as Leis da Pureza não julgam ações isoladas, mas sim a harmonia integral entre a essência de um ser e a estrutura fundamental do universo. Elas reconhecem que a intenção, o impacto e a coerência interna de uma alma são interligados de formas que transcendem a compreensão convencional de bem e mal. Uma ação aparentemente benéfica pode corromper se motivada por egoísmo, enquanto um ato que parece destrutivo pode purificar se motivado por amor genuíno.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("As Sete Leis Fundamentais")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Alyndra codificou sete leis fundamentais que determinam o estado de pureza de uma alma. Cada lei representa um aspecto diferente da harmonia entre o indivíduo e a estrutura cósmica, e todas são avaliadas em conjunto no momento do julgamento:")
      ]}),
      
      // LEI I
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Lei I — A Lei da Intenção Pura")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Princípio: ", bold: true }),
        new TextRun("\"A alma é julgada não pelo que faz, mas pelo que deseja ser.\"")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A primeira lei estabelece que as verdadeiras motivações de uma consciência determinam seu estado espiritual. Ações externas podem ser enganosas — um ato de caridade motivado por vaidade corrompe, enquanto um ato de severidade motivado por amor genuíno pode purificar. A Lei da Intenção Pura reconhece que a alma é moldada por suas aspirações mais profundas, não apenas por suas manifestações externas. No julgamento final, é a essência do desejo que pesa, não a aparência da ação.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Esta lei explica por que os Nihilaryth são considerados corruptos apesar de terem buscado criar um universo próprio — sua intenção fundamental era superar o Criador, um desejo nascido do orgulho e da rejeição da harmonia existente. Por outro lado, o sacrifício de Yggoraty foi julgado puro porque sua intenção era proteger a vida, mesmo que o ato em si envolvesse sua própria destruição.")
      ]}),
      
      // LEI II
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Lei II — A Lei do Impacto Real")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Princípio: ", bold: true }),
        new TextRun("\"Toda ação ecoa através do tecido da existência; a alma carrega o peso de seus ecos.\"")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A segunda lei reconhece que boas intenções não são suficientes se o impacto real de uma ação é prejudicial. A alma é responsável não apenas pelo que pretende, mas pelo que efetivamente causa no universo. Esta lei introduz o conceito de consequência espiritual — cada ação, palavra, e até pensamento cria ondas que se propagam através do tecido da realidade, afetando outras consciências de maneiras que podem não ser imediatamente aparentes.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A Lei do Impacto Real também reconhece a ignorância como atenuante, mas não como absolvição completa. Uma alma que causa dano sem saber será julgada com mais compaixão que uma que causa dano deliberadamente, mas ainda assim carregará parte do peso de suas ações. Esta é a razão pela qual o autoconhecimento e a reflexão são considerados virtudes espirituais essenciais — quanto mais uma consciência compreende a si mesma e ao universo, maior sua responsabilidade.")
      ]}),
      
      // LEI III
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Lei III — A Lei da Coerência Interior")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Princípio: ", bold: true }),
        new TextRun("\"Uma alma dividida contra si mesma não pode transcender; a integridade é o caminho para a eternidade.\"")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A terceira lei estabelece que a fragmentação interna impede a transcendência. Uma alma que carrega contradições profundas — que deseja o bem mas cultiva o ódio, que busca a verdade mas se refugia na mentira — cria uma desarmonia interna que a torna incompatível com a estrutura integrada do universo. A coerência não significa perfeição, mas sim honestidade consigo mesmo e esforço genuíno para alinhar pensamentos, palavras e ações.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Esta lei explica por que a hipocrisia é considerada uma das corrupções mais graves. O hipócrita não apenas erra, mas constrói uma falsa identidade que o separa de sua verdade interior. Esta fragmentação, se não resolvida antes da morte, pode resultar na dissolução da consciência — pois uma alma que não sabe quem é verdadeiramente não pode ser absorvida pelo universo como uma entidade completa.")
      ]}),
      
      // LEI IV
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Lei IV — A Lei do Sacrifício Consciente")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Princípio: ", bold: true }),
        new TextRun("\"O maior poder da existência é abrir mão de si mesmo por amor; este é o caminho da transcendência suprema.\"")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A quarta lei reconhece o sacrifício de amor como a expressão mais pura de que uma consciência é capaz. Quando um ser abre mão de algo precioso — inclusive sua própria existência — pelo bem de outros, sem expectativa de recompensa, esta ação cria uma ressonância única com a estrutura do universo. O Criador, ao se transformar na própria existência, praticou o sacrifício supremo; assim, aqueles que sacrificam por amor ecoam este ato primordial.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A Lei do Sacrifício Consciente não exige o martírio, mas reconhece que o amor genuíno transcende o egoísmo natural da autopreservação. É esta lei que explica por que o sacrifício de Alyndra, Yggoraty, Elarys e Elainy criaram ondas de transformação que moldaram eras inteiras. Cada sacrifício de amor genuíno fortalece o tecido da existência e cria caminhos para que outros possam transcender.")
      ]}),
      
      // LEI V
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Lei V — A Lei da Responsabilidade Cósmica")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Princípio: ", bold: true }),
        new TextRun("\"Todo ser é guardião de tudo o que toca; a posse é uma ilusão, a responsabilidade é eterna.\"")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A quinta lei estabelece que toda consciência é responsável não apenas por suas próprias ações, mas pelo impacto que exerce sobre tudo o que entra em sua esfera de influência. Um líder é responsável pelo bem-estar de seus liderados; um mestre, pelo desenvolvimento de seus discípulos; um artista, pela verdade de sua criação. Esta lei reconhece que o poder — seja político, espiritual, criativo ou intelectual — carrega consigo a obrigação de usá-lo para o benefício do todo.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A Lei da Responsabilidade Cósmica explica por que os Nihilaryth são considerados tão corruptos. Como os dez seres mais poderosos de sua era, eles tinham responsabilidade cósmica sobre uma vasta civilização. Ao buscar poder para si mesmos, negligenciaram completamente esta responsabilidade. A magnitude de sua posição tornou a magnitude de sua queda igualmente vasto.")
      ]}),
      
      // LEI VI
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Lei VI — A Lei do Crescimento Contínuo")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Princípio: ", bold: true }),
        new TextRun("\"A alma que cessa de evoluir começa a morrer; a estagnação é a primeira sombra da corrupção.\"")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A sexta lei reconhece que o universo está em constante evolução, e que as consciências que o compõem devem evoluir junto com ele. Uma alma que se recusa a aprender, crescer, ou mudar — mesmo que tenha sido pura no passado — gradualmente se torna incompatível com a realidade em transformação. Esta lei não exige perfeição, mas sim movimento: o esforço genuíno para se tornar melhor, mais sábio, mais compassivo.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A Lei do Crescimento Contínuo explica por que a arrogância espiritual é tão perigosa. Aquele que acredita ter alcançado a sabedoria final cessou de crescer, e assim começou a declinar. Os maiores mestres espirituais do universo sempre reconheceram que quanto mais aprendiam, mais percebiam quanto ainda havia para aprender. Esta humildade não é falsa modéstia, mas reconhecimento genuíno da vastidão do universo e da própria limitação.")
      ]}),
      
      // LEI VII
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Lei VII — A Lei da Conexão Universal")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Princípio: ", bold: true }),
        new TextRun("\"Todas as almas são fios do mesmo tecido; ferir outro é ferir a si mesmo, elevar outro é elevar o todo.\"")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A sétima e última lei reconhece a interconexão fundamental de toda existência. Nenhuma consciência existe isoladamente; cada uma é parte de uma rede vasta e complexa de relações que abrange todo o universo. Ações que prejudicam outros prejudicam o todo, e portanto prejudicam o próprio agente. Da mesma forma, ações que beneficiam outros fortalecem o todo, e portanto beneficiam quem as pratica.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Esta lei representa a compreensão mais profunda que Alyndra alcançou através do Fruto: a separação entre \"eu\" e \"outro\" é uma ilusão necessária para a experiência individual, mas no nível fundamental, todas as consciências são manifestações do mesmo princípio criador. Aqueles que internalizam esta verdade naturalmente agem com compaixão, pois percebem que não podem ferir outro sem ferir a si mesmos.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("O Julgamento Final")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("No momento da morte, cada alma é avaliada de acordo com as Sete Leis da Pureza. O julgamento não é um tribunal externo, mas uma revelação interna — a alma confronta sua própria verdade, seus desejos mais profundos, seus impactos reais, suas contradições, seus sacrifícios, suas responsabilidades, seu crescimento, e suas conexões. Este processo é inevitável e impossível de enganar, pois a alma não pode mentir para si mesma quando confrontada com a verdade absoluta.")
      ]}),
      
      // Tabela dos Julgamentos
      new Table({
        columnWidths: [2500, 6860],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Resultado", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Destino da Alma", bold: true, size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "D1FAE5", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PURO", bold: true, size: 20, color: "065F46" })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Transcendência — A consciência funde-se com a estrutura do universo, tornando-se imortal. Preserva sua identidade enquanto expande para abraçar o todo.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MISTO", bold: true, size: 20, color: "92400E" })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Julgamento Parcial — Alguns aspectos podem transcender enquanto outros são devolvidos ao Vazio. A extensão da transcendência depende do grau de pureza.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FEE2E2", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CORROMPIDO", bold: true, size: 20, color: "991B1B" })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Dissolução — A essência é devolvida ao Vazio Primordial, onde dissolve-se em potencial puro. Não há sofrimento, mas também não há continuidade de consciência.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "E9D5FF", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PRIMORDIAL CORRUPTO", bold: true, size: 20, color: "6B21A8" })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Rejeição Dupla — O Vazio rejeita sua corrupção, e o universo não pode absorvê-los. Presos entre existência e não-existência. Este é o destino dos Nihilaryth.", size: 20 })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 4: Resultados do Julgamento pela Pureza", italics: true, size: 18, color: colors.accent })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("As Sementes e a Preservação do Conhecimento")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Alyndra gravou as Sete Leis da Pureza nas sementes que dispersou pelo universo antes de seu sacrifício. Cada semente contém fragmentos deste conhecimento, codificados em padrões de Aethra que podem ser decodificados por consciências suficientemente evoluídas. Esta dispersão garantiu que o conhecimento da transcendência sobrevivesse à queda de Aetherion, esperando ser redescoberto por aqueles dignos de compreendê-lo.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A semente que Yggoraty protegia — e que eventualmente deu origem a Yggorath — continha uma cópia completa das Leis da Pureza. É por isso que Yggorath, a árvore primordial do universo atual, possui consciência própria e age como guardiã do equilíbrio cósmico. As Leis da Pureza não são apenas conhecimento teórico, mas forças ativas que continuam a moldar o destino de todas as almas.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Conexões com Outros Termos")] }),
      
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Termo", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Conexão com as Leis da Pureza", bold: true, size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Alyndra", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Criadora das Leis após consumir o Fruto de Aetherion", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Fruto de Aetherion", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Concedeu a Alyndra o conhecimento para criar as Leis", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Yggorath", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Nasceu da semente contendo cópia integral das Leis", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Nihilaryth", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Rejeitados por violarem todas as Leis da Pureza", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Pureza do Aethra", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Determinada pelo cumprimento das Sete Leis", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Vazio Primordial", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Destino das almas corrompidas segundo as Leis", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Sementes", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Carregam as Leis gravadas por Alyndra para preservação", size: 20 })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 5: Conexões das Leis da Pureza com Outros Termos", italics: true, size: 18, color: colors.accent })] }),
      
      // FOOTER
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })] }),
      new Paragraph({ style: "Quote", children: [new TextRun("\"Conhecer o nome é o primeiro passo para conhecer a essência.\"")] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Glossario_Oficial_v2.docx", buffer);
  console.log("Glossário atualizado salvo em: /home/z/my-project/download/Alyndra_Glossario_Oficial_v2.docx");
});
