const { Document, Packer, Paragraph, TextRun, Header, Footer, PageNumber, AlignmentType, HeadingLevel, PageBreak } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: "000000", font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "000000", font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "000000", font: "Times New Roman" },
        paragraph: { spacing: { before: 180, after: 180 }, outlineLevel: 1 } }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ 
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "ALYNDRA - A Semente da Eternidade", italics: true, size: 20 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "— ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 }), new TextRun({ text: " —", size: 20 })]
      })] })
    },
    children: [
      // CAPÍTULO 2
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "CAPÍTULO II", bold: true, size: 32, font: "Times New Roman", smallCaps: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: "A Garota que Observava", italics: true, size: 26 })] }),
      
      // ═══════════════════════════════════════════════════════════════
      // ORFANATO
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "[Presente...]", italics: true, size: 22 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Orfanato das Asas ficava nas colinas suaves do Reino do Vento, onde o céu parecia mais azul e o ar mais leve. Era um lugar de pedra clara e janelas sempre abertas, cercado por campos de flores silvestres que balançavam sob a brisa constante. O nome vinha da tradição local — dizia-se que as almas das crianças perdidas encontravam ali asas para voar novamente.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Reino do Vento era conhecido por ser o mais tranquilo dos sete reinos. Enquanto o Reino do Fogo fervilhava com paixão e disputas, enquanto o Reino da Água navegava por políticas complexas, o Reino do Vento simplesmente... existia. Seu povo valorizava a liberdade acima de tudo, a alegria simples da vida cotidiana, a paz que vem de não querer mais do que se tem.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Era o lugar perfeito para uma órfã crescer — longe dos olhares políticos, longe das intrigas de poder, longe de qualquer um que pudesse fazer perguntas sobre uma criança de olhos castanhos que não mostrava afinidade elemental.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly tinha sete anos, e olhos que viam mais do que deveriam.", size: 24, bold: true })] }),
      
      // --- A OBSERVADORA ---
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Enquanto outras crianças corriam atrás de borboletas ou choravam por pais que nunca conheceriam, Grazielly sentava sob a árvore mais alta do jardim e observava. Observava tudo, com uma intensidade que às vezes incomodava os adultos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela observava a forma como as nuvens se moviam antes de uma tempestade. Observava como os pássaros sabiam exatamente quando se abrigar. Observava o jeito que a Mestra Liora sorria quando pensava que ninguém estava olhando — um sorriso triste, de alguém que carregava memórias que preferia esquecer. Observava como Tomás, o menino de seis anos que a seguia como um patinho, mancava levemente da perna esquerda quando estava cansado.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela via coisas que outras crianças não viam. Padrões onde outros viam caos. Conexões onde outros viam coincidências. Era como se seu cérebro estivesse sempre funcionando, sempre processando, sempre tentando entender um mundo que parecia cheio de segredos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Você é estranha — Tomás disse certa vez, sentando-se ao lado dela sob a árvore. Não era uma acusação — era uma observação curiosa, a forma como uma criança fala quando descobre algo novo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly sorriu. Era um sorriso raro, mas genuíno.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Eu sei —", italics: true, size: 24 }),
        new TextRun({ text: " ela respondeu. ", size: 24 }),
        new TextRun({ text: "Mas você gosta de mim assim.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Tomás riu, porque era verdade. Grazielly era estranha, sim. Mas era a estranha que contava as melhores histórias, que sabia quando alguém estava triste antes mesmo de chorar, que nunca julgava ninguém por ser diferente.", size: 24 })] }),
      
      // --- O CÉU NOTURNO ---
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "À noite, quando as outras crianças dormiam, Grazielly ficava na janela observando o céu.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O céu de Alyndra era diferente de outros mundos — não que Grazielly soubesse disso. Aurion, o sol dourado-alaranjado, já se punha no oeste, deixando o céu tingido de tons de laranja e rosa. E acima, emergindo lentamente no crepúsculo, as maravilhas do universo se revelavam.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Os Véus de Aether — faixas de nebulosas coloridas que atravessavam a escuridão — brilhavam suavemente em tons de roxo, azul e rosa. Eram como fitas de seda cósmica, tecidas por mãos invisíveis através de eras imemoriais. As crianças do orfanato diziam que eram os espíritos dos ancestrais, dançando no céu.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E além delas, quase imperceptível a olhos despreparados, havia um ponto minúsculo que pulsava com luz própria. O Olho de Yggorath, o coração da galáxia, vigiando eternamente. Grazielly não sabia seu nome — ninguém no orfanato sabia — mas ela sentia que era importante. Algumas noites, parecia pulsar mais forte, como se respondesse a algo que ela não conseguia nomear.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "As três luas também a fascinavam. Lyria, a maior, prateada e majestosa, dominava o céu noturno. Nyx, a discreta, com seu brilho azulado, parecia sussurrar segredos. E Elara, a menor, rosada e tímida, aparecia apenas em certas noites, como se escolhesse quando ser vista.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly não sabia por que, mas olhar para o céu a fazia sentir... menos sozinha. Como se alguém, em algum lugar além das estrelas, estivesse olhando de volta.", size: 24, italics: true })] }),
      
      // --- AS HISTÓRIAS DOS HERÓIS ---
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly tinha um dom especial: ela sabia ouvir.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Orfanato das Asas ficava próximo a uma estrada comercial, e viajantes de todos os reinos passavam por ali buscando água e descanso. Grazielly sempre se oferecia para ajudar — trazendo água, servindo pão, escovando cavalos. Em troca, ela pedia apenas uma coisa: histórias.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela ouvia tudo. Notícias do Reino do Fogo, onde um novo torneio fora anunciado. Rumores do Reino de Umbra, onde as sombras pareciam mais densas nos últimos tempos. Histórias de batalhas antigas, de heróis lendários, de criaturas que habitavam as fronteiras do mundo conhecido.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas suas favoritas eram as histórias dos Vanguardas.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Os Vanguardas são heróis mascarados — um mercador lhe contou certa vez, seus olhos brilhando com a empolgação de alguém que adora uma boa história. — Eles operam fora da lei, protegendo os fracos quando a justiça oficial falha. Ninguém sabe quem são debaixo das máscaras. Usam codinomes de animais — Lobo, Coruja, Falcão.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Eles são... criminosos? —", italics: true, size: 24 }),
        new TextRun({ text: " Grazielly perguntou, intrigada.", size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O mercador riu.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— O Grande Mestre diz que sim. Condena-os publicamente. Mas...", italics: true, size: 24 }),
        new TextRun({ text: " ele baixou a voz, como se compartilhasse um segredo. ", size: 24 }),
        new TextRun({ text: "Quando os Vanguardas salvaram minha vila de bandidos, nenhum soldado apareceu por semanas. As pessoas sabem a verdade. Os Vanguardas são heróis. Heróis que o mundo precisa, mesmo que não admita.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly guardou essa história. E muitas outras. À noite, quando as outras crianças pediam, ela contava — não como histórias simples, mas como se tivesse vivido cada uma. Havia algo em sua voz que fazia até os adultos pararem para ouvir.", size: 24 })] }),
      
      // --- O SONHO ---
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas havia algo que Grazielly não contava para ninguém.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Um sonho. Não um sonho noturno — algo mais profundo, mais constante. Uma certeza que acordava com ela todas as manhãs e a acompanhava durante o dia, pulsando em algum lugar profundo do seu ser.", size: 24 })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [
        new TextRun({ text: "Eu vou ser como eles um dia.", italics: true, size: 24, bold: true })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Não sabia por que tinha essa certeza. Não sabia por que, quando fechava os olhos à noite, via sombras de batalhas que nunca presenciou. Não sabia por que às vezes acordava com o coração acelerado, como se tivesse acabado de lutar, o corpo lembrando de movimentos que sua mente nunca aprendeu.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Só sabia que era verdade — tão verdade quanto o sol Aurion no céu ou o brilho prateado de Lyria nas noites claras.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela nasceu para isso. Para lutar. Para proteger. Para ser algo maior do que uma órfã esquecida em um orfanato no fim do mundo.", size: 24, italics: true })] }),
      
      // ═══════════════════════════════════════════════════════════════
      // A INSCRIÇÃO
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O dia em que tudo mudou começou como qualquer outro.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly estava no jardim, observando uma formiga carregar uma folha três vezes maior que ela. Era fascinante — a determinação da pequena criatura, a forma como contornava obstáculos, a persistência mesmo quando a folha parecia pesada demais. Ela estava tão concentrada que quase não ouviu a Mestra Liora chamá-la.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Grazielly! —", bold: true, size: 24 }),
        new TextRun({ text: " a voz da mestra tinha um tom estranho. ", size: 24 }),
        new TextRun({ text: "Pode vir até a cozinha? Há... alguém que quer falar com você.", bold: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly se levantou, sacudindo a terra do vestido simples. Seu coração batia um pouco mais rápido, mas seu rosto permanecia calmo — ela aprendera cedo que mostrar medo ou excitação só dava poder aos outros sobre você.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Na cozinha, havia um homem esperando. Alto, vestido com o uniforme azul-prateado da Academia Elemental do Reino do Vento, um cristal pendurado ao pescoço que brilhava suavemente. Seus olhos examinaram Grazielly da cabeça aos pés — não com julgamento, mas com curiosidade científica.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Então esta é a criança —", italics: true, size: 24 }),
        new TextRun({ text: " ele murmurou, mais para si mesmo do que para os outros. Se ajoelhou para ficar na altura de Grazielly. ", size: 24 }),
        new TextRun({ text: "Olá, pequena. Eu sou o Mestre Corin, da Academia Elemental. Você sabe o que é uma Academia Elemental?", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly assentiu.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— É onde as crianças aprendem a usar seus elementos —", italics: true, size: 24 }),
        new TextRun({ text: " ela disse. ", size: 24 }),
        new TextRun({ text: "Fogo, água, terra, ar, relâmpago, luz e sombra.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Mestre Corin ergueu as sobrancelhas, impressionado.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Muito bom. E você sabe qual é o seu elemento?", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly hesitou. O cristal no Santuário de Aquaryn não mostrara nada. As provas comuns não detectaram afinidade. Todo mundo achava que ela era sem elemento — uma anomalia rara, uma criança comum em um mundo de poder.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Não —", italics: true, size: 24 }),
        new TextRun({ text: " ela disse simplesmente. ", size: 24 }),
        new TextRun({ text: "Não tenho elemento.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Mestre Corin sorriu — não um sorriso de pena ou decepção, mas algo mais complexo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Isso é o que os cristais dizem —", italics: true, size: 24 }),
        new TextRun({ text: " ele disse. ", size: 24 }),
        new TextRun({ text: "Mas cristais podem ser enganados. Ou... podem não saber ler o que veem. —", italics: true, size: 24 }),
        new TextRun({ text: " Ele tirou do bolso um pergaminho com um selo prateado. ", size: 24 }),
        new TextRun({ text: "Grazielly, você é a criança que faz perguntas difíceis, não é? A que perguntou ao mercador por que os preços variam conforme as fases de Lyria.", bold: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly assentiu novamente, sem sorrir.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— A maré afeta o transporte —", italics: true, size: 24 }),
        new TextRun({ text: " ela explicou. ", size: 24 }),
        new TextRun({ text: "E Lyria afeta a maré. Quando Lyria está cheia, a maré sobe mais. Os barcos podem carregar mais carga, mas também enfrentam correntzas mais fortes. Isso afeta os preços.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Houve um silêncio. A Mestra Liora parecia tão impressionada quanto o Mestre Corin. Tomás, que observava da porta com outros crianças, arregalava os olhos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Como você sabe disso? —", italics: true, size: 24 }),
        new TextRun({ text: " o Mestre Corin perguntou, sua voz agora séria.", size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Eu observei —", italics: true, size: 24 }),
        new TextRun({ text: " Grazielly disse. ", size: 24 }),
        new TextRun({ text: "E perguntei. E escutei as respostas.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Mestre Corin se levantou, o sorriso retornando — genuíno desta vez, o sorriso de alguém que encontrou algo que não esperava.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Grazielly —", bold: true, size: 24 }),
        new TextRun({ text: " ele disse, ", size: 24 }),
        new TextRun({ text: "a Academia Elemental normalmente aceita crianças a partir dos dez anos. Mas às vezes... às vezes encontramos alguém especial. Alguém que pensa diferente. Alguém que vê o que outros não veem. —", bold: true, size: 24 }),
        new TextRun({ text: " Ele estendeu o pergaminho. ", size: 24 }),
        new TextRun({ text: "Sua inscrição já foi aprovada. Uma bolsa especial, custeada por... um benfeitor anônimo. Você começa na próxima segunda-feira.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly pegou o pergaminho. Suas mãos não tremiam — ela não permitia que tremessem. Mas algo dentro dela, algo profundo que não tinha nome, deu um salto. O papel era grosso, oficial, carimbado com o selo da Academia. Era real.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Obrigada —", italics: true, size: 24 }),
        new TextRun({ text: " ela disse, com a voz firme e os olhos brilhando. ", size: 24 }),
        new TextRun({ text: "Não vou desperdiçar essa chance.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Mestre Corin assentiu, impressionado. A Mestra Liora tinha lágrimas nos olhos. E Tomás correu para contar a todos que sua amiga Grazielly ia para a Academia.", size: 24 })] }),
      
      // --- O BENFEITOR ---
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ninguém no orfanato sabia quem era o benfeitor anônimo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ninguém sabia que, em um palácio distante no Reino Central, o Décimo Segundo Grande Mestre de Nova Aetherion havia recebido um relatório sobre uma órfã do Reino do Vento. Um relatório que mencionava uma criança de sete anos, sem afinidade detectável, mas com uma inteligência incomum.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Aurelius guardara o relatório sem entender por quê. Algo naquele nome — Grazielly — ecoou em sua memória como uma canção que ele costumava cantar para alguém que amou, muito tempo atrás. Uma canção que ele esquecera a letra, mas cuja melodia ainda fazia seu coração doer.", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ele autorizara a bolsa sem saber que era sua filha. Sem saber que a mulher que amara estava morta. Sem saber que a criança que observava estrelas em um orfanato distante carregava seu sangue e o sangue de Ilyos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Alguns fios do destino são tecidos por mãos que não conhecemos.", size: 24, italics: true })] }),
      
      // ═══════════════════════════════════════════════════════════════
      // PRIMEIRO DIA DE ACADEMIA
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A Academia Elemental do Reino do Vento erguia-se como um palácio de contos de fadas.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Torres de pedra clara tocavam as nuvens, suas pontas ornamentadas com cristais que capturavam a luz dourada de Aurion e a refratavam em arco-íris que dançavam sobre os jardins. Estudantes de todas as idades percorriam os caminhos de pedra — alguns em túnicas coloridas indicando seu ano, outros ainda em roupas comuns de recém-chegados.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O ar vibrava com energia. Literalmente — Grazielly podia sentir, como uma formigação na pele, o Aethra de centenas de estudantes praticando, vivendo, existindo juntos. Era uma sensação esmagadora e emocionante ao mesmo tempo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela estava parada diante dos portões, o pergaminho de inscrição apertado contra o peito. Seu vestido simples — o melhor que tinha, lavado e passado pela Mestra Liora — parecia fora de lugar entre as túnicas elegantes. Seus sapatos gastos pareciam inadequados para os corredores de mármore que via à frente.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Outras crianças passavam por ela, acompanhadas de pais que abraçavam, beijavam, choravam de orgulho. Mães que ajeitavam cabelos. Pais que davam conselhos de última hora. Irmãos mais velhos que provocavam e encorajavam.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly não tinha ninguém.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A Mestra Liora não pudera acompanhá-la — o orfanato exigia sua presença. Tomás queria vir, mas era pequeno demais para entender o que aquele dia significava. Não havia mais ninguém.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E pela primeira vez em muito tempo, isso doeu.", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas apenas um pouco. Grazielly aprendera cedo a transformar dor em determinação, solidão em força. Ela ergueu o queixo, endireitou os ombros, e olhou para os portões como um general olha para um campo de batalha.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Acima dela, o céu matinal exibia suas maravilhas. Lyria ainda visível no horizonte oeste, pálida contra a luz de Aurion. Os Véus de Aether desenhando fitas de cor através do azul. E ali, constante e eterno, o Olho de Yggorath pulsava suavemente — um lembrete de que o universo era vasto, antigo, e cheio de mistérios esperando para serem descobertos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Um menino passou correndo e quase a derrubou. Não pediu desculpas — apenas continuou correndo, rindo com amigos que o seguiam. Uma menina de vestido azul a olhou de cima a baixo, franziu o nariz, e se afastou como se pobreza fosse contagiosa.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly não se abalou. Não deixou que abalassem.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela respirou fundo. O ar da Academia cheirava a possibilidades — a livros antigos, a poeira de elemental gasto em prática, a suor de anos de treinamento. Cheirava a futuro.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E deu o primeiro passo através dos portões.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Não sabia que, no mesmo momento, em um limiar entre dimensões, Ilyos sorriu pela primeira vez em eras. Não sabia que, em um palácio distante, Aurelius olhava para um relatório e sentia algo que não podia nomear. Não sabia que os fragmentos de Elarys, espalhados pelo universo, pulsavam em reconhecimento.", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Não sabia que sua mãe, em seus últimos momentos, tinha visto algo nela que ninguém mais conseguia ver.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela só sabia uma coisa:", size: 24 })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "Este era o começo.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E ela estava pronta.", size: 24 })] }),
      
      // SEPARADOR FINAL
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // FIM DO CAP 2
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: "FIM DO CAPÍTULO II", bold: true, size: 24, smallCaps: true })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Livro1_Capitulo2.docx", buffer);
  console.log("Capítulo 2 criado!");
});
