'use client'

import { useState } from 'react'
import { MessageCircle, X, HelpCircle, Bot, User } from 'lucide-react'
import { CONTACTS } from '@/lib/constants/contacts'

interface FloatingContactMenuProps {
  onOpenChatbot: () => void
}

export function FloatingContactMenu({ onOpenChatbot }: FloatingContactMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      id: 'comercial',
      href: CONTACTS.comercial[0].whatsapp,
      label: 'Consultar Especialista',
      description: 'Vendas e orçamentos',
      icon: <User className="w-5 h-5" />,
      color: '#25D366'
    },
    {
      id: 'suporte',
      href: CONTACTS.suporte.whatsapp,
      label: 'Suporte Técnico',
      description: 'Dúvidas e chamados',
      icon: <HelpCircle className="w-5 h-5" />,
      color: '#7B00FF'
    },
    {
      id: 'chatbot',
      onClick: () => {
        onOpenChatbot()
        setIsOpen(false)
      },
      label: 'Assistente 4Core',
      description: 'Dúvidas rápidas (IA)',
      icon: <Bot className="w-5 h-5" />,
      color: '#4F46E5'
    }
  ]

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
    pointerEvents: 'auto',
    visibility: 'visible',
    opacity: 1,
  }

  const buttonStyle: React.CSSProperties = {
    position: 'relative',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#7B00FF',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 8px 30px rgba(123, 0, 255, 0.4)',
    transition: 'all 200ms ease-in-out',
    fontSize: '0px',
    padding: '0px',
    visibility: 'visible',
    opacity: 1,
    zIndex: 9999,
  }

  const menuItemContainerStyle: React.CSSProperties = {
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
    visibility: 'visible',
    opacity: 1,
  }

  const menuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f3f4f6',
    minWidth: '220px',
    cursor: 'pointer',
    transition: 'all 200ms ease-in-out',
    textDecoration: 'none',
    color: 'inherit',
  }

  const iconContainerStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  }

  const textContainerStyle: React.CSSProperties = {
    textAlign: 'left',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0px',
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0px',
  }

  return (
    <div style={containerStyle}>
      {/* Menu Items */}
      <div style={menuItemContainerStyle}>
        {menuItems.map((item) => (
          item.href ? (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={menuItemStyle}
            >
              <div 
                style={{
                  ...iconContainerStyle,
                  backgroundColor: item.color,
                }}
              >
                {item.icon}
              </div>
              <div style={textContainerStyle}>
                <p style={labelStyle}>{item.label}</p>
                <p style={descriptionStyle}>{item.description}</p>
              </div>
            </a>
          ) : (
            <button
              key={item.id}
              onClick={item.onClick}
              style={menuItemStyle}
              type="button"
            >
              <div 
                style={{
                  ...iconContainerStyle,
                  backgroundColor: item.color,
                }}
              >
                {item.icon}
              </div>
              <div style={textContainerStyle}>
                <p style={labelStyle}>{item.label}</p>
                <p style={descriptionStyle}>{item.description}</p>
              </div>
            </button>
          )
        ))}
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={buttonStyle}
        type="button"
        aria-label="Menu de contatos"
        aria-expanded={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isOpen ? (
            <X size={28} color="white" />
          ) : (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={28} color="white" />
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '16px',
                height: '16px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                border: '2px solid #7B00FF',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }} />
            </div>
          )}
        </div>
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        button:hover {
          box-shadow: 0 12px 40px rgba(123, 0, 255, 0.6);
          transform: scale(1.1);
        }
        a:hover, button:not([aria-label]) { 
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  )
}
