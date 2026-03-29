const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, VerticalAlign, LevelFormat, PageBreak, 
        TableOfContents, Header, Footer, PageNumber } = require('docx');
const fs = require('fs');

// === CORES: Terra Cotta Afterglow ===
const colors = {
  primary: "26211F",      // Deep Charcoal Espresso
  body: "3D3735",         // Dark Umber Gray  
  secondary: "6B6361",    // Warm Greige
  accent: "C19A6B",       // Terra Cotta Gold
  tableBg: "FDFCFB"       // Off-White
};

// === BORDAS PARA TABELAS ===
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
          children: [new TextRun({ text: "Mapa Mental do Universo", size: 40, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          spacing: { before: 800 },
          children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 28, color: colors.accent })]
        }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [new TextRun({ text: "A Bíblia da Criação", size: 28, italics: true, color: colors.secondary })]
        }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "Documento Oficial de Referência", size: 22, color: colors.secondary })]
        }),
        new Paragraph({ spacing: { before: 4000 }, children: [] }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "\"Do sacrifício nasce a criação. Da criação, o universo.\"", size: 24, italics: true, color: colors.accent })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // === CONTEÚDO PRINCIPAL ===
    { properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "ALYNDRA — Mapa Mental do Universo", size: 18, color: colors.secondary, italics: true })]
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

        // === 1. VISÃO GERAL DO UNIVERSO ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Visão Geral do Universo")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O universo de Alyndra é construído sobre uma cosmologia única onde duas forças primordiais — Luz e Sombras — dão origem a toda a existência. Esta cosmologia difere fundamentalmente das tradições clássicas de bem versus mal, apresentando uma dualidade onde ambas as forças são necessárias e complementares. A Luz representa a criação e a entropia, enquanto as Sombras representam a destruição e o equilíbrio. Juntas, elas formam o ciclo eterno da existência, e é desta interação que nascem os cinco elementos fundamentais: Fogo, Água, Terra, Relâmpago e Vento.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("No centro desta cosmologia está Yggorath, a Árvore Primordial, cujo sacrifício e união com Alyndra deram origem ao padrão que se repetirá através das eras: o sacrifício de amor como força transformadora. Este padrão atravessa três eras distintas — a Era Primordial, a Era dos Seraphyens e a Era de Grazielly — sempre envolvendo pares cujo destino está entrelaçado pelo destino e pelo amor que transcende a própria existência.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 2. ESTRUTURA CÓSMICA ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Estrutura Cósmica")] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Yggorath — A Árvore Primordial")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Yggorath é a entidade central do universo, uma árvore cósmica que existe além do tempo e do espaço convencionais. Ela não é meramente uma árvore gigantesca, mas sim um ser consciente que encarna a própria estrutura da realidade. Suas raízes penetram nas profundezas do vazio primordial, enquanto seus ramos se estendem por todas as dimensões da existência. Yggorath possui consciência própria e sentimentos profundos, sendo capaz de amar, sofrer e sacrificar-se.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Árvore Primordial gerou o Fruto da Existência, uma concentração de poder cósmico que pode realizar qualquer desejo — mas com um custo proporcional à magnitude do pedido. O Fruto não é consumido, mas tocado com uma troca de Aethra (a essência vital). Quando Yggorath tocou o Fruto desejando poder para proteger Alyndra, o custo foi tão elevado que quase a destruiu completamente, sendo salvá apenas pelo sacrifício de Alyndra, que ofereceu sua própria essência para sustentar a árvore.")]
        }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Os Filhos Legítimos")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Do Fruto da Existência, Yggorath gerou dois filhos diretamente, conhecidos como os Filhos Legítimos. Eles não são Seraphyens — são entidades de natureza superior, encarnando as duas forças primordiais que governam toda a realidade:")]
        }),
        
        // Tabela dos Filhos Legítimos
        new Table({
          columnWidths: [3120, 3120, 3120],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Entidade", bold: true, color: colors.primary, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Força", bold: true, color: colors.primary, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Natureza", bold: true, color: colors.primary, size: 22 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ILYOS", bold: true, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LUZ", bold: true, color: "D4A574", size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Construtiva e Entrópica", size: 22 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NYXALOR", bold: true, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "SOMBRAS", bold: true, color: "4A4A4A", size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Destrutiva e Equilibradora", size: 22 })] })] })
              ]
            })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 1: Os Filhos Legítimos de Yggorath", size: 18, italics: true, color: colors.secondary })] }),
        
        new Paragraph({ 
          spacing: { before: 200, after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "Importante: ", bold: true }), new TextRun("Ilyos e Nyxalor são irmãos. Nyxalor NÃO é Seraphyen — ele é um Filho Legítimo, de natureza superior. Os cinco elementos derivam da interação entre Luz e Sombras. A Luz cria e expande (entropia crescente), enquanto as Sombras reciclam e equilibram (controle entrópico). Esta não é uma dualidade de bem contra mal, mas sim de forças complementares e interdependentes.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 A Hierarquia Completa")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A estrutura hierárquica do universo segue uma ordem clara de poder e responsabilidade. No topo está Yggorath, seguida pelos Filhos Legítimos, e então pelos Seraphyens. Abaixo deles estão os Nihilaryth (entidades corrompidas), os habitantes mortais, e outras criaturas mágicas. Esta hierarquia não é rígida — existem casos de mortal elevando-se ao status de Seraphyen, e Seraphyens que caíram para a corrupção dos Nihilaryth.")]
        }),
        
        // Diagrama hierárquico
        new Paragraph({ 
          alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "YGGORATH (Árvore Primordial)\n├── FILHOS LEGÍTIMOS (do Fruto da Existência)\n│   ├── ILYOS — Luz da Criação\n│   └── NYXALOR — Equilíbrio da Criação\n│\n└── 10 SERAPHYENS (5 pares por elemento)\n    ├── FOGO:    Ignisara (Luz) + Elarys (Sombra)\n    ├── ÁGUA:    Aquaryn (Luz) + Mareth (Sombra)\n    ├── TERRA:   Terrador (Luz) + Lithos (Sombra)\n    ├── RAIO:    Fulgur (Luz) + Voltaris (Sombra)\n    └── VENTO:   Ventus (Luz) + Tempest (Sombra)", font: "Courier New", size: 20 })]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 3. AS DUAS FORÇAS PRIMORDIAIS ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. As Duas Forças Primordiais")] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 LUZ — A Força Construtiva e Entrópica")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Luz, encarnada por Ilyos, é a força primordial da criação. Ela é responsável por trazer à existência tudo que existe — mundos, vidas, magia, pensamentos. No entanto, a Luz carrega uma natureza paradoxal: ela é tanto construtiva quanto entrópica. A criação constante sem limite leva ao caos e à dissipação de energia. A Luz, deixada sem restrições, criaria infinitamente até consumir toda a energia disponível e colapsar em si mesma.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Esta natureza entrópica da Luz explica por que a criação descontrolada é perigosa. Quando alguém manipula energia luminosa pura sem equilíbrio, corre o risco de causar expansão desordenada, fragmentação da realidade, ou até mesmo a destruição por exaustão de recursos. Ilyos, como encarnação da Luz, compreende este paradoxo e trabalha em harmonia com seu irmão Nyxalor para manter o equilíbrio do universo.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 SOMBRAS — A Força Destrutiva e Equilibradora")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("As Sombras, encarnadas por Nyxalor, são frequentemente mal compreendidas como \"mal\" ou \"escuridão maligna\". Na realidade, as Sombras são a força de equilíbrio essencial para a existência. Elas representam a destruição necessária — aquela que recicla, transforma e preserva. Sem as Sombras, a Luz criaria infinitamente até o colapso total. As Sombras controlam a entropia, reciclando a energia de volta ao ciclo da existência.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A destruição causada pelas Sombras não é cruel ou malévola — é cirúrgica e necessária. Assim como a poda de uma árvore permite seu crescimento saudável, a ação das Sombras remove o que é exagerado, corrompido ou insustentável. Nyxalor, como encarnação das Sombras, não é um vilão, mas sim o guardião do equilíbrio, trabalhando em conjunto com Ilyos para manter a harmonia cósmica.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 A Derivação dos Cinco Elementos")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Da interação entre Luz e Sombras nascem os cinco elementos fundamentais. Cada elemento carrega características de ambas as forças primordiais, com predominância de uma ou outra. Esta divisão é refletida na estrutura dos Seraphyens, que são organizados em pares por elemento:")]
        }),

        // Tabela dos Elementos
        new Table({
          columnWidths: [1870, 2340, 2340, 2810],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 1870, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Elemento", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seraphyen Luz", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seraphyen Sombra", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2810, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Características", bold: true, color: colors.primary, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1870, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FOGO", bold: true, color: "CC4422", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ignisara", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Elarys", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2810, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Paixão, Transformação", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1870, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ÁGUA", bold: true, color: "2255AA", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Aquaryn", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Mareth", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2810, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fluidez, Cura, Intuição", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1870, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TERRA", bold: true, color: "6B4423", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Terrador", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Lithos", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2810, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Estabilidade, Proteção", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1870, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "RELÂMPAGO", bold: true, color: "CCBB00", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fulgur", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Voltaris", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2810, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Velocidade, Poder", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1870, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VENTO", bold: true, color: "88AACC", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ventus", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tempest", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2810, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Liberdade, Mudança", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 2: Os Cinco Elementos e seus Seraphyens", size: 18, italics: true, color: colors.secondary })] }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 4. OS 10 SERAPHYENS ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Os 10 Seraphyens")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os Seraphyens são as entidades elementais criadas por Yggorath para governar e proteger os cinco elementos do universo. São dez no total, organizados em cinco pares — cada par representando as facetas Luz e Sombra de um mesmo elemento. Esta estrutura dual reflete a própria natureza do universo, onde Luz e Sombras devem coexistir em equilíbrio. Cada Seraphyen possui domínio sobre seu elemento e é responsável por manter o equilíbrio elemental em todas as realidades.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 ELARYS — O Seraphyen de Fogo Sombra")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "Elarys ocupa uma posição única entre os Seraphyens. ", italics: true }), new TextRun("Originalmente, o par de Fogo era composto por Ignisara e outro Seraphyen de Luz. Após um evento catastrófico, Elarys emergiu como o novo Seraphyen de Fogo Sombra — um ser que embodies a paixão transformadora do fogo temperada pela sabedoria equilibradora das Sombras. O Fogo Sombra de Elarys não é meramente destrutivo; é um fogo que transforma com propósito, que queima para renovar, que consome para criar espaço para o novo.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A linhagem de Elarys estende-se através das eras até chegar a Elainy, a mãe de Grazielly. Esta conexão sanguínea explica por que Elainy possuía afinidade natural com o elemento fogo e por que Grazielly herdou tanto poder — ela carrega em suas veias a herança de um Seraphyen. O sacrifício de Elarys ao morrer protegendo Ilyos ecoa através desta linhagem, manifestando-se no sacrifício final de Elainy e Grazielly na Cripta Primordial.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 Lista Completa dos Seraphyens")] }),
        new Paragraph({ 
          spacing: { after: 100 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Abaixo, a listagem completa dos dez Seraphyens com suas características principais:")]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Ignisara (Fogo Luz): ", bold: true }), new TextRun("Representa o fogo criador, a faísca da vida, a paixão que impulsiona a existência. Seu domínio inclui nascimento, inspiração e renovação através do calor.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Elarys (Fogo Sombra): ", bold: true }), new TextRun("Representa o fogo transformador, a chama que consome para renovar. Seu sacrifício por Ilyos criou a linhagem que chegaria até Elainy e Grazielly.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Aquaryn (Água Luz): ", bold: true }), new TextRun("Representa as águas da vida, cura e nutrição. Seu domínio inclui nascimentos, curas milagrosas e a preservação da vida através dos fluidos.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Mareth (Água Sombra): ", bold: true }), new TextRun("Representa as profundezas oceânicas, os abismos líquidos, a água que esconde segredos. Domina mistérios, intuição profunda e transformação subaquática.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Terrador (Terra Luz): ", bold: true }), new TextRun("Representa a terra fértil, montanhas majestosas e fundações sólidas. Seu poder sustenta civilizações e permite o crescimento da natureza.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Lithos (Terra Sombra): ", bold: true }), new TextRun("Representa a terra profunda, cavernas, minerais e fossilização. Domina a memória geológica e os segredos enterrados sob a superfície.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Fulgur (Relâmpago Luz): ", bold: true }), new TextRun("Representa o raio iluminador, claridade repentina, revelação. Seu poder traz insight instantâneo e iluminação súbita.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Voltaris (Relâmpago Sombra): ", bold: true }), new TextRun("Representa a tempestade elétrica, destruição rápida, descarga devastadora. Domina o poder puro e a velocidade letal.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Ventus (Vento Luz): ", bold: true }), new TextRun("Representa a brisa suave, mensageiro dos céus, liberdade. Seu domínio inclui comunicação, viagens e liberdade de movimento.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Tempest (Vento Sombra): ", bold: true }), new TextRun("Representa furacões, tornados, ventos destrutivos. Domina tempestades e forças climáticas catastróficas.")] }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 5. O PADRÃO DO SACRIFÍCIO ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. O Padrão do Sacrifício")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O universo de Alyndra é construído sobre um padrão que se repete através das eras: o sacrifício de amor como força transformadora máxima. Este padrão não é uma mera coincidência ou convenção narrativa — é uma lei fundamental da cosmologia, tecida na própria estrutura da realidade por Yggorath quando seu desejo de proteger Alyndra quase a destruiu. O sacrifício de Alyndra para salvar Yggorath criou um eco que ressoa através do tempo, repetindo-se em cada era quando o destino do universo está em jogo.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 Era Primordial — Yggorath e Alyndra")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("No início, Yggorath gerou o Fruto da Existência — uma concentração de poder cósmico capaz de realizar qualquer desejo. Quando Alyndra foi ameaçada por forças do vazio primordial, Yggorath tocou o Fruto desejando poder para protegê-la. O custo foi devastador: quase toda a essência de Yggorath foi consumida. Vendo sua amada definhar, Alyndra fez a única escolha possível — sacrificou sua própria existência, oferecendo sua Aethra (essência vital) para sustentar Yggorath.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Este primeiro sacrifício estabeleceu o padrão: um ser sacrifica-se por amor a outro, e este ato de amor puro transcende as leis da realidade. Alyndra não apenas salvou Yggorath — sua essência tornou-se parte da Árvore Primordial, existindo em toda parte e em nenhum lugar simultaneamente. Seu nome foi dado ao universo como homenagem eterna ao poder transformador do sacrifício amoroso.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 Era dos Seraphyens — Elarys e Ilyos")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Durante um conflito cósmico contra as forças do vazio, Ilyos (o Filho Legítimo da Luz) foi confrontado por uma entidade que ameaçava consumir sua essência. Elarys, Seraphyen de Fogo Sombra, interveio. Utilizando todo o seu poder, Elarys criou uma barreira de Fogo Sombra entre Ilyos e a ameaça, absorvendo o ataque devastador. O sacrifício de Elarys não foi em vão — Ilyos foi salvo, e a essência de Elarys foi preservada em sua linhagem sanguínea, que através dos milênios chegaria até Elainy.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Este segundo sacrifício reforçou o padrão cósmico e estabeleceu a linhagem que se tornaria crucial na terceira era. O Fogo Sombra de Elarys, nascido de seu amor e sacrifício, tornou-se herança de seus descendentes, manifestando-se mais fortemente em Elainy e, posteriormente, em Grazielly.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.3 Era de Grazielly — Elainy e Grazielly")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Na Cripta Primordial, Elainy e Grazielly enfrentaram os Nihilaryth em uma batalha decisiva pelo destino do universo. Quando todo parecia perdido, mãe e filha tomaram a decisão conjunta de se sacrificarem. Este sacrifício duplo foi único na história cósmica — pela primeira vez, dois seres conectados pelo amor maternal sacrificaram-se juntos. O poder gerado por este sacrifício foi suficiente para selar os Nihilaryth e preservar o equilíbrio do universo.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O sacrifício de Elainy e Grazielly completou o trio de sacrifícios que formam a espinha dorsal do universo. Cada era teve seu par, cada par teve seu sacrifício, e cada sacrifício reforçou o padrão que sustenta toda a criação. A pergunta que permanece é: haverá uma quarta era? E se houver, qual par estará destinado a continuar o padrão?")]
        }),

        // Tabela do Padrão do Sacrifício
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.4 Resumo do Padrão Cósmico")] }),
        new Table({
          columnWidths: [2340, 2800, 2340, 1880],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Era", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2800, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Par", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sacrifício", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 1880, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Resultado", bold: true, color: colors.primary, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Primordial", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Yggorath + Alyndra", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Alyndra por Yggorath", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1880, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Origem do padrão", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seraphyens", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Elarys + Ilyos", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Elarys por Ilyos", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1880, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Linhagem até Elainy", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Grazielly", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Elainy + Grazielly", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ambas juntas", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1880, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Selou os Nihilaryth", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 3: O Padrão do Sacrifício através das Eras", size: 18, italics: true, color: colors.secondary })] }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 6. PERSONAGENS PRINCIPAIS ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. Personagens Principais")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 Grazielly")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Protagonista da terceira era, Grazielly herdou a linhagem de Elarys através de sua mãe Elainy. Desde jovem demonstrou afinidade extraordinária com o elemento fogo, manifestando habilidades que excediam em muito o esperado para uma mortal comum. Sua jornada a levou à Cripta Primordial, onde ela e sua mãe fizeram o sacrifício que selou os Nihilaryth e preservou o equilíbrio do universo. O nome \"Grazielly\" carrega significado especial — deriva de \"graça\", refletindo o papel dela como salvadora do universo.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.2 Elainy")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Mãe de Grazielly e última herdeira direta da linhagem de Elarys. Elainy possuía forte afinidade com o elemento fogo e treinou sua filha para controlar seus poderes desde cedo. Seu amor maternal culminou no sacrifício duplo na Cripta Primordial, onde mãe e filha deram suas existências para salvar o universo. O nome \"Elainy\" ecoa \"Elarys\", refletindo a conexão sanguínea entre ambas.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.3 Aurelius")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "IMPORTANTE: ", bold: true }), new TextRun("Aurelius era pai de Grazielly ANTES de ser GM (Guardião Mestre). Esta distinção cronológica é crucial — Aurelius teve sua vida como mortal, incluindo a paternidade de Grazielly, antes de ascender ao posto de GM. Ele fazia parte da Equipe Aurora junto com Ayla, desempenhando papel importante na proteção do reino. Após sua ascensão, Aurelius teve que equilibrar suas responsabilidades cósmicas com a relação paternal com Grazielly.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.4 Théssaly")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "IMPORTANTE: ", bold: true }), new TextRun("Théssaly foi um GM (Guardião Mestre) que foi deposto de sua posição. Sua queda ocorreu devido à corrupção pelos Nihilaryth — especificamente, Théssaly foi corrompido e tentou usar os poderes de GM para fins que iam contra o equilíbrio do universo. Esta corrupção e deposição são parte do contexto que levou à crise enfrentada por Grazielly e Elainy na Cripta Primordial.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.5 Yggorath")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Árvore Primordial e centro de toda a existência. Yggorath possui consciência própria e sentimentos profundos. Sua pupila direta é Elarys — um vínculo especial que transcende a relação típica entre criador e criação. Este vínculo explica parte do poder excepcional de Elarys e, por extensão, de sua linhagem até Elainy e Grazielly.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 7. OS NIHILARYTH ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. Os Nihilaryth")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os Nihilaryth são dez entidades corrompidas que representam as maiores ameaças ao equilíbrio do universo. Cada Nihilaryth encarna uma forma específica de corrupção ou perversão das forças cósmicas. Eles não são \"maus\" no sentido tradicional — são distorções, sombras do que deveria ser, cáries na estrutura da realidade. O selamento dos Nihilaryth foi o objetivo do sacrifício de Elainy e Grazielly na Cripta Primordial.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.1 Mytha — O Nihilaryth do Engano")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "Mytha é um dos dez Nihilaryth, especificamente o Nihilaryth do Engano. ", bold: true }), new TextRun("Ele encarna a mentira, a ilusão e a decepção em suas formas mais insidiosas. Mytha não mente simplesmente — ele tece realidades falsas tão convincentes que se tornam verdadeiras para aqueles que as acreditam. Sá é o cristal que leva seu nome: o Cristal de Mytha, que pode selar ou libertar prisioneiros dependendo de como é utilizado. Este cristal é um artefato de poder considerável, funcionando em conjunto com a manopla da Armadura Suprema.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.2 Os Nove Nihilaryth Restantes")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Ainda não foram completamente definidos, mas seguem o padrão de encarnar corrupções específicas das forças cósmicas. Alguns possíveis domínios incluem: Avareza, Violência, Traição, Desespero, Inveja, Soberba, Gula, Preguiça e Luxúria — embora estas designações possam ser refinadas para melhor se adequar à cosmologia única de Alyndra.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 8. ARTEFATOS E LOCAIS ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. Artefatos e Locais Importantes")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.1 O Fruto da Existência")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O Fruto da Existência é uma concentração de poder cósmico gerado por Yggorath. Diferente de um fruto comum, não é consumido — é tocado com uma troca de Aethra (essência vital). O Fruto pode realizar qualquer desejo, mas o custo é proporcional à magnitude do pedido. Quando Yggorath tocou o Fruto desejando poder para proteger Alyndra, o custo foi tão elevado que quase a destruiu, sendo salvá apenas pelo sacrifício de Alyndra. O Fruto continua a existir, gerado periodicamente por Yggorath, e é considerado o artefato mais poderoso do universo.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.2 A Armadura Suprema")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Armadura Suprema é um artefato lendário que inclui uma manopla especial. Esta manopla, quando combinada com o Cristal de Mytha, possui o poder de selar ou libertar prisioneiros. A Armadura Suprema é considerada uma das proteções mais poderosas do universo, tendo sido utilizada por heróis através das eras. Seu paradeiro atual e história completa permanecem envoltos em mistério, aguardando desenvolvimento futuro.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.3 O Cristal de Mytha")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Nomeado em homenagem ao Nihilaryth do Engano, o Cristal de Mytha é um artefato paradoxal — criado a partir da essência de Mytha, mas capaz de ser usado contra ele e os outros Nihilaryth. Quando combinado com a manopla da Armadura Suprema, o cristal pode selar entidades poderosas ou libertá-las de seus aprisionamentos. Este poder de selar e libertar reflete a natureza do Engano: aquilo que parece prisão pode ser libertação, e vice-versa.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.4 A Cripta Primordial")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Cripta Primordial é o local mais sagrado e perigoso do universo. Localizada nas raízes mais profundas de Yggorath, a Cripta é onde os Nihilaryth foram selados após o sacrifício de Elainy e Grazielly. A Cripta não é apenas um local físico — é uma estrutura dimensional que existe entre a realidade e o vazio, projetada para conter entidades que ameaçam a existência. O acesso à Cripta é extremamente restrito, requerendo condições específicas que poucos conseguem satisfazer.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 9. LINHAGENS E CONEXÕES ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("9. Linhagens e Conexões")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("9.1 A Linhagem de Elarys")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A linhagem de Elarys é central para a história do universo. Começando com o próprio Seraphyen de Fogo Sombra, esta linhagem sanguínea carrega a herança do sacrifício de Elarys e sua afinidade elemental. Através de gerações, esta herança manifestou-se em diferentes graus, culminando em Elainy e Grazielly, que herdaram a capacidade mais forte de manipular o Fogo Sombra desde o próprio Elarys.")]
        }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "ELARYS (Seraphyen de Fogo Sombra)\n    │\n    ↓ (Linhagem através dos milênios)\n    │\nELAINY (Mãe de Grazielly)\n    │\n    ↓\n    │\nGRAZIELLY (Protagonista)", font: "Courier New", size: 20 })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("9.2 A Equipe Aurora")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Equipe Aurora foi um grupo de protetores do reino que incluía Aurelius e Ayla. Esta equipe operava antes da ascensão de Aurelius ao posto de GM, durante o período em que ele ainda era pai mortal de Grazielly. A Equipe Aurora representa uma época de relativa paz e estabilidade, antes das crises que culminariam no sacrifício na Cripta Primordial.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("9.3 Conexões entre Personagens")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Yggorath → Elarys: ", bold: true }), new TextRun("Elarys é pupila direta de Yggorath, um vínculo especial que transcende a criação típica.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Elarys → Ilyos: ", bold: true }), new TextRun("Elarys sacrificou-se para proteger Ilyos, criando um débito cósmico e uma conexão eterna.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Ilyos ↔ Nyxalor: ", bold: true }), new TextRun("Irmãos e forças complementares que mantêm o equilíbrio do universo.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Aurelius → Grazielly: ", bold: true }), new TextRun("Pai e filha, uma relação que existiu antes da ascensão de Aurelius como GM.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Elainy → Grazielly: ", bold: true }), new TextRun("Mãe e filha que se sacrificaram juntas na Cripta Primordial.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Théssaly → Nihilaryth: ", bold: true }), new TextRun("GM corrompido pelos Nihilaryth, eventualmente deposto.")] }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 10. PONTOS PARA DESENVOLVIMENTO ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("10. Pontos para Desenvolvimento Futuro")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Este documento consolida todo o conhecimento estabelecido sobre o universo de Alyndra. No entanto, existem áreas que ainda necessitam de desenvolvimento e refinamento:")]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Os nove Nihilaryth restantes: ", bold: true }), new TextRun("Nomes, domínios e características específicas de cada um.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "A história completa da Equipe Aurora: ", bold: true }), new TextRun("Missões, membros e eventos significativos.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "A trajetória de Aurelius: ", bold: true }), new TextRun("Como ele passou de pai mortal a GM, e as implicações disso.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "A queda de Théssaly: ", bold: true }), new TextRun("Detalhes de como foi corrompido e deposto.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "A história da Armadura Suprema: ", bold: true }), new TextRun("Origem, criadores e usuários anteriores.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "As gerações entre Elarys e Elainy: ", bold: true }), new TextRun("Como a linhagem foi preservada e transmitida.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "O papel de Ayla: ", bold: true }), new TextRun("Sua história, poderes e relação com Aurelius e Grazielly.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "A quarta era: ", bold: true }), new TextRun("Haverá continuação do padrão do sacrifício? Quem serão os próximos?")] }),
        
        new Paragraph({ 
          spacing: { before: 400 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })]
        }),
        new Paragraph({ 
          spacing: { before: 200 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "\"Do sacrifício nasce a criação. Da criação, o universo.\"", italics: true, color: colors.accent })]
        }),
        new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "— Princípio Fundamental de Alyndra", italics: true, color: colors.secondary })]
        }),
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Mapa_Mental_Principal.docx", buffer);
  console.log("✅ Documento criado: Alyndra_Mapa_Mental_Principal.docx");
});
