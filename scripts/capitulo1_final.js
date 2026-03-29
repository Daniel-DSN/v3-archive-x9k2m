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
        children: [new TextRun({ text: "ALYNDRAS - A Semente da Eternidade", italics: true, size: 20 })]
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
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "A L Y N D R A S", bold: true, size: 48, font: "Times New Roman" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "A SEMENTE DA ETERNIDADE", bold: true, size: 36, font: "Times New Roman" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "Livro I", italics: true, size: 24 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // CAPÍTULO
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "CAPÍTULO I", bold: true, size: 32, font: "Times New Roman", smallCaps: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: "Sementes do Passado", italics: true, size: 26 })] }),
      
      // ═══════════════════════════════════════════════════════════════
      // FLASH PRIMORDIAL
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "[Há eras imemoriais, em um lugar entre lugares...]", italics: true, size: 22 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Dois irmãos se enfrentavam no vórtice de realidade fragmentada — Luz contra Trevas, a última batalha de uma guerra que durara milênios.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos brilhava como mil sóis. Diante dele, Nyxalor era um buraco no tecido da existência, sombras pulsantes onde nove consciências corrompidas se entrelaçavam. Quando o golpe final veio, uma figura cortou o espaço entre os irmãos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Elarys, a Seraphyen de Fogo Sombra, não bloqueou. Ela absorveu. O ataque atravessou-a, e seu corpo tombou — não dissipado, mas morto. Sua armadura negra brilhava com resquícios de poder, testemunho silencioso do sacrifício supremo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— A luz não pode brilhar sem as sombras que a definem —", italics: true, size: 24 }),
        new TextRun({ text: " foram suas últimas palavras.", size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos, com o coração em pedaços, ergueu as mãos. Luz pura fluiu de seu ser, formando cadeias que prenderam Nyxalor entre as dimensões. Com delicadeza infinita, ele ergueu o corpo de Elarys e o levou para um santuário entre as estrelas — onde repousaria eternamente, sua armadura preservada como relíquia de um amor maior que a existência.", size: 24 })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 400 }, children: [
        new TextRun({ text: "E assim, a luz aprendeu que até as sombras mais profundas foram, um dia, amadas.", italics: true, size: 24 })
      ] }),
      
      // SEPARADOR
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // ═══════════════════════════════════════════════════════════════
      // NASCIMENTO DE GRAZIELLY
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "[Oito anos antes do presente...]", italics: true, size: 22 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Santuário de Aquaryn nunca havia visto uma tempestade como aquela.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Relâmpagos cortavam o céu tropical do Reino da Água enquanto curandeiros corriam no interior do santuário. Na cama de parto, Ayla lutava por cada respiração — e pela vida que tentava trazer ao mundo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela era uma mulher de beleza incomum, cabelos escuros como a noite, olhos que continham segredos de eras. Agora, esses olhos estavam fechados, sua força se esvaindo com cada contração.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Quando o choro finalmente ecoou, a tempestade começou a cessar.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— É uma menina —", bold: true, size: 24 }),
        new TextRun({ text: " a curandeira sussurrou, colocando a criança nos braços da mãe. ", size: 24 }),
        new TextRun({ text: "Ela é perfeita.", bold: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ayla abriu os olhos uma última vez. A criança tinha olhos castanhos, profundos. Mas havia algo mais — quando o cristal de cura próximo pulsou, não mostrou cor nenhuma.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Grazielly —", italics: true, size: 24 }),
        new TextRun({ text: " Ayla murmurou com o último fôlego. ", size: 24 }),
        new TextRun({ text: "Significa 'graça'. Você é minha graça... minha herança... meu amor.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E então Ayla, descendente de Ilyos, guardiã de segredos antigos, deixou de existir. O cristal ao seu lado escureceu definitivamente. Naquele momento, uma criança se tornou órfã — e o mundo ganhou uma heroína sem saber.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Longe dali, em um palácio distante, um homem que seria pai nunca soube que sua filha havia nascido. E que seu amor havia morrido.", size: 24, italics: true })] }),
      
      // SEPARADOR
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // ═══════════════════════════════════════════════════════════════
      // PRESENTE - ORFANATO
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "[Presente...]", italics: true, size: 22 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Orfanato das Asas ficava nas colinas suaves do Reino do Vento, onde o céu era sempre mais azul e a brisa carregava o cheiro de flores silvestres. Era um lugar simples — paredes de pedra clara, janelas abertas para o sol, um jardim onde crianças brincavam sob o cuidado de mestras pacientes.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly tinha sete anos e olhos que viam mais do que deveriam.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Enquanto outras crianças corriam atrás de borboletas ou choravam por seus pais perdidos, Grazielly sentava sob a árvore mais alta do jardim e observava. Observava tudo. A forma como as nuvens se moviam. A maneira como os pássaros sabiam quando uma tempestade estava chegando. O jeito que a Mestra Liora sorria quando pensava que ninguém estava olhando.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela era quieta, mas não tímida. Calada, mas não isolada. As outras crianças a respeitavam de um jeito que não sabiam explicar — como se intuissem que havia algo nela que não existia nos outros.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Grazielly! —", bold: true, size: 24 }),
        new TextRun({ text: " uma voz a chamou. Era Tomás, um menino de seis anos que a seguia como um patinho. ", size: 24 }),
        new TextRun({ text: "Você vai contar uma história hoje?", bold: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly sorriu. Era um sorriso raro, mas genuíno.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— À noite —", italics: true, size: 24 }),
        new TextRun({ text: " ela prometeu. ", size: 24 }),
        new TextRun({ text: "Hoje vou contar sobre os Vanguardas.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Os olhos de Tomás brilharam. Todos no orfanato conheciam as histórias que Grazielly contava — histórias de heróis mascarados que protegiam os fracos, guerreiros que lutavam nas sombras pela justiça. Ela não sabia de onde vinham aquelas histórias, mas as contava como se tivesse vivido cada uma.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Na verdade, Grazielly ouvia os viajantes que passavam pelo orfanato. Comerciantes, peregrinos, soldados aposentados — todos traziam notícias do mundo exterior. E ela absorvia cada palavra como uma esponja.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas havia algo que ela não contava para ninguém. Um sonho que acordava com ela todas as manhãs e a acompanhava durante o dia.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "Eu vou ser como eles um dia.", italics: true, size: 24, bold: true })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela não sabia por que tinha essa certeza. Não sabia por que, quando fechava os olhos à noite, via sombras de batalhas que nunca presenciou e sentia calor de fogos que nunca queimaram. Só sabia que era verdade — tão verdade quanto o sol no céu ou o vento em seu rosto.", size: 24 })] }),
      
      // ═══════════════════════════════════════════════════════════════
      // A INSCRIÇÃO PARA A ACADEMIA
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O dia em que tudo mudou começou como qualquer outro.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly estava no jardim, observando uma formiga carregar uma folha três vezes maior que ela, quando a Mestra Liora a chamou. Havia um homem com ela — alto, vestido com o uniforme azul-prateado da Academia Elemental do Reino do Vento.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Grazielly —", bold: true, size: 24 }),
        new TextRun({ text: " disse a Mestra Liora, com um sorriso estranho no rosto. ", size: 24 }),
        new TextRun({ text: "Este é o Mestre Corin. Ele... ele quer falar com você.", bold: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly se levantou, sacudindo a terra do vestido simples. Seu coração batia rápido, mas seu rosto permanecia calmo. Ela observou o homem — sua postura ereta, o cristal pendurado em seu peito, a forma como seus olhos a examinavam.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Você é a criança que faz perguntas difíceis, não é? —", bold: true, size: 24 }),
        new TextRun({ text: " o Mestre Corin disse, se ajoelhando para ficar na altura dela. ", size: 24 }),
        new TextRun({ text: "A que perguntou ao mercador por que os preços variam conforme a lua.", bold: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly assentiu, sem sorrir.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— A maré afeta o transporte —", italics: true, size: 24 }),
        new TextRun({ text: " ela disse simplesmente. ", size: 24 }),
        new TextRun({ text: "E a lua afeta a maré.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Mestre Corin trocou um olhar com a Mestra Liora.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Como você sabe disso?", italics: true, size: 24 }),
        new TextRun({ text: " ele perguntou.", size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Eu observei —", italics: true, size: 24 }),
        new TextRun({ text: " Grazielly respondeu. ", size: 24 }),
        new TextRun({ text: "E perguntei.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Houve um silêncio. Então o Mestre Corin sorriu — um sorriso genuíno, de quem encontrou algo que não esperava.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Grazielly —", bold: true, size: 24 }),
        new TextRun({ text: " ele disse, ", size: 24 }),
        new TextRun({ text: "a Academia Elemental abre inscrições para crianças talentosas. Normalmente, só aceitamos a partir dos dez anos. Mas às vezes... às vezes encontramos alguém especial.", bold: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ele tirou do bolso um pergaminho com um selo prateado.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Sua inscrição já foi aprovada. Uma bolsa especial, custeada por... um benfeitor anônimo. —", italics: true, size: 24 }),
        new TextRun({ text: " Ele fez uma pausa significativa. ", size: 24 }),
        new TextRun({ text: "Você começa na próxima segunda-feira.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly pegou o pergaminho. Suas mãos não tremiam, mas algo dentro dela — algo profundo, algo que não tinha nome — deu um salto.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Obrigada —", italics: true, size: 24 }),
        new TextRun({ text: " ela disse, com a voz firme. ", size: 24 }),
        new TextRun({ text: "Não vou desperdiçar essa chance.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Mestre Corin assentiu, impressionado. A Mestra Liora tinha lágrimas nos olhos. E Tomás, que observava de longe, correu para contar a todos que sua amiga Grazielly ia para a Academia.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ninguém percebeu que, em algum lugar distante, um Grande Mestre havia recebido um relatório sobre uma órfã do Reino do Vento. Um relatório que ele guardou sem entender por quê. Algo naquele nome — Grazielly — ecoou em sua memória como uma canção que ele costumava cantar para alguém que amou, muito tempo atrás.", size: 24, italics: true })] }),
      
      // SEPARADOR
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // ═══════════════════════════════════════════════════════════════
      // PRIMEIRO DIA DE ACADEMIA
      // ═══════════════════════════════════════════════════════════════
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A Academia Elemental do Reino do Vento erguia-se como um palácio de contos de fadas.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Torres de pedra clara tocavam as nuvens, suas pontas ornamentadas com cristais que capturavam a luz do sol. Jardins imensos cercavam o edifício principal, onde estudantes de todas as idades praticavam sob a orientação de mestres vestidos em túnicas coloridas. O som de risadas, de elemental colidindo em treinamento, de vozes discutindo teoria — tudo isso formava uma sinfonia que Grazielly nunca tinha ouvido.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela estava parada diante dos portões, o pergaminho de inscrição apertado contra o peito. Seu vestido simples parecia fora de lugar entre as túnicas elegantes dos outros estudantes. Seus sapatos gastos pareciam inadequados para os corredores de mármore que via à frente.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas seus olhos — aqueles olhos castanhos que viam mais do que deveriam — brilhavam com uma determinação que nenhum vestido elegante poderia imitar.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Outras crianças passavam por ela, acompanhadas de pais que abraçavam, beijavam, choravam de orgulho. Grazielly não tinha ninguém. A Mestra Liora não puderam acompanhá-la — o orfanato exigia sua presença. Tomás queria vir, mas era pequeno demais para entender o que aquele dia significava.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Então Grazielly estava sozinha.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E pela primeira vez, isso doeu um pouco.", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas apenas um pouco.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Porque Grazielly sabia — sem saber como sabia — que não estava verdadeiramente sozinha. Que em algum lugar, alguém a observava. Que em algum lugar, o vento carregava uma promessa que fora feita antes mesmo de ela nascer.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela respirou fundo. O ar da Academia cheirava a possibilidades — a livros antigos, a poeira de elemental gasto em prática, a suor de anos de treinamento. Cheirava a futuro.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Um menino passou correndo e quase a derrubou. Não pediu desculpas — apenas continuou correndo, rindo com amigos que o seguiam. Uma menina de vestido azul a olhou de cima a baixo, franziu o nariz, e se afastou.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Grazielly não se abalou.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela ergueu o queixo. Endireitou os ombros. E deu o primeiro passo através dos portões.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Não sabia que, no mesmo momento, em um limiar entre dimensões, Ilyos sorriu pela primeira vez em eras. Não sabia que, em um palácio distante, Aurelius olhava para um relatório e sentia algo que não podia nomear. Não sabia que os fragmentos de Elarys, espalhados pelo universo, pulsavam em reconhecimento.", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela só sabia uma coisa:", size: 24 })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "Este era o começo.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E ela estava pronta.", size: 24 })] }),
      
      // SEPARADOR FINAL
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // FIM
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: "FIM DO CAPÍTULO I", bold: true, size: 24, smallCaps: true })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Livro1_Capitulo1_v3.docx", buffer);
  console.log("Capítulo 1 final criado com sucesso!");
});
