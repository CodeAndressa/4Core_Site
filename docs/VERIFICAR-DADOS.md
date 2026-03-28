# 🔍 Verificar Dados do Analytics

## Por que não aparecem dados?

Existem 3 possíveis razões:

### 1️⃣ Não há eventos no banco de dados
- O deploy novo não apaga dados antigos
- Mas se você nunca gerou eventos, o banco está vazio

### 2️⃣ Filtro de data está muito restrito
- Padrão: últimos 7 dias
- Se os eventos são mais antigos, não aparecem

### 3️⃣ Eventos foram gerados antes do deploy
- Eventos antigos ainda estão lá
- Use o filtro "Todos os dados" para ver

---

## ✅ Como Verificar se Há Dados

### Opção 1: Via Supabase Dashboard

1. Acesse: https://supabase.com/dashboard/project/uesqdbaxhnblefrtjtae/editor
2. Clique na tabela **events**
3. Veja quantos registros existem

### Opção 2: Via SQL

Execute no SQL Editor do Supabase:

```sql
-- Ver total de eventos
SELECT COUNT(*) as total FROM events;

-- Ver eventos por tipo
SELECT type, COUNT(*) as total 
FROM events 
GROUP BY type;

-- Ver eventos recentes
SELECT * FROM events 
ORDER BY created_at DESC 
LIMIT 10;

-- Ver eventos por data
SELECT DATE(created_at) as date, COUNT(*) as total
FROM events
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## 🎯 Como Gerar Dados de Teste

### Método 1: Navegação Manual (RECOMENDADO)

1. Acesse seu site: `https://seu-dominio.vercel.app`
2. Navegue pelas páginas:
   - Home (/)
   - Sobre (/sobre)
   - Soluções (/solucoes)
   - Contato (/contato)
3. Clique no botão WhatsApp (canto inferior direito)
4. Envie o formulário de contato
5. Aguarde 10 segundos
6. Acesse o dashboard: `/admin/dashboard`
7. Clique em "Todos os dados" no filtro

### Método 2: Via Console do Navegador

1. Acesse: `https://seu-dominio.vercel.app`
2. Abra o Console (F12)
3. Cole e execute:

```javascript
// Gerar 10 eventos de teste
for (let i = 0; i < 10; i++) {
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'page_view',
      page: '/',
      device: 'desktop',
      session_id: 'test-' + Date.now() + '-' + i,
      user_agent: navigator.userAgent
    })
  }).then(r => r.json()).then(d => console.log('Evento criado:', d))
}
```

### Método 3: Via SQL (Inserção Direta)

Execute no SQL Editor do Supabase:

```sql
-- Inserir eventos de teste
INSERT INTO events (type, page, device, session_id, created_at)
VALUES 
  ('page_view', '/', 'desktop', 'test-1', NOW() - INTERVAL '1 hour'),
  ('page_view', '/sobre', 'mobile', 'test-1', NOW() - INTERVAL '50 minutes'),
  ('page_view', '/solucoes', 'desktop', 'test-2', NOW() - INTERVAL '40 minutes'),
  ('whatsapp_click', '/solucoes', 'desktop', 'test-2', NOW() - INTERVAL '35 minutes'),
  ('page_view', '/contato', 'mobile', 'test-3', NOW() - INTERVAL '30 minutes'),
  ('form_submit', '/contato', 'mobile', 'test-3', NOW() - INTERVAL '25 minutes'),
  ('page_view', '/', 'tablet', 'test-4', NOW() - INTERVAL '20 minutes'),
  ('page_view', '/sobre', 'desktop', 'test-5', NOW() - INTERVAL '15 minutes'),
  ('whatsapp_click', '/sobre', 'desktop', 'test-5', NOW() - INTERVAL '10 minutes'),
  ('page_view', '/', 'mobile', 'test-6', NOW() - INTERVAL '5 minutes');
```

---

## 📊 Usar o Filtro Correto

No dashboard, você agora tem 5 opções de filtro:

1. **Últimos 7 dias** (padrão)
2. **Últimos 30 dias**
3. **Últimos 90 dias**
4. **Todos os dados** ← Use este para ver tudo
5. **Personalizado** ← Escolha datas específicas

### Como usar o filtro Personalizado:

1. Clique em "Personalizado"
2. Selecione a data de início (ex: 01/01/2024)
3. Selecione a data de fim (ex: hoje)
4. Clique em "Aplicar"

---

## 🔄 Dados Persistem Após Deploy

**IMPORTANTE:** O deploy NÃO apaga dados do Supabase!

- ✅ Eventos antigos continuam no banco
- ✅ Novos eventos são adicionados
- ✅ Nada é perdido no deploy

Se você não vê dados, é porque:
- Não há eventos no período selecionado
- Ou nunca foram gerados eventos

---

## 🧪 Teste Completo

Execute este checklist:

```
[ ] 1. Verificar se há eventos no Supabase (SQL: SELECT COUNT(*) FROM events)
[ ] 2. Se não houver, gerar eventos de teste (método 1, 2 ou 3)
[ ] 3. Acessar o dashboard
[ ] 4. Clicar em "Todos os dados" no filtro
[ ] 5. Verificar se os dados aparecem
[ ] 6. Testar filtro "Personalizado"
[ ] 7. Navegar pelo site para gerar eventos reais
[ ] 8. Atualizar o dashboard (F5)
```

---

## 📞 Ainda não funciona?

Se após gerar eventos de teste os dados não aparecem:

1. Abra o Console do navegador (F12)
2. Vá na aba "Network"
3. Acesse o dashboard
4. Procure pela requisição `/api/analytics`
5. Veja a resposta (Response)
6. Me envie o conteúdo da resposta

---

**Os dados SEMPRE ficam salvos no Supabase, mesmo após deploy! 🎉**
