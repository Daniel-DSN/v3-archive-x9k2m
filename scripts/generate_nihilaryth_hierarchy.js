const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer, 
        AlignmentType, PageOrientation, LevelFormat, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

// Color palette - "Midnight Code" for fantasy/epic theme
const colors = {
  primary: "26211F",      // Deep Charcoal Espresso
  bodyText: "3D3735",     // Dark Umber Gray
  secondary: "6B6361",    // Warm Greige
  accent: "C19A6B",       // Terra Cotta Gold
  tableBg: "FDFCFB",      // Off-White
  tableHeader: "E8E4E0"   // Light warm gray
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-1",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-2",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-3",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    // COVER PAGE
    {
      properties: {
        page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } }
      },
      children: [
        new Paragraph({ spacing: { before: 6000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "UNIVERSO DE ALYNDRAS", size: 72, bold: true, color: colors.primary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "A ANTIGA CIVILIZAÇÃO AETHERION", size: 48, bold: true, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "E A HIERARQUIA DOS NIHILARYTH", size: 36, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 800 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Os Seguidores das Sombras Primordiais", size: 28, italics: true, color: colors.bodyText, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 2000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Documento Expandido do Universo Narrativo", size: 22, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Por Daniel — Criador de Alyndras", size: 22, color: colors.secondary, font: "Times New Roman" })]
        })
      ]
    },
    // MAIN CONTENT
    {
      properties: {
        page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({ children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Universo de Alyndras — Os Seguidores dos Nihilaryth", size: 20, color: colors.secondary, font: "Times New Roman" })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "— ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 }), new TextRun({ text: " —", size: 20 })]
        })] })
      },
      children: [
        // INTRODUCTION
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("INTRODUÇÃO: O LEGADO ESCURECIDO")] }),
        
        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A civilização Aetherion não foi apenas uma sociedade avançada — foi o auge da existência mortal na galáxia, um império cósmico que abrangeu milhares de mundos e bilhões de seres. Durante a Era Primordial, os Aetheri alcançaram níveis de poder e conhecimento que rivalizavam com as forças primordiais do universo. No entanto, essa mesma grandiosidade tornou-se sua ruína quando a corrupção se infiltrou em suas fileiras mais altas. Os dez Nihilaryth não caíram sozinhos; arrastaram consigo uma vasta rede de seguidores, soldados, cientistas, filósofos efanáticos que compartilhavam sua visão distorcida de \"perfeição\".", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Este documento detalha a estrutura completa dessa civilização perdida, a hierarquia dos seguidores dos Nihilaryth, seus métodos de corrupção e as múltiplas tentativas de retorno através das eras. Desde a primeira manifestação nos tempos de Ilios até a ascensão quase completa no clímax da Era de Grazielly, os seguidores das sombras primordiais representam a ameaça mais persistente e insidiosa que o universo de Alyndras já enfrentou.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        // SECTION 1: CIVILIZATION STRUCTURE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("I. A ESTRUTURA DA ANTIGA CIVILIZAÇÃO AETHERION")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 Os Pilares da Sociedade Aetheri")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A civilização Aetherion era estruturada em cinco pilares fundamentais, cada um representando um aspecto crucial de sua sociedade altamente avançada. Esses pilares não eram meramente instituições burocráticas, mas sim manifestações práticas da filosofia Aetheri de que o universo poderia ser compreendido, moldado e aperfeiçoado através do conhecimento sistemático e da aplicação disciplinada do poder. Cada pilar era autônomo em suas funções, mas interconectado em seus objetivos, criando uma rede de influência que permeava todos os aspectos da vida Aetheri.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O primeiro pilar, conhecido como o Conclave da Essência, era responsável pelo estudo e desenvolvimento do Aethra em todas as suas manifestações. Este órgão reunia os maiores mestres energéticos da civilização, indivíduos que haviam dedicado milênios ao aprofundamento das artes espirituais. O Conclave não se limitava ao treinamento de guerreiros; ele investigava as propriedades fundamentais da energia espiritual, desenvolvendo novas técnicas, refinando as existentes e estabelecendo os protocolos que definiam o uso ético e eficiente do poder. Seus laboratórios energéticos espalhavam-se por centenas de mundos, cada um dedicado a uma linha específica de pesquisa.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O segundo pilar, denominado Ordem Celestial, constituía a força militar e defensiva da civilização Aetherion. Diferente de exércitos convencionais, a Ordem Celestial era composta por guerreiros especializados em diferentes formas de combate energético, desde as técnicas mais sutis de desarmamento até as mais devastadoras ofensivas. A organização era hierárquica e meritocrática, onde a ascensão dependia exclusivamente da demonstração de habilidade e sabedoria no uso do poder. Os membros da Ordem Celestial eram treinados desde a infância em academias orbitais, onde aprendiam não apenas a lutar, mas também a filosofia do uso responsável da força.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O terceiro pilar, chamado Círculo dos Arquitetos, era responsável pela infraestrutura física e tecnológica da civilização. Os Arquitetos projetavam e construíam desde as cidades flutuantes até as redes de comunicação interestelar que conectavam os mundos Aetheri. Sua expertise combinava conhecimento científico avançado com a manipulação energética, permitindo a criação de estruturas que desafiavam as leis convencionais da física. Eram os Arquitetos que haviam desenvolvido a tecnologia de dobra espacial que tornou possível a expansão rápida pela galáxia, e eram também eles que mantinham os portais dimensionais que conectavam os mundos centrais do império.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O quarto pilar, conhecido como Jardim das Mentes, era dedicado à educação, filosofia e preservação do conhecimento. Esta instituição mantinha as grandes bibliotecas digitais e espirituais da civilização, onde a sabedoria acumulada por milhões de anos era armazenada e transmitida às novas gerações. O Jardim também era responsável pela formação ética dos cidadãos Aetheri, ensinando-os a respeitar o equilíbrio universal e a usar seus poderes com responsabilidade. Muitos dos maiores pensadores e filósofos da história Aetheri emergiram deste pilar, desenvolvendo teorias que explicavam a natureza da existência e o papel dos seres conscientes no cosmos.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O quinto e mais influente pilar era o Conselho dos Primordiais, composto pelos dez indivíduos mais poderosos da civilização — aqueles que eventualmente se tornariam os Nihilaryth. Este conselho originalmente servia como o órgão máximo de governança, tomando decisões que afetavam toda a civilização. Os membros do Conselho eram escolhidos entre os mais sábios e poderosos, aqueles que haviam demonstrado não apenas habilidade excepcional, mas também discernimento e integridade. Tragicamente, foi exatamente este critério de seleção que permitiu a corrupção silenciosa: os mais ambiciosos e determinados eram também os mais vulneráveis às promessas de poder ilimitado.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.2 A População e sua Distribuição")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "No auge de seu poder, a civilização Aetherion abrangia aproximadamente 2.847 mundos habitados, com uma população total estimada em 340 bilhões de indivíduos. Esta cifra astronômica não incluía apenas Aetheri puros, mas também diversas espécies integradas ao império através de alianças, conquistas ou migrações voluntárias. A sociedade era notavelmente diversa, com centenas de linhagens genéticas e tradições culturais coexistindo sob a égide da filosofia Aetheri. Os mundos centrais, aqueles mais próximos ao planeta natal original, eram os mais densamente povoados e tecnologicamente avançados, enquanto as colônias periféricas mantinham um estilo de vida mais tradicional.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A distribuição de poder entre a população seguía uma curva natural: aproximadamente 85% dos cidadãos possuíam acesso básico ao Aethra, capaz de realizar tarefas cotidianas e técnicas simples. Os 15% restantes demonstravam aptidões mais elevadas, variando desde o nível acadêmico até o grandmaster. Apenas uma fração minúscula — menos de 0.001% — alcançava o nível primordial, e estes indivíduos eram imediatamente incorporados aos círculos superiores da sociedade, onde sua influência poderia ser direcionada para o bem comum. Esta estrutura, aparentemente justa e meritocrática, escondia as sementes da desgraça que viria.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        // SECTION 2: THE NIHILARYTH AND THEIR FOLLOWERS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("II. OS DEZ NIHILARYTH E SEUS SEGUIDORES")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 A Natureza da Corrupção e os Primeiros Adeptos")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A transformação dos dez membros do Conselho dos Primordiais em Nihilaryth não foi um evento súbito, mas um processo gradual de corrupção que se estendeu por milênios. Cada um dos dez foi seduzido de maneira diferente, suas fraquezas específicas exploradas pela entidade conhecida como Vorynthrix, o primeiro a cair. Vorynthrix, originalmente o mais sábio e visionário do Conselho, foi corrompido através de visões de um universo \"perfeito\" — uma realidade onde o sofrimento, a imperfeição e a morte não existiriam. Esta promessa de perfeição absoluta tornou-se a ideologia central que atrairia milhares de seguidores.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Os primeiros adeptos foram atraídos não pela promessa de poder, mas pela visão de um mundo melhor. Vorynthrix e seus companheiros corrompidos foram mestres na arte da manipulação, apresentando suas ideias como a evolução natural da filosofia Aetheri. Eles argumentavam que a Lei da Pureza não era uma limitação, mas um convite à transcendência — que os seres \"puros\" deveriam não apenas aceitar sua imortalidade, mas ativamente expandi-la, eliminando as fontes de impureza que ameaçavam a ordem cósmica. Esta distorção da verdade atraiu inicialmente os idealistas, aqueles que genuinamente acreditavam estar trabalhando para um futuro melhor.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Os Grupos de Adeptos de Cada Nihilaryth")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Cada Nihilaryth desenvolveu seu próprio círculo de seguidores, adaptado à sua natureza específica e método de corrupção. Estes grupos não eram completamente isolados — existia uma coordenação central liderada por Vorynthrix — mas cada um desenvolveu características únicas que refletiam a essência de seu mestre corrompido. A hierarquia dentro de cada grupo era rígida e implacável, com a lealdade sendo testada constantemente através de rituais de iniciação e provas de devoção.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        // Table of Nihilaryth and their follower groups
        new Paragraph({
          spacing: { before: 200, after: 200 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "TABELA 1: Os Nihilaryth e Seus Respectivos Grupos de Seguidores", bold: true, size: 22, color: colors.primary })]
        }),

        new Table({
          columnWidths: [1800, 2200, 2500, 2860],
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, width: { size: 1800, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NIHILARYTH", bold: true, size: 20, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TÍTULO", bold: true, size: 20, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NOME DO GRUPO", bold: true, size: 20, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2860, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NÚMERO ESTIMADO", bold: true, size: 20, color: colors.primary })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Vorynthrix", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Testemunha", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Os Videntes de Voryn", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~15.000 seguidores", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Xaryntha", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Sussurrante", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Ordem do Sussurro", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~22.000 seguidores", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Thorynax", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Tormento", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Os Flagelados", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~8.000 seguidores", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Veldryss", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Arquiteto", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Os Construtores do Abismo", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~12.000 seguidores", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nyxaryon", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Silêncio", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Os Mudos", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~6.000 seguidores", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Krythanna", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Ilusionista", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Espelho Quebrado", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~18.000 seguidores", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Zaryphion", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Conquistador", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Legião Dourada", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~25.000 seguidores", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Myrthanna", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Mãe das Sombras", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Os Filhos da Noite", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~14.000 seguidores", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Dravoryx", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Consumidor", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Horda Voraz", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~30.000 seguidores", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sylvarion", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Corruptor de Raízes", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Círculo Apodrecido", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~10.000 seguidores", size: 20 })] })] })
            ]})
          ]
        }),

        new Paragraph({
          spacing: { before: 100, after: 300 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "TOTAL ESTIMADO DE SEGUIDORES: ~160.000 adeptos diretos", italics: true, size: 20, color: colors.secondary })]
        }),

        // Detailed descriptions of each group
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2.2.1 Os Videntes de Voryn (Vorynthrix)")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Os Videntes de Voryn constituíam o grupo mais elitista e intelectual entre os seguidores dos Nihilaryth. Compostos principalmente por filósofos, cientistas e estudiosos do Aethra em seus níveis mais elevados, os Videntes eram atraídos pela promessa de conhecimento absoluto que Vorynthrix oferecia. Eles acreditavam que, através da corrupção controlada, poderiam transcender as limitações da existência mortal e alcançar uma forma de percepção cósmica que ultrapassaria até mesmo a sabedoria dos Seraphyens. Seus rituais envolviam a ingestão de essências corrompidas que supostamente permitiam vislumbres do \"futuro verdadeiro\" — um universo perfeito onde toda imperfeição teria sido eliminada.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A estrutura interna dos Videntes era organizada em três círculos concêntricos. O Círculo Externo era composto por novatos e investigadores, aqueles que ainda estavam sendo testados quanto à sua dedicação e compatibilidade com a corrupção. O Círculo Interno incluía os membros plenamente iniciados, com acesso aos rituais mais profundos e às visões compartilhadas por Vorynthrix. O Círculo Central, com apenas doze membros, representava a elite dos Videntes — indivíduos que haviam se comunicado diretamente com Vorynthrix e que serviam como seus porta-vozes e comandantes em campo. Estes doze eram conhecidos como os Profetas de Voryn, e sua palavra era lei dentro da organização.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2.2.2 A Ordem do Sussurro (Xaryntha)")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A Ordem do Sussurro era a organização mais insidiosa entre os seguidores dos Nihilaryth, especializada em infiltração, manipulação mental e subversão silenciosa. Seus membros eram treinados na arte de implantar pensamentos e ideias nas mentes de seus alvos sem que estes percebessem a influência externa. Xaryntha, a Sussurrante, comunicava-se diretamente com seus seguidores através de uma conexão mental permanente, permitindo coordenação instantânea e impossível de interceptar. A Ordem era responsável pela maior parte das conversões silenciosas — indivíduos que se juntavam à causa dos Nihilaryth sem sequer perceber que haviam sido manipulados.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A hierarquia da Ordem era baseada em níveis de \"clareza auditiva\" — a capacidade de ouvir e interpretar os sussurros de Xaryntha. Os níveis variavam de um a nove, com o nível nove sendo reservado para aqueles capazes de transmitir a voz de Xaryntha para outros. Os Sussurradores de Nove, como eram conhecidos, podiam falar com a autoridade de Xaryntha, e suas palavras carregavam um peso hipnótico que tornava a resistência quase impossível. Dizia-se que ouvir a voz de um Sussurrador de Nove pela primeira vez era como ouvir a própria verdade que sempre se soube mas nunca se ousou admitir.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2.2.3 Os Flagelados (Thorynax)")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Os Flagelados representavam o grupo mais perturbador entre os seguidores dos Nihilaryth. Estes indivíduos haviam abraçado a dor como caminho para a transcendência, acreditando que o sofrimento era a única verdade do universo e que aqueles que o dominassem alcançariam um estado além da mortalidade. Thorynax, o Tormento, havia descoberto que a dor extrema podia abrir portas na consciência que normalmente permaneciam seladas — portas para uma percepção ampliada e para um poder que transcendia as limitações normais do Aethra. Os Flagelados submetiam-se a rituais de agonia controlada que gradualmente transformavam sua capacidade de sentir prazer em uma capacidade ampliada de sentir dor.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A organização dos Flagelados era notavelmente plana, sem distinções hierárquicas formais. O status dentro do grupo era determinado exclusivamente pela tolerância à dor demonstrada e pela maestria nas técnicas de transformação do sofrimento em poder. Os Flagelados mais avançados podiam infligir agonias indescritíveis a seus inimigos com um simples toque, e alguns dizia-se que podiam até mesmo absorver a dor de outros, acumulando-a como combustível para suas técnicas devastadoras. Em batalha, os Flagelados eram temidos não apenas por seu poder, mas por sua aparente imunidade a ferimentos que incapacitariam qualquer outro guerreiro.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2.2.4 Os Construtores do Abismo (Veldryss)")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Os Construtores do Abismo eram engenheiros, arquitetos e tecnólogos que haviam se dedicado à criação de estruturas e dispositivos que desafiavam as leis naturais do universo. Veldryss, antes de sua corrupção, havia sido o maior arquiteto da civilização Aetherion, responsável por maravilhas tecnológicas que ainda hoje seriam consideradas impossíveis. Após sua queda, ele atraiu aqueles que compartilhavam sua obsessão pela criação perfeita — estruturas que existiriam eternamente, máquinas que funcionariam sem falhas, sistemas que se automanteriam indefinidamente. Os Construtores viam a corrupção não como uma maldição, mas como uma ferramenta — um recurso que permitia transcender as limitações da matéria comum.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A hierarquia dos Construtores era baseada em realizações tangíveis. Cada membro era avaliado não por títulos ou linhagem, mas pelas criações que havia produzido. Os mais respeitados eram aqueles cujos dispositivos e estruturas haviam demonstrado utilidade prática para a causa dos Nihilaryth. A cidadela dimensional onde os Nihilaryth foram presos, por exemplo, foi parcialmente projetada pelos Construtores do Abismo — embora eles não soubessem que estavam criando sua própria prisão. Esta ironia não os abalou; eles viam a cidadela como sua obra-prima, mesmo que agora servissem para mantê-los confinados.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2.2.5 Os Mudos (Nyxaryon)")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Os Mudos constituíam o grupo mais enigmático entre os seguidores dos Nihilaryth. Seus membros haviam voluntariamente renunciado à capacidade de falar, comunicando-se exclusivamente através de gestos, expressões e projeções mentais. Este sacrifício era o primeiro passo em um caminho de negação sensorial que, segundo Nyxaryon, levava a uma percepção mais pura da realidade. Os Mudos acreditavam que os sentidos comuns eram distrações que impediam os seres de perceber a verdadeira natureza do vazio. Através da rejeição gradual de cada sentido, eles buscavam alcançar um estado de consciência pura, desapegada das ilusões do mundo material.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A organização dos Mudos operava em células isoladas, cada uma liderada por um Silenciador — um indivíduo que havia avançado o suficiente no caminho da negação sensorial para poder guiar outros. Os Silenciadores mais avançados haviam renunciado a todos os cinco sentidos convencionais, percebendo o mundo exclusivamente através de uma sensibilidade expandida ao Aethra. Dizia-se que estes seres podiam detectar a presença de inimigos a quilômetros de distância, perceber mentiras com infalível precisão e antecipar ataques antes mesmo de seus oponentes decidirem realizá-los.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2.2.6 O Espelho Quebrado (Krythanna)")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O Espelho Quebrado era uma organização de ilusionistas e manipuladores da realidade que havia abraçado a filosofia de que toda percepção era ilusória, e que apenas através da maestria da ilusão era possível alcançar verdadeiro poder. Krythanna, a Ilusionista, ensinava que o universo como era percebido não passava de uma construção mental — um sonho coletivo que podia ser moldado por aqueles com força de vontade suficiente. Seus seguidores treinavam incansavelmente para expandir sua capacidade de criar ilusões, desde simples truques visuais até realidades alternativas completas que podiam aprisionar mentes desavisadas por toda a eternidade.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A hierarquia do Espelho Quebrado era baseada no conceito de \"camadas\" — cada membro podia criar um determinado número de camadas de ilusão, e quanto mais camadas, mais alto seu status. Os mestres supremos, conhecidos como Quebra-espelhos, podiam criar ilusões dentro de ilusões, camadas infinitas de realidade falsa que mesmo os mais poderosos videntes tinham dificuldade de penetrar. Dizia-se que um Quebra-espelho verdadeiramente habilidoso podia fazer um inimigo acreditar que havia vencido uma batalha, celebrado a vitória e vivido anos de paz — tudo em um instante, antes de revelar que nada disso havia acontecido.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2.2.7 A Legião Dourada (Zaryphion)")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A Legião Dourada era a força militar mais temível entre os seguidores dos Nihilaryth, composta por guerreiros de elite que haviam abraçado a filosofia de que o poder era o único direito verdadeiro no universo. Zaryphion, o Conquistador, ensinava que a existência era uma competição constante, e que apenas os mais fortes mereciam prevalecer. Seus seguidores não viam problema em subjugar os mais fracos — ao contrário, consideravam isso uma obrigação moral, uma forma de impor ordem sobre o caos. A Legião Dourada atraía principalmente soldados, comandantes e estrategistas que haviam se frustrado com as limitações éticas impostas pela sociedade Aetheri convencional.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A organização da Legião era rigidamente militar, com patentes claramente definidas e um código de honra interno que punia severamente qualquer demonstração de fraqueza ou hesitação. Os Legionários mais graduados haviam participado de centenas de conquistas, e suas armaduras eram gravadas com símbolos representando cada mundo que haviam ajudado a subjugar. O ápice da hierarquia era ocupado pelos Generais Dourados, guerreiros de poder tão devastador que dizia-se poderiam enfrentar um Seraphyen em combate direto — embora tal confronto nunca tivesse ocorrido antes do selamento.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2.2.8 Os Filhos da Noite (Myrthanna)")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Os Filhos da Noite eram seguidores que haviam sido atraídos pela promessa de Myrthanna: proteção absoluta, amor incondicional e um lugar de pertencimento que o mundo externo jamais poderia oferecer. Myrthanna, a Mãe das Sombras, apresentava-se como uma figura maternal para aqueles que se sentiam rejeitados, incompreendidos ou marginalizados pela sociedade. Sua corrupção era talvez a mais perversa de todas, pois distorcia o amor genuíno em uma possessão sufocante. Os Filhos da Noite acreditavam estar encontrando uma família, quando na realidade estavam se voluntariando para servidão eterna.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A estrutura dos Filhos da Noite era organizada como uma família estendida, com Myrthanna no centro como a Mãe Suprema. Abaixo dela estavam os Filhos Primogênitos, aqueles que haviam servido por mais tempo e com maior devoção. Estes primogênitos atuavam como \"irmãos mais velhos\" para os novos recrutas, guiando-os através dos rituais de iniciação e ajudando-os a abandonar seus laços com o mundo externo. A lealdade dos Filhos da Noite era absoluta — eles acreditavam genuinamente que Myrthanna os amava, e esta crença os tornava dispostos a qualquer sacrifício em seu nome.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2.2.9 A Horda Voraz (Dravoryx)")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A Horda Voraz era o maior e menos organizado grupo entre os seguidores dos Nihilaryth. Seus membros eram atraídos pela promessa de saciedade eterna — não apenas fome física, mas todos os tipos de desejo e necessidade que atormentam a existência mortal. Dravoryx, o Consumidor, ensinava que o universo era uma festa interminável, e que aqueles que abraçassem sua natureza consumidora jamais experimentariam privação novamente. A Horda atraía principalmente aqueles que haviam conhecido pobreza extrema, fome real ou qualquer forma de escassez debilitante.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A organização da Horda era caótica, funcionando mais como uma horda verdadeira do que como uma sociedade estruturada. No entanto, existia uma hierarquia baseada na capacidade de consumo — aqueles que podiam absorver mais energia, matéria e essência eram automaticamente superiores. Os Vorazes Supremos, no topo da hierarquia, eram seres que haviam desenvolvido a capacidade de consumir não apenas matéria física, mas também energia espiritual, memórias e até mesmo a própria existência de seus inimigos. Dizia-se que um Voraz Supremo podia consumir completamente um oponente, deixando absolutamente nada para trás — nem corpo, nem espírito, nem memória.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2.2.10 O Círculo Apodrecido (Sylvarion)")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O Círculo Apodrecido era composto principalmente por druidas, xamãs e aqueles que trabalhavam com as forças da natureza. Sylvarion, o Corruptor de Raízes, havia sido originalmente um dos maiores guardiões dos mundos naturais da civilização Aetherion, responsável por manter o equilíbrio entre o crescimento e a decomposição. Sua corrupção distorceu esta compreensão, levando-o a acreditar que a decomposição não era o fim da vida, mas seu estado mais puro — uma libertação das limitações da forma. Seus seguidores abraçavam esta filosofia, celebrando a putrefação como forma de transcendência.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A hierarquia do Círculo era baseada no grau de \"decomposição aceita\" — os membros mais avançados haviam permitido que partes significativas de seus próprios corpos fossem consumidas pela corrupção, substituídas por tecido necrótico animado por energia espiritual. Os Podres-mestres, no topo da hierarquia, eram praticamente cadáveres ambulantes, com apenas fragmentos de sua forma original ainda visíveis. Apesar de sua aparência aterrorizante, os Podres-mestres eram entre os mais poderosos seguidores dos Nihilaryth, capazes de espalhar corrupção através do próprio ambiente, transformando florestas exuberantes em pântanos pestilentos com um simples toque.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        // SECTION 3: HIERARCHY OF FOLLOWERS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("III. A HIERARQUIA GERAL DOS SEGUIDORES")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Estrutura em Cinco Níveis")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Além das estruturas individuais de cada grupo, existia uma hierarquia geral que conectava todos os seguidores dos Nihilaryth em uma rede coordenada. Esta hierarquia não substituía as estruturas internas de cada grupo, mas fornecia uma estrutura comum para operações conjuntas e para a resolução de conflitos entre grupos diferentes. A hierarquia era baseada em cinco níveis principais, cada um representando um grau diferente de corrupção aceita e poder alcançado.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O Nível Inicial, denominado \"O Chamado\", era composto por aqueles que haviam sido atraídos para a causa mas ainda não haviam se submetido aos rituais de iniciação completa. Estes indivíduos ainda mantinham laços com o mundo exterior e podiam, teoricamente, ser resgatados se fossem alcançados a tempo. Representavam aproximadamente 40% do total de seguidores e eram utilizados principalmente como fontes de informação, recursos e recrutamento adicional.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O segundo nível, chamado \"O Abraço\", incluía aqueles que haviam aceito a corrupção inicial, permitindo que uma fração da essência corrompida de seu mestre Nihilaryth fluísse através deles. Este estágio marcava o ponto de não retorno — a corrupção começava a alterar permanentemente sua essência espiritual, tornando a purificação extremamente difícil, embora ainda teoricamente possível. Os membros do Abraço formavam a espinha dorsal das operações dos Nihilaryth, servindo como soldados, espiões e operários.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O terceiro nível, conhecido como \"A Comunhão\", era reservado para aqueles que haviam estabelecido uma conexão direta e permanente com seu mestre Nihilaryth. Esta conexão permitia comunicação instantânea, compartilhamento de poder e até mesmo empréstimo de habilidades específicas. Os Comungados eram os comandantes de campo, líderes de células e coordenadores de operações complexas. Sua corrupção era profunda demais para qualquer forma de purificação convencional — apenas um milagre poderia salvá-los.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O quarto nível, denominado \"A Encarnação\", era alcançado apenas por aqueles que haviam se tornado tão profundamente corrompidos que praticamente deixaram de ser indivíduos separados. Eram vasos vivos para a essência de seus mestres, capazes de manifestar frações significativas do poder dos Nihilaryth. Os Encarnados eram raros — talvez não mais de quinhentos em toda a história da civilização corrupta — e eram tratados como armas de último recurso, mobilizados apenas nas situações mais críticas.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O quinto e mais elevado nível, chamado \"A Ascensão\", era teórico — nenhum seguidor jamais havia alcançado este estágio antes do selamento. A Ascensão representaria a fusão completa com um Nihilaryth, a transformação em uma extensão viva de sua vontade. Segundo os textos proibidos recuperados após a queda, aqueles que alcançassem a Ascensão deixariam de existir como indivíduos, tornando-se um com seu mestre para toda a eternidade. Alguns estudiosos acreditam que Nyxalor, durante sua possessão por Vorynthrix, pode ter experimentado algo próximo deste estado.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        // Table of hierarchy levels
        new Paragraph({
          spacing: { before: 200, after: 200 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "TABELA 2: Níveis da Hierarquia dos Seguidores", bold: true, size: 22, color: colors.primary })]
        }),

        new Table({
          columnWidths: [1800, 2400, 2400, 2760],
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NÍVEL", bold: true, size: 20, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NOME", bold: true, size: 20, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CARACTERÍSTICAS", bold: true, size: 20, color: colors.primary })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "% POPULAÇÃO", bold: true, size: 20, color: colors.primary })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Chamado", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Recrutados, não iniciados", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~40%", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "O Abraço", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Corrupção inicial irreversível", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~35%", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Comunhão", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Conexão direta com mestre", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~20%", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Encarnação", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Vasos vivos do poder", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "~5%", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A Ascensão", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fusão completa (teórico)", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nenhum", size: 20 })] })] })
            ]})
          ]
        }),

        // SECTION 4: ATTEMPTS OF RETURN
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("IV. AS TENTATIVAS DE RETORNO ATRAVÉS DAS ERAS")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 Primeira Tentativa: A Era de Ilios e Nyxalor")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A primeira tentativa organizada de retorno dos seguidores dos Nihilaryth ocorreu durante os tempos de Ilios e Nyxalor, aproximadamente no meio da Era dos Seraphyens. Esta tentativa foi precipitada por dois fatores principais: o enfraquecimento gradual das barreiras dimensionais que mantinham os Nihilaryth confinados, e a possessão de Nyxalor por Vorynthrix. A possessão de Nyxalor não foi um evento isolado — foi o culminar de séculos de manipulação sutil por parte dos seguidores que haviam escapado do selamento original.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Os seguidores remanescentes haviam se organizado em células clandestinas, escondidas nos mundos periféricos que haviam escapado à purificação que se seguiu à queda da civilização Aetherion. Estes grupos, compostos principalmente por membros do nível \"Comunhão\" e alguns raros \"Encarnados\", haviam passado milênios preparando o terreno para o retorno de seus mestres. Eles haviam identificado Nyxalor como seu alvo principal — o filho de Alyndra, com seu poder sobre as trevas, representava o vaso perfeito para a essência de Vorynthrix.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A possessão de Nyxalor foi facilitada por uma rede de seguidores da Ordem do Sussurro que haviam se infiltrado na corte de Nova Alyndra. Estes agentes, trabalhando em conjunto com os Videntes de Voryn, criaram uma série de \"acidentes\" e crises que isolaram gradualmente Nyxalor de seus aliados e mentores. Cada crise parecia independente, mas todas serviam para enfraquecer as defesas mentais e espirituais de Nyxalor, tornando-o cada vez mais vulnerável à influência de Vorynthrix. Quando a possessão finalmente ocorreu, ela foi tão sutil que ninguém percebeu imediatamente — Nyxalor ainda parecia ser ele mesmo, apenas mais ambicioso e determinado.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A guerra civil que se seguiu foi devastadora. Nyxalor, agora parcialmente controlado por Vorynthrix, reuniu uma aliança de mundos descontentes e facções marginalizadas, prometendo uma nova ordem onde todos poderiam alcançar seu verdadeiro potencial. Nos bastidores, os seguidores dos Nihilaryth trabalhavam incansavelmente para enfraquecer ainda mais as barreiras dimensionais, preparando o caminho para o retorno completo dos dez mestres corrompidos. No momento mais crítico do conflito, quando a vitória parecia iminente para as forças de Nyxalor, Ilios tomou sua decisão fatídica.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Ilios compreendeu que não poderia derrotar Nyxalor sem destruir completamente seu ser — e que mesmo isso talvez não fosse suficiente, pois Vorynthrix poderia simplesmente possuir outro vaso. Em um ato de sacrifício supremo, Ilios canalizou toda a sua essência luminosa em um ataque que não visava destruir Nyxalor, mas sim selá-lo junto com a fração de Vorynthrix que o possuía. Este selamento, realizado no plano espiritual, prendeu não apenas Nyxalor e Vorynthrix, mas também todos os seguidores que haviam estabelecido conexão direta com eles através da Comunhão. Milhares de seguidores foram arrastados para o confinamento dimensional, desencadeando uma dispersão dos grupos remanescentes que levaria milênios para se recuperar.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 A Segunda Tentativa: A Era de Grazielly e Elainy")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A segunda tentativa de retorno, e a mais bem-sucedida, ocorreu durante a Era de Grazielly, aproximadamente 2.000 anos após os eventos da Era dos Seraphyens. Esta tentativa foi caracterizada por uma preparação muito mais extensa e paciente, envolvendo a infiltração gradual de praticamente todas as instituições importantes do planeta Aetherion. Os seguidores remanescentes haviam aprendido com seus erros anteriores — em vez de tentar uma conquista rápida, eles trabalharam pacientemente para corromper a sociedade de dentro para fora.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A possessão de Elainy foi o ponto central desta estratégia. Diferente de Nyxalor, cuja possessão havia sido forçada e parcial, Elainy foi corrompida gradualmente ao longo de anos, sem que ela própria percebesse o que estava acontecendo. Os seguidores dos Nihilaryth, particularmente aqueles ligados a Krythanna e Xaryntha, exploraram as inseguranças e medos de Elainy, alimentando sutilmente sua rivalidade com Grazielly e sua frustração com as limitações de seu poder sobre o fogo. Cada pequena vitória de Elainy contra seus próprios limites era na verdade um passo mais profundo na corrupção, pois o poder que ela acessava vinha cada vez mais das fontes corrompidas.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O conflito galáctico que se seguiu foi desencadeado por Nyxalor, que havia conseguido transmitir mensagens do interior de sua prisão dimensional para os seguidores no mundo exterior. Embora Ilios o tivesse selado junto com Vorynthrix, a conexão entre eles permanecia, e ao longo de milênios, Nyxalor havia aprendido a usar esta conexão para enviar visões e instruções para aqueles que ainda permaneciam leais à causa. Quando os seguidores finalmente conseguiram enfraquecer as barreiras suficientemente para permitir uma comunicação mais clara, Nyxalor coordenou pessoalmente a ofensiva final.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "O triunfo temporário dos seguidores dos Nihilaryth foi alcançado quando Elainy, completamente consumida pela corrupção, atingiu o estado de Supernova — uma explosão de poder tão devastadora que ameaçou consumir não apenas o planeta Aetherion, mas todo o sistema solar. Neste momento, os seguidores acreditaram ter vencido, pois a destruição de tal magnitude seria suficiente para romper completamente as barreiras que mantinham os dez Nihilaryth confinados. O que eles não previram foi o sacrifício de Grazielly e Noah.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Grazielly, alcançando a Unidade Universal através de seus nanobots, conseguiu conter a explosão de Elainy enquanto Noah, usando sua armadura tecnológica e sua natureza Silentis, criou um campo de contenção que impedia a corrupção de se espalhar. Juntos, eles realizaram o impossível — não apenas selaram novamente os Nihilaryth, mas purificaram parcialmente Elainy, arrancando de sua alma a corrupção que havia se enraizado por anos. Este sacrifício custou suas vidas, mas salvou o universo de um destino que teria significado o fim de toda a existência como era conhecida.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        // SECTION 5: THE POSSESSION OF ELAINY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("V. A POSSESSÃO DE ELAINY: UM ESTUDO DE CASO")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 O Processo de Corrupção")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A possessão de Elainy representa o exemplo mais completo e bem documentado de como os seguidores dos Nihilaryth operam para corromper indivíduos poderosos. Diferente da possessão de Nyxalor, que foi relativamente rápida e direta, a corrupção de Elainy foi um processo de anos, meticulosamente orquestrado por múltiplos grupos de seguidores trabalhando em coordenação. O processo pode ser dividido em cinco fases distintas, cada uma representando um nível mais profundo de comprometimento.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A primeira fase, denominada \"Insinuação\", envolveu a introdução sutil de dúvidas e inseguranças na mente de Elainy. Agentes da Ordem do Sussurro infiltraram-se em seu círculo social, tornando-se amigos, confidentes e conselheiros. Eles nunca sugeriam nada diretamente ligado aos Nihilaryth — em vez disso, eles alimentavam lentamente as comparações entre Elainy e Grazielly, destacando como Grazielly parecia acessar poder com facilidade enquanto Elainy lutava para controlar suas chamas. Esta fase durou aproximadamente dois anos, tempo suficiente para que as sementes da inveja crescessem sem chamar atenção.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A segunda fase, chamada \"Oferta\", começou quando os agentes identificaram que Elainy estava pronta para buscar alternativas. Um \"mestre\" foi introduzido em sua vida — um professor particular que prometia técnicas antigas e perdidas para o controle do fogo. Este mestre era na verdade um Encarnado de Krythanna, capaz de demonstrar poderes genuínos que impressionaram Elainy. As técnicas que ele ensinava eram reais, mas cada uma vinha acompanhada de uma pequena fração de corrupção — uma dependência crescente de fontes de poder que não eram completamente puras.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A terceira fase, \"Dependência\", foi quando Elainy começou a perceber que não conseguia mais acessar seu poder sem as técnicas ensinadas pelo mestre. Sua conexão natural com o fogo havia sido suplantada pela conexão corrupta que ela havia desenvolvido inconscientemente. Neste ponto, os seguidores introduziram o conceito de que sua dificuldade anterior era resultado de \"limitações artificiais\" impostas por aqueles que temiam seu verdadeiro potencial. A narrativa de que ela havia sido impedida de alcançar sua grandeza legítima ressoou profundamente com suas frustrações acumuladas.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A quarta fase, \"Transformação\", marcou o momento em que a corrupção se tornou visível externamente. Elainy começou a demonstrar habilidades que iam além do controle normal do fogo — chamas que queimavam em cores impossíveis, fogo que consumia não apenas matéria mas também energia espiritual. Estas habilidades eram impressionantes, mas vinham com um custo: Elainy começou a experimentar lapsos de memória, momentos de \"ausência\" onde ela agia de maneiras que depois não lembrava. Estes eram os momentos em que a corrupção assumia temporariamente o controle.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A quinta e final fase, \"Consolidação\", foi quando Elainy finalmente permitiu conscientemente que a corrupção assumisse o controle. Isto não aconteceu em um momento de fraqueza, mas em um momento de aparente triunfo — ela acreditava ter finalmente alcançado o controle completo de seu poder, não percebendo que este \"controle\" era na verdade uma ilusão criada por Krythanna e Vorynthrix trabalhando em conjunto. No momento em que Elainy desencadeou a Supernova, ela acreditava estar salvando o mundo; não tinha ideia de que estava prestes a destruí-lo.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        // SECTION 6: CONNECTIONS AND CONCLUSIONS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("VI. CONEXÕES NARRATIVAS E IMPLICAÇÕES FUTURAS")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 O Papel de Nyxalor")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Nyxalor representa uma figura trágica central na história dos seguidores dos Nihilaryth. Como filho de Alyndra, ele possuía potencial ilimitado, mas sua afinidade natural com as trevas o tornou particularmente vulnerável à influência de Vorynthrix. A possessão de Nyxalor não foi apenas um evento isolado, mas o início de uma cadeia de consequências que se estenderiam por milênios. Mesmo após ser selado por Ilios, sua conexão com Vorynthrix permaneceu, permitindo que ele servisse como um canal para que os seguidores externos recebessem instruções e coordenação.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A ambiguidade moral de Nyxalor é central para sua caracterização. Ele não era puramente mau — sua possessão foi o resultado de manipulação e circunstâncias além de seu controle. Nos momentos de clareza que ele conseguia manter, lutava contra a influência de Vorynthrix, tentando proteger aqueles que amava mesmo enquanto seu corpo e poder eram usados para fins nefastos. Esta luta interna tornou-o uma figura trágica, um príncipe das trevas que nunca escolheu seu destino, mas que foi forçado a carregar seu peso.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.2 Os Sacríficios de Ilios e Grazielly")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Os sacrifícios de Ilios e Grazielly formam um paralelo estrutural fundamental na narrativa do universo de Alyndras. Ambas as heroínas foram forçadas a escolher entre sua própria existência e a salvação do universo, e ambas fizeram a escolha final sem hesitação. No entanto, seus sacrifícios diferem em natureza e consequência. Ilios, ao selar Nyxalor, não apenas confinou seu primo amado, mas também escolheu ser selada junto com ele — uma condenação voluntária a uma existência liminar, nem viva nem morta, entre dimensões.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Grazielly, por outro lado, escolheu um sacrifício de transformação completa. Ao alcançar a Unidade Universal, ela não morreu no sentido convencional, mas transcendeu para uma forma de existência que vai além da compreensão mortal. Seu sacrifício criou as condições para o nascimento de Iris, sua filha, que herdou não apenas seu potencial genético, mas também a essência transformada de sua mãe. Iris representa, em muitos aspectos, a continuação do sacrifício de Grazielly — uma vida que existe porque sua mãe escolheu deixar de existir como era.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.3 Implicações para a Era de Iris")] }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "A Era de Iris apresenta tanto oportunidades quanto desafios únicos no que tange aos seguidores dos Nihilaryth. Por um lado, os sacrifícios anteriores enfraqueceram significativamente a organização, com milhares de seguidores presos em dimensões alternativas ou purificados durante os eventos da Era de Grazielly. Por outro lado, a corrupção é inerentemente persistente, e aqueles que escaparam à purificação continuam a trabalhar nos bastidores, adaptando-se às novas circunstâncias.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Iris, como herdeira do legado de Grazielly e Noah, representa tanto a maior esperança quanto o maior alvo potencial. Sua capacidade de evolução constante a torna potencialmente capaz de desenvolver defesas contra formas de corrupção que nunca existiram antes, mas também a torna um prêmio irresistível para os seguidores que acreditam que sua corrupção poderia finalmente permitir a libertação completa dos dez Nihilaryth. A Era de Iris, portanto, será caracterizada por uma tensão constante entre o potencial de transcendência luminosa e o risco de queda nas trevas.", color: colors.bodyText, font: "Times New Roman" })]
        }),

        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Os seguidores remanescentes dos Nihilaryth, embora dramaticamente reduzidos em número, permanecem ativos. Estima-se que entre cinco e dez mil adeptos ainda operem em algum nível, a maioria pertencente aos níveis mais baixos da hierarquia. No entanto, alguns Comungados e até mesmo alguns raros Encarnados conseguiram escapar à purificação, escondendo-se nas bordas da galáxia ou infiltrando-se em sociedades que nunca ouviram falar dos Nihilaryth. Estas células dormentes representam uma ameaça constante, prontas para serem reativadas quando as condições forem favoráveis.", color: colors.bodyText, font: "Times New Roman" })]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/z/my-project/download/Alyndras_Nihilaryth_Seguidores.docx', buffer);
  console.log('Documento gerado com sucesso!');
});
