const { Document, Packer, Paragraph, TextRun, Header, Footer, PageNumber, AlignmentType, HeadingLevel, BorderStyle, WidthType, Table, TableRow, TableCell, ShadingType, VerticalAlign, LevelFormat } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "000000", font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "000000", font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: "333333", font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } }
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
        children: [new TextRun({ text: "ALYNDRA - Glossário Oficial", italics: true, size: 20 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "— ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 }), new TextRun({ text: " —", size: 20 })]
      })] })
    },
    children: [
      // TÍTULO
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "A L Y N D R A", bold: true, size: 48, font: "Times New Roman" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "GLOSSÁRIO OFICIAL", bold: true, size: 36, font: "Times New Roman" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 }, children: [new TextRun({ text: "Elementos • Fauna • Flora • Personagens • Termos", italics: true, size: 22 })] }),

      // ═══════════════════════════════════════════════════════════════
      // PARTE I: OS SETE ELEMENTOS
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE I: OS SETE ELEMENTOS")] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Em Alyndra, os elementos não são apenas forças da natureza — são manifestações do Aethra, a energia espiritual que flui através de todos os seres. Cada elemento possui um nome ancestral derivado do idioma primordial, usado tanto para designar o elemento quanto aqueles que possuem afinidade com ele. Os Sete Reinos de Nova Aetherion foram fundados sob a égide de cada elemento, seus nomes refletindo a essência elemental que define sua cultura e geografia.", size: 24 })] }),

      // TABELA DE ELEMENTOS
      new Table({
        columnWidths: [2000, 2000, 5360],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "333333" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "333333" }, left: { style: BorderStyle.SINGLE, size: 1, color: "333333" }, right: { style: BorderStyle.SINGLE, size: 1, color: "333333" } }, width: { size: 2000, type: WidthType.DXA }, shading: { fill: "2B2B2B", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nome Elemental", bold: true, color: "FFFFFF", size: 22 })] })] }),
              new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "333333" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "333333" }, left: { style: BorderStyle.SINGLE, size: 1, color: "333333" }, right: { style: BorderStyle.SINGLE, size: 1, color: "333333" } }, width: { size: 2000, type: WidthType.DXA }, shading: { fill: "2B2B2B", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Correspondência", bold: true, color: "FFFFFF", size: 22 })] })] }),
              new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "333333" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "333333" }, left: { style: BorderStyle.SINGLE, size: 1, color: "333333" }, right: { style: BorderStyle.SINGLE, size: 1, color: "333333" } }, width: { size: 5360, type: WidthType.DXA }, shading: { fill: "2B2B2B", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Reino e Significado", bold: true, color: "FFFFFF", size: 22 })] })] })
            ]
          }),
          new TableRow({ children: [
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Pyron", bold: true, color: "D35400", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fogo", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Reino de Pyronar — Terra de vulcões e paixão", size: 22 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Hydros", bold: true, color: "2980B9", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Água", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Reino de Hydoria — Arquipélagos e adaptação", size: 22 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Terrax", bold: true, color: "7D6608", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Terra", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Reino de Terraxis — Montanhas e tradição", size: 22 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Aeros", bold: true, color: "1ABC9C", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Vento", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Reino de Aetherion — Céus abertos e liberdade", size: 22 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fulgor", bold: true, color: "8E44AD", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Relâmpago", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Reino de Fulgoris — Tempestades e velocidade", size: 22 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Lumin", bold: true, color: "F1C40F", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Luz", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Reino Central de Aetheria — Equilíbrio e justiça", size: 22 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Umbra", bold: true, color: "5D6D7E", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sombra", size: 22 })] })] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } }, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Reino de Umbralis — Mistério e segredos", size: 22 })] })] })
          ]})
        ]
      }),
      
      new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "Nota: Os afins de cada elemento são chamados pelo nome de sua afinidade. Exemplo: um Pyron é alguém com afinidade ao fogo. O plural segue a conjugação natural: Pyrons, Hydros, Terrax, Aeros, Fulgor, Lumin e Umbras.", italics: true, size: 22 })] }),

      // ═══════════════════════════════════════════════════════════════
      // PARTE II: FAUNA DE ALYNDRAS
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE II: FAUNA DE ALYNDRAS")] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A fauna de Alyndra evoluiu independentemente de qualquer outro mundo, resultando em criaturas únicas que se adaptaram às condições específicas do planeta — as três luas, o sol Aurion, os Véus de Aether e a presença do Aethra no ambiente. Muitas espécies desenvolveram bioluminescência, enquanto outras evoluíram para interagir diretamente com a energia elemental.", size: 24 })] }),

      // --- INSETOS E PEQUENAS CRIATURAS ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Insetos e Pequenas Criaturas")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Kryll (substitui formigas)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Pequenos artrópodes sociais que formam colônias organizadas. Possuem exoesqueleto translúcido que brilha levemente no escuro, e suas patas deixam rastros de Aethra residual. São inofensivos individualmente, mas em grupo podem carregar objetos muito maiores que eles. Existem em todas as regiões de Nova Aetherion.", size: 24 })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Aetheris (substitui borboletas)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Insetos alados com asas iridescentes que capturam a luz de Aurion e a refratam em cores impossíveis. Seu vôo deixa um rastro brilhante que persiste por segundos, criando padrões no ar. São atraídos por Aethra concentrado e frequentemente aparecem onde alguém está praticando elemental. Na cultura popular, acredita-se que Aetheris carregam sonhos entre os reinos.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Skrix (substitui besouros/escaravelhos)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Pequenos insetos de carapaça dura que escavam na terra. Alguns são usados por Terrax para localizar minerais preciosos, pois são atraídos por depósitos de cristais. Quando ameaçados, emitem um chiado agudo e enterram-se rapidamente.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Luminis (vagalumes de Alyndra)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Insetos noturnos que produzem luz própria através de Aethra concentrado em seus abdomens. Ao contrário dos vagalumes comuns, os Luminis podem sincronizar seus pulso de luz, criando espetáculos naturais nas noites de verão. Os moradores do Reino de Aetherion dizem que os Luminis são fragmentos dos Véus de Aether que escolheram viver na terra.", size: 24 })] }),

      // --- AVES ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Aves")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Zephyr (aves do vento)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Aves de asas longas e corpo leve que parecem feitas de brisa sólida. Suas penas são quase transparentes e emitem um som melodioso quando o ar passa por elas. Os Zephyr nunca pousam no chão — dormem planando nas correntes de ar. São considerados sagrados no Reino de Aetherion, onde se acredita que carregam mensagens entre os vivos e os ancestrais.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Ignix (aves de fogo)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Aves cujas penas brilham como brasas vivas. Originárias do Reino de Pyronar, podem elevar sua temperatura corporal a ponto de incendiar predadores. Quando morrem, seus corpos se consomem em chamas, deixando apenas uma pena de cinza que os Pyrons consideram amuleto de sorte.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Corvus Noturnis (corvos de Nyx)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Aves negras de olhos violetas que habitam o Reino de Umbralis. São mais ativas à noite, quando a lua Nyx está alta. Diz-se que podem ver através de ilusões e que servem como olhos para os moradores de Umbralis. São os únicos animais que não temem a escuridão absoluta.", size: 24 })] }),

      // --- ANIMAIS TERRESTRES ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Animais Terrestres")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Kora (substitui cavalos)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Quadrúpedes elegantes com pernas longas e corpo esguio, criados para montaria e transporte. Possuem uma crina que flui mesmo sem vento — efeito de seu Aethra natural. São mais rápidos que cavalos e podem sentir tempestades de elemental a quilômetros de distância. Existem variedades adaptadas a cada reino: Kora de Pyronar têm pelagem avermelhada, os de Hydoria são cinza-prateados como o mar.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Lupis Aether (lobos espirituais)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Predadores que caçam em matilhas, com pelagem que muda de cor conforme o Aethra ambiente. Em noites de lua cheia, seus olhos brilham em tons de prata. São temidos mas respeitados — matar um Lupis Aether é considerado mau presságio em todos os reinos. Alguns Videntes de Umbralis dizem que os lobos carregam memórias de eras passadas.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Ursax (ursos de pedra)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Grandes Ursos cujo pelo tem a textura de musgo e pedra. Originários das montanhas de Terraxis, hibernam por meses em cavernas de cristal. Quando acordam, sua pele brilha com energia telúrica. Terrax os consideram guardiões das montanhas e os tratam com reverência.", size: 24 })] }),

      // --- CRIATURAS AQUÁTICAS ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Criaturas Aquáticas")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Serphis (serpentes marinhas)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Serpentes aquáticas de até três metros que navegam os mares de Hydoria. Possuem nadadeiras translúcidas que emitem luz quando submersas. São inofensivas para humanos e frequentemente seguem embarcações, atraindo boa sorte segundo a tradição Hydros.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Leviatãs de Cristal")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Criaturas lendárias que habitam as profundezas inexploradas dos oceanos. Avistamentos são raros e considerados presságios de grandes mudanças. Diz-se que seu corpo é feito de água viva e cristal, e que cantam canções que podem ser ouvidas por Hydros sensíveis a centenas de quilômetros.", size: 24 })] }),

      // ═══════════════════════════════════════════════════════════════
      // PARTE III: FLORA DE ALYNDRAS
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE III: FLORA DE ALYNDRAS")] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A vegetação de Alyndra desenvolveu características únicas em resposta às três luas e ao Aethra presente no solo. Muitas plantas são bioluminescentes, outras reagem aos ciclos lunares, e algumas absorvem diretamente a energia elemental do ambiente.", size: 24 })] }),

      // --- ÁRVORES ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Árvores")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Aetheris Arbor (Árvore do Aether)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Árvores majestosas que podem atingir até cinquenta metros de altura. Suas folhas são prateadas e capturam Aethra do ar, armazenando-o em seus troncos. À noite, a seiva brilha através da casca, criando padrões de luz. Madeira de Aetheris Arbor é usada para construir instrumentos sensíveis a elemental e armas de mestres.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Árvores de Lyria")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Árvores cujas folhas mudam de cor conforme a fase da lua Lyria. Durante a lua cheia, suas folhas ficam prateadas e emitem uma luz suave. Durante a lua nova, são quase pretas. Os Aeros usam essas árvores como calendários naturais.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Flamis (Árvores de Chama)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Árvores nativas de Pyronar cujas folhas parecem chamas dançantes. Não queimam — o efeito é visual, causado por pigmentos especiais que reagem ao calor. Durante o dia, uma floresta de Flamis parece estar em chamas. Seus frutos são picantes e usados na culinária Pyron.", size: 24 })] }),

      // --- FLORES ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Flores e Plantas Rasteiras")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Nyctis (Flores da Noite)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Flores que só abrem à noite, especialmente quando Nyx está alta. Suas pétalas são de um azul-profundo que brilha suavemente no escuro. São usadas em cerimônias fúnebres em Umbralis, onde se acredita que guiam almas ao além.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Sylvaris (Flores Silvestres)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Flores pequenas e coloridas que cobrem os campos de Aetherion. Existem em dezenas de variedades, cada uma florescendo em diferentes estações. Quando o vento passa por um campo de Sylvaris, as flores emitem um som suave como sinos distantes.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Aether Bloom (Flores de Aether)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Flores raras que crescem apenas em locais com alta concentração de Aethra. Suas pétalas são transparentes como cristal e refletem a luz em arco-íris. Quando um Lumin as toca, a flor brilha intensamente por horas. São cultivadas em jardins de Academias Elementais.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Elara's Tear (Lágrimas de Elara)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Flores rosadas pequenas que crescem em locais associados a sacrifício ou proteção. Segundo a lenda, brotaram pela primeira vez onde o sangue de Elarys caiu. São raras e consideradas sagradas — presenteá-las a alguém é declarar amor eterno e disposição para sacrificar-se.", size: 24 })] }),

      // --- PLANTAS ESPECIAIS ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Plantas Especiais")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Crysalis (Plantas de Cristal)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Plantas que crescem em cavernas profundas de Terraxis, sem necessidade de luz solar. Seus corpos são parcialmente cristalinos e emitem luz própria. Terrax as usam para iluminar minas sem precisar de tochas.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Hydra Vine (Videiras de Água)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Videiras que crescem nas margens dos rios de Hydoria. Absorvem água continuamente e podem armazená-la por meses. Durante secas, liberam água lentamente, mantendo o solo úmido ao seu redor. São usadas como fonte de água em emergências.", size: 24 })] }),

      // ═══════════════════════════════════════════════════════════════
      // PARTE IV: PERSONAGENS
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE IV: PERSONAGENS")] }),

      // --- PERSONAGENS PRINCIPAIS ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Personagens Principais")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Grazielly")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Protagonista da Era de Grazielly. Órfã criada no Reino de Aetherion, filha secreta de Aurelius e Ayla. Possui linhagem de Ilyos através de sua mãe. Seu nome significa 'graça' na língua antiga. Aos sete anos, é aceita na Academia Elemental do Reino de Aetherion através de uma bolsa misteriosa. Observadora, inteligente, sonha em se tornar uma guerreira como os Vanguardas que admira. Seu potencial elemental é dormente — cristais comuns não detectam afinidade.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Elainy")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Personagem que aparecerá futuramente. Detalhes a serem revelados na narrativa. Seu nome é uma homenagem do criador.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Helena")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Personagem que aparecerá futuramente como uma das melhores amigas de Grazielly. Seu nome é uma homenagem do criador.", size: 24 })] }),

      // --- PERSONAGENS PRIMORDIAIS ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Entidades Primordiais")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Ilyos")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Filho Legítimo da Árvore Primordial, Senhor da Luz. Após a corrupção de seu irmão Nyxalor, o selou em um Limiar Dimensional e passou eras em vigília eterna. Sua linhagem perdura através de descendentes como Ayla e Grazielly. Atualmente observa o universo de seu confinamento voluntário, sentindo quando sua herdeira finalmente nasceu.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Nyxalor")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Filho Legítimo da Árvore Primordial, Senhor das Trevas. Corrompido pelos Nihilaryth através de Vorynthrix, foi selado por seu irmão Ilyos. Em seus últimos momentos de clareza, expressou arrependimento. Permanece aprisionado entre dimensões, os nove Primordiais Corruptos presos com ele.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Elarys")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Seraphyen de Fogo Sombra. Sacrifou sua existência para salvar Ilyos do ataque fatal de Nyxalor. Seu corpo foi preservado em um santuário entre as estrelas, sua armadura aguardando o dia em que será encontrada como relíquia. Fragmentos de sua essência se espalharam pelo universo.", size: 24 })] }),

      // --- FAMÍLIA DE GRAZIELLY ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Família de Grazielly")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Aurelius")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Décimo Segundo Grande Mestre de Nova Aetherion. Emergiu da Guerra dos Três Grandes Mestres como um líder de equilíbrio e justiça. Amou Ayla em segredo por anos, nunca sabendo que teve uma filha. Autorizou a bolsa de Grazielly para a Academia sem conhecer sua verdadeira identidade. Carrega no coração uma melodia esquecida — memória de um amor que ele mal compreende.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Ayla (falecida)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Descendente de Ilyos através de linhagem secreta, guardiã do conhecimento da Energia Natural. Amou Aurelius em segredo e engravidou de Grazielly. Morreu no parto após nomear sua filha, sabendo que seu corpo não aguentaria o peso da alma que trazia ao mundo. Seu último ato foi transmitir algo que Grazielly carregaria para sempre — uma memória que não era memória, um amor que não precisava de palavras.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Avó Aylia")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Mãe de Ayla, última Mestra de Energia Natural antes do exílio. Criará Grazielly nos primeiros anos. Planeja encontrar Kira, a Vanguarda, para treinar sua neta no momento certo. Personagem que aparecerá em capítulos futuros.", size: 24 })] }),

      // --- PERSONAGENS DO ORFANATO ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Personagens do Orfanato das Asas")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Mestra Liora")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Líder do Orfanato das Asas no Reino de Aetherion. Mulher de meia-idade com cabelos grisalhos e sorriso gentil que esconde memórias que preferiria esquecer. Trata todas as crianças com amor, mas tem uma conexão especial com Grazielly — talvez porque veja algo na menina que a faz lembrar de algo ou alguém. Chorou quando Grazielly foi aceita na Academia. Pode ter um papel maior na história do que aparenta.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Tyrell")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Menino de seis anos que segue Grazielly como um patinho. Possui uma leve claudicação na perna esquerda quando está cansado. Adora as histórias que Grazielly conta, especialmente sobre os Vanguardas. Pode reaparecer na jornada de Grazielly no futuro.", size: 24 })] }),

      // --- PERSONAGENS DA ACADEMIA ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Personagens da Academia")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Mestre Corin")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Recrutador da Academia Elemental do Reino de Aetherion. Homem alto, vestido com o uniforme azul-prateado característico dos mestres Aeros. Possui um cristal pendurado ao pescoço que brilha suavemente. Foi ele quem percebeu o potencial de Grazielly apesar de ela não apresentar afinidade em cristais comuns. Impressionou-se com sua inteligência e capacidade de observação.", size: 24 })] }),

      // --- PERSONAGENS SECUNDÁRIOS ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Personagens Secundários")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("O Mercador")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Viajante que passava pelo Orfanato das Asas e contou a Grazielly sobre os Vanguardas. Seu nome real é desconhecido. Pode ser um dos muitos mercadores que transitam entre os reinos, carregando não apenas mercadorias mas também histórias e rumores. Personagem anônima que pode ou não reaparecer.", size: 24 })] }),

      // --- OS VANGUARDAS ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Os Vanguardas")] }),

      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Organização secreta de vigilantes que operam fora da lei oficial. Filosofia: onde a lei falha, a justiça deve prevalecer. Cada membro usa máscara representando um animal ou símbolo. O Grande Mestre Aurelius publicamente os condena mas secretamente os tolera. Membros conhecidos incluem:", size: 24 })] }),

      new Paragraph({ spacing: { after: 100 }, numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Sombra Noturna (máscara de Coruja) — Líder, manipulação de sombras", size: 24 })] }),
      new Paragraph({ spacing: { after: 100 }, numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Kira (máscara de Lobo) — Estilo Vapor, futura tutora de Grazielly", size: 24 })] }),
      new Paragraph({ spacing: { after: 100 }, numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Relâmpago Verde (máscara de Falcão) — Velocidade extrema", size: 24 })] }),
      new Paragraph({ spacing: { after: 100 }, numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Muralha (máscara de Tartaruga) — Defesa impenetrável", size: 24 })] }),
      new Paragraph({ spacing: { after: 150 }, numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Brisa (máscara de Borboleta) — Voo e reconhecimento", size: 24 })] }),

      // ═══════════════════════════════════════════════════════════════
      // PARTE V: TERMOS E CONCEITOS
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE V: TERMOS E CONCEITOS")] }),

      // --- SISTEMA ASTRONÔMICO ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Sistema Astronômico")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Aurion")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "O sol de Alyndra. Possui tonalidade dourado-alaranjada levemente diferente do sol terrestre. É considerado uma manifestação menor do princípio de Luz. Seu nome significa 'o que ilumina' na língua antiga.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Lyria (Lua Maior)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "A maior das três luas, branco-prateada, associada ao princípio de Luz e revelação. Seus ciclos afetam as marés e, segundo alguns acreditam, os ritmos do Aethra. Representa clareza e verdade.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Nyx (Lua Média)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "A segunda lua, com brilho azulado discreto, associada ao mistério e ao conhecimento oculto. Quando alta no céu, os Umbras dizem que seus poderes são intensificados. Representa segredos e profundezas.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Elara (Lua Menor)")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "A menor das luas, tom rosado, associada ao sacrifício e à esperança. Aparece apenas em certas noites. Diz-se que foi batizada em homenagem a Elarys após seu sacrifício, milênios atrás. Representa amor e renovação.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Véus de Aether")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Nebulosas coloridas que atravessam o céu noturno de Alyndra como fitas de seda cósmica. Visíveis a olho nu, são especialmente brilhantes no Reino de Aetherion. Crianças dizem que são espíritos de ancestrais dançando.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Olho de Yggorath")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "O quasar central da galáxia, visível como um ponto pulsante no céu noturno. Poucos sabem seu verdadeiro significado — é o resquício da presença de Yggorath, a Árvore Primordial, cujas raízes atravessam todos os planos de existência. Pulsos intensos do Olho são considerados presságios por estudiosos.", size: 24 })] }),

      // --- TERMOS ESPIRITUAIS ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Termos Espirituais")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Aethra")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Energia espiritual que flui através de todos os seres vivos. É o combustível para habilidades elementais e técnicas avançadas. Derivado da essência de Yggorath, foi moldado pelos Seraphyens nas eras primordiais. Todos possuem Aethra em algum grau, mas apenas alguns conseguem canalizá-lo para manifestações elementais.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Energia Natural")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Forma alternativa de energia descoberta por Ilyos. Diferente do Aethra, que impõe a vontade sobre a realidade, a Energia Natural opera através de comunhão espiritual — 'pedir, não tomar'. Conhecida apenas por descendentes da linhagem de Ilyos.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Afinidade Elemental")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Conexão natural de um indivíduo com um dos sete elementos. Manifesta-se geralmente na infância e é detectada através de cristais de prova. Afinidades duplas são raras; triplas ou mais são lendárias. Grazielly possui afinidade dormente que cristais comuns não detectam.", size: 24 })] }),

      // --- GEOGRAFIA ---
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Geografia e Locais")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Nova Aetherion")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "O mundo habitado de Alyndra, dividido em sete reinos elementais. Fundado após a queda de Aetherion primordial, preserva a memória da civilização que existiu antes do tempo.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Santuário de Aquaryn")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Hospital especializado em partos de alto risco, localizado no Reino de Hydoria. Onde Grazielly nasceu e Ayla morreu.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Orfanato das Asas")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Orfanato nas colinas do Reino de Aetherion, onde Grazielly foi criada. Próximo a estrada comercial, recebe viajantes de todos os reinos. Nome vem da tradição local — diz-se que almas de crianças perdidas encontram ali asas para voar novamente.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Academia Elemental de Aetherion")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Instituição de ensino elemental no Reino de Aetherion. Torres de pedra clara com cristais que capturam a luz de Aurion. Aceita estudantes geralmente a partir dos dez anos, mas faz exceções para casos especiais.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Limiar Dimensional")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Prisão entre dimensões criada por Ilyos para selar Nyxalor. Local onde o tempo não flui normalmente. Ilyos mantém vigília eterna, sua essência parcialmente confinada para manter o selamento ativo.", size: 24 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Santuário entre Estrelas")] }),
      new Paragraph({ spacing: { after: 150, line: 312 }, children: [new TextRun({ text: "Local sagrado onde apenas Seraphyens podem ir, além do alcance de Aurion e das luas. Onde Ilyos depositou o corpo de Elarys, sua armadura preservada como relíquia.", size: 24 })] }),

      // SEPARADOR FINAL
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "Documento de Referência para Continuidade Narrativa", italics: true, size: 22 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "Daniel — Criador de Alyndra", size: 22 })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Glossario_Oficial_v6.docx", buffer);
  console.log("Glossário criado!");
});
