# 🌐 Configurar Domínio Customizado (4core.site)

Este guia mostra como conectar seu domínio 4core.site ao site na Vercel.

## 📋 Pré-requisitos

- ✅ Domínio `4core.site` já comprado
- ✅ Projeto hospedado na Vercel
- ✅ Acesso ao painel de controle do domínio (Hostinger, GoDaddy, etc)

---

## 🚀 Passo 1: Adicionar Domínio na Vercel

### 1. Acesse o Dashboard da Vercel

```
https://vercel.com/seu-usuario/4core/settings/domains
```

Ou:
1. Vá em: https://vercel.com
2. Selecione o projeto **4Core**
3. Vá em **Settings** (menu lateral)
4. Clique em **Domains**

### 2. Adicione o Domínio

1. Clique em **Add** ou **Add Domain**
2. Digite: `4core.site`
3. Clique em **Add**

### 3. Escolha um Método

Você verá 2 opções:

**Opção A: Mudar Nameservers (Mais Fácil)**
- Vercel fornecerá 4 nameservers
- Você alterará os nameservers no seu registrador
- Leva 24-48 horas para propagar

**Opção B: Registros DNS (Mais Rápido)**
- Você adicionará registros A/CNAME no seu registrador
- Leva 5-15 minutos

---

## 🔀 OPÇÃO A: Mudar Nameservers (Recomendado)

### 1. Copie os Nameservers da Vercel

Você verá algo como:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### 2. Vá para o Registrador (Hostinger/GoDaddy/etc)

**Se for Hostinger:**
1. Acesse: https://www.hostinger.com.br
2. Faça login na sua conta
3. Vá em **Meus Domínios** ou **Domains**
4. Clique em `4core.site`
5. Vá em **Nameservers** ou **DNS**
6. Altere para os nameservers da Vercel

### 3. Salve e Aguarde

- Clique em **Save** ou **Update**
- Aguarde 24-48 horas para propagação completa
- Você pode testar em: https://www.whatsmydns.net

---

## 📍 OPÇÃO B: Registros DNS (Mais Rápido)

### 1. Copie os Registros da Vercel

A Vercel mostrará registros como:
```
Type: A
Name: @
Value: 76.76.19.89
```

### 2. Vá para o Registrador

**Se for Hostinger:**
1. Acesse: https://www.hostinger.com.br
2. Faça login
3. Vá em **Meus Domínios** > `4core.site`
4. Clique em **Gerenciar DNS** ou **DNS Records**
5. Localize o registro `@` ou a raiz do domínio

### 3. Atualize os Registros

**Se o registro já existe:**
- Clique em **Edit** (lápis)
- Altere o valor `Value` para o que Vercel forneceu
- Clique em **Save**

**Se não existe:**
- Clique em **Add Record**
- Preencha:
  - **Type:** A (ou o tipo que Vercel indicou)
  - **Name:** @ (ou deixe em branco)
  - **Value:** (copie exatamente da Vercel)
  - **TTL:** 3600 (ou default)
- Clique em **Add**

### 4. Aguarde Propagação

- DNS leva 5-15 minutos para propagar
- Teste em: https://www.whatsmydns.net

---

## ✅ Verificar se Funcionou

### 1. Teste via Browser

Abra em seu navegador:
```
https://4core.site
```

Se aparecer seu site, funcionou! ✨

### 2. Teste DNS via Command Line

```bash
# No Terminal/PowerShell, execute:
nslookup 4core.site
# OU
dig 4core.site
```

Deve aparecer o IP da Vercel: `76.76.19.89` (aproximadamente)

### 3. Teste no Whatsmydns

Acesse: https://www.whatsmydns.net
- Digite: `4core.site`
- Veja o status em diferentes servidores DNS

---

## 🔧 Atualizar Variável de Ambiente

Após o domínio estar funcionando, atualize a variável na **Vercel**:

### 1. Vá em Settings > Environment Variables

```
https://vercel.com/seu-usuario/4core/settings/environment-variables
```

### 2. Edite `NEXT_PUBLIC_SITE_URL`

- Localize a variável: `NEXT_PUBLIC_SITE_URL`
- Altere de: `https://seu-dominio.vercel.app`
- Para: `https://4core.site`
- Clique em **Save**

### 3. Faça Redeploy

1. Vá em **Deployments**
2. Clique nos **3 pontinhos** do deployment
3. Clique em **Redeploy**
4. Aguarde concluir

---

## 🔐 HTTPS Automático

A Vercel automát icamente:
- ✅ Gera certificado SSL/TLS grátis
- ✅ Redireciona HTTP para HTTPS
- ✅ Renova certificado automaticamente

Nada a fazer! 🎉

---

## 🆘 Troubleshooting

### Domínio não funciona após 48h

1. Verifique se nameservers estão corretos:
   ```bash
   ns 4core.site
   ```

2. Limpe o cache DNS:
   - Chrome: chrome://net-internals/#dns > Clear host cache
   - Ou aguarde mais 24h

3. Verifique no Vercel se há algum erro

### HTTPS mostra erro

1. Aguarde 24h para certificado ser gerado
2. Verifique em Vercel > Domains se há "Issue"

### Email não funciona com novo domínio

Se tem email como `comercial@4core.site`:
1. Configure MX records no seu registrador
2. Aponte para seu servidor de e-mail (Hostinger)
3. Aguarde propagação

---

## 📚 Links Úteis

- **Vercel Docs:** https://vercel.com/docs/concepts/get-started/deploy
- **Hostinger Docs:** https://suporte.hostinger.com.br/
- **Whatsmydns:** https://www.whatsmydns.net
- **DNS Checker:** https://dnschecker.org

---

## ✨ Pronto!

Agora seu site está rodando em **https://4core.site** ! 🚀
