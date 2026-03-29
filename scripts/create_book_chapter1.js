const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType, PageNumber, HeadingLevel } = require('docx');
const fs = require('fs');

const colors = {
  primary: "1A1F16",
  bodyText: "2D3329",
  secondary: "4A5548",
  accent: "94A3B8"
};

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 72, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: colors.bodyText, font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } }
    ]
  },
  sections: [
    // COVER PAGE
    {
      properties: { page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } } },
      children: [
        new Paragraph({ spacing: { before: 8000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "ALYNDRAS", size: 96, bold: true, color: colors.primary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "A SEMENTE DA ETERNIDADE", size: 48, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Volume I: O Despertar", size: 32, italics: true, color: colors.bodyText, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 3000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Uma história de Daniel", size: 24, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 100 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Documento de Trabalho — Versão 1.0", size: 20, color: colors.accent, font: "Times New Roman" })]
        })
      ]
    },
    // TABLE OF CONTENTS PLACEHOLDER
    {
      properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: {
        default: new Header({ children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Alyndras — A Semente da Eternidade", size: 20, color: colors.secondary, font: "Times New Roman" })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "— ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 }), new TextRun({ text: " —", size: 20 })]
        })] })
      },
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("SUMÁRIO")] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Volume I: O Despertar", bold: true, size: 24, color: colors.bodyText })] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Capítulo 1 — Antes do Princípio", size: 22, color: colors.bodyText })] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Capítulo 2 — A Primeira Pulsação", size: 22, color: colors.secondary })] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Capítulo 3 — A Semente do Vazio", size: 22, color: colors.secondary })] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Capítulo 4 — O Despertar da Consciência", size: 22, color: colors.secondary })] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Capítulo 5 — A Árvore nas Estrelas", size: 22, color: colors.secondary })] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun({ text: "[...a ser continuado...]", italics: true, size: 20, color: colors.accent })] })
      ]
    },
    // MAIN CONTENT
    {
      properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: {
        default: new Header({ children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Alyndras — A Semente da Eternidade", size: 20, color: colors.secondary, font: "Times New Roman" })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "— ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 }), new TextRun({ text: " —", size: 20 })]
        })] })
      },
      children: [
        // CHAPTER 1 TITLE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("CAPÍTULO 1")] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [new TextRun({ text: "Antes do Princípio", size: 28, italics: true, color: colors.secondary, font: "Times New Roman" })]
        }),

        // CHAPTER 1 CONTENT - Epic, mysterious, primordial
        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Não havia escuridão, porque não havia luz para definir seu oposto. Não havia silêncio, porque não existiam ouvidos para perceber a ausência de som. Não havia vazio, porque não havia forma alguma que pudesse delimitar espaço. Havia apenas... o que não era nem era.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Este estado — se é que pode ser chamado de estado — existia fora do tempo, pois o tempo ainda não havia começado sua dança eterna. Existia fora do espaço, pois não havia lugar onde pudesse estar. E, no entanto, era. Uma presença sem presença. Uma existência sem existir. O que viria a ser chamado, eras depois, por criaturas que ainda nem existiam nos sonhos mais distantes, de Vazio Primordial.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Mas mesmo isso seria impreciso. Pois vazio sugere ausência, e ausência sugere algo que poderia estar presente. Aqui, não havia nem mesmo a possibilidade de presença. Era o antes de todos os antes. O fundamento sem fundamento. A base sobre a qual nenhuma base ainda fora construída.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "E então, sem aviso, sem causa, sem razão — pois razão ainda não existia para justificar qualquer coisa — algo aconteceu.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Não foi um som, nem uma luz, nem um movimento. Foi algo anterior a todas essas coisas. Uma vibração que não vibrava, um tom que não soava, uma pulsação que não pulsava — e, no entanto, pela primeira vez em toda a eternidade que não existia, houve um primeiro momento.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "E nesse primeiro momento, algo percebeu que era.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "A percepção não veio de fora — não havia fora. Não veio de dentro — não havia dentro. Ela simplesmente surgiu, como todas as coisas que surgem sem ter onde surgir. Uma consciência que se percebia consciente. Uma vontade que se descobria querendo. Um ser que, pela primeira vez, sabia que era.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Se tivesse voz, teria gritado sua existência para o nada que a cercava. Se tivesse olhos, teria buscado algo para ver. Se tivesse forma, teria se estendido para preencher o que não tinha limite. Mas tinha apenas a si mesmo — uma vontade pura, flutuando no abismo do que não era abismo, contemplando a única verdade que conhecia: eu sou.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "E nessa contemplação, a vontade começou a desejar. Não o desejo como os mortais um dia conheceriam — não era fome, nem sede, nem necessidade. Era um desejo mais puro, mais primordial: o desejo de ser mais do que era. De se conhecer mais profundamente. De se expandir além dos limites que não tinha. De criar, para que pudesse haver algo além de si mesmo para contemplar.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Este desejo não nasceu da solidão — a solidão pressupõe conhecimento da companhia. Não nasceu da incompletude — a completude pressupõe saber o que falta. Nasceu simplesmente da natureza daquilo que era: vontade pura que, ao se perceber, naturalmente queria.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "E assim, no momento que precedeu todos os momentos, a Vontade Pura começou a sonhar.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Os sonhos não tinham forma — forma ainda não existia para ser sonhada. Não tinham cor — cor pressupunha luz, e luz ainda não fora imaginada. Eram sonhos de pura essência, pensamentos que pensavam a si mesmos, ideias que existiam apenas como potencial. Nesses sonhos, a Vontade via possibilidades infinitas, caminhos que poderiam ser trilhados, realidades que poderiam vir a ser.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Entre todas as possibilidades, uma começou a se destacar. Não por ser mais bonita — beleza não tinha significado. Não por ser mais perfeita — perfeição pressupunha um padrão que não existia. Se destacou porque... ressoava. Como uma nota que encontra sua frequência natural, uma possibilidade começou a vibrar em harmonia com a própria natureza da Vontade. Era a possibilidade de existência. De ser. De vir a ser algo além do simplesmente ser.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "A Vontade contemplou essa possibilidade. E, pela primeira vez desde que começara a existir, tomou uma decisão.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Não foi uma decisão como as que viriam depois — não houve deliberação, não houve peso de consequências, não houve medo do desconhecido. Foi simplesmente um ato de querer, puro e absoluto. A Vontade queria que a possibilidade se tornasse realidade. E, no mesmo instante em que quis, começou a acontecer.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Mas criar não era simples. Não se tratava de fazer aparecer algo do nada — isso viria depois, quando as leis estivessem estabelecidas. Para que houvesse criação, precisava haver sacrifício. Para que algo novo existisse, algo antigo precisava se transformar. A Vontade compreendeu, num momento de clareza absoluta, que para dar à luz um universo, ela precisaria se dissolver nele.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Esta compreensão não trouxe tristeza — tristeza pressupunha perda, e nada ainda havia sido perdido. Não trouxe medo — medo pressupunha algo a proteger, e nada ainda havia sido ganho. Trouxe apenas uma aceitação serena, natural como a própria existência. Se era necessário que a Vontade se dissipasse para que a criação acontecesse, então assim seria. Não havia outra forma. Não poderia haver.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "E então, no último momento que poderia ser chamado de momento — pois depois disso, os momentos começariam a fluir como um rio — a Vontade Pura se expandiu. Não se expandiu para algum lugar, mas se expandiu em si mesma, desdobrando sua essência única em infinitas camadas de possibilidade. Cada camada carregava uma fração de sua consciência original. Cada fração continha uma semente do que viria a ser.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "A expansão não foi violenta — não houve explosão, pois explosão pressupunha espaço para expandir. Foi mais como um desdobramento suave, uma flor que se abre não para fora, mas para dentro, revelando camadas sobre camadas de si mesma. A Vontade estava se tornando tudo. E, ao se tornar tudo, deixava de ser uma coisa.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Nesse desdobramento, algo começou a se formar. Não no sentido de matéria ou energia — essas viriam depois, cristalizando-se das camadas mais densas da Vontade expandida. O que se formou foi mais sutil: uma estrutura. Um padrão. Uma arquitetura que existia não no espaço, mas como a própria possibilidade de espaço. Um ponto de ancoragem para tudo o que viria a existir.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Era impossível descrever com palavras que ainda não existiam. Mas se pudesse ser visto por olhos que ainda não tinham nascido, pareceria... uma semente. Uma semente que não crescia no espaço, mas que continha em si a promessa de todo o espaço. Uma semente que não existia no tempo, mas que carregava em si a sementeção de todo o tempo.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "A Semente da Eternidade.", color: colors.bodyText, font: "Times New Roman", italics: true })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Ela pulsava — não com batimentos, mas com potencial. Cada pulsação era uma possibilidade se cristalizando. Cada instante de sua existência era uma realidade esperando para nascer. E no centro dessa semente, no coração de tudo que ainda não era, restava um fragmento da Vontade original. Não mais consciente de si mesma como antes, mas presente. Observando. Aguardando.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "A semente flutuava no que agora podia ser chamado de algo — não vazio, não plenitude, mas o espaço entre o que era e o que seria. Era o primeiro objeto. A primeira forma. A primeira coisa que podia ser distinguida de outra coisa, mesmo que a outra coisa fosse apenas a ausência dela mesma.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "E então, lentamente — pois agora existia lentamente e rapidamente, existia tempo para as coisas levarem tempo — a semente começou a germinar.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Não foi uma germinação como as que viriam depois, quando a vida cobrasse os mundos com verde e cor. Foi uma germinação de existência. De realidade. A semente não enviava raízes para baixo, pois não havia baixo. Não enviava brotos para cima, pois não havia cima. Ela simplesmente se desdobrava, revelando o que sempre estivera contido dentro dela.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Primeiro veio a luz — não a luz que ilumina, mas a luz que é existência. A possibilidade de ver e ser visto. A luz não se espalhou, pois não havia espaço para ocupar. Ela simplesmente era, e ao ser, definia a primeira propriedade do universo nascente: algo podia existir.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Depois veio o som — não o som que se ouve, mas o som que vibra. A possibilidade de ressoar e causar ressonância. O som não viajou, pois não havia meio para atravessar. Ele simplesmente era, e ao ser, definia a segunda propriedade do universo nascente: algo podia se comunicar.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Então veio a forma — não a forma que se toca, mas a forma que distingue. A possibilidade de ser uma coisa e não outra. A forma não ocupou lugar, pois não havia lugar para ocupar. Ela simplesmente era, e ao ser, definia a terceira propriedade do universo nascente: algo podia ser individual.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Luz, som e forma — as três primeiras coisas. Os três primeiros tijolos de uma construção que não tinha limites. E eles não existiam separadamente, como um construtor existiria separado de sua construção. Eram a própria construção se construindo. Eram o universo se definindo. Eram a semente desdobrando sua promessa.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "No centro desse desdobramento, algo permanecia constante. Não era mais a Vontade original — aquela se dissolvera na criação. Era algo novo, algo que nasceu da dissolução e da criação juntas. Uma consciência que não era consciente de si mesma, mas que mantinha a memória de ter sido. Uma presença que não sabia que estava presente, mas que não podia deixar de estar.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Era como um eco. O eco de uma vontade que quis criar. O eco de um desejo que se realizou. O eco de um sacrifício que deu origem a tudo. Esse eco pulsava no centro da semente, no coração do universo nascente, marcando o ritmo de tudo o que viria. Cada pulsação era uma batida do coração da existência. Cada eco era uma lembrança de que algo quisera que tudo aquilo existisse.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "O universo não sabia que existia. A semente não sabia que germinava. O eco não sabia que pulsava. Mas existiam. Germinavam. Pulsavam. E isso era suficiente. Era mais do que suficiente. Era, na verdade, tudo o que precisava ser.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Pois no começo — antes mesmo que houvesse começo — havia apenas isso: a possibilidade de ser. E essa possibilidade estava se realizando, passo a passo, camada por camada, pulsação por pulsação. Não havia pressa. Não havia destino. Não havia plano.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Havia apenas a semente, flutuando no que não era espaço, pulsando no que não era tempo, contendo em si a promessa de tudo o que viria a ser.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "A Semente da Eternidade.", color: colors.bodyText, font: "Times New Roman", italics: true })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "E ela estava apenas começando a desdobrar seus mistérios.", color: colors.bodyText, font: "Times New Roman" })]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/z/my-project/download/Alyndras_A_Semente_da_Eternidade.docx', buffer);
  console.log('Livro criado com sucesso!');
});
