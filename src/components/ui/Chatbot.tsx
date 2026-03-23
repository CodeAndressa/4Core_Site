'use client'

import { useState, useRef, useEffect } from 'react'
import { ConversationState } from '@/lib/services/chatbotService'
import { Solution } from '@/lib/knowledgeBase'
import { company } from '@/data/company'

interface Message {
  role: 'user' | 'assistant'
  content: string
  solutions?: Solution[]
  showContactButtons?: boolean
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationState, setConversationState] = useState<ConversationState | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensagem de boas-vindas
      setMessages([
        {
          role: 'assistant',
          content: 'Oi! 👋 Sou o assistente da 4Core. Como posso te ajudar hoje?',
        },
      ])
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setLoading(true)

    // Adicionar mensagem do usuário
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationState,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Adicionar resposta do assistente
        const newMessage: Message = {
          role: 'assistant',
          content: result.data.message,
          solutions: result.data.solutions,
        }
        
        // Se o lead foi capturado ou conversa tem mais de 6 mensagens, mostrar botões de contato
        if (result.data.conversationState?.leadCaptured || messages.length >= 6) {
          newMessage.showContactButtons = true
        }
        
        setMessages(prev => [...prev, newMessage])

        // Atualizar estado da conversa
        setConversationState(result.data.conversationState)
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: 'Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?',
          },
        ])
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Desculpe, estou com dificuldades técnicas. Tente novamente em instantes.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 group z-50"
        aria-label="Fale com a 4Core"
      >
        {/* Botão principal */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
          
          {/* Botão */}
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 transition-all duration-300 group-hover:scale-105">
            {/* Logo */}
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5">
                <img src="/favicon.ico" alt="4Core" className="w-full h-full object-contain" />
              </div>
              {/* Pulse indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            {/* Texto */}
            <div className="text-left">
              <div className="text-white font-bold text-sm">Fale com a 4Core</div>
              <div className="text-purple-100 text-xs">Atendimento inteligente</div>
            </div>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5">
            <img src="/favicon.ico" alt="4Core" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="font-bold">4Core</h3>
            <p className="text-xs text-purple-100 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Atendimento inteligente
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={index}>
            <div
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>

            {/* Soluções sugeridas */}
            {message.solutions && message.solutions.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.solutions.map((solution, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511984295040'
                      const whatsappMessage = encodeURIComponent(
                        `Olá! Gostaria de falar com um especialista sobre ${solution.name}`
                      )
                      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank')
                    }}
                    className="w-full bg-white border-2 border-purple-200 hover:border-purple-400 rounded-lg p-3 text-left transition-all hover:shadow-md group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-purple-600 mb-1 text-sm group-hover:text-purple-700">
                          {solution.name}
                        </h4>
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                          {solution.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Falar com especialista
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-600 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* Botões de contato */}
            {message.showContactButtons && (
              <div className="mt-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                  👋 Fale com um especialista:
                </p>
                <div className="space-y-2">
                  {/* WhatsApp 1 - Comercial */}
                  <button
                    onClick={() => {
                      const message = encodeURIComponent('Olá! Vim do chat do site e gostaria de falar com um especialista.')
                      window.open(`https://wa.me/5511984295040?text=${message}`, '_blank')
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-all font-medium text-sm shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp Comercial
                  </button>
                  
                  {/* WhatsApp 2 - Suporte */}
                  <button
                    onClick={() => {
                      const message = encodeURIComponent('Olá! Vim do chat do site e gostaria de falar com um especialista.')
                      window.open(`https://wa.me/${company.whatsapp}?text=${message}`, '_blank')
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-all font-medium text-sm shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp Suporte
                  </button>
                  
                  {/* Email */}
                  <button
                    onClick={() => {
                      window.location.href = 'mailto:comercial@4core.site?subject=Contato via Chat do Site&body=Olá! Vim do chat do site e gostaria de falar com um especialista.'
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-all font-medium text-sm shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    comercial@4core.site
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
          >
            Enviar
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by Groq AI
        </p>
      </div>
    </div>
  )
}
