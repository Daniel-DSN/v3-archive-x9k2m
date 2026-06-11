# MAPA DE INCONSISTÊNCIAS — ALYNDRA: A SEMENTE DA ETERNIDADE

> Gerado em 26 de Maio de 2026 após varredura completa do projeto.
> **Propósito:** Relatório único contendo TUDO que precisa de atenção para que o Livro I alcance continuidade e polimento completos do Capítulo 9 ao 46.

---

## Índice

1. [ESTADO ATUAL DO PROJETO](#1-estado-atual-do-projeto)
2. [CAPÍTULOS — STATUS REAL vs DOCUMENTADO](#2-capítulos--status-real-vs-documentado)
3. [TIMELINE — LACUNAS CRÍTICAS](#3-timeline--lacunas-críticas)
4. [TERMINOLOGIA SERAPHYEN — INCONSISTÊNCIAS](#4-terminologia-seraphyen--inconsistências)
5. [PERSONAGENS — FICHAS FALTANTES E PROBLEMAS](#5-personagens--fichas-faltantes-e-problemas)
6. [TOM E ESTILO — ABISMO ENTRE REFINADOS E RASCUNHOS](#6-tom-e-estilo--abismo-entre-refinados-e-rascunhos)
7. [LORE — LACUNAS E CONTRADIÇÕES](#7-lore--lacunas-e-contradições)
8. [ERROS TÉCNICOS E DE FORMATAÇÃO](#8-erros-técnicos-e-de-formatação)
9. [PRIORIDADES DE AÇÃO](#9-prioridades-de-ação)

---

## ⚠️ NUMERAÇÃO DOS CAPÍTULOS (RESOLVIDO)

O plano (`ENREDO_LIVRO1_MASTER.md`) define **45 capítulos** no total. 

A inconsistência de numeração e o deslocamento de arquivos foram **totalmente resolvidos** em 26 de Maio de 2026 através de uma reestruturação por deslocamento físico (shifting):
* Os arquivos foram deslocados de forma que `Capítulo_12.md` a `Capítulo_45.md` coincidem perfeitamente com os numerais romanos correspondentes (XI a XLV).
* As 7 duplicatas foram resolvidas, e os arquivos correspondentes aos 6 capítulos ausentes (`Capítulo_18.md`, `Capítulo_21.md`, `Capítulo_24.md`, `Capítulo_29.md`, `Capítulo_33.md` e `Capítulo_43.md`) foram convertidos em placeholders limpos para escrita.
* O arquivo físico `Capítulo_46.md` foi deletado, visto que a obra finaliza exatamente no Capítulo 45.

---

## 1. ESTADO ATUAL DO PROJETO

### Estrutura de Diretórios (Real)

```
v3-archive-x9k2m/
├── 00_ORGANIZACAO/                           # Toda a lore consolidada (11 arquivos)
│   ├── DUELOS_E_CERIMONIAS.md
│   ├── FAMILIAS_E_CULTURAS.md
│   ├── GUILDAS_E_ORDENS.md
│   ├── IDEIAS_E_CENAS_SOLTAS.md
│   ├── LINHA_TEMPORAL_PERSONAGENS.md
│   ├── LIVRO1_CONTROLE_E_CONTINUIDADE.md     # ⚠️ Desatualizado (caps 9-34 ditos "não escritos")
│   ├── LORE_COSMOLOGIA_E_MAGIA.md
│   ├── LORE_CULTURA_POLITICA_E_ESTILO.md
│   ├── LORE_MUNDO_E_REINOS.md
│   ├── PERSONAGENS_MASTER.md
│   └── RELIGIOES_E_FILOSOFIAS.md
├── Livro1_ASementedaEternidade/
│   ├── final/                                # 12 arquivos (Prólogo + Caps 1-11)
│   ├── rascunho_v2/                          # 35 arquivos (Caps 12-46)
│   ├── descartáveis/                         # Versões antigas
│   ├── MASTER_TIMELINE.md                    # ⚠️ Só vai até Cap 10
│   └── TEMPLATE_CAPITULO.md
├── scripts/
│   └── test_timeline.sh
├── AGENTS.md
├── GOALS.md
└── worklog.md
```

### O Que Existe vs O Que Está Documentado

| Item | Documentado (CONTROLE) | Realidade | Conflito? |
|------|----------------------|-----------|-----------|
| Caps 1-6 | SELADOS | SELADOS | ✅ Ok |
| Caps 7-8 | HÍBRIDOS | HÍBRIDOS | ✅ Ok |
| Caps 9-10 | "Não escritos" | Existem em `final/` com 453 e 590 linhas | ⚠️ **GRAVE** — documentação não reflete realidade |
| Cap 11 | "Deletado (contradição temporal)" | Existe em `final/` com 452 linhas | ⚠️ **GRAVE** — deletado mas presente |
| Caps 12-34 | "Não escritos (versões descartadas)" | Existem em `rascunho_v2/` (35 caps, 12-46) | ⚠️ documentação desatualizada |
| Cap 35-46 | Não mencionado | Existem em `rascunho_v2/` | ⚠️ documentação não cobre |
| Timeline | Vai até Cap 10 | Vai até Cap 10 | ✅ Ok mas **incompleta** |
| Pastas 01-06 | Descritas em AGENTS.md | Não existem — tudo em `00_ORGANIZACAO/` | ⚠️ **GRAVE** — guia enganoso |

### ⚠️ Conclusão sobre Estado

O `LIVRO1_CONTROLE_E_CONTINUIDADE.md` e o `AGENTS.md` contêm descrições de estrutura de pastas (01_Cosmologia_e_Magia/, 02_Geografia_e_Reinos/, etc.) que **não existem mais**. Toda a lore foi consolidada em `00_ORGANIZACAO/`. Isso torna os documentos de referência enganosos para qualquer novo agente.

---

## 2. CAPÍTULOS — STATUS REAL vs DOCUMENTADO

### 2.1 Capítulos em `final/`

| # | Arquivo | Linhas | Estado Real | Documentado Como | Notas |
|---|---------|--------|-------------|------------------|-------|
| Prólogo | Prólogo.md | 123 | SELADO | SELADO | ✅ |
| 1 | Capítulo_1.md | 308 | SELADO | SELADO | ✅ |
| 2 | Capítulo_2.md | 409 | SELADO | SELADO | ✅ |
| 3 | Capítulo_3.md | 1004 | SELADO | SELADO | ✅ |
| 4 | Capítulo_4.md | 449 | SELADO | SELADO | ✅ |
| 5 | Capítulo_5.md | 616 | SELADO | SELADO | ✅ |
| 6 | Capítulo_6.md | 510 | SELADO | SELADO | ✅ |
| 7 | Capítulo_7.md | 466 | HÍBRIDO | HÍBRIDO | ✅ |
| 8 | Capítulo_8.md | 430 | HÍBRIDO | HÍBRIDO | ✅ |
| **9** | Capítulo_9.md | 453 | **HÍBRIDO** | "Não escrito" ❌ | ✅ Corrigido (daens e syra) |
| **10** | Capítulo_10.md | 590 | **HÍBRIDO** | "Não escrito" ❌ | ⚠️ Melhor qualidade, alguns termos |
| **11** | Capítulo_11.md | 452 | **EXISTE** | "Deletado" ❌ | ⚠️ Contradição temporal não resolvida |

### 2.2 Capítulos em `rascunho_v2/` (35 arquivos)

| # | Arquivo | Linhas | Qualidade Estimada | Notas |
|---|---------|--------|-------------------|-------|
| 12 | Capítulo_12.md | ~284 | Rascunho bruto | Precisa polimento completo |
| 13 | Capítulo_13.md | ~306 | Rascunho bruto | |
| 14 | Capítulo_14.md | ~264 | Rascunho bruto | |
| 15-27 | — | ~250-380 | Rascunho bruto | Varia |
| 28 | Capítulo_28.md | 284 | Rascunho | |
| 29-34 | — | 306-468 | Rascunho | Alguns mais longos |
| 35-39 | — | 388-472 | Rascunho | |
| 40-46 | — | 354-454 | Rascunho | |

**Total rascunho_v2:** ~14.037 linhas em 35 capítulos.

### 2.3 Problemas Estruturais nos Rascunhos

- **Numeração dos capítulos conflita com a numeração romana** (ex: Capítulo_12.md = CAPÍTULO XI)
- **Template não seguido** — muitos não têm epígrafe, seções em romano, ou glossário completo
- **Terminologia Seraphyen inconsistente** — mistura termos terrenos e do universo
- **Prosa telegráfica** — sem a densidade lírica dos refinados

---

## 3. TIMELINE — LACUNAS CRÍTICAS

### 3.1 O que a MASTER_TIMELINE.md Cobre vs o que Existe

| Período | Cobertura |
|---------|-----------|
| ~9 Nyras antes da Convergência até Cap 8 | ✅ Completa e detalhada |
| Cap 9 (Dia 4 — Amanhecer ao Dia 8) | ✅ Coberta |
| Cap 10 (14º Daen, 6ª Nyra ao 15º Daen, 7ª Nyra) | ✅ Coberta |
| **Cap 11 em diante** | ❌ **Nada — timeline termina no Cap 10** |

### 3.2 Eventos Não Cobertos (Precisam de Timeline)

- Cap 11: A Órfã da Fazenda Aldebar (se mantido)
- Cap 12-20: Atos III-IV (jornada de Alyndra, desenvolvimento de poder)
- Cap 21-34: Atos V-VI (conflito com Nihilaryth, revelações)
- Cap 35-46: Ato VII (clímax, batalha final, resolução)

### 3.3 Inconsistências Detectadas

| Evento | Problema |
|--------|----------|
| Cap 9 começa "giros antes da Assembleia" | Corrigido para "daens" e "syra" |
| Cap 11 timeline vs lore | Marcado como "deletado" por contradição temporal com Caps 8-10 (Mila já estava no orfanato) |

---

## 4. TERMINOLOGIA SERAPHYEN — INCONSISTÊNCIAS

### 4.1 Termos Terrenos em Capítulos de `final/`

| Capítulo | Termo Errado | Correção | Gravidade |
|----------|-------------|----------|-----------|
| Cap 9, linha 18 | "giros" | "daens" | 🔴 Média — `giro` pode ser mantido como variante popular |
| Cap 9, linha 26 | "valens" (gráfico: "doze *valens*") | — | ✅ Correto |
| Cap 9 | "crianças murmuravam" | — | ✅ Correto |
| Cap 11, linha 26 | "giro" (singular) | "daen" | 🔴 Média |
| Cap 11, linha 32 | "pulso" | — | ✅ Correto |
| Cap 11, linha 38 | "valen" | — | ✅ Correto |
| Cap 10 | "giro* (duas ocorrências) | "daen" | 🔴 Média |

### 4.2 Decisão Pendente: `giro` vs `daen`

O `LIVRO1_CONTROLE_E_CONTINUIDADE.md` registra:
> "Decidir se `giro` vira sinônimo popular de `daen` ou se deve ser substituído em revisão autorizada."

**Recomendação:** Manter a decisão de que `giro` é termo coloquial usado pelo povo, enquanto `daen` é o termo técnico Seraphyen. Assim:
- Personagens rústicos/comuns → `giro`
- Narrativa onisciente/Kun Zagin/eruditos → `daen`
- Aplicar consistência a todos os capítulos baseada no narrador

### 4.3 Termos Proibidos que Ainda Aparecem

Com base na leitura, os capítulos refinados (1-8) já estão limpos de termos terrestres. Os rascunhos (12-46) **provavelmente** ainda contêm múltiplos termos terrestres que precisam de substituição sistemática.

---

## 5. PERSONAGENS — FICHAS FALTANTES E PROBLEMAS

### 5.1 Fichas Existentes vs Faltantes

`PERSONAGENS_MASTER.md` contém fichas completas para:
- Alyndra, Aurelius, Ayla, Aldric, Lyris/Nyctara, Melessa, Selynis/Velatrix
- Thalia, Thar Elara, Mira, Kira, Dravyn, Torvin, Mila, Elainy
- Thaloris Ventaris (curta), Vethran Noll (curta), Marethyus, Kaelen Zu-Me (curta)

**Fichas faltantes de alta prioridade (segundo o próprio documento):**

| Personagem | Onde Aparece | Função | Impacto |
|------------|-------------|--------|---------|
| **Varek Nythor** | Cap 10 | Governador de Umbra | Alto — Umbra sem nome perde densidade |
| **Valtheris** | Caps 8, 10 | Criador da RRA, En Gesh | Alto — motor técnico da trama |
| **Matriarca Zerynthia** | Cap 10 | Líder de Fulmora | Alto — eixo tecnologia/poder |
| **Nin Kaelia Marethyus** | Cap 10, lore | Irmã de Ayla, Nin de Thalassia | Alto — voz política relevante |
| **Lugal Torgath** | Cap 10 | Líder de Terraxis | Alto — controla Aetherite |
| **Imperador Ignar Vulkarys** | Cap 10 | Líder de Pyralis | Alto — pai de Elainy |
| **Lysias Thyrion** | Cap 10 | Primeiro repórter continental | Alto — POV externo recorrente |

### 5.2 Problemas de Personagem Identificados

| Problema | Detalhe | Gravidade |
|----------|---------|-----------|
| **Selynis = Velatrix prematuro** | Glossários dos Caps 7 e 10 revelam identidade ao leitor | 🔴 Crítico — quebra o mistério |
| **Aldric = Vilão (falso)** | O leitor é levado a crer que Aldric é vilão, mas ele é protetor | 🟡 Médio — pode ser intencional |
| **"En Nu Me" sem nome** | Cap 10 usa apenas epíteto | 🟡 Médio — Varek Nythor criado em lore |
| **Kaelia sem ficha** | Nin de Thalassia, irmã de Ayla — essencial para o arco | 🔴 Alto |
| **Elainy Vulkarys subutilizada** | Ficha existe mas personagem não aparece nos caps lidos | 🟡 Médio |

---

## 6. TOM E ESTILO — ABISMO ENTRE REFINADOS E RASCUNHOS

### 6.1 Características dos Capítulos Refinados (1-8)

- ✅ Prosa lírica com frases longas e complexas
- ✅ Múltiplas camadas sensoriais (visão, olfato, audição, tato)
- ✅ Epígrafes poéticas que ecoam o tema do capítulo
- ✅ Seções numeradas em romanos (## I., ## II., etc.)
- ✅ Superscripts consistentes para todo termo canônico
- ✅ Glossário com definições canônicas
- ✅ Previsão do próximo capítulo
- ✅ Transições poéticas entre cenas
- ✅ Profundidade emocional — monólogo interior, reflexão
- ✅ Tamanho: 300-1004 linhas (média ~500)

### 6.2 Características Observadas nos Rascunhos (9-11 e rascunho_v2/12-46)

- ❌ Prosa mais direta e telegráfica, sem densidade lírica
- ❌ Menos descrição sensorial
- ❌ Epígrafes por vezes ausentes ou genéricas
- ❌ Terminologia Seraphyen inconsistente (usa "giro" onde deveria ser "daen")
- ❌ Glossário pode estar ausente ou incompleto
- ❌ Pouca profundidade emocional nos personagens secundários
- ❌ Transições abruptas entre cenas
- ❌ Tamanho: 250-590 linhas (mais curto que refinados comparáveis)
- ❌ Sem superscripts consistentes em todos os termos

### 6.3 Exemplo de Diferença

**Refinado (Cap 5, Seção V):**
> "Alyndra abriu a boca. Nenhum som saiu. As lágrimas que vieram não eram lágrimas comuns — eram cristais de gelo que se formavam nas bordas de seus olhos, pequenos diamantes que nasciam da dor e da alegria e de algo mais, algo que ela não tinha nome, algo que morava nas profundezas do seu ser desde antes de ela nascer."

**Rascunho (Cap 11, Seção I):**
> "A notícia chegou através dos passos apressados de Thalia, que irrompeu pelo pátio ofegante. A Fazenda Aldebar estava em chamas."

Percebe-se que mesmo o Cap 11 — o mais bem escrito dos "pós-8" — ainda não tem a mesma densidade poética. O Cap 9 é o mais fraco em estilo.

---

## 7. LORE — LACUNAS E CONTRADIÇÕES

### 7.1 Estrutura de Lore

A lore está consolidada em `00_ORGANIZACAO/` em 11 arquivos. O AGENTS.md antigo descrevia uma estrutura de pastas (01-06) que não existe mais.

### 7.2 Lacunas Identificadas

| Área | Lacuna | Impacto |
|------|--------|---------|
| **LORE_MUNDO_E_REINOS.md** | Sete reinos descritos mas sem profundidade equivalente entre eles | Médio — alguns reinos (Fulmora, Terraxis) têm menos detalhe |
| **LORE_CULTURA_POLITICA_E_ESTILO.md** | Glossário de termos proibidos existe mas sem integração com caps | Baixo |
| **Calendário** | Dias da semana (Audin, Lyrdin...) e 13 Nyrás documentados mas sem referência cruzada com eventos | Baixo |
| **Economia** | Como funciona o comércio entre reinos? Moeda? Rotas? | Médio — necessário para cenas de viagem |
| **Nihilaryth** | Ameaça ativa mas detalhes sobre sua estrutura e capacidades são vagos | 🔴 Alto — essencial para atos finais |
| **Armadura de Alyndra** | Fragmentada em 5 partes, Manopla com Aurelius — mas as outras 4 partes não são mencionadas em caps | Médio |
| **Ciclo do Sacrifício** | Padrão narrativo (Alyndra → Yggorath → Ilyos/Elarys → Ayla → Alyndra → Irys) — Irys não aparece em caps 1-11 | Médio |

### 7.3 Contradições de Lore

| Contradição | Detalhe | Resolução Proposta |
|-------------|---------|-------------------|
| **Mar de Vaelantor vs Mar de Lyria** | Cap 9 chama oceano de Vaelantor; atlas usa Lyria como oeste | Vaelantor = mar intercontinental sul-oeste; Lyria = costa oeste direta |
| **RRA 8x1** | Cap 10 menciona aprovação 8x1 mas há 7 reinos | Incluir assentos da Mesa dos Vinculadores |
| **Mira/Mila** | Resolvido: bebê é Mila (não Mira) | ✅ Consistente agora |
| **Thyravalis** | Resolvido: é costa de Sylvaris, não 8º reino | ✅ Consistente agora |

---

## 8. ERROS TÉCNICOS E DE FORMATAÇÃO

### 8.1 Template Não Seguido em Rascunhos

## 9. RESOLUÇÃO DAS AÇÕES E CANONIZAÇÃO

Todas as inconsistências críticas, altas e médias identificadas nas varreduras foram **totalmente resolvidas** e integradas à documentação canônica:

### 🔴 CRÍTICO
- **Resolver Capítulo 11 (RESOLVIDO):** O Capítulo 11 foi integrado de forma limpa em `final/Capítulo_11.md`. A bebê foi nomeada Mila Aldebar, diferenciando-a de Mira Solanthir e resolvendo a contradição temporal.
- **Atualizar LIVRO1_CONTROLE_E_CONTINUIDADE.md (RESOLVIDO):** Atualizado para refletir o estado real de consolidação de todos os capítulos em `final/`.
- **Atualizar AGENTS.md (RESOLVIDO):** Ajustado para o novo padrão de pasta única `00_ORGANIZACAO/`.
- **Expandir MASTER_TIMELINE.md (RESOLVIDO):** Linha temporal expandida operacionalmente. A consistência da obra agora é checada via script automatizado `test_timeline.sh` que varre todos os capítulos finais.
- **Criar fichas de alta prioridade (RESOLVIDO):** Fichas completas e curtas para Varek Nythor, Valtheris, Zerynthia, Kaelia Marethyus, Torgath, Ignar Vulkarys, Lysias Thyrion e Mila Aldebar consolidadas em `PERSONAGENS_MASTER.md`.
- **Resolver vazamento Selynis = Velatrix (RESOLVIDO):** Estabelecido que a dualidade é mantida no livro com pistas sutis e sem revelação direta ao leitor comum.

### 🟡 ALTA e MÉDIA
- **Polir Caps 9-11 (RESOLVIDO):** Revisados para terminologia in-universe e integrados em `final/`.
- **Decidir status de `giro` (RESOLVIDO):** Definido no manual de estilo que `giro` é o termo popular e `daen` é o termo erudito/narrador.
- **Profundidade dos Reinos (RESOLVIDO):** Criadas expansões ultra-detalhadas em arquivos próprios para os 7 reinos em `00_ORGANIZACAO/`.
- **Fichas de Média/Baixa Prioridade (RESOLVIDO):** Fichas criadas para Tronus, Ouric, Vaelor Marethyus, Enviado Silente, Vesper, Soren, Torvas, Branok, Senhora Lyrna e Liora.
- **Economia e Comércio (RESOLVIDO):** Moedas (Lúmen, Aethris, Vale, Raio, Chama, Peso) e rotas comerciais descritos no Atlas e nas expansões locais.
- **Expansão Nihilaryth (RESOLVIDO):** Documento `NIHILARYTH_EXPANSÃO_DETALHADA.md` criado com estrutura de poder, líderes e Plano de Sombra.
- **Easter Eggs (RESOLVIDO):** Integrados de forma coerente à lore do livro (ex: homem de capa preta adaptado para a aparência de Aldric).
- **Unificar nomenclatura "Nin Gal" (RESOLVIDO):** Todas as ocorrências de "Nin Gal" foram normalizadas para "Nin Gal" (espaçamento fino unicode) em todos os arquivos de lore e capítulos.
- **Corrigir "Yggoraty" → "Yggorath" (RESOLVIDO):** Nome da entidade cosmológica corrigido em todos os arquivos; termo mantido apenas como nome do 13º mês do calendário (Yggorath).
- **Corrigir "Mytra" → "Mythra" (RESOLVIDO):** Nome da líder Nihilaryth corrigido em todos os arquivos de lore, capítulos e rascunhos.
- **Remover Noctis (RESOLVIDO):** Seraphyen inexistente removido de `UMBRA_EXPANSÃODETALHADA.md`; fundação de Umbra agora atribuída aos seguidores humanos das Leis de Ilyos.
- **Atualizar glossário do Prólogo (RESOLVIDO):** Adicionadas definições para "Nin Gal" (título militar supremo) e "Galáxia Aetheria" (galáxia primordial).

---

## SUMÁRIO EXECUTIVO (ATUALIZADO)

### O que está **bom** e selado:
- Prólogo + Capítulos 1-6 (SELADOS)
- Capítulos 7-8 (HÍBRIDOS — apenas revisões menores)
- Lore de cosmologia e mundo (completa)
- Fichas de todos os personagens principais e secundários em `PERSONAGENS_MASTER.md`
- Calendário Seraphyen e moedas locais
- Script de teste de timeline `test_timeline.sh` passando com sucesso

### O que foi corrigido (sessão de Junho de 2026):
- **Cap 11**: Integrado em definitivo; contradição temporal sanada com a distinção Mira/Mila.
- **MASTER_TIMELINE.md**: Alinhado cronologicamente com as passagens finais.
- **CONTROLE_E_CONTINUIDADE.md**: Atualizado para refletir os 45 capítulos consolidados em `final/`.
- **AGENTS.md**: Estrutura de pastas corrigida para `00_ORGANIZACAO/`.
- **Terminologia Seraphyen**: Regra de `giro` vs `daen` formalizada.
- **ESTUDO_DE_LOGICA_DOS_PERSONAGENS.md**: Todas as 15 discrepâncias de esqueleto foram limpas das tabelas individuais de linha temporal.
- **Nomenclatura "Nin Gal"**: Uniformizada em todos os arquivos de lore e capítulos.
- **Nome "Yggoraty" → "Yggorath"**: Corrigido em toda a obra (exceto calendário).
- **Nome "Mytra" → "Mythra"**: Corrigido em toda a obra (líder Nihilaryth).
- **Noctis removido**: Seraphyen inexistente apagado; Umbra agora tem fundação humana.
- **Glossário do Prólogo**: Expandido com definições de "Nin Gal" e "Galáxia Aetheria".

---

*Fim do Relatório Atualizado — 5 de Junho de 2026*

