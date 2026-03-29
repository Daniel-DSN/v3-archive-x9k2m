const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, LevelFormat,
        TableOfContents, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

// Cores esquema "Forest Moss" para documento de cultura e sociedade
const colors = {
  primary: "1A1F16",      // Deep Forest Ink
  body: "2D3329",         // Dark Moss Gray
  secondary: "4A5548",    // Neutral Olive
  accent: "94A3B8",       // Steady Silver
  tableBg: "F8FAF7",      // Ultra-Pale Mint White
  lightAccent: "E8EDE6",  // Light moss
  gold: "D4AF37",         // Gold for important text
  red: "8B0000"           // Dark red for warnings
};

const tableBorder = { style: BorderStyle.SINGLE, size: 12, color: colors.primary };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Times New Roman", size: 24 }
      }
    },
    paragraphStyles: [
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        run: { size: 56, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 36, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 24, bold: true, color: colors.body, font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 }
      },
      {
        id: "BodyText",
        name: "Body Text",
        basedOn: "Normal",
        run: { size: 24, color: colors.body, font: "Times New Roman" },
        paragraph: { spacing: { line: 250, after: 150 }, alignment: AlignmentType.BOTH }
      },
      {
        id: "Quote",
        name: "Quote",
        basedOn: "Normal",
        run: { size: 22, italics: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { line: 250, before: 200, after: 200 }, indent: { left: 720, right: 720 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Law",
        name: "Law",
        basedOn: "Normal",
        run: { size: 22, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { line: 250, before: 100, after: 100 }, indent: { left: 360 } }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullet-list",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "•",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "numbered-law",
        levels: [{
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "Art. %1.º",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 720 } } }
        }]
      }
    ]
  },
  sections: [
    // CAPA
    {
      properties: {
        page: {
          margin: { top: 0, right: 0, bottom: 0, left: 0 }
        }
      },
      children: [
        new Paragraph({ spacing: { before: 4000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [new TextRun({ text: "UNIVERSO DE ALYNDRAS", size: 28, color: colors.accent, font: "Times New Roman", smallCaps: true })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 24, color: colors.accent })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "FUNDAMENTOS DA ERA DE GRAZIELLY", size: 56, bold: true, color: colors.primary, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [new TextRun({ text: "Constituição • Cultura • Habilidades • Estrutura Narrativa", size: 26, italics: true, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: "📜 Constituição do Reino Central", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: "🎭 Culturas dos Sete Reinos", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: "⚔️ Habilidades Básicas e Defensivas", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: "📖 Estrutura do Início do Livro", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: "🦸 A Guilda dos Vanguardas", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 3000 },
          children: [new TextRun({ text: "Documento de Referência para Continuidade Narrativa", size: 22, color: colors.secondary, font: "Times New Roman", italics: true })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "Daniel — Criador de Alyndras", size: 22, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // CONTEÚDO PRINCIPAL
    {
      properties: {
        page: {
          margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Fundamentos da Era de Grazielly", size: 20, color: colors.secondary, font: "Times New Roman", italics: true })]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "— ", size: 20, color: colors.secondary }),
              new TextRun({ children: [PageNumber.CURRENT], size: 20, color: colors.secondary }),
              new TextRun({ text: " —", size: 20, color: colors.secondary })
            ]
          })]
        })
      },
      children: [
        // SUMÁRIO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Sumário")] }),
        new TableOfContents("Sumário", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Nota: Clique com o botão direito no sumário e selecione 'Atualizar Campo' para corrigir os números de página.", size: 18, color: "999999", font: "Times New Roman" })]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // PARTE I: HABILIDADES BÁSICAS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE I: HABILIDADES BÁSICAS E DEFENSIVAS")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 Filosofia do Ensino Elemental")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Em Nova Aetherion, o ensino de habilidades elementais começa cedo, por volta dos 6 ou 7 anos de idade. No entanto, a filosofia que guia este ensino é radicalmente diferente da mera instrução de combate. As crianças são ensinadas desde o primeiro dia que o Aethra — a energia espiritual que flui através de todos os seres — é um dom sagrado, concedido pela Árvore Primordial através dos Seraphyens. Este dom não deve ser usado para ferir, dominar ou oprimir, mas para proteger, curar e construir.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Os mestres elementais repetem um mantra que ecoa através dos séculos: \"Com grande poder vem grande responsabilidade.\" Esta frase, atribuída ao primeiro Grande Mestre, encapsula a essência da educação elemental em Nova Aetherion. Crianças aprendem que cada faísca de fogo, cada gota de água controlada, cada pedra moldada carrega consequências — e aqueles que as controlam devem responder por essas consequências.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.2 As Seis Habilidades Fundamentais")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Antes de qualquer criança aprender técnicas ofensivas ou avançadas, ela deve dominar seis habilidades fundamentais. Estas habilidades são projetadas para defesa pessoal, ajuda ao próximo, e controle básico do próprio Aethra. Dominá-las é pré-requisito para qualquer treinamento posterior, e crianças que demonstram incapacidade de usar estas habilidades com responsabilidade são barradas de avanço até demonstrarem maturidade.")]
        }),

        // TABELA DAS SEIS HABILIDADES
        new Paragraph({
          spacing: { before: 200, after: 100 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Tabela 1: As Seis Habilidades Fundamentais", size: 20, italics: true, color: colors.secondary })]
        }),
        new Table({
          columnWidths: [2000, 3680, 3680],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.lightAccent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Habilidade", bold: true, size: 22, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.lightAccent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true, size: 22, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.lightAccent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Uso Ético", bold: true, size: 22, color: colors.primary })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1. Escudo Elemental", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Criação de uma barreira protetora usando o elemento de afinidade. Varia conforme o elemento: parede de ar, casca de pedra, bolha de água, anel de fogo, campo elétrico.", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Apenas para proteger a si mesmo ou outros de ataques. Usar para isolar, aprisionar ou intimidar é proibido. O escudo nunca deve ser usado como arma.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2. Sopro Vital", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Capacidade de transferir uma pequena quantidade de Aethra para outra pessoa, auxiliando na recuperação de energia, fadiga ou pequenos ferimentos.", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Apenas com consentimento do receptor. Crianças são ensinadas a nunca transferir mais que 10% de sua energia. Usar para curar ferimentos graves requer licença de curandeiro.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3. Passo da Brisa", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Movimento ágil e silencioso que permite esquivar-se de ataques e atravessar situações perigosas. Não é velocidade sobre-humana, mas uso eficiente de momentum.", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Apenas para evasão e fuga. Usar para perseguir, encurralar ou intimidar é proibido. Crianças aprendem que o verdadeiro guerreiro sabe quando recuar.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4. Sentir o Fluxo", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Capacidade de perceber o Aethra ao redor, detectando presenças, perigos iminentes, ou necessidades de ajuda. Desenvolve empatia espiritual.", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Apenas para localizar pessoas em perigo ou detectar ameaças. Espiar, invadir privacidade ou usar para vantagem pessoal é estritamente proibido.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5. Mãos Curativas", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Capacidade de acelerar a cura de ferimentos menores em si mesmo e outros. Varia conforme o elemento: água limpa feridas, terra fecha cortes, fogo cauteriza.", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Apenas em emergências ou com consentimento. Nunca usar para modificar corpos, causar dor (cauterização só com consentimento explícito), ou curar além da própria capacidade.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "6. Correntes de Equilíbrio", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Técnica de contenção que imobiliza temporariamente um oponente sem causar dano. Útil para impedir brigas ou conter alguém até ajuda chegar.", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Apenas para impedir violência ou proteger. A contenção não deve durar mais que o necessário. Soltar imediatamente quando a situação estiver controlada.", size: 22 })] })] })
            ]})
          ]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.3 O Juramento do Aprendiz")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ao completar o treinamento das seis habilidades fundamentais, geralmente por volta dos 10-12 anos, toda criança deve recitar o Juramento do Aprendiz. Este juramento é registrado oficialmente e assinado pelo mestre responsável, pelos pais ou responsáveis, e pela própria criança. Quebrá-lo deliberadamente pode resultar em suspensão do direito de usar habilidades elementais até nova avaliação de caráter.")]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { before: 300, after: 100 },
          children: [new TextRun({ text: "\"Eu, [nome], perante os Seraphyens e a Árvore Primordial,", bold: true })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "juro usar meu Aethra apenas para proteger e servir." })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "Não erguerei minha mão contra o indefeso," })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "não virarei as costas para quem precisa," })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "não usarei meu dom para orgulho ou ganância." })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "Quando eu falhar, buscarei reparação." })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "Quando eu tiver força, sustentarei os fracos." })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 300 },
          children: [new TextRun({ text: "Este é meu juramento, até meu último fôlego.\"", bold: true })]
        }),

        // PARTE II: CONSTITUIÇÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE II: A CONSTITUIÇÃO DO REINO CENTRAL")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Preâmbulo")] }),
        new Paragraph({
          style: "Quote",
          spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "\"Nós, o povo de Nova Aetherion, herdeiros da sabedoria dos Seraphyens e guardiões do legado de Yggorath, estabelecemos esta Constituição para garantir a justiça, proteger os direitos de todos os cidadãos, e honrar o equilíbrio que sustenta nossa existência. Reconhecemos que todo poder vem com responsabilidade, e que nenhuma força — seja elemental, política ou militar — está acima da dignidade do ser consciente.\"", italics: true })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Dos Direitos Fundamentais")] }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 1.º ", bold: true }), new TextRun("Todo ser consciente possui dignidade inerente e inviolável, independentemente de afinidade elemental, origem, gênero, ou condição social. Esta dignidade é o fundamento de toda a ordem social.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 2.º ", bold: true }), new TextRun("Nenhum cidadão será submetido a tortura, tratamento desumano ou degradante. O uso de Aethra para causar sofrimento desnecessário é crime inafiançável.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 3.º ", bold: true }), new TextRun("A liberdade de pensamento, crença e expressão é garantida a todos. Ninguém será perseguido por suas opiniões, desde que não incitem violência contra outros.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 4.º ", bold: true }), new TextRun("Toda criança tem direito à educação, alimentação, proteção e cuidado. A sociedade deve garantir que nenhuma criança sofra negligência ou abuso.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 5.º ", bold: true }), new TextRun("O uso de habilidades elementais é direito de quem as possui, mas seu uso para prejudicar inocentes é crime. A legítima defesa é reconhecida, mas deve ser proporcional à ameaça.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 Dos Deveres do Cidadão")] }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 6.º ", bold: true }), new TextRun("Todo cidadão tem o dever de respeitar os direitos de seus semelhantes e contribuir para o bem-estar da comunidade.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 7.º ", bold: true }), new TextRun("Quem presencia injustiça e tem poder de intervir sem colocar sua vida em risco imediato, e não o faz, compartilha responsabilidade pelo dano causado.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 8.º ", bold: true }), new TextRun("O abuso de poder — seja elemental, político ou econômico — é violação da confiança social e sujeito a penalidades severas.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 9.º ", bold: true }), new TextRun("Todo cidadão deve buscar conhecimento e autoaperfeiçoamento, reconhecendo que a ignorância é raiz de muito sofrimento.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.4 Do Governo e da Ordem")] }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 10.º ", bold: true }), new TextRun("O Grande Mestre é o guardião do equilíbrio e protetor do reino, mas não está acima da lei. Suas ações podem ser questionadas pelo Conselho dos Vinculadores.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 11.º ", bold: true }), new TextRun("Os Seis Reinos possuem autonomia em seus assuntos internos, mas devem observar os direitos fundamentais e cooperar em tempos de crise.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 12.º ", bold: true }), new TextRun("Nenhuma lei pode contradizer os princípios fundamentais estabelecidos nesta Constituição. Leis inconstitucionais são nulas.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 13.º ", bold: true }), new TextRun("A justiça deve ser acessível a todos, independentemente de recursos. Nenhum cidadão pode ser privado de defesa adequada.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.5 Dos Crimes contra o Equilíbrio")] }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 14.º ", bold: true }), new TextRun("A corrupção espiritual — incluindo associação com Nihilaryth ou uso de técnicas proibidas de drenagem de Aethra — é crime capital.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 15.º ", bold: true }), new TextRun("A manipulação forçada da vontade de outro ser, seja por Aethra ou outros meios, é crime equiparado à escravidão.")]
        }),
        new Paragraph({
          style: "Law",
          children: [new TextRun({ text: "Art. 16.º ", bold: true }), new TextRun("O exílio para Umbra é reservado para crimes graves, mas o exilado tem direito a apelação e revisão de sentença a cada cinco anos.")]
        }),

        // PARTE III: CULTURAS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE III: CULTURAS DOS SETE REINOS")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Cultura Geral de Nova Aetherion")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Apesar das diferenças regionais, os habitantes de Nova Aetherion compartilham uma base cultural comum herdada da Era dos Seraphyens e refinada através dos séculos. Esta cultura enfatiza três pilares: Honra (integridade pessoal e cumprimento de palavra), Comunidade (responsabilidade pelo bem-estar coletivo), e Crescimento (busca contínua de aperfeiçoamento).")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Feriados Comuns:", bold: true })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Dia da Semente (início da primavera): ", bold: true }), new TextRun("Celebra a vida nova e o renascimento. Famílias plantam árvores juntos e crianças recebem seus primeiros cristais de treino.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Festival das Luzes (solstício de verão): ", bold: true }), new TextRun("Homenagem a Ilyos e à luz que guia. Lanternas são soltas ao céu e contam-se histórias de heróis do passado.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Dia do Sacrifício (outono): ", bold: true }), new TextRun("Memória da queda de Aetherion e do sacrifício de Alyndra. Dia de reflexão e luto respeitoso.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Noite das Sombras (solstício de inverno): ", bold: true }), new TextRun("Reconhecimento de que sombras existem. As pessoas enfrentam seus medos e fazem promessas de superação.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Tradições Compartilhadas:", bold: true })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "O Cumprimento Elemental: ", bold: true }), new TextRun("Ao encontrar alguém, é costume fazer um pequeno gesto com o elemento de afinidade (uma fagulha, uma gota, uma folha) como sinal de respeito e abertura.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "A Promessa de Proteção: ", bold: true }), new TextRun("Quando uma criança faz 12 anos, adultos significativos em sua vida fazem promessas públicas de protegê-la e guiá-la.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "O Julgamento pelos Pares: ", bold: true }), new TextRun("Em disputas entre cidadãos de mesma classe, um júri de pares decide o desfecho, não um juiz.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 Cultura por Reino")] }),
        
        // TABELA DE CULTURAS
        new Paragraph({
          spacing: { before: 200, after: 100 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Tabela 2: Culturas dos Sete Reinos", size: 20, italics: true, color: colors.secondary })]
        }),
        new Table({
          columnWidths: [1600, 3000, 4760],
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.lightAccent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Reino", bold: true, size: 22, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.lightAccent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Valores Centrais", bold: true, size: 22, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.lightAccent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tradições Únicas", bold: true, size: 22, color: colors.primary })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🏛️ Central", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Equilíbrio, Diplomacia, Justiça", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "A Prova do Cristal — jovens são testados aos 10 anos no Cristal de Aether; família do GM recebe a criança mais promissora para tutela.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "💧 Água", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Fluidez, Adaptação, Compaixão", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "O Mergulho da Maioridade — aos 15 anos, o jovem mergulha nas profundezas e retorna com um tesouro do mar; é considerado adulto.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🌍 Terra", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Permanência, Tradição, Resiliência", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "O Vigília da Pedra — jovens passam uma noite sozinhos nas cavernas profundas; os que retornam são considerados dignos de herdar.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⚡ Relâmpago", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Velocidade, Precisão, Eficiência", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "A Corrida das Tempestades — competição anual onde jovens atravessam campos de relâmpago; os melhores são recrutados por guildas.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🌪️ Vento", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Liberdade, Alegria, Comunidade", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "O Festival das Asas — semana de celebração onde todos voam juntos; crianças aprendem a voar em grupo.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🔥 Fogo", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Paixão, Forja, Superação", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "A Prova do Caldeirão — jovem deve forjar sua primeira arma sozinho; a qualidade determina seu futuro na sociedade.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "☠️ Umbra", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Sobrevivência, Segredo, Lealdade", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "O Pacto das Sombras — recém-chegados fazem juramento de nunca trair outro habitante; quebrar é punível por morte.", size: 22 })] })] })
            ]})
          ]
        }),

        // PARTE IV: ESTRUTURA DO LIVRO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE IV: ESTRUTURA DO INÍCIO DO LIVRO")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 Visão Geral da Estrutura")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("O início do livro utiliza uma técnica narrativa de flashes temporais que estabelecem o contexto cósmico antes de focar na protagonista. Esta estrutura cria uma sensação de escala épica enquanto gradualmente aproxima o leitor da história pessoal de Grazielly. A transição do cósmico para o pessoal reflete a jornada da própria protagonista: de alguém que ouve lendas para alguém que se torna lenda.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 Sequência Narrativa")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Flash 1: O Confronto Primordial (Ilyos vs Nyxalor)")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Duração: ", bold: true }), new TextRun("3-4 páginas")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Cena: ", bold: true }), new TextRun("Um campo de batalha cósmico, realidade se fragmentando ao redor. Nyxalor, envolto em sombras pulsantes, enfrenta Ilyos, que brilha como um sol. Elarys se interpõe. O sacrifício. O selamento. A dor de Ilyos ao prender seu irmão.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Última linha do flash: ", bold: true }), new TextRun("\"E assim, a luz aprendeu que até as sombras mais profundas foram, um dia, amadas.\"")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Flash 2: A Guerra dos Três Grandes Mestres")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Duração: ", bold: true }), new TextRun("2-3 páginas")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Contexto: ", bold: true }), new TextRun("Sessenta anos antes do presente. Três facções disputam o trono do Grande Mestre após morte misteriosa do 11º GM. O conflito quase destruiu o Palácio Flutuante. Aurelius (futuro 12º GM e pai secreto de Grazielly) emerge como vitorioso, unificando os reinos.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Personagens introduzidos: ", bold: true }), new TextRun("Aurelius (jovem), os três claimants rivais, Ayla (mãe de Grazielly, brevemente vista).")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Última linha do flash: ", bold: true }), new TextRun("\"E Aurelius jurou que nunca mais o mundo veria sangue derramado por ambição ao trono. Juramento que ele ainda carrega, e que um dia testará.\"")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Flash 3: O Nascimento de Grazielly")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Duração: ", bold: true }), new TextRun("4-5 páginas")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Cena: ", bold: true }), new TextRun("O Santuário de Aquaryn (hospital do Reino da Água, especializado em partos de alto risco). Ayla, enfraquecida, dá à luz. Aurelius assiste do lado de fora, incapaz de entrar por questões de segredo. A criança nasce durante uma tempestade rara no Reino da Água — um presságio. O cristal na sala ressoa com a criança, mas não mostra cor. Os curandeiros se entreolham, preocupados.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Nome: ", bold: true }), new TextRun("Grazielly — nome escolhido por Ayla, significando \"graça\" na língua antiga. Aurelius aprova, sem revelar que era o nome de uma heroína das lendas que ele admirava.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Complicação: ", bold: true }), new TextRun("Ayla não sobrevive ao parto. Ou aparentemente não sobrevive. Na verdade, ela finge a própria morte para proteger a criança de inimigos políticos. Este é um segredo que será revelado muito mais tarde.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Última linha do flash: ", bold: true }), new TextRun("\"A criança chorou, e em seu choro, aqueles com sensibilidade suficiente juraram ouvir não dor, mas determinação — como se ela já soubesse que nasceu para lutar.\"")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Flash 4: Fragmentos da Infância")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Duração: ", bold: true }), new TextRun("6-8 páginas (montagem de cenas curtas)")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Cenas:", bold: true })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "3 anos: ", bold: true }), new TextRun("Grazielly mora com sua avó adotiva, Aylia, uma mulher excêntrica exilada do Reino Central. Aylia conta histórias de heróis antigos. Grazielly já demonstra fascinação.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "5 anos: ", bold: true }), new TextRun("Primeiro contato com Aethra. Grazielly tenta acender uma vela e falha repetidamente. Outras crianças riem. Ela não desiste. Aylia observa com interesse.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "7 anos: ", bold: true }), new TextRun("Grazielly vê os Vanguardas (heróis mascarados) em ação pela primeira vez. Eles salvam sua vila de bandidos. Ela decide: \"Eu quero ser como eles.\"")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "9 anos: ", bold: true }), new TextRun("Aylia é levada de volta ao Reino Central por \"motivos de saúde\". Grazielly é enviada para um orfanato. Aurelius (GM) secretly arranges for her to be placed in a good facility, but cannot acknowledge her publicly.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "10 anos: ", bold: true }), new TextRun("A Prova do Cristal no Palácio Flutuante. Grazielly toca o cristal e... nada acontece. Sem cor. Sem afinidade aparente. Ela é classificada como \"Sem Afinidade\" e relegada a serviços menores.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "11 anos: ", bold: true }), new TextRun("Grazielly descobre que pode manipular ÁGUA, mas de forma diferente — mais gelo que líquido. Sua afinidade estava dormente, mas agora desperta. Ela guarda o segredo.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "12 anos: ", bold: true }), new TextRun("Uma misteriosa tutora aparece em sua vida. Kira, uma mulher com cicatriz no rosto e olhos cansados, oferece-se para treiná-la em segredo. Kira é membro dos Vanguardas.")]
        }),

        // PARTE V: OS VANGUARDAS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE V: A GUILDA DOS VANGUARDAS")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 O Que São os Vanguardas")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Os Vanguardas são uma organização secreta de vigilantes que operam fora da lei oficial de Nova Aetherion. Eles existem há pelo menos duzentos anos, surgindo durante um período de corrupção generalizada no governo central. Sua filosofia é simples: onde a lei falha, a justiça deve prevalecer. Eles não se consideram acima da lei — consideram-se a consciência da lei quando a lei perde sua própria.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("O nome \"Vanguardas\" vem do conceito de que eles são a primeira linha de defesa do povo — aqueles que vão primeiro onde outros temem ir. Cada membro usa uma máscara que representa um animal ou símbolo significativo, nunca revelando sua identidade civil. Esta separação é sagrada: quebrar o sigilo é expulsão imediata e, em casos extremos, eliminação.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 Relação com as Autoridades")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("A relação entre os Vanguardas e o governo é complexa e tensa. Oficialmente, os Vanguardas são considerados criminosos — vigilantes que tomam a lei em suas próprias mãos. O Grande Mestre Aurelius publicamente os condena, ordenando sua captura. No entanto, muitos no governo secretamente os toleram ou até apoiam, reconhecendo que eles preenchem lacunas que a justiça oficial não consegue alcançar.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("O Grande Mestre Aurelius está em uma posição particularmente difícil. Ele sabe que os Vanguardas fazem bem genuíno, mas não pode endossá-los sem minar a autoridade do governo. Ele também suspeita que alguns de seus próprios conselheiros têm ligações com a organização. Esta tensão cria uma dinâmica interessante: ele os persegue publicamente enquanto secretamente os deixa operar, desde que não cruzem certas linhas.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.3 Os Membros Conhecidos")] }),
        new Paragraph({
          spacing: { before: 200, after: 100 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Tabela 3: Membros Conhecidos dos Vanguardas", size: 20, italics: true, color: colors.secondary })]
        }),
        new Table({
          columnWidths: [2200, 2200, 5000],
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.lightAccent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Codinome", bold: true, size: 22, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.lightAccent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Máscara", bold: true, size: 22, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.lightAccent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Habilidades Conhecidas", bold: true, size: 22, color: colors.primary })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sombra Noturna", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Coruja", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Líder do grupo. Manipulação de sombras, furtividade extrema, visão no escuro. Elemento: Sombra.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Kira (Tutora de Grazy)", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Lobo", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Estilo VAPOR (Água + Fogo). Combate corpo a corpo, táticas de guerrilha. Cicatriz no rosto de batalha passada.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Relâmpago Verde", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Falcão", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Velocidade extrema, eletricidade verde. O mais rápido do grupo. Elemento: Relâmpago.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Muralha", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tartaruga", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Defesa impenetrável, força bruta. Protege os mais fracos. Elemento: Terra.", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Brisa", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Borboleta", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Voo, reconhecimento, mensagens. A mais jovem do grupo. Elemento: Vento.", size: 22 })] })] })
            ]})
          ]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.4 O Código dos Vanguardas")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Todo membro dos Vanguardas deve seguir um código estrito, que é recitado na iniciação:")]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "\"Eu sou a sombra que protege a luz.", italics: true })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "Não busco glória, não busco louros.", italics: true })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "Minha recompensa é o inocente seguro.", italics: true })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "Nunca mato quem pode ser redimido.", italics: true })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "Nunca firo quem não pode se defender.", italics: true })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 100 },
          children: [new TextRun({ text: "Minha identidade pertence à causa.", italics: true })]
        }),
        new Paragraph({
          style: "Quote",
          spacing: { after: 200 },
          children: [new TextRun({ text: "Minha vida pertence aos outros.", italics: true })]
        }),

        // PARTE VI: A MÃE DE GRAZIELLY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE VI: AYLA E O SEGREDO FAMILIAR")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 Quem Era Ayla")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ayla, mãe de Grazielly, era uma mulher de mistérios entrelaçados. Nascida no Reino Central, ela era descendente direta de Ilyos através de uma linhagem mantida em segredo por gerações. Esta herança conferia-lhe afinidade incomum com a Luz e acesso a técnicas de Energia Natural que poucos conheciam. No entanto, ela escolheu viver discretamente, longe dos olhares do poder.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ayla conheceu Aurelius durante a Guerra dos Três Grandes Mestres. Na época, ele era um jovem general lutando para unificar os reinos fragmentados. Ela o salvou durante uma batalha, e dos olhares trocados nasceu um amor que teria que permanecer secreto. A posição de Aurelius como futuro Grande Mestre exigia casamento político — algo que ele recusou, escolhendo permanecer solteiro \"pelo bem do reino\", enquanto secretamente amava Ayla.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.2 O Falso Óbito")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("A \"morte\" de Ayla no Santuário de Aquaryn foi uma encenação elaborada. Inimigos políticos de Aurelius, sabendo da existência de uma filha, planejavam usá-la como alavanca para controlar o Grande Mestre. Para proteger Grazielly, Ayla e Aurelius orquestraram sua morte aparente. Ela foi declarada falecida devido a complicações do parto, e Grazielly foi enviada para ser criada longe do palácio.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ayla vive atualmente em um local secreto, provavelmente nas profundezas do Reino da Terra ou entre os Videntes do Reino do Relâmpago. Ela monitora o crescimento da filha de longe, através de uma rede de informantes e seu próprio treinamento em clarividência. Seu plano é se revelar quando Grazielly estiver pronta — forte o suficiente para enfrentar a verdade e os inimigos que ainda a buscam.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.3 A Avó Aylia")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Aylia, a avó que criou Grazielly nos primeiros anos, é uma figura fascinante por si só. Ela foi uma das últimas Mestras de Energia Natural antes de ser exilada por suas crenças consideradas heréticas — especificamente, a convicção de que a Energia Natural deveria ser ensinada a todos, não apenas às linhagens privilegiadas. Este exílio foi conveniente para Aurelius: permitiu que Grazielly fosse criada por alguém confiável, longe dos olhos do palácio.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Aylia ensinou a Grazielly muito mais do que histórias. Ela plantou as sementes da compaixão, da justiça, e da determinação que definiriam a protagonista. Foi Aylia quem primeiro percebeu que o potencial de Grazielly estava dormente, não ausente. E foi Aylia quem arranjou para que Kira, uma Vanguarda, encontrasse a menina quando chegasse a hora certa.")]
        }),

        // PARTE VII: TERMINOLOGIA
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PARTE VII: TERMINOLOGIA E INSTITUIÇÕES")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.1 Instituições de Cura")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Os \"hospitais\" de Nova Aetherion são chamados de Santuários, e cada um é dedicado a um Seraphyen específico:")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Santuário de Aquaryn: ", bold: true }), new TextRun("Especializado em curas gerais e partos. O maior e mais renomado. Local onde Grazielly nasceu.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Santuário de Ignisara: ", bold: true }), new TextRun("Especializado em queimaduras, cirurgias, e tratamentos intensivos. O fogo aqui é usado para cauterizar e purificar.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Santuário de Terrador: ", bold: true }), new TextRun("Especializado em ossos quebrados, doenças crônicas, e reabilitação. A terra aqui fortalece e reconstrói.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Santuário de Fulgur: ", bold: true }), new TextRun("Especializado em distúrbios nervosos, mentais, e traumas psicológicos. O relâmpago aqui ilumina a mente.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.2 Sistema Educacional")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("A educação em Nova Aetherion segue um sistema estruturado:")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Escola Primária (6-10 anos): ", bold: true }), new TextRun("Ensino de leitura, escrita, história, matemática, e as Seis Habilidades Fundamentais.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Academia Elemental (10-16 anos): ", bold: true }), new TextRun("Treinamento intensivo em afinidade elemental. Quem demonstra talento é encaminhado para especialização.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Instituto Superior (16+ anos): ", bold: true }), new TextRun("Apenas para os mais talentosos. Treinamento avançado, pesquisa, e preparação para posições de liderança.")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { line: 250 },
          children: [new TextRun({ text: "Guarda Real (recrutamento): ", bold: true }), new TextRun("Os melhores da Academia são recrutados para servir como guardas, soldados, ou agentes especiais.")]
        }),

        // CONCLUSÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("CONSIDERAÇÕES FINAIS")] }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Este documento estabelece as bases fundamentais para a narrativa da Era de Grazielly. As habilidades básicas, a constituição, as culturas, a estrutura do início do livro, os Vanguardas, e os segredos familiares foram projetados para criar uma história rica em profundidade, conflito e crescimento pessoal. Grazielly emerge como uma protagonista com peso genuíno: uma herdeira de linhagem poderosa que desconhece sua herança, uma garota aparentemente sem talento que carrega potencial extraordinário, uma órfã cuja mãe está viva mas distante.")]
        }),
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Os temas centrais — poder e responsabilidade, justiça vs lei, identidade secreta, sacrifício pelo bem maior — ecoam através de todas as camadas da história, desde o confronto primordial entre Ilyos e Nyxalor até os pequenos atos heroicos dos Vanguardas nas ruas de Nova Aetherion. Esta é uma história sobre heróis, mas mais importante, sobre o que significa ser um.")]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Fundamentos_Era_Grazielly.docx", buffer);
  console.log("Documento criado com sucesso!");
});
