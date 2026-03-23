# Integração Supabase - CRM 4Core

## Visão Geral

Sistema de captura e gestão de leads integrado ao formulário de contato do site 4Core.

---

## Arquitetura

```
Formulário (Frontend)
    ↓
/api/contact (API Route)
    ↓
leadService.ts (Business Logic)
    ↓
Supabase (PostgreSQL)
```

---

## Setup Inicial

### 1. Executar SQL no Supabase

1. Acesse: https://supabase.com/dashboard
2. Selecione o projeto
3. Vá em **SQL Editor**
4. Cole o conteúdo de `supabase-setup.sql`
5. Execute (Run)

### 2. Configurar Variáveis de Ambiente

Copie `.env.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
```

⚠️ **NUNCA commite `.env.local`**

---

## Estrutura de Dados

### Tabela: `leads`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Identificador único |
| `name` | TEXT | Nome completo |
| `email` | TEXT | Email (único por dia) |
| `phone` | TEXT | Telefone/WhatsApp |
| `company` | TEXT | Nome da empresa |
| `employees` | TEXT | Faixa de funcionários |
| `message` | TEXT | Mensagem do lead |
| `source_page` | TEXT | Página de origem |
| `source_channel` | TEXT | Canal: form, whatsapp, phone, email |
| `utm_source` | TEXT | UTM source |
| `utm_medium` | TEXT | UTM medium |
| `utm_campaign` | TEXT | UTM campaign |
| `status` | TEXT | novo, contatado, qualificado, convertido, perdido |
| `interest` | TEXT | Interesse específico |
| `assigned_to` | TEXT | Responsável pelo atendimento |
| `created_at` | TIMESTAMPTZ | Data de criação |
| `last_contact_at` | TIMESTAMPTZ | Último contato |
| `converted_at` | TIMESTAMPTZ | Data de conversão |

---

## Fluxo de Captura

1. **Usuário preenche formulário** → `/contato`
2. **Frontend valida** → Zod schema
3. **Envia para API** → `POST /api/contact`
4. **API valida novamente** → Server-side
5. **Salva no Supabase** → `createLead()`
6. **Envia email** → SMTP
7. **Retorna sucesso** → Frontend exibe confirmação

---

## API Endpoints

### POST /api/lead

Cria um novo lead diretamente (uso interno ou integrações).

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "phone": "(11) 99999-9999",
  "company": "Empresa XYZ",
  "employees": "51-200",
  "message": "Gostaria de conhecer as soluções",
  "source_page": "home",
  "source_channel": "form"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead criado com sucesso",
  "data": { ... }
}
```

### GET /api/lead?email=xxx

Busca lead por email (admin).

---

## Segurança

- **RLS habilitado** — Row Level Security no Supabase
- **Service Role Key** — apenas backend tem acesso
- **Anon Key** — não expõe dados sensíveis
- **Validação dupla** — client + server

---

## Preparação para Automações

### Webhook n8n (Futuro)

Adicionar em `leadService.ts`:

```typescript
// Após criar lead
await fetch('https://n8n.4core.com.br/webhook/lead', {
  method: 'POST',
  body: JSON.stringify(leadData)
})
```

### Trigger no Supabase (Futuro)

Criar webhook trigger:

```sql
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://n8n.4core.com.br/webhook/lead',
    body := row_to_json(NEW)::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_lead_created
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead();
```

---

## Queries Úteis

### Leads dos últimos 7 dias

```sql
SELECT * FROM leads
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### Leads por status

```sql
SELECT status, COUNT(*) as total
FROM leads
GROUP BY status;
```

### Taxa de conversão

```sql
SELECT 
  COUNT(*) FILTER (WHERE status = 'convertido') * 100.0 / COUNT(*) as taxa_conversao
FROM leads;
```

---

## Próximos Passos

1. ✅ Integração básica funcionando
2. ⏳ Dashboard de visualização (BI)
3. ⏳ Automação n8n
4. ⏳ Notificações em tempo real
5. ⏳ Carrinho abandonado
6. ⏳ Follow-up automático

---

## Troubleshooting

### Erro: "Missing Supabase environment variables"

Verifique se `.env.local` existe e está preenchido.

### Erro: "relation 'leads' does not exist"

Execute o SQL de setup no Supabase.

### Erro: "duplicate key value violates unique constraint"

Email já foi cadastrado no mesmo dia. Comportamento esperado.

---

## Contato

Dúvidas: contato@4core.com.br
