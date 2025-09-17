import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { User, GraduationCap, Users, BookOpen, Sparkles } from "lucide-react";

interface Props { open: boolean; onOpenChange: (o:boolean)=>void }

type UserRole = 'solo-creator'|'student'|'small-team'|'learning-pod';

const roles = [
  { id:'solo-creator' as UserRole, title:'Solo Creator', desc:'Individual projects and personal workflows', icon: User, color:'from-blue-500 to-cyan-500', to:'/solo-creator' },
  { id:'student' as UserRole, title:'Student', desc:'Academic projects and coursework', icon: GraduationCap, color:'from-green-500 to-emerald-500', to:'/student' },
  { id:'small-team' as UserRole, title:'Small Team', desc:'Collaborative projects with 2-10 members', icon: Users, color:'from-purple-500 to-pink-500', to:'/team-setup' },
  { id:'learning-pod' as UserRole, title:'Learning Pod', desc:'Study groups and educational communities', icon: BookOpen, color:'from-orange-500 to-red-500', to:'/pod-entry' },
];

export default function RoleSelectionModal({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<UserRole|null>(null);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Choose Your Role</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {roles.map(r => {
            const Icon = r.icon;
            const isSel = selected===r.id;
            return (
              <motion.div key={r.id} initial={{opacity:0, y:8}} animate={{opacity:1,y:0}}>
                <Card className={`cursor-pointer transition-all hover:shadow-md ${isSel? 'ring-2 ring-primary':''}`} onClick={()=>{ setSelected(r.id); navigate(r.to); onOpenChange(false); }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${r.color}`}><Icon className="h-5 w-5 text-white" /></div>
                      <CardTitle className="text-base">{r.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0"><CardDescription className="text-sm">{r.desc}</CardDescription></CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
