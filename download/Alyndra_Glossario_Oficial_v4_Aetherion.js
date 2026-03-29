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
  aetherion: "1E3A5F"
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: colors.accent };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };

// Helper function for creating tables
function createTable(headers, rows, columnWidths) {
  const tableRows = [
    new TableRow({
      tableHeader: true,
      children: headers.map((h, i) => new TableCell({
        borders: cellBorders,
        shading: { fill: colors.tableBg, type: ShadingType.CLEAR },
        verticalAlign: VerticalAlign.CENTER,
        width: { size: columnWidths[i], type: WidthType.DXA },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, size: 18 })] })]
      }))
    }),
    ...rows.map(row => new TableRow({
      children: row.map((cell, i) => new TableCell({
        borders: cellBorders,
        verticalAlign: VerticalAlign.CENTER,
        width: { size: columnWidths[i], type: WidthType.DXA },
        shading: cell.shading ? { fill: cell.shading, type: ShadingType.CLEAR } : undefined,
        children: [new Paragraph({ 
          alignment: cell.center ? AlignmentType.CENTER : AlignmentType.LEFT,
          children: [new TextRun({ text: cell.text, bold: cell.bold, size: 18, color: cell.color })] 
        })]
      }))
    }))
  ];
  return new Table({ columnWidths, rows: tableRows });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: colors.body, font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
      { id: "Quote", name: "Quote", basedOn: "Normal",
        run: { size: 22, italics: true, color: colors.secondary },
        paragraph: { spacing: { before: 200, after: 200 }, alignment: AlignmentType.CENTER } }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: {
      default: new Header({ children: [new Paragraph({ 
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "ALYNDRA — Glossário Oficial v4.0", italics: true, color: colors.accent, size: 18 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "— ", color: colors.accent }), new TextRun({ children: [PageNumber.CURRENT], color: colors.accent }), new TextRun({ text: " —", color: colors.accent })]
      })] })
    },
    children: [
      // =============================================
      // CAPA
      // =============================================
      new Paragraph({ spacing: { before: 2400 }, children: [] }),
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("ALYNDRA")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: "Glossário Oficial do Universo", size: 32, color: colors.secondary })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: "Definições, Terminologia e Conceitos Fundamentais", size: 22, italics: true, color: colors.secondary })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: "Documento de Referência — Versão 4.0", size: 20, color: colors.accent })] }),
      new Paragraph({ style: "Quote", spacing: { before: 800 }, children: [new TextRun("\"Conhecer o nome é o primeiro passo para conhecer a essência.\"")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // =============================================
      // AETHERION - A CIVILIZAÇÃO PRIMORDIAL
      // =============================================
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("AETHERION")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Definição Fundamental")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Aetherion foi a civilização primordial que existiu milhões de anos antes da era atual, governada por Alyndra e fundamentada na compreensão profunda do Aethra e da estrutura do universo. Seu nome significa \"Aqueles que Ouvem o Éter\", uma referência à capacidade inata de seus cidadãos de perceber e manipular o Aethra que flui através de todas as coisas. No auge de seu poder, Aetherion abrangia aproximadamente 2.847 mundos habitados, com uma população total estimada em 340 bilhões de indivíduos, alcançando o Nível 2 na Escala Kardashev — conseguindo harnessar toda a energia produzida por sua estrela através de uma Esfera Dyson parcial.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A civilização Aetherion não era apenas tecnologicamente avançada — era espiritualmente evoluída. A distinção entre tecnologia e espiritualidade era ausente; ambos eram manifestações diferentes do mesmo princípio fundamental: a manipulação consciente da realidade. Esta integração permitiu criações que desafiavam a compreensão convencional de física, incluindo cidades flutuantes sustentadas por Aethra cristalizado, portais dimensionais para viagem instantânea entre mundos, e até mentes artificiais conscientes alimentadas por energia espiritual.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Filosofia Fundadora")] }),
      new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "\"Do Éter viemos, ao Éter retornaremos, e pelo Éter evoluímos.\"", italics: true, size: 24, bold: true, color: colors.aetherion })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O princípio supremo da civilização Aetherion era que o poder espiritual (Aethra) é um "),
        new TextRun({ text: "DOM", bold: true }),
        new TextRun(", não um direito. Esta filosofia criou uma sociedade onde o poder era visto como responsabilidade sagrada, não como privilégio. Quem mais possui Aethra, mais deve servir à coletividade. A ascensão social não era determinada por riqueza ou nascimento, mas por mérito espiritual comprovado e serviço à comunidade. Este sistema meritocrático evitou as armadilhas de aristocracias tradicionais, garantindo que posições de poder fossem ocupadas por aqueles genuinamente comprometidos com o bem comum.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Estrutura Social — Os Seis Círculos")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A sociedade Aetherion era organizada em Círculos Concêntricos — quanto mais próximo do centro, maior o poder espiritual e a responsabilidade. Este sistema não era rígido; um indivíduo podia ascender ou descender entre os círculos baseado em mérito e desenvolvimento espiritual demonstrado ao longo de sua vida. A mobilidade social era um direito fundamental, e casos de ascensão dramática eram celebrados como exemplos do sistema funcionando corretamente.")
      ]}),
      
      createTable(
        ["Círculo", "Nome", "Quantia", "Requisito", "Função"],
        [
          [{ text: "0", bold: true, center: true }, { text: "Aetheris Supremo" }, { text: "1", center: true }, { text: "Consumo do Fruto" }, { text: "Conexão cósmica, decisões finais" }],
          [{ text: "1", bold: true, center: true }, { text: "Primaz" }, { text: "1", center: true }, { text: "Aethra transcendente" }, { text: "Defesa, justiça militar" }],
          [{ text: "2", bold: true, center: true }, { text: "Conselheiros" }, { text: "12", center: true }, { text: "Aethra avançado + mérito" }, { text: "Governo regional, políticas" }],
          [{ text: "3", bold: true, center: true }, { text: "Mestres" }, { text: "~200", center: true }, { text: "Aethra médio + estudo" }, { text: "Ensino, pesquisa, preservação" }],
          [{ text: "4", bold: true, center: true }, { text: "Cidadãos" }, { text: "Milhões", center: true }, { text: "Aethra básico" }, { text: "Trabalho, arte, comércio" }],
          [{ text: "5", bold: true, center: true }, { text: "Despertos" }, { text: "Minoritários", center: true }, { text: "Sem Aethra" }, { text: "Serviços técnicos, suporte" }]
        ],
        [1200, 2000, 1200, 2200, 2760]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 1: Os Seis Círculos da Sociedade Aetherion", italics: true, size: 16, color: colors.accent })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Os Despertos (Círculo 5)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Os Despertos representavam uma categoria única: indivíduos nascidos sem Aethra ativo — equivalentes aos Silentis da era atual, mas com uma diferença crucial. Em Aetherion, os Despertos não eram marginalizados; eram valorizados por suas habilidades únicas em tecnologias que não requeriam Aethra, como matemática pura, filosofia, e certas formas de arte. Muitos dos maiores avanços científicos de Aetherion vieram de Despertos que compensavam sua falta de poder espiritual com genialidade intelectual. Noah, da era de Grazielly, representa esta tradição — um Silentis cuja genialidade criou tecnologia que rivalizava com poderes espirituais.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Sistema Político — A Trilogia do Poder")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O sistema político Aetherion era uma sofisticada separação de poderes, inspirada na compreensão de que o poder espiritual não deve se concentrar em uma única instituição. Esta estrutura tríplice garantia equilíbrio e prevenia a tirania que poderia surgir quando poder espiritual e político se fundiam.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Alto Conselho Aetheris (Legislativo)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O Alto Conselho Aetheris era composto pelos 12 Conselheiros do Círculo 2 mais o Líder Supremo. Suas funções incluíam estabelecer leis globais, definir políticas de longo prazo, aprovar orçamentos e declarações de guerra, e supervisionar os Doze Domínios. Cada Conselheiro representava um Domínio específico, mas suas decisões eram votadas democraticamente, com o Líder Supremo tendo voto de minerva em caso de empate.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Guarda Primazial (Executivo)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A Guarda Primazial, comandada pelo General Primaz (Yggoraty), era responsável pela execução das leis, defesa do planeta, expansão pacífica, e manutenção da ordem. Sua filosofia era expressa no lema: "),
        new TextRun({ text: "\"Somos ESCUDOS antes de ESPADAS\"", italics: true }),
        new TextRun(". A defesa era vista como nobre; a guerra, apenas como necessidade extrema. A Guarda Primazial era dividida em quatro legiões: Escudos de Éter (defesa planetária, 10.000 guardiões), Lâminas da Luz (exploração, 8.000 exploradores), Sussurros (inteligência, 1.000 agentes), e Curadores (suporte médico, 5.000 curadores).")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Tribunal dos Equilíbrios (Judiciário)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O Tribunal dos Equilíbrios era composto por 5 Juízes Supremos escolhidos entre os Mestres do Círculo 3 mais sábios e imparciais. Eram responsáveis por julgar disputas entre cidadãos, crimes contra a sociedade, violações da Lei da Pureza, e conflitos entre Domínios. O Tribunal também supervisionava as Cerimônias do Despertar e os processos de ascensão entre Círculos, garantindo que o sistema meritocrático funcionasse com integridade.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Os Doze Domínios")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Cada Conselheiro governava um Domínio (região do planeta), mas todos respondiam ao Alto Conselho. A divisão era funcional, baseada nas características geográficas de cada região e nas especialidades que desenvolveram ao longo de milênios. Os nomes destes Domínios ecoaram através das eras, alguns sobrevivendo como nomes de cidades na era de Grazielly.")
      ]}),
      
      createTable(
        ["Domínio", "Especialidade", "Terreno", "Características"],
        [
          [{ text: "Aetheris Central", bold: true }, { text: "Governo" }, { text: "Cidade flutuante" }, { text: "Centro político e espiritual, capital" }],
          [{ text: "Tempestra", bold: true }, { text: "Pesquisa cósmica" }, { text: "Ilhas tempestuosas" }, { text: "Estudos dimensionais, portal experimental" }],
          [{ text: "Veridion", bold: true }, { text: "Agricultura Aetheris" }, { text: "Florestas vivas" }, { text: "Cultivo espiritual de plantas" }],
          [{ text: "Cryonar", bold: true }, { text: "Preservação" }, { text: "Glaciares eternos" }, { text: "Arquivos históricos, criogenia" }],
          [{ text: "Pyralis", bold: true }, { text: "Forja e indústria" }, { text: "Vulcanismo ativo" }, { text: "Tecnologia Aetheris, armas" }],
          [{ text: "Aquarys", bold: true }, { text: "Medicina e cura" }, { text: "Arquipélago oceânico" }, { text: "Centros de cura avançada" }],
          [{ text: "Aeros", bold: true }, { text: "Navegação aérea" }, { text: "Montanhas flutuantes" }, { text: "Transporte, portais" }],
          [{ text: "Terrax", bold: true }, { text: "Mineração" }, { text: "Planícies rochosas" }, { text: "Infraestrutura, construção" }],
          [{ text: "Luminar", bold: true }, { text: "Estudos do Éter" }, { text: "Deserto cristalino" }, { text: "Pesquisa espiritual pura" }],
          [{ text: "Umbral", bold: true }, { text: "Defesa e fronteiras" }, { text: "Pântanos sombrios" }, { text: "Proteção, inteligência" }],
          [{ text: "Chronis", bold: true }, { text: "História e memória" }, { text: "Cavernas ancestrais" }, { text: "Preservação do conhecimento" }],
          [{ text: "Vitalis", bold: true }, { text: "Nascimento e vida" }, { text: "Vales férteis" }, { text: "População, educação inicial" }]
        ],
        [2000, 1800, 1800, 3760]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 2: Os Doze Domínios de Aetherion", italics: true, size: 16, color: colors.accent })] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Sistema Educacional — A Ascensão")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("O sistema educacional Aetherion era revolucionário: todas as crianças passavam pelo mesmo processo inicial, independente de sua linhagem ou potencial. A avaliação só ocorria aos 10 anos, durante a Cerimônia do Despertar. Este sistema garantia que oportunidades fossem verdadeiramente iguais nos primeiros anos de vida, evitando que famílias poderosas manipulassem o sistema em benefício de seus herdeiros.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Casa da Semente (0-10 anos)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Todas as crianças eram criadas coletivamente nas Casas da Semente, instituições que forneciam cuidados básicos, primeiro contato com Aethra, e educação fundamental igualitária. Não havia avaliação de poder durante este período — a filosofia era que cada criança deveria desenvolver-se sem pressão ou expectativas impostas. Pais visitavam regularmente e mantinham vínculos emocionais, mas a educação era da comunidade, evitando nepotismo.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Cerimônia do Despertar (10 anos)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Aos 10 anos, cada criança passava pela Cerimônia do Despertar, onde seu Aethra se manifestava pela primeira vez. A avaliação determinava o potencial futuro e a distribuição para um dos três caminhos educacionais. A cerimônia era pública e celebrada pela comunidade, marcando a transição da infância para o início da jornada adulta.")
      ]}),
      
      createTable(
        ["Caminho", "Idade", "Aethra", "Destino"],
        [
          [{ text: "Academia Aetheris", bold: true }, { text: "10-25 anos", center: true }, { text: "Forte", center: true }, { text: "Mestres, pesquisa, governo" }],
          [{ text: "Instituto Medial", bold: true }, { text: "10-20 anos", center: true }, { text: "Médio", center: true }, { text: "Serviço, comércio, arte" }],
          [{ text: "Oficina Técnica", bold: true }, { text: "10-18 anos", center: true }, { text: "Baixo/Nenhum", center: true }, { text: "Ofícios, suporte, técnicos" }]
        ],
        [2500, 1500, 1500, 3860]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 3: Os Três Caminhos Educacionais", italics: true, size: 16, color: colors.accent })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Sistema Monetário — Crédito Aetheris")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Os Aetherion não usavam moedas físicas. Sua economia era baseada em energia espiritual quantificada, um sistema sofisticado que eliminava a escassez artificial. O governo emitia Créditos baseados na produção de energia do planeta, e cada cidadão recebia uma \"cota de existência\" mensal — uma garantia de recursos básicos independente de sua função na sociedade. Transações eram feitas por transferência espiritual através do toque de mãos, eliminando a necessidade de moeda física.")
      ]}),
      
      createTable(
        ["Círculo", "Cota Mensal Base"],
        [
          [{ text: "0 (Supremo)", bold: true }, { text: "Ilimitado (responsabilidade ilimitada)" }],
          [{ text: "1 (Primaz)", bold: true }, { text: "50.000 CA/mês" }],
          [{ text: "2 (Conselheiros)", bold: true }, { text: "20.000 CA/mês" }],
          [{ text: "3 (Mestres)", bold: true }, { text: "10.000 CA/mês" }],
          [{ text: "4 (Cidadãos)", bold: true }, { text: "3.000 CA/mês" }],
          [{ text: "5 (Despertos)", bold: true }, { text: "1.500 CA/mês" }]
        ],
        [3000, 6360]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 4: Cotas Mensais por Círculo", italics: true, size: 16, color: colors.accent })] }),
      
      new Paragraph({ spacing: { before: 200, after: 200 }, children: [
        new TextRun({ text: "Valores de Referência: ", bold: true }),
        new TextRun("Refeição básica (5 CA), Aluguel mensal (500 CA), Arma simples (2.000 CA), Cristal de Aethra (10.000 CA), Cidadania plena (100.000 CA).")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Sistema Métrico de Aetherion")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Os Aetherion descobriram que todas as coisas têm uma \"frequência fundamental\" — uma vibração inerente ao tecido da realidade. Basearam seus sistemas de medida nesta descoberta, criando unidades que refletiam a estrutura profunda do universo. Este sistema métrico foi parcialmente preservado através das eras, embora seu significado original tenha sido esquecido.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Medidas de Tempo")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Unidade Base: O PULSO", bold: true }),
        new TextRun(" — A \"pulsação\" fundamental do universo (~1.6 segundos terrestres).")
      ]}),
      
      createTable(
        ["Unidade", "Duração", "Equivalência Terrestre"],
        [
          [{ text: "Pulso", bold: true }, { text: "~1.6 segundos", center: true }, { text: "Base de todas as medidas" }],
          [{ text: "Respiro", bold: true }, { text: "60 Pulsos", center: true }, { text: "~1.6 minutos" }],
          [{ text: "Ciclo", bold: true }, { text: "60 Respiros", center: true }, { text: "~1.6 horas" }],
          [{ text: "Dia", bold: true }, { text: "24 Ciclos", center: true }, { text: "~38.4 horas" }],
          [{ text: "Mês", bold: true }, { text: "30 Dias", center: true }, { text: "~48 dias terrestres" }],
          [{ text: "Ano", bold: true }, { text: "10 Meses", center: true }, { text: "~480 dias terrestres" }],
          [{ text: "Era", bold: true }, { text: "1.000 Anos", center: true }, { text: "~1.320 anos terrestres" }],
          [{ text: "Eon", bold: true }, { text: "1.000.000 Anos", center: true }, { text: "Inimaginável" }]
        ],
        [2500, 2500, 4360]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 5: Sistema de Medidas de Tempo", italics: true, size: 16, color: colors.accent })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Medidas de Distância")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Unidade Base: O PASSO", bold: true }),
        new TextRun(" — Distância que a luz percorre em um Pulso (~1.5 metros).")
      ]}),
      
      createTable(
        ["Unidade", "Equivalência", "Uso Prático"],
        [
          [{ text: "Passo", bold: true }, { text: "~1.5 metros", center: true }, { text: "Distância básica" }],
          [{ text: "Corda", bold: true }, { text: "100 Passos (~150m)", center: true }, { text: "Distâncias curtas" }],
          [{ text: "Légua", bold: true }, { text: "100 Cordas (~15km)", center: true }, { text: "Distâncias regionais" }],
          [{ text: "Jornada", bold: true }, { text: "10 Léguas (~150km)", center: true }, { text: "Viagem de um dia" }],
          [{ text: "Reino", bold: true }, { text: "100 Jornadas (~15.000km)", center: true }, { text: "Escala continental" }]
        ],
        [2500, 3000, 3860]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 6: Sistema de Medidas de Distância", italics: true, size: 16, color: colors.accent })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Medidas de Peso/Massa")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun({ text: "Unidade Base: A SEMENTE", bold: true }),
        new TextRun(" — Peso de uma semente de Aetherion padrão (~1 grama).")
      ]}),
      
      createTable(
        ["Unidade", "Equivalência", "Uso Prático"],
        [
          [{ text: "Semente", bold: true }, { text: "~1 grama", center: true }, { text: "Unidade básica" }],
          [{ text: "Mão", bold: true }, { text: "100 Sementes (~100g)", center: true }, { text: "Alimentos, ingredientes" }],
          [{ text: "Pedra", bold: true }, { text: "100 Mãos (~10kg)", center: true }, { text: "Cargas, materiais" }],
          [{ text: "Corpo", bold: true }, { text: "10 Pedras (~100kg)", center: true }, { text: "Peso de um adulto" }],
          [{ text: "Carga", bold: true }, { text: "10 Corpos (~1 tonelada)", center: true }, { text: "Cargas grandes, navios" }]
        ],
        [2500, 3000, 3860]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 7: Sistema de Medidas de Peso", italics: true, size: 16, color: colors.accent })] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Tecnologia Aetheris")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A tecnologia Aetheris representava a síntese perfeita entre ciência e espiritualidade. Não era baseada em eletricidade ou combustíveis, mas em Aethra cristalizado e manipulado através de técnicas avançadas. Os Aetheri desenvolveram tecnologias que desafiavam a compreensão convencional de física, incluindo:")
      ]}),
      
      createTable(
        ["Tecnologia", "Função", "Status Atual"],
        [
          [{ text: "Cidades Flutuantes", bold: true }, { text: "Metrópoles suspensas por Aethra cristalizado" }, { text: "Caíram, ruínas" }],
          [{ text: "Portais Dimensionais", bold: true }, { text: "Teletransporte instantâneo entre mundos" }, { text: "Destruídos" }],
          [{ text: "Mentes Artificiais", bold: true }, { text: "IAs conscientes alimentadas por Aethra" }, { text: "Extintas" }],
          [{ text: "Cura Instantânea", bold: true }, { text: "Regeneração completa de tecidos" }, { text: "Perdida" }],
          [{ text: "Armaduras Vivas", bold: true }, { text: "Proteção metamórfica que responde ao usuário" }, { text: "Apenas a Suprema" }],
          [{ text: "Naves Etéreas", bold: true }, { text: "Viagem espacial interestelar" }, { text: "Destruídas" }],
          [{ text: "Cristais de Memória", bold: true }, { text: "Armazenamento de conhecimento e memórias" }, { text: "Raros, preservados" }],
          [{ text: "Micro Aethrites", bold: true }, { text: "Partículas microscópicas de Aethra cristalizado" }, { text: "Transmitidos via DNA" }]
        ],
        [2500, 4000, 2860]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 8: Tecnologias Aetheris Principais", italics: true, size: 16, color: colors.accent })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Cristais de Memória")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Os Cristais de Memória eram uma das tecnologias mais importantes de Aetherion. Permitiam armazenar conhecimento, habilidades, e até memórias pessoais em estruturas cristalinas que podiam durar milênios. Estes cristais foram parcialmente preservados através das eras e formam a base do conhecimento fragmentado que sobreviveu na Biblioteca da Ordem. Alguns cristais contêm vislumbres da verdadeira história de Aetherion, aguardando aqueles com Aethra suficiente para decifrá-los.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Micro Aethrites")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Os Micro Aethrites são partículas microscópicas de Aethra cristalizado criadas pela tecnologia Aetheri. Sincronizam-se com o Aethra do usuário, permitindo armazenamento de Æ excedente, regeneração acelerada de tecidos, preservação de memórias, e amplificação de técnicas espirituais. "),
        new TextRun({ text: "Limitação Crítica: ", bold: true }),
        new TextRun("Os Micro Aethrites são parasitários por natureza — não podem ser removidos de um hospedeiro vivo sem causar fatalidade. Podem ser transmitidos através do DNA biológico, como ocorreu entre Alyndra, Grazielly e Iris, criando linhagens geneticamente enriquecidas.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Estrutura Familiar e Cultura")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A família Aetherion era baseada no conceito de "),
        new TextRun({ text: "Lar-Éter", bold: true }),
        new TextRun(", uma unidade que podia ter de 2 a 4 adultos. A poliamoria era aceita e não existiam tabus de gênero. O casamento (União de Essências) era uma cerimônia espiritual que vinculava as auras dos participantes, podendo ser dissolvida por mútuo acordo. A herança podia ser matrilineal ou patrilineal (escolha do casal), e títulos passavam para o filho/a com maior Aethra — se nenhum filho tinha Aethra, passava para sobrinho/a, garantindo mérito sobre sangue.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Artes Aetherion")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A arte Aetherion não era meramente decorativa — era funcional. O "),
        new TextRun({ text: "Canto Etéreo", bold: true }),
        new TextRun(" era música que manipulava Aethra, podendo curar ou ferir. A "),
        new TextRun({ text: "Escultura Viva", bold: true }),
        new TextRun(" criava estátuas que se moviam, servindo como guardiões de portais. A "),
        new TextRun({ text: "Pintura Dimensional", bold: true }),
        new TextRun(" produzia arte que existia em três dimensões, retratos que \"respiravam\". A "),
        new TextRun({ text: "Dança das Estações", bold: true }),
        new TextRun(" era uma performance coletiva que celebrava os ciclos planetários. E a "),
        new TextRun({ text: "Poesia Verdade", bold: true }),
        new TextRun(" consistia em versos que se tornavam reais quando recitados por mestres, usados em rituais importantes.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Rituais e Tradições")] }),
      
      createTable(
        ["Ritual", "Ocorrência", "Descrição"],
        [
          [{ text: "Cerimônia do Despertar", bold: true }, { text: "Aos 10 anos" }, { text: "Primeira manifestação de Aethra, determina caminho educacional" }],
          [{ text: "Juramento de Círculo", bold: true }, { text: "Ascensão social" }, { text: "Promessa de serviço ao entrar em novo Círculo" }],
          [{ text: "Festival do Equilíbrio", bold: true }, { text: "Anual (solstício)" }, { text: "Celebração da harmonia cósmica, maior festa do ano" }],
          [{ text: "Rito de Passagem", bold: true }, { text: "Na morte" }, { text: "Preparação para o Julgamento da Pureza" }],
          [{ text: "Consagração de Líder", bold: true }, { text: "Novo Líder" }, { text: "Conexão com a Árvore da Existência" }]
        ],
        [2500, 2000, 4860]
      ),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Tabela 9: Principais Rituais Aetherion", italics: true, size: 16, color: colors.accent })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("A Queda de Aetherion")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("A civilização Aetherion caiu quando os Nihilaryth — os Primordiais Corruptos que haviam sido rejeitados pelo Vazio e pelo universo — conseguiram atravessar uma brecha dimensional criada pelo Portal Quântico experimental de Tempestra. A corrupção se espalhou silenciosamente, com líderes tomando decisões que pareciam racionais mas serviam aos interesses dos Nihilaryth. Quando Alyndra percebeu a extensão da contaminação, era tarde demais para salvar a civilização.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Alyndra tomou a decisão que definiria todo o futuro: usar seu poder do Fruto para dilatar os Nihilaryth pelo universo, espalhando suas essências por distâncias tão vastas que levaria eons para se recompor. Antes de seu sacrifício final, ela extraiu a essência espiritual de Aetherion, condensando-a em sementes que seriam dispersadas pelo universo. Gravou as Leis da Pureza nestas sementes, garantindo que o conhecimento da transcendência sobrevivesse. Preparou sua irmã secreta Yggoraty para proteger a semente mais importante — aquela que daria origem a Yggorath.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Legado de Aetherion")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Apesar de sua destruição, o legado de Aetherion permeia toda a existência atual. Os nomes dos Doze Domínios sobrevivem como nomes de cidades na era de Grazielly. O sistema de elementos derivou da tecnologia Aetheris original. A Armadura Suprema, criada por Alyndra, continua a influenciar o destino do universo. Os Micro Aethrites transmitidos através do DNA criaram linhagens geneticamente enriquecidas. E as sementes dispersadas por Alyndra continham não apenas as Leis da Pureza, mas fragmentos do conhecimento Aetherion que podem ser redescobertos por aqueles dignos de compreendê-los.")
      ]}),
      
      // FOOTER
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 }, children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: colors.accent })] }),
      new Paragraph({ style: "Quote", children: [new TextRun("\"Do Éter viemos, ao Éter retornaremos.\"")] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Alyndra_Glossario_Oficial_v4_Aetherion.docx", buffer);
  console.log("Glossário v4 - AETHERION salvo em: /home/z/my-project/download/Alyndra_Glossario_Oficial_v4_Aetherion.docx");
});
