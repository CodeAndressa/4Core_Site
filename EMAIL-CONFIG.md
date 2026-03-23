# Configuração de E-mail - Hostinger

## Credenciais configuradas

O sistema usa a conta `comercial@4core.site` tanto para enviar quanto para receber os leads:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=comercial@4core.site
SMTP_PASS=4C0R3@senha2026
CONTACT_EMAIL=comercial@4core.site
```

## Configurar no Vercel (Produção)

1. Acesse o [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione o projeto **4Core_Site**
3. Vá em **Settings** > **Environment Variables**
4. Adicione as seguintes variáveis:

| Nome | Valor |
|------|-------|
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `comercial@4core.site` |
| `SMTP_PASS` | `4C0R3@senha2026` |
| `CONTACT_EMAIL` | `comercial@4core.site` |

5. Clique em **Save**
6. Faça um novo deploy (Deployments > ... > Redeploy)

## Formato do e-mail enviado

Quando um lead preencher o formulário, o e-mail `comercial@4core.site` receberá:

```
Assunto: Novo lead - Site 4Core
De: Site 4Core <comercial@4core.site>
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

1. O `.env.local` já está configurado com as credenciais
2. Rode o servidor: `npm run dev`
3. Acesse: http://localhost:3000/contato
4. Preencha e envie o formulário
5. Verifique se o e-mail chegou em `comercial@4core.site`

## Troubleshooting

### Erro: "Falha ao enviar e-mail"

**Possíveis causas:**
- Senha incorreta no `SMTP_PASS`
- Porta bloqueada (tente usar porta `465` com `secure: true`)
- Limite de envio atingido na Hostinger

**Solução:**
1. Verifique se a senha está correta
2. Se necessário, altere a porta para 465 no arquivo `src/lib/email.ts`:
   ```typescript
   port: 465,
   secure: true,
   ```

### E-mail não chega

**Verifique:**
- Caixa de spam
- Logs do servidor (console do terminal onde roda `npm run dev`)
- Se a conta `comercial@4core.site` está ativa na Hostinger

## Fluxo completo

1. Lead preenche formulário em `/contato`
2. Sistema valida os dados
3. Lead é salvo no Supabase (tabela `leads`)
4. E-mail é enviado para `comercial@4core.site`
5. Lead recebe mensagem de sucesso

## Próximos passos (opcional)

- Configurar SPF, DKIM e DMARC na Hostinger para melhorar deliverability
- Adicionar autoresponder para o lead (e-mail de confirmação)
- Integrar com n8n para automação de follow-up
