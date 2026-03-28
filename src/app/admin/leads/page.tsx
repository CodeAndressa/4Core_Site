import { KanbanBoard } from '@/components/admin/leads/KanbanBoard'
import { LayoutDashboard, Users, Filter, Download } from 'lucide-react'
import Link from 'next/link'

export default function LeadsAdminPage() {
  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 shrink-0 shadow-sm z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-indigo-100 shadow-xl">
             <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Gestão de Leads</h1>
            <p className="text-sm text-slate-500 font-medium">Pipeline Comercial Kanban • 4Core CRM</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
           <Link href="/admin/dashboard" className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 rounded-lg transition-colors">Analytics</Link>
           <Link href="/admin/leads" className="px-4 py-2 text-sm font-bold bg-white text-indigo-600 rounded-lg shadow-sm">Kanban (Leads)</Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-all border border-slate-200 shadow-sm">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md shadow-indigo-100">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden p-8">
        <div className="h-full">
           <KanbanBoard />
        </div>
      </main>
    </div>
  )
}
