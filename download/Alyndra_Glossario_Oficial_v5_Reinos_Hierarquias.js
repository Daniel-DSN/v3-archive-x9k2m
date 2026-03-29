const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle, 
        WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

const colors = {
  primary: "0B1220",
  body: "0F172A",
  secondary: "2B2B2B",
  accent: "9AA6B2",
  tableBg: "F1F5F9",
  fire: "FEE2E2", fireText: "991B1B",
  water: "DBEAFE", waterText: "1E40AF",
  earth: "FEF3C7", earthText: "92400E",
  wind: "E0E7FF", windText: "3730A3",
  lightning: "FEF9C3", lightningText: "854D0E",
  shadow: "F3E8FF", shadowText: "6B21A8"
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: colors.accent };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };

// Helper for tables
function simpleTable(headers, rows, widths) {
  return new Table({
    columnWidths: widths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => new TableCell({
          borders: cellBorders,
          shading: { fill: colors.tableBg, type: ShadingType.CLEAR },
          verticalAlign: VerticalAlign.CENTER,
          width: { size: widths[i], type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, size: 18 })] })]
        }))
      }),
      ...rows.map(row => new TableRow({
        children: row.map((cell, i) => new TableCell({
          borders: cellBorders,
          verticalAlign: VerticalAlign.CENTER,
          width: { size: widths[i], type: WidthType.DXA },
          shading: cell.fill ? { fill: cell.fill, type: ShadingType.CLEAR } : undefined,
          children: [new Paragraph({ 
            alignment: cell.center ? AlignmentType.CENTER : AlignmentType.LEFT,
            children: [new TextRun({ text: cell.text, bold: cell.bold, size: 18, color: cell.color })] 
          })]
        }))
      }))
    ]
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal", run: { size: 56, bold: true, color: colors.primary, font: "Times New Roman" }, paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, color: colors.primary, font: "Times New Roman" }, paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, color: colors.secondary, font: "Times New Roman" }, paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, color: colors.body, font: "Times New Roman" }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
      { id: "Quote", name: "Quote", basedOn: "Normal", run: { size: 22, italics: true, color: colors.secondary }, paragraph: { spacing: { before: 200, after: 200 }, alignment: AlignmentType.CENTER } }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "ALYNDRA — Glossário Oficial v5.0", italics: true, color: colors.accent, size: 18 })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "— ", color: colors.accent }), new TextRun({ children: [PageNumber.CURRENT], color: colors.accent }), new TextRun({ text: " —", color: colors.accent })] })] }) },
    children: [
      // =============================================
      // AETHERION - REINOS E HIERARQUIAS MÍSTICAS
      // =============================================
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("AETHERION — REINOS ELEMENTAIS")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Os Seis Reinos Primordiais")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Aetherion era dividida em Seis Reinos Elementais Primordiais, cada um governado por um Conselheiro do Círculo 2. Estes reinos não eram apenas divisões territoriais — eram expressões vivas dos elementos que compõem o universo. Cada reino desenvolveu cultura, tecnologia e filosofia únicas baseadas em seu elemento fundamental. A harmonia entre os seis reinos era mantida pelo Sétimo Domínio: Aetheris Central, onde Alyndra governava como a força unificadora.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Os nomes místicos dos reinos derivam da Língua Primordial dos Aetheri, cada um carregando significados profundos que transcendem a simples tradução. Estes nomes foram preservados parcialmente através das eras, alguns sobrevivendo como nomes de cidades na era de Grazielly, outros perdidos para o tempo.")
      ]}),
      
      // REINO DO FOGO
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("🔥 PYRALIS — O Reino das Chamas Eternas")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "Nome Místico: \"Pyralis\" = \"Aquele que Forja com Fogo\"", italics: true, color: colors.fireText })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Pyralis era o reino do elemento Fogo, localizado na região vulcânica do oeste de Aetherion. Seu terreno era dominado por vulcões ativos, desertos de cinza e forjas primordiais onde a tecnologia Aetheris era desenvolvida em suas formas mais puras. O fogo era reverenciado não como destruição, mas como transformação — a chama que purifica e renova."),
      ]}),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Características Únicas:", bold: true }),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Cidades construídas dentro de vulcões extintos, aquecidas pelo calor da terra"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Ferreiros capazes de moldar metal com as mãos através de Aethra ígneo"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Tecnologia de forja que criava armas lendárias usadas pelos Seraphyens"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("• Festival anual da Chama Renovadora, onde o fogo simbolizava renascimento"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Legado: ", bold: true }),
        new TextRun("O nome Pyralis sobreviveu como cidade na era de Grazielly. Elainy nasceu em uma região que preservava a tradição ígnea, embora o conhecimento original tenha sido perdido. As forjas de Pyralis original criaram fragmentos da Armadura Suprema."),
      ]}),
      
      // REINO DA ÁGUA
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("💧 AQUARYS — O Reino das Profundezas Cristalinas")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "Nome Místico: \"Aquarys\" = \"Aquela que Cura com Água\"", italics: true, color: colors.waterText })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Aquarys era o reino do elemento Água, situado no arquipélago tropical ao sul de Aetherion. Compreendia milhares de ilhas, cidades flutuantes sobre o oceano, e impressionantes cidades submersas em cúpulas de cristal Aether-reforçado. Aquarys era o centro de cura e medicina de toda a civilização, desenvolvendo técnicas de regeneração que desafiavam a morte."),
      ]}),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Características Únicas:", bold: true }),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Curandeiros que podiam regenerar tecidos através de Aethra aquático"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Cidades submersas acessíveis apenas por mergulho Aether-assistido"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Tecnologia de purificação que tornava qualquer água potável"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("• Biblioteca de Memórias submersa, preservando conhecimento em cristais líquidos"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Legado: ", bold: true }),
        new TextRun("O nome Aquarys sobreviveu como cidade litorânea. Tradições de cura da era atual derivam fragmentariamente do conhecimento de Aquarys original. Alguns cristais de memória submersos ainda aguardam descoberta."),
      ]}),
      
      // REINO DA TERRA
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("🌍 TERRAX — O Reino das Raízes Eternas")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "Nome Místico: \"Terrax\" = \"Aquele que Sustenta com Terra\"", italics: true, color: colors.earthText })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Terrax era o reino do elemento Terra, localizado nas planícies rochosas e montanhas do leste de Aetherion. Era considerado o berço da civilização Aetherion, pois foi ali que os primeiros assentamentos surgiram. Terrax abrigava as minas de cristais Aether mais profundas e as maiores construções de pedra já erigidas."),
      ]}),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Características Únicas:", bold: true }),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Arquitetos que esculpiam cidades inteiras em montanhas vivas"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Minas de cristais Aether que forneciam energia para toda Aetherion"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Guerrheiros com pele que podia tornar-se granito temporariamente"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("• O Primeiro Templo, onde Alyndra foi consagrada como líder"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Legado: ", bold: true }),
        new TextRun("O nome Terrax foi preservado parcialmente. A região leste do mundo de Grazielly mantém a tradição de mineração e construção em pedra. Ruínas de Terrax original ainda guardam segredos enterrados."),
      ]}),
      
      // REINO DO VENTO
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("🌬️ AEROS — O Reino dos Céus Infinitos")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "Nome Místico: \"Aeros\" = \"Aquele que Liberta com Vento\"", italics: true, color: colors.windText })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Aeros era o reino do elemento Ar/Vento, situado nas montanhas flutuantes e florestas férteis do sul de Aetherion. Diferente dos outros reinos, Aeros desenvolveu uma cultura menos focada em combate e mais em arte, música e conexão espiritual. Era conhecido como o reino mais pacífico e acolhedor de Aetherion."),
      ]}),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Características Únicas:", bold: true }),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Montanhas flutuantes mantidas por Aethra cristalizado"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Aldeias nas copas de árvores gigantescas"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Facilidade natural com voo — o reino onde a habilidade era mais comum"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("• O Jardim dos Ventos, onde Ilyos meditava quando precisava de clareza"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Legado: ", bold: true }),
        new TextRun("O nome Aeros sobreviveu como cidade. A tradição de voo e liberdade permanece na cultura da região sul. Muitos dos Ventos Primordiais (correntes de ar carregadas de Aethra) ainda fluem de ruínas de Aeros."),
      ]}),
      
      // REINO DO RELÂMPAGO
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("⚡ FULGORA — O Reino das Tempestades Eternas")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "Nome Místico: \"Fulgora\" = \"Aquele que Ilumina com Relâmpago\"", italics: true, color: colors.lightningText })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Fulgora era o reino do elemento Relâmpago, situado nos planaltos tempestuosos do norte de Aetherion. Era um reino de constantes tempestades, auroras perpétuas e uma energia elétrica que permeava tudo. Os guerreiros de Fulgora eram os mais rápidos e letais de toda Aetherion, desenvolvendo técnicas de velocidade sobrenatural."),
      ]}),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Características Únicas:", bold: true }),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Cidades protegidas por domos de energia contra tempestades"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Torres capta-raios que alimentavam tecnologia Aetheris"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Guerreiros capazes de teleporte curto através de eletricidade"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("• O Pináculo de Raios, a estrutura mais alta de Aetherion"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Legado: ", bold: true }),
        new TextRun("O nome Fulgora foi parcialmente preservado. A região norte mantém tradições de velocidade e combate. As torres capta-raios originais ainda existem como ruínas que atraem tempestades."),
      ]}),
      
      // REINO DAS SOMBRAS
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("🌑 UMBRALIS — O Reino das Fronteiras")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "Nome Místico: \"Umbralis\" = \"Aquele que Guarda nas Sombras\"", italics: true, color: colors.shadowText })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Umbralis era o reino do elemento Sombra, situado nas regiões fronteiriças ao extremo norte de Aetherion. Diferente da associação moderna de sombras com mal, Umbralis representava proteção, vigilância e o equilíbrio necessário entre luz e escuridão. Era o reino responsável pela defesa das fronteiras de Aetherion."),
      ]}),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Características Únicas:", bold: true }),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Sentinelas que podiam fundir-se com sombras para vigilância"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Tecnologia de invisibilidade baseada em Aethra sombrio"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• O Muro de Sombras, barreira invisível que protegia Aetherion"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("• Biblioteca dos Segredos, onde conhecimento perigoso era guardado"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Legado: ", bold: true }),
        new TextRun("O nome Umbralis derivou para \"Umbra\" na era de Grazielly, mas com conotação negativa. A região norte tornou-se refúgio de exilados. O verdadeiro propósito de Umbralis — proteção e equilíbrio — foi esquecido."),
      ]}),
      
      // DOMÍNIO CENTRAL
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("🏛️ AETHERIS CENTRAL — O Coração de Tudo")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "Nome Místico: \"Aetheris\" = \"O Coração do Éter\"", italics: true, color: colors.primary })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Aetheris Central era o sétimo domínio — não um reino elemental, mas o coração onde todos os elementos convergiam. Era a cidade flutuante capital, sede do governo, e residência de Alyndra. Localizada no centro geográfico de Aetherion, flutuava sobre o maior cristal de Aethra já descoberto, que servia como fonte de energia para toda a civilização."),
      ]}),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Características Únicas:", bold: true }),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• Cidade flutuante sustentada pelo maior cristal de Aethra existente"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• O Trono de Éter, onde Alyndra governava"),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("• O Cristal Central revelava a natureza elemental de cada pessoa"),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("• Convergência dos seis elementos em harmonia perfeita"),
      ]}),
      
      // TABELA COMPARATIVA
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Comparativo: Reinos Primordiais vs Era Atual")] }),
      
      simpleTable(
        ["Reino Primordial", "Elemento", "Reino Atual (Grazielly)", "Status"],
        [
          [{ text: "Pyralis", bold: true }, { text: "Fogo" }, { text: "Reino do Fogo" }, { text: "Nome preservado como cidade" }],
          [{ text: "Aquarys", bold: true }, { text: "Água" }, { text: "Reino da Água" }, { text: "Nome preservado como cidade" }],
          [{ text: "Terrax", bold: true }, { text: "Terra" }, { text: "Reino da Terra" }, { text: "Parcialmente preservado" }],
          [{ text: "Aeros", bold: true }, { text: "Vento" }, { text: "Reino do Vento" }, { text: "Nome preservado como cidade" }],
          [{ text: "Fulgora", bold: true }, { text: "Relâmpago" }, { text: "Reino do Relâmpago" }, { text: "Parcialmente preservado" }],
          [{ text: "Umbralis", bold: true }, { text: "Sombra" }, { text: "Umbra" }, { text: "Significado distorcido" }],
          [{ text: "Aetheris Central", bold: true }, { text: "Todos" }, { text: "Reino Central" }, { text: "Nome preservado" }]
        ],
        [2000, 1500, 2500, 3360]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela: Correspondência entre Reinos Primordiais e Atuais", italics: true, size: 16, color: colors.accent })] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // =============================================
      // HIERARQUIAS MÍSTICAS
      // =============================================
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("HIERARQUIAS MÍSTICAS")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Os Títulos Sagrados dos Seis Círculos")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Além dos nomes comuns (Círculo 0, 1, 2...), cada posição na hierarquia Aetherion possuía um "),
        new TextRun({ text: "Título Sagrado", bold: true }),
        new TextRun(" derivado da Língua Primordial. Estes títulos não eram meramente honoríficos — carregavam significados místicos que descreviam a essência espiritual da função. Quem portava um título era esperado que personificasse seus significados."),
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Círculo 0 — AETHERION")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "\"Aquele que é Um com o Éter\"", italics: true, color: colors.primary, bold: true })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O título Aetherion significava mais que \"líder\" — indicava alguém que transcendera a separação entre indivíduo e universo. Alyndra era a encarnação viva deste título, tendo consumido o Fruto e compreendido os princípios fundamentais da existência. O título era considerado sagrado demais para ser usado levianamente; mesmo nas cerimônias mais formais, Alyndra era chamada de \"A Aetherion\" — a própria personificação do éter."),
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Círculo 1 — PRIMAZ")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "\"O Primeiro Entre Iguais\"", italics: true, bold: true })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O título Primaz indicava o primeiro discípulo do Aetherion, aquele que recebeu diretamente os ensinamentos e os executa com perfeição. Yggoraty, como Primaz, era a extensão da vontade de Alyndra no campo de batalha e na justiça. O título carregava a responsabilidade de ser o exemplo vivo do que Aetherion representava."),
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Círculo 2 — CONSELHEIRO")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "\"Aquele que Ilumina Caminhos\"", italics: true, bold: true })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Os doze Conselheiros não eram meros administradores — eram os doze pilares que sustentavam a estrutura de Aetherion. Cada um governava um dos Doze Domínios, mas o título Conselheiro lembrava que sua função principal era iluminar, não comandar. Eram os faróis que guiavam os cidadãos."),
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Círculo 3 — MESTRE")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "\"Aquele que Transforma Outros\"", italics: true, bold: true })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O título Mestre indicava alguém que transcendeu a jornada pessoal e agora dedica-se a transformar outros. Os ~200 Mestres de Aetherion eram os professores, pesquisadores e guardiões do conhecimento. Um Mestre verdadeiro era medido não por seu próprio poder, mas pelo poder daqueles que formou."),
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Círculo 4 — CIDADÃO")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "\"Aquele que Contribui\"", italics: true, bold: true })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O título Cidadão era mais que \"residente\" — indicava alguém que contribui ativamente para o todo. Em Aetherion, ser Cidadão era um privilégio conquistado, não um direito de nascimento. Aqueles que não contribuíam eram chamados de \"Hóspedes\" até demonstrarem mérito. Cada Cidadão tinha o dever de deixar Aetherion melhor do que a encontrou."),
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Círculo 5 — DESPERTO")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "\"Aquele que Serve sem Aethra\"", italics: true, bold: true })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O título Desperto era reservado para aqueles nascidos sem Aethra ativo — os Silentis de Aetherion. Mas diferentemente da era atual, os Despertos eram valorizados e respeitados. Seu título indicava que, embora sem poder espiritual, haviam \"despertado\" para uma forma diferente de contribuição: a genialidade intelectual, artística ou técnica. Os maiores avanços científicos de Aetherion vieram de Despertos."),
      ]}),
      
      // TABELA DE TÍTULOS
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Resumo dos Títulos Sagrados")] }),
      
      simpleTable(
        ["Círculo", "Nome Comum", "Título Sagrado", "Significado"],
        [
          [{ text: "0", bold: true, center: true }, { text: "Aetheris Supremo" }, { text: "AETHERION", bold: true }, { text: "\"Aquele que é Um com o Éter\"" }],
          [{ text: "1", bold: true, center: true }, { text: "Primaz" }, { text: "PRIMAZ", bold: true }, { text: "\"O Primeiro Entre Iguais\"" }],
          [{ text: "2", bold: true, center: true }, { text: "Conselheiro" }, { text: "CONSELHEIRO", bold: true }, { text: "\"Aquele que Ilumina Caminhos\"" }],
          [{ text: "3", bold: true, center: true }, { text: "Mestre" }, { text: "MESTRE", bold: true }, { text: "\"Aquele que Transforma Outros\"" }],
          [{ text: "4", bold: true, center: true }, { text: "Cidadão" }, { text: "CIDADÃO", bold: true }, { text: "\"Aquele que Contribui\"" }],
          [{ text: "5", bold: true, center: true }, { text: "Desperto" }, { text: "DESPERTO", bold: true }, { text: "\"Aquele que Serve sem Aethra\"" }]
        ],
        [1000, 2000, 2000, 4360]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela: Os Títulos Sagrados dos Seis Círculos", italics: true, size: 16, color: colors.accent })] }),
      
      // TÍTULOS MILITARES
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Títulos da Guarda Primazial")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A estrutura militar de Aetherion também possuía títulos místicos que refletiam a filosofia de defesa sobre conquista. Cada título carregava o peso de séculos de tradição e a expectativa de comportamento exemplar."),
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("General Primaz — ESCUDO PRIMORDIAL")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O título Escudo Primordial era reservado exclusivamente para Yggoraty. Indicava não apenas liderança militar, mas a responsabilidade de ser a primeira linha de defesa de toda a civilização. Um Escudo Primordial era esperado que morresse antes de permitir que qualquer mal atingisse aqueles sob sua proteção. Yggoraty personificou este título até o fim."),
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Legionário — COLUNA VIVA")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Cada soldado da Guarda Primazial era chamado de Coluna Viva — indicando que, individualmente, eram estruturas que sustentavam a proteção de Aetherion. Uma coluna não falha; se falhar, a estrutura desaba. Este título lembrava a cada soldado que sua integridade era essencial."),
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Legião — MURALHA DE ALMAS")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("As quatro legiões eram coletivamente chamadas de Muralha de Almas — não uma barreira de pedra, mas de consciências dedicadas. A Primeira Legião era a Muralha Norte, a Segunda era a Muralha Sul, etc. Juntas, formavam uma proteção completa que cercava Aetherion."),
      ]}),
      
      // TABELA MILITAR
      simpleTable(
        ["Função", "Título Místico", "Significado"],
        [
          [{ text: "Comandante Supremo", bold: true }, { text: "Escudo Primordial", bold: true }, { text: "Primeira linha de defesa de toda civilização" }],
          [{ text: "Comandante de Legião", bold: true }, { text: "Pilar da Muralha", bold: true }, { text: "Um dos quatro pontos cardeais da proteção" }],
          [{ text: "Oficial", bold: true }, { text: "Vigia Eterno", bold: true }, { text: "Olhos que nunca fecham" }],
          [{ text: "Soldado", bold: true }, { text: "Coluna Viva", bold: true }, { text: "Estrutura que não falha" }],
          [{ text: "Curandeiro Militar", bold: true }, { text: "Sopro da Vida", bold: true }, { text: "Aquele que devolve o que foi perdido" }]
        ],
        [2500, 2500, 4360]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela: Títulos Místicos da Guarda Primazial", italics: true, size: 16, color: colors.accent })] }),
      
      // OBSERVAÇÃO FINAL
      new Paragraph({ spacing: { before: 300, after: 200 }, children: [
        new TextRun({ text: "Nota sobre Sobrevivência: ", bold: true }),
        new TextRun("A maioria dos títulos místicos foi perdida após a queda de Aetherion. Na era de Grazielly, apenas fragmentos sobrevivem: \"Mestre\" ainda é usado, mas sem o significado original de transformação. \"Cidadão\" tornou-se um termo administrativo genérico. \"Desperto\" foi esquecido — os Silentis da era atual não têm título honorífico, apenas a designação clínica de sua condição. Alguns títulos podem ser redescobertos através dos Cristais de Memória preservados."),
      ]}),
      
      // FOOTER
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })] }),
      new Paragraph({ style: "Quote", children: [new TextRun("\"Do Éter viemos, ao Éter retornaremos.\"")] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Glossario_Oficial_v5_Reinos_Hierarquias.docx", buffer);
  console.log("Glossário v5 - Reinos e Hierarquias Místicos salvo!");
});
