# GTM / dataLayer — eventos de lead e WhatsApp

O app envia **apenas** estes **`event`** via `window.dataLayer` (todos incluem **`form_name`**, igual à prop `analyticsFormName` da página):

| Evento | Quando dispara | Não dispara quando |
|--------|----------------|-------------------|
| **`form_open`** | Primeira vez nesta **sessão** em que o modal de formulário de lead fica visível (por `form_name`) | Modal “Qual objetivo?” (`intent`); reabrir/fechar o form; home (`direct`); erro de validação |
| **`form_finish`** | Só depois do **`insert`** na tabela `leads` (Supabase) **sem erro** | Erro Supabase; submit inválido (React Hook Form) |
| **`whatsapp_send`** | Imediatamente **antes** de `window.open` para `wa.me` | Fechar modal sem enviar; erro no insert |

Na home (`ctaMode="direct"`) só existe **`whatsapp_send`** — não há `form_open` / `form_finish`.

Ordem no fluxo com formulário: **`form_finish`** → **`whatsapp_send`** → `window.open`.

Payload típico:

```js
window.dataLayer.push({ event: "form_open", form_name: "cuidadores" });
window.dataLayer.push({ event: "form_finish", form_name: "cuidadores" });
window.dataLayer.push({ event: "whatsapp_send", form_name: "cuidadores" });
```

Implementação em [`src/utils/analytics.ts`](../src/utils/analytics.ts). Disparos nos fluxos: [`lead-modal.tsx`](../src/components/lead-modal/lead-modal.tsx), [`lead-modal-context.tsx`](../src/contexts/lead-modal-context.tsx) (home WhatsApp direto).

O app **nunca** envia `event: form_submit` nem `event: ""`.

---

## Logs no load: o que manter vs remover

Referência ao abrir a landing no GTM Debugger / DevTools **sem clicar**:

| Log no console | Manter? | O que é |
|----------------|---------|---------|
| `GTAG command: config AW-16512048543` | Sim | Setup do pixel Google Ads |
| `GTAG command: config G-NZHW27C4J6` | Sim | Setup do GA4 |
| `data layer push: { event: "gtm.load", … }` | Sim | GTM terminou o bootstrap |
| **`GTAG command: event form_submit` + `_tag_mode: "AUTO"`** | **Não** | Tag/conversão **automática** do Ads no container — dispara sem submit real |
| **`GTAG command: event ""` + `aw_remarketing_only: true`** | Opcional | **Conversion Linker** do Ads (cookies de atribuição) — não é conversão de lead |
| `Duplicate container installation abandoned: G-NZHW27C4J6` | Corrigir | Duas tags GA4 com o mesmo Measurement ID no container |

No **clique** WhatsApp (home), o app gera (correto):

```text
Processing data layer push: { event: "whatsapp_send", form_name: "home", … }
```

Isso **não** aparece como `GTAG command: ["event", "whatsapp_send", …]` até existir **tag no GTM** com trigger Custom Event `whatsapp_send`.

**Não dá para remover esses logs só com código React** — vêm de tags no container `ACUIDAR_DEFAULT_GTM` (`GTM-NZLJ23Z`). Checklists abaixo são para o gestor de tráfego no [tagmanager.google.com](https://tagmanager.google.com/).

---

## Carregamento do GTM (Next)

- **Componente:** [`GoogleTagManager`](https://www.npmjs.com/package/@next/third-parties) de `@next/third-parties/google`, montado **no primeiro paint** em cada landing.
- **Onde:** [`src/app/page.tsx`](../src/app/page.tsx), [`src/app/cuidadores/page.tsx`](../src/app/cuidadores/page.tsx), [`src/app/empresa-de-cuidadores/page.tsx`](../src/app/empresa-de-cuidadores/page.tsx) — **não** em [`src/app/layout.tsx`](../src/app/layout.tsx) (rota interna **`/leads/analysis`** sem GTM de campanha).
- **Env:** `ACUIDAR_DEFAULT_GTM` — obrigatório no build das landings.
- **`NEXT_PUBLIC_DEBUG_ANALYTICS=1`** — log `[analytics] dataLayer.push` no console.

---

## Checklist 1 — Remover `form_submit` no load (prioridade)

### Sintoma

```text
Processing GTAG command: ["event", "form_submit", {user_data: {_tag_mode: "AUTO"}, send_to: "AW-16512048543"}]
```

| Indício | Significado |
|---------|-------------|
| `_tag_mode: "AUTO"` | Detecção automática (Enhanced Conversions / formulário automático) |
| `send_to: "AW-…"` | Tag Google Ads no GTM |
| Dispara no load | Trigger **Initialization**, **All Pages** ou detecção automática de form |

### Passos no GTM

- [ ] Abrir container **`GTM-NZLJ23Z`** (valor de `ACUIDAR_DEFAULT_GTM`).
- [ ] **Preview** em `http://localhost:3000/` (ou URL de produção) — **sem** interagir na página.
- [ ] Na aba **Tags** do Preview, identificar qual tag disparou `form_submit` (nome da tag, tipo Google Ads Conversion / Google tag).
- [ ] **Pausar** essa tag **ou** remover triggers: Initialization, All Pages, Form Submission, DOM Ready ligados a conversão de formulário.
- [ ] No **Google Ads** → Ferramentas → Conversões: revisar conversão associada a **AW-16512048543**; desativar tipo “envio de formulário automático” / enhanced form se estiver ativo.
- [ ] **Publicar** versão do container.
- [ ] Revalidar: hard refresh na `/` — **sem** `event form_submit` no load.

---

## Checklist 2 — Triggers e tags de conversão (substituir o AUTO)

Criar medição alinhada aos eventos do app (não `form_submit` no load).

### Triggers (Acionadores)

| Nome sugerido | Tipo | Event name | Filtro opcional |
|---------------|------|------------|-----------------|
| CE — whatsapp_send | Custom Event | `whatsapp_send` | `form_name` = `home` (só conversão home) |
| CE — whatsapp_send (todas) | Custom Event | `whatsapp_send` | — |
| CE — form_finish | Custom Event | `form_finish` | — |
| CE — form_open | Custom Event | `form_open` | — (só funil/analytics, raramente conversão Ads) |

Variável no GTM: **Data Layer Variable**, nome da variável `form_name`, chave do data layer `form_name`.

### Tags (exemplos)

| Tag | Trigger | Uso |
|-----|---------|-----|
| Google Ads Conversion | CE — `whatsapp_send` (filtro `home`) | Conversão WhatsApp na `/` |
| Google Ads Conversion | CE — `form_finish` | Conversão após lead salvo no Supabase |
| GA4 Event | CE — `form_open` / `form_finish` / `whatsapp_send` | Funil no GA4 |

- [ ] Criar triggers acima.
- [ ] Associar tags de conversão Ads/GA4 aos triggers (não a Initialization).
- [ ] Publicar e testar: clique WhatsApp na `/` → tag de conversão dispara no Preview; load continua sem `form_submit`.

---

## Checklist 3 — Duplicata GA4 (`G-NZHW27C4J6`)

### Sintoma

```text
Duplicate container installation abandoned: G-NZHW27C4J6
```

Duas tags no GTM inicializam o mesmo Measurement ID.

### Passos

- [ ] No GTM → **Tags**, filtrar por `G-NZHW27C4J6` ou tipo **Google Tag** / **GA4 Configuration**.
- [ ] Se houver **duas** tags com o mesmo ID disparando em All Pages / Initialization, **pausar uma** (manter a que o time usa como canônica).
- [ ] Publicar; revalidar — mensagem de duplicata deve sumir ou aparecer uma vez só.

---

## Log `event ""` + `aw_remarketing_only` (opcional)

```text
Processing GTAG command: ["event", "", {aw_remarketing_only: true, …, send_to: "AW-16512048543"}]
```

- **Não é** conversão de formulário nem WhatsApp.
- É o **Conversion Linker** do Google Ads: grava cookies para atribuir conversões quando `whatsapp_send` / `form_finish` dispararem depois.
- Nome de evento vazio (`""`) é **intencional** na API gtag.

| Objetivo | Ação |
|----------|------|
| Ads com atribuição normal | **Manter** — ruído aceitável no console |
| Menos logs | Localizar tag **Conversion Linker**; só pausar se houver duplicata e outra tag de linker permanecer |

**Recomendação:** remover só o `form_submit` AUTO; deixar o linker salvo salvo orientação contrária do gestor.

---

## Por que não bloquear no React

Patches em `dataLayer.push` / `gtag` no `<head>` são **frágeis** — o Google usa `Array.prototype.push.call(dataLayer, …)` e ignora overrides. A correção estável é o container GTM + Ads (checklists acima).

---

## Endurecimento no app

- Modal de lead sem `<form>` nativo: `role="form"`, `data-acuidar-lead="true"`, botão **`type="button"`** — reduz falsos positivos de “form submit” no DOM ([`LeadModal`](../src/components/lead-modal/lead-modal.tsx)).

---

## Matriz de testes (após publicar GTM)

| Cenário | Esperado |
|---------|----------|
| Load `/` sem clique | Sem `GTAG command: event form_submit`; `config` + `gtm.load` ok |
| Clique WhatsApp `/` | `data layer push: whatsapp_send, form_name: home`; tag Ads/GA4 dispara se configurada |
| `/cuidadores` submit OK | `form_finish` → `whatsapp_send`; sem `form_submit` no load |
| `/leads/analysis` | Sem `googletagmanager.com/gtm.js` de campanha |

---

## Debug

```js
window.dataLayer?.filter(
  (e) =>
    e &&
    typeof e === "object" &&
    typeof e.event === "string" &&
    ["form_open", "form_finish", "whatsapp_send"].includes(e.event)
);
```

Com **`NEXT_PUBLIC_DEBUG_ANALYTICS=1`**, cada push do app loga **`[analytics] dataLayer.push`** em [`analytics.ts`](../src/utils/analytics.ts).

No GTM Debugger: distinguir **GTAG command** (tags do container) de **data layer push** (eventos do app).

---

### Remover Leadster / Neurolead

Buscar tags no GTM (**Leadster**, **neurolead**, `cdn.leadster.com.br`) → pausar.

### CSP

[`next.config.mjs`](../next.config.mjs) — duplicidade de CSP (CDN + app) = política mais estrita combinada.
