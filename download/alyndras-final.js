const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType, PageNumber, HeadingLevel, TableOfContents, PageBreak } = require('docx');
const fs = require('fs');

const colors = {
  primary: "26211F",
  bodyText: "3D3735",
  secondary: "6B6361",
  accent: "C19A6B"
};

const bodyPara = (text, indent = true) => new Paragraph({
  style: "BodyText",
  indent: indent ? { firstLine: 480 } : undefined,
  children: [new TextRun(text)]
});

const sceneBreak = () => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 400, after: 400 },
  children: [new TextRun({ text: "* * *", color: colors.accent })]
});

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal", run: { size: 72, bold: true, color: colors.primary }, paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, color: colors.primary }, paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "BodyText", name: "Body Text", basedOn: "Normal", run: { size: 24, color: colors.bodyText }, paragraph: { spacing: { line: 346, after: 200 }, alignment: AlignmentType.JUSTIFIED } },
      { id: "ChapterTitle", name: "Chapter Title", basedOn: "Normal", run: { size: 44, bold: true, color: colors.accent, allCaps: true }, paragraph: { spacing: { before: 600, after: 400 }, alignment: AlignmentType.CENTER } },
      { id: "Epigraph", name: "Epigraph", basedOn: "Normal", run: { size: 22, italics: true, color: colors.secondary }, paragraph: { spacing: { before: 200, after: 400 }, alignment: AlignmentType.CENTER, indent: { left: 1440, right: 1440 } } }
    ]
  },
  sections: [
    // COVER PAGE
    { properties: { page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } } }, children: [
      new Paragraph({ spacing: { before: 6000 }, children: [] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ALYNDRAS", size: 96, bold: true, color: colors.primary })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: "A SEMENTE DA ETERNIDADE", size: 48, color: colors.accent })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 }, children: [new TextRun({ text: "Volume I — Era Primordial", size: 28, italics: true, color: colors.secondary })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: "Edicao Remasterizada", size: 22, color: colors.secondary })] }),
      new Paragraph({ spacing: { before: 8000 }, children: [] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Uma obra de Daniel", size: 24, color: colors.bodyText })] })
    ]},
    // TOC
    { properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Alyndras", size: 20, italics: true, color: colors.secondary })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "— ", size: 20, color: colors.secondary }), new TextRun({ children: [PageNumber.CURRENT], size: 20, color: colors.secondary }), new TextRun({ text: " —", size: 20, color: colors.secondary })] })] }) },
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Sumario")] }),
        new TableOfContents("Sumario", { hyperlink: true, headingStyleRange: "1-2" }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: "Nota: Clique com o botao direito no sumario e selecione Atualizar Campo.", size: 18, italics: true, color: "999999" })] }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // MAIN CONTENT
    { properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Alyndras — A Semente da Eternidade", size: 20, italics: true, color: colors.secondary })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "— ", size: 20, color: colors.secondary }), new TextRun({ children: [PageNumber.CURRENT], size: 20, color: colors.secondary }), new TextRun({ text: " —", size: 20, color: colors.secondary })] })] }) },
      children: [
        // PROLOGUE
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Prologo")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "O Contador de Historias", size: 32, bold: true, color: colors.primary })] }),
        
        bodyPara("A chama tremia na lamparina antiga, projetando sombras que dancavam nas paredes de pedra do templo abandonado. Grazy cruzou os bracos, os olhos fixos no velho a sua frente — um homem que parecia ter mais rugas que estrelas no ceu, e olhos que brilhavam com uma luz que nao vinha de nenhuma vela."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce quer saber sobre a Era Primordial? — ", bold: true }),
          new TextRun("a voz do velho era como folhas secas arrastadas pelo vento. — Quer saber como tudo comecou... e quase terminou?")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Quero entender — ", bold: true }),
          new TextRun("Grazy respondeu, tentando manter a impaciencia fora da voz. — Entender de onde vieram os Nihilaryth. Por que eles existem. Por que nos existimos.")
        ]}),
        
        bodyPara("O velho sorriu, um sorriso que parecia conhecer segredos que nem os deuses recordavam."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Entao sente-se, jovem Aethere. Pois esta historia nao e sobre deuses e demonios, nao como voce imagina. E sobre escolhas. Sobre pessoas — se e que podemos chamá-los assim. Sobre como a luz mais brilhante pode carregar a semente da propria escuridao.")
        ]}),
        
        bodyPara("Ele fez uma pausa, e por um momento, Grazy jurou ver lagrimas nos olhos do ancião."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eu estava la, sabe? — ", bold: true }),
          new TextRun("o velho sussurrou. — Nao como testemunha passiva. Eu era um deles. Conheci os dez. Chorei com eles. Lutei ao lado deles. E, no final... falhei com todos.")
        ]}),
        
        bodyPara("Grazy sentiu um arrepio percorrer sua espinha. A lenda dizia que apenas os Aetheres haviam sobrevivido a Era Primordial. Se este homem dizia a verdade..."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Seu nome — ", bold: true }),
          new TextRun("Grazy pediu, a voz baixa. — Qual e seu nome verdadeiro?")
        ]}),
        
        bodyPara("O velho olhou para a chama, e por um instante, sua forma pareceu mudar — tornou-se mais jovem, mais alto, uma figura de poder e tristeza."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Kaelon — ", bold: true }),
          new TextRun("ele respondeu. — Eu era Kaelon. O Terceiro dos Dez. O que hesitou quando deveria ter agido. O que viu a queda chegando e nada fez para impedi-la.")
        ]}),
        
        bodyPara("O silencio que se seguiu foi pesado como mil eras de arrependimento."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Conte-me tudo — ", bold: true }),
          new TextRun("Grazy sussurrou. — Desde o inicio.")
        ]}),
        
        bodyPara("E Kaelon, o traidor arrependido, o sobrevivente relutante, comecou a falar."),
        
        sceneBreak(),
        
        // CHAPTER 1
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Capitulo I")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "O Despertar do Vazio", size: 32, bold: true, color: colors.primary })] }),
        new Paragraph({ style: "Epigraph", children: [new TextRun("No principio nao havia comeco, pois o comeco pressupoe um antes. E nao havia antes onde nada existia.")] }),
        
        bodyPara("Antes da primeira luz, antes da primeira sombra, havia apenas o Vazio Primordial. Nao era escuro — a escuridao pressupoe a ausencia de luz. Era simplesmente... nada. Um vazio tao completo que nem mesmo o conceito de vazio podia existir nele."),
        
        bodyPara("E entao, algo despertou. Nao um ser, nao uma consciencia — mas um impulso. Uma forca que os escritos antigos chamariam de O Primeiro Sopro. Este impulso nao criou por vontade propria. Simplesmente pulsou. E dessa pulsacao, o primeiro Aethra brotou."),
        
        bodyPara("Os Seres de Luz nao foram criados — eles surgiram. Brotações de Aethra que irradiavam existencia como o sol irradia calor. Eram portadores de vida, nao criadores. A vida fluia atraves deles, expandindo os limites da realidade."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce precisa entender, Grazy — ", bold: true }),
          new TextRun("Kaelon disse, sua voz ganhando forca. — Nos nao escolhemos existir. Simplesmente... estavamos la. Como bolhas na superficie de um rio. Algumas bolhas sao maiores, outras menores. Algumas duram mais, outras estouram rapido. Mas nenhuma bolha escolhe ser bolha.")
        ]}),
        
        bodyPara("Os Seres de Sombra surgiram como resposta a entropia. Nao como oposicao a luz, mas como complemento. Como a mare que recua para que as ondas possam voltar a chegar."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eles eram o que chamamos de Anti-Vida — ", bold: true }),
          new TextRun("Kaelon continuou, um sorriso amargo nos labios. — Nome terrivel, nao e? Soa como algo maligno. Mas nao eram. Eram... lixeiros cosmicos. Limpavam a bagunca que nos, Seres de Luz, causavamos naturalmente.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Entao permitir que a existencia se expandisse sem controle.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Entao era um sistema perfeito? — ", bold: true }),
          new TextRun("Grazy perguntou.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Perfeito? — ", bold: true }),
          new TextRun("Kaelon riu, uma risada sem humor. — Nada e perfeito, jovem. O sistema funcionava. Isso nao significa perfeicao. Significa apenas que... bem, que ninguem havia descoberto como quebra-lo. Ate nos.")
        ]}),
        
        sceneBreak(),
        
        // CHAPTER 2
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Capitulo II")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "Os Dez", size: 32, bold: true, color: colors.primary })] }),
        new Paragraph({ style: "Epigraph", children: [new TextRun("E entre milhoes de Seres de Luz, dez se destacaram. Nao por bondade, nao por sabedoria, mas por algo muito mais perigoso: inteligencia.")] }),
        
        bodyPara("— Voce ja ouviu falar de nos como monstros — Kaelon disse, os olhos perdidos em memorias distantes. — Como demonios que emergiram do nada para devorar a criacao. Mas a verdade e bem mais complicada. E muito mais triste."),
        
        bodyPara("Entre os milhoes de Seres de Luz que surgiram durante a Era Primordial, alguns desenvolveram algo que a maioria nao possuia: consciencia de si mesmos. Identidade. A capacidade de dizer eu sou e compreender o que isso significava."),
        
        bodyPara("Nos eramos dez. Dez pontos de luz que haviam alcancado um nivel de autoconsciencia que nos distinguia de todos os outros. E, como qualquer grupo de individuos, eramos muito diferentes entre nos."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Veyrath era o primeiro — ", bold: true }),
          new TextRun("Kaelon comecou, contando nos dedos enrugados. — O mais velho, o que nos encontrou primeiro. Ele tinha... presenca. Sabe quando alguém entra numa sala e todo mundo nota? Era assim com Veyrath. Nao por arrogancia, mas por natureza. Ele era um lider nato.")
        ]}),
        
        bodyPara("Nymira, a segunda, era a mente. Enquanto Veyrath inspirava, Nymira calculava. Cada passo, cada consequencia, cada possibilidade. Ela via padroes onde outros viam caos."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— E depois estava eu — ", bold: true }),
          new TextRun("Kaelon disse, a voz baixa. — O terceiro. O que pensava demais. O que questionava quando deveria apenas seguir.")
        ]}),
        
        bodyPara("Zypher, o quarto, era a lingua de prata. Podia convencer uma estrela a brilhar mais forte, ou uma sombra a recuar. Morvath, o quinto, nunca confiava em ninguém completamente — sempre olhando por cima do ombro, sempre esperando a traicao."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Aethra — ", bold: true }),
          new TextRun("Kaelon fez uma pausa, um sorriso ironico. — Sim, ele escolheu esse nome. Queria ser mais poderoso que a propria essencia da existencia. Ambicao pura, sem o peso da reflexao.")
        ]}),
        
        bodyPara("Lyria, a setima, falava pouco. Mas quando falava, todos ouviam. Dormu, o oitavo, resolvia tudo com forca bruta — fisico e direto. Ishara, a nona, era a mistica do grupo, sempre conectada com energias que os outros nem percebiam."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— E Velros — ", bold: true }),
          new TextRun("a voz de Kaelon falhou por um momento. — O decimo. O mais jovem. O mais... inocente. Ele nos seguia como irmaos mais velhos. Confiava em nos. Confiava em todos nos. Ate que nao pôde mais.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce parece ter afeto por eles — ", bold: true }),
          new TextRun("Grazy observou. — Mesmo depois de tudo.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eles eram minha familia — ", bold: true }),
          new TextRun("Kaelon respondeu simplesmente. — Quando voce passa eras junto de alguém, nao importa o que eles se tornem. Voce lembra do que eram. Do que poderiam ter sido.")
        ]}),
        
        sceneBreak(),
        
        // CHAPTER 3
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Capitulo III")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "A Primeira Pergunta", size: 32, bold: true, color: colors.primary })] }),
        new Paragraph({ style: "Epigraph", children: [new TextRun("Toda queda comeca com uma pergunta. E toda pergunta comeca com a curiosidade de saber o que existe alem dos limites.")] }),
        
        bodyPara("— Foi num ciclo que nao tenho como medir — Kaelon disse. — Estavamos reunidos como sempre faziamos, flutuando num espaco entre estrelas. Dez pontos de luz conversando sobre... tudo e nada."),
        
        bodyPara("O espaco ao redor deles brilhava com a luz de mil estrelas recem-nascidas. Os dez paravam em formacao dispersa, suas energias pulsando em harmonia."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce ja parou pra pensar? — ", bold: true }),
          new TextRun("Veyrath comecou, sua luz brilhando mais intensamente que as dos outros. — Sobre por que fazemos o que fazemos?")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Nos irradiamos — ", bold: true }),
          new TextRun("Dormu respondeu prontamente. — E o que somos. E como respirar.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Mas por que? — ", bold: true }),
          new TextRun("Veyrath insistiu. — Por que irradiar e nao... absorver? Por que expandir e nao contrair?")
        ]}),
        
        bodyPara("O silencio que se seguiu foi pesado. A pergunta pairou entre eles como uma nuvem de tempestade."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Isso soa perigoso — ", bold: true }),
          new TextRun("Kaelon disse, sua voz carregada de preocupacao. — Absorver... nao e nossa natureza.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Quem definiu nossa natureza? — ", bold: true }),
          new TextRun("Aethra interveio, movendo-se para ficar ao lado de Veyrath. — Quem disse que nao podemos ser mais do que somos?")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— As sombras — ", bold: true }),
          new TextRun("Lyria falou, sua voz suave como sempre. — Elas existem para nos limitar. Para garantir que nao passemos dos limites.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— E se os limites estiverem errados? — ", bold: true }),
          new TextRun("Zypher sugeriu, sua voz meliflua. — Se formos capazes de mais... e estivermos nos segurando por medo?")
        ]}),
        
        bodyPara("Foi entao que Velros, o mais jovem, falou pela primeira vez na conversa:"),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eu... eu gosto do que somos — ", bold: true }),
          new TextRun("ele disse, hesitante. — Gosto de irradiar. De ver a vida brotar onde passo. Por que precisamos mudar?")
        ]}),
        
        bodyPara("Os outros se voltaram para ele, e por um momento, houve hesitacao. Mas foi apenas um momento."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Nao se trata de mudar, Velros — ", bold: true }),
          new TextRun("Nymira disse, sua voz calma e logica. — Se trata de evoluir. De descobrir nosso potencial completo. Nao e isso que todos os seres buscam?")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— E voce acreditou nisso? — ", bold: true }),
          new TextRun("Grazy perguntou.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eu quis acreditar — ", bold: true }),
          new TextRun("Kaelon respondeu, os olhos baixos. — Naquela epoca, parecia... logico. Por que nao explorar nossos limites? Por que nao descobrir o que mais podiamos ser? Nao sabia... nao sabiamos... o que isso significaria.")
        ]}),
        
        sceneBreak(),
        
        // CHAPTER 4
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Capitulo IV")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "O Primeiro Gole", size: 32, bold: true, color: colors.primary })] }),
        new Paragraph({ style: "Epigraph", children: [new TextRun("E provaram do poder proibido, e viram que era bom. E nao souberam que haviam tracado sua propria condenacao.")] }),
        
        bodyPara("— O primeiro ato deliberado de absorcao foi acidental — Kaelon explicou. — Ou pelo menos, foi o que nos dissemos."),
        
        bodyPara("Veyrath havia encontrado uma concentracao de Aethra disperso — restos de uma estrela que morrera naturalmente. Em vez de deixar o Aethra se dissipar como sempre faziam, ele hesitou."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— E se... — ", bold: true }),
          new TextRun("ele murmurou para si mesmo, e entao, quase sem querer, puxou o Aethra disperso para dentro de si.")
        ]}),
        
        bodyPara("A sensacao foi indescritivel. Como beber agua apos eras de sede que nao sabia que tinha. Como encontrar uma parte de si mesmo que nem sabia que faltava."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eu me senti... mais — ", bold: true }),
          new TextRun("Veyrath relatou aos outros depois. — Mais completo. Mais... eu.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Isso nao parece certo — ", bold: true }),
          new TextRun("Kaelon disse, mas sua voz faltou conviccao. — Nos irradiamos. Nao absorvemos.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— E as sombras? — ", bold: true }),
          new TextRun("Morvath perguntou, olhando ao redor com desconfianca. — Elas nao vieram nos corrigir?")
        ]}),
        
        bodyPara("Todos esperaram. Observaram. Mas nenhum Ser de Sombra apareceu."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Nada aconteceu — ", bold: true }),
          new TextRun("Nymira concluiu, uma fascia de fascinio em sua luz. — O sistema nao detectou. Para as sombras, isso foi... normal.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Entao podemos fazer de novo? — ", bold: true }),
          new TextRun("Aethra perguntou, ja se movendo em direcao a outra concentracao de Aethra disperso.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Esperem! — ", bold: true }),
          new TextRun("Kaelon tentou. — Talvez devessemos discutir isso primeiro. Entender o que—")
        ]}),
        
        bodyPara("Mas ja era tarde. Aethra havia absorvido outra porcao. E depois Dormu. E depois Zypher. Um por um, os dez experimentaram a sensacao nova — exceto Kaelon, que hesitou, e Velros, que parecia assustado demais para tentar."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Vamos, Velros — ", bold: true }),
          new TextRun("Veyrath incentivou, estendendo uma mao de luz. — E apenas uma pequena coisa. Nao faz mal a ninguem.")
        ]}),
        
        bodyPara("Velros olhou para Kaelon, buscando orientacao. Mas Kaelon nao disse nada. Nao conseguiu. E nesse silencio, Velros tomou sua decisao — e absorveu."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Foi isso? — ", bold: true }),
          new TextRun("Grazy perguntou. — O momento em que tudo mudou?")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Foi um dos momentos — ", bold: true }),
          new TextRun("Kaelon corrigiu. — A queda nao e um evento, Grazy. E uma descida. Degrau por degrau. E naquele momento, demos o primeiro passo numa escada que nao sabiamos para onde levava.")
        ]}),
        
        sceneBreak(),
        
        // CHAPTER 5
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Capitulo V")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "A Mascara", size: 32, bold: true, color: colors.primary })] }),
        new Paragraph({ style: "Epigraph", children: [new TextRun("A entropia que causavamos parecia natural. E nisso residia nossa vantagem — e nossa maldicao.")] }),
        
        bodyPara("— Voces descobriram como enganar o sistema — Grazy disse, nao como pergunta."),
        
        bodyPara("— Descobrimos — Kaelon confirmou. — Ou melhor, Nymira descobriu. Ela percebeu que a entropia gerada pela absorcao era identica a entropia gerada pela irradiacao natural. Para os Seres de Sombra, era tudo a mesma coisa."),
        
        bodyPara("Nymira reuniu os nove companheiros para explicar sua descoberta."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Funciona assim — ", bold: true }),
          new TextRun("ela disse, sua luz pulsando com entusiasmo intelectual. — Quando irradiamos, causamos entropia como subproduto. Quando absorvemos, tambem causamos entropia. A diferenca e a origem, nao o resultado.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— E as sombras so percebem o resultado — ", bold: true }),
          new TextRun("Aethra completou, entendendo. — Nao a origem.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Exato. Elas purificam a entropia, nao investigam a causa. Para elas, absorcao e irradiacao geram a mesma assinatura de desequilibrio.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Isso significa... — ", bold: true }),
          new TextRun("Zypher comecou, um sorriso crescendo em sua luz.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Significa que podemos absorver tanto quanto quisermos — ", bold: true }),
          new TextRun("Nymira concluiu. — Desde que mantenhamos os niveis de entropia dentro do normal.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Mas isso e... enganar — ", bold: true }),
          new TextRun("Velros disse, sua voz pequena. — Nao e errado?")
        ]}),
        
        bodyPara("Todos se voltaram para ele. O silencio era pesado."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Errado segundo quem, Velros? — ", bold: true }),
          new TextRun("Veyrath perguntou suavemente. — Segundo as sombras que nem percebem? Segundo as estrelas que ja morreram? Segundo quem?")
        ]}),
        
        bodyPara("Velros nao teve resposta. E mais uma vez, seu silencio foi interpretado como consentimento."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce nao tentou dete-los? — ", bold: true }),
          new TextRun("Grazy perguntou, a acusacao clara na voz.")
        ]}),
        
        bodyPara("Kaelon olhou para suas maos — maos que haviam visto eras de existencia."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Tentei — ", bold: true }),
          new TextRun("ele disse finalmente. — Na minha cabeca. Planejei conversas, argumentos, apelos. Mas quando chegava a hora... eu congelava. Pensava: E se eles estiverem certos? E se eu for o errado? Sabe, Grazy, e facil olhar para tras e ver o que deveria ter sido feito. Mas no momento... no momento, tudo parece possivel. Todas as opcoes parecem validas.")
        ]}),
        
        bodyPara("— A indecisao e uma escolha tambem — Grazy disse duramente."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eu sei — ", bold: true }),
          new TextRun("Kaelon respondeu, e pela primeira vez, lagrimas escorreram por seu rosto enrugado. — Acredite, jovem Aethere, eu sei disso melhor que qualquer um. Carrego esse conhecimento ha mais eras do que voce consegue imaginar.")
        ]}),
        
        sceneBreak(),
        
        // CHAPTER 6
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Capitulo VI")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "A Primeira Vitima", size: 32, bold: true, color: colors.primary })] }),
        new Paragraph({ style: "Epigraph", children: [new TextRun("Ha uma linha que separa a curiosidade da crueldade. E nos a cruzamos sem nem perceber.")] }),
        
        bodyPara("— Aethra disperso nao era mais suficiente — Kaelon continuou, sua voz mais pesada. — Quando voce descobre que pode ter mais, suficiente deixa de existir."),
        
        bodyPara("A ideia surgiu numa reuniao, como todas as ideias perigosas. Aethra foi quem propos."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— E se o Aethra disperso nos torna mais fortes — ", bold: true }),
          new TextRun("ele disse, sua luz brilhando com uma intensidade nova, — imagine o que o Aethra concentrado poderia fazer.")
        ]}),
        
        bodyPara("O silencio que se seguiu foi diferente dos anteriores. Este era um silencio de compreensao — e de medo."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce esta falando de outros Seres de Luz — ", bold: true }),
          new TextRun("Lyria disse, sua voz suave carregada de algo que raramente mostrava: horror. — Esta falando de... consumir outros.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Nao consumir — ", bold: true }),
          new TextRun("Zypher corrigiu rapidamente. — Absorver. Incorporar. Eles continuariam existindo... dentro de nos.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Isso e a mesma coisa! — ", bold: true }),
          new TextRun("Kaelon explodiu, a primeira vez que erguia a voz. — Voce esta propondo assassinato!")
        ]}),
        
        bodyPara("Todos se voltaram para ele. Nove olhares fixados em sua pessoa."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Assassinato, Kaelon? — ", bold: true }),
          new TextRun("Veyrath perguntou, sua voz perigosamente calma. — Ou evolucao? Nos nao somos como as outras civilizacoes. Somos mais conscientes, mais poderosos, mais... dignos de existir. Por que nao incorporar aqueles que mal compreendem sua propria existencia?")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Isso e loucura — ", bold: true }),
          new TextRun("Velros sussurrou. — Nao podemos... nao devemos...")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Ninguem esta forcando voce, Velros — ", bold: true }),
          new TextRun("Nymira disse gentilmente. — Pode apenas... observar. Ver como funciona. E depois decidir.")
        ]}),
        
        bodyPara("Foi assim que a primeira vez aconteceu. Uma civilizacao vizinha — pacifica, prospera, completamente alheia. Aethra liderou o ataque, e quando terminou..."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Foi incrivel — ", bold: true }),
          new TextRun("ele disse depois, sua luz mais brilhante que nunca. — O poder... a sensacao... nao ha palavras.")
        ]}),
        
        bodyPara("Kaelon vomitou. Ou fez o equivalente para um Ser de Luz. E Velros... Velros se afastou dos outros e nao falou por eras."),
        
        bodyPara("— E depois disso, nao houve volta — Grazy disse."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Depois disso — ", bold: true }),
          new TextRun("Kaelon confirmou, — a linha foi cruzada. Cada civilizacao consumida nos tornava mais fortes. Mais viciados. Menos capazes de parar. Era como uma fome que crescia a cada mordida.")
        ]}),
        
        sceneBreak(),
        
        // CHAPTER 7
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Capitulo VII")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "A Tempestade Silenciosa", size: 32, bold: true, color: colors.primary })] }),
        new Paragraph({ style: "Epigraph", children: [new TextRun("E cresceram em poder ate que nem as sombras podiam ignora-los. Mas entao, ja era tarde demais.")] }),
        
        bodyPara("— As sombras eventualmente perceberam — Kaelon disse. — Mas o sistema de equilibrio nunca foi projetado para isso."),
        
        bodyPara("Os Seres de Sombra operavam por instinto, nao por inteligencia. Eram como o sistema imunologico do universo — reativo, nao proativo. Quando finalmente detectaram a anomalia que os Nihilaryth haviam se tornado, os dez ja eram poderosos demais para serem contidos facilmente."),
        
        bodyPara("A batalha foi terrivel. Seres de Sombra surgindo em ondas infinitas, purificando tudo em seu caminho. Mas os Nihilaryth haviam aprendido a devorar ate mesmo as sombras."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eles sao mais fracos do que pensei! — ", bold: true }),
          new TextRun("Dormu riu, consumindo uma sombra que tentava purifica-lo. — Podemos alimentar-nos deles tambem!")
        ]}),
        
        bodyPara("Mas Kaelon viu a verdade que os outros ignoravam: para cada sombra consumida, dez mais surgiam. O sistema de equilibrio era infinito, implacavel. Nao podia ser vencido — apenas adiado."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Isso nao vai funcionar! — ", bold: true }),
          new TextRun("Kaelon gritou para Veyrath. — As sombras nao terminam! Sao parte do proprio universo!")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Entao vamos para onde elas nao podem nos alcancar — ", bold: true }),
          new TextRun("Veyrath respondeu, um sorriso selvagem em sua luz. — Nymira encontrou algo. Um caminho para o centro. Para o Fruto da Existencia.")
        ]}),
        
        bodyPara("Kaelon sentiu seu mundo congelar."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce nao pode estar falando serio. O Fruto e... e...")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— A fonte de todo poder? — ", bold: true }),
          new TextRun("Veyrath completou. — Sim. Imagine o que poderiamos fazer com ele, Kaelon. Poderiamos dominar as proprias sombras. Podemos dominar tudo.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Foi entao que soube — ", bold: true }),
          new TextRun("Kaelon disse, a voz partida. — Soube que tinha perdido. Nao a batalha, mas meus irmaos. A familia que conhecia havia morrido, substituida por... algo mais. Algo que eu nao reconhecia.")
        ]}),
        
        sceneBreak(),
        
        // CHAPTER 8
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Capitulo VIII")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "A Escolha de Kaelon", size: 32, bold: true, color: colors.primary })] }),
        new Paragraph({ style: "Epigraph", children: [new TextRun("Todo ser enfrenta um momento em que deve escolher quem e. O meu momento chegou tarde demais.")] }),
        
        bodyPara("— O que voce fez? — Grazy perguntou, a voz baixa."),
        
        bodyPara("Kaelon ficou em silencio por um longo momento, a chama da lamparina tremulando."),
        
        bodyPara("Eles estavam nas bordas do ramo moribundo, preparando-se para a jornada em direcao ao Grande Atrator. Os nove brilhavam com poder roubado, suas formas distorcidas pela absorcao excessiva."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce vem, Kaelon? — ", bold: true }),
          new TextRun("Veyrath perguntou, mas nao era realmente uma pergunta.")
        ]}),
        
        bodyPara("Kaelon olhou para seus companheiros — os seres que haviam sido sua familia por eras infindaveis. Viu a fome em seus olhos, a ganancia que substituira a curiosidade, a corrupcao que substituira a luz."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Nao — ", bold: true }),
          new TextRun("ele disse, e a palavra pareceu ecoar atraves de toda a criacao. — Nao vou.")
        ]}),
        
        bodyPara("O silencio que se seguiu foi absoluto."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce esta escolhendo ficar? — ", bold: true }),
          new TextRun("Nymira perguntou, a voz carregada de algo que poderia ser tristeza. — Depois de tudo? Depois de todas as eras juntos?")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Estou escolhendo quem quero ser — ", bold: true }),
          new TextRun("Kaelon respondeu, e pela primeira vez em eras, sua voz estava firme. — E nao e isso. Nao e o que nos tornamos.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce e um tolo — ", bold: true }),
          new TextRun("Aethra cuspiu. — Quando tivermos o Fruto, voltaremos. E entao voce vai implorar por misericordia.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Talvez — ", bold: true }),
          new TextRun("Kaelon disse. — Mas pelo menos vou implorar sendo eu mesmo. Nao... isso.")
        ]}),
        
        bodyPara("E entao Velros se aproximou dele. O mais jovem, o mais inocente, o que sempre seguira os outros."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Kaelon... — ", bold: true }),
          new TextRun("ele sussurrou. — Eu nao quero ir. Mas tenho medo de ficar.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Entao venha comigo — ", bold: true }),
          new TextRun("Kaelon estendeu a mao. — Podemos encontrar outro caminho. Podemos—")
        ]}),
        
        bodyPara("Mas Velros olhou para os oito, para a familia que conhecera, para o poder que prometiam. E lentamente, se afastou de Kaelon."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Me desculpe — ", bold: true }),
          new TextRun("ele sussurrou. — Eu nao consigo.")
        ]}),
        
        bodyPara("Kaelon chorava abertamente agora, lagrimas descendo pelo rosto enrugado."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eu deixei ele ir — ", bold: true }),
          new TextRun("ele disse entre soluços. — Velros... ele era bom. Era puro. E eu o deixei ir com eles. Deveria ter forcado. Deveria ter...")
        ]}),
        
        bodyPara("Grazy nao disse nada. Nao havia nada a dizer."),
        
        sceneBreak(),
        
        // CHAPTER 9
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Capitulo IX")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "O Colapso", size: 32, bold: true, color: colors.primary })] }),
        new Paragraph({ style: "Epigraph", children: [new TextRun("E o ramo caiu, e com ele caíram milhoes de sonhos, milhoes de vidas, milhoes de futuros que nunca seriam.")] }),
        
        bodyPara("— Os nove partiram em direcao ao Grande Atrator — Kaelon continuou, enxugando as lagrimas. — E eu... eu fugi."),
        
        bodyPara("Fugi para o unico lugar que conhecia onde poderia encontrar ajuda: os Aetheres. Uma civilizacao distante que havia seguido um caminho diferente — um caminho de harmonia em vez de ambicao."),
        
        bodyPara("Os Aetheres o receberam com desconfianca. Kaelon era, afinal, um dos Dez. Um dos Nihilaryth, como ja eram conhecidos nas lendas de terror."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Por que devemos confiar em voce? — ", bold: true }),
          new TextRun("a lider dos Aetheres perguntou, sua luz pura e firme. — Voce e um deles.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eu era — ", bold: true }),
          new TextRun("Kaelon respondeu, ajoelhando-se. — Mas escolhi nao ser mais. E preciso de sua ajuda para dete-los.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Dete-los? — ", bold: true }),
          new TextRun("outro Aethere riu amargamente. — Voce viu o que eles fizeram com um ramo inteiro da criacao? E quer que nos... o que sobrou de nos... os detenha?")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Nao sozinhos — ", bold: true }),
          new TextRun("Kaelon disse. — Mas juntos com as sombras. Eu sei como eles pensam. Sei como operam. Posso ajudar.")
        ]}),
        
        bodyPara("Os Aetheres debateram por eras — ou o que pareceu eras. Mas no final, concordaram. A alternativa era esperar a morte chegar."),
        
        bodyPara("— E funcionou? — Grazy perguntou."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Funcionou o suficiente — ", bold: true }),
          new TextRun("Kaelon disse. — Os nove foram contidos. Nao derrotados, nao destruidos, mas... retardados. Forcados a recuar para os espacos entre espacos. Para o vazio entre os mundos. La ficaram, acumulando poder, aguardando o momento certo para tentar novamente.")
        ]}),
        
        bodyPara("— E Velros?"),
        
        bodyPara("Kaelon desviou o olhar."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Velros... ele hesitou no ultimo momento. Quando finalmente alcancaram as bordas do Grande Atrator, ele tentou recuar. Tentou voltar. — ", bold: true }),
          new TextRun("A voz de Kaelon falhou. — Os outros nao o deixaram. Disseram que sabia demais. Que nao podiam arriscar traicao. Entao...")
        ]}),
        
        bodyPara("— Eles o consumiram — Grazy completou, horrorizado."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eles o consumiram — ", bold: true }),
          new TextRun("Kaelon confirmou. — O irmao mais novo que os seguia por lealdade. O que nunca quis nada alem de pertencer. Consumido pelos proprios irmaos.")
        ]}),
        
        sceneBreak(),
        
        // CHAPTER 10
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Capitulo X")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "Os Ultimos da Luz", size: 32, bold: true, color: colors.primary })] }),
        new Paragraph({ style: "Epigraph", children: [new TextRun("E na distancia, longe do colapso, os Aetheres permaneceram — puros, vigilantes, carregando o peso de serem os unicos que poderiam ter salvado tudo.")] }),
        
        bodyPara("— Os Aetheres me aceitaram como um de seus — Kaelon disse. — Nao por confianca, mas por necessidade. Eu era a unica ligacao com o inimigo que tinham."),
        
        bodyPara("Juntos, desenvolveram algo que nunca havia existido antes: uma cooperacao consciente entre Luz e Sombra. Os Seres de Sombra nunca haviam trabalhado com Seres de Luz — apenas equilibravam-os. Mas com a orientacao de Kaelon e a pureza dos Aetheres, um novo sistema comecou a emergir."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Nao foi uma vitoria — ", bold: true }),
          new TextRun("Kaelon enfatizou. — Foi uma contencao. Os nove ainda existem. Ainda crescem. Ainda aguardam. Mas agora estamos preparados. Ou pelo menos, mais preparados do que estavamos.")
        ]}),
        
        bodyPara("— E o Fruto da Existencia? — Grazy perguntou. — Ainda esta em perigo?"),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Sempre estara — ", bold: true }),
          new TextRun("Kaelon respondeu. — Enquanto os nove existirem, o Fruto sera seu objetivo final. E eventualmente... eventualmente eles tentarao novamente. Com mais poder. Com mais conhecimento. E talvez, na proxima vez...")
        ]}),
        
        bodyPara("Ele deixou a frase no ar, o peso do possivel desastre obvio."),
        
        sceneBreak(),
        
        // EPILOGUE
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Epilogo")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "A Promessa", size: 32, bold: true, color: colors.primary })] }),
        
        bodyPara("A chama da lamparina estava quase apagada quando Kaelon terminou sua historia. Grazy permaneceu em silencio por um longo momento, processando tudo que ouvira."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Por que me contou isso? — ", bold: true }),
          new TextRun("ele finalmente perguntou. — Por que agora?")
        ]}),
        
        bodyPara("Kaelon se levantou lentamente, seus ossos rangendo com a idade."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Porque eles estao voltando, Grazy — ", bold: true }),
          new TextRun("ele disse, a voz subitamente forte. — Posso sentir. Depois de eras no vazio, os nove finalmente encontraram o caminho de volta. E desta vez, precisamos estar prontos.")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— E voce acha que eu posso fazer algo? — ", bold: true }),
          new TextRun("Grazy perguntou, incredulo. — Eu sou apenas um Aethere. Nao sou especial. Nao sou—")
        ]}),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Voce e a semente — ", bold: true }),
          new TextRun("Kaelon interrompeu. — A semente do que precisa crescer. Dos Aetheres, voce e o unico com potencial para se tornar algo mais. Algo capaz de enfrentar os nove.")
        ]}),
        
        bodyPara("Ele se aproximou de Grazy, colocando uma mao enrugada em seu ombro."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Eu falhei com Velros. Falhei com os outros. Falhei com toda a criacao quando nao tive coragem de agir quando podia ter feito diferenca. — ", bold: true }),
          new TextRun("Seus olhos encontraram os de Grazy. — Nao vou falhar com voce. Nao vou deixar outro jovem ser consumido pela indecisao. Por isso vou treina-lo. Vou lhe dar tudo que sei. E quando os nove finalmente surgirem do vazio... voce estara pronto.")
        ]}),
        
        bodyPara("Grazy engoliu em seco, o peso da responsabilidade descendo sobre seus ombros."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— E se eu falhar tambem? — ", bold: true }),
          new TextRun("ele perguntou, a voz baixa.")
        ]}),
        
        bodyPara("Kaelon sorriu — um sorriso triste, mas cheio de algo que Grazy nao esperava: esperanca."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— Entao tentaremos de novo. E de novo. E de novo. — ", bold: true }),
          new TextRun("Ele se virou para a porta do templo. — Essa e a unica promessa que posso fazer. A promessa de continuar tentando. A promessa de que, enquanto houver luz, havera esperanca. E enquanto houver esperanca...")
        ]}),
        
        bodyPara("Ele parou na entrada, a luz da lua prateada delineando sua forma antiga."),
        
        new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [
          new TextRun({ text: "— ...nada esta perdido. Amanha ao nascer do sol, seu treinamento comeca. Durma bem, Grazy. Pois a partir de amanha... voce vai precisar de toda a forca que puder reunir.")
        ]}),
        
        bodyPara("E com isso, o antigo Nihilaryth — o traidor arrependido, o sobrevivente relutante, o contador de historias — desapareceu na noite, deixando Grazy sozinho com a chama morrente e o peso de um destino que mal comecava a compreender."),
        
        bodyPara("Em algum lugar no vazio entre os mundos, nove pontos de luz esperavam, observavam, acumulavam poder. Seu retorno nao era questao de se, mas de quando. E quando chegassem, tudo que existia estaria em jogo.", false),
        
        bodyPara("Esta e a semente da eternidade — o momento em que o futuro foi tracado por eras que ainda viriam.", false)
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Remasterizado.docx", buffer);
  console.log("Document created successfully!");
});
