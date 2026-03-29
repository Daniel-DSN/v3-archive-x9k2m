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
          children: [new TextRun({ text: "Versão Revisada e Corrigida", size: 22, color: colors.secondary, font: "Times New Roman", italics: true })]
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
          children: [new TextRun({ text: "Há eras, quando o universo ainda era jovem e as estrelas recém-nascidas brilhavam com a intensidade de mil sóis, dois irmãos enfrentaram-se sob o céu infinito de Aetherion. Um era Ilyos, o Filho Legítimo da Luz, cuja presença iluminava até as sombras mais profundas. O outro era Nyxalor, o Filho Legítimo das Sombras, cuja essência carregava o peso de milênios de segredos e verdades ocultas.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A batalha entre os dois irmãos não foi por ódio — foi por necessidade. Nyxalor havia sido corrompido pelos sussurros dos Nihilaryth, aquelas entidades rejeitadas tanto pelo Vazio quanto pela existência, que haviam encontrado nele um canal para retornar ao mundo dos vivos. Ilyos sabia que selar seu irmão era a única forma de proteger o universo da ruína completa.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mas havia um preço. Um preço que Elarys, uma das dez Seraphyens criados por Yggorath, estava disposta a pagar.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Elarys era a Seraphyen de Fogo Sombra — aquela que governava as chamas que não queimam, mas transformam. Seu poder era raro e temido, pois o fogo sombra não destrói apenas o corpo, mas consome a própria essência do que toca. Ela amava Ilyos desde o momento em que o vira pela primeira vez, quando Yggorath a criara e a apresentara aos dois Filhos Legítimos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Naquele dia, quando soube que Ilyos precisava selar Nyxalor e que isso custaria sua própria liberdade, Elarys tomou sua decisão. Ela se ofereceu para ser o elo — a ponte entre Ilyos e o selamento, permitindo que ele permanecesse livre enquanto ela se sacrificava para fortalecer o selo sobre Nyxalor.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "\"Não posso deixar que você faça isso,\" Ilyos disse, sua voz carregada de uma dor que atravessava eras. \"O selamento me prenderá junto com ele. É meu fardo.\" Mas Elarys apenas sorriu, suas chamas sombrias dançando ao redor dela como uma aurora negra.", color: colors.body, italics: false })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "\"Nenhum fardo precisa ser carregado sozinho. Não quando se tem quem o ame o suficiente para dividir o peso.\"", color: colors.body, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "E assim, quando a batalhafinal chegou ao seu clímax, quando Ilyos reuniu toda a sua luz para criar a prisão eterna de Nyxalor, Elarys lançou-se entre os irmãos. Ela usou todo o seu poder — cada fragmento de Aethra que possuía, cada pedaço de sua essência imortal — para se fundir ao selamento, tornando-o inquebrável.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Nyxalor foi selado em uma dimensão entre o mundo material e o Vazio Primordial. E Elarys, a Seraphyen de Fogo Sombra, tornou-se a guardiã eterna daquele selamento — viva, mas inacessível, presente, mas intocável. Seu sacrifício permitiu que Ilyos permanecesse livre, mas o custo foi sua separação eterna daquele que ela amava mais que a própria existência.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Milênios se passaram. A linhagem de Elarys continuou através das eras, transmitida de geração em geração como uma chama que nunca se apaga. Seus descendentes carregavam fragmentos de sua essência — não o poder completo de uma Seraphyen, mas centelhas do fogo sombra que ardiam em seus espíritos.", color: colors.body })]
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
          children: [new TextRun({ text: "Grazielly catalogava tudo. Não porque quisesse manipular — ela simplesmente não conseguia evitar. Seus olhos viam padrões onde outros viam caos, conexões onde outros viam coincidências. Era uma inteligência estranha, difícil de explicar para uma criança de sete anos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "— Grazielly? — a voz da Mestra Liora interrompeu suas observações. A mulher mais velha, com cabelos grisalhos presos em um coque prático e olhos que haviam visto muitas gerações de crianças, aproximou-se com expressão preocupada. — Temos visitantes.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly levantou-se, sacudindo as folhas secas de seu vestido simples. Não perguntou quem — seus olhos já haviam avistado o grupo que se aproximava do portão principal. Três figuras: duas em túnicas formais da Academia Elemental, e uma terceira, mais velha, com vestes que indicavam autoridade.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Academia Elemental. Estão recrutando. Mas não vêm apenas para isso — a mulher no centro carrega documentos. Procuram alguém específico.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "— Você sabe por que estão aqui? — Liora perguntou, sua voz baixa.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Vêm me levar.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Liora parou, surpresa.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Como você sabe?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly não respondeu. Apenas continuou andando em direção ao portão, seus passos firmes apesar da incerteza que crescia em seu peito.", color: colors.body })]
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
          children: [new TextRun({ text: "Grazielly hesitou. Podia sentir algo — uma vibração sutil, como se o ar ao seu redor estivesse carregado de eletricidade invisível.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Vêm me oferecer um lugar na Academia.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Uma bolsa de estudos — Corinna corrigiu, seus olhos estreitando-se. — Alguém pagou sua educação completa. Os próximos sete anos, se você aceitar.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Alguém anônimo. Alguém que me conhece. Ou conhecia meus pais.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly olhou para trás, para o orfanato que fora sua casa por sete anos. Viu Tomás, o menino que a seguia para todo lugar, com lágrimas nos olhos. Viu Mestra Liora, com um sorriso triste de despedida. Viu Nimbus, o Pyrallis de pelagem cinza-prateada que vivera no orfanato desde antes de ela nascer, observando-a com seus olhos dourados cheios de uma sabedoria antiga.", color: colors.body })]
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
          children: [new TextRun({ text: "O Pyrallis pressentiu sua tristeza e encostou a cabeça em sua mão, emitindo um som suave que parecia um ronronar misturado com um canto.", color: colors.body })]
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
          children: [new TextRun({ text: "Ela não sabia que em algum lugar distante, Ilyos sentia o despertar de uma herdeira que nem mesmo ele previra.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mas ela sabia que sua vida estava prestes a mudar para sempre.", color: colors.body })]
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
          children: [new TextRun({ text: "A Academia Elemental do Reino do Vento era muito mais grandiosa do que qualquer história que Grazielly havia ouvido. Torres que se erguiam até tocar as nuvens, jardins onde flores de cristal cresciam ao lado de plantas comuns, estátuas dos Seraphyens que pareciam vigiar os estudantes com expressões serenas — tudo parecia ter sido esculpido por artistas que não conheciam limites para sua imaginação.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mas Grazielly não via apenas a beleza. Seus olhos castanhos, grandes e expressivos, notavam os símbolos gravados nos portões — cada um representando um dos sete elementos: a chama de Ignisara, a onda de Aquaryn, a montanha de Terrador, o relâmpago de Fulgur, o vendaval de Ventus, a luz de Ilyos, e a sombra de Nyxalor. Ela via o padrão geométrico do piso de pedra, desenhado para canalizar energia de forma eficiente. Via os pequenos cristais incrustados nas paredes, pulsando suavemente com Aethra residual de gerações de estudantes.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Alguém projetou isso com propósito. Cada detalhe tem função. O fluxo de energia segue um padrão espiral — concentra-se no centro e se expande para as torres. Os jardins não são apenas decorativos, são respiradouros para o excesso de Aethra.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Ei, você! — uma voz cortou seus pensamentos. — Sai do meio do caminho!", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly se moveu instintivamente, desviando-se de um grupo de estudantes mais velhos que atravessavam o pátio em passo rápido. Não demonstrou irritação. Apenas observou.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Túnicas com bordas douradas — quinto ano ou mais. O de vermelho, afinidade com Ignis, tem queimaduras recentes nas mãos. Praticou demais ontem. A de azul, afinidade com Aquaryn, manca da perna direita. Lesão antiga mal curada.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
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
          children: [new TextRun({ text: "— Algo assim.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Mira não insistiu — algo que Grazielly apreciou imediatamente. Juntas, atravessaram o pátio em direção ao Edifício dos Calouros, uma estrutura modesta comparada ao resto da Academia, mas ainda impressionante. Paredes de pedra clara abrigavam um salão amplo onde cerca de trinta crianças da idade de Grazielly se aglomeravam em grupos nervosos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Alguns choravam discretamente, abraçados a pais que ainda não haviam partido. Outros exibiam afinidades elementais — um menino fazia faíscas de Fulgoris dançarem nos dedos, uma menina fazia uma pequena esfera de Aquarys flutuar. Grazielly notou como os outros a olhavam quando entrava. Sua aparência chamava atenção. Ela sabia que parecia frágil. Sabia que parecia alguém que precisava de proteção.", color: colors.body })]
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
          style: "Dialog",
          children: [new TextRun({ text: "— Todos os calouros, atenção! — uma voz poderosa ecoou pelo salão.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O silêncio foi imediato. No palco elevado no fundo do salão, um homem de meia-idade observava os novatos. Seus cabelos grisalhos eram cortados curtos, e uma barba bem-aparada emoldurava um rosto que parecia esculpido em rocha. Seus olhos eram de um azul profundo, quase sobrenatural.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Eu sou o Mestre Aldric, Diretor da Academia Elemental do Reino do Vento — ele anunciou, sua voz carregando naturalmente sem precisar gritar. — Durante os próximos sete anos, vocês aprenderão a conhecer, controlar e respeitar o Aethra que flui através de vocês. Alguns de vocês se tornarão grandes mestres. Outros encontrarão seu caminho em outras profissões. E alguns... alguns não completarão a jornada.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Um silêncio tenso seguiu suas palavras.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Mas antes de começarmos, uma verdade fundamental — Aldric continuou, seus olhos percorrendo o salão. — O Aethra não é poder. É responsabilidade. O elemento que vocês manifestam — seja a chama de Ignisara, a água de Aquaryn, a terra de Terrador, o relâmpago de Fulgur, o vento de Ventus, ou mesmo a luz de Ilyos e as sombras de Nyxalor — não os torna superiores ou inferiores. O que determina seu valor é como escolhem usar o que receberam.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly sentiu algo em suas palavras. Não era apenas um discurso — era um aviso. E ela percebeu que o Mestre Aldric não estava olhando para o grupo como um todo, mas para indivíduos específicos. Incluindo ela.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Ele sabe. Sabe que eu não tenho afinidade detectável. Ou pelo menos, suspeita de algo.", color: colors.secondary })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Quando a assembleia terminou, Grazielly foi conduzida ao dormitório feminino dos calouros. Seu quarto era pequeno mas funcional — duas camas, dois armários, uma mesa compartilhada. E uma janela que dava para os jardins.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Sua companheira de quarto já estava lá, desembrulhando roupas de uma mala elegante. Era uma menina de cabelos negros e olhos amendoados, com a pele mais clara que Grazielly já havia visto. Suas roupas eram de tecido fino, as bordas bordadas com fios prateados.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você deve ser minha colega de quarto — a menina disse, sem olhar para Grazielly. — Eu sou Helena. Helena de Valdoria.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "O nome \"Helena\" fez Grazielly parar por um instante. Era um nome que carregava peso — a família Valdoria era conhecida no Reino do Vento, proprietários de vastas terras e influência política.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Grazielly — ela respondeu simplesmente, sem sobrenome.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Helena finalmente a olhou. Seus olhos percorreram a figura de Grazielly e algo em sua expressão mudou — não era ciúme, mas sim... surpresa?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você é muito bonita — Helena disse. — Vai ser interessante ter você por perto.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly não soube como responder. Então apenas assentiu e começou a organizar suas poucas coisas — dois vestidos simples, uma muda de roupa para dormir, um pequeno saco com pertences pessoais que a Mestra Liora lhe dera. Helena notou a escassez.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— É só isso que você tem?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— É tudo que preciso.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Helena se aproximou, seus olhos estudando Grazielly com uma intensidade que a fez querer recuar. Mas ela não recuou. Grazielly aprendera que demonstrar desconforto apenas dava poder aos outros.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você é órfã, não é? — Helena perguntou, não com crueldade, mas com uma curiosidade direta que lembrava a forma como Grazielly mesma fazia perguntas.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Sou.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Eu também. De certa forma.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly ergueu as sobrancelhas, surpresa pela primeira vez.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Helena suspirou, sentando-se em sua cama.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Meus pais estão vivos. Tecnicamente. Mas eles me enviaram para cá com seis anos, e desde então... vejo-os uma vez por ano, se tanto. Para eles, sou mais uma obrigação social do que uma filha. — Ela olhou para Grazielly, e havia algo em seus olhos — uma solidão que Grazielly reconhecia. — Diferente de você, eu tenho família. Mas você teve mais família do que eu.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly ficou em silêncio por um momento. Então, lentamente, sentou-se em sua própria cama, de frente para Helena.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— A Mestra Liora, no orfanato... ela cuidava de mim. Não como uma mãe, mas como alguém que se importa. E Tomás, um menino do orfanato... ele me seguia para todo lugar. E Nimbus, um Pyrallis que vivia lá... ele dormia ao pé da minha cama. — Grazielly olhou para as próprias mãos. — Eu não tinha pais. Mas não estava sozinha.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Helena sorriu — um sorriso genuíno, sem as máscaras sociais que parecia carregar.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Acho que vamos nos dar bem, Grazielly sem sobrenome.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Acho que sim, Helena de Valdoria.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "No dia seguinte, Salão dos Cristais...", color: colors.secondary, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "A Avaliação de Afinidade era realizada no Salão dos Cristais, uma câmara circular onde enormes formações cristalinas cresciam do chão e do teto, quase se encontrando no centro. Um por um, os calouros eram chamados para se posicionar entre os cristais e canalizar seu Aethra. O resultado era imediato — os cristais brilhariam na cor correspondente ao elemento dominante do estudante.", color: colors.body })]
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
          children: [new TextRun({ text: "Helena manifestou Ventus — os cristais brilharam prateado. Mas notei um lampejo de violeta no início. Ela tem afinidade secundária com Tempest? Não disse nada. O menino que fazia faíscas ontem é Fulgoris puro. Mas suas faíscas são descontroladas — falta de disciplina, não de poder.", color: colors.secondary })]
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
          children: [new TextRun({ text: "Por um longo momento, houve silêncio. Então, murmúrios começaram a se espalhar.", color: colors.body })]
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
          children: [new TextRun({ text: "— Interessante — ele murmurou. — Você tem Aethra. Posso senti-lo. Mas os cristais não leem nenhuma afinidade elemental.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly manteve seu rosto impassível, mas por dentro, algo se agitava. Uma frustração antiga, familiar. A sensação de haver algo nela que o mundo não conseguia ver.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Pode voltar ao seu lugar — o mestre disse. — Vamos... investigar isso mais tarde.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly voltou ao seu lugar entre os calouros. Helena a olhou com uma expressão complexa — não pena, mas algo mais parecido com... admiração?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você não se abalou — Helena sussurrou. — Todos olhavam, murmuravam, e você nem pestanejou.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— O que eles pensam não muda quem eu sou — Grazielly respondeu, sua voz baixa mas firme. — Se eu não tenho afinidade detectável, então aprenderei a lutar sem afinidade. Se eu tenho algo que não pode ser medido, então descobrirei o que é.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Helena sorriu.", color: colors.body })]
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
          children: [new TextRun({ text: "Aprendeu também sobre os Filhos Legítimos — Ilyos, o Filho da Luz, e Nyxalor, o Filho das Sombras. Irmãos. Complementos. Metades de um todo.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Por que esse nome me parece familiar?", color: colors.secondary })]
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
          children: [new TextRun({ text: "— O que aconteceu? — Grazielly perguntou, percebendo a urgência.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— São os preparativos para os Certames de Aethra — Helena disse, ofegante. — Os torneios mensais da Academia. Começam semana que vem.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly ergueu as sobrancelhas.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Torneios?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— É como a Academia avalia o progresso dos alunos na prática — Helena explicou. — Acontecem todo mês, e os melhores são selecionados para competições maiores.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly processou a informação. Torneios regulares. Uma chance de provar valor, de mostrar que era mais do que os outros pensavam. Mas também uma chance de ser notada — talvez por pessoas que prefeririam que ela permanecesse invisível.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Thought",
          children: [new TextRun({ text: "Se eu participo, me expõe. Se não participo, confirmo que sou fraca. Preciso entender melhor as regras.", color: colors.secondary })]
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
          children: [new TextRun({ text: "O menino de Ignis usa muito os ombros — vai sofrer lesões se não corrigir a postura. A menina de Aquarys está com medo do próprio elemento — isso vai limitá-la. Helena tem controle, mas hesita antes de cada movimento.", color: colors.secondary })]
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
          children: [new TextRun({ text: "— Não tenho elemento para treinar — Grazielly respondeu calmamente.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Todo mundo tem Aethra — o jovem disse, aproximando-se. — Posso sentir o seu. É... diferente. Mas está lá.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly estudou-o com aqueles olhos castanhos que viam mais do que deveriam.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Você sabe sentir Aethra? Apenas calouro?", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Eu percebo coisas — o jovem encolheu os ombros. — Sou Noah, por sinal. Noah de lugar nenhum, como alguns dizem.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Grazielly. Também de lugar nenhum.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Noah sorriu — um sorriso que parecia guardar segredos.", color: colors.body })]
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
          children: [new TextRun({ text: "— Interessante como alguém que não sabe o que é, mas está determinada a descobrir. — Os olhos cinzas de Noah encontraram os castanhos de Grazielly. — Eu posso ajudar com isso, se você quiser.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Grazielly não respondeu imediatamente. Seu instinto — aquele sentimento que a guiava desde que conseguia se lembrar — dizia que Noah era perigoso. Não malicioso, mas perigoso da mesma forma que fogo controlado é perigoso: capaz de queimar ou de aquecer, dependendo de como era usado.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Por que me ajudaria? — ela perguntou finalmente.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Porque você me lembra alguém que eu costumava conhecer — Noah disse, e havia algo em sua voz que Grazielly não conseguiu interpretar. — Alguém que também era mais do que parecia.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Antes que Grazielly pudesse responder, o sino tocou, anunciando o fim do período de treino. Noah se afastou, seu sorriso enigmático ainda no rosto.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Até logo, Grazielly de lugar nenhum. Tenho a sensação de que nossos caminhos vão se cruzar bastante.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "E com isso, ele partiu, deixando Grazielly com mais perguntas do que respostas.", color: colors.body })]
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
          children: [new TextRun({ text: "Grazielly olhou para suas próprias mãos. Aquela noite, algo era diferente. Quando seus dedos tocaram as páginas, uma sensação percorreu seu corpo — como se algo dentro dela estivesse acordando. Seus olhos castanhos, normalmente quentes e profundos, pareceram cintilar por um instante, uma faísca de azul surgindo nas profundezas da íris.", color: colors.body })]
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
          children: [new TextRun({ text: "Aurelius observava o relatório em sua mesa. Um relatório sobre os Certames de Aethra. Um relatório sobre uma caloura sem afinidade detectável. Um relatório que mencionava olhos castanhos que às vezes brilhavam de forma estranha.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "Dialog",
          children: [new TextRun({ text: "— Grazielly... — ele murmurou, o nome ecoando em sua memória.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ele não sabia por que aquele nome o perturbava. Não sabia por que sentia que precisava ver aquela menina. Mas saberia. Em breve.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "SceneBreak",
          children: [new TextRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Em um limiar entre dimensões...", color: colors.secondary, italics: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ilyos abriu os olhos.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ele sentia. Sua herdeira estava despertando. Lentamente, como o sol nasce além do horizonte, mas inevitavelmente.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "E pela primeira vez desde que selara seu irmão, Ilyos sentiu algo que não sentia há milênios.", color: colors.body })]
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
          children: [new TextRun("NOTAS DE REVISÃO")]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Correções Importantes")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Ayla: Mãe de Grazielly, morreu no parto. Não confundir com Elainy.", color: colors.body, bold: true })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "Elainy: Futura rival de Grazielly, personagem MUITO IMPORTANTE que aparece apenas no futuro, durante O Conclave dos Prodigium (torneio principal).", color: colors.body, bold: true })]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Sistema de Torneios")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "1. Certames de Aethra: Torneios locais mensais/sazonais em cada academia. Onde Grazielly começará a se destacar gradualmente.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "2. Os Desafios dos Sete Ventos: Torneios regionais anuais entre academias do mesmo reino.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "3. O Conclave dos Prodigium: Torneio principal a cada 5 anos, reunindo TODOS os reinos. Onde Elainy aparece pela primeira vez. Onde Noah descobre que sua afinidade é INTELIGÊNCIA, não luta.", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "4. O Juízo de Yggorath: Torneio supremo a cada 25 anos, universal.", color: colors.body })]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Elementos e Seraphyens")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Ignis/Ignisara - Fogo (Seraphyen Luz) | Elarys - Fogo Sombra (Seraphyen Sombra)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Aquarys/Aquaryn - Água (Seraphyen Luz) | Mareth - Água Sombra (Seraphyen Sombra)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Terrys/Terrador - Terra (Seraphyen Luz) | Lithos - Terra Sombra (Seraphyen Sombra)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Fulgoris/Fulgur - Relâmpago (Seraphyen Luz) | Voltaris - Relâmpago Sombra (Seraphyen Sombra)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Ventus - Vento (Seraphyen Luz) | Tempest - Vento Sombra (Seraphyen Sombra)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Cryonys - Gelo (elemento derivado, sem Seraphyen próprio)", color: colors.body })]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Personagens Introduzidos")]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Mira: Guia de calouros, 12 anos", color: colors.body })]
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
          children: [new TextRun({ text: "• Noah: Silentis misterioso. Percebe coisas. Afinidade: INTELIGÊNCIA (descoberto no futuro)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Aurelius: Pai de Grazielly, protetor do reino (ainda não revelou ser pai)", color: colors.body })]
        }),
        
        new Paragraph({
          style: "BodyText",
          children: [new TextRun({ text: "• Nimbus: Pyrallis, mascote do orfanato, empático e inteligente", color: colors.body })]
        })
      ]
    }
  ]
});

// Salvar o documento
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Capitulos_1_4_Revisados.docx", buffer);
  console.log("Documento criado com sucesso: /home/z/my-project/download/Alyndra_Capitulos_1_4_Revisados.docx");
});
