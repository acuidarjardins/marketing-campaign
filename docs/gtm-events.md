# GTM: conversão de lead e WhatsApp

O site envia eventos na camada de dados assim:

- **`lead_success`**: somente após o lead ser gravado com sucesso no Supabase (não dispara em erro de validação ou de rede). Inclui **`form_name`** (string definida por página no `BodyWrapper`).
- **`clickWhatsapp`**: somente quando o fluxo abre de fato o link `wa.me` (modo `direct` no clique do CTA, ou após sucesso do formulário nos modos com modal). Páginas com conversão via Google Ads (`gtag_report_conversion`) usam o modo **`gtag`** no `BodyWrapper` em vez de empurrar `clickWhatsapp`.

## Ações no container GTM

1. **Desativar ou ajustar** tags de conversão ligadas a **Form Submission**, **`gtm.formSubmit`** ou **clique em Submit**, se elas contavam conversões antes da confirmação do lead.
2. Criar um trigger **Evento personalizado** com nome **`lead_success`**.
3. Usar esse trigger (e opcionalmente a variável de camada de dados `form_name`) nas tags de conversão Google Ads / eventos GA4.
4. Se a conversão de “clique WhatsApp” deve refletir apenas abertura real do link, garantir que as tags usem o evento **`clickWhatsapp`** (ou o evento de conversão `gtag` configurado fora do GTM na landing que não carrega GTM).

### Conversão oficial: apenas `lead_success`

O código envia **`lead_success`** com **`form_name`** somente após o **`insert`** no Supabase retornar **sem erro**. O modal usa React Hook Form: com campos obrigatórios inválidos **`onSubmit` não roda**.

Tags configuradas ouvindo **submit do formulário no DOM** (ou Medição aprimorada do GA4 com **`form_submit`**) ainda podem disparar antes da mesma garantia semântica; por isso a conversão de **lead salvo** deve depender apenas de **`lead_success`**.

**Checklist GTM / GA (gestor)**

1. Pausar ou excluir tags de conversão (Google Ads / GA4) com gatilho **Envio de formulário**, **`gtm.formSubmit`** ou equivalente (“todos os formulários”).
2. No stream GA4 utilizado pela propriedade, conferir **Medição aprimorada** → desativar interações com formulários se **`form_submit`** estiver sendo usado como KPI de conversão.
3. Gatilho GTM tipo **evento personalizado** com nome **`lead_success`** e tags de conversão **apenas** nesse gatilho.
4. Usar **`form_name`** no `dataLayer` para segmentar replicas (filtro no gatilho ou nas tags).

### Matriz de reteste no GTM Preview

| Rota exemplo | Esperado principal |
|---------------|---------------------|
| `/` (`ctaMode`: `direct`) | Sem modal de lead ao primeiro clique: **`clickWhatsapp`** quando o usuário abre de fato o `wa.me`. |
| `/cuidadores` | **`lead_success`** com `form_name` **`cuidadores`**, depois **`clickWhatsapp`** (WhatsApp modo GTM). |
| `/empresa-de-cuidadores` (`lead-only`) | **`lead_success`** com **`empresa-de-cuidadores`**, depois **`clickWhatsapp`**. |
| `/landing-page` | **`lead_success`** com **`landing-page`**, fluxo WhatsApp conforme modo. |
| `/hot-site` | **`lead_success`** com **`hot-site`**. |
| `/cuidadores-de-idosos` (`gtag`) | **`lead_success`** com **`cuidadores-de-idosos`**; conversão Ads de WhatsApp via **`gtag_report_conversion`** (não há push de **`clickWhatsapp`** nesta página). |

**Por rota com modal**

- Submit com **campos inválidos**: erros na UI; **não** aparece novo objeto com `event: "lead_success"` no `window.dataLayer` (comparar com `window.dataLayer.filter((e) => e.event === "lead_success")`).
- Submit **válido** e backend OK: um **`lead_success`** com **`form_name`** coerente; depois o evento WhatsApp segundo o modo (**`clickWhatsapp`** ou **`gtag`** conforme página).

`/leads/analysis` mantém formulário próprio de auth; garantir que o container não use gatilho “todo formulário” que capture essa página se ela usar o mesmo GTM/domínio.

### Remover Leadster / Neurolead

O app **não** embute Leadster no código; scripts como `neurolead.min.js` costumam vir de **tags no GTM**. Se a ferramenta não for mais usada:

1. No GTM (container `ACUIDAR_DEFAULT_GTM` ou o ativo no site), buscar tags por **Leadster**, **Neurolead**, **neurolead**, **cdn.leadster.com.br**.
2. **Pausar ou excluir** essas tags e publicar o container.
3. No navegador, **Network** filtrando `leadster`: não deve restar chamadas a `cdn.leadster.com.br` nem `app.leadster.com.br` (evita 401 e tráfego inútil).
4. O repositório pode manter a **CSP** sem hosts Leadster após isso (ver [`next.config.mjs`](../next.config.mjs)).

### Aviso React: `data-tag-assistant-present` no `<html>`

Isso vem da **extensão Tag Assistant** injetando atributos no `<html>` e não do servidor. O layout usa `suppressHydrationWarning` no `<html>` para reduzir o ruído no console; a alternativa é desativar a extensão na aba de desenvolvimento ou usar janela anônima sem extensões.

## Teste rápido

Use o [Modo de visualização do GTM](https://support.google.com/tagmanager/answer/6107050) e confirme: submit inválido não gera `lead_success`; submit com sucesso gera `lead_success` com o `form_name` esperado e em seguida o evento de WhatsApp conforme o modo da página.

## Validar eventos quando “nada aparece”

1. **`lead_success` depende do Supabase**  
   O evento só roda depois de `insert` na tabela `leads` **sem erro**. Se o modal mostrar *“Erro ao enviar…”*, o `lead_success` **não** será enviado. No DevTools → **Rede**, inspecione a chamada ao Supabase e confira RLS/API keys em `.env.local`.

2. **Conferir o `dataLayer` sem GTM**  
   No console do navegador (com a página aberta), execute `window.dataLayer` ou `window.dataLayer.filter(e => e.event)`. Você deve ver objetos com `event: "lead_success"` ou `event: "clickWhatsapp"` após o fluxo correto. Se aparecer aqui mas não no Preview do GTM, o problema é **container, trigger ou bloqueio de script** (não o React).

3. **Modo debug no projeto**  
   Com `NEXT_PUBLIC_DEBUG_ANALYTICS=1` no `.env.local`, cada `dataLayer.push` feito pelo código gera um log **`[analytics] dataLayer.push`** no console. Reinicie o `yarn dev` após alterar o env.

4. **Teste só com WhatsApp (sem formulário)**  
   Na home (`BodyWrapper` com `ctaMode="direct"`), um clique no CTA WhatsApp deve abrir o `wa.me` e disparar **`clickWhatsapp`** (modo GTM) sem passar pelo formulário. Útil para isolar GTM vs Supabase.

5. **Trigger no GTM**  
   O nome do evento no trigger personalizado deve ser exatamente **`lead_success`** (e o de clique **`clickWhatsapp`**), como no `push`. Diferença de maiúsculas ou nome errado = tag não dispara.

6. **Extensões e ambiente**  
   Bloqueadores de anúncio / privacidade podem impedir o carregamento de `googletagmanager.com`. Teste em janela anônima sem extensões ou em outro navegador. Confira se `ACUIDAR_DEFAULT_GTM` está definido no build (páginas que usam `<GoogleTagManager>`).

## Content-Security-Policy (CSP)

A política é enviada pelo Next em todas as rotas via [`next.config.mjs`](../next.config.mjs), com diretivas alinhadas ao [guia CSP da Google Tag Platform](https://developers.google.com/tag-platform/security/guides/csp) (GTM, GA4, endpoints comuns de Ads) mais **Supabase** (`NEXT_PUBLIC_SUPABASE_URL`), **YouTube** / **Google Maps** embeds e `fonts.googleapis.com` / `fonts.gstatic.com` (Next/font).

### Diagnóstico

1. **Network** → documento HTML → **Response Headers** → `content-security-policy`. Se existirem **dois** valores desse header (CDN + app), o navegador exige que o recurso satisfaça **ambas** as políticas: ajuste ou remova a duplicada no painel (Vercel, Cloudflare, etc.).
2. **Console**: mensagens `Refused to ... violates Content-Security-Policy` indicam a diretiva e a URL a incluir.
3. Produção: `curl -sI https://seu-dominio/ | tr -d '\r' | grep -i content-security`

### Depois do deploy

Revalidar com o [Tag Assistant](https://tagassistant.google.com/) ou GTM Preview e um fluxo real (formulário / `dataLayer`) para confirmar que tags e iframes não foram bloqueados.
