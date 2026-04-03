import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Alert } from "@shared/schema";
import { AlertTriangle, Info, AlertCircle, X, Clock, ArrowRight } from "lucide-react";

import { fadeUp, pageContainer } from "@/lib/motion-variants";

const defaultAlerts: Alert[] = [
  { id: "1", type: "Inactivity", severity: "warning", title: "5 team members inactive 14+ days", description: "Sales team members haven't completed any training modules in the last 14 days. Consider sending a nudge or scheduling a check-in.", team: "Sales", dismissed: false, createdAt: new Date(Date.now() - 86400000) },
  { id: "2", type: "SQ Decline", severity: "warning", title: "Sales SQ dropped 3pts", description: "The Sales team average SQ has declined from 47 to 44 over the past week. Low engagement and missed streaks are contributing factors.", team: "Sales", dismissed: false, createdAt: new Date(Date.now() - 172800000) },
  { id: "3", type: "Shadow AI", severity: "critical", title: "Unapproved tool detected", description: "3 users in Engineering have been using an unapproved AI code generation tool. Review and take action to ensure compliance.", team: "Engineering", dismissed: false, createdAt: new Date(Date.now() - 259200000) },
  { id: "4", type: "Streak Loss", severity: "info", title: "12 users lost their streak", description: "12 users across multiple teams lost their learning streak this week. Consider enabling streak freeze reminders.", team: "Multiple", dismissed: false, createdAt: new Date(Date.now() - 345600000) },
  { id: "5", type: "Achievement", severity: "info", title: "Marketing hit Catalyst level!", description: "The Marketing team's average SQ has reached 58, qualifying them for Catalyst status. Consider recognizing this achievement.", team: "Marketing", dismissed: false, createdAt: new Date(Date.now() - 432000000) },
];

const severityConfig = {
  critical: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/10", badge: "destructive" as const },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/10", badge: "secondary" as const },
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/10", badge: "outline" as const },
};

export default function AlertsPage() {
  const { data: alerts } = useQuery<Alert[]>({ queryKey: ["/api/alerts"] });
  const displayAlerts = alerts || defaultAlerts;

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={pageContainer}>
      <motion.div variants={fadeUp} className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-display-xs font-bold">Alerts</h1>
          <p className="text-muted-foreground text-sm mt-1">{displayAlerts.filter((a: Alert) => !a.dismissed).length} active alerts</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {["All", "Critical", "Warning", "Info"].map((filter) => (
            <Badge key={filter} variant="outline" className="cursor-pointer text-xs hover-elevate">
              {filter}
            </Badge>
          ))}
        </div>
      </motion.div>

      <div className="space-y-3">
        {displayAlerts.filter((a: Alert) => !a.dismissed).map((alert: Alert) => {
          const config = severityConfig[alert.severity as keyof typeof severityConfig] || severityConfig.info;
          const Icon = config.icon;

          return (
            <motion.div key={alert.id} variants={fadeUp}>
              <Card className={`p-4 ${config.bg}`} data-testid={`alert-${alert.id}`}>
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      <Badge variant={config.badge} className="text-[10px]">{alert.severity}</Badge>
                      <Badge variant="outline" className="text-[10px]">{alert.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span>Team: {alert.team}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.createdAt ? new Date(alert.createdAt).toLocaleDateString() : "—"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button size="sm" variant="ghost" className="text-xs rounded-full">
                      <ArrowRight className="w-3 h-3 mr-1" /> Act
                    </Button>
                    <Button size="icon" variant="ghost" className="w-7 h-7">
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
