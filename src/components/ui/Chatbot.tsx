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
          content: 'Olá! 👋 Sou o assistente virtual da 4Core. Estou aqui para te ajudar a encontrar a melhor solução de controle de ponto e acesso para sua empresa. Como posso te ajudar hoje?',
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
        className="fixed bottom-4 right-4 w-16 h-16 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg flex items-center justify-center text-white text-2xl transition-all duration-300 hover:scale-110 z-50"
        aria-label="Abrir chat"
      >
        💬
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <h3 className="font-bold">Assistente 4Core</h3>
            <p className="text-xs text-purple-100">Online agora</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-purple-800 rounded-full w-8 h-8 flex items-center justify-center transition"
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
                  <div
                    key={idx}
                    className="bg-white border border-purple-200 rounded-lg p-3 text-sm"
                  >
                    <h4 className="font-bold text-purple-600 mb-1">{solution.name}</h4>
                    <p className="text-gray-600 text-xs mb-2">{solution.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>💰 {solution.priceRange}</span>
                      <span>⏱️ {solution.implementationTime}</span>
                    </div>
                  </div>
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
