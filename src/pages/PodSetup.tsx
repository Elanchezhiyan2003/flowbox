import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookMarked } from "lucide-react";

export default function PodSetup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [emails, setEmails] = useState("");
  const isValid = name.trim().length>0 && subject.trim().length>0;
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 flex items-center justify-center"><BookMarked className="h-6 w-6 text-white" /></div>
          <CardTitle className="text-2xl mt-3">Pod Setup</CardTitle>
          <CardDescription>Create your pod and share the invite code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2"><Label htmlFor="name">Pod Name</Label><Input id="name" placeholder="e.g., Web Dev Bootcamp" value={name} onChange={(e)=>setName(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="subject">Subject / Focus Area</Label><Input id="subject" placeholder="e.g., Fullstack with React" value={subject} onChange={(e)=>setSubject(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="emails">Invite Members (emails)</Label><Input id="emails" placeholder="alice@school.edu, bob@school.edu" value={emails} onChange={(e)=>setEmails(e.target.value)} /><p className="text-xs text-muted-foreground">Invites and code are mocked for now.</p></div>
          <Button disabled={!isValid} className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600" onClick={()=>navigate('/pod')}>Create Pod & Go to Board</Button>
        </CardContent>
      </Card>
    </div>
  );
}
