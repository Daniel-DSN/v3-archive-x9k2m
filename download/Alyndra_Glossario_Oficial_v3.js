const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle, 
        WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

const colors = {
  primary: "0B1220",
  body: "0F172A",
  secondary: "2B2B2B",
  accent: "9AA6B2",
  tableBg: "F1F5F9",
  law1: "EFF6FF", law1t: "1E40AF",
  law2: "F0FDF4", law2t: "166534",
  law3: "FEF3C7", law3t: "92400E",
  law4: "FDF2F8", law4t: "9D174D",
  law5: "F5F3FF", law5t: "5B21B6",
  law6: "ECFDF5", law6t: "047857",
  law7: "FFF7ED", law7t: "C2410C",
  law8: "F0F9FF", law8t: "0369A1",
  law9: "FDF4FF", law9t: "A21CAF",
  law10: "FFFBEB", law10t: "A16207",
  law11: "F0FDF4", law11t: "15803D",
  law12: "FDF2F8", law12t: "BE185D"
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
        paragraph: { spacing: { before: 200, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "LawQuote", name: "LawQuote", basedOn: "Normal",
        run: { size: 22, italics: true, color: colors.secondary },
        paragraph: { spacing: { before: 100, after: 150 } } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
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
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: "Documento de Referência — Versão 3.0", size: 20, color: colors.accent })] }),
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
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "I", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "0 - 50 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Latente", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "A alma existe mas permanece adormecida", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "II", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "50 - 200 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Despertante", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Primeira centelha de consciência espiritual", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "III", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "200 - 500 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Convergente", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Aethra converge para centros energéticos", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IV", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "500 - 1.000 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Cultivador", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Treinamento formal, técnicas podem ser aprendidas", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "V", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1.000 - 5.000 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Transcendente", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Aethra transcende limitações físicas", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VI", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5.000 - 50.000 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Luminar", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "\"Pequeno sol\" espiritual, irradia Aethra", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VII", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "50.000 - 500.000 Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Primordial", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Conexão direta com forças primordiais", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VIII", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "500.000+ Æ", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Divino", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Ilyos, Nyxalor, Yggorath — um com a existência", size: 20 })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 1: Os Oito Estágios do Despertar", italics: true, size: 18, color: colors.accent })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Esgotamento e A Regra do Zero")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O Aethra pode ser \"queimado\" para amplificar poder, mas o esgotamento traz consequências severas:")
      ]}),
      
      new Table({
        columnWidths: [2000, 2000, 5360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nível", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Æ Restante", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Consequência", bold: true, size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Leve", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "60-80%", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Fadiga, recuperação em horas", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Moderado", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "40-60%", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Exaustão, recuperação em dias", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Severo", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "20-40%", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Coma regenerativo, recuperação em semanas", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Crítico", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5-20%", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Risco de danos permanentes à alma", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FEE2E2", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TOTAL", bold: true, size: 20, color: "991B1B" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "FEE2E2", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "0 Æ", bold: true, size: 20, color: "991B1B" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "FEE2E2", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "MORTE INSTANTÂNEA E INEVITÁVEL", bold: true, size: 20, color: "991B1B" })] })] })
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
        new TextRun("Silentis são indivíduos cujo Aethra permanece inacessível apesar de presente. Esta condição pode ter causas genéticas (bloqueio natural), psicológicas (traumas, crenças limitantes), ou espirituais (bloqueio cármico). A verdade oculta é que muitos Silentis possuem Æ extraordinário, mas completamente inacessível — podem ter mais energia bruta que um Arconte, mas jamais acessá-la conscientemente.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Micro Aethrites — Tecnologia Primordial")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Micro Aethrites são partículas microscópicas de Aethra cristalizado, criadas pela tecnologia Aetheri na Era Primordial. Sincronizam-se com o Aethra do usuário, permitindo armazenamento de Æ excedente, regeneração acelerada, e amplificação de técnicas espirituais. "),
        new TextRun({ text: "Limitação Crítica: ", bold: true }),
        new TextRun("Os Micro Aethrites são parasitários por natureza — não podem ser removidos de um hospedeiro vivo sem causar fatalidade. Podem ser transmitidos através do DNA biológico.")
      ]}),
      
      // ========================================
      // ALYNDRA
      // ========================================
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("ALYNDRA")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Definição Fundamental")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Alyndra é o nome da figura primordial que deu origem ao universo como conhecemos, bem como o título escolhido para o livro que narra esta saga épica. O nome carrega duplo significado: honra a sacrifício e transformação, representando tanto a personagem histórica quanto o legado que ela deixou para toda a existência.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Alyndra — A Personagem Histórica")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Alyndra foi a líder suprema da civilização Aetherion, fundadora de sua estrutura social e criadora da Armadura Suprema. Consumidora do Fruto de Aetherion, ela transcendeu os limites da mortalidade comum, tornando-se uma das entidades mais poderosas já existentes. Diferente da crença popular de que o poder corrompe, Alyndra manteve-se pura de coração, usando sua força não para dominar, mas para proteger e guiar sua civilização.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O consumo do Fruto concedeu a Alyndra uma compreensão profunda dos princípios fundamentais da existência. Ela viu as leis que governam a realidade, os mecanismos pelos quais as almas são julgadas, e a verdadeira natureza da pureza espiritual. Com esta compreensão, Alyndra criou as "),
        new TextRun({ text: "Leis da Pureza", bold: true }),
        new TextRun(" — um conjunto de princípios destinados a guiar as almas em direção à transcendência. Gravou essas leis nas sementes que dispersou pelo universo, garantindo que seu conhecimento sobrevivesse mesmo após a queda de sua civilização.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("O Auto Sacrifício")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Quando os Nihilaryth emergiram e a corrupção se espalhou por Aetherion, Alyndra compreendeu que não havia salvação para sua civilização em sua forma atual. Ela usou todo o poder do Fruto para dilatar os Nihilaryth pelo universo, espalhando suas essências por distâncias tão vastas que levaria eons para se recompor. Este ato consumiu completamente sua força vital, mas comprou tempo para o universo.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("O Segredo do Corpo")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "VERDADE OCULTA: ", bold: true }),
        new TextRun("O corpo de Alyndra não foi destruído em seu sacrifício. Os Nihilaryth conseguiram capturar e preservar seu corpo físico. O paradeiro atual de seu corpo permanece um dos maiores mistérios do universo. A verdade sobre o corpo de Alyndra — e se sua consciência ainda existe de alguma forma — permanece um segredo guardado, aguardando revelação.")
      ]}),
      
      // ========================================
      // LEIS DA PUREZA - 12 LEIS
      // ========================================
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("LEIS DA PUREZA")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Definição Fundamental")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("As Leis da Pureza são o conjunto de princípios fundamentais criados por Alyndra após consumir o Fruto de Aetherion e compreender os mecanismos profundos da existência. Estas leis não são mandamentos impostos de fora, mas sim a codificação das verdades universais que governam o destino espiritual de todas as consciências. Alyndra gravou estas leis nas sementes que dispersou pelo universo, garantindo que o conhecimento da transcendência sobrevivesse através dos eons.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("As Doze Leis dividem-se em dois grupos: as "),
        new TextRun({ text: "Sete Leis Fundamentais", bold: true }),
        new TextRun(", que julgam a essência da alma, e as "),
        new TextRun({ text: "Cinco Leis de Conduta", bold: true }),
        new TextRun(", que guiam as ações no mundo material. Juntas, formam o caminho completo para a transcendência.")
      ]}),
      
      // O MANDAMENTO SUPREMO
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("O Mandamento Supremo")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })
      ]}),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "\"Ama a Existência com todo teu ser, e a cada consciência como a ti mesmo.", italics: true, size: 24, bold: true, color: colors.primary }),
      ]}),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "Nisto se resumem todas as Leis.\"", italics: true, size: 24, bold: true, color: colors.primary })
      ]}),
      new Paragraph({ spacing: { after: 200 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })
      ]}),
      
      // ========================================
      // AS SETE LEIS FUNDAMENTAIS
      // ========================================
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("As Sete Leis Fundamentais")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("As Sete Leis Fundamentais julgam a essência da alma — suas motivações mais profundas, sua coerência interna, e sua harmonia com a estrutura do universo. No momento da morte, cada alma é confrontada com estas leis e não pode fugir de sua própria verdade.")
      ]}),
      
      // LEI I
      new Paragraph({ spacing: { before: 300 }, children: [] }),
      new Paragraph({ children: [
        new TextRun({ text: "LEI I — A Lei da Intenção Pura", bold: true, size: 26, color: colors.law1t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"A alma é julgada não pelo que faz, mas pelo que deseja ser.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A primeira lei estabelece que as verdadeiras motivações de uma consciência determinam seu estado espiritual. Ações externas podem ser enganosas — um ato de caridade motivado por vaidade corrompe, enquanto um ato de severidade motivado por amor genuíno pode purificar. A Lei da Intenção Pura reconhece que a alma é moldada por suas aspirações mais profundas. No julgamento final, é a essência do desejo que pesa, não a aparência da ação. Esta lei explica por que os Nihilaryth são corruptos: sua intenção fundamental era superar o Criador, um desejo nascido do orgulho. O sacrifício de Yggoraty foi puro porque sua intenção era proteger a vida.")
      ]}),
      
      // LEI II
      new Paragraph({ children: [
        new TextRun({ text: "LEI II — A Lei do Impacto Real", bold: true, size: 26, color: colors.law2t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"Toda ação ecoa através do tecido da existência; a alma carrega o peso de seus ecos.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A segunda lei reconhece que boas intenções não são suficientes se o impacto real de uma ação é prejudicial. A alma é responsável não apenas pelo que pretende, mas pelo que efetivamente causa no universo. Cada ação cria ondas que se propagam através do tecido da realidade, afetando outras consciências de maneiras que podem não ser imediatamente aparentes. A ignorância é atenuante, mas não absolvição completa. Esta é a razão pela qual o autoconhecimento e a reflexão são virtudes espirituais essenciais — quanto mais uma consciência compreende, maior sua responsabilidade.")
      ]}),
      
      // LEI III
      new Paragraph({ children: [
        new TextRun({ text: "LEI III — A Lei da Coerência Interior", bold: true, size: 26, color: colors.law3t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"Uma alma dividida contra si mesma não pode transcender; a integridade é o caminho para a eternidade.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A terceira lei estabelece que a fragmentação interna impede a transcendência. Uma alma que carrega contradições profundas — que deseja o bem mas cultiva o ódio, que busca a verdade mas se refugia na mentira — cria uma desarmonia interna que a torna incompatível com a estrutura integrada do universo. A hipocrisia é uma das corrupções mais graves, pois o hipócrita constrói uma falsa identidade que o separa de sua verdade interior. Esta fragmentação, se não resolvida, pode resultar na dissolução da consciência.")
      ]}),
      
      // LEI IV
      new Paragraph({ children: [
        new TextRun({ text: "LEI IV — A Lei do Sacrifício Consciente", bold: true, size: 26, color: colors.law4t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"O maior poder da existência é abrir mão de si mesmo por amor; este é o caminho da transcendência suprema.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A quarta lei reconhece o sacrifício de amor como a expressão mais pura de que uma consciência é capaz. Quando um ser abre mão de algo precioso — inclusive sua própria existência — pelo bem de outros, sem expectativa de recompensa, esta ação cria uma ressonância única com a estrutura do universo. O Criador, ao se transformar na própria existência, praticou o sacrifício supremo; assim, aqueles que sacrificam por amor ecoam este ato primordial. Esta lei explica o padrão de sacrifício através das eras: Alyndra, Yggoraty, Elarys, Elainy.")
      ]}),
      
      // LEI V
      new Paragraph({ children: [
        new TextRun({ text: "LEI V — A Lei da Responsabilidade Cósmica", bold: true, size: 26, color: colors.law5t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"Todo ser é guardião de tudo o que toca; a posse é uma ilusão, a responsabilidade é eterna.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A quinta lei estabelece que toda consciência é responsável não apenas por suas próprias ações, mas pelo impacto que exerce sobre tudo o que entra em sua esfera de influência. Um líder é responsável pelo bem-estar de seus liderados; um mestre, pelo desenvolvimento de seus discípulos; um artista, pela verdade de sua criação. O poder carrega consigo a obrigação de usá-lo para o benefício do todo. Os Nihilaryth são tão corruptos porque, como os dez seres mais poderosos de sua era, negligenciaram completamente sua responsabilidade cósmica.")
      ]}),
      
      // LEI VI
      new Paragraph({ children: [
        new TextRun({ text: "LEI VI — A Lei do Crescimento Contínuo", bold: true, size: 26, color: colors.law6t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"A alma que cesse de evoluir começa a morrer; a estagnação é a primeira sombra da corrupção.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A sexta lei reconhece que o universo está em constante evolução, e que as consciências que o compõem devem evoluir junto com ele. Uma alma que se recusa a aprender, crescer, ou mudar — mesmo que tenha sido pura no passado — gradualmente se torna incompatível com a realidade em transformação. A arrogância espiritual é perigosa: aquele que acredita ter alcançado a sabedoria final cessou de crescer, e assim começou a declinar. Os maiores mestres sempre reconheceram que quanto mais aprendiam, mais percebiam quanto ainda havia para aprender.")
      ]}),
      
      // LEI VII
      new Paragraph({ children: [
        new TextRun({ text: "LEI VII — A Lei da Conexão Universal", bold: true, size: 26, color: colors.law7t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"Todas as almas são fios do mesmo tecido; ferir outro é ferir a si mesmo, elevar outro é elevar o todo.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A sétima lei reconhece a interconexão fundamental de toda existência. Nenhuma consciência existe isoladamente; cada uma é parte de uma rede vasta de relações que abrange todo o universo. A separação entre \"eu\" e \"outro\" é uma ilusão necessária para a experiência individual, mas no nível fundamental, todas as consciências são manifestações do mesmo princípio criador. Aqueles que internalizam esta verdade naturalmente agem com compaixão, pois percebem que não podem ferir outro sem ferir a si mesmos.")
      ]}),
      
      // ========================================
      // AS CINCO LEIS DE CONDUTA
      // ========================================
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("As Cinco Leis de Conduta")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("As Cinco Leis de Conduta guiam as ações no mundo material. Enquanto as Sete Leis Fundamentais julgam a essência, estas leis orientam o comportamento diário, transformando conhecimento espiritual em prática viva.")
      ]}),
      
      // LEI VIII
      new Paragraph({ spacing: { before: 300 }, children: [] }),
      new Paragraph({ children: [
        new TextRun({ text: "LEI VIII — A Lei da Reverência ao Aethra", bold: true, size: 26, color: colors.law8t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"O Aethra é presente sagrado da existência; usá-lo para o ego é profanar o divino que habita em ti.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O Aethra não é propriedade do indivíduo — é presente de Yggorath e, em última instância, do próprio Criador. Usá-lo para fins egoístas, para dominar outros, ou para corromper é profanação. Aquele que queima seu Aethra em serviço ao bem transcende; aquele que o gasta em vaidade consome a própria alma. O poder espiritual é empréstimo, não posse. Todo Æ gasto retornará ao universo; a questão é: que legado deixará? Esta lei ensina que o poder sem reverência corrompe tanto quanto o uso malicioso.")
      ]}),
      
      // LEI IX
      new Paragraph({ children: [
        new TextRun({ text: "LEI IX — A Lei do Amor como Fundamento", bold: true, size: 26, color: colors.law9t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"O amor é a única força que cria eternamente; tudo o mais consome e se consome. Sem amor, até o maior poder é vazio.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Esta lei estabelece o amor como a força criativa primordial do universo. O Criador criou por amor; Yggorath sustenta por amor; os sacrifícios que moldaram as eras foram movidos por amor. Poder sem amor é destruição vestida de glória. Conhecimento sem amor é arrogância. Justiça sem amor é crueldade. O amor não é emoção passageira — é compromisso inabalável com o bem do outro. Toda ação deve ser filtrada pela pergunta: \"Isto serve ao amor?\" Se a resposta for não, a ação corrói a alma.")
      ]}),
      
      // LEI X
      new Paragraph({ children: [
        new TextRun({ text: "LEI X — A Lei da Honra aos Ancestrais", bold: true, size: 26, color: colors.law10t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"A sabedoria não nasce do vazio; é herança sagrada. Desonrar os que vieram antes é cortar as próprias raízes.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Todo conhecimento, toda técnica, toda verdade foi descoberta, preservada e transmitida por gerações anteriores. Os Aetheri desenvolveram a tecnologia espiritual; Alyndra codificou as leis; Yggoraty protegeu a semente; os Seraphyens ensinaram a humanidade. Desprezar esta herança é ingratidão espiritual. Honrar os ancestrais não é veneração cega — é reconhecer que somos ramos de uma árvore cujas raízes mergulham no princípio dos tempos. O indivíduo que rejeita o conhecimento ancestral para seguir apenas sua \"própria verdade\" é como árvore que corta as próprias raízes buscando liberdade.")
      ]}),
      
      // LEI XI
      new Paragraph({ children: [
        new TextRun({ text: "LEI XI — A Lei da Justiça Restaurativa", bold: true, size: 26, color: colors.law11t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"A verdadeira justiça cura, não pune; restaura, não destrói. O olho por olho deixa o mundo cego.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A justiça cósmica não é vingança disfarçada — é restauração do equilíbrio. Quando um ser erra, a resposta do universo não é punição, mas oportunidade de reparação. Aquele que causa dano deve reparar; aquele que foi prejudicado deve encontrar caminho de cura. O ciclo de vingança perpetua corrupção em ambas as partes. A justiça verdadeira busca elevar tanto o ofensor quanto o ofendido. Os Nihilaryth não são \"punidos\" — são confrontados com as consequências naturais de suas escolhas. A porta da redenção nunca se fecha, mas atravessá-la exige transformação genuína.")
      ]}),
      
      // LEI XII
      new Paragraph({ children: [
        new TextRun({ text: "LEI XII — A Lei da Fraternidade Universal", bold: true, size: 26, color: colors.law12t })
      ]}),
      new Paragraph({ style: "LawQuote", children: [new TextRun({ text: "\"Cada ser que cruzes é teu irmão na jornada da existência; o estranho não existe, apenas aquele que ainda não reconheceste.\"", italics: true, size: 22 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Esta lei expande a Lei VII (Conexão Universal) para o plano da ação. Não basta saber que todos somos conectados — é necessário agir com esta verdade. O \"próximo\" não é apenas quem te é semelhante, mas qualquer consciência que cruze teu caminho. Inimigos, estranhos, criaturas de outras espécies — todos são companheiros na jornada da existência. Tratar outro com desdão é desonrar a ti mesmo. A civilização que escraviza outras, o indivíduo que despreza o diferente, o poderoso que ignora o fraco — todos violam esta lei e corrompem suas almas.")
      ]}),
      
      // ========================================
      // RESUMO DAS 12 LEIS
      // ========================================
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Resumo das Doze Leis")] }),
      
      new Table({
        columnWidths: [800, 2600, 2600, 3360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nº", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nome", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Foco", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Grupo", bold: true, size: 18 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "I", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Intenção Pura", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Motivação", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law1, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Fundamental", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "II", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Impacto Real", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Consequência", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law1, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Fundamental", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "III", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Coerência Interior", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Integridade", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law1, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Fundamental", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IV", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Sacrifício Consciente", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Entrega", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law1, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Fundamental", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "V", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Responsabilidade Cósmica", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Dever", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law1, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Fundamental", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VI", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Crescimento Contínuo", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Evolução", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law1, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Fundamental", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VII", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Conexão Universal", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Unidade", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law1, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Fundamental", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VIII", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Reverência ao Aethra", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Poder", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law8, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Conduta", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IX", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Amor como Fundamento", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Essência", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law8, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Conduta", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "X", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Honra aos Ancestrais", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Tradição", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law8, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Conduta", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "XI", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Justiça Restaurativa", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Equilíbrio", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law8, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Conduta", size: 18, italics: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "XII", bold: true, size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Fraternidade Universal", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Relação", size: 18 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.law8, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Conduta", size: 18, italics: true })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 3: Resumo das Doze Leis da Pureza", italics: true, size: 18, color: colors.accent })] }),
      
      // ========================================
      // OS FRUTOS DA ALMA PURA
      // ========================================
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Os Doze Frutos da Alma Pura")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Como a Árvore da Existência produz frutos, uma alma que vive pelas Leis manifesta qualidades visíveis. Estes não são méritos conquistados, mas reflexos naturais de uma essência em harmonia com o universo:")
      ]}),
      
      new Table({
        columnWidths: [2200, 7160],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fruto", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true, size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Paz", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Serenidade inabalável, mesmo no caos. A certeza interior que transcende as circunstâncias.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Paciência", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Suportar o insuportável sem perder a essência. A força de esperar o tempo necessário.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Bondade", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Agir para o bem mesmo sem expectativa de retorno. A generosidade que flui naturalmente.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Fidelidade", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Manter compromissos mesmo quando custa. A palavra que se cumpre independentemente do preço.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Mansidão", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Poder controlado, força a serviço da proteção. A capacidade de ser forte sem ser cruel.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Domínio Próprio", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Não ser escravo dos próprios impulsos. A liberdade de escolher a resposta certa.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Sabedoria", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Ver além das aparências, compreender profundamente. O conhecimento aplicado com discernimento.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Coragem", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Agir corretamente mesmo com medo. A força que não nega o temor, mas o transcende.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Humildade", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Conhecer o verdadeiro lugar no universo. A consciência de ser parte, não o todo.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Generosidade", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Dar sem medir, confiar na abundância. A certeza de que dar é receber em outra forma.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Perdão", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Libertar outros das correntes do ressentimento. A compreensão de que perdoar é libertar-se.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Esperança", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Manter a luz mesmo na escuridão mais profunda. A certeza de que o amanhecer virá.", size: 20 })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 4: Os Doze Frutos da Alma Pura", italics: true, size: 18, color: colors.accent })] }),
      
      // ========================================
      // AS SETE CORRUPÇÕES DA ALMA
      // ========================================
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("As Sete Corrupções da Alma")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Oposto dos frutos, estas são as doenças espirituais que corrompem a alma e impedem a transcendência:")
      ]}),
      
      new Table({
        columnWidths: [2000, 4180, 3180],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Corrupção", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Leis Violadas", bold: true, size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FEE2E2", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Soberba", bold: true, size: 20, color: "991B1B" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Achar-se acima de tudo e todos. O orgulho que rejeita a dependência.", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "I, VI", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Ganância", bold: true, size: 20, color: "92400E" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Acumular além do necessário, nunca bastar. O vazio que tenta se preencher com posse.", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "V, VIII, IX", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FCE7F3", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Luxúria", bold: true, size: 20, color: "9D174D" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Desejo que consome e objetifica. O impulso que reduz o outro a meio.", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "I, VII, XII", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FEE2E2", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Ira", bold: true, size: 20, color: "991B1B" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Fogo que queima sem construir. A raiva que destrói a si mesmo e ao outro.", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "II, XI", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "D1FAE5", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Gula", bold: true, size: 20, color: "166534" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Consumir mais do que se precisa. O apetite sem limites que devora o mundo.", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "V, VIII", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "ECFDF5", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Inveja", bold: true, size: 20, color: "166534" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Resentir o bem alheio. O veneno que corrói por aquilo que não se é.", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "III, IX, XII", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "E0E7FF", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: "Preguiça", bold: true, size: 20, color: "3730A3" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Recusar a responsabilidade de existir. A omissão que se disfarça de descanso.", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "V, VI", size: 20 })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 5: As Sete Corrupções da Alma", italics: true, size: 18, color: colors.accent })] }),
      
      // ========================================
      // O JULGAMENTO FINAL
      // ========================================
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("O Julgamento Final")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("No momento da morte, cada alma é avaliada de acordo com as Doze Leis da Pureza. O julgamento não é um tribunal externo, mas uma revelação interna — a alma confronta sua própria verdade, seus desejos mais profundos, seus impactos reais, suas contradições, seus sacrifícios, suas responsabilidades, seu crescimento, e suas conexões. Este processo é inevitável e impossível de enganar, pois a alma não pode mentir para si mesma quando confrontada com a verdade absoluta.")
      ]}),
      
      new Table({
        columnWidths: [2500, 6860],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Resultado", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Destino da Alma", bold: true, size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "D1FAE5", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PURO", bold: true, size: 20, color: "065F46" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Transcendência — A consciência funde-se com a estrutura do universo, tornando-se imortal. Preserva sua identidade enquanto expande para abraçar o todo.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MISTO", bold: true, size: 20, color: "92400E" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Julgamento Parcial — Alguns aspectos podem transcender enquanto outros são devolvidos ao Vazio. A extensão da transcendência depende do grau de pureza.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FEE2E2", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CORROMPIDO", bold: true, size: 20, color: "991B1B" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Dissolução — A essência é devolvida ao Vazio Primordial, onde dissolve-se em potencial puro. Não há sofrimento, mas também não há continuidade de consciência.", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "E9D5FF", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PRIMORDIAL CORRUPTO", bold: true, size: 20, color: "6B21A8" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Rejeição Dupla — O Vazio rejeita sua corrupção, e o universo não pode absorvê-los. Presos entre existência e não-existência. Este é o destino dos Nihilaryth.", size: 20 })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 6: Resultados do Julgamento pela Pureza", italics: true, size: 18, color: colors.accent })] }),
      
      // FOOTER
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })] }),
      new Paragraph({ style: "Quote", children: [new TextRun("\"Conhecer o nome é o primeiro passo para conhecer a essência.\"")] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Glossario_Oficial_v3.docx", buffer);
  console.log("Glossário v3 salvo em: /home/z/my-project/download/Alyndra_Glossario_Oficial_v3.docx");
});
