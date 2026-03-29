const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, VerticalAlign, LevelFormat, PageBreak, 
        TableOfContents, Header, Footer, PageNumber } = require('docx');
const fs = require('fs');

// === CORES: Terra Cotta Afterglow ===
const colors = {
  primary: "26211F",
  body: "3D3735",
  secondary: "6B6361",
  accent: "C19A6B",
  tableBg: "FDFCFB"
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
          children: [new TextRun("O universo de Alyndra nasce de uma Árvore Primordial cósmica cujos ramos geram diferentes realidades. Nossa realidade específica originou-se do Ramo de Aertherion, que produziu os Frutos da Existência — artefatos de poder extraordinário capazes de criar e sustentar vida. A história que contamos começa com uma civilização próspera fundada por Alyndra, uma ser que descobriu o poder do Fruto e o utilizou com sabedoria para construir um império de paz e prosperidade.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("No entanto, este mundo idílico foi ameaçado pelos Nihilaryth — seres imateriais originalmente designados para purificar a Aethra e devolvê-la à sua origem. Corrompidos pela ambição, estes seres tornaram-se abominações que devoravam a existência para seu fortalecimento. Após uma invasão catastrófica, sacrifícios impossíveis foram feitos, e uma nova árvore — Yggorath — nasceu no centro de uma galáxia distante, iniciando um novo ciclo de vida que eventualmente levaria à era de Grazielly.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 2. ESTRUTURA CÓSMICA ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Estrutura Cósmica")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 A Árvore Primordial e seus Ramos")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("No início de tudo existe uma Árvore Primordial cósmica de magnitude inimaginável. Esta entidade transcende a compreensão mortal — seus ramos se estendem por dimensões infinitas, e cada ramo é capaz de gerar uma realidade completa com suas próprias leis e habitantes. A Árvore não é meramente uma planta gigantesca, mas sim um organismo consciente que encarna a própria estrutura da existência multiversal.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os ramos da Árvore Primordial produzem Frutos da Existência — concentrações de poder cósmico destinados à procriação da vida. Cada Fruto possui propriedades únicas dependendo do ramo de onde provém. Nossa realidade originou-se do Ramo de Aertherion, um dos muitos ramos da Árvore Primordial, e o Fruto deste ramo específico tornou-se central para toda a história que conhecemos.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Os Frutos de Aertherion")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O Ramo de Aertherion produziu uma hierarquia de frutos com diferentes níveis de poder e complexidade. A compreensão desta hierarquia é fundamental para entender os eventos que moldaram o universo:")]
        }),

        // Diagrama dos Frutos
        new Paragraph({ 
          alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "RAMO DE AETHERION\n│\n├── FRUTO DE ALYNDRA (Principal)\n│       ├── Poder supremo de criação e transformação\n│       ├── Consumido por Alyndra para purificação\n│       └── Tornou-a extremamente poderosa\n│\n└── FRUTO DA EXISTÊNCIA (Extensão inferior)\n        ├── Deriva do Fruto de Alyndra\n        ├── Poder de criar e sustentar vida\n        └── SEMENTE → Brotou como YGGORATH", font: "Courier New", size: 18 })]
        }),

        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "O Fruto de Alyndra: ", bold: true }), new TextRun("O Fruto principal do Ramo de Aertherion, de poder supremo. Alyndra o consumiu por inteiro para realizar a purificação em massa dos possuídos durante a invasão Nihilaryth. Este ato a tornou extremamente poderosa, mas consumiu quase toda sua força vital. Usar este Fruto requer poder extraordinário — nem Yggoraty nem Alyndra possuíam inicialmente tal magnitude.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "O Fruto da Existência: ", bold: true }), new TextRun("Uma extensão inferior do Fruto de Alyndra, ainda assim um artefato de poder impressionante. Este Fruto é mais acessível e sua semente pode ser transportada e cultivada. Foi a semente deste Fruto que Yggoraty levou consigo em sua fuga desesperada, e desta semente nasceu a nova árvore Yggorath.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 A Nova Árvore: Yggorath")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "IMPORTANTE — Distinção entre Yggoraty e Yggorath: ", bold: true }), new TextRun("Yggoraty era uma guerreira lendária. Yggorath é a árvore que nasceu da semente que Yggoraty protegeu. São entidades diferentes, mas conectadas pela essência fragmentada da guerreira que se fundiu à semente durante seu sacrifício.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Após eons de crescimento no plano imaterial no centro de uma galáxia gigante, a semente plantada por Yggoraty germinou e se tornou uma nova árvore. Esta árvore desenvolveu consciência própria e, por carregar fragmentos da essência da guerreira Yggoraty, escolheu se nomear Yggorath — uma homenagem àquela que lhe deu existência. A nova Yggorath não é tão grande quanto a Árvore Primordial original, mas possui poder considerável e tornou-se o centro de um novo ciclo de vida.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 3. OS NIHILARYTH ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Os Nihilaryth")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Origem e Função Original")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Nos primórdios do universo, seres imateriais foram formados naturalmente pela interação entre a Árvore Primordial e as forças cósmicas. A função original destes seres era purificar — eles deviam extrair Aethra (a essência vital) da entropia e devolvê-la à sua origem, mantendo o equilíbrio do ciclo da existência. Eram, essencialmente, os jardineiros cósmicos responsáveis pela manutenção da saúde do universo.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Estes seres não possuíam corpos físicos, existindo puramente no plano imaterial. Eram dez ao total, cada um com especializações sutis em diferentes aspectos da purificação. Por milênios, cumpriram sua função com dedicação, e o universo prosperou sob seus cuidados invisíveis.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 A Corrupção")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A queda começou quando os purificadores começaram a questionar seu papel. Eles observavam a criação florescer enquanto sua função era apenas reciclar. A inveja e a ambição brotaram em seus corações imateriais. Em vez de devolver a Aethra à origem, começaram a retê-la, acumulando poder para si mesmos. Esta retenção quebrou o ciclo natural da existência, criando distorções na realidade.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Com o tempo, tornaram-se abominações da existência — entidades que devoravam seres vivos para seu fortalecimento. Sua natureza purificadora foi completamente invertida: em vez de restaurar, consumiam; em vez de equilibrar, corrompiam. Os dez purificadores originais transformaram-se nos dez Nihilaryth, pesadelos encarnados que ameaçavam toda a existência.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 O Rito Fracassado")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os Nihilaryth desenvolveram um plano audacioso: apoderar-se de corpos materiais para alcançar o Fruto da Existência. Seu objetivo era trazer à tona corpos imortais no plano material, permitindo-lhes dominar toda a existência. No entanto, o rito que realizaram foi catastrófico. O autor do rito foi aniquilado pelo poder descontrolado do Fruto, e os demais participantes sofreram distorções terríveis.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Este evento reduziu os Nihilaryth de dez para nove. Os sobreviventes foram excluídos daquela existência, perdidos em fragmentos temporais, realidades distorcidas, e banidos do plano existencial normal. Por eras, foram dados como extintos — mas a verdade é que apenas aguardavam uma nova oportunidade.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.4 A Nova Invasão")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Quando a civilização de Alyndra floresceu, os Nihilaryth viram uma nova oportunidade. O Fruto do ramo de Aertherion estava acessível novamente. Iniciaram uma invasão de possessão em massa, corrompendo a população e causando destruição generalizada. Esta invasão culminaria nos eventos que levaram à queda de Alyndra, ao sacrifício de Yggoraty, e ao nascimento de uma nova esperança.")]
        }),

        // Tabela dos Nihilaryth
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.5 Características dos Nihilaryth")] }),
        new Table({
          columnWidths: [3120, 6240],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: "4A2020", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Característica", bold: true, color: "FFFFFF", size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: "4A2020", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 6240, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true, color: "FFFFFF", size: 22 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Número Original", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "10 purificadores imateriais", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Número Atual", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "9 (um foi extirpado no rito fracassado)", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Natureza", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Imateriais, mas podem possuir corpos físicos", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Habilidade Especial", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Possessão; colecionam corpos com potenciais", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Objetivo", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Desfazer a maldição alcançando um novo Fruto", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Status Atual", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Banidos, fragmentados temporalmente; um possui o corpo de Alyndra", size: 22 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 1: Características dos Nihilaryth", size: 18, italics: true, color: colors.secondary })] }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 4. A CIVILIZAÇÃO DE ALYNDRAS ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. A Civilização de Alyndra")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 Alyndra — A Fundadora")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Alyndra foi uma figura lendária cujo nome echoaria através das eras. Ela descobriu o Fruto que levaria seu nome e, compreendendo seu poder extraordinário, utilizou-o com extremo cuidado e sabedoria. O Fruto de Alyndra a tornou imensamente poderosa, mas ela nunca permitiu que este poder a corrompesse. Pelo contrário, usou-o para construir uma civilização próspera, onde a vida florescia em harmonia.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Alyndra tinha ciência do potencial destrutivo do Fruto se usado incorretamente. Para manuseá-lo com segurança, ela criou a Armadura de Alyndra — posteriormente conhecida como Armadura Suprema. Esta armadura permitia canalizar e controlar o poder do Fruto, servindo como um regulador entre a vontade do usuário e a força cósmica do artefato. A armadura tornou-se símbolo de sua autoridade e responsabilidade.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 A Armadura de Alyndra (Armadura Suprema)")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Armadura de Alyndra é um dos artefatos mais poderosos do universo. Criada pela própria Alyndra para manusear o Fruto da Existência com segurança, a armadura possui componentes que funcionam em conjunto para canalizar poder cósmico:")]
        }),

        new Table({
          columnWidths: [2340, 3120, 3900],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Componente", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Status Atual", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3900, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Função", bold: true, color: colors.primary, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Armadura Principal", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Selada no centro galático", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Canaliza poder do Fruto", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Manopla", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Conectada à armadura", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Funciona com Cristal de Mytha", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Cristal de Mytha", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Artefato independente", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sela e liberta prisioneiros", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Elmo", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Com líder possuído (era de Grazielly)", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Usado para escravizar civilização", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 2: Componentes da Armadura de Alyndra", size: 18, italics: true, color: colors.secondary })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 A Invasão e a Queda")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os Nihilaryth, após eras de exílio, detectaram a civilização próspera de Alyndra e o Fruto do ramo de Aertherion. Iniciaram uma invasão de possessão em massa, corrompendo milhões de habitantes. A civilização, que havia conhecido apenas paz e prosperidade, mergulhou no caos. Alyndra, compreendendo que não havia outra opção, tomou a decisão mais difícil de sua existência.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Ela consumiu o Fruto de Alyndra por inteiro — um ato de poder supremo — e desejou a purificação de todos os possuídos. O desejo foi realizado: os corpos foram purificados da influência Nihilaryth. Mas o custo foi devastador. Quase todos os poderes de Alyndra foram consumidos, e a civilização já estava tão destruída que milhões morreram mesmo após a purificação. Era tarde demais para salvar seu povo.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.4 O Último Sacrifício e o Segredo")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os Nihilaryth sobreviventes retornaram em outros corpos e travaram um último combate. Desta vez, Alyndra não tinha poderes para combatê-los. Foi capturada por um dos nove Nihilaryth restantes. A criatura a pressionou, tentando extrair tudo que ela sabia sobre o Fruto e seus segredos. Muitos acreditam que Alyndra sucumbiu ali, mas a verdade é mais complexa e sinistra.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "O SEGREDO: ", bold: true, color: "8B0000" }), new TextRun("Os Nihilaryth colecionam corpos com potenciais. O corpo de Alyndra está em suas mãos, preservado. A Alyndra original talvez ainda não tenha morrido — ela pode estar sem seu corpo, completamente possuída, ou corrompida juntamente com alguns Aetheris. Este segredo permanece oculto, aguardando o momento de ser revelado.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Antes de sua captura, Alyndra tomou uma última decisão crucial. Ela doou a Armadura de Alyndra a Yggoraty, sua guerreira mais confiável, e a fez jurar proteção à semente do Fruto da Existência. Este ato garantiria que, mesmo com sua queda, a esperança continuaria viva.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 5. YGGORATY — A GUERREIRA ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Yggoraty — A Guerreira Lendária")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 Quem era Yggoraty")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Yggoraty era uma guerreira da civilização de Alyndra, servindo como uma de suas protetoras mais habilidosas e leais. Sua relação com Alyndra era de profunda amizade e respeito — Alyndra era sua líder e mentora. Quando a invasão Nihilaryth começou, Yggoraty esteve na linha de frente das batalhas, testemunhando a destruição de tudo que amava.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Nos momentos finais antes de sua captura, Alyndra confiou a Yggoraty a última semente do Fruto da Existência e a Armadura de Alyndra. Este foi o ato de confiança final de uma líder para sua guerreira — a esperança de continuidade da vida foi colocada nas mãos de Yggoraty. Ela fez um juramento sagrado: proteger a semente com sua própria vida.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 A Grande Fuga")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Com a semente e a armadura em sua posse, Yggoraty fugiu das mãos dos Nihilaryth. Esta não foi uma fuga simples — ela atravessou sistemas estelares, travando batalhas épicas contra forças inimigas em cada passo. Os Nihilaryth a perseguiam incansavelmente, sabendo que a semente representava sua única chance de desfazer a maldição que os manteve fragmentados por eras.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Yggoraty demonstrou habilidade combativa extraordinária e determinação inabalável. Cada batalha era uma demonstração de seu amor por Alyndra e seu compromisso com o juramento feito. Mas ela sabia que não poderia fugir para sempre. Os Nihilaryth eram nove, e mesmo com a Armadura de Alyndra, ela não poderia derrotá-los todos sozinha.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.3 O Sacrifício na Singularidade")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Yggoraty encontrou sua solução em uma galáxia gigante e desconhecida, distante de qualquer civilização. O centro desta galáxia era uma Singularidade — um ponto onde a matéria é exterminada e mesmo no plano imaterial a passagem requer extremo poder. Ali, ela tomou sua decisão final: lançar-se na Singularidade, selando a semente e a Armadura Suprema com todo seu poder no plano imaterial.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os Nihilaryth testemunharam o ato e acreditaram ser o fim. Em sua percepção, Yggoraty se autoexterminou juntamente com a semente e a armadura — eliminando sua última chance de reverter a maldição. Mas o plano de Yggoraty deu certo. A semente germinou no plano imaterial, alimentando-se do centro galático, e uma nova árvore começou a crescer. Seu corpo foi destruído, mas fragmentos de sua essência se fundiram à semente.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.4 O Renascimento")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Após eons de crescimento silencioso no plano imaterial, a semente finalmente brotou. Uma nova árvore surgiu — não tão grande quanto as anteriores, mas muito poderosa. Depois de eons adicionais, a árvore finalmente atingiu tamanho considerável, e sua essência desenvolveu consciência. Esta nova entidade escolheu se chamar Yggorath, talvez porque possui fragmentos da essência da guerreira Yggoraty que a protegeu.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Ali, no centro de uma galáxia distante, iniciou-se um novo ciclo de vida. A árvore Yggorath, nascida do sacrifício de uma guerreira lendária, se tornaria o centro de uma nova cosmologia — gerando Ilyos, Nyxalor, e os dez Seraphyens que dariam forma ao universo como o conhecemos.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 6. A NOVA HIERARQUIA CÓSMICA ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. A Nova Hierarquia Cósmica")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 Yggorath — O Centro")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A nova Yggorath tornou-se o centro da realidade conhecida. Embora menor que a Árvore Primordial original, sua concentração de poder é extraordinária. Suas raízes penetram o plano imaterial, enquanto seus ramos se estendem por sistemas estelares. Yggorath possui consciência própria — uma fusão da consciência da árvore com fragmentos da essência de Yggoraty.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Diferente da Árvore Primordial que produzia frutos para múltiplas realidades, Yggorath está focada em nossa realidade específica. Ela é a guardiã deste ciclo de existência, a protetora da vida que nascceu de seu sacrifício. Yggorath continua a gerar Frutos da Existência periodicamente, embora sejam menores e mais específicos que o Fruto de Alyndra original.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.2 Os Filhos Legítimos")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Da nova Yggorath nasceram dois Filhos Legítimos — entidades de natureza superior criadas diretamente pela árvore para governar as forças primordiais do universo:")]
        }),

        new Table({
          columnWidths: [2340, 2340, 4680],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Filho Legítimo", bold: true, color: colors.primary, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Força", bold: true, color: colors.primary, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 4680, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Natureza", bold: true, color: colors.primary, size: 22 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ILYOS", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LUZ", bold: true, color: "D4A574", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Construtiva e Entrópica — Criação", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NYXALOR", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "SOMBRAS", bold: true, color: "4A4A4A", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Destrutiva e Equilibradora — Recicla entropia", size: 22 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 3: Os Filhos Legítimos de Yggorath", size: 18, italics: true, color: colors.secondary })] }),

        new Paragraph({ 
          spacing: { before: 200, after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "Nota Importante: ", bold: true }), new TextRun("Ilyos e Nyxalor são irmãos. Nyxalor NÃO é Seraphyen — ele é um Filho Legítimo, de natureza superior aos Seraphyens. Os cinco elementos derivam da interação entre Luz e Sombras, e cada elemento possui dois Seraphyens: um seguindo Ilyos (faceta Luz) e um seguindo Nyxalor (faceta Sombra).")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.3 Os 10 Seraphyens")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Yggorath criou dez Seraphyens para governar os cinco elementos derivados da interação entre Luz e Sombras. Cada elemento possui dois Seraphyens — um de tendência Luz (seguindo Ilyos) e um de tendência Sombra (seguindo Nyxalor). Esta estrutura dual garante o equilíbrio elemental do universo:")]
        }),

        new Table({
          columnWidths: [1560, 2340, 2340, 3120],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Elemento", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seraphyen Luz", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seraphyen Sombra", bold: true, color: colors.primary, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Características", bold: true, color: colors.primary, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FOGO", bold: true, color: "CC4422", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ignisara", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Elarys ★", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Paixão, Transformação", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ÁGUA", bold: true, color: "2255AA", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Aquaryn", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Mareth", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fluidez, Cura, Intuição", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TERRA", bold: true, color: "6B4423", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Terrador", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Lithos", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Estabilidade, Proteção", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "RELÂMPAGO", bold: true, color: "CCBB00", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fulgur", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Voltaris", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Velocidade, Poder", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VENTO", bold: true, color: "88AACC", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ventus", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tempest", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Liberdade, Mudança", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 4: Os Dez Seraphyens (★ = linhagem até Elainy)", size: 18, italics: true, color: colors.secondary })] }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 7. O PADRÃO DO SACRIFÍCIO ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. O Padrão do Sacrifício")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O universo de Alyndra é construído sobre um padrão cósmico que se repete através das eras: o sacrifício de amor como força transformadora máxima. Este padrão não é coincidência — é uma lei fundamental da existência, tecida na estrutura da realidade desde os primeiros sacrifícios. Cada era possui seu par, cada par faz seu sacrifício, e cada sacrifício reforça o ciclo que sustenta toda a criação.")]
        }),

        // Tabela do Padrão
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
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Civilização Antiga", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Alyndra + Civilização", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Purificação dos possuídos", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1880, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Corpo capturado", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Renascimento", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Yggoraty + Semente", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Lançou-se na Singularidade", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 1880, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Yggorath nasceu", size: 20 })] })] })
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
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 5: O Padrão do Sacrifício através das Eras", size: 18, italics: true, color: colors.secondary })] }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 8. PERSONAGENS DA ERA DE GRAZIELLY ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. Personagens da Era de Grazielly")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.1 Grazielly")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Protagonista da quarta era, Grazielly herdou a linhagem de Elarys através de sua mãe Elainy. Desde jovem demonstrou afinidade extraordinária com o elemento fogo, manifestando habilidades que excediam em muito o esperado para uma mortal comum. Sua jornada a levou à Cripta Primordial, onde ela e sua mãe fizeram o sacrifício que selou os Nihilaryth e preservou o equilíbrio do universo. O nome \"Grazielly\" deriva de \"graça\", refletindo seu papel como salvadora.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.2 Elainy")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Mãe de Grazielly e última herdeira direta da linhagem de Elarys. Elainy possuía forte afinidade com o elemento fogo e treinou sua filha para controlar seus poderes desde cedo. Seu amor maternal culminou no sacrifício duplo na Cripta Primordial. O nome \"Elainy\" ecoa \"Elarys\", refletindo a conexão sanguínea entre ambas através dos milênios.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.3 Aurelius")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "IMPORTANTE: ", bold: true }), new TextRun("Aurelius era pai de Grazielly ANTES de ser GM (Guardião Mestre). Esta distinção cronológica é crucial — Aurelius teve sua vida como mortal, incluindo a paternidade de Grazielly, antes de ascender ao posto de GM. Ele fazia parte da Equipe Aurora junto com Ayla, desempenhando papel importante na proteção do reino.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.4 Théssaly")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "IMPORTANTE: ", bold: true }), new TextRun("Théssaly foi um GM que foi deposto de sua posição após ser corrompido pelos Nihilaryth. Esta corrupção e deposição são parte do contexto que levou à crise enfrentada por Grazielly e Elainy na Cripta Primordial.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.5 O Líder Possuído")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Na época de Grazielly, um líder de um planeta está possuído por um Nihilaryth. Este líder guarda o elmo da Armadura Suprema — um componente que se separou do restante da armadura selada. Usando o poder do elmo, ele escraviza a civilização atual de seu planeta. Este plot será explorado quando Grazielly revelar como ele obteve o elmo e como ela lidou com essa ameaça.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 9. A CRIPTA PRIMORDIAL ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("9. A Cripta Primordial")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Cripta Primordial é o local mais sagrado e perigoso do universo. Localizada nas raízes mais profundas de Yggorath, a Cripta é onde os Nihilaryth foram selados após o sacrifício de Elainy e Grazielly. A Cripta não é apenas um local físico — é uma estrutura dimensional que existe entre a realidade e o vazio, projetada para conter entidades que ameaçam a existência.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O acesso à Cripta é extremamente restrito, requerendo condições específicas que poucos conseguem satisfazer. Foi lá que Elainy e Grazielly fizeram seu sacrifício final, oferecendo suas existências para selar os Nihilaryth remanescentes e preservar o equilíbrio que Alyndra e Yggoraty haviam estabelecido com seus próprios sacrifícios.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 10. PONTOS PARA DESENVOLVIMENTO ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("10. Pontos para Desenvolvimento Futuro")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Este documento consolida todo o conhecimento estabelecido sobre o universo de Alyndra. No entanto, existem áreas que ainda necessitam de desenvolvimento:")]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "O paradeiro do corpo de Alyndra: ", bold: true }), new TextRun("Qual Nihilaryth o possui? Ela está consciente? Pode ser resgatada?")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Os Aetheris: ", bold: true }), new TextRun("Quem são? Como foram corrompidos junto com Alyndra? Qual seu papel atual?")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "O líder possuído: ", bold: true }), new TextRun("Qual planeta? Como obteve o elmo? Como Grazielly lidou com ele?")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Os nomes dos nove Nihilaryth: ", bold: true }), new TextRun("Mytha é um. Quem são os outros oito?")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "A Equipe Aurora: ", bold: true }), new TextRun("Membros, missões, e o papel de Ayla.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "As gerações entre Elarys e Elainy: ", bold: true }), new TextRun("Como a linhagem foi preservada e transmitida.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "A quinta era: ", bold: true }), new TextRun("Haverá continuação do padrão do sacrifício?")] }),
        
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
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Mapa_Mental_Principal_v2.docx", buffer);
  console.log("✅ Documento criado: Alyndra_Mapa_Mental_Principal_v2.docx");
});
