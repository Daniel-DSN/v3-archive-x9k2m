const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType, PageNumber, HeadingLevel, TableOfContents, PageBreak } = require('docx');
const fs = require('fs');

// Color palette - Terra Cotta Afterglow
const colors = {
  primary: "26211F",
  bodyText: "3D3735",
  secondary: "6B6361",
  accent: "C19A6B",
  tableBg: "FDFCFB"
};

// Helper function for body paragraphs
const bodyPara = (text, indent = true) => new Paragraph({
  style: "BodyText",
  indent: indent ? { firstLine: 480 } : undefined,
  children: [new TextRun(text)]
});

// Helper for dialogue paragraphs
const dialoguePara = (speaker, dialogue, isInternal = false) => new Paragraph({
  style: "BodyText",
  indent: { firstLine: 480 },
  children: [
    new TextRun({ text: speaker ? `— ${speaker}: ` : "— ", bold: speaker ? true : false }),
    new TextRun({ text: dialogue, italics: isInternal })
  ]
});

// Helper for simple dialogue (no speaker tag)
const simpleDialogue = (text) => new Paragraph({
  style: "BodyText",
  indent: { firstLine: 480 },
  children: [new TextRun({ text: `— ${text}` })]
});

// Helper for scene breaks
const sceneBreak = () => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 400, after: 400 },
  children: [new TextRun({ text: "• • •", color: colors.accent })]
});

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
        page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } }
      },
      children: [
        new Paragraph({ spacing: { before: 6000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "ALYNDRAS", size: 96, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [new TextRun({ text: "A SEMENTE DA ETERNIDADE", size: 48, color: colors.accent })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600 },
          children: [new TextRun({ text: "Volume I — Era Primordial", size: 28, italics: true, color: colors.secondary })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "Edição Remasterizada", size: 22, color: colors.secondary })]
        }),
        new Paragraph({ spacing: { before: 8000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Uma obra de Daniel", size: 24, color: colors.bodyText })]
        })
      ]
    },
    // ==================== TABLE OF CONTENTS ====================
    {
      properties: {
        page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Alyndras — A Semente da Eternidade", size: 20, italics: true, color: colors.secondary })]
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
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Sumário")] }),
        new TableOfContents("Sumário", { hyperlink: true, headingStyleRange: "1-2" }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [new TextRun({
            text: "Nota: Clique com o botão direito no sumário e selecione \"Atualizar Campo\" para os números de página corretos.",
            size: 18, italics: true, color: "999999"
          })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // ==================== MAIN CONTENT ====================
    {
      properties: {
        page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Alyndras — A Semente da Eternidade", size: 20, italics: true, color: colors.secondary })]
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
        // ==================== PROLOGUE - FRAME STORY ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Prólogo")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "O Contador de Histórias", size: 32, bold: true, color: colors.primary })]
        }),

        bodyPara("A chama tremia na lamparina antiga, projetando sombras que dançavam nas paredes de pedra do templo abandonado. Grazy cruzou os braços, os olhos fixos no velho à sua frente — um homem que parecia ter mais rugas que estrelas no céu, e olhos que brilhavam com uma luz que não vinha de nenhuma vela."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Você quer saber sobre a Era Primordial? — ", bold: true }),
            new TextRun("a voz do velho era como folhas secas arrastadas pelo vento. — Quer saber como tudo começou... e quase terminou?")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Quero entender — ", bold: true }),
            new TextRun("Grazy respondeu, tentando manter a impaciência fora da voz. — Entender de onde vieram os Nihilaryth. Por que eles existem. Por que nós existimos.")
          ]
        }),

        bodyPara("O velho sorriu, um sorriso que parecia conhecer segredos que nem os deuses recordavam."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Então sente-se, jovem Aethere. Pois esta história não é sobre deuses e demônios, não como você imagina. É sobre escolhas. Sobre pessoas — se é que podemos chamá-los assim. Sobre como a luz mais brilhante pode carregar a semente da própria escuridão.")
          ]
        }),

        bodyPara("Ele fez uma pausa, e por um momento, Grazy jurou ver lágrimas nos olhos do ancião."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eu estava lá, sabe? — ", bold: true }),
            new TextRun("o velho sussurrou. — Não como testemunha passiva. Eu era um deles. Conheci os dez. Chorai com eles. Lutei ao lado deles. E, no final... falhei com todos.")
          ]
        }),

        bodyPara("Grazy sentiu um arrepio percorrer sua espinha. A lenda dizia que apenas os Aetheres haviam sobrevivido à Era Primordial. Se este homem dizia a verdade..."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Seu nome — ", bold: true }),
            new TextRun("Grazy pediu, a voz baixa. — Qual é seu nome verdadeiro?")
          ]
        }),

        bodyPara("O velho olhou para a chama, e por um instante, sua forma pareceu mudar — tornou-se mais jovem, mais alto, uma figura de poder e tristeza."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Kaelon — ", bold: true }),
            new TextRun("ele respondeu. — Eu era Kaelon. O Terceiro dos Dez. O que hesitou quando deveria ter agido. O que viu a queda chegando e nada fez para impedi-la.")
          ]
        }),

        bodyPara("O silêncio que se seguiu foi pesado como mil eras de arrependimento."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Conte-me tudo — ", bold: true }),
            new TextRun("Grazy sussurrou. — Desde o início.")
          ]
        }),

        bodyPara("E Kaelon, o traidor arrependido, o sobrevivente relutante, começou a falar."),

        sceneBreak(),

        // ==================== CHAPTER 1 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo I")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "O Despertar do Vazio", size: 32, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"No princípio não havia começo, pois o começo pressupõe um antes. E não havia antes onde nada existia.\"")]
        }),

        bodyPara("Antes da primeira luz, antes da primeira sombra, havia apenas o Vazio Primordial. Não era escuro — a escuridão pressupõe a ausência de luz. Era simplesmente... nada. Um vazio tão completo que nem mesmo o conceito de vazio podia existir nele."),

        bodyPara("E então, algo despertou. Não um ser, não uma consciência — mas um impulso. Uma força que os escritos antigos chamariam de O Primeiro Sopro. Este impulso não criou por vontade própria. Simplesmente pulsou. E dessa pulsação, o primeiro Aethra brotou."),

        bodyPara("Os Seres de Luz não foram criados — eles surgiram. Brotações de Aethra que irradiavam existência como o sol irradia calor. Eram portadores de vida, não criadores. A vida fluía através deles, expandindo os limites da realidade."),

        bodyPara("— Você precisa entender, Grazy — Kaelon disse, sua voz ganhando força. — Nós não escolhemos existir. Simplesmente... estávamos lá. Como bolhas na superfície de um rio. Algumas bolhas são maiores, outras menores. Algumas duram mais, outras estouram rápido. Mas nenhuma bolha escolhe ser bolha."),

        bodyPara("Os Seres de Sombra surgiram como resposta à entropia. Não como oposição à luz, mas como complemento. Como a maré que recua para que as ondas possam voltar a chegar."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eles eram o que chamamos de Anti-Vida — ", bold: true }),
            new TextRun("Kaelon continuou, um sorriso amargo nos lábios. — Nome terrível, não é? Soa como algo maligno. Mas não eram. Eram... lixeiros cósmicos. Limparam a bagunça que nós, Seres de Luz, causávamos naturalmente.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Então era um sistema perfeito? — ", bold: true }),
            new TextRun("Grazy perguntou.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Perfeito? — ", bold: true }),
            new TextRun("Kaelon riu, uma risada sem humor. — Nada é perfeito, jovem. O sistema funcionava. Isso não significa perfeição. Significa apenas que... bem, que ninguém havia descoberto como quebrá-lo. Até nós.")
          ]
        }),

        sceneBreak(),

        // ==================== CHAPTER 2 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo II")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "Os Dez", size: 32, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E entre milhões de Seres de Luz, dez se destacaram. Não por bondade, não por sabedoria, mas por algo muito mais perigoso: inteligência.\"")]
        }),

        bodyPara("— Você já ouviu falar de nós como monstros — Kaelon disse, os olhos perdidos em memórias distantes. — Como demônios que emergiram do nada para devorar a criação. Mas a verdade é bem mais complicada. E muito mais triste."),

        bodyPara("Entre os milhões de Seres de Luz que surgiram durante a Era Primordial, alguns desenvolveram algo que a maioria não possuíam: consciência de si mesmos. Identidade. A capacidade de dizer \"eu sou\" e compreender o que isso significava."),

        bodyPara("Nós éramos dez. Dez pontos de luz que haviam alcançado um nível de autoconsciência que nos distinguia de todos os outros. E, como qualquer grupo de indivíduos, éramos muito diferentes entre nós."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Veyrath era o primeiro — ", bold: true }),
            new TextRun("Kaelon começou, contando nos dedos enrugados. — O mais velho, o que nos encontrou primeiro. Ele tinha... presença. Sabe quando alguém entra numa sala e todo mundo nota? Era assim com Veyrath. Não por arrogância, mas por natureza. Ele era um líder nato.")
          ]
        }),

        bodyPara("Nymira, a segunda, era a mente. Enquanto Veyrath inspirava, Nymira calculava. Cada passo, cada consequência, cada possibilidade. Ela via padrões onde outros viam caos."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— E depois estava eu — ", bold: true }),
            new TextRun("Kaelon disse, a voz baixa. — O terceiro. O que pensava demais. O que questionava quando deveria apenas seguir.")
          ]
        }),

        bodyPara("Zypher, o quarto, era a língua de prata. Podia convencer uma estrela a brilhar mais forte, ou uma sombra a recuar. Morvath, o quinto, nunca confiava em ninguém completamente — sempre olhando por cima do ombro, sempre esperando a traição."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Aethra — ", bold: true }),
            new TextRun("Kaelon fez uma pausa, um sorriso irônico. — Sim, ele escolheu esse nome. Quer ser mais poderoso que a própria essência da existência. Ambição pura, sem o peso da reflexão.")
          ]
        }),

        bodyPara("Lyria, a sétima, falava pouco. Mas quando falava, todos ouviam. Dormu, o oitavo, resolvia tudo com força bruta — físico e direto. Ishara, a nona, era a mística do grupo, sempre conectada com energias que os outros nem percebiam."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— E Velros — ", bold: true }),
            new TextRun("a voz de Kaelon falhou por um momento. — O décimo. O mais jovem. O mais... inocente. Ele nos seguia como irmãos mais velhos. Confio em nós. Confio em todos nós. Até que não pôde mais.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Você parece ter afeto por eles — ", bold: true }),
            new TextRun("Grazy observou. — Mesmo depois de tudo.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eles eram minha família — ", bold: true }),
            new TextRun("Kaelon respondeu simplesmente. — Quando você passa eras junto de alguém, não importa o que eles se tornem. Você lembra do que eram. Do que poderiam ter sido.")
          ]
        }),

        sceneBreak(),

        // ==================== CHAPTER 3 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo III")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "A Primeira Pergunta", size: 32, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"Toda queda começa com uma pergunta. E toda pergunta começa com a curiosidade de saber o que existe além dos limites.\"")]
        }),

        bodyPara("— Foi num ciclo que não tenho como medir — Kaelon disse. — Estávamos reunidos como sempre fazíamos, flutuando num espaço entre estrelas. Dez pontos de luz conversando sobre... tudo e nada."),

        // FLASHBACK SCENE
        bodyPara("O espaço ao redor deles brilhava com a luz de mil estrelas recém-nascidas. Os dez pairavam em formação dispersa, suas energias pulsando em harmônia."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Você já parou pra pensar? — ", bold: true }),
            new TextRun("Veyrath começou, sua luz brilhando mais intensamente que as dos outros. — Sobre por que fazemos o que fazemos?")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Nós irradiamos — ", bold: true }),
            new TextRun("Dormu respondeu prontamente. — É o que somos. É como respirar.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Mas por quê? — ", bold: true }),
            new TextRun("Veyrath insistiu. — Por que irradiar e não... absorver? Por que expandir e não contrair?")
          ]
        }),

        bodyPara("O silêncio que se seguiu foi pesado. A pergunta pairou entre eles como uma nuvem de tempestade."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Isso soa perigoso — ", bold: true }),
            new TextRun("Kaelon disse, sua voz carregada de preocupação. — Absorver... não é nossa natureza.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Quem definiu nossa natureza? — ", bold: true }),
            new TextRun("Aethra interveio, movendo-se para ficar ao lado de Veyrath. — Quem disse que não podemos ser mais do que somos?")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— As sombras — ", bold: true }),
            new TextRun("Lyria falou, sua voz suave como sempre. — Elas existem para nos limitar. Para garantir que não passemos dos limites.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— E se os limites estiverem errados? — ", bold: true }),
            new TextRun("Zypher sugeriu, sua voz melíflua. — Se formos capazes de mais... e estivermos nos segurando por medo?")
          ]
        }),

        bodyPara("Foi então que Velros, o mais jovem, falou pela primeira vez na conversa:"),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eu... eu gosto do que somos — ", bold: true }),
            new TextRun("ele disse, hesitante. — Gosto de irradiar. De ver a vida brotar onde passo. Por que precisamos mudar?")
          ]
        }),

        bodyPara("Os outros se voltaram para ele, e por um momento, houve hesitação. Mas foi apenas um momento."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Não se trata de mudar, Velros — ", bold: true }),
            new TextRun("Nymira disse, sua voz calma e lógica. — Se trata de evoluir. De descobrir nosso potencial completo. Não é isso que todos os seres buscam?")
          ]
        }),

        // BACK TO PRESENT
        bodyPara("— E você acreditou nisso? — Grazy perguntou."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eu quis acreditar — ", bold: true }),
            new TextRun("Kaelon respondeu, os olhos baixos. — Naquela época, parecia... lógico. Por que não explorar nossos limites? Por que não descobrir o que mais podíamos ser? Não sabia... não sabíamos... o que isso significaria.")
          ]
        }),

        sceneBreak(),

        // ==================== CHAPTER 4 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo IV")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "O Primeiro Gole", size: 32, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E provaram do poder proibido, e viram que era bom. E não souberam que haviam traçado sua própria condenação.\"")]
        }),

        bodyPara("— O primeiro ato deliberado de absorção foi acidental — Kaelon explicou. — Ou pelo menos, foi o que nos dissemos."),

        // FLASHBACK SCENE
        bodyPara("Veyrath havia encontrado uma concentração de Aethra disperso — restos de uma estrela que morrera naturalmente. Em vez de deixar o Aethra se dissipar como sempre faziam, ele hesitou."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— E se... — ", bold: true }),
            new TextRun("ele murmurou para si mesmo, e então, quase sem querer, puxou o Aethra disperso para dentro de si.")
          ]
        }),

        bodyPara("A sensação foi indescritível. Como beber água após eras de sede que não sabia que tinha. Como encontrar uma parte de si mesmo que nem sabia que faltava."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eu me senti... mais — ", bold: true }),
            new TextRun("Veyrath relatou aos outros depois. — Mais completo. Mais... eu.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Isso não parece certo — ", bold: true }),
            new TextRun("Kaelon disse, mas sua voz faltou convicção. — Nós irradiamos. Não absorvemos.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— E as sombras? — ", bold: true }),
            new TextRun("Morvath perguntou, olhando ao redor com desconfiança. — Elas não vieram nos corrigir?")
          ]
        }),

        bodyPara("Todos esperaram. Observaram. Mas nenhum Ser de Sombra apareceu."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Nada aconteceu — ", bold: true }),
            new TextRun("Nymira concluiu, uma faísca de fascínio em sua luz. — O sistema não detectou. Para as sombras, isso foi... normal.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Então podemos fazer de novo? — ", bold: true }),
            new TextRun("Aethra perguntou, já se movendo em direção a outra concentração de Aethra disperso.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Esperem! — ", bold: true }),
            new TextRun("Kaelon tentou. — Talvez devêssemos discutir isso primeiro. Entender o que—")
          ]
        }),

        bodyPara("Mas já era tarde. Aethra havia absorvido outra porção. E depois Dormu. E depois Zypher. Um por um, os dez experimentaram a sensação nova — exceto Kaelon, que hesitou, e Velros, que parecia assustado demais para tentar."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Vamos, Velros — ", bold: true }),
            new TextRun("Veyrath incentivou, estendendo uma mão de luz. — É apenas uma pequena coisa. Não faz mal a ninguém.")
          ]
        }),

        bodyPara("Velros olhou para Kaelon, buscando orientação. Mas Kaelon não disse nada. Não conseguiu. E nesse silêncio, Velros tomou sua decisão — e absorveu."),

        // BACK TO PRESENT
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Foi isso? — ", bold: true }),
            new TextRun("Grazy perguntou. — O momento em que tudo mudou?")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Foi um dos momentos — ", bold: true }),
            new TextRun("Kaelon corrigiu. — A queda não é um evento, Grazy. É uma descida. Degrau por degrau. E naquele momento, demos o primeiro passo numa escada que não sabíamos para onde levava.")
          ]
        }),

        sceneBreak(),

        // ==================== CHAPTER 5 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo V")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "A Máscara", size: 32, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"A entropia que causávamos parecia natural. E nisso residia nossa vantagem — e nossa maldição.\"")]
        }),

        bodyPara("— Vocês descobriram como enganar o sistema — Grazy disse, não como pergunta."),

        bodyPara("— Descobrimos — Kaelon confirmou. — Ou melhor, Nymira descobriu. Ela percebeu que a entropia gerada pela absorção era idêntica à entropia gerada pela irradiação natural. Para os Seres de Sombra, era tudo a mesma coisa."),

        // FLASHBACK SCENE
        bodyPara("Nymira reuniu os nove companheiros para explicar sua descoberta."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Funciona assim — ", bold: true }),
            new TextRun("ela disse, sua luz pulsando com entusiasmo intelectual. — Quando irradiamos, causamos entropia como subproduto. Quando absorvemos, também causamos entropia. A diferença é a origem, não o resultado.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— E as sombras só percebem o resultado — ", bold: true }),
            new TextRun("Aethra completou, entendendo. — Não a origem.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Exato. Elas purificam a entropia, não investigam a causa. Para elas, absorção e irradiação geram a mesma 'assinatura' de desequilíbrio.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Isso significa... — ", bold: true }),
            new TextRun("Zypher começou, um sorriso crescendo em sua luz.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Significa que podemos absorver tanto quanto quisermos — ", bold: true }),
            new TextRun("Nymira concluiu. — Desde que mantenhamos os níveis de entropia dentro do 'normal'.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Mas isso é... enganar — ", bold: true }),
            new TextRun("Velros disse, sua voz pequena. — Não é errado?")
          ]
        }),

        bodyPara("Todos se voltaram para ele. O silêncio era pesado."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Errado segundo quem, Velros? — ", bold: true }),
            new TextRun("Veyrath perguntou suavemente. — Segundo as sombras que nem percebem? Segundo as estrelas que já morreram? Segundo quem?")
          ]
        }),

        bodyPara("Velros não teve resposta. E mais uma vez, seu silêncio foi interpretado como consentimento."),

        // BACK TO PRESENT
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Você não tentou detê-los? — ", bold: true }),
            new TextRun("Grazy perguntou, a acusação clara na voz.")
          ]
        }),

        bodyPara("Kaelon olhou para suas mãos — mãos que haviam visto eras de existência."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Tentei — ", bold: true }),
            new TextRun("ele disse finalmente. — Na minha cabeça. Planejei conversas, argumentos, apelos. Mas quando chegava a hora... eu congelava. Pensava: 'E se eles estiverem certos? E se eu for o errado?' Sabe, Grazy, é fácil olhar para trás e ver o que deveria ter sido feito. Mas no momento... no momento, tudo parece possível. Todas as opções parecem válidas.")
          ]
        }),

        bodyPara("— A indecisão é uma escolha também — Grazy disse duramente."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eu sei — ", bold: true }),
            new TextRun("Kaelon respondeu, e pela primeira vez, lágrimas escorreram por seu rosto enrugado. — Acredite, jovem Aethere, eu sei disso melhor que qualquer um. Carrego esse conhecimento há mais eras do que você consegue imaginar.")
          ]
        }),

        sceneBreak(),

        // ==================== CHAPTER 6 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo VI")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "A Primeira Vítima", size: 32, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"Há uma linha que separa a curiosidade da crueldade. E nós a cruzamos sem nem perceber.\"")]
        }),

        bodyPara("— Aethra disperso não era mais suficiente — Kaelon continuou, sua voz mais pesada. — Quando você descobre que pode ter mais, 'suficiente' deixa de existir."),

        bodyPara("A ideia surgiu numa reunião, como todas as ideias perigosas. Aethra foi quem propôs."),

        // FLASHBACK SCENE
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— E se o Aethra disperso nos torna mais fortes — ", bold: true }),
            new TextRun("ele disse, sua luz brilhando com uma intensidade nova, — imagine o que o Aethra concentrado poderia fazer.")
          ]
        }),

        bodyPara("O silêncio que se seguiu foi diferente dos anteriores. Este era um silêncio de compreensão — e de medo."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Você está falando de outros Seres de Luz — ", bold: true }),
            new TextRun("Lyria disse, sua voz suave carregada de algo que raramente mostrava: horror. — Está falando de... consumir outros.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Não consumir — ", bold: true }),
            new TextRun("Zypher corrigiu rapidamente. — Absorver. Incorporar. Eles continuariam existindo... dentro de nós.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Isso é a mesma coisa! — ", bold: true }),
            new TextRun("Kaelon explodiu, a primeira vez que erguia a voz. — Você está propondo assassinato!")
          ]
        }),

        bodyPara("Todos se voltaram para ele. Nove pares de olhos — será que Seres de Luz têm olhos? — fixados em sua pessoa."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Assassinato, Kaelon? — ", bold: true }),
            new TextRun("Veyrath perguntou, sua voz perigosamente calma. — Ou evolução? Nós não somos como as outras civilizações. Somos mais conscientes, mais poderosos, mais... dignos de existir. Por que não incorporar aqueles que mal compreendem sua própria existência?")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Isso é loucura — ", bold: true }),
            new TextRun("Velros sussurrou. — Não podemos... não devemos...")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Ninguém está forçando você, Velros — ", bold: true }),
            new TextRun("Nymira disse gentilmente. — Pode apenas... observar. Ver como funciona. E depois decidir.")
          ]
        }),

        bodyPara("Foi assim que a primeira vez aconteceu. Uma civilização vizinha — pacífica, próspera, completamente alheia. Aethra liderou o ataque, e quando terminou..."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Foi incrível — ", bold: true }),
            new TextRun("ele disse depois, sua luz mais brilhante que nunca. — O poder... a sensação... não há palavras.")
          ]
        }),

        bodyPara("Kaelon vomitou. Ou fez o equivalente para um Ser de Luz. E Velros... Velros se afastou dos outros e não falou por eras."),

        // BACK TO PRESENT
        bodyPara("— E depois disso, não houve volta — Grazy disse."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Depois disso — ", bold: true }),
            new TextRun("Kaelon confirmou, — a linha foi cruzada. Cada civilização consumida nos tornava mais fortes. Mais viciados. Menos capazes de parar. Era como uma fome que crescia a cada mordida.")
          ]
        }),

        sceneBreak(),

        // ==================== CHAPTER 7 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo VII")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "A Tempestade Silenciosa", size: 32, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E cresceram em poder até que nem as sombras podiam ignorá-los. Mas então, já era tarde demais.\"")]
        }),

        bodyPara("— As sombras eventualmente perceberam — Kaelon disse. — Mas o sistema de equilíbrio nunca foi projetado para isso."),

        bodyPara("Os Seres de Sombra operavam por instinto, não por inteligência. Eram como o sistema imunológico do universo — reativo, não proativo. Quando finalmente detectaram a anomalia que os Nihilaryth haviam se tornado, os dez já eram poderosos demais para serem contidos facilmente."),

        // FLASHBACK SCENE
        bodyPara("A batalha foi terrível. Seres de Sombra surgindo em ondas infinitas, purificando tudo em seu caminho. Mas os Nihilaryth haviam aprendido a devorar até mesmo as sombras."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eles são mais fracos do que pensei! — ", bold: true }),
            new TextRun("Dormu riu, consumindo uma sombra que tentava purificá-lo. — Podemos alimentar-nos deles também!")
          ]
        }),

        bodyPara("Mas Kaelon viu a verdade que os outros ignoravam: para cada sombra consumida, dez mais surgiam. O sistema de equilíbrio era infinito, implacável. Não podia ser vencido — apenas adiado."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Isso não vai funcionar! — ", bold: true }),
            new TextRun("Kaelon gritou para Veyrath. — As sombras não terminam! São parte do próprio universo!")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Então vamos para onde elas não podem nos alcançar — ", bold: true }),
            new TextRun("Veyrath respondeu, um sorriso selvagem em sua luz. — Nymira encontrou algo. Um caminho para o centro. Para o Fruto da Existência.")
          ]
        }),

        bodyPara("Kaelon sentiu seu mundo congelar."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Você não pode estar falando sério. O Fruto é... é...")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— A fonte de todo poder? — ", bold: true }),
            new TextRun("Veyrath completou. — Sim. Imagine o que poderíamos fazer com ele, Kaelon. Poderíamos dominar as próprias sombras. Podemos dominar tudo.")
          ]
        }),

        // BACK TO PRESENT
        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Foi então que soube — ", bold: true }),
            new TextRun("Kaelon disse, a voz partida. — Soube que tinha perdido. Não a batalha, mas meus irmãos. A família que conhecia havia morrido, substituída por... algo mais. Algo que eu não reconhecia.")
          ]
        }),

        sceneBreak(),

        // ==================== CHAPTER 8 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo VIII")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "A Escolha de Kaelon", size: 32, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"Todo ser enfrenta um momento em que deve escolher quem é. O meu momento chegou tarde demais.\"")]
        }),

        bodyPara("— O que você fez? — Grazy perguntou, a voz baixa."),

        bodyPara("Kaelon ficou em silêncio por um longo momento, a chama da lamparina tremulando."),

        // FLASHBACK SCENE
        bodyPara("Eles estavam nas bordas do ramo moribundo, preparando-se para a jornada em direção ao Grande Atrator. Os nove brilhavam com poder roubado, suas formas distorcidas pela absorção excessiva."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Você vem, Kaelon? — ", bold: true }),
            new TextRun("Veyrath perguntou, mas não era realmente uma pergunta.")
          ]
        }),

        bodyPara("Kaelon olhou para seus companheiros — os seres que haviam sido sua família por eras infindáveis. Viu a fome em seus olhos, a ganância que substituíra a curiosidade, a corrupção que substituíra a luz."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Não — ", bold: true }),
            new TextRun("ele disse, e a palavra pareceu ecoar através de toda a criação. — Não vou.")
          ]
        }),

        bodyPara("O silêncio que se seguiu foi absoluto."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Você está escolhendo ficar? — ", bold: true }),
            new TextRun("Nymira perguntou, a voz carregada de algo que poderia ser tristeza. — Depois de tudo? Depois de todas as eras juntos?")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Estou escolhendo quem quero ser — ", bold: true }),
            new TextRun("Kaelon respondeu, e pela primeira vez em eras, sua voz estava firme. — E não é isso. Não é o que nos tornamos.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Você é um tolo — ", bold: true }),
            new TextRun("Aethra cuspiu. — Quando tivermos o Fruto, voltaremos. E então você vai implorar por misericórdia.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Talvez — ", bold: true }),
            new TextRun("Kaelon disse. — Mas pelo menos vou implorar sendo eu mesmo. Não... isso.")
          ]
        }),

        bodyPara("E então Velros se aproximou dele. O mais jovem, o mais inocente, o que sempre seguira os outros."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Kaelon... — ", bold: true }),
            new TextRun("ele sussurrou. — Eu não quero ir. Mas tenho medo de ficar.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Então venha comigo — ", bold: true }),
            new TextRun("Kaelon estendeu a mão. — Podemos encontrar outro caminho. Podemos—")
          ]
        }),

        bodyPara("Mas Velros olhou para os oito, para a família que conhecera, para o poder que prometiam. E lentamente, se afastou de Kaelon."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Me desculpe — ", bold: true }),
            new TextRun("ele sussurrou. — Eu não consigo.")
          ]
        }),

        // BACK TO PRESENT
        bodyPara("Kaelon chorava abertamente agora, lágrimas descendo pelo rosto enrugado."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eu deixei ele ir — ", bold: true }),
            new TextRun("ele disse entre soluços. — Velros... ele era bom. Era puro. E eu o deixei ir com eles. Deveria ter forçado. Deveria ter...")
          ]
        }),

        bodyPara("Grazy não disse nada. Não havia nada a dizer."),

        sceneBreak(),

        // ==================== CHAPTER 9 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo IX")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "O Colapso", size: 32, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E o ramo caiu, e com ele caíram milhões de sonhos, milhões de vidas, milhões de futuros que nunca seriam.\"")]
        }),

        bodyPara("— Os nove partiram em direção ao Grande Atrator — Kaelon continuou, enxugando as lágrimas. — E eu... eu fugi."),

        bodyPara("Fugi para o único lugar que conhecia onde poderia encontrar ajuda: os Aetheres. Uma civilização distante que havia seguido um caminho diferente — um caminho de harmonia em vez de ambição."),

        // FLASHBACK SCENE
        bodyPara("Os Aetheres o receberam com desconfiança. Kaelon era, afinal, um dos Dez. Um dos Nihilaryth, como já eram conhecidos nas lendas de terror."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Por que devemos confiar em você? — ", bold: true }),
            new TextRun("a líder dos Aetheres perguntou, sua luz pura e firme. — Você é um deles.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eu era — ", bold: true }),
            new TextRun("Kaelon respondeu, ajoelhando-se. — Mas escolhi não ser mais. E preciso de sua ajuda para detê-los.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Detê-los? — ", bold: true }),
            new TextRun("outro Aethere riu amargamente. — Você viu o que eles fizeram com um ramo inteiro da criação? E quer que nós... o que sobrou de nós... os detenha?")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Não sozinhos — ", bold: true }),
            new TextRun("Kaelon disse. — Mas juntos com as sombras. Eu sei como eles pensam. Sei como operam. Posso ajudar.")
          ]
        }),

        bodyPara("Os Aetheres debateram por eras — ou o que pareceu eras. Mas no final, concordaram. A alternativa era esperar a morte chegar."),

        // BACK TO PRESENT
        bodyPara("— E funcionou? — Grazy perguntou."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Funcionou o suficiente — ", bold: true }),
            new TextRun("Kaelon disse. — Os nove foram contidos. Não derrotados, não destruídos, mas... retardados. Forçados a recuar para os espaços entre espaços. Para o vazio entre os mundos. Lá ficaram, acumulando poder, aguardando o momento certo para tentar novamente.")
          ]
        }),

        bodyPara("— E Velros?"),

        bodyPara("Kaelon desviou o olhar."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Velros... ele hesitou no último momento. Quando finalmente alcançaram as bordas do Grande Atrator, ele tentou recuar. Tentou voltar. — ", bold: true }),
            new TextRun("A voz de Kaelon falhou. — Os outros não o deixaram. Disseram que sabia demais. Que não podiam arriscar traição. Então...")
          ]
        }),

        bodyPara("— Eles o consumiram — Grazy completou, horrorizado."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eles o consumiram — ", bold: true }),
            new TextRun("Kaelon confirmou. — O irmão mais novo que os seguia por lealdade. O que nunca quis nada além de pertencer. Consumido pelos próprios irmãos.")
          ]
        }),

        sceneBreak(),

        // ==================== CHAPTER 10 ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Capítulo X")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "Os Últimos da Luz", size: 32, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          style: "Epigraph",
          children: [new TextRun("\"E na distância, longe do colapso, os Aetheres permaneceram — puros, vigilantes, carregando o peso de serem os únicos que poderiam ter salvado tudo, se apenas tivessem chegado a tempo.\"")]
        }),

        bodyPara("— Os Aetheres me aceitaram como um de seus — Kaelon disse. — Não por confiança, mas por necessidade. Eu era a única ligação com o inimigo que tinham."),

        bodyPara("Juntos, desenvolveram algo que nunca havia existido antes: uma cooperação consciente entre Luz e Sombra. Os Seres de Sombra nunca haviam trabalhado com Seres de Luz — apenas equilibravam-os. Mas com a orientação de Kaelon e a pureza dos Aetheres, um novo sistema começou a emergir."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Não foi uma vitória — ", bold: true }),
            new TextRun("Kaelon enfatizou. — Foi uma contenção. Os nove ainda existem. Ainda crescem. Ainda aguardam. Mas agora estamos preparados. Ou pelo menos, mais preparados do que estávamos.")
          ]
        }),

        bodyPara("— E o Fruto da Existência? — Grazy perguntou. — Ainda está em perigo?"),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Sempre estará — ", bold: true }),
            new TextRun("Kaelon respondeu. — Enquanto os nove existirem, o Fruto será seu objetivo final. E eventualmente... eventualmente eles tentarão novamente. Com mais poder. Com mais conhecimento. E talvez, na próxima vez...")
          ]
        }),

        bodyPara("Ele deixou a frase no ar, o peso do possível desastre óbvio."),

        sceneBreak(),

        // ==================== EPILOGUE ====================
        new Paragraph({
          style: "ChapterTitle",
          children: [new TextRun("Epílogo")]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "A Promessa", size: 32, bold: true, color: colors.primary })]
        }),

        bodyPara("A chama da lamparina estava quase apagada quando Kaelon terminou sua história. Grazy permaneceu em silêncio por um longo momento, processando tudo que ouvira."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Por que me contou isso? — ", bold: true }),
            new TextRun("ele finalmente perguntou. — Por que agora?")
          ]
        }),

        bodyPara("Kaelon se levantou lentamente, seus ossos rangendo com a idade."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Porque eles estão voltando, Grazy — ", bold: true }),
            new TextRun("ele disse, a voz subitamente forte. — Posso sentir. Depois de eras no vazio, os nove finalmente encontraram o caminho de volta. E desta vez, precisamos estar prontos.")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— E você acha que eu posso fazer algo? — ", bold: true }),
            new TextRun("Grazy perguntou, incrédulo. — Eu sou apenas um Aethere. Não sou especial. Não sou—")
          ]
        }),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Você é a semente — ", bold: true }),
            new TextRun("Kaelon interrompeu. — A semente do que precisa crescer. Dos Aetheres, você é o único com potencial para se tornar algo mais. Algo capaz de enfrentar os nove.")
          ]
        }),

        bodyPara("Ele se aproximou de Grazy, colocando uma mão enrugada em seu ombro."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Eu falhei com Velros. Falhei com os outros. Falhei com toda a criação quando não tive coragem de agir quando podia ter feito diferença. — ", bold: true }),
            new TextRun("Seus olhos encontraram os de Grazy. — Não vou falhar com você. Não vou deixar another jovem ser consumido pela indecisão. Por isso vou treiná-lo. Vou lhe dar tudo que sei. E quando os nove finalmente surgirem do vazio... você estará pronto.")
          ]
        }),

        bodyPara("Grazy engoliu em seco, o peso da responsabilidade descendo sobre seus ombros."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— E se eu falhar também? — ", bold: true }),
            new TextRun("ele perguntou, a voz baixa.")
          ]
        }),

        bodyPara("Kaelon sorriu — um sorriso triste, mas cheio de algo que Grazy não esperava: esperança."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— Então tentaremos de novo. E de novo. E de novo. — ", bold: true }),
            new TextRun("Ele se virou para a porta do templo. — Essa é a única promessa que posso fazer. A promessa de continuar tentando. A promessa de que, enquanto houver luz, haverá esperança. E enquanto houver esperança...")
          ]
        }),

        bodyPara("Ele parou na entrada, a luz da lua prateada delineando sua forma antiga."),

        new Paragraph({
          style: "BodyText",
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: "— ...nada está perdido. Amanhã ao nascer do sol, seu treinamento começa. Durma bem, Grazy. Pois a partir de amanhã... você vai precisar de toda a força que puder reunir.")
          ]
        }),

        bodyPara("E com isso, o antigo Nihilaryth — o traidor arrependido, o sobrevivente relutante, o contador de histórias — desapareceu na noite, deixando Grazy sozinho com a chama morrente e o peso de um destino que mal começava a compreender."),

        bodyPara("Em algum lugar no vazio entre os mundos, nove pontos de luz esperavam, observavam, acumulavam poder. Seu retorno não era questão de se, mas de quando. E quando chegassem, tudo que existia estaria em jogo.", false),

        bodyPara("Esta é a semente da eternidade — o momento em que o futuro foi traçado por eras que ainda viriam.", false)
      ]
    }
  ]
});

// Save the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_A_Semente_da_Eternidade_Remasterizado.docx", buffer);
  console.log("Document created successfully!");
});
