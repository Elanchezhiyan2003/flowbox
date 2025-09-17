import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, Rocket, FlaskConical, Briefcase } from "lucide-react";

export default function TeamSetup() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [emails, setEmails] = useState("");
  const [goal, setGoal] = useState("Project");
  const isValid = teamName.trim().length > 0;

  const handleCreate = () => {
    navigate("/team");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl mt-3">Create Your Team</CardTitle>
          <CardDescription>Set up your team and invite collaborators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input id="teamName" placeholder="e.g., Flowbox Devs" value={teamName} onChange={(e)=>setTeamName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emails">Invite Members (emails)</Label>
            <Input id="emails" placeholder="alice@company.com, bob@company.com" value={emails} onChange={(e)=>setEmails(e.target.value)} />
            <p className="text-xs text-muted-foreground">Comma-separated emails. Invites are mocked for now.</p>
          </div>
          <div className="space-y-3">
            <Label>Select Team Goal</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[{label:'Project', icon: Briefcase}, {label:'Research', icon: FlaskConical}, {label:'Startup Idea', icon: Rocket}].map((g)=>{
                const Icon = g.icon;
                const active = goal === g.label;
                return (
                  <button key={g.label} type="button" onClick={()=>setGoal(g.label)} className={`border rounded-xl p-4 text-left hover:shadow-sm transition ${active? 'ring-2 ring-purple-400 bg-purple-50' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{g.label}</div>
                        <Badge variant="secondary" className="mt-1">Team Goal</Badge>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}>
            <Button disabled={!isValid} className="w-full bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600" onClick={handleCreate}>
              Create Team & Workspace
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
