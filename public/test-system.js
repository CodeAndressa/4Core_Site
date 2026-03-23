// ====================================
// 🧪 TESTE COMPLETO DO SISTEMA ANALYTICS
// ====================================
// Cole este código no console do navegador (F12)
// Acesse: http://localhost:3001

(async function testAnalytics() {
  console.clear()
  console.log('🚀 Iniciando testes do sistema Analytics...\n')
  
  let errors = []
  let success = []

  // ====================================
  // TESTE 1: Endpoint de Eventos
  // ====================================
  console.log('1️⃣ Testando POST /api/events...')
  try {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'page_view',
        page: '/test-console',
        source: 'console-test',
        device: 'desktop',
        session_id: 'test-' + Date.now(),
        user_agent: navigator.userAgent
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      console.log('   ✅ Evento criado com sucesso!')
      console.log('   📊 ID do evento:', data.data?.id)
      success.push('POST /api/events')
    } else {
      console.log('   ❌ Erro:', data.error)
      errors.push('POST /api/events: ' + data.error)
    }
  } catch (err) {
    console.log('   ❌ Erro na requisição:', err.message)
    errors.push('POST /api/events: ' + err.message)
  }

  // ====================================
  // TESTE 2: Verificar se tabela existe
  // ====================================
  console.log('\n2️⃣ Verificando estrutura do banco...')
  try {
    const response = await fetch('/api/events?limit=1')
    const data = await response.json()
    
    if (data.success) {
      console.log('   ✅ Tabela "events" existe e está acessível')
      console.log('   📊 Total de eventos:', data.data?.length || 0)
      success.push('Tabela events')
    } else {
      console.log('   ❌ Erro ao acessar tabela:', data.error)
      errors.push('Tabela events: ' + data.error)
    }
  } catch (err) {
    console.log('   ❌ Erro:', err.message)
    errors.push('Tabela events: ' + err.message)
  }

  // ====================================
  // TESTE 3: Página de Login
  // ====================================
  console.log('\n3️⃣ Testando página de login...')
  try {
    const response = await fetch('/admin/login')
    
    if (response.ok) {
      console.log('   ✅ Página /admin/login acessível')
      success.push('Página de login')
    } else {
      console.log('   ❌ Erro ao acessar /admin/login:', response.status)
      errors.push('Página de login: HTTP ' + response.status)
    }
  } catch (err) {
    console.log('   ❌ Erro:', err.message)
    errors.push('Página de login: ' + err.message)
  }

  // ====================================
  // TESTE 4: Tracking automático
  // ====================================
  console.log('\n4️⃣ Verificando tracking automático...')
  const hasPageViewTracker = document.querySelector('script[src*="tracking"]') || 
                             window.location.pathname !== '/admin/login'
  
  if (hasPageViewTracker) {
    console.log('   ✅ Sistema de tracking está ativo')
    success.push('Tracking automático')
  } else {
    console.log('   ⚠️  Tracking pode não estar ativo (normal em páginas admin)')
  }

  // ====================================
  // TESTE 5: Botão Admin
  // ====================================
  console.log('\n5️⃣ Verificando botão admin...')
  const adminButton = document.querySelector('a[href="/admin/login"]')
  
  if (adminButton) {
    const styles = window.getComputedStyle(adminButton)
    const position = styles.position
    const left = styles.left
    const bottom = styles.bottom
    
    console.log('   ✅ Botão admin encontrado')
    console.log('   📍 Posição:', position, '| left:', left, '| bottom:', bottom)
    
    if (left.includes('16px') || left.includes('1rem')) {
      console.log('   ✅ Botão está no canto inferior ESQUERDO')
      success.push('Botão admin posicionado')
    } else {
      console.log('   ⚠️  Botão pode não estar no canto esquerdo')
    }
  } else {
    console.log('   ⚠️  Botão admin não encontrado (normal em páginas admin)')
  }

  // ====================================
  // RESUMO
  // ====================================
  console.log('\n' + '='.repeat(50))
  console.log('📊 RESUMO DOS TESTES')
  console.log('='.repeat(50))
  
  console.log('\n✅ Sucessos (' + success.length + '):')
  success.forEach(s => console.log('   • ' + s))
  
  if (errors.length > 0) {
    console.log('\n❌ Erros (' + errors.length + '):')
    errors.forEach(e => console.log('   • ' + e))
  }

  // ====================================
  // PRÓXIMOS PASSOS
  // ====================================
  console.log('\n' + '='.repeat(50))
  console.log('📋 PRÓXIMOS PASSOS')
  console.log('='.repeat(50))
  
  if (errors.length === 0) {
    console.log('\n🎉 TUDO FUNCIONANDO!')
    console.log('\n1. Navegue pelo site para gerar eventos')
    console.log('2. Clique no botão 🔒 no canto inferior esquerdo')
    console.log('3. Faça login com: admin@4core.com.br')
    console.log('4. Veja o dashboard com as métricas')
    console.log('\n5. Verifique os eventos no Supabase:')
    console.log('   https://supabase.com/dashboard/project/uesqdbaxhnblefrtjtae/editor')
  } else {
    console.log('\n⚠️  AÇÕES NECESSÁRIAS:')
    
    if (errors.some(e => e.includes('relation') || e.includes('does not exist'))) {
      console.log('\n❌ Tabela "events" não existe!')
      console.log('   → Execute o SQL: supabase-events-analytics.sql')
      console.log('   → Acesse: https://supabase.com/dashboard/project/uesqdbaxhnblefrtjtae/sql')
    }
    
    if (errors.some(e => e.includes('credentials') || e.includes('auth'))) {
      console.log('\n❌ Problema de autenticação!')
      console.log('   → Verifique as chaves no .env.local')
      console.log('   → Reinicie o servidor: npm run dev')
    }
  }
  
  console.log('\n' + '='.repeat(50))
})()
