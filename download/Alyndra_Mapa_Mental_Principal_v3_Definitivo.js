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
  dark: "1A1A1A"
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
          children: [new TextRun({ text: "Documento Oficial de Referência — Versão Definitiva", size: 22, color: colors.secondary })]
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

        // === 1. COSMOLOGIA FUNDAMENTAL ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Cosmologia Fundamental")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 A Criação — O Princípio de Tudo")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Antes da existência como a conhecemos, havia apenas o Vazio Primordial — um estado de não-existência onde nem tempo, nem espaço, nem matéria possuíam forma ou sentido. Este vazio não era vazio no sentido convencional, mas sim um potencial infinito aguardando o momento de se manifestar. Dentro deste vazio, uma consciência primordial começou a despertar, não como um ser com forma, mas como uma Vontade Pura que desejava criar, expressar e existir.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Esta Vontade Pura, que mais tarde seria chamada de O Criador, concentrou todo o potencial do Vazio em um único ponto de energia infinita. Este ponto permaneceu em estado de tensão perfeita por um período que transcendia a própria concepção de tempo. Quando finalmente se expandiu, deu origem não apenas à matéria e energia, mas aos próprios conceitos de existência, causalidade e realidade. O Criador, após a criação, não existe mais como entidade consciente separada — transformou-se completamente na estrutura do universo, suas características tornando-se as leis fundamentais.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.2 A Árvore da Existência e o Grande Atrator")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("No centro absoluto do universo criado, a expansão primordial deixou para trás uma anomalia gravitacional de escala incompreensível: o Grande Atrator. Para a física convencional, este é simplesmente o ponto para onde todas as galáxias do universo se movem. Mas para aqueles que compreendem a verdadeira natureza da realidade, o Grande Atrator é muito mais — é a manifestação física da Árvore da Existência, a estrutura fundamental que conecta todos os planos de realidade e sustenta a própria existência.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Árvore da Existência serve múltiplas funções essenciais: atua como filtro entre o Vazio Primordial e a realidade manifestada, fornece a estrutura através da qual a energia espiritual (Aethra) flui para todos os planos, e estabelece as leis fundamentais que governam a realidade. Suas \"raízes\" mergulham no Vazio Primordial, seu \"tronco\" atravessa o plano material, e seus \"galhos\" se estendem para planos superiores de existência.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.3 O Fruto da Existência")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Árvore da Existência, em ciclos que duram eons incompreensíveis, produz Frutos da Existência. Cada Fruto representa a cristalização de todo o potencial, conhecimento e poder da própria existência concentrados em uma forma tangível. Não é um fruto no sentido biológico, mas uma esfera de energia pura que pulsa com todas as cores do espectro e algumas que não existem em nenhum espectro físico conhecido. Quem consome um Fruto ganha a capacidade de moldar a realidade em escala universal — mas este poder vem com consequências intrínsecas que não podem ser evitadas.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.4 A Lei da Pureza")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Lei da Pureza é a mais absoluta e inquebrável das leis fundamentais. Todo ser que nasce e evolui no plano material deve ser julgado no momento de sua morte. O critério é a pureza de sua essência espiritual, determinada pela harmonia entre suas ações, intenções e o impacto que causaram no tecido da realidade. Aqueles julgados puros tornam-se imortais, suas consciências fundindo-se com a estrutura do universo. Aqueles julgados impuros têm sua essência devolvida ao Vazio Primordial, onde dissolve-se em potencial puro — não há sofrimento, mas também não há continuidade de consciência.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "A Exceção — Os Primordiais Corruptos: ", bold: true }), new TextRun("Aqueles que consumiram do Fruto e o usaram para fins que contrariam a natureza fundamental do universo ficam presos entre a existência e a não-existência. O Vazio rejeita sua corrupção, e o universo não pode absorvê-los. Este é o destino dos Nihilaryth.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 2. A CIVILIZAÇÃO AETHERION ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. A Civilização Aetherion")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Visão Geral")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Milhões de anos após a criação do universo, uma civilização começou a ascender próxima à periferia de uma galáxia espiral. Aetherion, como se chamava, desenvolveu-se não apenas em poder tecnológico, mas em compreensão espiritual e conexão com a estrutura fundamental do universo. Seu nome significava \"Aqueles que Ouvem o Éter\", uma referência à sua capacidade inata de perceber e manipular o Aethra que flui através de todos os seres e coisas.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("No auge de seu poder, Aetherion abrangia aproximadamente 2.847 mundos habitados, com uma população total estimada em 340 bilhões de indivíduos. A civilização alcançou o Nível 2 na Escala Kardashev, conseguindo harnessar toda a energia produzida por sua estrela através de uma Esfera Dyson parcial. Mas a classificação Kardashev não captura completamente seu poder — Aetherion não apenas harnessava energia física, mas também energia espiritual.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Os Cinco Pilares da Sociedade")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A sociedade Aetherion era estruturada em cinco pilares fundamentais, cada um representando um aspecto crucial de sua civilização altamente avançada:")]
        }),

        new Table({
          columnWidths: [2800, 6560],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2800, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Pilar", bold: true, color: colors.primary, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 6560, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Função", bold: true, color: colors.primary, size: 22 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Conclave da Essência", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Estudo e desenvolvimento do Aethra em todas as manifestações", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ordem Celestial", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Força militar e defensiva da civilização", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Círculo dos Arquitetos", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Infraestrutura física e tecnológica", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Jardim das Mentes", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Educação, filosofia e preservação do conhecimento", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Conselho dos Primordiais", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Os dez mais poderosos — que se tornaram os Nihilaryth", size: 22 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 1: Os Cinco Pilares de Aetherion", size: 18, italics: true, color: colors.secondary })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 Tecnologia e Espiritualidade")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A distinção entre tecnologia e espiritualidade era ausente em Aetherion. Para os Aetheri, ambos eram manifestações diferentes do mesmo princípio fundamental: a manipulação consciente da realidade. Entre suas criações mais notáveis estavam os Cristais de Ressonância (estruturas cristalinas que armazenavam e amplificavam energia espiritual), os Nanobots Primordiais (máquinas microscópicas que se sincronizavam com o Aethra do usuário), e os Portais Quânticos (aberturas no espaço-tempo para viagem instantânea).")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 3. OS NIHILARYTH ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Os Nihilaryth — Os Primordiais Corruptos")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Origem e Natureza")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Eras antes de Aetherion ascender, outra civilização dominava esta região do universo. Seus dez líderes mais poderosos, obcecados com a ideia de superar o próprio Criador, consumiram parte de um Fruto da Existência anterior e tentaram criar um universo separado. Este ato violou a Lei da Pureza de forma tão flagrante que, quando morreram, suas essências foram rejeitadas tanto pelo Vazio quanto pelo universo existente. Tornaram-se presos entre a existência e a não-existência, conscientes, sofredores, e terrivelmente poderosos em sua corrupção.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os dez Primordiais Corruptos, ou Nihilaryth (\"Aqueles que o Vazio Rejeita\"), desenvolveram ao longo de eons a capacidade de influenciar eventos dentro do universo através de manipulação sutil, corrompendo indivíduos e civilizações para servir seus propósitos. Seu objetivo final era simples e terrível: retornar à existência completa, não importa o custo para o universo.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 Os Dez Nihilaryth")] }),

        new Table({
          columnWidths: [2000, 2500, 4860],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: "4A2020", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2000, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nome", bold: true, color: "FFFFFF", size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: "4A2020", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2500, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Título", bold: true, color: "FFFFFF", size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: "4A2020", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 4860, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Método de Corrupção", bold: true, color: "FFFFFF", size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Vorynthrix", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Testemunha", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Líder, visões e revelações", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Xaryntha", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Sussurrante", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Voz interna, desejos secretos", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Thorynax", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Tormento", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Dor e sofrimento", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Veldryss", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Arquiteto", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sistemas e estruturas", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nyxaryon", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Silêncio", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Vazio emocional", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Krythanna", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Ilusionista", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Realidades falsas, ilusões", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Zaryphion", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Conquistador", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Promessas de poder", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Mytha", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Engano", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Mentiras, ilusões, decepção", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Dravoryx", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Consumidor", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fome e saciedade", size: 20 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sylvarion", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2500, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Corruptor de Raízes", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 4860, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Natureza distorcida", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 2: Os Dez Nihilaryth e Seus Métodos de Corrupção", size: 18, italics: true, color: colors.secondary })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 Os Quatro Graus de Contaminação")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os Nihilaryth desenvolveram um método sistemático para corromper seres dentro do universo, um processo gradual que permitia que a vítima não percebesse até que fosse tarde demais:")]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "GRAU 1 — O Sussurro: ", bold: true }), new TextRun("Contato inicial através de voz suave, conselhos que parecem sábios. Resistência possível através de fé e questionamento.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "GRAU 2 — A Influência: ", bold: true }), new TextRun("A voz afeta emoções e percepções. A vítima confia mais na voz do que em si mesma. Resistência requer autoconhecimento profundo.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "GRAU 3 — A Dependência: ", bold: true }), new TextRun("A vítima precisa da voz para funcionar. Isola-se de pessoas que poderiam ajudar. Resistência extremamente difícil.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "GRAU 4 — A Entrega: ", bold: true }), new TextRun("O Nihilaryth assume controle total. A consciência original é suprimida ou destruída. Não há resistência possível.")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.4 Os Seguidores dos Nihilaryth")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os dez Nihilaryth desenvolveram grupos de seguidores organizados, com estrutura hierárquica própria. Estima-se que aproximadamente 160.000 adeptos diretos serviam aos Nihilaryth no auge de Aetherion. A hierarquia geral era organizada em cinco níveis: O Chamado (recrutados, não iniciados), O Abraço (corrupção inicial irreversível), A Comunhão (conexão direta com mestre), A Encarnação (vasos vivos do poder), e A Ascensão (fusão completa — teórico, nenhum alcançou).")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 4. ALYNDRAS E YGGORATY ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Alyndra e Yggoraty — As Irmãs do Destino")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 O Segredo das Irmãs")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "VERDADE FUNDAMENTAL: ", bold: true, color: "8B0000" }), new TextRun("Alyndra e Yggoraty eram irmãs de sangue. Este segredo era conhecido apenas por elas duas e poucos confidentes absolutos. Publicamente, eram apresentadas como primas distantes de linhagens nobres diferentes, ou como líder e subordinada. A revelação de sua verdadeira relação poderia precipitar o conflito cósmico que uma profecia antiga previa — duas irmãs de poder comparável representando lados opostos de um destino maior.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Alyndra era a mais velha por três anos. Desde jovem demonstrou uma conexão com o Aethra que excedia qualquer coisa registrada na história. Sua personalidade era marcada por determinação inquebrantável e ambição visionária — ela acreditava que Aetherion tinha um destino maior. Yggoraty, em contraste, demonstrava uma natureza nutritiva e protetora. Seu Aethra tinha qualidade diferente — menos destrutivo, mais curador. Onde Alyndra podia destruir exércitos, Yggoraty podia curar mundos inteiros.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 Alyndra — A Fundadora")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Alyndra consumiu o Fruto de Aertherion e tornou-se extremamente poderosa. Com esse poder, ela fundou a civilização de Aetherion, estabelecendo seus cinco pilares e estrutura social. Alyndra tinha ciência do potencial destrutivo do Fruto e o usava com extrema cautela. Para manuseá-lo com segurança, ela criou a Armadura de Alyndra (posteriormente chamada Armadura Suprema) — um artefato que permitia canalizar e controlar o poder do Fruto.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "O conhecimento do Fruto: ", bold: true }), new TextRun("Quando Alyndra consumiu o Fruto, ela viu o futuro — incluindo sua própria morte como necessária. Ela viu que os Nihilaryth viriam, que Aetherion cairia, e que a única esperança estava em preparar Yggoraty para um papel que a irmã ainda não compreendia. Alyndra aceitou voluntariamente este destino.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 Yggoraty — A Guerreira Lendária")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Yggoraty servia como General Primaz das forças de Aetherion, publicamente como subordinada de Alyndra. O título pode parecer contraditório para alguém com natureza nutritiva, mas Yggoraty via a defesa como a mais nobre expressão de poder. Ela não lutava para conquistar, mas para proteger. Seus exércitos não eram armas de expansão, mas escudos para os vulneráveis. Esta filosofia a tornava amada pelos cidadãos comuns, enquanto Alyndra era temida e respeitada em igual medida.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Alyndra manipulou CIRCUNSTÂNCIAS ao redor de Yggoraty ao longo de toda sua vida — missões designadas, informações filtradas, aliados posicionados. Yggoraty sempre tomou suas próprias decisões baseada em informação genuína; a manipulação estava em QUAL informação ela recebia. Alyndra usou seu poder do Fruto para ver quais experiências moldariam Yggoraty na pessoa que precisava ser para o sacrifício final.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 5. A QUEDA DE AETHERION ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. A Queda de Aetherion")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 O Experimento de Tempestra")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O ponto de infiltração dos Nihilaryth foi o continente de Tempestra, onde cientistas estudavam a possibilidade de expandir os Portais Quânticos para permitir acesso direto ao Vazio Primordial. Esta Iniciativa Abismo era ambiciosa demais — seu objetivo era harnessar diretamente o potencial infinito do Vazio. A equipe de Tempestra não sabia que suas pesquisas estavam sendo sutilmente guiadas por Vorynthrix através de sonhos, \"intuições\" brilhantes, e \"descobertas\" convenientes que pareciam avanços genuínos.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Quando o Portal Quântico experimental foi ativado, ele não abriu para o Vazio Primordial como planejado. Criou uma ponte para o espaço entre-existencial onde os Nihilaryth estavam presos. Os Dez Primordiais Corruptos atravessaram a brecha como essências que imediatamente começaram a buscar hospedeiros. Um dos dez foi extirpado no processo — sobraram nove.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 A Corrupção Se Espalha")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A natureza da queda foi particularmente terrível porque não foi imediata. Os Nihilaryth não destruíram a civilização diretamente — a corromperam de dentro para fora. Líderes começaram a tomar decisões que pareciam racionais mas serviam aos interesses dos Primordiais. A corrupção Nihilaryth não é detectável por tecnologia convencional porque funciona através de manipulação de escolhas genuínas — as vítimas escolhem voluntariamente o caminho da corrupção, acreditando serem suas próprias ideias.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Alyndra, com o poder do Fruto, percebeu a corrupção antes de qualquer outro. Ela viu que a civilização estava condenada, que não havia forma de salvá-la. A contaminação havia se espalhado muito profundamente. Tentar purificar Aetherion significaria reescrever as mentes de todos — violando seu livre-arbítrio fundamental e criando uma civilização de marionetes sem alma genuína.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.3 O Sacrifício de Alyndra")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Alyndra tomou a decisão que definiria todo o futuro. Ela usaria seu poder para criar as condições para que algo melhor surgisse depois. Primeiro, extraiu do planeta Aetherion sua essência espiritual, condensando-a em sementes que seriam dispersadas pelo universo. Segundo, criou os Nanobots Primordiais finais com fragmentos de conhecimento e memória. Terceiro, preparou Yggoraty para o papel que precisaria desempenhar.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Finalmente, Alyndra confrontou os Nihilaryth diretamente. Usou TODO o poder do Fruto da Existência para não destruí-los — impossível — mas para dilatá-los pelo universo, espalhando suas essências por distâncias tão vastas que levaria eras para se recomporem. Este ato consumiu completamente sua força vital. Alyndra morreu sabendo que seu sacrifício comprara tempo para o universo.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.4 O Grande Segredo")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "O SEGREDO: ", bold: true, color: "8B0000" }), new TextRun("Os Nihilaryth colecionam corpos com potenciais. O corpo de Alyndra está em suas mãos, preservado. A Alyndra original talvez ainda não tenha morrido — ela pode estar sem seu corpo, completamente possuída, ou corrompida juntamente com alguns Aetheris. Este segredo permanece oculto, aguardando o momento de ser revelado.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Antes de sua captura, Alyndra doou a Armadura de Alyndra (Armadura Suprema) a Yggoraty, e a fez jurar proteção à semente do Fruto da Existência. Este ato garantiu que, mesmo com sua queda, a esperança continuasse viva.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 6. A FUGA E O SACRIFÍCIO DE YGGORATY ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. A Fuga e o Sacrifício de Yggoraty")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 A Grande Fuga")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Com a semente e a Armadura em sua posse, Yggoraty fugiu das mãos dos Nihilaryth remanescentes. Esta não foi uma fuga simples — ela atravessou sistemas estelares, travando batalhas épicas contra forças inimigas em cada passo. Os Nihilaryth a perseguiam incansavelmente, sabendo que a semente representava sua única chance de desfazer a maldição que os manteve fragmentados.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Yggoraty demonstrou habilidade combativa extraordinária e determinação inabalável. Cada batalha era uma demonstração de seu amor por Alyndra e seu compromisso com o juramento feito. Mas ela sabia que não poderia fugir para sempre. Os Nihilaryth eram nove, e mesmo com a Armadura de Alyndra, ela não poderia derrotá-los todos sozinha.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.2 O Sacrifício na Singularidade")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Yggoraty encontrou sua solução em uma galáxia gigante e desconhecida, distante de qualquer civilização. O centro desta galáxia era uma Singularidade — um ponto onde a matéria é exterminada e mesmo no plano imaterial a passagem requer extremo poder. Ali, ela tomou sua decisão final: lançar-se na Singularidade, selando a semente e a Armadura Suprema com todo seu poder no plano imaterial.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Os Nihilaryth testemunharam o ato e acreditaram ser o fim. Em sua percepção, Yggoraty se autoexterminou juntamente com a semente e a armadura — eliminando sua última chance de reverter a maldição. Mas o plano de Yggoraty deu certo. A semente germinou no plano imaterial, alimentando-se do centro galático. Seu corpo foi destruído, mas fragmentos de sua essência se fundiram à semente.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.3 O Renascimento — Yggorath")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Após eons de crescimento silencioso no plano imaterial, a semente finalmente brotou. Uma nova árvore surgiu — não tão grande quanto as anteriores, mas muito poderosa. Depois de eons adicionais, a árvore atingiu tamanho considerável, e sua essência desenvolveu consciência própria.")]
        }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "Distinção Importante: ", bold: true }), new TextRun("Esta nova entidade escolheu se chamar Yggorath, talvez porque possui fragmentos da essência da guerreira Yggoraty que a protegeu. Yggoraty era a guerreira; Yggorath é a árvore que nasceu de seu sacrifício. São entidades diferentes, mas conectadas pela essência fragmentada da guerreira que se fundiu à semente durante seu sacrifício.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 7. A NOVA HIERARQUIA CÓSMICA ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. A Nova Hierarquia Cósmica")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.1 Yggorath — O Centro")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A nova Yggorath tornou-se o centro da realidade conhecida. Embora menor que a Árvore Primordial original, sua concentração de poder é extraordinária. Suas raízes penetram o plano imaterial, enquanto seus ramos se estendem por sistemas estelares. Yggorath possui consciência própria — uma fusão da consciência da árvore com fragmentos da essência de Yggoraty. Ela é a guardiã deste ciclo de existência, a protetora da vida que nasceu de seu sacrifício.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.2 Os Filhos Legítimos")] }),
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
          children: [new TextRun({ text: "Nota Importante: ", bold: true }), new TextRun("Ilyos e Nyxalor são irmãos. Nyxalor NÃO é Seraphyen — ele é um Filho Legítimo, de natureza superior. Os cinco elementos derivam da interação entre Luz e Sombras. Cada elemento possui dois Seraphyens: um seguindo Ilyos (faceta Luz) e um seguindo Nyxalor (faceta Sombra).")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.3 Os 10 Seraphyens")] }),
        new Paragraph({ 
          spacing: { after: 150 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Yggorath criou dez Seraphyens para governar os cinco elementos derivados da interação entre Luz e Sombras:")]
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

        // === 8. O PADRÃO DO SACRIFÍCIO ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. O Padrão do Sacrifício")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("O universo de Alyndra é construído sobre um padrão cósmico que se repete através das eras: o sacrifício de amor como força transformadora máxima. Este padrão não é coincidência — é uma lei fundamental da existência, tecida na estrutura da realidade desde os primeiros sacrifícios. Cada era possui seu par, cada par faz seu sacrifício, e cada sacrifício reforça o ciclo que sustenta toda a criação.")]
        }),

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
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Civilização Aetherion", size: 20 })] })] }),
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

        // === 9. A ARMADURA DE ALYNDRAS ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("9. A Armadura de Alyndra (Armadura Suprema)")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("A Armadura de Alyndra, posteriormente conhecida como Armadura Suprema, foi criada pela própria Alyndra usando poder do Fruto para manusear o Fruto da Existência com segurança. É um dos artefatos mais poderosos do universo, forjado com fragmentos da própria estrutura do universo. Cada parte foi criada com propósito específico e algumas foram separadas e escondidas por Alyndra antes de sua captura.")]
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
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Com líder possuído (a desenvolver)", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Usado para escravizar civilização", size: 20 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 6: Componentes da Armadura de Alyndra", size: 18, italics: true, color: colors.secondary })] }),

        new Paragraph({ 
          spacing: { before: 200, after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "Proteções da Armadura: ", bold: true }), new TextRun("A Armadura tem proteções intrínsecas contra uso malicioso. Cada parte só se revela para alguém com linhagem específica (descendentes de Ilyos ou Yggorath). O Rito de Ilyos só pode ser completado por alguém com pureza de coração comprovada — tentar o rito com intenções corruptas resulta em rejeição fatal. A Armadura \"conhece\" seu usuário legítimo e pode recusar ativação mesmo se fisicamente vestida.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 10. CRONOLOGIA ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("10. Cronologia do Universo")] }),

        new Table({
          columnWidths: [2800, 6560],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 2800, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Era", bold: true, color: colors.primary, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.accent, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, width: { size: 6560, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Duração e Eventos", bold: true, color: colors.primary, size: 22 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Era Primordial", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~500 milhões de anos — Desenvolvimento de Aetherion até sua queda", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Renascimento", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~10.000 anos — Período no Paraíso Espiritual até criação dos Seraphyens", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Era dos Seraphyens", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~50.000 anos — Até a Guerra e selamento de Nyxalor", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Era de Grazielly", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2.000 anos após selamento — Tempo de vida reduzido a 120 anos", size: 22 })] })] })
            ] }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Era de Iris", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Começa imediatamente após sacrifício de Grazielly", size: 22 })] })] })
            ] })
          ]
        }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tabela 7: Cronologia das Eras", size: 18, italics: true, color: colors.secondary })] }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 11. PERSONAGENS DA ERA DE GRAZIELLY ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("11. Personagens da Era de Grazielly")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.1 Grazielly")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Protagonista da Era de Grazielly, herdeira da linhagem de Elarys através de sua mãe Elainy. Desde jovem demonstrou afinidade extraordinária com o elemento gelo (Cryonys). Seu poder era abundante mas difícil de controlar — contrastando com Elainy, que tinha poder difícil de conseguir mas fácil de controlar. Grazielly carregava nanobots primordiais integrados ao seu DNA desde a infância. Seu sacrifício na Cripta Primordial, junto com sua mãe, selou os Nihilaryth.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.2 Elainy")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Mãe de Grazielly e última herdeira direta da linhagem de Elarys. Possuía afinidade primária com Fogo e secundária com Terra, permitindo acessar técnicas de Lava e eventualmente Fusão Nuclear. Seu poder era difícil de conseguir mas fácil de controlar — contrastando com Grazielly. O nome \"Elainy\" ecoa \"Elarys\", refletindo a conexão sanguínea. Teve papel central na corrupção que quase destruiu o universo, sendo purificada pelo sacrifício de Grazielly e Noah.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.3 Aurelius")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "IMPORTANTE: ", bold: true }), new TextRun("Aurelius era pai de Grazielly ANTES de ser GM (Guardião Mestre). Esta distinção cronológica é crucial — Aurelius teve sua vida como mortal, incluindo a paternidade de Grazielly, antes de ascender ao posto de GM. Ele fazia parte da Equipe Aurora junto com Ayla, desempenhando papel importante na proteção do reino.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.4 Théssaly")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: "IMPORTANTE: ", bold: true }), new TextRun("Théssaly foi um GM que foi deposto de sua posição após ser corrompido pelos Nihilaryth. Esta corrupção e deposição são parte do contexto que levou à crise enfrentada por Grazielly e Elainy na Cripta Primordial.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.5 O Líder Possuído (A Desenvolver)")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Na época de Grazielly, um líder de um planeta está possuído por um Nihilaryth. Este líder guarda o elmo da Armadura Suprema — um componente que se separou do restante da armadura. Usando o poder do elmo, ele escraviza a civilização de seu planeta. Este plot será desenvolvido futuramente.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.6 Noah — O Silentis")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Noah representa uma categoria única: um Silentis que compensou a falta de poderes espirituais com genialidade tecnológica. Sem Aethra ativo, ele não podia usar técnicas convencionais, mas desenvolveu uma armadura tecnológica que permitia rivalizar com guerreiros de alto nível. Noah estudou os nanobots por anos e os transmitiu a Iris através de herança biológica direta.")]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.7 Iris — A Espada Final")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Filha de Grazielly e Noah, Iris representa a síntese perfeita entre poder espiritual hereditário e tecnologia. Nascida com nanobots integrados ao seu DNA, ela não possui \"níveis\" tradicionais, mas sim uma evolução constante e permanente que a torna cada vez mais poderosa ao longo do tempo. Ela representa a esperança de derrota definitiva dos Nihilaryth — ou sua redenção.")]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // === 12. PONTOS PARA DESENVOLVIMENTO ===
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("12. Pontos para Desenvolvimento Futuro")] }),
        new Paragraph({ 
          spacing: { after: 200 }, alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun("Este documento consolida todo o conhecimento estabelecido sobre o universo de Alyndra. No entanto, existem áreas que ainda necessitam de desenvolvimento:")]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "O paradeiro do corpo de Alyndra: ", bold: true }), new TextRun("Qual Nihilaryth o possui? Ela está consciente? Pode ser resgatada?")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "O líder possuído com o elmo: ", bold: true }), new TextRun("Qual planeta? Como obteve o elmo? Qual Nihilaryth o possui? Como Grazielly lidou com ele?")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Os Aetheris corrompidos: ", bold: true }), new TextRun("Quem são? Como foram corrompidos junto com Alyndra? Qual seu papel atual?")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "A Equipe Aurora: ", bold: true }), new TextRun("Membros completos, missões, e o papel detalhado de Ayla.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "As gerações entre Elarys e Elainy: ", bold: true }), new TextRun("Como a linhagem foi preservada e transmitida através dos milênios.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "A Era de Iris: ", bold: true }), new TextRun("Como ela enfrentará os Nihilaryth reformados. A possibilidade de redenção dos Nihilaryth.")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "A quinta era do sacrifício: ", bold: true }), new TextRun("Haverá continuação do padrão? Quem serão os próximos?")] }),
        
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
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Mapa_Mental_Principal_v3_Definitivo.docx", buffer);
  console.log("✅ Documento criado: Alyndra_Mapa_Mental_Principal_v3_Definitivo.docx");
});
