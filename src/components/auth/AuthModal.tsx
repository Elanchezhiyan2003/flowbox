import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import RoleSelectionModal from "@/components/onboarding/RoleSelectionModal";
import { Github, Mail, Chrome, User, Users, GraduationCap, BookOpen, ArrowLeft } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type AuthStep = 'signin' | 'signup' | 'role-selection' | 'guest';
type UserRole = 'solo-creator' | 'student' | 'small-team' | 'learning-pod';

const roleOptions = [
  {
    id: 'solo-creator' as UserRole,
    title: 'Solo Creator',
    description: 'Individual projects and personal workflows',
    icon: User,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'student' as UserRole,
    title: 'Student',
    description: 'Academic projects and coursework',
    icon: GraduationCap,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'small-team' as UserRole,
    title: 'Small Team',
    description: 'Collaborative projects with 2-10 members',
    icon: Users,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'learning-pod' as UserRole,
    title: 'Learning Pod',
    description: 'Study groups and educational communities',
    icon: BookOpen,
    color: 'from-orange-500 to-red-500'
  }
];

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<AuthStep>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showRoles, setShowRoles] = useState(false);

  const handleOAuthLogin = (provider: string) => {
    // Mock OAuth login
    console.log(`OAuth login with ${provider}`);
    if (step === 'signin') {
      setStep('role-selection');
      setShowRoles(true);
    }
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock email auth
    console.log('Email auth:', { email, password, name });
    setStep('role-selection');
    setShowRoles(true);
  };

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
    // Mock role selection and redirect to dashboard
    console.log('Selected role:', role);
    setTimeout(() => {
      onOpenChange(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleGuestAccess = () => {
    console.log('Guest access');
    onOpenChange(false);
    navigate('/dashboard');
  };

  const resetToSignIn = () => {
    setStep('signin');
    setSelectedRole(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {step === 'signin' && (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-center">Welcome to Flowbox</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-6">
                {/* OAuth Buttons */}
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleOAuthLogin('google')}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Continue with Google
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleOAuthLogin('github')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Continue with GitHub
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className="space-y-3">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Continue with Email
                  </Button>
                </form>

                <div className="text-center">
                  <Button variant="link" onClick={() => setStep('signup')} className="text-sm">
                    Don't have an account? Sign up
                  </Button>
                </div>

                <Separator />

                <Button variant="ghost" onClick={handleGuestAccess} className="w-full">
                  Continue as Guest
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'signup' && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetToSignIn}
                  className="absolute left-0 top-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-center">Create Account</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-6">
                <form onSubmit={handleEmailAuth} className="space-y-3">
                  <div>
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>

                <div className="text-center">
                  <Button variant="link" onClick={resetToSignIn} className="text-sm">
                    Already have an account? Sign in
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'role-selection' && (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <DialogHeader>
                <DialogTitle className="text-center">Choose Your Role</DialogTitle>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  This helps us customize your Flowbox experience
                </p>
              </DialogHeader>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <Card 
                      key={role.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        isSelected ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleRoleSelection(role.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${role.color}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-sm">{role.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-xs">
                          {role.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {selectedRole && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="secondary">Selected</Badge>
                    <span className="text-sm font-medium">
                      {roleOptions.find(r => r.id === selectedRole)?.title}
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>

      {/* Role Selection as separate modal for clarity */}
      <RoleSelectionModal open={showRoles} onOpenChange={setShowRoles} />
    </Dialog>
  );
}