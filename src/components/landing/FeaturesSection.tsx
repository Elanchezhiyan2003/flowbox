import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Workflow, 
  Brain, 
  Users, 
  FileText, 
  Calendar, 
  Zap,
  Target,
  Share2,
  Download
} from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Visual Boards",
    description: "Drag & drop canvas with customizable widgets for tasks, notes, and inspirations",
    badge: "Core",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Brain,
    title: "AI Timeline Generator",
    description: "Smart milestone suggestions and predictive task recommendations",
    badge: "AI-Powered",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Invite team members, mentors, and stakeholders with role-based access",
    badge: "Team",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: FileText,
    title: "Project Artifacts",
    description: "Attach files, embed links, and organize all project resources in one place",
    badge: "Organization",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automated deadline tracking with intelligent notifications and reminders",
    badge: "Productivity",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Zap,
    title: "Tool Integrations",
    description: "Connect with GitHub, Google Drive, Figma, Notion, and 50+ other tools",
    badge: "Integrations",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set milestones, track progress, and celebrate achievements with your team",
    badge: "Analytics",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share boards publicly or privately with customizable permission levels",
    badge: "Sharing",
    color: "from-rose-500 to-pink-500"
  },
  {
    icon: Download,
    title: "Export Options",
    description: "Export as GIFs, presentations, reports, or social media-ready content",
    badge: "Export",
    color: "from-violet-500 to-purple-500"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Everything you need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From ideation to execution, Flowbox provides all the tools you need 
              to bring your projects to life.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to transform your workflow?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of creators, students, and teams who are already using 
              Flowbox to bring their ideas to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ Free to start</span>
              <span>✓ No credit card required</span>
              <span>✓ Setup in 2 minutes</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}