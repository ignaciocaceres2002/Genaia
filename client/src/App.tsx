import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import CalculatorPage from "@/pages/calculator";
import { UserSidebar } from "@/components/user-sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import DashboardHome from "@/pages/dashboard/home";
import MySQPage from "@/pages/dashboard/my-nq";
import LearningPage from "@/pages/dashboard/learning";
import AssessmentsPage from "@/pages/dashboard/assessments";
import ToolsPage from "@/pages/dashboard/tools";
import PoliciesPage from "@/pages/dashboard/policies";
import ChampionsPage from "@/pages/dashboard/champions";
import CompanyPage from "@/pages/dashboard/company";
import AdminOverview from "@/pages/admin/overview";
import AdminTeamsPage from "@/pages/admin/teams";
import AdminToolsPage from "@/pages/admin/admin-tools";
import AgenticScorePage from "@/pages/admin/agentic-score";
import AlertsPage from "@/pages/admin/alerts";
import AdminLearningPage from "@/pages/admin/admin-learning";
import AdminAssessmentsPage from "@/pages/admin/admin-assessments";
import AdminPoliciesPage from "@/pages/admin/admin-policies";
import AdminChampionsPage from "@/pages/admin/admin-champions";
import SettingsPage from "@/pages/admin/settings";
import AIRecruitingPage from "@/pages/admin/ai-recruiting";
import AICaseBuilderPage from "@/pages/admin/ai-case-builder";
import AssessmentPage from "@/pages/assessment";

function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <UserSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center gap-2 p-3 border-b h-14 flex-shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-sm">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex-1" />
            <span className="text-xs text-muted-foreground hidden md:block">Genaia Platform</span>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center gap-2 p-3 border-b h-14 flex-shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-sm">
            <SidebarTrigger data-testid="button-admin-sidebar-toggle" />
            <div className="flex-1" />
            <span className="text-xs text-muted-foreground hidden md:block">Admin Dashboard</span>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function UserDashboardRouter() {
  return (
    <UserDashboardLayout>
      <Switch>
        <Route path="/dashboard" component={DashboardHome} />
        <Route path="/dashboard/sq" component={MySQPage} />
        <Route path="/dashboard/learning" component={LearningPage} />
        <Route path="/dashboard/assessments" component={AssessmentsPage} />
        <Route path="/dashboard/tools" component={ToolsPage} />
        <Route path="/dashboard/policies" component={PoliciesPage} />
        <Route path="/dashboard/champions" component={ChampionsPage} />
        <Route path="/dashboard/company" component={CompanyPage} />
        <Route component={DashboardHome} />
      </Switch>
    </UserDashboardLayout>
  );
}

function AdminDashboardRouter() {
  return (
    <AdminDashboardLayout>
      <Switch>
        <Route path="/admin" component={AdminOverview} />
        <Route path="/admin/teams" component={AdminTeamsPage} />
        <Route path="/admin/tools" component={AdminToolsPage} />
        <Route path="/admin/learning" component={AdminLearningPage} />
        <Route path="/admin/assessments" component={AdminAssessmentsPage} />
        <Route path="/admin/policies" component={AdminPoliciesPage} />
        <Route path="/admin/champions" component={AdminChampionsPage} />
        <Route path="/admin/recruiting" component={AIRecruitingPage} />
        <Route path="/admin/case-builder" component={AICaseBuilderPage} />
        <Route path="/admin/agentic" component={AgenticScorePage} />
        <Route path="/admin/alerts" component={AlertsPage} />
        <Route path="/admin/settings" component={SettingsPage} />
        <Route component={AdminOverview} />
      </Switch>
    </AdminDashboardLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/calculator" component={CalculatorPage} />
      <Route path="/assessment" component={AssessmentPage} />
      <Route path="/dashboard/:rest*" component={UserDashboardRouter} />
      <Route path="/dashboard" component={UserDashboardRouter} />
      <Route path="/admin/:rest*" component={AdminDashboardRouter} />
      <Route path="/admin" component={AdminDashboardRouter} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
