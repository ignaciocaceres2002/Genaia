import { Link, useLocation } from "wouter";
import { Home, BarChart3, GraduationCap, Target, Wrench, FileText, Trophy, Building2, Flame, Rocket, Lightbulb } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import logoImg from "@assets/image_1773976580990.png";

const navItems = [
  { title: "Home", path: "/dashboard", icon: Home },
  { title: "My SQ", path: "/dashboard/sq", icon: BarChart3 },
  { title: "Learning", path: "/dashboard/learning", icon: GraduationCap },
  { title: "Assessments", path: "/dashboard/assessments", icon: Target },
  { title: "AI Tools", path: "/dashboard/tools", icon: Wrench },
  { title: "AI Use Cases", path: "/dashboard/use-cases", icon: Lightbulb },
  { title: "AI Case Builder", path: "/dashboard/case-builder", icon: Rocket },
  { title: "Policies", path: "/dashboard/policies", icon: FileText },
  { title: "Champions", path: "/dashboard/champions", icon: Trophy },
  { title: "My Company", path: "/dashboard/company", icon: Building2 },
];

interface UserSidebarProps {
  user?: {
    name: string;
    level: number;
    xp: number;
    streak: number;
    nqScore: number;
  };
}

export function UserSidebar({ user }: UserSidebarProps) {
  const [location] = useLocation();
  const currentUser = user || { name: "Sarah Chen", level: 5, xp: 8450, streak: 12, nqScore: 67 };
  const levelNames = ["Beginner", "Learner", "Explorer", "Builder", "Achiever", "Expert", "Master", "Superagent"];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/">
          <img src={logoImg} alt="Genaia" className="h-12 w-auto mb-3" data-testid="sidebar-logo" />
        </Link>
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-[#7C3AED] text-white text-sm font-medium">
              {currentUser.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{currentUser.name}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {levelNames[currentUser.level - 1] || "Beginner"}
              </Badge>
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-orange-500" />
                {currentUser.streak}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{currentUser.xp.toLocaleString()} XP</span>
          <span>SQ {currentUser.nqScore}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location === item.path || (item.path !== "/dashboard" && location.startsWith(item.path));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild data-active={isActive}>
                      <Link href={item.path} data-testid={`nav-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Link href="/">
          <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-back-to-site">
            Back to site
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
