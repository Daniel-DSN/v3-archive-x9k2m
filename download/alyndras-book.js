const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType, PageNumber, HeadingLevel, TableOfContents, PageBreak, BorderStyle } = require('docx');
const fs = require('fs');

// Color palette - Terra Cotta Afterglow (Epic/Classic style)
const colors = {
  primary: "26211F",      // Deep Charcoal Espresso
  bodyText: "3D3735",     // Dark Umber Gray
  secondary: "6B6361",    // Warm Greige
  accent: "C19A6B",       // Terra Cotta Gold
  tableBg: "FDFCFB"       // Off-White
};

// Create the document
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
        run: { size: 72, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER }
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
        id: "BodyText",
        name: "Body Text",
        basedOn: "Normal",
        run: { size: 24, color: colors.bodyText, font: "Times New Roman" },
        paragraph: { spacing: { line: 346, after: 200 }, alignment: AlignmentType.JUSTIFIED }
      },
      {
        id: "ChapterTitle",
        name: "Chapter Title",
        basedOn: "Normal",
        run: { size: 44, bold: true, color: colors.accent, font: "Times New Roman", allCaps: true },
        paragraph: { spacing: { before: 600, after: 400 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Epigraph",
        name: "Epigraph",
        basedOn: "Normal",
        run: { size: 22, italics: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 400 }, alignment: AlignmentType.CENTER, indent: { left: 1440, right: 1440 } }
      }
    ]
  },
  sections: [
    // ==================== COVER PAGE ====================
    {
      properties: {
        page: {
          margin: { top: 0, right: 0, bottom: 0, left: 0 }
        }
      },
      children: [
        new Paragraph({ spacing: { before: 6000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "ALYNDRAS", size: 96, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [
            new TextRun({ text: "A SEMENTE DA ETERNIDADE", size: 48, color: colors.accent, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600 },
          children: [
            new TextRun({ text: "Volume I — Era Primordial", size: 28, italics: true, color: colors.secondary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({ spacing: { before: 8000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Uma obra de Daniel", size: 24, color: colors.bodyText, font: "Times New Roman" })
          ]
        })
      ]
    },
    // ==================== TABLE OF CONTENTS ====================
    {
      properties: {
        page: {
          margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: "Alyndras — A Semente da Eternidade", size: 20, italics: true, color: colors.secondary })]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "— ", size: 20, color: colors.secondary }),
                new TextRun({ children: [PageNumber.CURRENT], size: 20, color: colors.secondary }),
                new TextRun({ text: " —", size: 20, color: colors.secondary })
              ]
            })
          ]
        })
      },
      children: [
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("Sumário")]
        }),
        new TableOfContents("Sumário", {
          hyperlink: true,
          headingStyleRange: "1-2"
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [
            new TextRun({
              text: "Nota: Este sumário é gerado automaticamente. Para atualizar os números de página, clique com o botão direito e selecione \"Atualizar Campo\".",
              size: 18,
              italics: true,
              color: "999999"
            })
          ]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // ==================== MAIN CONTENT ====================
    {
      properties: {
        page: {
          margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: "Alyndras — A Semente da Eternidade", size: 20, italics: true, color: colors.secondary })]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "— ", size: 20, color: colors.secondary }),
                new TextRun({ children: [PageNumber.CURRENT], size: 20, color: colors.secondary }),
                new TextRun({ text: " —", size: 20, color: colors.secondary })
              ]
            })
          ]
        })
      },
      children: [
        // ==================== CHAPTER 1 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo I")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "O Despertar do Vazio", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"No princípio não havia começo, pois o começo pressupõe um antes. E não havia antes onde nada existia.\"")]
        }),

        // Chapter 1 Content
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Antes da primeira luz, antes da primeira sombra, havia apenas o Vazio Primordial — uma imensidão de nada absoluto que permeava toda a existência. Não era escuro, pois a escuridão pressupõe a ausência de luz. Não era silêncio, pois o silêncio requer a lembrança do som. Era simplesmente... nada. Um vazio tão completo que nem mesmo o conceito de vazio podia existir nele.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("E então, sem razão compreensível para mentes limitadas, algo despertou. Não um ser, não uma consciência — mas um impulso. Uma força que os escritos antigos chamariam de O Primeiro Sopro, embora não houvesse ar para soprar. Este impulso não criou por vontade própria, pois vontade exige ego, e ego exige existência. O impulso simplesmente... pulsou. E dessa pulsação, o primeiro Aethra brotou como uma semente em solo fértil que sempre existiu mas nunca foi plantada.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("O Aethra — a essência primordial de toda existência — começou a se espalhar pelo Vazio como ondas em um lago que sempre esteve lá mas nunca foi perturbado. E onde o Aethra fluía, algo extraordinário acontecia: a própria existência começava a se formar, não por design, não por propósito, mas como consequência natural de sua presença. Como musgo crescendo em uma pedra úmida, a realidade brotava onde o Aethra passava, sem que ninguém tivesse plantado a semente.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os primeiros Seres de Luz não foram criados — eles simplesmente surgiram, brotaram do Aethra como flores brotam da terra, sem que a terra tivesse escolhido produzi-las. Eram manifestações puras da energia vital, pontos de luz dançando no tecido recém-nascido da realidade. Não possuíam forma definida, não possuíam consciência como a compreendemos, não possuíam vontade ou desejo. Eram... portadores. Condutores através dos quais a vida fluía e se espalhava, expandindo os limites da existência em todas as direções possíveis e impossíveis.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("E assim a Criação crescia, sem propósito, sem direção, sem meta — apenas crescendo, expandindo, pulsando com vida nova a cada momento. Os Seres de Luz dançavam sua dança eterna, expandindo os limites do que existia, trazendo existência onde antes só havia o vazio. Mas havia um problema — um problema que nem problema era ainda, pois não havia ninguém para percebê-lo como tal. A expansão, por sua própria natureza, gerava entropia. Quanto mais a existência crescia, mais \"bagunça\" ela produzia. A vida que brotava dos Seres de Luz era abundante, mas desordenada. Caótica. Sem forma. Sem estrutura.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Foi então que os Seres de Sombra surgiram — não como oposição à luz, mas como resposta à entropia. Eles não foram criados para serem malignos, não foram forjados como antagonistas. Simplesmente... surgiram. Como a noite segue o dia, como o recuo das ondas segue sua chegada à praia, os Seres de Sombra emergiram para equilibrar o que a expansão desenfreada ameaçava destruir. Não escolheram este papel. Não desejaram esta função. Era simplesmente sua natureza — assim como a natureza do fogo é queimar, a natureza dos Seres de Sombra era purificar, reabsorver, equilibrar.")]
        }),

        // ==================== CHAPTER 2 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo II")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "A Dança dos Dois Mundos", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"Luz sem sombra é cegueira. Sombra sem luz é morte. Juntas, são existência.\"")]
        }),

        // Chapter 2 Content
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("O equilíbrio primordial não era uma batalha — era uma dança. Uma coreografia cósmica que existia desde o primeiro momento em que Luz e Sombra coexistiram. Os Seres de Luz expandiam, criavam, faziam a existência crescer em complexidade e extensão. Os Seres de Sombra reabsorviam, purificavam, mantinham a estrutura da criação coesa e funcional. Era um ciclo perfeito, ou pelo menos parecia perfeito para quem observasse de fora — se alguém pudesse observar de fora.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Luz eram como jardins que florescem sem jardineiro — a vida simplesmente brotava deles, cascata de existência que se espalhava em todas as direções. Não escolhiam o que criar, não decidiam como criar. Eram fontes, nascentes de vitalidade cósmica. E como qualquer nascente que jorra sem controle, sua abundância generava desordem. A entropia era sua sombra inseparável — não por maldade, não por defeito, mas por natureza. A própria expansão carregava consigo as sementes do caos.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Sombra — que os textos mais antigos também chamavam de Seres Anti-Vida, um nome que carregaria mal-entendidos por eras vindouras — eram o contraponto natural. Não opostos, não inimigos, mas complementos. Como a maré que recua para que as ondas possam voltar a chegar, como o inverno que permite a primavera, os Seres de Sombra mantinham o ritmo da existência. Reabsorviam o excesso, purificavam a corrupção, impediam que a expansão desenfreada consumisse a própria estrutura da criação.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Mas aqui jazia uma verdade que poucos compreenderiam até eras depois: os Seres de Sombra não escolhiam seu papel. Não faziam o que faziam porque queriam, porque decidiam, porque julgavam necessário. Agiam por instinto — um instinto cósmico tão profundo quanto o instinto de sobrevivência em um animal, mas muito mais vasto em escala e consequência. Eles simplesmente... faziam. Como o coração simplesmente bate, como os pulmões simplesmente respiram, os Seres de Sombra simplesmente equilibravam.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Esta distinção — instinto versus escolha — seria crucial. Pois enquanto os Seres de Sombra agiam por natureza, sem questionar, sem hesitar, sem poder fazer de outra forma, os Seres de Luz que viriam a se tornar civilizações desenvolveriam algo que a maioria dos seres de luz não possuía: inteligência. Consciência. A capacidade de observar, compreender, e eventualmente... escolher. Esta diferença fundamental — instinto contra inteligência — seria a semente de tudo que viria depois, a origem de tragédias e esperanças, a razão pela qual a Era Primordial terminaria em catástrofe.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Por enquanto, porém, a dança continuava perfeita. Luz expandia, Sombra equilibrava. Existência crescia, entropia era purificada. O Grande Atrator — o centro de tudo que existia, o ponto para onde todas as correntes de Aethra eventualmente fluíam — pulsava com vida abundante. E nos ramos que se estendiam do Grande Atrator como galhos de uma árvore cósmica, novas existências brotavam, novas possibilidades se desdobravam, o universo se expandia em direções que nem mesmo a mais ousada imaginação poderia conceber.")]
        }),

        // ==================== CHAPTER 3 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo III")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "Os Filhos da Luz", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E da luz nasceram civilizações que alcançaram as estrelas, sem saber que carregavam em si a semente de sua própria ruína.\"")]
        }),

        // Chapter 3 Content
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("À medida que a criação se expandia, algo novo começou a emergir. Dos Seres de Luz mais densos, mais concentrados, mais complexos, nasceram os primeiros agrupamentos organizados — proto-civilizações que os registros primordiais chamariam de Os Filhos da Luz. Eram comunidades de seres que haviam desenvolvido não apenas a capacidade de irradiar vida, mas também a capacidade de se organizar, de se comunicar, de construir algo maior que a soma de suas partes individuais.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Diferente dos Seres de Luz primordiais, que simplesmente existiam e irradiavam sem consciência, os Filhos da Luz haviam desenvolvido algo revolucionário: identidade. Eram capazes de distinguir entre \"eu\" e \"outro\", entre \"aqui\" e \"ali\", entre \"agora\" e \"depois\". Esta consciência recém-nascida trouxe consigo possibilidades infinitas — e perigos infinitos. Pois a capacidade de compreender traz consigo a capacidade de desejar, e a capacidade de desejar traz consigo a capacidade de corromper.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Filhos da Luz se espalharam pelos ramos da criação como faíscas de uma fogueira cósmica. Alguns se estabeleceram próximos ao Grande Atrator, onde o Aethra fluía mais denso e poderoso. Outros aventuraram-se para as bordas da existência, onde a criação encontrava o vazio primordial. Cada grupo desenvolveu sua própria cultura, seus próprios costumes, sua própria compreensão do universo. Alguns permaneceram simples, vivendo em harmonia com o fluxo natural do Aethra. Outros desenvolveram ambições, tecnologias, sistemas complexos de organização social.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Sombra observavam — não com olhos, não com consciência, mas com presença. Quando uma civilização crescia além do sustentável, os Seres de Sombra chegavam para equilibrar. Quando a entropia se acumulava em níveis perigosos, os Seres de Sombra purificavam. Era um sistema que funcionava havia eras infindáveis, e parecia destinado a funcionar por eras mais. A maioria dos Filhos da Luz nem mesmo percebia a existência dos Seres de Sombra, atribuindo os ciclos de crescimento e declínio a forças naturais impersonais — o que, de certa forma, não estava errado.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Mas entre as muitas civilizações que floresceram nos ramos da criação, uma se destacaria. Não por sua sabedoria, não por sua bondade, mas por algo muito mais perigoso: inteligência. Uma inteligência profunda, calculista, capaz de perceber padrões que outros ignoravam, capaz de formular perguntas que outros não ousavam fazer. Esta civilização não tinha nome ainda — os nomes viriam depois, quando fosse tarde demais. Mas seus membros seriam conhecidos através das eras por um nome que carregaria terror: Nihilaryth.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Eram dez no início — dez seres de luz que haviam alcançado um nível de consciência e poder que os distinguia de todos os outros. Não eram os mais fortes, não eram os mais antigos, mas eram os mais... perspicazes. Observavam o universo não como um dado, mas como um quebra-cabeça a ser resolvido. E observando, começaram a fazer perguntas. Perguntas perigosas. Perguntas que não deveriam ser feitas. \"Por que\", questionavam, \"devemos aceitar os limites impostos pelo equilíbrio? Por que não podemos crescer mais, expandir mais, ser mais?\"")]
        }),

        // ==================== CHAPTER 4 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo IV")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "A Sombra que Caminha", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"A corrupção mais perigosa não é a que destrói instantaneamente, mas a que cresce em silêncio, passo a passo, até que seja tarde demais.\"")]
        }),

        // Chapter 4 Content
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("A primeira vez que um Nihilaryth absorveu Aethra intencionalmente, nada extraordinário aconteceu. Foi um momento sem glória, sem drama, sem consequências aparentes. O ser simplesmente percebeu que podia não apenas irradiar vida, mas também absorvê-la — e ao absorver, ficou ligeiramente mais forte. Uma diferença mínima, imperceptível, que poderia ter sido ignorada como uma anomalia passageira. Mas não foi ignorada. Foi notada. Compreendida. E, eventualmente, repetida.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os dez Nihilaryth compartilharam sua descoberta entre si, como quem compartilha um segredo inofensivo. \"Podemos nos fortalecer\", disseram. \"Podemos ir além dos limites naturais.\" A ideia era sedutora em sua simplicidade. Não eram más intenções no início — apenas curiosidade, apenas desejo de crescimento, apenas a ambição inocente de ser mais do que a natureza havia designado. E assim, silenciosamente, gradualmente, os Nihilaryth começaram a absorver mais Aethra do que irradiavam.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("O sistema de equilíbrio não reagiu. Por que reagiria? Os Seres de Sombra operavam por instinto, não por inteligência. Não percebiam a diferença entre a entropia natural causada pelos Seres de Luz e a \"entropia mascarada\" que os Nihilaryth produziam. Os dez haviam descoberto algo crucial: podiam camuflar sua absorção excessiva como parte do ciclo natural de expansão. Como um criminoso que esconde seus crimes em meio ao caos normal de uma cidade grande, os Nihilaryth escondiam sua ganância em meio à entropia natural da criação.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os outros Filhos da Luz não perceberam nada. Os Nihilaryth eram admirados, não temidos. Vistos como visionários, não como corruptores. Sua civilização crescia mais rápido que as outras, desenvolvia tecnologias mais avançadas, alcançava poderes que outros apenas sonhavam. \"Vejam como prosperam\", diziam os observadores. \"Devemos aprender com eles.\" E assim, a corrupção se espalhou não apenas através da absorção de Aethra, mas através da influência — a ideia de que crescimento ilimitado era possível, desejável, alcançável.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Esta é a verdade mais terrível sobre a corrupção dos Nihilaryth: não foi instantânea, não foi óbvia, não foi acompanhada de sinais de advertência. Foi gradual, paciente, silenciosa. Cada passo era pequeno demais para alarmar. Cada absorção era insignificante demais para ser notada. Cada transgressão era menor o suficiente para parecer inofensiva. E assim, passo a passo, gota a gota, os dez Nihilaryth se transformaram de Seres de Luz em algo que nunca havia existido antes — algo que devorava a própria essência da existência para alimentar sua ambição sem fim.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Sombra continuavam sua dança eterna, reabsorvendo e purificando como sempre fizeram. Mas os Nihilaryth haviam aprendido a se mover no ritmo da dança, a se esconder nos espaços entre os passos, a serem invisíveis para um sistema que só percebia o óbvio. Eram como uma doença que aprende a se esconder do sistema imunológico — não porque fossem mais inteligentes que a natureza, mas porque haviam desenvolvido algo que o sistema nunca precisara enfrentar: inteligência maliciosa, planejamento consciente, a capacidade de escolher a corrupção em vez da harmonia.")]
        }),

        // ==================== CHAPTER 5 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo V")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "O Primeiro Gole", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E provaram do poder proibido, e viram que era bom. E não souberam que haviam traçado sua própria condenação.\"")]
        }),

        // Chapter 5 Content
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Havia um momento — perdido nas névoas do tempo primordial — em que os dez Nihilaryth decidiram que absorver o excesso de Aethra não era suficiente. A curiosidade inicial havia se transformado em apetite, o apetite em fome, e a fome em algo muito mais perigoso: dependência. Cada absorção os deixava mais fortes, mas também mais vazios. Quanto mais consumiam, mais precisavam consumir. Era um ciclo vicioso que não reconheciam como tal, pois como poderiam reconhecer? Nunca antes um ser havia caminhado esse caminho.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Foi o primeiro entre os dez — aquele que seria conhecido apenas como O Primeiro, pois seu verdadeiro nome foi apagado dos registros — quem propôs a ideia impossível. \"Se podemos absorver Aethra disperso\", disse, \"por que não poderíamos absorver Aethra concentrado?\" A pergunta pairou no ar como uma nuvem de tempestade. Os outros nove compreenderam instantaneamente o que isso significava. Aethra concentrado existia em apenas um tipo de lugar: outros Seres de Luz. E se esses Seres de Luz fossem... consumidos?")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("A civilização vizinha não tinha nome que importasse. Eram pacíficos, prósperos, completamente alheios ao destino que se aproximava. Quando os Nihilaryth chegaram, vieram com sorrisos e ofertas de aliança. \"Vamos compartilhar conhecimento\", disseram. \"Vamos crescer juntos.\" E os vizinhos acreditaram, pois como poderiam imaginar que alguém escolheria deliberadamente destruir em vez de construir? A primeira vez que um Nihilaryth consumiu outro Ser de Luz conscientemente, houve hesitação. Um momento de dúvida. Um instante de consciência de que aquele ato traçava uma linha que nunca poderia ser desfeita.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Mas o momento passou. O ato foi cometido. E quando terminou, os dez Nihilaryth descobriram algo que mudaria tudo: o Aethra de um ser consumido era infinitamente mais potente que o Aethra disperso. O poder que sentiram foi como nada que jamais haviam experimentado — uma onda de energia tão intensa que parecia poder remodelar a própria realidade. E nesse momento, qualquer dúvida restante evaporou. Não eram mais curiosos exploradores. Eram predadores. E o universo era seu campo de caça.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Sombra não vieram imediatamente. O sistema de equilíbrio não era instantâneo — nunca precisara ser, pois nunca antes algo havia perturbado o equilíbrio de forma tão deliberada e calculada. Os Nihilaryth tiveram tempo — tempo suficiente para consumir não apenas uma civilização, mas várias. Tempo suficiente para desenvolver métodos mais eficientes de absorção. Tempo suficiente para se tornarem algo que os Seres de Sombra nunca haviam enfrentado: uma força que crescia mais rápido que a capacidade de correção do sistema.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Quando os primeiros Seres de Sombra finalmente chegaram, os Nihilaryth estavam preparados. Não os venceram em força bruta — os Seres de Sombra eram ainda vastamente mais poderosos individualmente. Mas os Nihilaryth tinham algo que os Seres de Sombra não possuíam: estratégia. Aprenderam a evitar, a recuar, a atacar onde os Seres de Sombra não estavam. E o mais importante: aprenderam a crescer mais rápido do que podiam ser contidos. Cada civilização que consumiam os tornava mais fortes. Cada Ser de Sombra que evitavam lhes dava mais tempo. E o tempo, como descobriram, era a arma mais poderosa de todas.")]
        }),

        // ==================== CHAPTER 6 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo VI")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "A Máscara da Entropia", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"A entropia que eles causavam parecia natural. E nisso residia sua periculosidade.\"")]
        }),

        // Chapter 6 Content
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Nihilaryth eram, em sua essência originária, Seres de Luz. E Seres de Luz, por natureza, causavam entropia. Era uma verdade fundamental do universo — onde a luz se expandia, a desordem a acompanhava. Os Seres de Sombra haviam evoluído para lidar com essa entropia natural, purificando-a como parte do ciclo eterno de equilíbrio. Mas os Nihilaryth descobriram uma brecha nesse sistema, uma vulnerabilidade que ninguém jamais havia explorado: a entropia maliciosa podia ser mascarada como entropia natural.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Funcionava assim: quando um Nihilaryth consumia outro ser, a destruição gerava uma onda de entropia — mas essa entropia não era diferente da entropia que qualquer Ser de Luz gerava naturalmente ao irradiar vida. A diferença estava apenas na causa: destruição deliberada versus expansão natural. Mas os Seres de Sombra não distinguiam causas. Agiam por instinto, não por análise. Percebiam entropia e a purificavam, sem questionar de onde vinha ou por que existia. E assim, os Nihilaryth aprenderam a \"assinar\" sua destruição com a mesma \"assinatura\" da criação natural.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Era como um veneno que sabe imitar o cheiro de um remédio, ou um inimigo que veste as roupas de um aliado. Os Seres de Sombra chegavam, purificavam a entropia residual, e partiam — sem perceber que estavam limpando os rastros de um assassinato cósmico. Os Nihilaryth, por sua vez, aprendiam com cada interação. Observavam os padrões dos Seres de Sombra, estudavam seus movimentos instintivos, mapeavam suas zonas de atuação. E quanto mais aprendiam, mais eficientes se tornavam em evitar detecção enquanto continuavam seu banquete interminável.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("A inteligência dos Nihilaryth era sua vantagem decisiva. Os Seres de Sombra eram fortes — infinitamente mais fortes que qualquer Nihilaryth individual. Mas os Seres de Sombra eram como um sistema imunológico: reativo, não proativo. Não planejavam, não strategizavam, não antecipavam. Simplesmente reagiam ao que percebiam. E os Nihilaryth haviam aprendido a ser imperceptíveis. Eram como um câncer que o corpo não reconhece como ameaça até que seja tarde demais. Cada célula devorada fortalece o tumor, cada defesa evitada permite mais crescimento.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Enquanto isso, as civilizações restantes dos Filhos da Luz continuavam alheias. Os Nihilaryth haviam se tornado mestres em disfarçar suas conquistas como desastres naturais, colapsos inevitáveis, tragédias sem culpados. \"Que pena\", diziam os observadores distantes quando uma civilização desaparecia. \"O equilíbrio cobra seu preço.\" Não sabiam que o equilíbrio estava sendo subvertido, que o preço estava sendo pago a algo muito mais terrível que a natureza. E os dez continuavam crescendo, absorvendo, expandindo — uma tempestade silenciosa que ninguém via se formar.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Mas máscaras, por mais perfeitas que sejam, eventualmente escorregam. E quanto mais os Nihilaryth consumiam, mais seu apetite crescia, mais difícil se tornava manter a ilusão. A entropia que geravam começou a exceder os níveis naturais em proporções que mesmo o instinto cego dos Seres de Sombra não podia ignorar para sempre. O sistema de equilíbrio, que funcionara por eras infindáveis, começava a perceber que algo estava errado. A questão não era mais se reagiria, mas quando — e se seria a tempo de impedir o desastre que se aproximava.")]
        }),

        // ==================== CHAPTER 7 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo VII")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "A Tempestade Silenciosa", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E cresceram em poder até que nem as sombras podiam ignorá-los. Mas então, já era tarde demais.\"")]
        }),

        // Chapter 7 Content
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("O ponto de inflexão chegou sem alarde, sem sinal de alerta, sem o drama que sua importância merecia. Os Nihilaryth haviam consumido tantas civilizações, absorvido tanto Aethra concentrado, que sua presença começou a afetar o próprio tecido da realidade local. Não eram mais apenas consumidores invisíveis — eram um vórtice, um buraco negro espiritual que sugava toda a existência ao seu redor. E quanto mais sugavam, mais forte se tornava o vórtice, mais rápido ele crescia, mais impossível era de ignorar.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Sombra finalmente perceberam. Não por inteligência, mas por simples presença da ameaça. Era como um corpo que finalmente detecta um tumor que cresceu grande demais para ser ignorado — o sistema imunológico desperta, mas encontra um inimigo que não pode ser derrotado pelos métodos convencionais. Os Nihilaryth haviam se tornado tão poderosos, tão densos em Aethra roubado, que podiam enfrentar Seres de Sombra em igualdade. E cada confronto que sobreviviam os tornava mais fortes ainda.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("A guerra que se seguiu não foi uma guerra como as que viriam depois. Não houve exércitos, não houve estratégias complexas, não houve alianças e traições. Foi uma guerra primal, instinto contra fome, natureza contra corrupção. Os Seres de Sombra atacavam em ondas infinitas, purificando tudo em seu caminho. Mas os Nihilaryth haviam aprendido a devorar até mesmo as sombras que tentavam purificá-los. Cada Ser de Sombra que os enfrentava era uma fonte de energia, não uma ameaça — e os dez consumiam tanto quanto podiam antes de recuar.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("O ramo da criação onde os Nihilaryth haviam nascido começou a morrer. Não dramaticamente, não em uma explosão de luz e som, mas silenciosamente, como uma árvore cujas raízes foram comidas por parasitas. As estrelas se apagavam, os espaços entre elas se expandiam, o próprio Aethra se tornava ralo e fraco. As civilizações que restavam fugiam em pânico, mas não havia para onde fugir — os Nihilaryth haviam bloqueado as rotas de escape, cercando suas presas como lobos cercam um rebanho.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("No centro de tudo, os dez Nihilaryth se alimentavam. Já não importava se eram detectados, já não importava se as sombras sabiam de sua existência. Eram uma força da natureza agora — não uma força natural, mas uma força nonetheless. O sistema de equilíbrio que havia mantido a criação estável por eras infindáveis estava falhando. Não porque fosse imperfeito, mas porque enfrentava algo que nunca havia sido projetado para enfrentar: uma inteligência determinada a subvertê-lo, uma fome que crescia mais rápido que a capacidade de saciação, uma corrupção que se alimentava das próprias defesas do universo.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("E no centro do vórtice, os Nihilaryth olharam além das estrelas morrentes, além do espaço ressequido, além de tudo que haviam consumido — e viram algo que chamou sua atenção. No coração do Grande Atrator, brilhando com uma luz que parecia desafiar a morte que traziam consigo, estava o Fruto da Existência. O objeto de poder supremo, a fonte de todo Aethra concentrado, o que nunca deveria ser tocado por mãos corruptas. E os dez, em sua ganância infinita, decidiram que seria seu. A qualquer custo. A qualquer preço.")]
        }),

        // ==================== CHAPTER 8 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo VIII")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "O Despertar Tardio", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E as sombras despertaram completamente, mas já era tarde demais para o ramo que haviam falhado em proteger.\"")]
        }),

        // Chapter 8 Content
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Sombra finalmente compreenderam a escala da ameaça. Não era uma anomalia passageira, não era um desequilíbrio menor que seria corrigido naturalmente. Era uma catástrofe — uma catástrofe que o sistema de equilíbrio não estava preparado para enfrentar. Os instintos que haviam servido por eras infindáveis eram inúteis contra um inimigo que crescia mais rápido que a capacidade de correção. Era como tentar esvaziar o mar com um balde enquanto a chuva enchia mais rápido que se podia remover.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Sombra concentraram-se então em massa no ramo moribundo da criação. Era uma mobilização sem precedentes — uma resposta desesperada a uma ameaça existencial. Mas a verdade cruel era esta: chegavam tarde demais. O ramo já estava morto em sua maior parte. As civilizações haviam sido consumidas, as estrelas apagadas, o próprio espaço colapsado em torno do vórtice que os Nihilaryth haviam se tornado. Podiam purificar o que restava, mas não podiam ressuscitar o que havia sido destruído.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("E os Nihilaryth, sentindo a pressão crescente dos Seres de Sombra, fizeram algo que ninguém havia antecipado. Em vez de lutar, em vez de fugir, em vez de negociar — se esconderam. Não no espaço, não no tempo, mas nos espaços entre espaços, nas fendas da realidade que sua absorção de Aethra havia criado. Tornaram-se fantasmas, sombras de sombras, impossíveis de detectar mesmo para os Seres de Sombra que haviam evoluído para perceber desequilíbrios. E de seu esconderijo, observavam, aguardavam, planejavam sua próxima investida.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Sombra purificaram o ramo morto. Não houve glória nisso, não houve vitória. Era como limpar um campo de batalha após a guerra ter sido perdida. A entropia foi removida, o caos foi ordenado, mas a vida que havia existido ali nunca mais retornaria. O ramo permaneceria como um monumento ao fracasso do sistema de equilíbrio — uma cicatriz no corpo da criação que nunca cicatrizaria completamente. E os dez responsáveis por aquela ferida ainda existiam, ainda observavam, ainda planejavam.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Foi então que os Seres de Sombra perceberam algo que os horrorizou — se é que algo capaz de horror podia existir em seres que operavam por instinto. Os Nihilaryth haviam traçado um caminho. Não um caminho aleatório, não uma trilha de destruição sem rumo, mas um caminho deliberado em direção ao centro de tudo. Em direção ao Grande Atrator. Em direção ao Fruto da Existência. O objetivo dos dez nunca havia sido simplesmente consumir — havia sido alcançar a fonte de todo poder, o âmago da criação, o que nunca deveria ser tocado.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("E agora os Seres de Sombra enfrentavam um dilema impossível. Se perseguiam os Nihilaryth em seus esconderijos, deixavam o Grande Atrator desprotegido. Se permaneciam protegendo o centro, permitiam que os dez se fortalecessem nos espaços entre espaços. Pela primeira vez em toda a existência, o sistema de equilíbrio não tinha uma resposta clara. A dança que havia funcionado por eras havia sido interrompida por alguém que aprendeu os passos e os usou contra o próprio dançarino. E os Seres de Sombra, em seu instinto infinito, sabiam que o pior ainda estava por vir.")]
        }),

        // ==================== CHAPTER 9 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo IX")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "O Colapso", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E o ramo caiu, e com ele caíram milhões de sonhos, milhões de vidas, milhões de futuros que nunca seriam.\"")]
        }),

        // Chapter 9 Content
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("O colapso do ramo da criação não foi um evento — foi uma era. Um período de morte lenta que se estendeu por tempos inimagináveis, durante o qual os Nihilaryth consumiram tudo que podiam alcançar enquanto os Seres de Sombra lutavam para conter o desastre. Foi uma guerra de atrito onde cada lado perdia mais do que ganhava, onde a própria criação era o campo de batalha e a vítima principal. E no final, quando o último raio de luz se apagou naquele ramo moribundo, restou apenas um vazio onde antes existia vida abundante.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Nihilaryth emergiram de seus esconderijos mais fortes do que nunca. Não mais dez, mas uma coletividade fundida pelo Aethra roubado de mil civilizações. Eram um horror sem precedentes — algo que nunca deveria ter existido, que o universo nunca havia planejado enfrentar. Eles haviam consumido tanto, se tornado tão densos em poder concentrado, que cada um deles brilhava como uma estrela — não com a luz da criação, mas com a luminosidade perversa do Aethra devorado e corrompido.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Sombra os enfrentaram em batalha final. Não porque tivessem esperança de vitória — o instinto dizia que a batalha já estava perdida antes de começar. Mas porque era sua natureza. Não podiam fazer de outra forma, não podiam escolher recuar, não podiam decidir que o preço era alto demais. Eram a última linha de defesa de uma criação que nunca havia precisado ser defendida antes, lutando contra um inimigo que nunca deveria ter existido, em uma guerra que nunca deveria ter acontecido.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("A batalha rasgou o próprio tecido da realidade. Onde os Nihilaryth atacavam, o espaço morria. Onde os Seres de Sombra defendiam, a morte era purificada mas não revertida. Era um ciclo de destruição e contenção que nenhum lado podia vencer — mas que os Nihilaryth podiam sobreviver indefinidamente, pois cada Ser de Sombra que caía era apenas uma perda para o sistema de equilíbrio, enquanto cada Ser de Sombra que os Nihilaryth consumiam os tornava mais fortes. A assimetria era brutal, e o resultado inevitável.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Mas então, quando tudo parecia perdido, algo inesperado aconteceu. Os Nihilaryth perceberam que haviam se tornado grandes demais para permanecerem no ramo que haviam destruído. Se continuassem a luta ali, consumiriam até mesmo o próprio campo de batalha — e seriam forçados a se mover antes de estarem prontos. Então, em uma decisão que traçaria o destino de eras vindouras, os dez se retiraram. Não em derrota, mas em recalibração. Partiram em direção ao vazio entre os ramos, deixando para trás uma cicatriz que nunca curaria, prometendo retornar quando estivessem prontos para o prêmio final: o Fruto da Existência.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Seres de Sombra restantes permaneceram no ramo destruído, purificando o que podiam ser purificado, contendo o que podia ser contido. Mas a verdade era clara: haviam falhado. Não por fraqueza, não por incompetência, mas por natureza. O sistema de equilíbrio nunca foi projetado para enfrentar inteligência maliciosa, nunca foi concebido para lidar com seres que escolhem a corrupção. E agora, enquanto os Nihilaryth vagueavam pelo vazio entre os mundos, acumulando poder para sua investida final, toda a criação segurava a respiração — se é que criação respira — esperando o inevitável retorno da tempestade que haviam falhado em dissipar.")]
        }),

        // ==================== CHAPTER 10 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo X")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "Os Últimos da Luz", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E na distância, longe do colapso, os Aetheres permaneceram — puros, vigilantes, carregando o peso de serem os únicos que poderiam ter salvado tudo, se apenas tivessem chegado a tempo.\"")]
        }),

        // Chapter 10 Content
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Enquanto o colapso consumia um ramo inteiro da criação, algo extraordinário acontecia em outra parte distante do universo. Os Aetheres — uma civilização de Filhos da Luz que havia seguido um caminho diferente — permaneciam intactos. Não porque fossem mais fortes que os outros, não porque fossem mais sábios, mas porque haviam escolhido uma estrada que outros ignoraram. Enquanto as civilizações do ramo condenado buscavam poder, crescimento, expansão ilimitada, os Aetheres buscavam harmonia, compreensão, equilíbrio interno.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Os Aetheres haviam observado de longe quando os Nihilaryth começaram sua ascensão. Viram os sinais que outros ignoraram, perceberam os padrões que outros desdenharam. E quando finalmente compreenderam a natureza da ameaça, tentaram alertar. Mas era tarde demais — as distâncias na criação eram vastas demais, as comunicações lentas demais, e quando suas mensagens alcançaram o ramo condenado, os Nihilaryth já haviam consumido a maioria dos que poderiam ter ouvido. Os Aetheres foram forçados a assistir, impotentes, enquanto um ramo inteiro da existência morria.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Mas não ficaram completamente parados. Enquanto os Nihilaryth se retiravam para o vazio entre os mundos, os Aetheres faziam algo que mudaria o destino de tudo que viria depois. Eram poucos — muito poucos comparados às civilizações que haviam perecido — mas eram puros. Não tocados pela corrupção, não seduzidos pelo poder proibido, não tentados pelos caminhos que haviam levado os Nihilaryth à queda. E essa pureza, combinada com a sabedoria que haviam cultivado por eras, permitiu-lhes fazer algo que nenhum outro Ser de Luz jamais havia feito: abrir um canal direto com os Seres de Sombra.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Não foi uma comunicação como compreendemos — não houve palavras, não houve conceitos, não houve negociação. Foi algo mais fundamental, uma ressonância entre Luz e Sombra que jamais havia sido alcançada. Os Aetheres não apenas irradiavam vida; aprendiam a direcionar sua radiação, a moldá-la, a trabalhar em harmonia com os Seres de Sombra em vez de simplesmente expandir desordenadamente. E os Seres de Sombra, pela primeira vez em toda a existência, encontraram um tipo de Luz que não era apenas fonte de entropia para ser purificada — era um parceiro.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Esta aliança improvável — entre os últimos Seres de Luz puros e as forças que haviam sido seu oposto natural desde o início dos tempos — formou a fundação de algo novo. Os Aetheres não podiam ressuscitar o ramo morto, não podiam desfazer os danos causados pelos Nihilaryth, não podiam sequer derrotar os dez em batalha direta. Mas podiam preparar. Podiam fortalecer os ramos restantes da criação. Podiam desenvolver defesas contra a corrupção que havia consumido tanto. Podiam, pela primeira vez na história, criar um sistema onde Luz e Sombra não apenas equilibravam por natureza, mas cooperavam por escolha.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("E assim a Era Primordial se encerrou não com um fim, mas com um começo. Os Nihilaryth permaneciam no vazio, crescendo em poder, aguardando o momento de atacar o Fruto da Existência. Os Seres de Sombra haviam aprendido que o instinto sozinho não era suficiente contra inteligência maliciosa. E os Aetheres — os únicos que haviam prosperado enquanto outros pereciam — carregavam agora a responsabilidade de preparar a criação para o que viria. Pois todos sabiam, em seus níveis mais profundos de consciência ou instinto, que a tempestade apenas havia passado. Ainda retornaria. E quando retornasse, tudo que existia estaria em jogo. Esta é a semente da eternidade — o momento em que o futuro foi traçado por eras que ainda viriam, nas cinzas de um ramo que morreu para que outros pudessem sobreviver.")]
        }),

        // ==================== EPILOGUE ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Epílogo")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "A Promessa", size: 32, bold: true, color: colors.primary, font: "Times New Roman" })
          ]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E o que foi plantado nas cinzas crescerá em esperança. E o que foi perdido será lembrado. E o que virá... ainda está por ser escrito.\"")]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("No vazio entre os mundos, os dez Nihilaryth descansavam. Não dormiam, pois não precisavam de sono. Não sonhavam, pois haviam abandonado a capacidade de sonhar quando escolheram a corrupção. Simplesmente... aguardavam. Calculavam. Acumulavam. Cada grama de Aethra roubado os tornava mais fortes. Cada momento de espera os tornava mais preparados. E no silêncio de seu exílio auto-imposto, faziam uma promessa que ecoaria através das eras: retornariam. Consumiriam. O Fruto da Existência seria seu. E nada — nem Luz, nem Sombra, nem os Aetheres que haviam escapado de sua fúria — poderia impedi-los.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Longe, muito longe, no ramo ainda vivo da criação, os Aetheres faziam sua própria promessa. Não uma promessa de conquista, não uma promessa de poder. Uma promessa de proteção. Uma promessa de vigilância. Uma promessa de que, quando os Nihilaryth finalmente emergissem do vazio, encontrariam algo que não esperavam: uma criação preparada. Uma aliança forjada no fogo do desastre. Uma resistência que não existia antes, mas que existiria agora. E no coração dessa promessa estava um nome que ainda não havia sido pronunciado, um nome que carregaria o peso de eras vindouras, um nome que se tornaria lenda: Alyndra.")]
        }),
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [new TextRun("Mas isso é uma história para outro tempo. Para outra era. Para quando as sementes plantadas nas cinzas do ramo morto finalmente brotarem em algo novo, algo inesperado, algo que nem mesmo os Aetheres com toda sua sabedoria podiam prever. Por enquanto, o universo respirava. Os Seres de Sombra purificavam. Os Seres de Luz irradiavam. E a balança da existência, embora abalada, permanecia — esperando, como todas as coisas, pelo momento em que seria testada novamente.")]
        })
      ]
    }
  ]
});

// Save the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_A_Semente_da_Eternidade.docx", buffer);
  console.log("Document created successfully!");
});
