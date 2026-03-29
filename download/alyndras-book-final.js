const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType, PageNumber, HeadingLevel, TableOfContents, PageBreak } = require('docx');
const fs = require('fs');

const colors = { primary: "26211F", bodyText: "3D3735", secondary: "6B6361", accent: "C19A6B" };

const p = (text) => new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [new TextRun(text)] });
const d = (bold, normal) => new Paragraph({ style: "BodyText", indent: { firstLine: 480 }, children: [new TextRun({ text: bold, bold: true }), new TextRun(normal)] });
const sb = () => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 400 }, children: [new TextRun({ text: "* * *", color: colors.accent })] });
const ch = (num, title) => [new Paragraph({ style: "ChapterTitle", children: [new TextRun(num)] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: title, size: 32, bold: true, color: colors.primary })] })];
const epi = (text) => new Paragraph({ style: "Epigraph", children: [new TextRun(text)] });

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", run: { size: 36, bold: true, color: colors.primary }, paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "BodyText", name: "Body Text", basedOn: "Normal", run: { size: 24, color: colors.bodyText }, paragraph: { spacing: { line: 346, after: 200 }, alignment: AlignmentType.JUSTIFIED } },
      { id: "ChapterTitle", name: "Chapter Title", basedOn: "Normal", run: { size: 44, bold: true, color: colors.accent, allCaps: true }, paragraph: { spacing: { before: 600, after: 400 }, alignment: AlignmentType.CENTER } },
      { id: "Epigraph", name: "Epigraph", basedOn: "Normal", run: { size: 22, italics: true, color: colors.secondary }, paragraph: { spacing: { before: 200, after: 400 }, alignment: AlignmentType.CENTER, indent: { left: 1440, right: 1440 } } }
    ]
  },
  sections: [
    // COVER
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
    // CONTENT
    { properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Alyndras — A Semente da Eternidade", size: 20, italics: true, color: colors.secondary })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "— ", size: 20, color: colors.secondary }), new TextRun({ children: [PageNumber.CURRENT], size: 20, color: colors.secondary }), new TextRun({ text: " —", size: 20, color: colors.secondary })] })] }) },
      children: [
        // PROLOGUE
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Prologo")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "O Contador de Historias", size: 32, bold: true, color: colors.primary })] }),
        
        p("A chama tremia na lamparina antiga, projetando sombras que dancavam nas paredes de pedra do templo abandonado. Grazy cruzou os bracos, os olhos fixos no velho a sua frente — um homem que parecia ter mais rugas que estrelas no ceu, e olhos que brilhavam com uma luz que nao vinha de nenhuma vela."),
        
        d("— Voce quer saber sobre a Era Primordial? — ", "a voz do velho era como folhas secas arrastadas pelo vento. — Quer saber como tudo comecou... e quase terminou?"),
        
        d("— Quero entender — ", "Grazy respondeu, tentando manter a impaciencia fora da voz. — Entender de onde vieram os Nihilaryth. Por que eles existem. Por que nos existimos."),
        
        p("O velho sorriu, um sorriso que parecia conhecer segredos que nem os deuses recordavam."),
        
        p("— Entao sente-se, jovem Aethere. Pois esta historia nao e sobre deuses e demonios, nao como voce imagina. E sobre escolhas. Sobre pessoas — se e que podemos chama-los assim. Sobre como a luz mais brilhante pode carregar a semente da propria escuridao."),
        
        p("Ele fez uma pausa, e por um momento, Grazy jurou ver lagrimas nos olhos do ancião."),
        
        d("— Eu estava la, sabe? — ", "o velho sussurrou. — Nao como testemunha passiva. Eu era um deles. Conheci os dez. Chorei com eles. Lutei ao lado deles. E, no final... falhei com todos."),
        
        p("Grazy sentiu um arrepio percorrer sua espinha. A lenda dizia que apenas os Aetheres haviam sobrevivido a Era Primordial. Se este homem dizia a verdade..."),
        
        d("— Seu nome — ", "Grazy pediu, a voz baixa. — Qual e seu nome verdadeiro?"),
        
        p("O velho olhou para a chama, e por um instante, sua forma pareceu mudar — tornou-se mais jovem, mais alto, uma figura de poder e tristeza."),
        
        d("— Kaelon — ", "ele respondeu. — Eu era Kaelon. O Terceiro dos Dez. O que hesitou quando deveria ter agido. O que viu a queda chegando e nada fez para impedi-la."),
        
        p("O silencio que se seguiu foi pesado como mil eras de arrependimento."),
        
        d("— Conte-me tudo — ", "Grazy sussurrou. — Desde o inicio."),
        
        p("E Kaelon, o traidor arrependido, o sobrevivente relutante, comecou a falar."),
        
        sb(),
        
        // CHAPTER 1
        ...ch("Capitulo I", "O Despertar do Vazio"),
        epi("No principio nao havia comeco, pois o comeco pressupoe um antes. E nao havia antes onde nada existia."),
        
        p("Antes da primeira luz, antes da primeira sombra, havia apenas o Vazio Primordial. Nao era escuro — a escuridao pressupoe a ausencia de luz. Era simplesmente... nada. Um vazio tao completo que nem mesmo o conceito de vazio podia existir nele."),
        
        p("E entao, algo despertou. Nao um ser, nao uma consciencia — mas um impulso. Uma forca que os escritos antigos chamariam de O Primeiro Sopro. Este impulso nao criou por vontade propria. Simplesmente pulsou. E dessa pulsacao, o primeiro Aethra brotou."),
        
        p("Os Seres de Luz nao foram criados — eles surgiram. Brotacoes de Aethra que irradiavam existencia como o sol irradia calor. Eram portadores de vida, nao criadores. A vida fluia atraves deles, expandindo os limites da realidade."),
        
        d("— Voce precisa entender, Grazy — ", "Kaelon disse, sua voz ganhando forca. — Nos nao escolhemos existir. Simplesmente... estavamos la. Como bolhas na superficie de um rio. Algumas bolhas sao maiores, outras menores. Algumas duram mais, outras estouram rapido. Mas nenhuma bolha escolhe ser bolha."),
        
        p("Os Seres de Sombra surgiram como resposta a entropia. Nao como oposicao a luz, mas como complemento. Como a mare que recua para que as ondas possam voltar a chegar."),
        
        d("— Eles eram o que chamamos de Anti-Vida — ", "Kaelon continuou, um sorriso amargo nos labios. — Nome terrivel, nao e? Soa como algo maligno. Mas nao eram. Eram... lixeiros cosmicos. Limpavam a bagunca que nos, Seres de Luz, causavamos naturalmente."),
        
        d("— Entao era um sistema perfeito? — ", "Grazy perguntou."),
        
        d("— Perfeito? — ", "Kaelon riu, uma risada sem humor. — Nada e perfeito, jovem. O sistema funcionava. Isso nao significa perfeicao. Significa apenas que... bem, que ninguem havia descoberto como quebra-lo. Ate nos."),
        
        sb(),
        
        // CHAPTER 2
        ...ch("Capitulo II", "Os Dez"),
        epi("E entre milhoes de Seres de Luz, dez se destacaram. Nao por bondade, nao por sabedoria, mas por algo muito mais perigoso: inteligencia."),
        
        d("— Voce ja ouviu falar de nos como monstros — ", "Kaelon disse, os olhos perdidos em memorias distantes. — Como demonios que emergiram do nada para devorar a criacao. Mas a verdade e bem mais complicada. E muito mais triste."),
        
        p("Entre os milhoes de Seres de Luz que surgiram durante a Era Primordial, alguns desenvolveram algo que a maioria nao possuia: consciencia de si mesmos. Identidade. A capacidade de dizer eu sou e compreender o que isso significava."),
        
        p("Nos eramos dez. Dez pontos de luz que haviam alcancado um nivel de autoconsciencia que nos distinguia de todos os outros. E, como qualquer grupo de individuos, eramos muito diferentes entre nos."),
        
        d("— Veyrath era o primeiro — ", "Kaelon comecou, contando nos dedos enrugados. — O mais velho, o que nos encontrou primeiro. Ele tinha... presenca. Sabe quando alguém entra numa sala e todo mundo nota? Era assim com Veyrath. Nao por arrogancia, mas por natureza. Ele era um lider nato."),
        
        p("Nymira, a segunda, era a mente. Enquanto Veyrath inspirava, Nymira calculava. Cada passo, cada consequencia, cada possibilidade. Ela via padroes onde outros viam caos."),
        
        d("— E depois estava eu — ", "Kaelon disse, a voz baixa. — O terceiro. O que pensava demais. O que questionava quando deveria apenas seguir."),
        
        p("Zypher, o quarto, era a lingua de prata. Podia convencer uma estrela a brilhar mais forte, ou uma sombra a recuar. Morvath, o quinto, nunca confiava em ninguem completamente — sempre olhando por cima do ombro, sempre esperando a traicao."),
        
        d("— Aethra — ", "Kaelon fez uma pausa, um sorriso ironico. — Sim, ele escolheu esse nome. Queria ser mais poderoso que a propria essencia da existencia. Ambicao pura, sem o peso da reflexao."),
        
        p("Lyria, a setima, falava pouco. Mas quando falava, todos ouviam. Dormu, o oitavo, resolvia tudo com forca bruta. Ishara, a nona, era a mistica do grupo, sempre conectada com energias que os outros nem percebiam."),
        
        d("— E Velros — ", "a voz de Kaelon falhou por um momento. — O decimo. O mais jovem. O mais... inocente. Ele nos seguia como irmaos mais velhos. Confiava em nos. Confiava em todos nos. Ate que nao pôde mais."),
        
        d("— Voce parece ter afeto por eles — ", "Grazy observou. — Mesmo depois de tudo."),
        
        d("— Eles eram minha familia — ", "Kaelon respondeu simplesmente. — Quando voce passa eras junto de alguém, nao importa o que eles se tornem. Voce lembra do que eram. Do que poderiam ter sido."),
        
        sb(),
        
        // CHAPTER 3
        ...ch("Capitulo III", "A Primeira Pergunta"),
        epi("Toda queda comeca com uma pergunta. E toda pergunta comeca com a curiosidade de saber o que existe alem dos limites."),
        
        d("— Foi num ciclo que nao tenho como medir — ", "Kaelon disse. — Estavamos reunidos como sempre faziamos, flutuando num espaco entre estrelas. Dez pontos de luz conversando sobre... tudo e nada."),
        
        p("O espaco ao redor deles brilhava com a luz de mil estrelas recem-nascidas. Os dez pairavam em formacao dispersa, suas energias pulsando em harmonia."),
        
        d("— Voce ja parou pra pensar? — ", "Veyrath comecou, sua luz brilhando mais intensamente que as dos outros. — Sobre por que fazemos o que fazemos?"),
        
        d("— Nos irradiamos — ", "Dormu respondeu prontamente. — E o que somos. E como respirar."),
        
        d("— Mas por que? — ", "Veyrath insistiu. — Por que irradiar e nao... absorver? Por que expandir e nao contrair?"),
        
        p("O silencio que se seguiu foi pesado. A pergunta pairou entre eles como uma nuvem de tempestade."),
        
        d("— Isso soa perigoso — ", "Kaelon disse, sua voz carregada de preocupacao. — Absorver... nao e nossa natureza."),
        
        d("— Quem definiu nossa natureza? — ", "Aethra interveio, movendo-se para ficar ao lado de Veyrath. — Quem disse que nao podemos ser mais do que somos?"),
        
        d("— As sombras — ", "Lyria falou, sua voz suave como sempre. — Elas existem para nos limitar. Para garantir que nao passemos dos limites."),
        
        d("— E se os limites estiverem errados? — ", "Zypher sugeriu, sua voz meliflua. — Se formos capazes de mais... e estivermos nos segurando por medo?"),
        
        p("Foi entao que Velros, o mais jovem, falou pela primeira vez na conversa:"),
        
        d("— Eu... eu gosto do que somos — ", "ele disse, hesitante. — Gosto de irradiar. De ver a vida brotar onde passo. Por que precisamos mudar?"),
        
        p("Os outros se voltaram para ele, e por um momento, houve hesitacao. Mas foi apenas um momento."),
        
        d("— Nao se trata de mudar, Velros — ", "Nymira disse, sua voz calma e logica. — Se trata de evoluir. De descobrir nosso potencial completo. Nao e isso que todos os seres buscam?"),
        
        d("— E voce acreditou nisso? — ", "Grazy perguntou."),
        
        d("— Eu quis acreditar — ", "Kaelon respondeu, os olhos baixos. — Naquela epoca, parecia... logico. Por que nao explorar nossos limites? Por que nao descobrir o que mais podiamos ser? Nao sabia... nao sabiamos... o que isso significaria."),
        
        sb(),
        
        // CHAPTER 4
        ...ch("Capitulo IV", "O Primeiro Gole"),
        epi("E provaram do poder proibido, e viram que era bom. E nao souberam que haviam tracado sua propria condenacao."),
        
        d("— O primeiro ato deliberado de absorcao foi acidental — ", "Kaelon explicou. — Ou pelo menos, foi o que nos dissemos."),
        
        p("Veyrath havia encontrado uma concentracao de Aethra disperso — restos de uma estrela que morrera naturalmente. Em vez de deixar o Aethra se dissipar como sempre faziam, ele hesitou."),
        
        d("— E se... — ", "ele murmurou para si mesmo, e entao, quase sem querer, puxou o Aethra disperso para dentro de si."),
        
        p("A sensacao foi indescritivel. Como beber agua apos eras de sede que nao sabia que tinha. Como encontrar uma parte de si mesmo que nem sabia que faltava."),
        
        d("— Eu me senti... mais — ", "Veyrath relatou aos outros depois. — Mais completo. Mais... eu."),
        
        d("— Isso nao parece certo — ", "Kaelon disse, mas sua voz faltou conviccao. — Nos irradiamos. Nao absorvemos."),
        
        d("— E as sombras? — ", "Morvath perguntou, olhando ao redor com desconfianca. — Elas nao vieram nos corrigir?"),
        
        p("Todos esperaram. Observaram. Mas nenhum Ser de Sombra apareceu."),
        
        d("— Nada aconteceu — ", "Nymira concluiu, uma fascia de fascinio em sua luz. — O sistema nao detectou. Para as sombras, isso foi... normal."),
        
        d("— Entao podemos fazer de novo? — ", "Aethra perguntou, ja se movendo em direcao a outra concentracao de Aethra disperso."),
        
        d("— Esperem! — ", "Kaelon tentou. — Talvez devessemos discutir isso primeiro. Entender o que—"),
        
        p("Mas ja era tarde. Aethra havia absorvido outra porcao. E depois Dormu. E depois Zypher. Um por um, os dez experimentaram a sensacao nova — exceto Kaelon, que hesitou, e Velros, que parecia assustado demais para tentar."),
        
        d("— Vamos, Velros — ", "Veyrath incentivou, estendendo uma mao de luz. — E apenas uma pequena coisa. Nao faz mal a ninguem."),
        
        p("Velros olhou para Kaelon, buscando orientacao. Mas Kaelon nao disse nada. Nao conseguiu. E nesse silencio, Velros tomou sua decisao — e absorveu."),
        
        d("— Foi isso? — ", "Grazy perguntou. — O momento em que tudo mudou?"),
        
        d("— Foi um dos momentos — ", "Kaelon corrigiu. — A queda nao e um evento, Grazy. E uma descida. Degrau por degrau. E naquele momento, demos o primeiro passo numa escada que nao sabiamos para onde levava."),
        
        sb(),
        
        // CHAPTER 5
        ...ch("Capitulo V", "A Mascara"),
        epi("A entropia que causavamos parecia natural. E nisso residia nossa vantagem — e nossa maldicao."),
        
        d("— Voces descobriram como enganar o sistema — ", "Grazy disse, nao como pergunta."),
        
        d("— Descobrimos — ", "Kaelon confirmou. — Ou melhor, Nymira descobriu. Ela percebeu que a entropia gerada pela absorcao era identica a entropia gerada pela irradiacao natural. Para os Seres de Sombra, era tudo a mesma coisa."),
        
        p("Nymira reuniu os nove companheiros para explicar sua descoberta."),
        
        d("— Funciona assim — ", "ela disse, sua luz pulsando com entusiasmo intelectual. — Quando irradiamos, causamos entropia como subproduto. Quando absorvemos, tambem causamos entropia. A diferenca e a origem, nao o resultado."),
        
        d("— E as sombras so percebem o resultado — ", "Aethra completou, entendendo. — Nao a origem."),
        
        p("— Exato. Elas purificam a entropia, nao investigam a causa. Para elas, absorcao e irradiacao geram a mesma assinatura de desequilibrio."),
        
        d("— Isso significa... — ", "Zypher comecou, um sorriso crescendo em sua luz."),
        
        d("— Significa que podemos absorver tanto quanto quisermos — ", "Nymira concluiu. — Desde que mantenhamos os niveis de entropia dentro do normal."),
        
        d("— Mas isso e... enganar — ", "Velros disse, sua voz pequena. — Nao e errado?"),
        
        p("Todos se voltaram para ele. O silencio era pesado."),
        
        d("— Errado segundo quem, Velros? — ", "Veyrath perguntou suavemente. — Segundo as sombras que nem percebem? Segundo as estrelas que ja morreram? Segundo quem?"),
        
        p("Velros nao teve resposta. E mais uma vez, seu silencio foi interpretado como consentimento."),
        
        d("— Voce nao tentou dete-los? — ", "Grazy perguntou, a acusacao clara na voz."),
        
        p("Kaelon olhou para suas maos — maos que haviam visto eras de existencia."),
        
        d("— Tentei — ", "ele disse finalmente. — Na minha cabeca. Planejei conversas, argumentos, apelos. Mas quando chegava a hora... eu congelava. Pensava: E se eles estiverem certos? E se eu for o errado? Sabe, Grazy, e facil olhar para tras e ver o que deveria ter sido feito. Mas no momento... no momento, tudo parece possivel. Todas as opcoes parecem validas."),
        
        p("— A indecisao e uma escolha tambem — Grazy disse duramente."),
        
        d("— Eu sei — ", "Kaelon respondeu, e pela primeira vez, lagrimas escorreram por seu rosto enrugado. — Acredite, jovem Aethere, eu sei disso melhor que qualquer um. Carrego esse conhecimento ha mais eras do que voce consegue imaginar."),
        
        sb(),
        
        // CHAPTER 6
        ...ch("Capitulo VI", "A Primeira Vitima"),
        epi("Ha uma linha que separa a curiosidade da crueldade. E nos a cruzamos sem nem perceber."),
        
        d("— Aethra disperso nao era mais suficiente — ", "Kaelon continuou, sua voz mais pesada. — Quando voce descobre que pode ter mais, suficiente deixa de existir."),
        
        p("A ideia surgiu numa reuniao, como todas as ideias perigosas. Aethra foi quem propos."),
        
        d("— E se o Aethra disperso nos torna mais fortes — ", "ele disse, sua luz brilhando com uma intensidade nova, — imagine o que o Aethra concentrado poderia fazer."),
        
        p("O silencio que se seguiu foi diferente dos anteriores. Este era um silencio de compreensao — e de medo."),
        
        d("— Voce esta falando de outros Seres de Luz — ", "Lyria disse, sua voz suave carregada de algo que raramente mostrava: horror. — Esta falando de... consumir outros."),
        
        d("— Nao consumir — ", "Zypher corrigiu rapidamente. — Absorver. Incorporar. Eles continuariam existindo... dentro de nos."),
        
        d("— Isso e a mesma coisa! — ", "Kaelon explodiu, a primeira vez que erguia a voz. — Voce esta propondo assassinato!"),
        
        p("Todos se voltaram para ele. Nove olhares fixados em sua pessoa."),
        
        d("— Assassinato, Kaelon? — ", "Veyrath perguntou, sua voz perigosamente calma. — Ou evolucao? Nos nao somos como as outras civilizacoes. Somos mais conscientes, mais poderosos, mais... dignos de existir. Por que nao incorporar aqueles que mal compreendem sua propria existencia?"),
        
        d("— Isso e loucura — ", "Velros sussurrou. — Nao podemos... nao devemos..."),
        
        d("— Ninguem esta forcando voce, Velros — ", "Nymira disse gentilmente. — Pode apenas... observar. Ver como funciona. E depois decidir."),
        
        p("Foi assim que a primeira vez aconteceu. Uma civilizacao vizinha — pacifica, prospera, completamente alheia. Aethra liderou o ataque, e quando terminou..."),
        
        d("— Foi incrivel — ", "ele disse depois, sua luz mais brilhante que nunca. — O poder... a sensacao... nao ha palavras."),
        
        p("Kaelon vomitou. Ou fez o equivalente para um Ser de Luz. E Velros... Velros se afastou dos outros e nao falou por eras."),
        
        p("— E depois disso, nao houve volta — Grazy disse."),
        
        d("— Depois disso — ", "Kaelon confirmou, — a linha foi cruzada. Cada civilizacao consumida nos tornava mais fortes. Mais viciados. Menos capazes de parar. Era como uma fome que crescia a cada mordida."),
        
        sb(),
        
        // CHAPTER 7
        ...ch("Capitulo VII", "A Tempestade Silenciosa"),
        epi("E cresceram em poder ate que nem as sombras podiam ignora-los. Mas entao, ja era tarde demais."),
        
        d("— As sombras eventualmente perceberam — ", "Kaelon disse. — Mas o sistema de equilibrio nunca foi projetado para isso."),
        
        p("Os Seres de Sombra operavam por instinto, nao por inteligencia. Eram como o sistema imunologico do universo — reativo, nao proativo. Quando finalmente detectaram a anomalia que os Nihilaryth haviam se tornado, os dez ja eram poderosos demais para serem contidos facilmente."),
        
        p("A batalha foi terrivel. Seres de Sombra surgindo em ondas infinitas, purificando tudo em seu caminho. Mas os Nihilaryth haviam aprendido a devorar ate mesmo as sombras."),
        
        d("— Eles sao mais fracos do que pensei! — ", "Dormu riu, consumindo uma sombra que tentava purifica-lo. — Podemos alimentar-nos deles tambem!"),
        
        p("Mas Kaelon viu a verdade que os outros ignoravam: para cada sombra consumida, dez mais surgiam. O sistema de equilibrio era infinito, implacavel. Nao podia ser vencido — apenas adiado."),
        
        d("— Isso nao vai funcionar! — ", "Kaelon gritou para Veyrath. — As sombras nao terminam! Sao parte do proprio universo!"),
        
        d("— Entao vamos para onde elas nao podem nos alcancar — ", "Veyrath respondeu, um sorriso selvagem em sua luz. — Nymira encontrou algo. Um caminho para o centro. Para o Fruto da Existencia."),
        
        p("Kaelon sentiu seu mundo congelar."),
        
        p("— Voce nao pode estar falando serio. O Fruto e... e..."),
        
        d("— A fonte de todo poder? — ", "Veyrath completou. — Sim. Imagine o que poderiamos fazer com ele, Kaelon. Poderiamos dominar as proprias sombras. Podemos dominar tudo."),
        
        d("— Foi entao que soube — ", "Kaelon disse, a voz partida. — Soube que tinha perdido. Nao a batalha, mas meus irmaos. A familia que conhecia havia morrido, substituida por... algo mais. Algo que eu nao reconhecia."),
        
        sb(),
        
        // CHAPTER 8
        ...ch("Capitulo VIII", "A Escolha de Kaelon"),
        epi("Todo ser enfrenta um momento em que deve escolher quem e. O meu momento chegou tarde demais."),
        
        d("— O que voce fez? — ", "Grazy perguntou, a voz baixa."),
        
        p("Kaelon ficou em silencio por um longo momento, a chama da lamparina tremulando."),
        
        p("Eles estavam nas bordas do ramo moribundo, preparando-se para a jornada em direcao ao Grande Atrator. Os nove brilhavam com poder roubado, suas formas distorcidas pela absorcao excessiva."),
        
        d("— Voce vem, Kaelon? — ", "Veyrath perguntou, mas nao era realmente uma pergunta."),
        
        p("Kaelon olhou para seus companheiros — os seres que haviam sido sua familia por eras infindaveis. Viu a fome em seus olhos, a ganancia que substituira a curiosidade, a corrupcao que substituira a luz."),
        
        d("— Nao — ", "ele disse, e a palavra pareceu ecoar atraves de toda a criacao. — Nao vou."),
        
        p("O silencio que se seguiu foi absoluto."),
        
        d("— Voce esta escolhendo ficar? — ", "Nymira perguntou, a voz carregada de algo que poderia ser tristeza. — Depois de tudo? Depois de todas as eras juntos?"),
        
        d("— Estou escolhendo quem quero ser — ", "Kaelon respondeu, e pela primeira vez em eras, sua voz estava firme. — E nao e isso. Nao e o que nos tornamos."),
        
        d("— Voce e um tolo — ", "Aethra cuspiu. — Quando tivermos o Fruto, voltaremos. E entao voce vai implorar por misericordia."),
        
        d("— Talvez — ", "Kaelon disse. — Mas pelo menos vou implorar sendo eu mesmo. Nao... isso."),
        
        p("E entao Velros se aproximou dele. O mais jovem, o mais inocente, o que sempre seguira os outros."),
        
        d("— Kaelon... — ", "ele sussurrou. — Eu nao quero ir. Mas tenho medo de ficar."),
        
        d("— Entao venha comigo — ", "Kaelon estendeu a mao. — Podemos encontrar outro caminho. Podemos—"),
        
        p("Mas Velros olhou para os oito, para a familia que conhecera, para o poder que prometiam. E lentamente, se afastou de Kaelon."),
        
        d("— Me desculpe — ", "ele sussurrou. — Eu nao consigo."),
        
        p("Kaelon chorava abertamente agora, lagrimas descendo pelo rosto enrugado."),
        
        d("— Eu deixei ele ir — ", "ele disse entre soluços. — Velros... ele era bom. Era puro. E eu o deixei ir com eles. Deveria ter forcado. Deveria ter..."),
        
        p("Grazy nao disse nada. Nao havia nada a dizer."),
        
        sb(),
        
        // CHAPTER 9
        ...ch("Capitulo IX", "O Colapso"),
        epi("E o ramo caiu, e com ele caíram milhoes de sonhos, milhoes de vidas, milhoes de futuros que nunca seriam."),
        
        d("— Os nove partiram em direcao ao Grande Atrator — ", "Kaelon continuou, enxugando as lagrimas. — E eu... eu fugi."),
        
        p("Fugi para o unico lugar que conhecia onde poderia encontrar ajuda: os Aetheres. Uma civilizacao distante que havia seguido um caminho diferente — um caminho de harmonia em vez de ambicao."),
        
        p("Os Aetheres o receberam com desconfianca. Kaelon era, afinal, um dos Dez. Um dos Nihilaryth, como ja eram conhecidos nas lendas de terror."),
        
        d("— Por que devemos confiar em voce? — ", "a lider dos Aetheres perguntou, sua luz pura e firme. — Voce e um deles."),
        
        d("— Eu era — ", "Kaelon respondeu, ajoelhando-se. — Mas escolhi nao ser mais. E preciso de sua ajuda para dete-los."),
        
        d("— Dete-los? — ", "outro Aethere riu amargamente. — Voce viu o que eles fizeram com um ramo inteiro da criacao? E quer que nos... o que sobrou de nos... os detenha?"),
        
        d("— Nao sozinhos — ", "Kaelon disse. — Mas juntos com as sombras. Eu sei como eles pensam. Sei como operam. Posso ajudar."),
        
        p("Os Aetheres debateram por eras — ou o que pareceu eras. Mas no final, concordaram. A alternativa era esperar a morte chegar."),
        
        d("— E funcionou? — ", "Grazy perguntou."),
        
        d("— Funcionou o suficiente — ", "Kaelon disse. — Os nove foram contidos. Nao derrotados, nao destruidos, mas... retardados. Forcados a recuar para os espacos entre espacos. Para o vazio entre os mundos. La ficaram, acumulando poder, aguardando o momento certo para tentar novamente."),
        
        p("— E Velros?"),
        
        p("Kaelon desviou o olhar."),
        
        d("— Velros... ele hesitou no ultimo momento. Quando finalmente alcancaram as bordas do Grande Atrator, ele tentou recuar. Tentou voltar. — ", "A voz de Kaelon falhou. — Os outros nao o deixaram. Disseram que sabia demais. Que nao podiam arriscar traicao. Entao..."),
        
        p("— Eles o consumiram — Grazy completou, horrorizado."),
        
        d("— Eles o consumiram — ", "Kaelon confirmou. — O irmao mais novo que os seguia por lealdade. O que nunca quis nada alem de pertencer. Consumido pelos proprios irmaos."),
        
        sb(),
        
        // CHAPTER 10
        ...ch("Capitulo X", "Os Ultimos da Luz"),
        epi("E na distancia, longe do colapso, os Aetheres permaneceram — puros, vigilantes, carregando o peso de serem os unicos que poderiam ter salvado tudo."),
        
        d("— Os Aetheres me aceitaram como um de seu — ", "Kaelon disse. — Nao por confianca, mas por necessidade. Eu era a unica ligacao com o inimigo que tinham."),
        
        p("Juntos, desenvolveram algo que nunca havia existido antes: uma cooperacao consciente entre Luz e Sombra. Os Seres de Sombra nunca haviam trabalhado com Seres de Luz — apenas equilibravam-os. Mas com a orientacao de Kaelon e a pureza dos Aetheres, um novo sistema comecou a emergir."),
        
        d("— Nao foi uma vitoria — ", "Kaelon enfatizou. — Foi uma contencao. Os nove ainda existem. Ainda crescem. Ainda aguardam. Mas agora estamos preparados. Ou pelo menos, mais preparados do que estavamos."),
        
        d("— E o Fruto da Existencia? — ", "Grazy perguntou. — Ainda esta em perigo?"),
        
        d("— Sempre estara — ", "Kaelon respondeu. — Enquanto os nove existirem, o Fruto sera seu objetivo final. E eventualmente... eventualmente eles tentarao novamente. Com mais poder. Com mais conhecimento. E talvez, na proxima vez..."),
        
        p("Ele deixou a frase no ar, o peso do possivel desastre obvio."),
        
        sb(),
        
        // EPILOGUE
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("Epilogo")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "A Promessa", size: 32, bold: true, color: colors.primary })] }),
        
        p("A chama da lamparina estava quase apagada quando Kaelon terminou sua historia. Grazy permaneceu em silencio por um longo momento, processando tudo que ouvira."),
        
        d("— Por que me contou isso? — ", "ele finalmente perguntou. — Por que agora?"),
        
        p("Kaelon se levantou lentamente, seus ossos rangendo com a idade."),
        
        d("— Porque eles estao voltando, Grazy — ", "ele disse, a voz subitamente forte. — Posso sentir. Depois de eras no vazio, os nove finalmente encontraram o caminho de volta. E desta vez, precisamos estar prontos."),
        
        d("— E voce acha que eu posso fazer algo? — ", "Grazy perguntou, incredulo. — Eu sou apenas um Aethere. Nao sou especial. Nao sou—"),
        
        d("— Voce e a semente — ", "Kaelon interrompeu. — A semente do que precisa crescer. Dos Aetheres, voce e o unico com potencial para se tornar algo mais. Algo capaz de enfrentar os nove."),
        
        p("Ele se aproximou de Grazy, colocando uma mao enrugada em seu ombro."),
        
        d("— Eu falhei com Velros. Falhei com os outros. Falhei com toda a criacao quando nao tive coragem de agir quando podia ter feito diferenca. — ", "Seus olhos encontraram os de Grazy. — Nao vou falhar com voce. Nao vou deixar outro jovem ser consumido pela indecisao. Por isso vou treina-lo. Vou lhe dar tudo que sei. E quando os nove finalmente surgirem do vazio... voce estara pronto."),
        
        p("Grazy engoliu em seco, o peso da responsabilidade descendo sobre seus ombros."),
        
        d("— E se eu falhar tambem? — ", "ele perguntou, a voz baixa."),
        
        p("Kaelon sorriu — um sorriso triste, mas cheio de algo que Grazy nao esperava: esperanca."),
        
        d("— Entao tentaremos de novo. E de novo. E de novo. — ", "Ele se virou para a porta do templo. — Essa e a unica promessa que posso fazer. A promessa de continuar tentando. A promessa de que, enquanto houver luz, havera esperanca. E enquanto houver esperanca..."),
        
        p("Ele parou na entrada, a luz da lua prateada delineando sua forma antiga."),
        
        p("— ...nada esta perdido. Amanha ao nascer do sol, seu treinamento comeca. Durma bem, Grazy. Pois a partir de amanha... voce vai precisar de toda a forca que puder reunir."),
        
        p("E com isso, o antigo Nihilaryth — o traidor arrependido, o sobrevivente relutante, o contador de historias — desapareceu na noite, deixando Grazy sozinho com a chama morrente e o peso de um destino que mal comecava a compreender."),
        
        p("Em algum lugar no vazio entre os mundos, nove pontos de luz esperavam, observavam, acumulavam poder. Seu retorno nao era questao de se, mas de quando. E quando chegassem, tudo que existia estaria em jogo."),
        
        p("Esta e a semente da eternidade — o momento em que o futuro foi tracado por eras que ainda viriam.")
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Remasterizado.docx", buffer);
  console.log("Document created successfully!");
});
