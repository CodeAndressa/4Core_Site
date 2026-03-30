# 📱 Contatos Comerciais Centralizados

Este documento descreve como os contatos comerciais estão organizados no projeto.

## Estrutura

Todos os contatos comerciais estão **centralizados em `src/data/contacts.ts`**.

### Números Disponíveis

| Tipo | Número | Uso |
|------|--------|-----|
| **Primary** | `5541988035657` | Contato comercial padrão |
| **Secondary** | `5541988476431` | Alternar para variação de contatos |
| **Suporte** | `+55 41 98847-6431` | Suporte técnico (em `company.ts`) |

## Como Usar

### 1. Para obter um número com alternância automática:

```typescript
import { getCommercialNumber } from '@/data/contacts'

// Alterna automaticamente baseado na página
const number = getCommercialNumber()

// Ou escolher explicitamente
const primary = getCommercialNumber(false)  // 5541988035657
const secondary = getCommercialNumber(true)  // 5541988476431
```

### 2. Para acessar os números diretos:

```typescript
import { commercialContacts } from '@/data/contacts'

console.log(commercialContacts.primary)    // 5541988035657
console.log(commercialContacts.secondary)  // 5541988476431
```

### 3. Obter todos os números:

```typescript
import { getAllCommercialNumbers } from '@/data/contacts'

const allNumbers = getAllCommercialNumbers()
// ['5541988035657', '5541988476431']
```

## Onde os Contatos Aparecem

✅ **Centralizados em `src/data/contacts.ts`**
- Número primary
- Número secondary

✅ **Definidos em `src/data/company.ts`**
- `company.whatsapp` → usa `getCommercialNumber()`
- `company.phone` → suporte técnico

✅ **Configuração de ambiente em `.env.example`**
- `NEXT_PUBLIC_WHATSAPP_NUMBER` → número comercial primary
- `NEXT_PUBLIC_WHATSAPP_MESSAGE` → mensagem padrão

✅ **Constantes em `src/lib/constants.ts`**
- `WHATSAPP_NUMBER` → lê do `.env.local` ou usa fallback

## Princípios

🚫 **NÃO ADICIONE números em:**
- Componentes React
- Páginas
- Hooks customizados
- Arquivos de configuração (exceto `contacts.ts`)

✅ **SEMPRE USE:**
- `src/data/contacts.ts` para números comerciais
- `src/data/company.ts` para dados gerais da empresa

## Como a Alternância Funciona

A função `getCommercialNumber()` alterna entre os dois números de forma **determinística**:

- **Client-side**: Usa o pathname atual (página visitada) para decidir qual número usar
- **Server-side**: Usa timestamp para variar

Isso garante que:
1. O mesmo usuário vê o mesmo número em uma página específica (consistência)
2. Diferentes páginas podem mostrar números diferentes
3. Ao longo do tempo, ambos os números recebem tráfego de forma balanceada

## Verificação

Para verificar se há números de telefone "soltos" no projeto:

```bash
grep -r "554[0-9]" src/ --include="*.ts" --include="*.tsx"
```

Resultado esperado: Apenas em `src/data/contacts.ts` e `src/data/company.ts`

## Variáveis de Ambiente

No seu `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5541988035657
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá! Gostaria de falar com um especialista da 4Core.
```

Se não configurar, o sistema usa automaticamente um dos números em `contacts.ts`.
