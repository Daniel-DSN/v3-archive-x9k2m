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
      
      // FLASHBACK PRIMORDIAL
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "[Há milênios, em um lugar entre lugares...]", italics: true, size: 22 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O céu não era céu. A terra não era terra. Era tudo e nada ao mesmo tempo — um vórtice de realidade fragmentada onde dois irmãos se enfrentavam pela última vez.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos brilhava como mil sóis, sua luz irradiando ondas de revelação que dissolviam mentiras e ilusões. Diante dele, Nyxalor era um buraco no tecido da existência — sombras pulsantes, escuridão viva, nove consciências corrompidas se entrelaçando em um corpo que já não lhe pertencia.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Irmão...", italics: true, size: 24 }),
        new TextRun({ text: " A voz de Nyxalor era muitas vozes, um coro dissonante. ", size: 24 }),
        new TextRun({ text: "Você ainda acredita que pode me salvar?", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos não respondeu. Não havia palavras para o que sentia. Apenas dor — a dor de ver seu outro metade, seu complemento, seu irmão, transformado em algo que nunca deveria existir.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Nyxalor avançou. As sombras se projetaram como lanças, atravessando o espaço em velocidade impossível. Ilyos ergueu a mão e a luz explodiu, cada sombra encontrando sua contrapartida radiante. O choque rasgou dimensões.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Foi quando Elarys se moveu.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A Seraphyen de Fogo Sombra não hesitou. Seu corpo carmesim-escuro cortou o espaço entre os irmãos no exato momento em que Nyxalor preparava o golpe final. Ela não bloqueou. Ela absorveu.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O ataque atravessou-a como se ela fosse fumaça, mas a fumaça não se dissipou. Elarys concentrou toda a energia destrutiva em seu próprio ser, seu fogo sombrio consumindo o que teria aniquilado Ilyos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Elarys, não! —", bold: true, size: 24 }),
        new TextRun({ text: " Ilyos gritou.", size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas era tarde demais. O corpo de Elarys tombou, não dissipado, mas morto. Sua armadura negra como a noite ainda brilhava com resquícios de seu poder, seu corpo sem vida caído entre os dois irmãos. O fogo sombrio que ardia em seu interior se apagara, mas sua forma permanecia — um testemunho silencioso do sacrifício supremo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos correu para ela, mas sabia que nada podia fazer. Seraphyens não morrem como mortais — e quando morrem, é para sempre. O corpo de Elarys jazia ali, vazio, sua essência consumida para proteger aquele que ela amava como irmã.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— A luz não pode brilhar sem as sombras que a definem —", italics: true, size: 24 }),
        new TextRun({ text: " Elarys havia dito momentos antes, suas últimas palavras. ", size: 24 }),
        new TextRun({ text: "Estarei em cada sombra que sua luz criar. Brilhe por nós duas.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O silêncio que se seguiu durou uma eternidade. Nyxalor, enfraquecido pelo ataque que Elarys consumiu, recuou. Ilyos, com o coração em pedaços, ergueu ambas as mãos. Luz pura começou a fluir de seu ser — não mais como arma, mas como prisão.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Perdoe-me, irmão —", italics: true, size: 24 }),
        new TextRun({ text: " Ilyos disse, e havia lágrimas em sua voz. ", size: 24 }),
        new TextRun({ text: "Até que a cura seja possível... até que você possa voltar... você permanecerá aqui.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O selamento se formou. Cadeias de luz pura envolveram Nyxalor, prendendo-o entre as dimensões. Por um instante, algo parecido com o verdadeiro Nyxalor — não o ser corrompido, mas o irmão que Ilyos amava — apareceu em seus olhos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Eu sinto muito... —", italics: true, size: 24 }),
        new TextRun({ text: " Foi tudo que ele conseguiu dizer antes de desaparecer nas profundezas do selamento.", size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos permaneceu ali, sozinho no limiar dimensional. Ao seu lado, o corpo de Elarys aguardava silencioso. Com delicadeza infinita, ele o ergueu, levando-a para um local onde apenas os Seraphyens podiam ir — um santuário entre as estrelas, onde seu corpo repousaria eternamente, sua armadura preservada como testemunho de um amor maior que a própria existência.", size: 24 })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 400 }, children: [
        new TextRun({ text: "E assim, a luz aprendeu que até as sombras mais profundas foram, um dia, amadas.", italics: true, size: 24 })
      ] }),
      
      // SEPARADOR
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // GUERRA DOS TRÊS GRANDE MESTRES
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "[Duzentos e trinta anos antes do presente...]", italics: true, size: 22 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Palácio Flutuante de Luz ardia.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Não havia fogo real — as chamas eram metafóricas, mas a destruição era genuína. Três facções lutavam pelo trono do Grande Mestre, e cada lado estava disposto a arrastar Nova Aetherion para o abismo para alcançá-lo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Terceiro Grande Mestre, Theron, havia morrido sem nomear sucessor. Alguns diziam que foi assassinado. Outros, que enlouqueceu. A verdade morreu com ele. O que importava agora era o vácuo de poder — e três candidatos determinados a preenchê-lo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Lorde Kael do Reino do Fogo reclamava o trono pela força de armas. Mestra Vania do Reino da Água invocava direito de sangue. E entre eles, um jovem general chamado Aurelius lutava por algo que nenhum dos dois compreendia:", size: 24 })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "Equilíbrio.", italics: true, size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— A cidade não aguenta mais um dia disso! —", bold: true, size: 24 }),
        new TextRun({ text: " um soldado gritou sobre o estrondo de elemental colidindo com elemental.", size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Aurelius observava do alto de uma torre, seus olhos castanhos calculando cada movimento no campo de batalha abaixo. Ele não era o mais forte — nem de longe. Kael podia incinerar exércitos inteiros. Vania podia afogar cidades com um gesto. Aurelius tinha apenas astúcia.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E um segredo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Naquela noite, quando a lua estava alta, Aurelius encontrou-se com representantes dos dois lados. Não para negociar — para depor. Ele apresentou evidências que Kael havia envenenado Theron. Evidências que Vania havia autorizado massacres em nome da paz.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Nenhum dos dois era digno. Ambos sabiam.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A guerra terminou não com uma batalha épica, mas com silêncio. Kael foi exilado para Umbra. Vania retirou-se para um mosteiro no Reino do Vento, envergonhada. E Aurelius, o general que ninguém esperava, foi coroado Décimo Segundo Grande Mestre.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ele fez um juramento naquele dia, ajoelhado diante do Cristal de Aether:", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Nunca mais —", italics: true, size: 24 }),
        new TextRun({ text: " ele disse, sua voz ecoando pelo salão vazio, ", size: 24 }),
        new TextRun({ text: "este mundo verá sangue derramado por ambição ao trono. Eu carrego esta coroa, mas ela não me define. O povo me define.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ninguém sabia então que Aurelius carregava outro segredo. Alguém que ele amava. Alguém que jamais poderia ser reconhecida publicamente. Alguém que, em breve, lhe daria a coisa mais preciosa que já teria.", size: 24 })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 400 }, children: [new TextRun({ text: "Uma filha.", italics: true, size: 24, bold: true })] }),
      
      // SEPARADOR
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // NASCIMENTO DE GRAZIELLY
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "[Dezessete anos antes do presente...]", italics: true, size: 22 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Santuário de Aquaryn nunca havia visto uma tempestade como aquela.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Relâmpagos cortavam o céu tropical do Reino da Água, um após outro, como se o próprio céu estivesse em guerra. No interior do santuário, curandeiros corriam de um lado para outro, seus rostos pálidos sob a luz dos cristais de cura.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— A mãe está muito fraca! A transfusão de Aethra não está funcionando!", bold: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ayla deitava na cama, sua pele normalmente luminosa agora pálida como mármore. Ela era uma mulher de beleza incomum — cabelos escuros como a noite, olhos que pareciam conter segredos de eras passadas. Agora, esses olhos estavam fechados, sua respiração superficial.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Do lado de fora do santuário, um homem encapuzado observava a tempestade. Aurelius não podia entrar — não como Grande Mestre, não como o pai da criança que estava nascendo. Seu amor por Ayla era o segredo mais bem guardado de Nova Aetherion.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Aguente, Ayla —", italics: true, size: 24 }),
        new TextRun({ text: " ele sussurrou para a tempestade. ", size: 24 }),
        new TextRun({ text: "Por favor... aguente.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Dentro do santuário, algo mudou. Um grito — não de dor, mas de vida. E então, o choro de uma criança.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— É uma menina! —", bold: true, size: 24 }),
        new TextRun({ text: " a curandeira-chefe anunciou, sua voz tremendo. ", size: 24 }),
        new TextRun({ text: "Ela é... ela é perfeita.", bold: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ayla abriu os olhos. A custo, mas os abriu. A curandeira colocou a criança em seus braços, e por um momento que durou uma vida, mãe e filha se olharam.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A criança tinha os olhos de Aurelius — castanhos, profundos, determinados. Mas havia algo mais nela. Algo que os curandeiros não conseguiam nomear. Quando o cristal de cura próximo a ela pulsou, não mostrou cor nenhuma.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Sem afinidade? —", italics: true, size: 24 }),
        new TextRun({ text: " alguém sussurrou. ", size: 24 }),
        new TextRun({ text: "Como é possível? Os pais dela são...", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ayla sorriu. Um sorriso fraco, mas genuíno. Ela sabia a verdade.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Grazielly —", italics: true, size: 24 }),
        new TextRun({ text: " ela murmurou. ", size: 24 }),
        new TextRun({ text: "Seu nome é Grazielly. Significa 'graça' na língua antiga. Porque você é uma graça... a graça que eu deixarei neste mundo.", italics: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ayla fechou os olhos. Seu corpo relaxou. O cristal de cura ao seu lado escureceu.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [
        new TextRun({ text: "— Não! Mãe! —", bold: true, size: 24 }),
        new TextRun({ text: " A curandeira correu para ela. ", size: 24 }),
        new TextRun({ text: "Mestra Ayla!", bold: true, size: 24 })
      ] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas era tarde demais. Ayla, descendente de Ilyos, guardiã de segredos antigos, mãe de uma criança que mudaria o mundo... tinha partido.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ou pelo menos, era o que todos pensavam.", italics: true, size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Do lado de fora, Aurelius sentiu o momento em que a luz de Ayla se apagou — ou pareceu se apagar. Ele caiu de joelhos na chuva, seu coração se partindo em dois. Ele não podia entrar. Não podia revelar que a mulher que morrera era seu amor. Não podia reconhecer a criança que acabara de nascer.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas ele faria algo. Silenciosamente, secretamente, ele garantiria que Grazielly tivesse uma vida. Talvez não a vida que ele queria dar a ela — uma vida no palácio, com seu pai ao lado — mas uma vida. Uma chance.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A tempestade começou a cessar. Uma única estrela apareceu entre as nuvens, brilhando sobre o santuário.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Dentro, Grazielly chorava em seus primeiros momentos de vida. Não era um choro de medo ou frio. Aqueles com sensibilidade espiritual suficiente — e havia poucos — jurariam depois que ouviram algo diferente em seu choro.", size: 24 })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "Determinação.", italics: true, size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Como se a criança já soubesse que nascera para lutar.", size: 24 })] }),
      
      // SEPARADOR FINAL
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // EPILOGO
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "E em algum lugar distante, em um limiar entre dimensões,", italics: true, size: 22 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "Ilyos abriu os olhos.", italics: true, size: 22 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "Ele sentiu.", italics: true, size: 22 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "A criança nascera.", italics: true, size: 22 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "A herdeira de sua linhagem.", italics: true, size: 22 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 }, children: [new TextRun({ text: "A esperança que ele desesperadamente precisava.", italics: true, size: 22 })] }),
      
      // FIM
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: "FIM DO CAPÍTULO I", bold: true, size: 24, smallCaps: true })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Livro1_Capitulo1_v2.docx", buffer);
  console.log("Capítulo 1 revisado criado com sucesso!");
});
