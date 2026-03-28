'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Building2, Calendar, Mail, Phone } from 'lucide-react'
import { Lead } from '@/types/lead'

interface LeadCardProps {
  lead: Lead
  onClick: (lead: Lead) => void
}

export function LeadCard({ lead, onClick }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lead.id,
    data: {
      type: 'Lead',
      lead,
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
  }

  const formattedDate = format(new Date(lead.created_at), "dd 'de' MMM", {
    locale: ptBR,
  })

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(lead)}
      className="group bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-grab active:cursor-grabbing mb-3"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-slate-900 text-sm truncate max-w-[140px]">
            {lead.name}
          </h4>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded flex items-center gap-1">
            <Calendar className="w-2.5 h-2.5" />
            {formattedDate}
          </span>
        </div>

        {lead.company && (
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{lead.company}</span>
          </div>
        )}

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
          {lead.phone && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{lead.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
