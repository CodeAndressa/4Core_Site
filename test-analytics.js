// Script de teste - Execute no console do navegador (F12)
// Acesse: http://localhost:3001 e cole este código no console

console.log('🧪 Testando Sistema de Analytics...\n')

// 1. Verificar variáveis de ambiente
console.log('1️⃣ Verificando variáveis de ambiente:')
const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
const hasSupabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
console.log('   NEXT_PUBLIC_SUPABASE_URL:', hasSupabaseUrl ? '✅' : '❌')
console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', hasSupabaseKey ? '✅' : '❌')

// 2. Testar endpoint de eventos
console.log('\n2️⃣ Testando endpoint /api/events:')
fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'page_view',
    page: '/test',
    source: 'console-test',
    device: 'desktop',
    session_id: 'test-' + Date.now(),
  })
})
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('   ✅ Evento criado com sucesso!')
      console.log('   Dados:', data.data)
    } else {
      console.log('   ❌ Erro ao criar evento:', data.error)
    }
  })
  .catch(err => {
    console.log('   ❌ Erro na requisição:', err.message)
  })

// 3. Verificar tracking
console.log('\n3️⃣ Verificando funções de tracking:')
console.log('   trackPageView:', typeof window.trackPageView !== 'undefined' ? '✅' : '⚠️ (normal)')
console.log('   trackEvent:', typeof window.trackEvent !== 'undefined' ? '✅' : '⚠️ (normal)')

// 4. Instruções
console.log('\n📋 Próximos passos:')
console.log('   1. Navegue pelas páginas do site')
console.log('   2. Clique no botão WhatsApp')
console.log('   3. Envie o formulário de contato')
console.log('   4. Acesse o Supabase e veja os eventos na tabela "events"')
console.log('   5. Faça login em /admin/login')
console.log('   6. Veja o dashboard em /admin/dashboard')

console.log('\n✅ Teste concluído!')
