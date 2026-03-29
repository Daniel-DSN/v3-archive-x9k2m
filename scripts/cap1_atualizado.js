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
        paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "ALYNDRA - A Semente da Eternidade", italics: true, size: 20 })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "— ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 }), new TextRun({ text: " —", size: 20 })] })] }) },
    children: [
      // TÍTULO
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "A L Y N D R A", bold: true, size: 48 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "A SEMENTE DA ETERNIDADE", bold: true, size: 36 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "Livro I", italics: true, size: 24 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // CAPÍTULO
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "CAPÍTULO I", bold: true, size: 32, smallCaps: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: "O Sacrifício das Estrelas", italics: true, size: 26 })] }),
      
      // FLASH PRIMORDIAL
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 300 }, children: [new TextRun({ text: "[No Princípio...]", italics: true, size: 22 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Não havia céu. Não havia terra. Havia apenas o vórtice — um redemoinho de realidade fragmentada onde existência e não-existência se digladiavam em uma dança de aniquilação.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Dois irmãos se enfrentavam há o que parecia uma eternidade.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos brilhava com a luz de dez mil sóis nascendo simultaneamente. Seu corpo era pura radiação — não o fogo que queima, mas a iluminação que revela, que expõe verdades escondidas, que dissolve mentiras como névoa sob a manhã. Cada passo seu deixava rastros de claridade no tecido da realidade, feridas de luz que demoravam eras para cicatrizar.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Diante dele, Nyxalor era seu oposto perfeito — e seu complemento impossível. Onde Ilyos irradiava, Nyxalor absorvia. Onde Ilyos revelava, Nyxalor ocultava. Seu corpo era um buraco na existência, sombras pulsantes e vivas onde nove consciências corrompidas se entrelaçavam em uma só, um coral dissonante de vozes que já não pertenciam a ele.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Eram os Filhos Legítimos da Árvore Primordial. Irmãos. Complementos. Metades de um todo projetado para nunca funcionar sozinho.", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E estavam destruindo um ao outro.", size: 24 })] }),
      
      // O PASSADO
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos se lembrou de como costumava ser.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Lembrava de Nyxalor sorrindo — um sorriso genuíno, sem as vozes que agora ecoavam em sua garganta. Lembrava das conversas que tinham sob a luz de Aurion, planejando como guiar os Seraphyens, como proteger o universo que sua mãe havia criado com tanto sacrifício. Lembrava da risada de Nyxalor quando Ilyos cometia algum erro diplomático, e como ele sempre intervinha nas sombras para consertar as coisas sem que ninguém percebesse.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Eram perfeitos juntos. Ilyos liderava abertamente, servindo como rosto visível da ordem cósmica. Nyxalor operava nas sombras, lidando com ameaças antes que se tornassem públicas, protegendo segredos que não podiam ser revelados. Yggorath os havia projetado assim — interdependentes por design, incapazes de serem completos sozinhos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos nunca soube quando a corrupção começou.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Vorynthrix, o líder dos Nihilaryth, havia sido paciente. Um sussurro aqui. Uma dúvida ali. Uma influência sutil que fez Nyxalor questionar — por que ele precisava de Ilyos? Por que não podia ser completo por si mesmo? A insegurança, pequena mas persistente, foi a brecha que os Nihilaryth exploraram com precisão cirúrgica.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Quando Ilyos percebeu, já era tarde demais. O irmão que ele amava não estava mais lá — apenas uma carcaça habitada por nove Primordiais Corruptos, usando o corpo de Nyxalor como ponte para consumir toda a existência.", size: 24 })] }),
      
      // BATALHA CÓSMICA
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A batalha que se seguiu rasgou dimensões.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Nyxalor avançou, e sombras se projetaram como lanças — milhares delas, cada uma afiada com o peso de um universo morrendo. Ilyos ergueu a mão, e a luz explodiu de seu ser em ondas concêntricas, cada sombra encontrando sua contrapartida radiante. O choque entre as forças primordiais criou rachaduras no próprio tecido da realidade, fendas através das quais Ilyos podia vislumbrar outros planos de existência — mundos nascendo e morrendo em ciclos eternos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Eles lutavam há dias, ou talvez milênios — o tempo não funcionava corretamente naquele lugar entre lugares. Para cada ataque que Ilyos desferia, Nyxalor respondia com poder multiplicado pela fusão de nove Primordiais. A Luz estava perdendo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Irmão...", italics: true, size: 24 }), new TextRun({ text: " A voz de Nyxalor era muitas vozes, um coro dissonante de Vorynthrix e dos outros Nihilaryth falando através dele. ", size: 24 }), new TextRun({ text: "Você ainda acredita que pode me salvar? Que há algo do seu amado irmão restante aqui?", italics: true, size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos não respondeu com palavras. Não havia palavras para o que sentia — a dor de ver sua outra metade transformada em algo que nunca deveria existir, a agonia de saber que ele próprio falhara em perceber a tempo, o peso esmagador de ser o único que podia fazer o que precisava ser feito.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Nyxalor preparou o ataque final. As sombras ao seu redor se condensaram em uma esfera de aniquilação pura — energia suficiente para apagar sistemas solares inteiros, para rasgar a realidade de um modo que nunca poderia ser reparado. Ilyos viu a morte se aproximando e soube que não podia evitá-la.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ele estava prestes a perder.", size: 24, bold: true })] }),
      
      // SACRIFÍCIO DE ELARYS
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Foi quando Elarys se moveu.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A Seraphyen de Fogo Sombra apareceu como se o próprio espaço tivesse se curvado para trazê-la. Seu corpo era carmesim-escuro, chamas negras que ardiam sem consumir, o poder do fogo sob a influência das sombras — destruição e reciclagem em perfeito equilíbrio. Ela havia observado a batalha desde o início, esperando, calculando, sabendo que seu momento viria.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Elarys não era a Seraphyen mais poderosa. Não era a mais rápida, nem a mais antiga. Mas ela era a que amava Ilyos mais profundamente — não um amor romântico, mas algo mais primordial: o amor de uma irmã por seu líder, de uma criatura de fogo por sua contrapartida de luz, de alguém que via em Ilyos a razão pela qual sua existência fazia sentido.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Quando a esfera de aniquilação partiu em direção a Ilyos, Elarys não se afastou. Ela avançou.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Elarys, não! —", bold: true, size: 24 }), new TextRun({ text: " Ilyos gritou, sua voz ecoando através das dimensões.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas era tarde demais. Elarys posicionou-se entre os irmãos no exato momento em que o ataque os alcançou. Ela não bloqueou. Não desviou. Não contratacou.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela absorveu.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A esfera de aniquilação atravessou-a como se ela fosse fumaça — mas a fumaça não se dissipou. O corpo de Elarys brilhou com uma intensidade que ofuscou até mesmo Ilyos por um momento. O fogo sombrio que ardia em seu interior consumiu a energia destrutiva, transformando aniquilação em nada, convertendo o ataque que teria destruído a Luz em ausência pura.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Foi um sacrifício impossível. Seraphyens não morrem como mortais — suas essências são eternas. Mas Elarys escolheu usar sua própria existência como combustível, queimando tudo o que ela era para proteger tudo o que Ilyos representava.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Por um momento que durou uma eternidade, Elarys brilhou como nunca — não com luz, mas com uma intensidade escura que parecia engolir o próprio espaço ao redor. Ela olhou para Ilyos, e em seus olhos não havia medo, nem arrependimento. Havia apenas paz.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Ilyos —", italics: true, size: 24 }), new TextRun({ text: " ela disse, sua voz ecoando através do tempo. ", size: 24 }), new TextRun({ text: "A luz não pode brilhar sem as sombras que a definem. Eu não estou te deixando. Estarei em cada sombra que sua luz criar. Brilhe por nós duas.", italics: true, size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E então Elarys, a Seraphyen de Fogo Sombra, a amiga mais querida de Ilyos, deixou de existir.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Seu corpo tombou — não dissipado, mas morto. A armadura negra que ela sempre usou ainda brilhava com resquícios de seu poder, sua forma física intacta mas vazia, um casco sem alma. O fogo sombrio que ardia em seu interior se apagara para sempre.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Seraphyens não morrem como mortais. E quando morrem, é para sempre.", size: 24, italics: true })] }),
      
      // O SELAMENTO
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O silêncio que se seguiu durou uma eternidade.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Nyxalor, enfraquecido pelo ataque que Elarys consumiu, recuou. As vozes dentro dele gritavam em frustração — Vorynthrix e os outros Nihilaryth percebendo tarde demais que haviam subestimado o poder do sacrifício voluntário.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos permaneceu imóvel, seu brilho diminuído, seu coração — se é que um ser de luz pura tinha coração — partido em pedaços que nunca se reuniriam. Diante dele jazia o corpo de Elarys, sua amiga, sua irmã de espírito, a única que compreendia que Luz e Trevas podiam coexistir.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E além dela, Nyxalor se regenerava lentamente.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos sabia o que precisava fazer. Havia apenas uma opção — não matar seu irmão, pois a morte de um Filho Legítimo teria consequências cósmicas imprevisíveis, mas selá-lo. Prendê-lo entre as dimensões, em um limiar onde o tempo não existia, onde os Nihilaryth não poderiam usar seu corpo como ponte.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Era uma sentença de prisão eterna. Para o irmão que ele amava. Para a outra metade de sua alma.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos ergueu as mãos, e a luz que fluiu de seu ser não era mais a luz da revelação — era a luz da prisão. Cadeias de claridade pura começaram a se formar, cada elo forjado com o peso de milênios de amor fraternal sendo transformado em algo mais duro que diamante, mais durável que estrelas.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Perdoe-me, irmão —", italics: true, size: 24 }), new TextRun({ text: " Ilyos disse, e havia lágrimas em sua voz — lágrimas de luz pura que caíam como estrelas cadentes através das dimensões. ", size: 24 }), new TextRun({ text: "Até que a cura seja possível... até que você possa voltar... você permanecerá aqui.", italics: true, size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "As cadeias envolveram Nyxalor. Por um instante — apenas um instante — algo apareceu em seus olhos. Não era Vorynthrix. Não eram os outros Nihilaryth. Era o verdadeiro Nyxalor, o irmão que Ilyos amava, lutando contra a corrupção por um último momento de clareza.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Eu sinto muito...", italics: true, size: 24 }), new TextRun({ text: " Nyxalor sussurrou, sua voz verdadeira, sem o coro dissonante. ", size: 24 }), new TextRun({ text: "Eu não queria... não consigo...", italics: true, size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E então as vozes retornaram, engolindo sua consciência, e Nyxalor desapareceu nas profundezas do selamento — um prisioneiro eterno em uma cela de luz forjada pelo irmão que o amava demais para destruí-lo.", size: 24 })] }),
      
      // O LUTO
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos permaneceu ali, sozinho no limiar dimensional que acabara de criar.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A seu lado, o corpo de Elarys aguardava silencioso, sua armadura negra refletindo a luz que ainda emanava dele. Com delicadeza infinita — a delicadeza de alguém que perdeu tudo o que amava e só lhe restava a memória — Ilyos ergueu o corpo de sua amiga.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ele a levou para além do alcance de Aurion, além das três luas que testemunhavam silenciosas, para um santuário entre as estrelas — um lugar onde apenas os Seraphyens podiam ir, onde o tempo não corroía e o espaço não curvava. Ali, ele a depositou sobre um altar de luz sólida, sua armadura preservada como testemunho de um amor maior que a própria existência.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Descanse, minha irmã —", italics: true, size: 24 }), new TextRun({ text: " Ilyos sussurrou. ", size: 24 }), new TextRun({ text: "Sua luz vive em mim. Sua sombra vive em cada canto que eu iluminar. Você não está morta — está espalhada pelo universo que você salvou.", italics: true, size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ilyos não podia mais permanecer completamente no plano material. Parte de sua essência precisava ficar no Limiar, mantendo o selamento de Nyxalor ativo. Era uma prisão que exigia um carcereiro — e esse carcereiro era ele próprio.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ele escolhera a vigília eterna. O sacrifício contínuo. A solidão que só terminaria quando os Nihilaryth fossem definitivamente derrotados — ou quando o próprio universo deixasse de existir.", size: 24 })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 400 }, children: [new TextRun({ text: "E assim, a luz aprendeu que até as sombras mais profundas foram, um dia, amadas.", italics: true, size: 24 })] }),
      
      // SEPARADOR
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      
      // NASCIMENTO
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "[Oito anos antes do presente...]", italics: true, size: 22 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "O Santuário de Aquaryn nunca havia visto uma tempestade como aquela.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Não era uma tempestade comum. Os curandeiros mais velhos sussurravam que algo no próprio céu estava reagindo — como se o universo testemunhasse um momento que mudaria tudo. Relâmpagos cruzavam os céus tropicais do Reino de Hydoria em padrões que não seguiam nenhuma lei natural, dançando em espirais que pareciam formar símbolos antigos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Dentro do santuário, curandeiros corriam de um lado para outro, seus rostos pálidos sob a luz dos cristais de cura. O ar cheirava a ozônio e algo mais — algo antigo, algo que fazia os cristais vibrarem com uma frequência que ninguém conseguia identificar.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— A mãe está muito fraca! A transfusão de Aethra não está funcionando!", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Na cama de parto, Ayla lutava por cada respiração.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ela era uma mulher de beleza incomum — cabelos escuros como a noite entre estrelas, olhos que continham segredos de eras passadas, uma graça nos movimentos que falava de linhagens antigas e conhecimentos proibidos. Agora, essa graça estava partida, sua força se esvaindo com cada contração, seu corpo lutando contra algo maior que um simples parto difícil.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ayla sabia o que estava acontecendo. Ela era descendente de Ilyos — não diretamente, mas através de uma linhagem secreta que preservava o conhecimento da Energia Natural. Sabia que a criança que carregava era especial. Sabia que seu corpo não aguentaria o peso daquela alma entrando no mundo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E sabia que não importava. Ela escolhera isso. Escolhera dar à luz, sabendo o custo.", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Quando o choro finalmente ecoou — alto, claro, determinado — a tempestade começou a cessar. Os relâmpagos diminuíram. O céu se abriu. E lá fora, emergindo das nuvens, as três luas apareceram juntas no céu: Lyria prateada e majestosa, Nyx com seu brilho azulado discreto, e a pequena Elara, rosada como uma promessa de esperança.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "As três luas raramente apareciam juntas. Os mais velhos diziam que era presságio — de nascimentos importantes, de mudanças de era, de destinos sendo selados.", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— É uma menina —", size: 24, bold: true }), new TextRun({ text: " a curandeira-chefe sussurrou, lágrimas em seus olhos. Com cuidado, ela colocou a criança nos braços da mãe. ", size: 24 }), new TextRun({ text: "Ela é... ela é perfeita.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ayla abriu os olhos uma última vez. A custo, mas os abriu.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "A criança tinha os olhos de Aurelius — castanhos, profundos, determinados. Mas havia algo mais nela, algo que os curandeiros não conseguiam nomear. Quando o cristal de cura próximo pulsou para examiná-la, não mostrou cor nenhuma.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Sem afinidade? —", size: 24, italics: true }), new TextRun({ text: " alguém sussurrou, confuso. ", size: 24 }), new TextRun({ text: "Como é possível? Os pais dela são...", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ayla sorriu. Um sorriso fraco, mas genuíno. Ela sabia a verdade. A criança não era sem afinidade — era além das afinidades. Era herdeira de algo que o cristal não conseguia medir.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Grazielly —", size: 24, italics: true }), new TextRun({ text: " ela murmurou, usando as últimas forças que lhe restavam. ", size: 24 }), new TextRun({ text: "Seu nome é Grazielly. Significa 'graça' na língua antiga. Porque você é minha graça... minha herança... meu amor.", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ayla tocou o rosto da filha uma única vez. Seus dedos eram frios, mas o toque transmitia algo que a criança carregaria pelo resto da vida — uma memória que não era memória, um amor que não precisava de palavras.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E então Ayla, descendente de Ilyos, guardiã de segredos antigos, mãe de uma criança que mudaria o mundo, fechou os olhos. Seu corpo relaxou. O cristal de cura ao seu lado escureceu.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "— Mestra Ayla! Não! —", size: 24, bold: true }), new TextRun({ text: " A curandeira-chefe correu para ela, tentando canalizar energia, mas era tarde demais.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ayla havia partido. O corpo que já não continha vida jazia na cama, sereno, como se dormisse. E nos braços que já não podiam segurá-la, a criança chorava — não o choro de um bebê comum, mas algo mais profundo, como se ela soubesse que sua mãe a deixara.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Naquele momento, uma criança se tornou órfã.", size: 24, bold: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "E o mundo ganhou uma heroína sem saber.", size: 24, italics: true })] }),
      
      // A DISTÂNCIA
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Longe dali, em um palácio flutuante no Reino de Aetheria, um homem sentiu algo.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Aurelius, Décimo Segundo Grande Mestre de Nova Aetherion, estava em uma reunião quando seu coração apertou — uma dor sem explicação, uma perda sem nome. Ele levou a mão ao peito, confuso, e por um instante pensou em Ayla, a mulher que amara em segredo por tantos anos.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Mas afastou o pensamento. Ayla estava bem. Tinha que estar. Ele a veria em breve, quando os ventos políticos permitissem.", size: 24, italics: true })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Ele não sabia que já era tarde demais. Não sabia que sua filha havia nascido. Não sabia que seu amor havia morrido.", size: 24 })] }),
      
      new Paragraph({ spacing: { after: 200, line: 312 }, children: [new TextRun({ text: "Alguns destinos são escritos nas estrelas. Outros são escritos na separação.", size: 24, italics: true })] }),
      
      // FIM
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", size: 20 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: "FIM DO CAPÍTULO I", bold: true, size: 24, smallCaps: true })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Livro1_Capitulo1.docx", buffer);
  console.log("Capítulo 1 atualizado!");
});
