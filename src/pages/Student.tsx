import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar, Download, Sparkles, BookOpen, NotebookPen, Link as LinkIcon, FileText, ChevronLeft, ChevronRight, BarChart3, Filter } from "lucide-react";

type ViewTab = 'canvas' | 'study' | 'reports' | 'resources';

export default function Student() {
  const [tab, setTab] = useState<ViewTab>('canvas');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [title, setTitle] = useState('My Learning Pod');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const items = useMemo(()=>[
    { id:'a1', type:'ASSIGNMENT', title:'Complete Python Day 01', content:'Loops and functions', pos:{x:120,y:120}},
    { id:'n1', type:'NOTE', title:'Lecture notes: Introduction to OOP', content:'Encapsulation, Inheritance', pos:{x:420,y:160}},
    { id:'r1', type:'RESOURCE', title:'Link: YouTube tutorial on Git', content:'https://youtube.com', pos:{x:220,y:300}},
    { id:'l1', type:'DAILY_LOG', title:'Reflect on what I learned today', content:'Daily reflections', pos:{x:520,y:260}},
  ],[]);

  const milestones = useMemo(()=>[
    { week:1, title:'Basics of Python', progress:30 },
    { week:2, title:'OOP Concepts', progress:10 },
    { week:3, title:'Build a mini project', progress:0 },
  ],[]);

  const report = { completedAssignmentsPct: 42, studyHours: 18, skillsUnlocked:['Git Basics','Python Syntax','OOP Fundamentals'] };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {!sidebarCollapsed && (
              <Button variant="ghost" size="icon" onClick={()=>setSidebarCollapsed(true)}><ChevronLeft className="h-4 w-4" /></Button>
            )}
            <div className="flex items-center space-x-3">
              {sidebarCollapsed && (
                <Button variant="ghost" size="icon" onClick={()=>setSidebarCollapsed(false)}><ChevronRight className="h-4 w-4" /></Button>
              )}
              {isEditingTitle ? (
                <Input value={title} onChange={(e)=>setTitle(e.target.value)} onBlur={()=>setIsEditingTitle(false)} onKeyDown={(e)=>{ if(e.key==='Enter') setIsEditingTitle(false); }} className="text-xl font-bold border-none bg-transparent p-0 h-auto" autoFocus />
              ) : (
                <h1 className="text-xl font-bold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" onClick={()=>setIsEditingTitle(true)}>{title}</h1>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"><Sparkles className="h-4 w-4 mr-2" /> AI Study Plan</Button>
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
                  <Button variant={tab==='canvas'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('canvas')}><NotebookPen className="h-4 w-4 mr-3" /> Canvas</Button>
                  <Button variant={tab==='study'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('study')}><Calendar className="h-4 w-4 mr-3" /> Study Plan</Button>
                  <Button variant={tab==='reports'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('reports')}><BarChart3 className="h-4 w-4 mr-3" /> Reports</Button>
                  <Button variant={tab==='resources'?'default':'ghost'} className="w-full justify-start" onClick={()=>setTab('resources')}><BookOpen className="h-4 w-4 mr-3" /> Resources</Button>
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
                    {items.map((it,i)=> (
                      <motion.div key={it.id} initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{duration:0.25, delay:i*0.05}} className="absolute" style={{ left: it.pos.x, top: it.pos.y }}>
                        <Card className="w-64 hover:shadow-lg transition-all duration-200">
                          <CardHeader className="pb-2"><CardTitle className="text-sm">{it.title}</CardTitle></CardHeader>
                          <CardContent className="pt-0"><CardDescription className="text-xs">{it.content}</CardDescription><Badge variant="secondary" className="text-xs mt-2">{it.type}</Badge></CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-6 right-6">
                  <div className="bg-white border rounded-lg shadow p-2 mb-2 flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select className="bg-transparent text-sm outline-none"><option>All</option><option>ASSIGNMENT</option><option>NOTE</option><option>RESOURCE</option><option>DAILY_LOG</option></select>
                  </div>
                  <Button size="icon" className="rounded-full w-14 h-14 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-lg"><Plus className="h-6 w-6" /></Button>
                </div>
              </motion.div>
            )}

            {tab==='study' && (
              <motion.div key="study" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 h-full overflow-y-auto">
                  <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold">AI Study Plan</h2><Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"><Sparkles className="h-4 w-4 mr-2" /> Generate Plan</Button></div>
                  <div className="space-y-4">
                    {milestones.map((m,i)=>(
                      <motion.div key={m.week} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.25, delay:i*0.05}}>
                        <Card>
                          <CardHeader className="pb-2"><div className="flex items-center justify-between"><div className="flex items-center space-x-3"><div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">{m.week}</div><CardTitle className="text-base">{m.title}</CardTitle></div><Badge variant="secondary">Week {m.week}</Badge></div></CardHeader>
                          <CardContent className="pt-0"><div className="w-full h-2 bg-muted rounded-full"><div className="h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full" style={{ width: `${m.progress}%` }} /></div><CardDescription className="text-xs mt-2">Progress: {m.progress}%</CardDescription></CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {tab==='reports' && (
              <motion.div key="reports" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
                  <h2 className="text-2xl font-bold mb-6">Progress Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card><CardHeader><CardTitle>Assignments Completed</CardTitle></CardHeader><CardContent><div className="text-4xl font-bold text-green-600">{report.completedAssignmentsPct}%</div><div className="w-full h-2 bg-muted rounded-full mt-3"><div className="h-2 bg-green-500 rounded-full" style={{ width: `${report.completedAssignmentsPct}%` }} /></div></CardContent></Card>
                    <Card><CardHeader><CardTitle>Study Hours</CardTitle></CardHeader><CardContent><div className="text-4xl font-bold text-blue-600">{report.studyHours}h</div><CardDescription className="mt-2">Tracked in the last 7 days</CardDescription></CardContent></Card>
                    <Card><CardHeader><CardTitle>Skills Unlocked</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{report.skillsUnlocked.map(s => (<Badge key={s} className="bg-green-100 text-green-800">{s}</Badge>))}</div></CardContent></Card>
                  </div>
                  <Separator className="my-8" />
                  <div className="flex items-center gap-3"><Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export PDF</Button><Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export CSV</Button></div>
                </div>
              </motion.div>
            )}

            {tab==='resources' && (
              <motion.div key="resources" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
                  <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold">Resource Library</h2><div className="flex items-center gap-2"><Input placeholder="Filter by subject or tag" className="w-64" /><Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button></div></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => (<Card key={i} className="hover:shadow-md transition-shadow"><CardHeader><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-blue-100"><LinkIcon className="h-5 w-5 text-blue-700" /></div><div><CardTitle className="text-base">Study Resource #{i}</CardTitle><CardDescription className="text-xs">Tag: CS, Python</CardDescription></div></div></CardHeader><CardContent><p className="text-sm text-muted-foreground">Useful link or PDF description. Click to open.</p></CardContent></Card>))}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
