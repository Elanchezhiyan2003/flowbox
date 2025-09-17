import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, Sparkles, Download, ChevronLeft, ChevronRight, Columns3, LayoutPanelTop, CalendarDays, BarChart3, User as UserIcon } from "lucide-react";

const members = [
  { id: 'u1', name: 'Sarah', initials: 'SR', color: 'bg-purple-100 text-purple-700' },
  { id: 'u2', name: 'John', initials: 'JN', color: 'bg-teal-100 text-teal-700' },
  { id: 'u3', name: 'Mia', initials: 'MA', color: 'bg-rose-100 text-rose-700' },
];

type View = 'canvas'|'tasks'|'timeline'|'reports';

type KanbanStatus = 'To Do'|'In Progress'|'Done';

export default function Team() {
  const [tab, setTab] = useState<View>('canvas');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [teamName, setTeamName] = useState('Team Flowboard');
  const [isEditingName, setIsEditingName] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Build project landing page', assignee: 'u1', due: '2025-10-08', status: 'To Do' as KanbanStatus },
    { id: 't2', title: 'Backend Setup', assignee: 'u2', due: '2025-10-15', status: 'In Progress' as KanbanStatus },
    { id: 't3', title: 'Write shared docs', assignee: 'u3', due: '2025-10-12', status: 'To Do' as KanbanStatus },
    { id: 't4', title: 'Design mockups', assignee: 'u1', due: '2025-10-09', status: 'Done' as KanbanStatus },
  ]);
  const moveTask = (id: string, to: KanbanStatus) => setTasks(prev => prev.map(t => t.id===id ? {...t, status: to} : t));

  const [canvasItems, setCanvasItems] = useState([
    { id: 'c1', type: 'TASK', title: 'Build project landing page', pos:{x:120,y:120} },
    { id: 'c2', type: 'NOTE', title: 'Brainstorm features', pos:{x:420,y:160} },
    { id: 'c3', type: 'RESOURCE', title: 'Link: Design mockups', pos:{x:220,y:320} },
    { id: 'c4', type: 'DAILY_LOG', title: 'Daily standup notes', pos:{x:520,y:240} },
  ]);
  const addCanvasItem = (type: 'TASK'|'NOTE'|'RESOURCE'|'DAILY_LOG') => setCanvasItems(prev => ([...prev, { id:String(Date.now()), type, title:`New ${type}`, pos:{x:150+Math.random()*300,y:150+Math.random()*200} }]));

  const timeline = useMemo(() => ([
    { week: 1, title: 'UI Design', assignedTo: 'Sarah' },
    { week: 2, title: 'Backend Setup', assignedTo: 'John' },
    { week: 3, title: 'Integration & QA', assignedTo: 'Team' },
  ]), []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {!sidebarCollapsed && (<Button variant="ghost" size="icon" onClick={()=>setSidebarCollapsed(true)}><ChevronLeft className="h-4 w-4" /></Button>)}
            <div className="flex items-center space-x-3">
              {sidebarCollapsed && (<Button variant="ghost" size="icon" onClick={()=>setSidebarCollapsed(false)}><ChevronRight className="h-4 w-4" /></Button>)}
              {isEditingName ? (
                <Input value={teamName} onChange={(e)=>setTeamName(e.target.value)} onBlur={()=>setIsEditingName(false)} onKeyDown={(e)=>{ if(e.key==='Enter') setIsEditingName(false); }} className="text-xl font-bold border-none bg-transparent p-0 h-auto" autoFocus />
              ) : (
                <h1 className="text-xl font-bold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" onClick={()=>setIsEditingName(true)}>{teamName}</h1>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline"><Users className="h-4 w-4 mr-2" /> Invite</Button>
            <Button className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600"><Sparkles className="h-4 w-4 mr-2" /> AI Timeline</Button>
            <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.aside initial={{width:0, opacity:0}} animate={{width:280, opacity:1}} exit={{width:0, opacity:0}} transition={{duration:0.3}} className="bg-white border-r overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Workspace</h2>
                <div className="space-y-2">
                  <Button variant={tab==='canvas'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('canvas')}><LayoutPanelTop className="h-4 w-4 mr-3" /> Canvas</Button>
                  <Button variant={tab==='tasks'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('tasks')}><Columns3 className="h-4 w-4 mr-3" /> Tasks</Button>
                  <Button variant={tab==='timeline'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('timeline')}><CalendarDays className="h-4 w-4 mr-3" /> Timeline</Button>
                  <Button variant={tab==='reports'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('reports')}><BarChart3 className="h-4 w-4 mr-3" /> Reports</Button>
                </div>
                <Separator className="my-6" />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
                  <div className="flex flex-wrap gap-2">{members.map(m => (<div key={m.id} className={`px-2 py-1 rounded-full text-xs ${m.color}`}>{m.initials}</div>))}</div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {tab==='canvas' && (
              <motion.div key="canvas" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}} className="h-full relative bg-slate-50">
                <div className="h-full overflow-auto p-6">
                  <div className="relative min-h-full">
                    {canvasItems.map((it,i)=> (
                      <motion.div key={it.id} initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{duration:0.25, delay:i*0.05}} className="absolute" style={{ left: it.pos.x, top: it.pos.y }}>
                        <Card className="w-64 hover:shadow-lg transition-all duration-200">
                          <CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-sm">{it.title}</CardTitle><div className="flex -space-x-1">{members.slice(0,2).map(m => (<div key={m.id} className={`h-6 w-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] ${m.color}`}>{m.initials}</div>))}</div></div></CardHeader>
                          <CardContent className="pt-0"><Badge variant="secondary" className="text-xs">{it.type}</Badge></CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-6 right-6"><Button size="icon" className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 shadow-lg" onClick={()=>addCanvasItem('TASK')}><Plus className="h-6 w-6" /></Button></div>
              </motion.div>
            )}

            {tab==='tasks' && (
              <motion.div key="tasks" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                  {(['To Do','In Progress','Done'] as KanbanStatus[]).map(col => (
                    <div key={col} className="bg-white rounded-xl border shadow-sm p-4">
                      <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">{col}</h3><Badge variant="secondary">{tasks.filter(t=>t.status===col).length}</Badge></div>
                      <div className="space-y-3">
                        {tasks.filter(t=>t.status===col).map((t, idx) => (
                          <motion.div key={t.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.2, delay: idx*0.05}}>
                            <Card className="hover:shadow-md transition-shadow">
                              <CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-sm">{t.title}</CardTitle><div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">{(members.find(m=>m.id===t.assignee)?.initials) || <UserIcon className="h-3 w-3" />}</div></div></CardHeader>
                              <CardContent className="pt-0"><CardDescription className="text-xs">Due {new Date(t.due).toLocaleDateString()}</CardDescription><div className="flex items-center gap-2 mt-2">{(['To Do','In Progress','Done'] as KanbanStatus[]).filter(s=>s!==col).map(s => (<Button key={s} size="sm" variant="outline" onClick={()=>moveTask(t.id, s)}>Move to {s}</Button>))}</div></CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab==='timeline' && (
              <motion.div key="timeline" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 h-full overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-6">Team Timeline</h2>
                  <div className="space-y-3">{timeline.map((m,i)=>(<motion.div key={m.week} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.25, delay:i*0.05}}><Card className="hover:shadow-md transition-shadow"><CardHeader className="pb-2"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold">{m.week}</div><div><CardTitle className="text-base">{m.title}</CardTitle><CardDescription className="text-xs">Assigned to {m.assignedTo}</CardDescription></div></div><Badge variant="secondary">Week {m.week}</Badge></div></CardHeader></Card></motion.div>))}</div>
                </div>
              </motion.div>
            )}

            {tab==='reports' && (
              <motion.div key="reports" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
                  <h2 className="text-2xl font-bold mb-6">Team Productivity</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card><CardHeader><CardTitle>Tasks Completed</CardTitle></CardHeader><CardContent><div className="text-4xl font-bold text-purple-600">64%</div><div className="w-full h-2 bg-muted rounded-full mt-3"><div className="h-2 bg-purple-500 rounded-full" style={{width:'64%'}} /></div></CardContent></Card>
                    <Card><CardHeader><CardTitle>Active Contributors</CardTitle></CardHeader><CardContent><div className="flex -space-x-2">{members.map(m => (<div key={m.id} className={`h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-xs ${m.color}`}>{m.initials}</div>))}</div><CardDescription className="mt-2">{members.length} members this week</CardDescription></CardContent></Card>
                    <Card><CardHeader><CardTitle>Weekly Progress</CardTitle></CardHeader><CardContent><div className="h-24 w-full bg-gradient-to-r from-teal-100 to-purple-100 rounded" /><CardDescription className="mt-2">Mock chart placeholder</CardDescription></CardContent></Card>
                  </div>
                  <Separator className="my-8" />
                  <div className="flex items-center gap-3"><Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export PDF</Button><Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export CSV</Button></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
