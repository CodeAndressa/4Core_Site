'use client'

import { useState, useRef, useEffect } from 'react'
import { ConversationState } from '@/lib/services/chatbotService'
import { Solution } from '@/lib/knowledgeBase'

interface Message {
  role: 'user' | 'assistant'
  content: string
  solutions?: Solution[]
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
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: result.data.message,
            solutions: result.data.solutions,
          },
        ])

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
        className="fixed bottom-32 right-4 group z-50"
        aria-label="Fale com a 4Core"
      >
        {/* Botão principal */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
          
          {/* Botão */}
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 transition-all duration-300 group-hover:scale-105">
            {/* Ícone IA */}
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
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
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
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
