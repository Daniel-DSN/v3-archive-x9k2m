# AUDITORIA DE INCONSISTÊNCIAS LÓGICAS
## ALYNDRA — A Semente da Eternidade, Livro I
### Prólogo → Capítulo 10

**Data:** 2026-06-08  
**Escopo:** Prólogo, Capítulos I–X + ENREDO_LIVRO1_MASTER.md  
**Status:** Correções pendentes sinalizadas com ✅ ou ❌

---

## RESUMO EXECUTIVO

| Critério | Total | Criticidade Alta | Criticidade Média | Criticidade Baixa |
|---|---|---|---|---|
| Geografia/Localização | 4 | 1 ✅ | 2 | 1 |
| Personagens/Idades | 5 | 1 | 2 | 2 |
| Cronologia/Timeline | 3 | 0 | 2 | 1 |
| Nomenclatura/Termos | 4 | 1 | 2 | 1 |
| World-building/Regras | 3 | 0 | 2 | 1 |
| Números/Contagens | 2 | 1 | 0 | 1 |
| **TOTAL** | **21** | **4** | **10** | **7** |

---

## 1. GEOGRAFIA / LOCALIZAÇÃO

### 1.1 ✅ CORRIGIDA — Orfanato Luminis em Thalendris (Cap VIII)
- **Problema:** Cap VIII tratava o Orfanato Luminis como se estivesse fisicamente em Thalendris (excursão a pé praia↔orfanato no mesmo dia), mas Cap VII estabeleceu que Thalendris é destino de expedição de dias em veleiros, e Cap IX confirma retorno a Velantis.
- **Linhas afetadas:** Cap VIII L75, L79, L303
- **Correção aplicada:** Commit `0041eb3` — "Orfanato Luminis" → "alojamento de Thalendris" nas 3 ocorrências que posicionavam fisicamente o orfanato na costa.
- **Status:** ✅ RESOLVIDO

### 1.2 ❌ "Campos de She Utu" — termo fantasma (Cap IV)
- **Problema:** No Cap IV, Lyris viaja com Alyndra e passa por "Campos de She Utu" (L249). Este nome NÃO aparece em nenhum glossário, nunca foi definido, e não volta a ser mencionado em nenhum outro capítulo.
- **Hipótese mais provável:** Erro por "Campos de aethrys" — que é o termo consistente usado em todos os outros capítulos (Cap I L45, Cap III L49, Cap VI L108).
- **Linha:** Cap IV L249
- **Ação sugerida:** Substituir "Campos de She Utu" por "campos de aethrys" ou definir o termo no glossário.

### 1.3 Orfanato Luminis — localização oficial
- **Consistente em:** Cap IV (arredores de Velantis), Cap V (Velantis), Cap VI (Cidadela Luminis em Velantis), Cap IX ("retorno a Velantis" L337), Cap X glossário ("Complexo fortificado nos arredores de Velantis" L378).
- **Pontas soltas no MASTER:** ENREDO_LIVRO1_MASTER.md menciona no Cap 44 "reunião no orfanato em Sanctrum" — contradiz a localização em Velantis estabelecida nos caps 1-10. **Atenção para caps futuros.**

### 1.4 Distâncias de viagem
- Mespiria → Velantis: **2 daens + 1 nyxara** (Cap IV L251) ✓
- Mensageiro Velantis → Sanctrum: **6 dias** (Cap V L344) ✓
- Carta Mespiria → Sanctrum: **12 dias** (Cap III L179) — Maior distância que Velantis → Sanctrum, consistente.
- Cap VII não especifica tempo de viagem Velantis → Thalendris, mas implica ser de dias (velleiros de estrada, pernoite em acampamento na "segunda nyxara da viagem" Cap VII L119). ✓

---

## 2. PERSONAGENS / IDADES

### 2.1 ✅ CORRIGIDA — Conselho dos 12 (todos os arquivos)
- **Problema:** O MASTER referia-se ao "Conselho dos Dez" (10 assentos) com Selynis no "Assento X". Cap IX e Cap X usavam "Conselho dos 12".
- **Decisão do autor:** O Conselho tem 12 assentos. Selynis ocupa o Assento Ukam.
- **Correção aplicada:** Substituição massiva de "Conselho dos Dez" → "Conselho dos 12", "Assento X" → "Assento Ukam", e ajustes de contagem (dez → doze assentos) em ~29 arquivos (todos os capítulos que referenciavam o termo + MASTER + MASTER_TIMELINE + LORE). ~130 substituições totais.
- **Status:** ✅ RESOLVIDO

### 2.2 Padrão "Cicatriz fina na têmpora direita + ombros largos"
- **Cap II L219:** Figura misteriosa no cemitério de Ayla — cabelos prateados, ombros largos, cicatriz fina na têmpora direita
- **Cap IV L251:** Homem na estalagem — mesma descrição
- **Cap IV L331 / Cap V L268:** Aldric no orfanato — mesma descrição
- **Cap VIII L55:** Homem nas falésias de Thalendris — olhos cinzentos, marca de nascença na têmpora direita
- **Análise:** Se Aldric está no orfanato em Velantis (Cap V), e o homem misterioso aparece no cemitério de Mespiria (Cap II) e na estalagem a caminho de Velantis (Cap IV), é provável que sejam todos o mesmo personagem (Aldric seguindo Alyndra). **Mas o homem no Cap VIII está em Thalendris durante a excursão** — se Aldric ficou em Velantis, quem é esse homem? Ou Aldric viajou para Thalendris separadamente?
- **Severidade:** MÉDIA — precisa de clarificação se é o mesmo personagem ou um padrão intencional

### 2.3 Idade de Alyndra — consistente
- Cap I–II: Nascimento (0 valens)
- Cap III–IV: 4 valens ✓
- Cap V: 4 valens ✓
- Cap VI: Completa 5 valens (L359) ✓
- Cap VII–VIII: 5 valens (Cap VIII L83 menciona "criança de cinco valens") ✓
- Cap IX: 5 valens (implícito) ✓

### 2.4 Idades do grupo — consistentes entre Cap VII e Cap IX
| Personagem | Idade Cap VII | Idade Cap IX | Consistente? |
|---|---|---|---|
| Mira | 10 valens (L71) | — | ✓ |
| Torvin | 8 valens (L75) | — | ✓ |
| Kira | 15 valens (L89) | — | ✓ |
| Dravyn | 12 valens (L103) | — | ✓ |

### 2.5 Kaelia Marethyus (Cap X) — conexão familiar não explicitada
- **Problema:** Cap X L32 apresenta "Nin Kaelia Marethyus" como governante de Thalassia. O sobrenome Marethyus é o mesmo de Alyndra (Alyndra Marethyus, Cap II L173). O MASTER confirma que Marethyus é o avô de Alyndra.
- **Implicação:** Kaelia é provavelmente parente de Alyndra (tia? prima?). Mas isso nunca é mencionado no texto.
- **Severidade:** BAIXA — pode ser intencionalmente oculto para revelação futura, mas precisa ser rastreado.

---

## 3. CRONOLOGIA / TIMELINE

### 3.1 ❌ "3 nyras" de Ayla — jornada instantânea?
- **Cap I L21:** "havia 3 nyras desde que deixara Sanctrum" — Ayla está em Zephyra fugindo
- **Cap II L87:** chegou a Mespiria "3 nyras antes"
- **Problema:** Se ela deixou Sanctrum há 3 nyras E chegou a Mespiria há 3 nyras, implica que a travessia do Mar de Cristal de Sanctrum a Sylvaris + a jornada até Mespiria foi instantânea. O Cap I descreve Ayla caminhando por campos e sendo atacada, sugerindo que já está em Sylvaris. Mas a matemática aperta.
- **Hipótese:** As 3 nyras contam desde a chegada a Mespiria (ignorando o tempo de viagem). O Cap I poderia dizer "havia quase 3 nyras" para ser mais preciso.
- **Severidade:** MÉDIA

### 3.2 Linha temporal do Cap VI → VII → VIII → IX
- **Cap VI:** Fim do inverno. Alyndra completa 5 valens. Retorno a Mespiria. Volta no mesmo dia.
- **Cap VII:** "Ciclo de viagem" anual. Partida do orfanato. Viagem de dias em veleiros. "Segunda nyxara da viagem" (L119). Chegada a Thalendris.
- **Cap VIII:** Um dia em Thalendris (manhã na praia, tarde retorno ao alojamento, noite Nyctara opera).
- **Cap IX L25:** "Três dias desde o retorno de Thalendris" — **confirma que já voltaram a Velantis**.
- **Análise:** A sequência Cap VII → VIII → IX implica estadia de alguns dias em Thalendris (não apenas 1 dia), já que o Cap VII descreve os cais, os koramis, o passeio — tudo em um dia, e o Cap IX diz "3 dias desde o retorno". Consistente se houve 2 dias não narrados entre a chegada (Cap VII) e os eventos do Cap VIII (que seriam o penúltimo dia antes do retorno).

### 3.3 ❌ Mensagem "naquela nyxara" — timing confuso (Cap VIII)
- **Cap VIII L61-67:** Lyris recebe mensagem do cristal passivo durante a **tarde** (Aurion no ápice/descida, L47 "Na volta, Aurion já havia passado o ápice"). Crianças voltando da excursão.
- **Cap VIII L273:** Nyctara referencia "a mensagem cifrada que havia chegado naquela nyxara" — mas a mensagem chegou de **tarde**, não de nyxara. A nyxara ainda não começara quando a mensagem foi recebida.
- **Ação sugerida:** Corrigir L273 para refletir que a mensagem chegou durante a tarde/excursão, não "naquela nyxara".

---

## 4. NOMENCLATURA / TERMOS

### 4.1 ❌ Nihilarys vs Nihilaryth (Prólogo vs Cap III)
- **Prólogo L35:** "Nihilarys" (plural)
- **Cap III glossário L399:** "Nihilaryth" (com "th" final)
- **MASTER:** Usa "Nihilarys" consistentemente
- **Severidade:** MÉDIA — deve ser unificado

### 4.2 "Sylvaris" como plural (Cap VI — carta de Melessa)
- **Cap VI L236:** "vi você conversar com os Sylvaris"
- **Problema:** "Sylvaris" é o nome do reino. O plural provável seria "sylari" (os insetos alados definidos no glossário Cap III L373) ou "sylvarinos" (pessoas de Sylvaris).
- **Severidade:** MÉDIA

### 4.3 "En Me" vs "En Gesh" — partícula "En"
- Cap IX L127: "En Me" (Aurelius)
- Cap IX L159: "En Gesh" (Valtheris)
- **Consistente** — "En" é um prefixo de titulação em Sanctrum, não uma inconsistência. Mas vale notar que outros títulos (En Dili Lil, etc.) seguem o mesmo padrão.

### 4.4 Termos similares potencialmente confusos
- **Selynis** (conselheira) vs **Sylvaris** (reino) — nomes foneticamente próximos. Cap X usa ambos.
- **Lysias Thyrion** (repórter, Cap X) vs **Lyris** (guardiã) — nomes parecidos, personagens diferentes.
- **Nyx** (lua azul / lyrien de Alyndra) vs **Nyxalor** (primordial) vs **Nyctara** (codinome de Lyris) vs **Nyxara** (noite) — quatros termos com raiz "nyx". Intencional do world-building, mas requer atenção do leitor.

---

## 5. WORLD-BUILDING / REGRAS

### 5.1 Cryonys — definição vs uso narrativo
- **Definição glossário Cap VI L447:** "Fusão elemental de Água + Vento; manifestação de gelo e congelamento"
- **Uso narrativo Cap IV L151:** Aparece como cristalização etérica gerada por luto emocional — "o frio transcendia o elemento e se tornava matéria viva"
- **Uso narrativo Cap VI L263-309:** Alyndra gera flores de gelo por emoção ao ler carta da mãe
- **Análise:** A definição técnica (Água+Vento) não explica a conexão emocional. A Alyndra é uma criança de 5 valens sem treino que manifesta cryonys involuntariamente por emoção. Isso é consistente com o MASTER, que descreve Alyndra como tendo "poder oculto que desperta com a dor", mas a definição técnica do glossário é limitada.
- **Severidade:** BAIXA — pode ser expandido em caps futuros

### 5.2 ❌ "A Semente" — termo cifrado de Umbra aparece cedo demais?
- **Cap VIII L239, L245, L257, L259:** Mercenários de Umbra referem-se a Alyndra como "A Semente" em conversa na galeria de sal
- **MASTER:** Confirma que "A Semente" é a designação cifrada de Umbra para Alyndra
- **Consistência:** OK por enquanto. Mas vale notar que o Cap VIII é muito cedo na narrativa para que os leitores saibam que "A Semente" = Alyndra. A revelação é feita de forma implícita (Nyctara prende a respiração ao ouvir) e confirmada mais tarde.

### 5.3 Lyris — afinidade elemental não declarada formalmente
- **Cap IV L251:** Lyris usa **fogo** na palma para aquecer água
- **Cap VIII L193:** Lyris/Nyctara usa **thermaris** (Água+Fogo = vapor)
- **Cap IX L297:** Lyris gera calor corporal intenso na estufa
- **Análise:** Lyris demonstra capacidade de manipular fogo e água, mas sua afinidade elemental nunca é declarada formalmente. O Cap III L225 diz apenas "32 valens de serviço nos Tar-Gig".
- **Severidade:** BAIXA — pode ser intencional (agente treinada domina múltiplos elementos)

### 5.4 ✅ CORRIGIDA — Sistema de possessão por Nihilarys
- **Problema:** O sistema de possessão (5 estágios) não era referenciado nos caps 1-10, apenas no MASTER.
- **Decisão do autor:** Confirmou que devemos explicar como a possessão funciona.
- **Correção aplicada:** Glossário do Cap III (L399) — entrada de Nihilarys expandida com descrição do processo de possessão de 5 estágios (sussurros → permissividade → rituais forçados → dissolução → casca).
- **Status:** ✅ RESOLVIDO (referência básica; detalhes narrativos nos Caps 31+ já existentes)

---

## 6. NÚMEROS / CONTAGENS

### 6.1 ❌ Crianças do orfanato — 40 vs 231
- **Cap VII L31:** "Duzentas e trinta e uma crianças" e "42 grupos" — escala total do orfanato
- **Cap VIII L19, L47, L93, L339:** "Quarenta crianças" — apenas o grupo de Alyndra
- **Análise:** O Cap VIII foca no grupo de 40 de Alyndra dentro do alojamento de Thalendris. O número é consistente desde que se entenda que são 40 de um total de 231. **Mas o Cap VIII nunca deixa isso claro** — lê-se como se o orfanato tivesse apenas 40 crianças.
- **Ação sugerida:** No Cap VIII, incluir uma menção de que são apenas um dos grupos do ciclo de viagem (ex: "as quarenta crianças do grupo dezessete, dentre as duzentas e trinta e uma do orfanato").

### 6.2 ✅ CORRIGIDA — Número de líderes vs número de reinos
- **Problema:** O MASTER mencionava "10 líderes dos reinos" mas Cap X apresenta 7 reinos com 7 líderes.
- **Decisão do autor:** São 7 reinos com 7 líderes vinculadores. O Conselho dos 12 tem 12 assentos (7 representantes dos reinos + assentos adicionais de governança de Sanctrum, incluindo o En Me).
- **Correção aplicada:** MASTER atualizado: "10 líderes" → "7 líderes vinculadores" em 4 ocorrências.
- **Status:** ✅ RESOLVIDO

---

## 7. PONTAS SOLTAS PARA CAPÍTULOS FUTUROS

### 7.1 "Velho de olhos tristes" (Cap II L305, Cap III L305)
- Aparece nos caps 2 e 3 nas montanhas entre Terraxis e Umbra
- Nunca é nomeado ou explicado
- Personagem não resolvido

### 7.2 Enredo do MASTER — Cap 44 "orfanato em Sanctrum"
- MASTER diz que no Cap 44 há "reunião no orfanato em Sanctrum"
- Mas nos caps 1-10, o Orfanato Luminis está consistentemente em Velantis
- **Atenção:** Verificar se o orfanato é transferido para Sanctrum em capítulo futuro ou se é erro do MASTER

### 7.3 Desenho misterioso (Cap V L113-116)
- Menina brilhando, árvore com animal de pelagem clara no topo
- Possível premonição ou arte ancestral
- Nunca explicado

### 7.4 Melessa — "o que debaixo das tábuas" (Cap IV L119-139)
- Melessa tenta contar algo a Lyris sobre algo escondido sob o assoalho
- Morre antes de completar a frase
- O esconderijo sob o assoalho é bloqueado por cryonys (Cap IV L147-163)
- Em Cap VI, Lyris retorna e encontra Nyx + caixa "Depois", mas a referência de Melessa sugere algo ALÉM do que foi encontrado

---

## 8. HISTÓRICO DE CORREÇÕES APLICADAS

| ID | Cap | Correção | Commit | Data |
|---|---|---|---|---|
| GEO-1 | VIII | Orfanato → alojamento de Thalendris (3 linhas) | `0041eb3` | 2026-06-08 |
| GEO-2 | IV | "campos de She Utu" → "campos de aethrys" (L249) | `78a5dcf` | 2026-06-08 |
| NOM-2 | III gloss | "Nihilaryth" → "Nihilarys" (L399) | `78a5dcf` | 2026-06-08 |
| NOM-3 | VI | "os Sylvaris" → "os sylvarinos" (L236) | `78a5dcf` | 2026-06-08 |
| CRONO-3 | VIII | "naquela nyxara" → "durante a excursão" (L273) | `78a5dcf` | 2026-06-08 |
| NUM-1 | VIII | Esclareceu 40 crianças como grupo de 231 (L19) | `78a5dcf` | 2026-06-08 |
| WB-2 | VI gloss | Expandiu definição de cryonys com manifestação emocional (L447) | `78a5dcf` | 2026-06-08 |
| NOM-1 | Todos | "Conselho dos Dez" → "Conselho dos 12" + "Assento X" → "Assento Ukam" (~130 substituições em 29 arquivos) | `pending` | 2026-06-08 |
| NUM-2 | MASTER | "10 líderes" → "7 líderes vinculadores" (4 ocorrências) | `pending` | 2026-06-08 |
| WB-3 | III gloss | Expandida definição de Nihilarys com sistema de possessão (5 estágios) | `pending` | 2026-06-08 |

---

## 9. FILA DE CORREÇÕES PENDENTES

| Prioridade | ID | Cap | Tipo | Descrição | Status |
|---|---|---|---|---|---|
| **ALTA** | NOM-1 | IX, X, todos | Nomenclatura | Conselho dos 12 vs Conselho dos Dez — unificado para **Conselho dos 12** | ✅ RESOLVIDO |
| **ALTA** | NUM-2 | X / MASTER | World-building | 7 reinos vs 10 líderes — unificado para **7 líderes vinculadores** | ✅ RESOLVIDO |
| **ALTA** | NUM-1 | VIII | Números | 40 crianças esclarecidas como grupo de 231 | ✅ RESOLVIDO |
| **MÉDIA** | GEO-2 | IV | Geografia | "campos de She Utu" → "campos de aethrys" | ✅ RESOLVIDO |
| **MÉDIA** | NOM-2 | III gloss | Nomenclatura | "Nihilaryth" → "Nihilarys" | ✅ RESOLVIDO |
| **MÉDIA** | NOM-3 | VI | Nomenclatura | "os Sylvaris" → "os sylvarinos" | ✅ RESOLVIDO |
| **MÉDIA** | CRONO-3 | VIII | Cronologia | "naquela nyxara" → "durante a excursão" | ✅ RESOLVIDO |
| **MÉDIA** | PER-2 | II, IV, V, VIII | Personagem | Cap VIII L55: "marca de nascença" vs caps II/IV/V: "cicatriz fina" — mesmo personagem (Aldric)? Ele teria viajado a Thalendris separadamente? **(decisão do autor pendente)** |
| **MÉDIA** | WB-3 | III gloss | World-build | Sistema de possessão por Nihilarys — adicionada referência básica no glossário do Cap III | ✅ RESOLVIDO (referência) |
| **MÉDIA** | CRONO-1 | I | Cronologia | "3 nyras" — timeline compatível (sem inconsistência real) | ✅ SEM CORREÇÃO |
| **BAIXA** | PER-3 | IV | Ponta solta | Melessa — algo sob o assoalho, nunca resolvido **(reservado para capítulo futuro)** |
| **BAIXA** | WB-1 | VI gloss | World-build | Cryonys — definição técnica vs manifestação emocional (expandida) | ✅ RESOLVIDO |
| **BAIXA** | PER-1 | V | Personagem | Kaelia Marethyus — conexão familiar com Alyndra não explicitada **(reservado para revelação futura)** |
| **BAIXA** | NOM-4 | X | Nomenclatura | Termos similares confusos (Selynis/Sylvaris, Lysias/Lyris, Nyx/Nyxalor/Nyctara/Nyxara) **(intencional do world-building)** |

---

*Relatório gerado por auditoria sistemática de Prólogo → Capítulo X + ENREDO_LIVRO1_MASTER.md*
*Atualizado: 2026-06-08 — 10 correções aplicadas, 3 pendentes (1 decisão do autor, 2 reservados para caps futuros)*
