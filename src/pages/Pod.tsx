import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, Sparkles, Download, ChevronLeft, ChevronRight, BookOpen, CalendarDays, BarChart3, ClipboardList, User as UserIcon } from "lucide-react";

const members = [
  { id: 'u1', name: 'Alex', initials: 'AX', color: 'bg-orange-100 text-orange-700' },
  { id: 'u2', name: 'Jamie', initials: 'JM', color: 'bg-blue-100 text-blue-700' },
  { id: 'u3', name: 'Riley', initials: 'RY', color: 'bg-amber-100 text-amber-700' },
];

type View = 'canvas'|'study'|'assignments'|'reports';

type Assignment = { id:string; title:string; assignee?:string; due:string; status:'Pending'|'In Progress'|'Done' };

export default function Pod() {
  const [tab, setTab] = useState<View>('canvas');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [podName, setPodName] = useState('My Learning Pod');
  const [isEditingName, setIsEditingName] = useState(false);

  const [canvasItems, setCanvasItems] = useState([
    { id: 'c1', type: 'ASSIGNMENT', title: 'Complete Python Day 01', pos:{x:120,y:120} },
    { id: 'c2', type: 'NOTE', title: 'Group notes: Functions & Loops', pos:{x:420,y:160} },
    { id: 'c3', type: 'RESOURCE', title: 'Drive link: Study slides', pos:{x:220,y:320} },
    { id: 'c4', type: 'POD_LOG', title: 'Group reflections for the week', pos:{x:520,y:240} },
  ]);
  const addCanvasItem = (type: 'ASSIGNMENT'|'NOTE'|'RESOURCE'|'POD_LOG') => setCanvasItems(prev => ([...prev, { id:String(Date.now()), type, title:`New ${type}`, pos:{x:150+Math.random()*300,y:150+Math.random()*200} }]));

  const [assignments, setAssignments] = useState<Assignment[]>([
    { id:'a1', title:'Complete Python Day 01', assignee:'u1', due:'2025-10-09', status:'Pending' },
    { id:'a2', title:'Group notes: Functions & Loops', assignee:'u2', due:'2025-10-10', status:'In Progress' },
    { id:'a3', title:'Study slides summary', assignee:'u3', due:'2025-10-12', status:'Done' },
  ]);
  const setStatus = (id:string, status:Assignment['status']) => setAssignments(prev => prev.map(a => a.id===id ? {...a, status} : a));

  const milestones = useMemo(() => ([
    { week:1, title:'Basics', assigned:'All' },
    { week:2, title:'OOP', assigned:'Team A' },
    { week:3, title:'Mini Project', assigned:'Team B' },
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
                <Input value={podName} onChange={(e)=>setPodName(e.target.value)} onBlur={()=>setIsEditingName(false)} onKeyDown={(e)=>{ if(e.key==='Enter') setIsEditingName(false); }} className="text-xl font-bold border-none bg-transparent p-0 h-auto" autoFocus />
              ) : (
                <h1 className="text-xl font-bold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" onClick={()=>setIsEditingName(true)}>{podName}</h1>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline"><Users className="h-4 w-4 mr-2" /> Invite</Button>
            <Button className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"><Sparkles className="h-4 w-4 mr-2" /> AI Study Plan</Button>
            <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export Progress</Button>
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
                  <Button variant={tab==='canvas'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('canvas')}><BookOpen className="h-4 w-4 mr-3" /> Canvas</Button>
                  <Button variant={tab==='study'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('study')}><CalendarDays className="h-4 w-4 mr-3" /> Study Plan</Button>
                  <Button variant={tab==='assignments'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('assignments')}><ClipboardList className="h-4 w-4 mr-3" /> Assignments</Button>
                  <Button variant={tab==='reports'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('reports')}><BarChart3 className="h-4 w-4 mr-3" /> Reports</Button>
                </div>
                <Separator className="my-6" />
                <div className="space-y-3"><h3 className="text-sm font-medium text-muted-foreground">Pod Members</h3><div className="flex flex-wrap gap-2">{members.map(m => (<div key={m.id} className={`px-2 py-1 rounded-full text-xs ${m.color}`}>{m.initials}</div>))}</div></div>
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
                        <Card className="w-64 hover:shadow-lg transition-all duration-200"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-sm">{it.title}</CardTitle><div className="flex -space-x-1">{members.slice(0,2).map(m => (<div key={m.id} className={`h-6 w-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] ${m.color}`}>{m.initials}</div>))}</div></div></CardHeader><CardContent className="pt-0"><Badge variant="secondary" className="text-xs">{it.type}</Badge></CardContent></Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-6 right-6"><Button size="icon" className="rounded-full w-14 h-14 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 shadow-lg" onClick={()=>addCanvasItem('ASSIGNMENT')}><Plus className="h-6 w-6" /></Button></div>
              </motion.div>
            )}

            {tab==='study' && (
              <motion.div key="study" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 h-full overflow-y-auto"><h2 className="text-2xl font-bold mb-6">Group Study Plan</h2><div className="space-y-3">{milestones.map((m,i)=>(<motion.div key={m.week} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.25, delay:i*0.05}}><Card><CardHeader className="pb-2"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold">{m.week}</div><div><CardTitle className="text-base">{m.title}</CardTitle><CardDescription className="text-xs">Assigned to {m.assigned}</CardDescription></div></div><Badge variant="secondary">Week {m.week}</Badge></div></CardHeader></Card></motion.div>))}</div></div>
              </motion.div>
            )}

            {tab==='assignments' && (
              <motion.div key="assignments" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 h-full overflow-auto">
                  <h2 className="text-2xl font-bold mb-6">Assignments</h2>
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground px-2"><div className="col-span-4">Assignment</div><div className="col-span-3">Assigned To</div><div className="col-span-3">Due Date</div><div className="col-span-2">Status</div></div>
                  <Separator className="my-3" />
                  <div className="space-y-2">{assignments.map((a,i)=>(<motion.div key={a.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.2, delay:i*0.04}} className="grid grid-cols-12 gap-4 items-center px-2 py-2 rounded hover:bg-slate-50"><div className="col-span-4">{a.title}</div><div className="col-span-3 flex items-center gap-2"><div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${members.find(m=>m.id===a.assignee)?.color || 'bg-gray-100'}`}>{(members.find(m=>m.id===a.assignee)?.initials) || <UserIcon className="h-3 w-3" />}</div><span>{members.find(m=>m.id===a.assignee)?.name || 'Unassigned'}</span></div><div className="col-span-3">{new Date(a.due).toLocaleDateString()}</div><div className="col-span-2"><div className="flex gap-2">{(['Pending','In Progress','Done'] as const).map(s => (<Button key={s} size="sm" variant={a.status===s? 'default':'outline'} onClick={()=>setStatus(a.id, s)}>{s}</Button>))}</div></div></motion.div>))}</div>
                </div>
              </motion.div>
            )}

            {tab==='reports' && (
              <motion.div key="reports" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 h-full"><h2 className="text-2xl font-bold mb-6">Pod Performance</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><Card><CardHeader><CardTitle>Completion Rate</CardTitle></CardHeader><CardContent><div className="text-4xl font-bold text-orange-600">72%</div><div className="w-full h-2 bg-muted rounded-full mt-3"><div className="h-2 bg-orange-500 rounded-full" style={{width:'72%'}} /></div></CardContent></Card><Card><CardHeader><CardTitle>Top Contributors</CardTitle></CardHeader><CardContent><div className="flex -space-x-2">{members.map(m => (<div key={m.id} className={`h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-xs ${m.color}`}>{m.initials}</div>))}</div><CardDescription className="mt-2">Engagement over last week</CardDescription></CardContent></Card><Card><CardHeader><CardTitle>Learning Streaks</CardTitle></CardHeader><CardContent><div className="h-24 w-full bg-gradient-to-r from-blue-100 to-orange-100 rounded" /><CardDescription className="mt-2">Mock chart placeholder</CardDescription></CardContent></Card></div><Separator className="my-8" /><div className="flex items-center gap-3"><Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export PDF</Button><Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export CSV</Button><Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export PNG</Button></div></div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
