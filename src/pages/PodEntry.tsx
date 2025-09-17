import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Users } from "lucide-react";

export default function PodEntry() {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card className="shadow-sm">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 flex items-center justify-center"><Users className="h-6 w-6 text-white" /></div>
            <CardTitle className="text-xl mt-3">Create a Learning Pod</CardTitle>
            <CardDescription>Become the pod leader and invite members</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600" onClick={()=>navigate('/pod-setup')}>Start Pod Setup</Button>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-orange-500 flex items-center justify-center"><KeyRound className="h-6 w-6 text-white" /></div>
            <CardTitle className="text-xl mt-3">Join via Invite Code</CardTitle>
            <CardDescription>Enter the invite code shared by the leader</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2"><Label htmlFor="code">Invite Code</Label><Input id="code" placeholder="e.g., POD-7XJ2K" value={inviteCode} onChange={(e)=>setInviteCode(e.target.value)} /></div>
            <Button variant="outline" className="w-full" onClick={()=>navigate('/pod')}>Join Pod</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
