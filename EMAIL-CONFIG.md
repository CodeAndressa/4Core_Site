# Configuração de E-mail - Hostinger

## Credenciais necessárias

Para o envio de e-mails funcionar, você precisa configurar as seguintes variáveis no arquivo `.env.local`:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@4core.site
SMTP_PASS=<senha-do-email-noreply>
CONTACT_EMAIL=comercial@4core.site
```

## Passos para configurar

### 1. Criar o e-mail noreply@4core.site na Hostinger

1. Acesse o painel da Hostinger
2. Vá em **E-mails** > **Contas de E-mail**
3. Crie a conta `noreply@4core.site` com uma senha forte
4. Anote a senha

### 2. Atualizar o arquivo .env.local

Edite o arquivo `.env.local` e substitua `<sua-senha-aqui>` pela senha real do e-mail `noreply@4core.site`.

### 3. Configurar no Vercel (Produção)

1. Acesse o [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione o projeto **4Core_Site**
3. Vá em **Settings** > **Environment Variables**
4. Adicione as seguintes variáveis:

| Nome | Valor |
|------|-------|
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `noreply@4core.site` |
| `SMTP_PASS` | `<senha-real>` |
| `CONTACT_EMAIL` | `comercial@4core.site` |

5. Clique em **Save**
6. Faça um novo deploy (ou aguarde o próximo push)

## Formato do e-mail enviado

Quando um lead preencher o formulário, o e-mail `comercial@4core.site` receberá:

```
Assunto: Novo lead - Site 4Core
De: Site 4Core <noreply@4core.site>
Responder para: <email-do-lead>

Site 4Core

Recebemos um novo cadastro via site.

Nome: [Nome do lead]
Nome empresa: [Empresa]
Telefone: [Telefone]
E-mail: [E-mail]
Nº de Funcionários: [Faixa]
Mensagem: [Mensagem]
```

## Testando localmente

1. Configure o `.env.local` com as credenciais reais
2. Rode o servidor: `npm run dev`
3. Acesse: http://localhost:3000/contato
4. Preencha e envie o formulário
5. Verifique se o e-mail chegou em `comercial@4core.site`

## Troubleshooting

### Erro: "Falha ao enviar e-mail"

**Possíveis causas:**
- Senha incorreta no `SMTP_PASS`
- E-mail `noreply@4core.site` não existe na Hostinger
- Porta bloqueada (tente usar porta `465` com `secure: true`)

**Solução:**
1. Verifique se o e-mail existe no painel da Hostinger
2. Confirme que a senha está correta
3. Se necessário, altere a porta para 465 no arquivo `src/lib/email.ts`:
   ```typescript
   port: 465,
   secure: true,
   ```

### E-mail não chega em comercial@4core.site

**Verifique:**
- Caixa de spam
- Se o e-mail `comercial@4core.site` existe e está ativo
- Logs do servidor (console do terminal onde roda `npm run dev`)

## Próximos passos (opcional)

- Configurar SPF, DKIM e DMARC na Hostinger para melhorar deliverability
- Adicionar autoresponder para o lead (e-mail de confirmação)
- Integrar com n8n para automação de follow-up
