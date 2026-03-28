'use client'

import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { LeadCard } from './LeadCard'
import { Lead, LeadStatus } from '@/types/lead'

interface KanbanColumnProps {
  id: LeadStatus
  title: string
  leads: Lead[]
  onLeadClick: (lead: Lead) => void
}

export function KanbanColumn({ id, title, leads, onLeadClick }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: 'Column',
      id,
    },
  })

  return (
    <div className="flex flex-col bg-slate-100/50 rounded-xl min-w-[280px] w-full max-w-[320px] h-full shadow-inner border border-slate-200">
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl shrink-0">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          {title}
          <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-medium">
            {leads.length}
          </span>
        </h3>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 p-3 overflow-y-auto min-h-[500px]"
      >
        <SortableContext
          id={id}
          items={leads.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onClick={onLeadClick} />
          ))}
          {leads.length === 0 && (
            <div className="h-24 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-xs italic">
              Nenhum lead aqui
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  )
}
