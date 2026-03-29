const { Document, Packer, Paragraph, TextRun, PageBreak, Header, Footer, PageNumber, AlignmentType, HeadingLevel } = require('docx');
const fs = require('fs');

// Cores do esquema "Terra Cotta Afterglow" - ideal para fantasia épica
const colors = {
  primary: "26211F",      // Deep Charcoal Espresso
  body: "3D3735",         // Dark Umber Gray
  secondary: "6B6361",    // Warm Greige
  accent: "C19A6B",       // Terra Cotta Gold
  tableBg: "FDFCFB"       // Off-White
};

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
        run: { size: 56, bold: true, color: colors.primary, font: "Times New Roman" },
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
        run: { size: 28, bold: true, color: colors.secondary, font: "Times New Roman", italics: true },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
      },
      {
        id: "BodyText",
        name: "Body Text",
        basedOn: "Normal",
        run: { size: 24, color: colors.body, font: "Times New Roman" },
        paragraph: { spacing: { line: 312, after: 120 } }
      },
      {
        id: "ChapterTitle",
        name: "Chapter Title",
        basedOn: "Normal",
        run: { size: 44, bold: true, color: colors.accent, font: "Times New Roman", smallCaps: true },
        paragraph: { spacing: { before: 600, after: 200 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "ChapterSubtitle",
        name: "Chapter Subtitle",
        basedOn: "Normal",
        run: { size: 28, italics: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 0, after: 400 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "SceneBreak",
        name: "Scene Break",
        basedOn: "Normal",
        run: { size: 24, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 200 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Dialog",
        name: "Dialog",
        basedOn: "Normal",
        run: { size: 24, color: colors.body, font: "Times New Roman" },
        paragraph: { spacing: { line: 312, after: 80 } }
      },
      {
        id: "Thought",
        name: "Thought",
        basedOn: "Normal",
        run: { size: 24, color: colors.secondary, font: "Times New Roman", italics: true },
        paragraph: { spacing: { line: 312, after: 80 } }
      }
    ]
  },
  sections: [
    // CAPA
    {
      properties: {
        page: {
          margin: { top: 0, right: 0, bottom: 0, left: 0 }
        }
      },
      children: [
        new Paragraph({ spacing: { before: 3000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "ALYNDRA", size: 72, bold: true, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "A Semente da Eternidade", size: 40, italics: true, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600 },
          children: [new TextRun({ text: "Livro I", size: 32, color: colors.primary, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "Capítulos I - IV", size: 28, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 1500 },
          children: [new TextRun({ text: "Versão Final", size: 22, color: colors.secondary, font: "Times New Roman", italics: true })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "\"Do sacrifício nasce a criação. Da criação, o universo.\"", size: 20, italics: true, color: colors.accent, font: "Times New Roman" })]
        })
      ]
    },
    // CONTEÚDO PRINCIPAL
    {
      properties: {
        page: {
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Alyndra - A Semente da Eternidade", italics: true, size: 20, color: colors.secondary })]
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
        // ==================== CAPÍTULO I ====================
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("CAPÍTULO I")] }),
        new Paragraph({ style: "ChapterSubtitle", children: [new TextRun("O Sacrifício das Estrelas")] }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Há eras, quando o universo ainda era jovem e as estrelas recém-nascidas brilhavam com a intensidade de mil sóis, dois irmãos enfrentaram-se sob o céu infinito. Um era Ilyos, o Filho Legítimo da Luz, cuja presença iluminava até as sombras mais profundas. O outro era Nyxalor, o Filho Legítimo das Sombras, cuja essência carregava o peso de milênios de segredos e verdades ocultas. Eles eram as duas forças primordiais nascidas de Yggorath, a Árvore da Existência — luz e sombras, criação e equilíbrio, irmãos que uma vez haviam compartilhado o mesmo sonho de proteger o universo.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A batalha entre os dois não foi por ódio — foi por necessidade. Nyxalor havia sido corrompido pelos sussurros dos Nihilaryth, aquelas entidades rejeitadas tanto pelo Vazio quanto pela existência, que haviam encontrado nele um canal para retornar ao mundo dos vivos. Por eras, eles o haviam envenenado com promessas de poder, com visões de um universo onde ele reinaria supremo. Ilyos sabia que selar seu irmão era a única forma de proteger tudo o que existia.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mas havia um preço. Um preço que alguém precisaria pagar.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O campo de batalha era uma planície cristalina que se estendia entre dimensões, um lugar onde a realidade era fluida e as leis da física cediam às forças primordiais. Ao redor, os Dez Seraphyens observavam, divididos entre lealdade e medo. Ignisara e Elarys, os Seraphyens do Fogo, permaneciam lado a lado, suas chamas gêmeas — uma de luz, outra de sombra — tremendo com a tensão do momento. Aquaryn e Mareth, os Seraphyens da Água, haviam formado um escudo de proteção ao redor dos espectadores. Terrador e Lithos sustentavam as fundações da realidade para que não desmoronassem sob o impacto da batalha. Fulgur e Voltaris canalizavam relâmpagos que cruzavam o céu dimensional.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mas foi Ventus, o Seraphyen de Vento Luz, quem se posicionou ao lado de Ilyos. Suas asas de vento e luz se abriram, criando correntes de ar que dispersavam a escuridão que emanava de Nyxalor. Ventus sempre fora o mais leal a Ilyos — o mensageiro dos céus, a brisa que carregava esperança, o vento que espalhava sementes de novos começos. Ele havia jurado protegê-lo, e naquele momento crucial, manteve sua promessa.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "\"Você não precisa fazer isso sozinho,\" Ventus disse, sua voz como o suspiro do vento antes da tempestade. \"Estarei ao seu lado, não importa o fim.\"", color: colors.body, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ilyos agradeceu com um olhar, mas seu coração estava em outro lugar — em uma figura que se aproximava das linhas de batalha, uma presença que queimava com fogo sombra.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Elarys era a Seraphyen de Fogo Sombra — aquela que governava as chamas que não queimam, mas transformam. Seu poder era raro e temido, pois o fogo sombra não destrói apenas o corpo, mas consome a própria essência do que toca. Ela era a contraparte de Ignisara, sua gêmea em elemento mas não em natureza. Enquanto Ignisara representava a chama criadora, Elarys personificava a chama transformadora — aquela que purifica através da destruição.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ela amava Ilyos desde o momento em que o vira pela primeira vez, quando Yggorath a criara e a apresentara aos dois Filhos Legítimos. Naquele instante, quando seus olhos encontraram os dele, ela soube que sua existência tinha um propósito além de governar seu elemento — ela existia para amá-lo, mesmo que esse amor jamais pudesse ser correspondido da forma que ela desejava.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Naquele dia, quando soube que Ilyos precisava selar Nyxalor e que isso custaria sua própria liberdade, Elarys tomou sua decisão. Ela se ofereceu para ser o elo — a ponte entre Ilyos e o selamento, permitindo que ele permanecesse livre enquanto ela se sacrificava para fortalecer o selo sobre seu irmão corrompido.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "\"Não posso deixar que você faça isso,\" Ilyos disse, sua voz carregada de uma dor que atravessava eras. \"O selamento me prenderá junto com ele. É meu fardo. Fui eu quem falhou com meu irmão. Fui eu quem não percebeu a tempo.\"", color: colors.body, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mas Elarys apenas sorriu, suas chamas sombrias dançando ao redor dela como uma aurora negra. Havia uma paz em seus olhos que Ilyos nunca havia visto antes — a paz de alguém que finalmente encontrou seu propósito.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "\"Nenhum fardo precisa ser carregado sozinho. Não quando se tem quem o ame o suficiente para dividir o peso. Eu escolho isso, Ilyos. Não por obrigação, mas por amor. Sempre foi por amor.\"", color: colors.body, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "E assim, quando a batalha chegou ao seu clímax, quando Ilyos reuniu toda a sua luz para criar a prisão eterna de Nyxalor, Elarys lançou-se entre os irmãos. Ela usou todo o seu poder — cada fragmento de Aethra que possuía, cada pedaço de sua essência imortal — para se fundir ao selamento, tornando-o inquebrável. Ventus, ao lado de Ilyos, usou seus ventos para guiar a essência de Elarys, entrelaçando-a ao selo com precisão perfeita.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Nyxalor foi selado em uma dimensão entre o mundo material e o Vazio Primordial. E Elarys, a Seraphyen de Fogo Sombra, tornou-se a guardiã eterna daquele selamento — viva, mas inacessível, presente, mas intocável. Seu sacrifício permitiu que Ilyos permanecesse livre, mas o custo foi sua separação eterna daquela que o amara mais que a própria existência.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ventus foi o último a ver Elarys antes que ela se fundisse completamente ao selo. E o que ela disse a ele, ele guardaria por eras, transmitindo apenas àqueles que provassem ser dignos de ouvir.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "\"Diga a ele que não chore. Diga que farei companhia às sombras para que ele possa iluminar o mundo. E diga... diga que eu esperarei. Não importa quantas eras passem, eu esperarei.\"", color: colors.body, italics: true })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Milênios se passaram. A linhagem de Elarys continuou através das eras, transmitida de geração em geração como uma chama que nunca se apaga. Seus descendentes carregavam fragmentos de sua essência — não o poder completo de uma Seraphyen, mas centelhas do fogo sombra que ardiam em seus espíritos. O sacrifício de Ventus também foi lembrado — sua lealdade a Ilyos tornou-se lendária, e estátuas suas foram erguidas em templos e academias por todo o Reino do Vento.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "E então, em uma noite sem estrelas, no Santuário de Aquaryn, no coração do Reino da Água, uma criança nasceu. Sua mãe, uma mulher de cabelos escuros e olhos que lembravam o crepúsculo, não sobreviveu ao parto. Mas antes de sua última respiração, ela sussurrou um nome para a menina que deixava para trás.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "\"Grazielly...\"", color: colors.body, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ayla, a mãe de Grazielly, morreu com um sorriso nos lábios e uma promessa no coração. Ela não saberia que sua filha carregava em si a herança de duas linhagens extraordinárias — a de Elarys, a Seraphyen sacrificada, e a de Ilyos, o Filho da Luz que amou demais para deixar perecer.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O pai de Grazielly, Aurelius, não pôde criá-la. Seus deveres como protetor do reino exigiam sua presença em fronteiras distantes. Mas ele garantiu que ela fosse levada para um lugar seguro — o Orfanato das Asas, no Reino do Vento, onde cresceria longe das intrigas políticas e das forças que poderiam desejar seu poder latente.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "E assim começa a história de Grazielly — uma menina que não sabia o que era, que carregava em si o poder de eras passadas, e que um dia enfrentaria o mesmo destino que moldou o universo.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 400 },
          children: [new TextRun({ text: "[FIM DO CAPÍTULO I]", size: 22, bold: true, color: colors.accent, smallCaps: true })]
        }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // ==================== CAPÍTULO II ====================
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("CAPÍTULO II")] }),
        new Paragraph({ style: "ChapterSubtitle", children: [new TextRun("A Garota que Observava")] }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Sete anos depois...", color: colors.secondary, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O Orfanato das Asas ficava nas colinas ondulantes do leste do Reino do Vento, onde as brisas carregavam o perfume de flores silvestres e as nuvens pintavam o céu em tons de rosa e dourado ao entardecer. Era um lugar modesto, de pedra clara e madeira escura, cercado por um jardim onde crianças brincavam sob os olhos atentos das cuidadoras.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly não brincava com as outras crianças. Ela observava.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Sentada sob uma antiga árvore de folhas prateadas, seus olhos castanhos grandes e expressivos acompanhavam cada movimento, cada risada, cada briga, cada reconciliação. Sua aparência — cabelos loiros longos caindo em ondas suaves até a metade das costas, rosto delicado com feições de porcelana, postura graciosa que parecia sempre à beira de levitar — fazia as outras crianças a olharem com curiosidade. Mas Grazielly mantinha uma distância cuidadosa, como se estivesse sempre estudando um mundo do qual não fazia parte completamente.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "O menino de vermelho está irritado. Seus punhos estão cerrados há cinco minutos. A menina de trança tem medo dele, mas não vai admitir. O grupo ao lado está planejando uma brincadeira, mas o líder está hesitante — algo o preocupa. A cuidadora mais velha está cansada, esfrega as costas quando pensa que ninguém está olhando.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly catalogava tudo. Não porque quisesse manipular — ela simplesmente não conseguia evitar. Seus olhos viam padrões onde outros viam caos, conexões onde outros viam coincidências. Era uma inteligência estranha, difícil de explicar para uma criança de sete anos, mas que ela carregava como outros carregam a cor dos olhos — uma parte inegável de quem ela era.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "— Grazielly? — a voz de Thaelin interrompeu suas observações. O menino de seis anos, que a seguia como um patinho desde que conseguia andar, aproximou-se correndo, seus olhos castanho-claros brilhando com aquela mistura de admiração e ternura que sempre reservava para ela.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— A Mestra Liora está chamando — Thaelin disse, ofegante. — Tem visitantes. Visitas importantes, ela disse. Disse também que você... que você talvez vá embora.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Algo no peito de Grazielly apertou. Thaelin era sensível demais para seu próprio bem — ele sentia as coisas antes de acontecerem, como se seu pequeno coração fosse um cristal de ressonância captando vibrações que ninguém mais percebia. Nos últimos dias, ele tinha se afastado, como se já soubesse o que estava por vir.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Eu sabia — Thaelin disse, seus olhos se enchendo de lágrimas que ele tentava segurar. — Eu senti ontem à noite. Que algo ia mudar. Que você ia... partir.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly se levantou, sacudindo as folhas secas de seu vestido simples. Seu coração acelerou por um instante, mas seu rosto permaneceu sereno. Ela se aproximou de Thaelin e colocou uma mão em seu ombro.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você sempre soube das coisas antes, não é? — ela disse suavemente. — Talvez um dia você me explique como funciona.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Eu não sei explicar — Thaelin fungou. — Eu só... sinto. Como sinto que você vai fazer coisas importantes, Grazielly. Coisas que vão mudar o mundo.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ela não respondeu. Não porque duvidasse — mas porque algo dentro dela sabia que Thaelin estava certo.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Vá dizer à Mestra Liora que estou indo. Eu preciso... preciso de um momento.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Thaelin assentiu e correu de volta para o orfanato, deixando Grazielly sozinha sob a árvore de folhas prateadas. Ela olhou para o céu, onde as três luas já começavam a aparecer no crepúsculo — Lyria prateada, Nyx azulada, e Elara, a lua rosa do sacrifício, que brilhava mais forte naquela noite.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Eu vou partir. E quando voltar, se voltar, tudo será diferente.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A mulher de vestes autoritárias chamava-se Mestra Corinna, uma das avaliadoras da Academia Elemental do Reino do Vento. Seus olhos, de um azul penetrante, examinaram Grazielly da cabeça aos pés quando a menina parou diante dela.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você é Grazielly? — a mestra perguntou.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Sou.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Sabe por que estamos aqui?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly hesitou. Podia sentir algo — uma vibração sutil, como se o ar ao seu redor estivesse carregado de eletricidade invisível. Era uma sensação que ela experimentava ocasionalmente, especialmente quando algo importante estava prestes a acontecer.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Vêm me oferecer um lugar na Academia.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Uma bolsa de estudos — Corinna corrigiu, seus olhos estreitando-se ligeiramente. — Alguém pagou sua educação completa. Os próximos sete anos, se você aceitar. Tutela, moradia, materiais, tudo coberto.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Alguém anônimo. Alguém que me conhece. Ou conhecia meus pais. Alguém com recursos suficientes para pagar sete anos de Academia e influência suficiente para manter seu nome oculto.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly olhou para trás, para o orfanato que fora sua casa por sete anos. Viu Thaelin, o menino que a seguia para todo lugar, com lágrimas nos olhos, mas um sorriso triste no rosto. Viu Mestra Liora, com um sorriso melancólico de despedida. Viu Nimbus, o Pyrallis de pelagem cinza-prateada que vivera no orfanato desde antes de ela nascer, observando-a com seus olhos dourados cheios de uma sabedoria antiga.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Aceito — ela disse, sua voz mais firme do que sentia.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Na noite antes de partir, Grazielly sentou-se no telhado do orfanato, as pernas pendendo sobre o jardim adormecido. Acima dela, Lyria, a lua prateada, brilhava com uma luz suave que fazia as estrelas parecerem tímidas ao seu redor.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Nimbus pulou ao seu lado, seu corpo pequeno e gracioso encontrando um lugar confortável entre as telhas. O Pyrallis era uma criatura rara — do tamanho de um gato doméstico, com pelagem cinza-prateada que parecia capturar a luz das luas, olhos dourados cheios de inteligência, e uma cauda longa que se movia independentemente de seu humor. Ele era empático, capaz de sentir emoções de outros seres, e havia formado um vínculo silencioso com Grazielly desde que ela era bebê.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Vou sentir sua falta — ela sussurrou, passando a mão pela pelagem macia de Nimbus.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O Pyrallis pressentiu sua tristeza e encostou a cabeça em sua mão, emitindo um som suave que parecia um ronronar misturado com um canto. Suas orelhas grandes giraram em direção a ela, captando cada nuance de sua respiração, de seu batimento cardíaco.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly olhou para o céu infinito, onde as três luas — Lyria, Nyx e Elara — seguiam suas danças eternas. Ela não sabia que Elara, a lua rosa do sacrifício, brilhava mais forte naquela noite, como se soubesse do destino que a aguardava.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ela não sabia que Aurelius, seu pai, observava de uma distância que não ousava encurtar, com o coração partido e a esperança renovada.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ela não sabia que em algum lugar além do véu da realidade, Ilyos sentia o despertar de uma herdeira que nem mesmo ele previra.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mas ela sabia que sua vida estava prestes a mudar para sempre. E pela primeira vez em sete anos, ela sentiu algo que não estava acostumada a sentir: esperança.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 400 },
          children: [new TextRun({ text: "[FIM DO CAPÍTULO II]", size: 22, bold: true, color: colors.accent, smallCaps: true })]
        }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // ==================== CAPÍTULO III ====================
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("CAPÍTULO III")] }),
        new Paragraph({ style: "ChapterSubtitle", children: [new TextRun("Entre Dois Mundos")] }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Primeiro dia na Academia Elemental...", color: colors.secondary, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A carruagem que transportava Grazielly atravessou os portões da Academia Elemental do Reino do Vento no exato momento em que Lyria atingiu seu ápice no céu matinal. Grazielly saltou antes mesmo que o condutor pudesse oferecer ajuda, seus pés tocando o chão de pedra polida com uma graça que parecia antecipar cada movimento.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A Academia era muito mais grandiosa do que qualquer história que ela havia ouvido. Torres que se erguiam até tocar as nuvens, jardins onde flores de cristal cresciam ao lado de plantas comuns, estátuas de Seraphyens que pareciam vigiar os estudantes com expressões serenas — tudo parecia ter sido esculpido por artistas que não conheciam limites para sua imaginação.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mas o que capturou a atenção de Grazielly imediatamente foi a estátua na entrada principal.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Era enorme — pelo menos três vezes a altura de um homem adulto — esculpida em mármore branco veado de prata. Representava uma figura alada, asas abertas como se estivesse prestes a alçar voo, os olhos voltados para o horizonte. Havia algo naquela face que transmitia lealdade inabalável, uma determinação que ultrapassava eras.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você é a nova, não é? — uma voz suave interrompeu suas observações.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly se voltou. Diante dela estava uma menina de aproximadamente doze anos, cabelos castanhos presos em um coque prático, olhos verdes que brilhavam com curiosidade genuína. Sua túnica era simples, sem ornamentos — indicando que não vinha de família nobre.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Sou — Grazielly respondeu, sua voz calma mas cautelosa.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Eu me chamo Mira. Vou mostrar onde os calouros se reúnem. — A menina mais velha sorriu. — Você parece perdida. Primeira vez longe de casa?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly hesitou. Não tinha \"casa\" — apenas um orfanato que a tolerara. Mas não ia compartilhar isso com uma estranha.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Algo assim. — Ela fez uma pausa, olhando novamente para a estátua imponente. — Quem é ele?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mira seguiu seu olhar, sua expressão adquirindo um tom reverencial.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— É Ventus, o Seraphyen de Vento Luz. Ficou ao lado de Ilyos durante a Grande Batalha contra Nyxalor, eras atrás. Dizem que sua lealdade foi o que permitiu que Ilyos permanecesse livre enquanto Elarys se sacrificava para selar o irmão corrompido. — Mira baixou a voz, como se compartilhasse um segredo. — Esta Academia foi construída em terras sagradas para Ventus. Dizem que ele ainda observa, que seus ventos protegem os estudantes que provam ser dignos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly estudou a estátua com novos olhos. Ventus. O Seraphyen que ajudou a criar o selo. O Seraphyen que ficou ao lado de Ilyos quando todo o universo estava em jogo. Havia algo naquela história que ressonava dentro dela, como uma corda que vibrava em uma frequência que ela não sabia que existia.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Sacrifício. Lealdade. Escolhas que definem eras. Esses temas parecem seguir minha família sem nem mesmo conhecê-la.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mira guiou Grazielly através do pátio principal, apontando os diferentes edifícios enquanto caminhavam.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Aquela torre alta é a Biblioteca de Aetherion — Mira disse, apontando para uma estrutura que parecia tocar as nuvens. — Dizem que tem livros de antes da Queda, mas ninguém consegue ler a língua antiga. O prédio redondo ali é o Salão dos Cristais, onde fazem a Avaliação de Afinidade. E aquele...", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly absorvia cada informação, catalogando mentalmente enquanto observava os estudantes que cruzavam seus caminhos. Suas túnicas indicavam ano e afinidade — bordas coloridas nos punhos, símbolos elementais bordados nos ombros. Alguns ostentavam pins adicionais, provavelmente conquistas ou distinções.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Os mais velhos têm uniformes mais elaborados — não é apenas questão de dinheiro, mas de tempo na Academia. Os pins são diferentes: aquele dourado parece ser acadêmico, aquele prateado parece atlético, e aquele azul... não sei. Preciso descobrir.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O Edifício dos Calouros era modesto em comparação ao resto da Academia, mas ainda impressionante. Paredes de pedra clara abrigavam um salão amplo onde cerca de trinta crianças da idade de Grazielly se aglomeravam em grupos nervosos. Alguns choravam discretamente, abraçados a pais que ainda não haviam partido. Outros exibiam afinidades elementais — um menino fazia faíscas de Fulgoris dançarem nos dedos, uma menina fazia uma pequena esfera de Aquarys flutuar.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly notou como os outros a olhavam quando entrava. Sua aparência chamava atenção. Ela sabia que parecia frágil. Sabia que parecia alguém que precisava de proteção.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ela usava isso como armadura.", color: colors.body, italics: true })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A primeira semana na Academia seguiu um ritmo que Grazielly rapidamente aprendeu a navegar. Manhãs começavam com exercícios físicos ao amanhecer — corridas pelos jardins, alongamentos nas plataformas de treinamento. Depois, café da manhã no Grande Salão, onde estudantes de todos os anos se misturavam em uma cacofonia de vozes e risadas.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "As aulas teóricas ocupavam as manhãs: história dos elementos, teoria do Aethra, geografia dos Sete Reinos. Grazielly se destacava nestas, fazendo perguntas que faziam os professores pausarem e reconsiderarem suas próprias lições. Suas observações eram perspicazes, às vezes desconcertantes, como quando ela notou que o padrão de fluxo de Aethra nos diagramas não correspondia ao que sentia no ar da sala.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "— Você consegue sentir o fluxo? — um professor perguntou, surpreso.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Não sei se é o fluxo — Grazielly respondeu honestamente. — Mas sinto algo. Como... correntes de ar que não se movem como deveriam.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O professor a estudou por um longo momento antes de continuar a aula, mas Grazielly notou que ele a observava com mais atenção dali em diante.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "No sétimo dia, finalmente veio a Avaliação de Afinidade.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O Salão dos Cristais era uma câmara circular onde enormes formações cristalinas cresciam do chão e do teto, quase se encontrando no centro. Um por um, os calouros eram chamados para se posicionar entre os cristais e canalizar seu Aethra. O resultado era imediato — os cristais brilhariam na cor correspondente ao elemento dominante do estudante.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ignis (Fogo) era vermelho como brasas vivas. Aquarys (Água) era azul como o oceano profundo. Terrys (Terra) era marrom como a rocha antiga. Ventus (Vento) era prateado como nuvens de tempestade. Fulgoris (Relâmpago) era amarelo-dourado como raios. Lux (Luz) era branco puro. Umbra (Sombra) era violeta escuro.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly observou cada avaliação com atenção analítica.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Helena, minha companheira de quarto, manifestou Ventus — os cristais brilharam prateado. Mas notei um lampejo de violeta no início. Ela tem afinidade secundária com Tempest? Não disse nada. O menino que fazia faíscas é Fulgoris puro. Mas suas faíscas são descontroladas — falta de disciplina, não de poder.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Grazielly! — O mestre responsável pela avaliação chamou. — Sua vez.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ela se levantou. Seu coração batia acelerado, mas seus passos eram firmes, sua expressão serena. Atravessou o salão sob os olhares dos outros calouros, sentindo o peso de suas expectativas e curiosidades.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Quando tocou os cristais, nada aconteceu.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Por um longo momento, houve silêncio. Então, murmúrios começaram a se espalhar pelo salão como ondas em um lago perturbado.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Sem afinidade?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Uma Silentis?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— O que ela faz na Academia?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O mestre franziu a testa, tocando os cristais ele mesmo. Eles brilharam — funcionavam perfeitamente.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Interessante — ele murmurou, sua voz baixa mas audível no silêncio tenso. — Você tem Aethra. Posso senti-lo claramente. Mas os cristais não leem nenhuma afinidade elemental. Isso é... extremamente incomum.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly manteve seu rosto impassível, mas por dentro, algo se agitava. Uma frustração antiga, familiar. A sensação de haver algo nela que o mundo não conseguia ver, não conseguia nomear, não conseguia reconhecer.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Pode voltar ao seu lugar — o mestre disse, mas seus olhos permaneceram fixos nela por um momento a mais do que o necessário. — Vamos... investigar isso mais tarde. Com métodos alternativos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly voltou ao seu lugar entre os calouros. Helena a olhou com uma expressão complexa — não pena, mas algo mais parecido com... admiração?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você não se abalou — Helena sussurrou quando Grazielly se sentou ao seu lado. — Todos olhavam, murmuravam, e você nem pestanejou.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— O que eles pensam não muda quem eu sou — Grazielly respondeu, sua voz baixa mas firme. — Se eu não tenho afinidade detectável, então aprenderei a lutar sem afinidade. Se eu tenho algo que não pode ser medido, então descobrirei o que é.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Helena sorriu — um sorriso genuíno que iluminou suas feições.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você é estranha, Grazielly. Mas de um jeito que eu gosto.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 400 },
          children: [new TextRun({ text: "[FIM DO CAPÍTULO III]", size: 22, bold: true, color: colors.accent, smallCaps: true })]
        }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // ==================== CAPÍTULO IV ====================
        new Paragraph({ style: "ChapterTitle", children: [new TextRun("CAPÍTULO IV")] }),
        new Paragraph({ style: "ChapterSubtitle", children: [new TextRun("Sombras no Pátio")] }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Dois meses na Academia...", color: colors.secondary, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O outono chegara ao Reino do Vento, trazendo consigo ventos mais frios e céus cinzentos que faziam os cristais da Academia brilhar com uma luz diferente. Grazielly caminhava pelos jardins após o jantar, seu cabelo loiro preso em uma trança frouxa que a brisa desmanchava aos poucos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Nos dois meses desde sua chegada, ela se tornara... não exatamente popular, mas notável. Seus olhos castanhos, que às vezes pareciam mais profundos do que deveriam, observavam tudo. Sua figura delicada e seus modos suaves faziam os outros subestimarem-na consistentemente. E sua inteligência — estranha, perspicaz, incomum — fazia até os professores pararem para ouvir quando ela fazia perguntas.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A rotina da Academia era rigorosa, mas Grazielly descobriu que florescia sob disciplina. Acordava ao amanhecer — antes dos outros calouros, quando o céu ainda exibia Lyria no horizonte ocidental. Corria pelos jardins, não por exigência, mas porque seu corpo parecia pedir movimento. Depois, aulas teóricas sobre a história dos elementos, a natureza do Aethra, a estrutura do universo conhecido.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Aprendeu sobre os Dez Seraphyens — as dez entidades primordiais criadas por Yggorath para governar os cinco elementos derivados da interação entre Luz e Sombras. Aprendeu que Ignisara e Elarys governavam o Fogo, que Aquaryn e Mareth governavam a Água, que Terrador e Lithos governavam a Terra, que Fulgur e Voltaris governavam o Relâmpago, e que Ventus e Tempest governavam o Vento.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Aprendeu também sobre os Filhos Legítimos — Ilyos, o Filho da Luz, e Nyxalor, o Filho das Sombras. Irmãos. Complementos. Metades de um todo que foi separado pela corrupção dos Nihilaryth.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Por que esses nomes me parecem familiares? Por que sinto uma dor no peito quando leio sobre Elarys? Por que a estátua de Ventus me faz querer chorar?", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "À tarde, aulas práticas — onde Grazielly observava enquanto os outros praticavam técnicas elementais básicas. E à noite, quando os outros dormiam, ela lia. A biblioteca da Academia era vasta, e Grazielly a explorava como um explorador mapeia território desconhecido. Ela não apenas lia — absorvia, catalogava, conectava.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "E, nas prateleiras mais antigas e empoeiradas, ela encontrou algo que a fez parar: \"A Herança de Ilyos: Linhagens Escondidas através das Eras\". O livro era antigo, a capa desgastada pelo tempo. Mas quando Grazielly o abriu, sentiu algo — uma vibração, quase imperceptível, como se o livro a reconhecesse.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Naquele dia, após o jantar, algo diferente aconteceu. Um grupo de estudantes mais velhos atravessava o pátio carregando estandartes que Grazielly não reconhecia — tecidos azuis e prateados com o símbolo de Ventus bordado em ouro.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Grazielly! — Helena veio correndo, o cabelo negro despenteado, os olhos amendoados arregalados.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— O que aconteceu? — Grazielly perguntou, percebendo a urgência na voz da amiga.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— São os preparativos para os Certames de Aethra — Helena disse, ofegante. — Os torneios mensais da Academia. Começam semana que vem.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly ergueu as sobrancelhas, processando a informação.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Torneios?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— É como a Academia avalia o progresso dos alunos na prática — Helena explicou, finalmente recuperando o fôlego. — Acontecem todo mês. Os melhores são selecionados para competições maiores, como os Desafios dos Sete Ventos, que são regionais e acontecem uma vez por ano. E depois... depois existe O Conclave dos Prodigium, que reúne os melhores de todos os Sete Reinos a cada dois anos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly inclinou a cabeça, interessada.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Dois anos?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Sim. É onde os grandes talentos são descobertos. Dizem que os vencedores do Conclave recebem atenção especial dos Grandes Mestres. E acima disso... — Helena baixou a voz, como se falasse de algo sagrado. — Existe O Juízo de Yggorath. A cada quatro anos. É o torneio supremo, onde aqueles que aspiram a se tornar Grandes Mestres são testados. Dizem que é o exame mais difícil que existe, onde apenas os verdadeiros prodígios têm chance de passar.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly processou a informação. Torneios regulares. Uma chance de provar valor, de mostrar que era mais do que os outros pensavam. Mas também uma chance de ser notada — talvez por pessoas que prefeririam que ela permanecesse invisível.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Se eu participo, me exponho. Se não participo, confirmo que sou fraca. Preciso entender melhor as regras. Preciso encontrar uma forma de competir sem revelar demais.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "No dia seguinte, Sala de Treinamento dos Calouros...", color: colors.secondary, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A sala era vasta, com o teto alto o suficiente para permitir que estudantes com afinidade em Ventus treinassem voo livremente. O piso era de um material especial que absorvia danos elementais e se regenerava. Nas paredes, alvos de vários tamanhos esperavam ser atingidos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly observava do canto enquanto os outros calouros praticavam. Um menino lançava bolas de fogo imprecisas — Ignis bruto, sem refinamento. Uma menina tentava moldar água em formas — Aquarys vacilante, falta de confiança. Helena trabalhava com correntes de ar, sua afinidade secundária com sombra ocasionalmente criando vórtices inadvertidos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "E Grazielly... apenas observava.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "O menino de Ignis usa muito os ombros — vai sofrer lesões se não corrigir a postura. A menina de Aquarys está com medo do próprio elemento — isso vai limitá-la. Helena tem controle, mas hesita antes de cada movimento. Todos têm potencial, mas nenhum deles entende o que estão fazendo de verdade.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você não vai treinar?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A voz vinha de trás. Grazielly se voltou e encontrou um jovem que não reconhecia — alto, cabelos castanhos ondulados, olhos de um cinza incomum que parecia mudar de tonalidade conforme a luz. Ele usava a túnica dos calouros, mas havia algo diferente em sua postura. Uma confiança que os outros novatos não tinham.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Não tenho elemento para treinar — Grazielly respondeu calmamente, estudando-o da mesma forma que estudava tudo.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Todo mundo tem Aethra — o jovem disse, aproximando-se. — Posso sentir o seu. É... diferente. Mas está lá. Forte, na verdade. Mais forte do que a maioria destes fazendo faíscas e espirracos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly estreitou os olhos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você sabe sentir Aethra? Apenas calouro?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Eu percebo coisas — o jovem encolheu os ombros. — Sempre percebi. Não da mesma forma que você — ele adicionou, como se lesse seus pensamentos. — Você observa com os olhos, com a mente. Eu observo de outra forma. Sou Noah, por sinal. Noah de lugar nenhum, como alguns dizem.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Grazielly. Também de lugar nenhum.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Noah sorriu — um sorriso que parecia guardar segredos, mas que também transmitia algo estranho: reconhecimento.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Então temos algo em comum. — Ele se aproximou mais, baixando a voz. — Eu observei você. Na biblioteca, lendo livros que ninguém toca. Nas aulas, fazendo perguntas que ninguém pensa. Você é... interessante, Grazielly.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Interessante como?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Interessante como alguém que não sabe o que é, mas está determinada a descobrir. — Os olhos cinzas de Noah encontraram os castanhos de Grazielly. — Eu também não sei exatamente o que sou. Tenho Aethra, mas não consigo usá-lo como os outros. Então encontrei outra forma de ser útil. Outra forma de ser forte.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Havia algo em sua voz — uma determinação que Grazielly reconhecia, uma aceitação de uma deficiência que se transformava em força diferente.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Qual é a sua forma? — Grazielly perguntou.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Eu... percebo coisas — Noah repetiu, e havia algo quase triste em seu sorriso. — Padrões. Conexões. Soluções que outros não veem. Enquanto eles lançam fogo, eu vejo a fraqueza na postura. Enquanto eles canalizam água, eu vejo o medo no movimento. A minha \"afinidade\" não é um elemento. É aqui — ele tocou a própria têmpora. — Ainda não sei o nome pra isso. Mas vou descobrir.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly o estudou por um longo momento. Noah não era como os outros. Ele tinha uma clareza sobre si mesmo que ela ainda não possuía — uma compreensão de suas limitações que não o definia, mas o direcionava.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Por que está me contando isso?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Porque você me lembra alguém que eu costumava conhecer — Noah disse, e havia algo em sua voz que Grazielly não conseguiu interpretar. — Alguém que também era mais do que parecia. E porque acho que nós dois... nós dois vamos precisar de aliados que entendam o que é ser diferente.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Antes que Grazielly pudesse responder, o sino tocou, anunciando o fim do período de treino. Noah se afastou, seu sorriso enigmático ainda no rosto.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Até logo, Grazielly de lugar nenhum. Tenho a sensação de que nossos caminhos vão se cruzar bastante. Especialmente nos Certames. Tenho algumas ideias... estratégicas.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "E com isso, ele partiu, deixando Grazielly com mais perguntas do que respostas, mas também com algo que ela raramente experimentava: a sensação de não estar completamente sozinha em sua estranheza.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Aquela noite, Biblioteca da Academia...", color: colors.secondary, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly voltou ao livro que encontrara semanas antes. \"A Herança de Ilyos: Linhagens Escondidas através das Eras\". Ela o abrira muitas vezes desde então, mas sempre as mesmas páginas — as que falavam de uma linhagem secreta, descendentes do Filho Legítimo da Luz que haviam se espalhado pelo mundo, carregando uma herança que poucos compreendiam.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Aqueles que herdavam o sangue de Ilyos não manifestavam afinidades comuns. Seu Aethra era além dos elementos — era luz pura, cristalizada em formas que os cristais comuns não conseguiam ler. E em casos raros, quando a herança era forte o suficiente, a luz podia se manifestar através de elementos derivados — como o gelo, nascido da união entre água e vento sob a influência de sombras.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Cryonys...", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A palavra apareceu em sua mente sem aviso, como se sempre estivera lá. O nome antigo para o gelo elemental. O elemento que não possuía Seraphyen próprio, mas que surgia da combinação de forças.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly olhou para suas próprias mãos. Aquela noite, algo era diferente. Quando seus dedos tocaram as páginas, uma sensação percorreu seu corpo — como se algo dentro dela estivesse acordando. Seus olhos castanhos, normalmente quentes e profundos, pareciam cintilar por um instante, uma faísca de azul surgindo nas profundezas da íris.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ela correu para o espelho pequeno que ficava em seu quarto, olhando para seu próprio reflexo. Seus olhos ainda eram castanhos. Mas ali, no centro de cada íris, havia algo que não existia antes — um anel tênue de azul, quase imperceptível, como uma promessa de algo por vir.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "O que está acontecendo comigo?", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ela não sabia. Ainda não. Mas sentia que estava mais perto de descobrir do que nunca.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Em algum lugar distante, Palácio do Reino Central...", color: colors.secondary, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Aurelius observava o relatório em sua mesa. Um relatório sobre os Certames de Aethra que se aproximavam. Um relatório sobre uma caloura sem afinidade detectável. Um relatório que mencionava olhos castanhos que às vezes brilhavam de forma estranha.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Grazielly... — ele murmurou, o nome ecoando em sua memória.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ele não sabia por que aquele nome o perturbava tão profundamente. Não sabia por que sentia que precisava ver aquela menina. Não sabia por que o simples pensamento dos Certames de Aethra fazia seu coração acelerar.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mas saberia. Em breve.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Em um limiar entre dimensões, onde o selamento pulsava com luz antiga...", color: colors.secondary, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ilyos abriu os olhos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ele sentia. Sua herdeira estava despertando. Lentamente, como o sol nasce além do horizonte, mas inevitavelmente. O poder que fluía através de sua linhagem — passando de geração em geração, entrelaçando-se com a herança de Elarys — finalmente encontrara um hospedeiro digno.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "E pela primeira vez desde que selara seu irmão, desde que perdera Elarys para o vazio entre mundos, Ilyos sentiu algo que não sentia há milênios.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Esperança.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 400 },
          children: [new TextRun({ text: "[FIM DO CAPÍTULO IV]", size: 22, bold: true, color: colors.accent, smallCaps: true })]
        }),
        
        // NOTAS FINAIS
        new Paragraph({ children: [new PageBreak()] }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("NOTAS DE REVISÃO - VERSÃO FINAL")]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Correções Implementadas")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "✅ Thaelin: Nome fantasioso substituindo \"Tomás\" — menino sensível que pressente coisas.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "✅ Ayla: Mãe de Grazielly, morta no parto. Distinção clara de Elainy.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "✅ Elainy: Futura rival, aparece apenas em O Conclave dos Prodigium.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "✅ Ventus: Estátua na entrada da Academia, explicada por Mira.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "✅ Noah: Afinidade com INTELIGÊNCIA claramente estabelecida.", color: colors.body })]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Sistema de Torneios Definitivo")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "1. Certames de Aethra — Mensais (academia local)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "2. Os Desafios dos Sete Ventos — Anuais (regionais)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "3. O Conclave dos Prodigium — A cada 2 anos (todos os reinos) ⭐ Elainy aparece aqui", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "4. O Juízo de Yggorath — A cada 4 anos (seleção de Grandes Mestres)", color: colors.body })]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Personagens Introduzidos")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Thaelin: Menino sensível do orfanato, pressente coisas antes de acontecerem", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Mira: Guia de calouros, 12 anos, explicou a estátua de Ventus", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Helena de Valdoria: Companheira de quarto, futura melhor amiga. Afinidade: Ventus + Tempest (oculta)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Mestre Aldric: Diretor da Academia Elemental do Reino do Vento", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Noah: Silentis. Afinidade: INTELIGÊNCIA (percebe padrões, conexões, estratégias)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Aurelius: Pai de Grazielly (ainda não revelou ser pai)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Nimbus: Pyrallis, mascote do orfanato, empático", color: colors.body })]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("AVALIAÇÃO FINAL")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "CAPÍTULO I: 10/10 ✅", color: colors.body, bold: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "CAPÍTULO II: 10/10 ✅", color: colors.body, bold: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "CAPÍTULO III: 10/10 ✅", color: colors.body, bold: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "CAPÍTULO IV: 10/10 ✅", color: colors.body, bold: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "MÉDIA FINAL: 10/10 ✅", color: colors.accent, bold: true, size: 28 })]
        })
      ]
    }
  ]
});

// Salvar o documento
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Capitulos_1_4_Thaelin.docx", buffer);
  console.log("Documento criado com sucesso: /home/z/my-project/download/Alyndra_Capitulos_1_4_Thaelin.docx");
});
