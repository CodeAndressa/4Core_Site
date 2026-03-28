'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { KanbanColumn } from './KanbanColumn'
import { LeadCard } from './LeadCard'
import { LeadDetail } from './LeadDetail'
import { Lead, LeadStatus } from '@/types/lead'
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react'

const COLUMNS: { id: LeadStatus; title: string }[] = [
  { id: 'new', title: 'Novos Leads' },
  { id: 'contacting', title: 'Em Atendimento' },
  { id: 'no_response', title: 'Sem Resposta' },
  { id: 'closed', title: 'Negócio Fechado' },
  { id: 'invalid', title: 'Lead Inválido' },
]

export function KanbanBoard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeLead, setActiveLead] = useState<Lead | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/leads')
      const data = await res.json()
      if (data.success) {
        setLeads(data.data)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Erro ao carregar leads')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeads()
    // Polling opcional
    const interval = setInterval(fetchLeads, 60000) // 1 min
    return () => clearInterval(interval)
  }, [fetchLeads])

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8,
        },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Lead') {
      setActiveLead(event.active.data.current.lead)
    }
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveALead = active.data.current?.type === 'Lead'
    const isOverALead = over.data.current?.type === 'Lead'
    const isOverAColumn = over.data.current?.type === 'Column'

    if (!isActiveALead) return

    // Arrastando lead sobre outro lead
    if (isActiveALead && isOverALead) {
      setLeads((leads) => {
        const activeIndex = leads.findIndex((l) => l.id === activeId)
        const overIndex = leads.findIndex((l) => l.id === overId)

        if (leads[activeIndex].status !== leads[overIndex].status) {
          const newLeads = [...leads]
          newLeads[activeIndex] = {
            ...newLeads[activeIndex],
            status: newLeads[overIndex].status,
          }
          return arrayMove(newLeads, activeIndex, overIndex)
        }

        return arrayMove(leads, activeIndex, overIndex)
      })
    }

    // Arrastando lead sobre uma coluna vazia
    if (isActiveALead && isOverAColumn) {
      setLeads((leads) => {
        const activeIndex = leads.findIndex((l) => l.id === activeId)
        const newLeads = [...leads]
        newLeads[activeIndex] = {
          ...newLeads[activeIndex],
          status: overId as LeadStatus,
        }
        return arrayMove(newLeads, activeIndex, activeIndex)
      })
    }
  }

  const onDragEnd = async (event: DragEndEvent) => {
    setActiveLead(null)
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id
    
    // Encontrar o lead final e o novo status
    const movedLead = leads.find(l => l.id === activeId)
    if (!movedLead) return

    // Persistir no banco
    try {
      const res = await fetch(`/api/admin/leads/${activeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: movedLead.status }),
      })
      
      const data = await res.json()
      if (!data.success) {
        // Rollback se falhar
        fetchLeads()
        alert('Erro ao salvar alteração. Recarregando dados...')
      }
    } catch (err) {
       fetchLeads()
       alert('Erro de conexão ao salvar alteração.')
    }
  }

  const groupedLeads = useMemo(() => {
    return COLUMNS.reduce((acc, col) => {
      acc[col.id] = leads.filter((l) => l.status === col.id)
      return acc
    }, {} as Record<LeadStatus, Lead[]>)
  }, [leads])

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailOpen(true)
  }

  if (loading && leads.length === 0) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center gap-4 text-slate-500 bg-white shadow-xl rounded-2xl border border-slate-100">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="font-bold text-lg animate-pulse">Carregando Funil Comercial...</p>
      </div>
    )
  }

  if (error) {
    return (
       <div className="h-[400px] flex flex-col items-center justify-center gap-4 text-red-500 bg-red-50 rounded-2xl border border-red-100 p-8 shadow-inner">
         <AlertCircle className="w-12 h-12" />
         <div className="text-center">
           <h3 className="font-bold text-xl mb-1">Erro de Conexão</h3>
           <p className="text-sm opacity-80">{error}</p>
         </div>
         <button 
           onClick={fetchLeads}
           className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-bold shadow-lg hover:bg-red-700 transition-all flex items-center gap-2"
         >
           Tentar Novamente
         </button>
       </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden p-2">
      {/* Kanban Board Layout */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-6 h-full min-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              leads={groupedLeads[col.id] || []}
              onLeadClick={handleLeadClick}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeLead ? (
            <div className="w-[280px] rotate-3 cursor-grabbing shadow-2xl scale-105 transition-transform">
              <LeadCard lead={activeLead} onClick={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <LeadDetail 
        lead={selectedLead}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  )
}
