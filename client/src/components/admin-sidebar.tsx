import { Link, useLocation } from "wouter";
import { BarChart3, Users, GraduationCap, Target, Wrench, FileText, Trophy, Building2, AlertTriangle, Settings, Bot, Lightbulb, Gift, Palette } from "lucide-react";
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
  { title: "Overview", path: "/admin", icon: BarChart3 },
  { title: "Teams", path: "/admin/teams", icon: Users },
  { title: "Learning", path: "/admin/learning", icon: GraduationCap },
  { title: "Assessments", path: "/admin/assessments", icon: Target },
  { title: "Tools", path: "/admin/tools", icon: Wrench },
  { title: "Policies", path: "/admin/policies", icon: FileText },
  { title: "Champions", path: "/admin/champions", icon: Trophy },
  { title: "AI-First Recruiting", path: "/admin/recruiting", icon: Bot },
  { title: "AI Case Builder", path: "/admin/case-builder", icon: Lightbulb },
  { title: "Benefits", path: "/admin/benefits", icon: Gift },
  { title: "Agentic Score", path: "/admin/agentic", icon: Building2 },
  { title: "Alerts", path: "/admin/alerts", icon: AlertTriangle },
  { title: "Settings", path: "/admin/settings", icon: Settings },
  { title: "Design System", path: "/design-system", icon: Palette },
];

export function AdminSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/">
          <img src={logoImg} alt="Genaia" className="h-12 w-auto mb-3" data-testid="admin-sidebar-logo" />
        </Link>
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-chart-2 text-white text-sm font-medium">
              AR
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Admin Portal</p>
            <Badge variant="secondary" className="text-[10px]">HR Leadership</Badge>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location === item.path || (item.path !== "/admin" && location.startsWith(item.path));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild data-active={isActive}>
                      <Link href={item.path} data-testid={`admin-nav-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        {item.title === "Alerts" && (
                          <Badge variant="destructive" className="ml-auto text-[10px] px-1.5">3</Badge>
                        )}
                        {item.title === "Tools" && (
                          <Badge variant="secondary" className="ml-auto text-[10px] px-1.5">3</Badge>
                        )}
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
          <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="admin-link-back">
            Back to site
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
