const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, PageNumber, PageBreak,
        HeadingLevel, BorderStyle } = require('docx');
const fs = require('fs');

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
        run: { size: 56, bold: true, color: "1A1F16", font: "Times New Roman" },
        paragraph: { spacing: { before: 0, after: 400 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "ChapterTitle",
        name: "Chapter Title",
        basedOn: "Normal",
        run: { size: 36, bold: true, color: "1A1F16", font: "Times New Roman", smallCaps: true },
        paragraph: { spacing: { before: 600, after: 400 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "BodyText",
        name: "Body Text",
        basedOn: "Normal",
        run: { size: 24, color: "2D3329", font: "Times New Roman" },
        paragraph: { spacing: { line: 360, after: 200 }, alignment: AlignmentType.BOTH }
      },
      {
        id: "Dialogue",
        name: "Dialogue",
        basedOn: "Normal",
        run: { size: 24, color: "2D3329", font: "Times New Roman" },
        paragraph: { spacing: { line: 360, after: 120 }, indent: { left: 720 } }
      },
      {
        id: "SceneBreak",
        name: "Scene Break",
        basedOn: "Normal",
        run: { size: 24, color: "94A3B8", font: "Times New Roman" },
        paragraph: { spacing: { before: 400, after: 400 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Flashback",
        name: "Flashback",
        basedOn: "Normal",
        run: { size: 22, italics: true, color: "4A5548", font: "Times New Roman" },
        paragraph: { spacing: { line: 360, after: 200 }, alignment: AlignmentType.BOTH, indent: { left: 360, right: 360 } }
      }
    ]
  },
  sections: [
    // CAPA DO CAPÍTULO
    {
      properties: {
        page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } }
      },
      children: [
        new Paragraph({ spacing: { before: 6000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "A L Y N D R A S", size: 32, color: "94A3B8", font: "Times New Roman", smallCaps: true })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 24, color: "94A3B8" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "A SEMENTE DA ETERNIDADE", size: 48, bold: true, color: "1A1F16", font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "Livro I", size: 28, italics: true, color: "4A5548", font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 2000 },
          children: [new TextRun({ text: "CAPÍTULO I", size: 36, bold: true, color: "1A1F16", font: "Times New Roman", smallCaps: true })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 3000 },
          children: [new TextRun({ text: "Sementes do Passado", size: 28, italics: true, color: "4A5548", font: "Times New Roman" })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // CONTEÚDO DO CAPÍTULO
    {
      properties: {
        page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Alyndras — A Semente da Eternidade", size: 20, color: "94A3B8", font: "Times New Roman", italics: true })]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "— ", size: 20, color: "94A3B8" }),
              new TextRun({ children: [PageNumber.CURRENT], size: 20, color: "94A3B8" }),
              new TextRun({ text: " —", size: 20, color: "94A3B8" })
            ]
          })]
        })
      },
      children: [
        // FLASH 1: O CONFRONTO PRIMORDIAL
        new Paragraph({
          style: "Flashback",
          children: [new TextRun({ text: "[Há milênios, em um lugar entre lugares...]", bold: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("O céu não era céu. A terra não era terra. Era tudo e nada ao mesmo tempo — um vórtice de realidade fragmentada onde dois irmãos se enfrentavam pela última vez.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ilyos brilhava como mil sóis, sua luz irradiando ondas de revelação que dissolviam mentiras e ilusões. Diante dele, Nyxalor era um buraco no tecido da existência — sombras pulsantes, escuridão viva, nove consciências corrompidas se entrelaçando em um corpo que já não lhe pertencia.")]
        }),
        
        new Paragraph({
          style: "Dialogue",
          children: [new TextRun({ text: "— Irmão...", italics: true }), new TextRun(" A voz de Nyxalor era muitas vozes, um coro dissonante. "), new TextRun({ text: "Você ainda acredita que pode me salvar?"), italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ilyos não respondeu. Não havia palavras para o que sentia. Apenas dor — a dor de ver seu outro metade, seu complemento, seu irmão, transformado em algo que nunca deveria existir.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Nyxalor avançou. As sombras se projetaram como lanças, atravessando o espaço em velocidade impossível. Ilyos ergueu a mão e a luz explodiu, cada sombra encontrando sua contrapartida radiante. O choque rasgou dimensões.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Foi quando Elarys se moveu.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("A Seraphyen de Fogo Sombra não hesitou. Seu corpo carmesim-escuro cortou o espaço entre os irmãos no exato momento em que Nyxalor preparava o golpe final. Ela não bloqueou. Ela "), new TextRun({ text: "absorveu", italics: true }), new TextRun(".")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("O ataque atravessou-a como se ela fosse fumaça, mas a fumaça não se dissipou. Elarys concentrou toda a energia destrutiva em seu próprio ser, seu fogo sombrio consumindo o que teria aniquilado Ilyos.")]
        }),
        
        new Paragraph({
          style: "Dialogue",
          children: [new TextRun({ text: "— Elarys, não! —", italics: true }), new TextRun(" Ilyos gritou.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Mas era tarde demais. Elarys já estava se desfazendo, seu corpo de Seraphyen se transformando em nada. Ela olhou para Ilyos uma última vez, e havia paz em seus olhos.")]
        }),
        
        new Paragraph({
          style: "Dialogue",
          children: [new TextRun({ text: "— A luz não pode brilhar sem as sombras que a definem —", italics: true }), new TextRun(" ela sussurrou. "), new TextRun({ text: "Estarei em cada sombra que sua luz criar. Brilhe por nós duas."), italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("E então Elarys deixou de existir.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("O silêncio que se seguiu durou uma eternidade. Nyxalor, enfraquecido pelo ataque que Elarys consumiu, recuou. Ilyos, com o coração em pedaços, ergueu ambas as mãos. Luz pura começou a fluir de seu ser — não mais como arma, mas como prisão.")]
        }),
        
        new Paragraph({
          style: "Dialogue",
          children: [new TextRun({ text: "— Perdoe-me, irmão —", italics: true }), new TextRun(" Ilyos disse, e havia lágrimas em sua voz. "), new TextRun({ text: "Até que a cura seja possível... até que você possa voltar... você permanecerá aqui."), italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("O selamento se formou. Cadeias de luz pura envolveram Nyxalor, prendendo-o entre as dimensões. Por um instante, algo parecido com o verdadeiro Nyxalor — não o ser corrompido, mas o irmão que Ilyos amava — apareceu em seus olhos.")]
        }),
        
        new Paragraph({
          style: "Dialogue",
          children: [new TextRun({ text: "— Eu sinto muito... —", italics: true }), new TextRun(" Foi tudo que ele conseguiu dizer antes de desaparecer nas profundezas do selamento.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ilyos permaneceu ali, sozinho no limiar dimensional, vigiando a prisão de seu irmão. Ele faria isso por toda a eternidade, se necessário. Porque no final, era tudo que restava do amor entre dois filhos da Árvore Primordial.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          spacing: { after: 300 },
          children: [new TextRun({ text: "E assim, a luz aprendeu que até as sombras mais profundas foram, um dia, amadas.", italics: true })]
        }),

        // QUEBRA DE CENA
        new Paragraph({ style: "SceneBreak", children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")] }),

        // FLASH 2: A GUERRA DOS TRÊS GMs
        new Paragraph({
          style: "Flashback",
          children: [new TextRun({ text: "[Sessenta anos antes do presente...]", bold: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("O Palácio Flutuante de Luz ardia.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Não havia fogo real — as chamas eram metafóricas, mas a destruição era genuína. Três facções lutavam pelo trono do Grande Mestre, e cada lado estava disposto a arrastar Nova Aetherion para o abismo para alcançá-lo.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("O Terceiro Grande Mestre, Theron, havia morrido sem nomear sucessor. Alguns diziam que foi assassinado. Outros, que enlouqueceu. A verdade morreu com ele. O que importava agora era o vácuo de poder — e três candidatos determinados a preenchê-lo.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Lorde Kael do Reino do Fogo reclamava o trono pela força de armas. Mestra Vania do Reino da Água invocava direito de sangue. E entre eles, um jovem general chamado Aurelius lutava por algo que nenhum dos dois compreendia:")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Equilíbrio.", italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("— A cidade não aguenta mais um dia disso! — um soldado gritou sobre o estrondo de elemental colidindo com elemental.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Aurelius observava do alto de uma torre, seus olhos castanhos calculando cada movimento no campo de batalha abaixo. Ele não era o mais forte — nem de longe. Kael podia incinerar exércitos inteiros. Vania podia afogar cidades com um gesto. Aurelius tinha apenas astúcia.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("E um segredo.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Naquela noite, quando a lua estava alta, Aurelius encontrou-se com representantes dos dois lados. Não para negociar — para depor. Ele apresentou evidências que Kael havia envenenado Theron. Evidências que Vania havia autorizado massacres em nome da paz.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Nenhum dos dois era digno. Ambos sabiam.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("A guerra terminou não com uma batalha épica, mas com silêncio. Kael foi exilado para Umbra. Vania retirou-se para um mosteiro no Reino do Vento, envergonhada. E Aurelius, o general que ninguém esperava, foi coroado Quarto Grande Mestre.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ele fez um juramento naquele dia, ajoelhado diante do Cristal de Aether:")]
        }),
        
        new Paragraph({
          style: "Dialogue",
          children: [new TextRun({ text: "— Nunca mais —", italics: true }), new TextRun(" ele disse, sua voz ecoando pelo salão vazio, "), new TextRun({ text: "este mundo verá sangue derramado por ambição ao trono. Eu carrego esta coroa, mas ela não me define. O povo me define."), italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ninguém sabia então que Aurelius carregava outro segredo. Alguém que ele amava. Alguém que jamais poderia ser reconhecida publicamente. Alguém que, em breve, lhe daria a coisa mais preciosa que já teria.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          spacing: { after: 300 },
          children: [new TextRun({ text: "Uma filha.", italics: true })]
        }),

        // QUEBRA DE CENA
        new Paragraph({ style: "SceneBreak", children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")] }),

        // FLASH 3: O NASCIMENTO DE GRAZIELLY
        new Paragraph({
          style: "Flashback",
          children: [new TextRun({ text: "[Dezessete anos antes do presente...]", bold: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("O Santuário de Aquaryn nunca havia visto uma tempestade como aquela.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Relâmpagos cortavam o céu tropical do Reino da Água, um after em outro, como se o próprio céu estivesse em guerra. No interior do santuário, curandeiros corriam de um lado para outro, seus rostos pálidos sob a luz dos cristais de cura.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("— A mãe está muito fraca! A transfusão de Aethra não está funcionando!")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ayla deitava na cama, sua pele normalmente luminosa agora pálida como mármore. Ela era uma mulher de beleza incomum — cabelos escuros como a noite, olhos que pareciam conter segredos de eras passadas. Agora, esses olhos estavam fechados, sua respiração superficial.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Do lado de fora do santuário, um homem encapuzado observava a tempestade. Aurelius não podia entrar — não como Grande Mestre, não como o pai da criança que estava nascendo. Seu amor por Ayla era o segredo mais bem guardado de Nova Aetherion.")]
        }),
        
        new Paragraph({
          style: "Dialogue",
          children: [new TextRun({ text: "— Aguente, Ayla —", italics: true }), new TextRun(" ele sussurrou para a tempestade. "), new TextRun({ text: "Por favor... aguente."), italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Dentro do santuário, algo mudou. Um grito — não de dor, mas de vida. E então, o choro de uma criança.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("— É uma menina! — a curandeira-chefe anunciou, sua voz tremendo. — Ela é... ela é perfeita.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ayla abriu os olhos. A custo, mas os abriu. A curandeira colocou a criança em seus braços, e por um momento que durou uma vida, mãe e filha se olharam.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("A criança tinha os olhos de Aurelius — castanhos, profundos, determinados. Mas havia algo mais nela. Algo que os curandeiros não conseguiam nomear. Quando o cristal de cura próximo a ela pulsou, não mostrou cor nenhuma.")]
        }),
        
        new Paragraph({
          style: "Dialogue",
          children: [new TextRun({ text: "— Sem afinidade? —", italics: true }), new TextRun(" alguém sussurrou. "), new TextRun({ text: "Como é possível? Os pais dela são..."), italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ayla sorriu. Um sorriso fraco, mas genuíno. Ela sabia a verdade.")]
        }),
        
        new Paragraph({
          style: "Dialogue",
          children: [new TextRun({ text: "— Grazielly —", italics: true }), new TextRun(" ela murmurou. "), new TextRun({ text: "Seu nome é Grazielly. Significa 'graça' na língua antiga. Porque você é uma graça... a graça que eu deixarei neste mundo."), italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ayla fechou os olhos. Seu corpo relaxou. O cristal de cura ao seu lado escureceu.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("— Não! Mãe! — A curandeira correu para ela. — Mestra Ayla!")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Mas era tarde demais. Ayla, descendente de Ilyos, guardiã de segredos antigos, mãe de uma criança que mudaria o mundo... tinha partido.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Ou pelo menos, era o que todos pensavam.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Do lado de fora, Aurelius sentiu o momento em que a luz de Ayla se apagou — ou pareceu se apagar. Ele caiu de joelhos na chuva, seu coração se partindo em dois. Ele não podia entrar. Não podia revelar que a mulher que morrera era seu amor. Não podia reconhecer a criança que acabara de nascer.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Mas ele faria algo. Silenciosamente, secretamente, ele garantiria que Grazielly tivesse uma vida. Talvez não a vida que ele queria dar a ela — uma vida no palácio, com seu pai ao lado — mas uma vida. Uma chance.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("A tempestade começou a cessar. Uma única estrela apareceu entre as nuvens, brilhando sobre o santuário.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Dentro, Grazielly chorava em seus primeiros momentos de vida. Não era um choro de medo ou frio. Aqueles com sensibilidade espiritual suficiente — e havia poucos — jurariam depois que ouviram algo diferente em seu choro.")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Determinação.", italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun("Como se a criança já soubesse que nascera para lutar.")]
        }),

        // QUEBRA DE CENA FINAL
        new Paragraph({ style: "SceneBreak", children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")] }),

        // FINAL DO CAPÍTULO
        new Paragraph({
          style: "BodyText",
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "E em algum lugar distante, em um limiar entre dimensões,", italics: true })]
        }),
        new Paragraph({
          style: "BodyText",
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Ilyos abriu os olhos.", italics: true })]
        }),
        new Paragraph({
          style: "BodyText",
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Ele sentiu.", italics: true })]
        }),
        new Paragraph({
          style: "BodyText",
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "A criança nascera.", italics: true })]
        }),
        new Paragraph({
          style: "BodyText",
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "A herdeira de sua linhagem.", italics: true })]
        }),
        new Paragraph({
          style: "BodyText",
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "A esperança que ele desesperadamente precisava.", italics: true })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 800 },
          children: [new TextRun({ text: "FIM DO CAPÍTULO I", size: 24, bold: true, color: "1A1F16", font: "Times New Roman", smallCaps: true })]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndras_Livro1_Capitulo1.docx", buffer);
  console.log("Capítulo 1 criado com sucesso!");
});
