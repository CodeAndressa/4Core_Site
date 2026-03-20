'use client'

import { WhatsAppFloat } from './WhatsAppFloat'
import { CONTACTS } from '@/lib/constants/contacts'

const BUTTONS = [
  {
    href: CONTACTS.comercial[0].whatsapp,
    label: 'Comercial',
    color: '#25D366',
  },
  {
    href: CONTACTS.suporte.whatsapp,
    label: 'Suporte',
    color: '#7B00FF',
  },
]

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {BUTTONS.map((btn, i) => (
        <WhatsAppFloat key={btn.label} index={i} {...btn} />
      ))}
    </div>
  )
}
