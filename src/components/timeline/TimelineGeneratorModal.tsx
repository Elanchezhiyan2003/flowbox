import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Sparkles, CheckCircle, Clock, ArrowRight } from "lucide-react";

export type TimelineMilestone = {
  id: string;
  week: number;
  title: string;
  description: string;
  deadline: string; // ISO date string
  status: 'pending'|'in-progress'|'completed';
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerated: (payload: { title: string; milestones: TimelineMilestone[] }) => void;
}

const mock: TimelineMilestone[] = [
  { id:'w1', week:1, title:'Outline plan', description:'Define high-level goals and deliverables', deadline:'2025-10-10', status:'pending' },
  { id:'w2', week:2, title:'Research & drafts', description:'Collect references and draft ideas', deadline:'2025-10-17', status:'pending' },
  { id:'w3', week:3, title:'Prototype', description:'Build a quick clickable prototype', deadline:'2025-10-24', status:'pending' },
  { id:'w4', week:4, title:'Refine & share', description:'Polish and prepare shareable demo', deadline:'2025-10-31', status:'pending' },
];

export default function TimelineGeneratorModal({ open, onOpenChange, onGenerated }: Props) {
  const [step, setStep] = useState<'input'|'generating'|'preview'>('input');
  const [deadline, setDeadline] = useState('');
  const [projectTitle, setProjectTitle] = useState('');

  const reset = () => {
    setStep('input');
    setDeadline('');
    setProjectTitle('');
  };

  const generate = async () => {
    setStep('generating');
    await new Promise(r => setTimeout(r, 1200));
    setStep('preview');
  };

  const accept = () => {
    onGenerated({ title: projectTitle || 'My Creative Workspace', milestones: mock });
    onOpenChange(false);
    reset();
  };

  const statusBadge = (s: TimelineMilestone['status']) => (
    <Badge className={
      s==='completed' ? 'bg-green-100 text-green-700' : s==='in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
    }>{s.replace('-', ' ')}</Badge>
  );

  return (
    <Dialog open={open} onOpenChange={(o)=>{ onOpenChange(o); if(!o) reset(); }}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-blue-600" /> AI Timeline Generator</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step==='input' && (
            <motion.div key="input" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.2}} className="space-y-6">
              <div className="text-center py-2">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <p className="text-muted-foreground">Enter details to generate a suggested roadmap</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" placeholder="e.g., Portfolio Website" value={projectTitle} onChange={(e)=>setProjectTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Project Deadline</Label>
                <Input id="deadline" type="date" value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={()=>onOpenChange(false)}>Cancel</Button>
                <Button disabled={!deadline || !projectTitle.trim()} onClick={generate} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Sparkles className="h-4 w-4 mr-2" /> Generate
                </Button>
              </div>
            </motion.div>
          )}

          {step==='generating' && (
            <motion.div key="gen" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.2}} className="text-center py-10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}>
                  <Sparkles className="h-8 w-8 text-white" />
                </motion.div>
              </div>
              <p className="text-muted-foreground">Generating your timeline...</p>
            </motion.div>
          )}

          {step==='preview' && (
            <motion.div key="prev" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.2}} className="space-y-4">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">Timeline Ready</h3>
                <p className="text-sm text-muted-foreground">Review milestones and accept to apply</p>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {mock.map((m,i)=> (
                  <motion.div key={m.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.2, delay:i*0.05}}>
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">{m.week}</div>
                            <div>
                              <CardTitle className="text-base">{m.title}</CardTitle>
                              <CardDescription className="text-xs">Due {new Date(m.deadline).toLocaleDateString()}</CardDescription>
                            </div>
                          </div>
                          {statusBadge(m.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">{m.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={()=>setStep('input')}><Clock className="h-4 w-4 mr-2" /> Edit</Button>
                <Button onClick={accept} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                  Accept <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
