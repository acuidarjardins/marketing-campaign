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

