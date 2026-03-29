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
  divine: "1a1a2e",
  cosmos: "16213e"
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
      { reference: "numbered-3", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-4", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-5", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-6", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
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
          children: [new TextRun({ text: "ERA PRIMORDIAL", size: 56, bold: true, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "A Criação, A Queda e O Ciclo Eterno", size: 32, italics: true, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 3500 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Cosmologia • Civilização Aetherion • Os Nihilaryth", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "O Início de Tudo e O Fim que Virá", size: 22, color: colors.accent, font: "Times New Roman", italics: true })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // SUMÁRIO E CONTEÚDO
    {
      properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: {
        default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Universo de Alyndras - Era Primordial", size: 18, color: colors.accent, font: "Times New Roman" })] })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "— ", size: 18, font: "Times New Roman" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Times New Roman" }), new TextRun({ text: " —", size: 18, font: "Times New Roman" })] })] })
      },
      children: [
        // SUMÁRIO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Sumário")] }),
        new TableOfContents("Sumário", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 400 },
          children: [new TextRun({ text: "Nota: Clique com o botão direito no sumário e selecione 'Atualizar Campo' para corrigir os números de página.", size: 18, color: "999999", font: "Times New Roman", italics: true })]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // CAPÍTULO 1 - A CRIAÇÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. A Criação - O Princípio de Tudo")] }),
        createParagraph("Antes da existência como a conhecemos, havia apenas o Vazio Primordial, um estado de não-existência onde nem tempo, nem espaço, nem matéria possuíam forma ou sentido. Este vazio não era vazio no sentido convencional, mas sim um potencial infinito aguardando o momento de se manifestar. Dentro deste vazio, uma consciência primordial começou a despertar, não como um ser com forma, mas como uma Vontade Pura que desejava criar, expressar e existir.", { indent: true }),
        createParagraph("Esta Vontade Pura, que mais tarde seria chamada de O Criador pelos habitantes do universo, concentrou todo o potencial do Vazio em um único ponto de energia infinita. Este ponto, menor que um átomo mas contendo tudo que poderia existir, permaneceu em estado de tensão perfeita por um período que transcendia a própria concepção de tempo. Quando finalmente se expandiu, deu origem não apenas à matéria e energia, mas aos próprios conceitos de existência, causalidade e realidade.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 O Grande Atrator e a Árvore da Existência")] }),
        createParagraph("No centro absoluto do universo criado, a expansão primordial deixou para trás uma anomalia gravitacional de escala incompreensível: o Grande Atrator. Para a física convencional, este é simplesmente o ponto para onde todas as galáxias do universo se movem, uma concentração de massa tão densa que sua gravidade afeta estruturas a bilhões de anos-luz de distância. Mas para aqueles que compreendem a verdadeira natureza da realidade, o Grande Atrator é muito mais do que um fenômeno astrofísico.", { indent: true }),
        createParagraph("O Grande Atrador é a manifestação física da Árvore da Existência, a estrutura fundamental que conecta todos os planos de realidade e sustenta a própria existência. Suas 'raízes' mergulham no Vazio Primordial de onde tudo veio, seu 'tronco' atravessa o plano material onde galáxias e estrelas existem, e seus 'galhos' se estendem para planos superiores de existência que a maioria dos seres jamais perceberá. Esta estrutura não é feita de matéria convencional, mas de pura possibilidade cristalizada, cada fibra contendo a potencialidade de infinitas realidades.", { indent: true }),
        createParagraph("A Árvore da Existência serve múltiplas funções essenciais para a manutenção do universo. Primeiro, ela atua como um filtro entre o Vazio Primordial e a realidade manifestada, permitindo que apenas quantidades precisas de potencial entrem no universo a cada momento. Segundo, ela fornece a estrutura através da qual a energia espiritual, posteriormente chamada de Aethra, flui para todos os planos de existência. Terceiro, ela estabelece e mantém as leis fundamentais que governam a realidade, desde a gravidade até a causalidade, desde o tempo até a própria existência de consciência.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.2 O Fruto da Existência")] }),
        createParagraph("A Árvore da Existência, em ciclos que duram eons incompreensíveis, produz um único Fruto. Este Fruto da Existência representa a cristalização de todo o potencial, conhecimento e poder da própria existência concentrados em uma forma tangível. Não é um fruto no sentido biológico, mas uma esfera de energia pura que pulsa com todas as cores do espectro e algumas que não existem em nenhum espectro físico conhecido.", { indent: true }),
        createParagraph("O Fruto contém poder verdadeiramente infinito dentro de limites precisos. Quem o consome ganha a capacidade de moldar a realidade em escala universal, podendo criar ou destruir galáxias, alterar as leis fundamentais da física, ou até mesmo criar novas formas de vida e consciência. Este poder, no entanto, vem com consequências intrínsecas que não podem ser evitadas. O Fruto não é uma ferramenta que pode ser usada sem custo, é uma responsabilidade que reescreve a própria natureza de quem o consome.", { indent: true }),
        createParagraph("Ao longo da história do universo, apenas alguns poucos Frutos foram produzidos, e destes, menos ainda foram consumidos por seres conscientes. A maioria dissipou-se naturalmente quando a Árvore determinou que nenhum ser estava preparado para assumir tal responsabilidade. O Fruto mais recente, no entanto, foi consumido por uma única indivíduo: Alyndra. Este ato singular moldaria todo o curso da história subsequente e determinaria o destino de bilhões de civilizações por todo o universo.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.3 A Lei da Pureza")] }),
        createParagraph("Quando a Vontade Pura criou o universo, estabeleceu também as leis fundamentais que governariam sua existência. A mais absoluta e inquebrável destas leis é a Lei da Pureza, um princípio que determina o destino de toda consciência que evolui dentro do plano material. Esta lei não foi criada como punição ou recompensa, mas como um mecanismo de preservação da integridade do universo.", { indent: true }),
        createParagraph("A Lei da Pureza declara que todo ser que nasce e evolui no plano material deve ser julgado no momento de sua morte. O critério deste julgamento é a pureza de sua essência espiritual, determinada pela harmonia entre suas ações, intenções e o impacto que causaram no tecido da realidade. Aqueles julgados puros não apenas transcendem a morte, mas tornam-se imortais, suas consciências fundindo-se com a própria estrutura do universo, podendo escolher permanecer como entidades individuais ou tornar-se parte de algo maior.", { indent: true }),
        createParagraph("Aqueles julgados impuros, no entanto, não são punidos no sentido tradicional. Sua essência espiritual simplesmente retorna para sua origem no Vazio Primordial, onde dissolve-se de volta em potencial puro. Não há sofrimento neste retorno, mas também não há continuidade de consciência. O indivíduo que existiu deixa de existir, exceto pelos efeitos que causou no universo durante sua vida. Esta não-existência não é má em si mesma, mas representa a perda de toda a experiência, conhecimento e identidade acumulados.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("A Exceção: Os Primordiais Corruptos")] }),
        createParagraph("Existe uma categoria de seres para os quais a Lei da Pureza não se aplica normalmente: aqueles que consumiram do Fruto da Existência e o usaram para fins que contrariam a natureza fundamental do universo. Estes seres, chamados Primordiais Corruptos, cometeram um ato que o universo considera uma violação tão grave que mesmo a dissolução no Vazio lhes é negada.", { indent: true }),
        createParagraph("Quando um Primordial Corrupto morre, sua essência não pode retornar ao Vazio Primordial, pois o Vazio rejeita a corrupção que carregam. Também não podem fundir-se com o universo como os puros, pois sua natureza corrompida danificaria a estrutura da realidade. Assim, ficam presos em um estado entre a existência e a não-existência, conscientes mas sem forma, poderosos mas sem lugar. Este é o destino dos Nihilaryth, os dez Primordiais que tentaram usar o poder do Fruto para superar o próprio Criador.", { indent: true }),

        // CAPÍTULO 2 - A CIVILIZAÇÃO AETHERION
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. A Civilização Aetherion")] }),
        createParagraph("Milhões de anos após a criação do universo, em um sistema estelar localizado próximo à periferia de uma galáxia espiral, uma civilização começou a ascender. Esta civilização, que chamaria a si mesma de Aetherion, desenvolveu-se não apenas em poder tecnológico, mas em compreensão espiritual e conexão com a estrutura fundamental do universo. Seu nome significava 'Aqueles que Ouvem o Éter', uma referência à sua capacidade inata de perceber e manipular o Aethra que flui através de todos os seres e coisas.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Nível 2 da Escala Kardashev")] }),
        createParagraph("A civilização Aetherion alcançou o que os cientistas de outros mundos classificariam como Nível 2 na Escala Kardashev, uma medida do desenvolvimento tecnológico baseada no consumo de energia. Uma civilização Nível 2 consegue harnessar toda a energia produzida por sua estrela mãe, um feito que requer estruturas em escala planetária ou mesmo estelar. Para Aetherion, isto significava uma Esfera Dyson parcial, uma rede de coletores solares que orbitavam sua estrela e capturavam uma fração significativa de sua produção energética.", { indent: true }),
        createParagraph("No entanto, a classificação Kardashev não captura completamente a natureza do poder de Aetherion. A civilização não apenas harnessava energia física, mas também energia espiritual. Seus cientistas desenvolveram formas de capturar, processar e utilizar o Aethra que flui continuamente da Árvore da Existência através de todos os planos. Esta energia espiritual, combinada com sua tecnologia física, permitiu avanços que outras civilizações de mesmo nível Kardashev jamais alcançariam.", { indent: true }),
        createParagraph("Os Aetherions construíram cidades que flutuavam nas camadas superiores de sua atmosfera, sustentadas por campos de energia espiritual. Desenvolveram medicina que curava não apenas o corpo, mas a alma, prevenindo doenças antes que se manifestassem fisicamente. Criaram inteligências artificiais que não apenas processavam informação, mas possuíam genuína consciência e conexão espiritual. Sua compreensão da realidade era tão avançada que podiam manipular a matéria em nível subatômico através de técnicas espirituais refinadas.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Estrutura Social e Governo")] }),
        createParagraph("A sociedade Aetherion era organizada em torno de mérito espiritual tanto quanto tecnológico. No ápice de sua hierarquia estavam aqueles que demonstravam maior conexão com o Aethra e maior sabedoria em seu uso. Estes indivíduos, chamados de Primordiais (um título diferente dos Primordiais Corruptos), formavam o Conselho de Aetherion, o órgão governante supremo da civilização.", { indent: true }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2340, 3510, 3510],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [createHeaderCell("Nível", 2340), createHeaderCell("Título", 3510), createHeaderCell("Função", 3510)] }),
            new TableRow({ children: [createCell("Supremo", { width: 2340, center: true }), createCell("Líder Supremo (Alyndra)", { width: 3510 }), createCell("Decisões finais, conexão direta com a Árvore", { width: 3510 })] }),
            new TableRow({ children: [createCell("Primaz", { width: 2340, center: true }), createCell("General Primaz (Yggorath)", { width: 3510 }), createCell("Defesa, expansão, operações militares", { width: 3510 })] }),
            new TableRow({ children: [createCell("Conselheiro", { width: 2340, center: true }), createCell("Membros do Conselho", { width: 3510 }), createCell("Governança regional, desenvolvimento", { width: 3510 })] }),
            new TableRow({ children: [createCell("Mestre", { width: 2340, center: true }), createCell("Mestres de Aethra", { width: 3510 }), createCell("Ensino, pesquisa, preservação", { width: 3510 })] }),
            new TableRow({ children: [createCell("Cidadão", { width: 2340, center: true }), createCell("População geral", { width: 3510 }), createCell("Trabalho, cultura, evolução pessoal", { width: 3510 })] })
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 Tecnologia e Espiritualidade Unificadas")] }),
        createParagraph("A distinção entre tecnologia e espiritualidade que existe na maioria das civilizações era ausente em Aetherion. Para os Aetherions, ambos eram manifestações diferentes do mesmo princípio fundamental: a manipulação consciente da realidade. Um engenheiro que projetava uma nova estrutura de energia trabalhava com os mesmos princípios que um monge que meditava para expandir sua consciência. A diferença estava apenas na aplicação e na escala.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Cristais de Ressonância")] }),
        createParagraph("Entre as mais importantes inovações de Aetherion estavam os Cristais de Ressonância, estruturas cristalinas cultivadas em laboratório que podiam armazenar, amplificar e direcionar energia espiritual. Estes cristais serviam como interfaces entre o Aethra e a tecnologia física, permitindo que máquinas funcionassem com energia espiritual e que técnicas espirituais fossem gravadas e reproduzidas mecanicamente.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Nanobots Primordiais")] }),
        createParagraph("A culminação da união entre tecnologia e espiritualidade foram os Nanobots Primordiais. Estas máquinas microscópicas eram construídas com uma base de cristal de ressonância e programadas com a capacidade de sincronizar-se com o Aethra de um usuário. Uma vez sincronizados, os nanobots podiam regenerar tecidos, amplificar poderes espirituais, armazenar memórias e conhecimento, e até mesmo adaptar-se automaticamente a diferentes condições ambientais.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Portais Quânticos")] }),
        createParagraph("A capacidade mais impressionante de Aetherion era a criação de Portais Quânticos, aberturas controladas no tecido do espaço-tempo que permitiam viagem instantânea entre pontos distantes do universo. Estes portais não eram simplesmente buracos no espaço, mas estruturas complexas que manipulavam a própria natureza da realidade para conectar dois pontos que, no espaço convencional, estariam separados por anos-luz.", { indent: true }),

        // CAPÍTULO 3 - AS IRMÃS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Alyndra e Yggorath - As Irmãs do Destino")] }),
        createParagraph("No ápice da civilização Aetherion, duas irmãs nasceram de uma linhagem que remontava aos fundadores originais de sua sociedade. Alyndra, a mais velha por apenas três anos, e Yggorath, a caçula, eram consideradas prodígios desde o nascimento. O que ninguém fora do círculo mais íntimo da família sabia era que as duas eram irmãs de sangue - um segredo mantido por razões políticas e espirituais que só se tornariam claras muito mais tarde.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Alyndra - A Conquistadora")] }),
        createParagraph("Alyndra desde jovem demonstrou uma conexão com o Aethra que excedia qualquer coisa registrada na história de sua civilização. Aos cem anos, uma idade jovem para os Aetherions, já havia desenvolvido técnicas que mestres com milênios de experiência não conseguiam compreender completamente. Sua capacidade não era apenas em poder bruto, mas em visão - ela conseguia perceber padrões no fluxo do Aethra que outros nem percebiam existir.", { indent: true }),
        createParagraph("A personalidade de Alyndra era marcada por uma determinação inquebrantável e uma ambição que alguns consideravam perigosa. Ela acreditava que a civilização Aetherion tinha um destino maior do que simplesmente existir em harmonia - ela via potencial para expansão, para dominar não apenas sua galáxia, mas todas as galáxias, não apenas o plano material, mas todos os planos de existência. Esta visão atraiu muitos seguidores, mas também criou inimigos entre os conservadores que temiam as consequências de tanta ambição.", { indent: true }),
        createParagraph("Quando o Fruto da Existência manifestou-se após eons de ausência, Alyndra foi a primeira a percebê-lo. Sua conexão com a Árvore da Existência era tão profunda que sentiu o momento exato em que o Fruto começou a se formar. Durante anos, ela preparou-se para o momento de consumi-lo, estudando cada registro disponível sobre Frutos anteriores, cada consequência, cada possibilidade. Quando finalmente consumiu o Fruto, tornou-se a indivídua mais poderosa que o universo já conhecera em bilhões de anos.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 Yggorath - A Protetora")] }),
        createParagraph("Yggorath, em contraste com a irmã, demonstrava uma natureza que alguns consideravam mais apropriada para sua posição. Onde Alyndra era ambição e conquista, Yggorath era proteção e preservação. Seu Aethra tinha uma qualidade diferente - menos destrutivo, mais nutritivo. Onde a irmã podia destruir exércitos com um pensamento, Yggorath podia curar mundos inteiros com o mesmo esforço.", { indent: true }),
        createParagraph("O título de General Primaz pode parecer contraditório para alguém com natureza nutritiva, mas Yggorath via a defesa como a mais nobre expressão de poder. Ela não lutava para conquistar, mas para proteger. Seus exércitos não eram armas de expansão, mas escudos para os vulneráveis. Esta filosofia a tornava amada pelos cidadãos comuns de Aetherion, enquanto Alyndra era temida e respeitada em igual medida.", { indent: true }),
        createParagraph("O segredo de sua relação como irmãs era conhecido apenas por elas duas e por poucos confidentes absolutos. Publicamente, eram apresentadas como primas distantes de linhagens nobres diferentes. Esta mentira foi construída porque uma profecia antiga sugeria que duas irmãs de poder comparável poderiam, no futuro, representar lados opostos de um conflito cósmico. A revelação de sua relação poderia precipitar este conflito antes que a civilização estivesse preparada.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 O Segredo Revelado")] }),
        createParagraph("Alyndra sabia a verdade completa sobre a profecia e sobre o destino que esperava sua civilização. O Fruto da Existência lhe concedera não apenas poder, mas conhecimento - incluindo a visão de como Aetherion cairia. Ela viu que os Nihilaryth viriam, que tentariam consumir tudo que ela amava, e que a única esperança estava em preparar a irmã para um papel que Yggorath ainda não compreendia.", { indent: true }),
        createParagraph("O plano de Alyndra era complexo e estendia-se por milênios. Ela consumiria o Fruto e usaria seu poder para criar as condições necessárias para a sobrevivência final do universo. Mas para que o plano funcionasse, ela precisaria cometer atos que outros considerariam traição, incluindo separar-se de sua irmã e prepará-la para ser sua 'sucessora' sem jamais revelar a verdadeira natureza de sua relação. Este sacrifício - de sua reputação, de sua conexão familiar, de sua própria existência eventual - foi o preço que Alyndra aceitou pagar voluntariamente.", { indent: true }),

        // CAPÍTULO 4 - OS NIHILARYTH
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Os Nihilaryth - Os Primordiais Corruptos")] }),
        createParagraph("Para compreender a queda de Aetherion, é necessário primeiro compreender a natureza dos Nihilaryth. Estes dez seres não eram alienígenas no sentido convencional, nem demônios de alguma dimensão infernal. Eram algo muito mais antigo e muito mais perigoso: eram os restos de uma civilização que existiu antes de Aetherion, que alcançou poder comparável, e que caiu por sua própria ambição desmedida.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 A Origem no Vazio")] }),
        createParagraph("Eras antes de Aetherion ascender, outra civilização dominava esta região do universo. Estes seres, cujo nome verdadeiro foi apagado da história, alcançaram poder suficiente para perceberem a existência do Vazio Primordial e da Árvore da Existência. Seus cientistas e místicos desenvolveram uma tecnologia capaz de abrir brechas no tecido da realidade, não para viagem espacial como Aetherion faria depois, mas para acessar diretamente o Vazio e seu potencial infinito.", { indent: true }),
        createParagraph("O líder desta civilização, cujo nome original foi perdido mas que agora é conhecido apenas como Vorynthrix, tornou-se obcecado com a ideia de superar o próprio Criador. Ele raciocinava que se o Criador surgira do Vazio e criara o universo, então um ser que controlasse o Vazio poderia criar seu próprio universo, com suas próprias regras, onde seria supremo. Esta ambição levou-o a consumir parte de um Fruto da Existência anterior, o que lhe concedeu poder suficiente para começar a implementar sua visão.", { indent: true }),
        createParagraph("O ato de tentar criar um universo separado, no entanto, violou a Lei da Pureza de forma tão flagrante que os dez líderes deste projeto foram rejeitados pelo próprio Vazio. Quando morreram - e morreram, pois mesmo com o poder do Fruto, não eram verdadeiramente imortais - suas essências foram negadas tanto pelo Vazio quanto pelo universo existente. Tornaram-se presos entre a existência e a não-existência, conscientes, sofredores, e terrivelmente poderosos em sua corrupção.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 Os Dez Primordiais")] }),
        createParagraph("Os dez Primordiais Corruptos, ou Nihilaryth como passaram a se chamar (significando 'Aqueles que o Vazio Rejeita'), desenvolveram ao longo de eons uma cultura e hierarquia própria. Presos fora da realidade normal, aprenderam a influenciar eventos dentro do universo através de manipulação sutil, corrompendo indivíduos e civilizações para servir seus propósitos. Seu objetivo final era simples e terrível: retornar à existência, não importa o custo para o universo.", { indent: true }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2200, 2800, 4360],
          margins: { top: 100, bottom: 100, left: 150, right: 150 },
          rows: [
            new TableRow({ tableHeader: true, children: [createHeaderCell("Nome", 2200), createHeaderCell("Título", 2800), createHeaderCell("Método de Corrupção", 4360)] }),
            new TableRow({ children: [createCell("Vorynthrix", { width: 2200, center: true }), createCell("O Testemunha", { width: 2800 }), createCell("Líder, manipulação através de visões e revelações", { width: 4360 })] }),
            new TableRow({ children: [createCell("Xaryntha", { width: 2200, center: true }), createCell("A Sussurrante", { width: 2800 }), createCell("Voz interna, sedução através de desejos secretos", { width: 4360 })] }),
            new TableRow({ children: [createCell("Thorynax", { width: 2200, center: true }), createCell("O Tormento", { width: 2800 }), createCell("Dor e sofrimento, corrompe através do alívio", { width: 4360 })] }),
            new TableRow({ children: [createCell("Veldryss", { width: 2200, center: true }), createCell("O Arquiteto", { width: 2800 }), createCell("Sistemas e estruturas, corrompe através de ordem", { width: 4360 })] }),
            new TableRow({ children: [createCell("Nyxaryon", { width: 2200, center: true }), createCell("O Silêncio", { width: 2800 }), createCell("Ausência, corrompe através do vazio emocional", { width: 4360 })] }),
            new TableRow({ children: [createCell("Krythanna", { width: 2200, center: true }), createCell("A Ilusionista", { width: 2800 }), createCell("Ilusões, corrompe através de realidades falsas", { width: 4360 })] }),
            new TableRow({ children: [createCell("Zaryphion", { width: 2200, center: true }), createCell("O Conquistador", { width: 2800 }), createCell("Domínio, corrompe através de promessas de poder", { width: 4360 })] }),
            new TableRow({ children: [createCell("Myrthanna", { width: 2200, center: true }), createCell("A Mãe das Sombras", { width: 2800 }), createCell("Cuidado distorcido, corrompe através de proteção", { width: 4360 })] }),
            new TableRow({ children: [createCell("Dravoryx", { width: 2200, center: true }), createCell("O Consumidor", { width: 2800 }), createCell("Fome, corrompe através da promessa de saciedade", { width: 4360 })] }),
            new TableRow({ children: [createCell("Sylvarion", { width: 2200, center: true }), createCell("O Corruptor de Raízes", { width: 2800 }), createCell("Natureza distorcida, corrompe através de vida", { width: 4360 })] })
          ]
        }),
        new Paragraph({ spacing: { before: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 Os Quatro Graus de Contaminação")] }),
        createParagraph("Os Nihilaryth desenvolveram um método sistemático para corromper seres dentro do universo, um processo que chamavam de Contaminação. Este processo era gradual, permitindo que a vítima não percebesse até que fosse tarde demais. Cada grau representava um estágio mais profundo de controle, com meios específicos de resistência que se tornavam progressivamente mais difíceis.", { indent: true }),

        new Paragraph({ numbering: { reference: "numbered-1", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "GRAU 1 - O Sussurro: O Nihilaryth estabelece contato inicial, apresentando-se como uma voz suave, um guia benevolente, uma presença reconfortante. A vítima ouve conselhos que parecem sábios, sugestões que parecem úteis. Neste estágio, a vítima pode resistir através de fé em outras fontes de orientação, questionamento ativo das vozes, ou simplesmente ignorando a presença.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-1", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "GRAU 2 - A Influência: A voz começa a afetar emoções e percepções. A vítima sente-se mais confiante quando segue os conselhos, mais ansiosa quando os ignora. Começa a confiar mais na voz do que em seus próprios julgamentos ou nos de outros. Resistência requer autoconhecimento profundo e conexões sociais fortes que ofereçam perspectivas alternativas.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-1", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "GRAU 3 - A Dependência: A vítima precisa da voz para funcionar normalmente. Sem ela, sente-se perdida, ansiosa, incapaz de tomar decisões. Isola-se de pessoas que poderiam oferecer ajuda genuína. A voz é agora sua única fonte de conforto e orientação. Resistência é extremamente difícil e requer intervenção externa significativa.", size: 22, font: "Times New Roman" })] }),
        new Paragraph({ numbering: { reference: "numbered-1", level: 0 }, spacing: { line: 312 }, children: [new TextRun({ text: "GRAU 4 - A Entrega: O Nihilaryth assume controle total. A consciência original da vítima é suprimida ou destruída, substituída pela vontade do Primordial Corrupto. O corpo torna-se um vaso para a essência do Nihilaryth, permitindo que ele atue diretamente no plano material. Não há resistência possível - a vítima está perdida.", size: 22, font: "Times New Roman" })] }),

        // CAPÍTULO 5 - A QUEDA
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. A Queda de Aetherion")] }),
        createParagraph("A queda de Aetherion não foi um evento único, mas um processo que se estendeu por séculos, iniciado muito antes que qualquer habitante da civilização percebesse o perigo. Os Nihilaryth haviam observado Aetherion crescer por milênios, reconhecendo na civilização uma oportunidade perfeita: uma espécie poderosa, avançada, mas com falhas exploráveis - particularmente ambição e medo.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 O Experimento de Tempestra")] }),
        createParagraph("O ponto de infiltração escolhido pelos Nihilaryth foi o continente de Tempestra, no planeta central de Aetherion, onde cientistas estudavam a possibilidade de expandir os Portais Quânticos para permitir acesso direto ao Vazio Primordial. Este projeto, chamado de Iniciativa Abismo, era ambicioso demais para seu próprio bem - seus objetivos incluíam harnessar diretamente o potencial infinito do Vazio para alimentar a civilização.", { indent: true }),
        createParagraph("A equipe de Tempestra não sabia que suas pesquisas estavam sendo sutilmente guiadas por Vorynthrix. O Nihilaryth não apareceu diretamente - em vez disso, influenciou sonhos, inspirou 'intuições' brilhantes, criou 'descobertas' convenientes que pareciam avanços genuínos. Durante décadas, os cientistas de Tempestra acreditaram estar fazendo progresso revolucionário, enquanto na verdade estavam construindo uma porta que permitiria aos Nihilaryth entrar no plano material.", { indent: true }),
        createParagraph("Quando o Portal Quântico experimental foi ativado, ele não abriu para o Vazio Primordial como planejado. Em vez disso, criou uma ponte para o espaço entre-existencial onde os Nihilaryth estavam presos. Por um momento breve, os cientistas perceberam o erro, mas era tarde demais. Os Dez Primordiais Corruptos atravessaram a brecha, não em forma física, mas como essências que imediatamente começaram a buscar hospedeiros.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 A Corrupção Se Espalha")] }),
        createParagraph("A natureza da queda de Aetherion foi particularmente terrível porque não foi imediata. Os Nihilaryth não destruíram a civilização diretamente - em vez disso, a corromperam de dentro para fora. Líderes começaram a tomar decisões que pareciam racionais mas que serviam aos interesses dos Primordiais. Grupos rivais formaram-se, cada um acreditando defender o verdadeiro caminho de Aetherion, enquanto todos estavam sendo manipulados.", { indent: true }),
        createParagraph("Alyndra, com o poder do Fruto da Existência, percebeu a corrupção antes de qualquer outro. Ela viu que a civilização estava condenada, que não havia forma de salvá-la. A contaminação havia se espalhado muito, enraizando-se profundamente na estrutura social e espiritual de Aetherion. Qualquer tentativa de purificar a civilização resultaria em sua destruição completa - o que, na visão dos Nihilaryth, era um resultado aceitável.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.3 O Sacrifício de Alyndra")] }),
        createParagraph("Alyndra tomou uma decisão que definiria todo o futuro do universo. Ela usaria seu poder para não salvar Aetherion - isso era impossível - mas para criar as condições para que algo melhor surgisse depois. Seu plano envolvia múltiplas ações simultâneas que, juntas, formariam a base para a eventual derrota dos Nihilaryth.", { indent: true }),
        createParagraph("Primeiro, ela extraiu do planeta Aetherion sua essência espiritual, condensando-a em sementes que seriam dispersadas pelo universo. Estas sementes conteriam o potencial para que uma nova civilização surgisse, uma que carregasse o melhor de Aetherion sem sua vulnerabilidade à corrupção. Esta extração causou a morte do planeta, que se tornou um corpo morto no espaço, mas preservou a alma de sua civilização.", { indent: true }),
        createParagraph("Segundo, ela criou os Nanobots Primordiais finais, uma versão aperfeiçoada da tecnologia que seria enviada ao futuro junto com as sementes. Estes nanobots continham não apenas tecnologia, mas fragmentos de conhecimento e memória que poderiam ser acessados por descendentes dignos.", { indent: true }),
        createParagraph("Terceiro, e mais crucialmente, ela preparou sua irmã Yggorath para o papel que precisaria desempenhar. Alyndra não poderia contar a Yggorath a verdade completa - o conhecimento seria demais para qualquer mente suportar. Em vez disso, ela manipulou eventos para que Yggorath fosse forçada a tomar certas decisões, a desenvolver certas habilidades, a tornar-se a pessoa que precisava ser.", { indent: true }),
        createParagraph("Finalmente, Alyndra confrontou os Nihilaryth diretamente. Ela usou todo o poder do Fruto da Existência para não destruí-los - isso era impossível, pois eles já estavam fora da existência normal - mas para dilatá-los, espalhando suas essências por uma porção tão vasta do universo que levaria eras para se recomporem. Este ato consumiu toda a energia vital de Alyndra, e ela morreu sabendo que seu sacrifício comprara tempo para o universo.", { indent: true }),

        // CAPÍTULO 6 - O CICLO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. O Ciclo Eterno - Início e Fim Conectados")] }),
        createParagraph("A compreensão do início e do fim no universo de Alyndras não é linear, mas circular. O que aconteceu na Era Primordial determina o que acontecerá no futuro distante, e as ações tomadas no futuro ecoarão de volta ao início. Este ciclo não é uma prisão, mas uma oportunidade - cada repetição oferece a chance de fazer escolhas diferentes, de alcançar um resultado melhor.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 A Profecia das Irmãs")] }),
        createParagraph("Antes mesmo de Aetherion existir, uma profecia foi gravada nos anais da Árvore da Existência. Ela falava de duas irmãs nascidas de linhagem antiga, uma representando conquista e ambição, outra proteção e sacrifício. Juntas, elas determinariam o destino do universo - seja sua salvação final ou sua destruição completa.", { indent: true }),
        createParagraph("A profecia revelava que a irmã mais velha consumiria o Fruto da Existência e faria escolhas que pareceriam traição, mas que seriam na verdade o maior ato de amor possível. A irmã mais jovem renasceria em forma diferente, tornando-se mãe de uma nova linhagem que eventualmente produziria a campeã capaz de enfrentar os Nihilaryth em sua forma completa.", { indent: true }),
        createParagraph("Esta profecia explica porque Alyndra manteve seu relacionamento com Yggorath em segredo. Se os Nihilaryth soubessem da existência da irmã mais jovem, teriam concentrado todos os esforços em destruí-la. A própria existência de Yggorath era a arma secreta de Alyndra, a esperança final que ela preservou através de seu sacrifício.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.2 O Padrão que se Repete")] }),
        createParagraph("A história subsequente ao sacrifício de Alyndra segue padrões que ecoam o início. Yggorath renasce no Paraíso Espiritual Inicial e cria os Seraphyens, dez filhos que representam os elementos primordiais. Entre estes, Ilios e Nyxalor destacam-se, não sabendo que são primos, que suas linhagens remontam às irmãs originais.", { indent: true }),
        createParagraph("O conflito entre Ilios e Nyxalor reflete, em menor escala, o conflito que poderia ter ocorrido entre Alyndra e Yggorath se as circunstâncias fossem diferentes. Nyxalor, como Alyndra, busca poder e transcendência. Ilios, como Yggorath, busca proteção e preservação. Mas onde Alyndra escolheu sacrificar-se por sua irmã, Nyxalor escolhe permitir que Vorynthrix o possua, invertendo o padrão.", { indent: true }),
        createParagraph("Na Era de Grazielly, o padrão manifesta-se novamente. Grazielly, descendente de Ilios e portadora da linhagem de Yggorath, enfrenta Elainy, descendente de Elaris mas temporariamente aliada ao poder de Nyxalor. As duas são rivais, depois aliadas, depois amigas íntimas, repetindo o ciclo de irmãs que poderiam ter sido inimigas mas escolheram não ser.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.3 O Fim que Virá")] }),
        createParagraph("O sacrifício de Alyndra não destruiu os Nihilaryth permanentemente - apenas os dispersou por eras. O tempo comprado está se esgotando. Em algum momento no futuro, os Dez Primordiais Corruptos se reconstituirão completamente e farão uma nova tentativa de consumir a existência.", { indent: true }),
        createParagraph("A batalha final não será travada por Grazielly ou Elainy, mas por Iris - a síntese de todas as linhagens, a união de poder espiritual e tecnologia, a evolução constante que não tem limites predeterminados. Iris representa algo que os Nihilaryth não podem compreender: não poder puro, não ambição desmedida, mas adaptação infinita e crescimento contínuo.", { indent: true }),
        createParagraph("O confronto final determinará se o universo continua ou se o ciclo reinicia. Se Iris triunfar, os Nihilaryth podem finalmente ser destruídos ou redimidos, e o universo pode evoluir para um novo estado onde a Lei da Pureza não seja mais necessária. Se Iris falhar, tudo recomeçará - mas cada iteração do ciclo carrega memória das anteriores, aumentando a chance de sucesso na próxima tentativa.", { indent: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.4 A Esperança no Coração do Ciclo")] }),
        createParagraph("Apesar da natureza aparentemente sombria do ciclo, existe esperança genuína no coração da história. O padrão não é uma maldição, mas uma estrutura de aprendizado. Cada repetição permite que mais seja compreendido, mais seja tentado, mais seja alcançado. O universo não está condenado a repetir o mesmo erro eternamente - está trabalhando gradualmente em direção a uma resolução.", { indent: true }),
        createParagraph("O amor entre irmãs, entre amigos, entre pais e filhos - estas conexões são o que torna o ciclo tolerável e a luta válida. Alyndra sacrificou-se por Yggorath não por dever, mas por amor. Grazielly sacrifica-se por Iris pelo mesmo motivo. E Iris, carregando o amor de ambas as linhagens, terá força para fazer o que ninguém antes conseguiu.", { indent: true }),
        createParagraph("O início e o fim estão conectados porque o amor que iniciou o ciclo - o amor de Alyndra por sua irmã - é o mesmo que o completará - o amor de Iris por seus pais, por seus amigos, pelo universo que herdou. Este amor não é fraqueza, mas a força mais poderosa que existe, capaz de transcender até mesmo a Lei da Pureza e criar algo verdadeiramente novo.", { indent: true }),

        // CONCLUSÃO
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. Considerações Finais")] }),
        createParagraph("A Era Primordial estabeleceu as fundações para tudo que viria depois. A criação do universo através da Vontade Pura, a formação da Árvore da Existência, a primeira produção do Fruto, o surgimento da civilização Aetherion, o segredo das irmãs Alyndra e Yggorath, a ascensão e queda pelos Nihilaryth, e o sacrifício final - cada evento desta era criou ondas que ainda ressoam através do tempo.", { indent: true }),
        createParagraph("Compreender a Era Primordial é essencial para compreender o destino do universo. Os personagens da Era de Grazielly e da Era de Iris não estão lutando apenas seus próprios vilões - estão completando uma guerra que começou bilhões de anos antes, retificando escolhas que foram feitas antes de suas linhagens sequer existirem. Este peso cósmico não é fardo, mas legado - a oportunidade de ser parte de algo maior do que qualquer vida individual.", { indent: true }),
        createParagraph("O ciclo que começou com duas irmãs terminará com seus descendentes. O amor que Alyndra carregava em seu coração quando consumiu o Fruto, quando sacrificou sua civilização, quando preparou sua irmã para o futuro - este mesmo amor flui através de Ilios, através de Grazielly, através de Iris. É a força que sustenta o universo através de eras de escuridão, e é a luz que eventualmente iluminará o fim de todo conflito.", { indent: true })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Era_Primordial.docx", buffer);
  console.log("Document created successfully!");
});
