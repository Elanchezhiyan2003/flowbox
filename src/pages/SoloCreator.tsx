import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import TimelineGeneratorModal, { type TimelineMilestone } from "@/components/timeline/TimelineGeneratorModal";
import { 
  Plus, 
  Calendar,
  Download,
  Sparkles,
  Palette,
  Clock,
  FileText,
  Lightbulb,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Check,
  X,
  BarChart3
} from "lucide-react";

type ViewMode = 'canvas' | 'timeline' | 'exports';

interface CanvasItem {
  id: string;
  type: 'task' | 'note' | 'inspiration' | 'log';
  title: string;
  content: string;
  position: { x: number; y: number };
  createdAt: Date;
}

const mockItems: CanvasItem[] = [
  { id: '1', type: 'task', title: 'Draft first project plan', content: 'Create a comprehensive outline for the new project including timeline and resources needed.', position: { x: 100, y: 100 }, createdAt: new Date() },
  { id: '2', type: 'note', title: 'Capture new ideas here', content: 'Brainstorming session notes and random thoughts that could lead to breakthrough ideas.', position: { x: 400, y: 150 }, createdAt: new Date() },
  { id: '3', type: 'inspiration', title: 'Add moodboard images, quotes', content: 'Visual inspiration and motivational quotes to keep the creative energy flowing.', position: { x: 200, y: 300 }, createdAt: new Date() },
  { id: '4', type: 'log', title: 'Reflect on progress each day', content: 'Daily reflection on what was accomplished and what needs attention tomorrow.', position: { x: 500, y: 250 }, createdAt: new Date() }
];

const itemIcons = { task: Clock, note: FileText, inspiration: Lightbulb, log: BookOpen } as const;
const itemColors = { task: 'from-blue-500 to-cyan-500', note: 'from-green-500 to-emerald-500', inspiration: 'from-purple-500 to-pink-500', log: 'from-orange-500 to-red-500' } as const;

export default function SoloCreator() {
  const [viewMode, setViewMode] = useState<ViewMode>('canvas');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [boardTitle, setBoardTitle] = useState('My Creative Workspace');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [items, setItems] = useState<CanvasItem[]>(mockItems);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [timeline, setTimeline] = useState<TimelineMilestone[]>([]);

  const addNewItem = (type: CanvasItem['type']) => {
    const newItem: CanvasItem = {
      id: Date.now().toString(),
      type,
      title: `New ${type}`,
      content: `Add your ${type} content here...`,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      createdAt: new Date()
    };
    setItems([...items, newItem]);
    setShowAddMenu(false);
  };

  const deleteItem = (id: string) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {!sidebarCollapsed && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarCollapsed(true)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center space-x-3">
              {sidebarCollapsed && (
                <Button variant="ghost" size="icon" onClick={() => setSidebarCollapsed(false)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              {isEditingTitle ? (
                <Input value={boardTitle} onChange={(e)=>setBoardTitle(e.target.value)} onBlur={()=>setIsEditingTitle(false)} onKeyDown={(e)=>{ if(e.key==='Enter') setIsEditingTitle(false); }} className="text-xl font-bold border-none bg-transparent p-0 h-auto" autoFocus />
              ) : (
                <h1 className="text-xl font-bold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" onClick={()=>setIsEditingTitle(true)}>{boardTitle}</h1>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" onClick={()=>setShowTimelineModal(true)}><Sparkles className="h-4 w-4 mr-2" /> AI Generate Timeline</Button>
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
                  <Button variant={viewMode==='canvas'?'default':'ghost'} className="w-full justify-start" onClick={()=>setViewMode('canvas')}><Palette className="h-4 w-4 mr-3" /> Canvas</Button>
                  <Button variant={viewMode==='timeline'?'default':'ghost'} className="w-full justify-start" onClick={()=>setViewMode('timeline')}><Calendar className="h-4 w-4 mr-3" /> Timeline</Button>
                  <Button variant={viewMode==='exports'?'default':'ghost'} className="w-full justify-start" onClick={()=>setViewMode('exports')}><Download className="h-4 w-4 mr-3" /> Exports</Button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {viewMode==='canvas' && (
              <motion.div key="canvas" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} transition={{duration:0.3}} className="h-full relative bg-slate-50">
                <div className="h-full overflow-auto p-6">
                  <div className="relative min-h-full">
                    {items.map((item, index) => {
                      const Icon = itemIcons[item.type];
                      return (
                        <motion.div key={item.id} initial={{opacity:0, scale:0.85}} animate={{opacity:1, scale:1}} transition={{duration:0.25, delay:index*0.05}} className="absolute" style={{left:item.position.x, top:item.position.y}}>
                          <Card className="w-64 hover:shadow-lg transition-all duration-200 group">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${itemColors[item.type]}`}>
                                  <Icon className="h-4 w-4 text-white" />
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button size="icon" variant="ghost" className="h-6 w-6"><Edit3 className="h-3 w-3" /></Button>
                                  <Button size="icon" variant="ghost" className="h-6 w-6 text-red-500 hover:text-red-700" onClick={()=>deleteItem(item.id)}><X className="h-3 w-3" /></Button>
                                </div>
                              </div>
                              <CardTitle className="text-sm">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <CardDescription className="text-xs">{item.content}</CardDescription>
                              <Badge variant="secondary" className="text-xs mt-2">{item.type}</Badge>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                <div className="absolute bottom-6 right-6">
                  <div className="relative">
                    <Button size="icon" className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg" onClick={()=>setShowAddMenu(!showAddMenu)}>
                      <Plus className="h-6 w-6" />
                    </Button>
                    <AnimatePresence>
                      {showAddMenu && (
                        <motion.div initial={{opacity:0, scale:0.9, y:12}} animate={{opacity:1, scale:1, y:0}} exit={{opacity:0, scale:0.9, y:12}} className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border p-2 space-y-1 min-w-[200px]">
                          <Button variant="ghost" className="w-full justify-start" onClick={()=>addNewItem('task')}><Clock className="h-4 w-4 mr-3" /> Add Task</Button>
                          <Button variant="ghost" className="w-full justify-start" onClick={()=>addNewItem('note')}><FileText className="h-4 w-4 mr-3" /> Add Note</Button>
                          <Button variant="ghost" className="w-full justify-start" onClick={()=>addNewItem('inspiration')}><Lightbulb className="h-4 w-4 mr-3" /> Add Inspiration</Button>
                          <Button variant="ghost" className="w-full justify-start" onClick={()=>addNewItem('log')}><BookOpen className="h-4 w-4 mr-3" /> Add Log</Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {viewMode==='timeline' && (
              <motion.div key="timeline" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 h-full overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Project Timeline</h2>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" onClick={()=>setShowTimelineModal(true)}><Sparkles className="h-4 w-4 mr-2" /> Generate New Timeline</Button>
                  </div>
                  {timeline.length===0 ? (
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No timeline generated yet</h3>
                      <p className="text-muted-foreground mb-4">Click "AI Generate Timeline" to create your project timeline</p>
                    </div>
                  ) : (
                    <div className="w-full overflow-x-auto">
                      <div className="min-w-[640px] flex items-stretch gap-4">
                        {timeline.map((m, i)=> (
                          <motion.div key={m.id} initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.2, delay:i*0.05}} className="flex-1">
                            <Card className="h-full min-w-[200px]">
                              <CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-base">Week {m.week}</CardTitle><Badge variant="secondary">{new Date(m.deadline).toLocaleDateString()}</Badge></div></CardHeader>
                              <CardContent className="pt-0"><p className="text-sm font-medium mb-1">{m.title}</p><CardDescription className="text-xs">{m.description}</CardDescription></CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {viewMode==='exports' && (
              <motion.div key="exports" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} transition={{duration:0.3}} className="h-full p-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
                  <h2 className="text-2xl font-bold mb-6">Export Options</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <Download className="h-6 w-6 text-red-600" />
                          </div>
                          <CardTitle>Export as PDF</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>Download your entire board as a PDF document</CardDescription>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Palette className="h-6 w-6 text-blue-600" />
                          </div>
                          <CardTitle>Export Inspiration Wall</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>Save your inspiration cards as a PNG image</CardDescription>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Calendar className="h-6 w-6 text-green-600" />
                          </div>
                          <CardTitle>Export Timeline</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>Download timeline as ICS calendar file</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <TimelineGeneratorModal open={showTimelineModal} onOpenChange={setShowTimelineModal} onGenerated={({ title, milestones })=>{ setBoardTitle(title); setTimeline(milestones); setViewMode('timeline'); }} />
    </div>
  );
}
