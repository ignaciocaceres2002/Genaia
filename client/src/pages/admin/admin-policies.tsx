import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Policy } from "@shared/schema";
import { FileText, Eye, MessageSquare, AlertTriangle, CheckCircle2 } from "lucide-react";

import { fadeUp, pageContainer } from "@/lib/motion-variants";

const policyAnalytics = [
  { title: "Acceptable AI Use Policy", views: 342, questions: 28, acknowledged: 89, gaps: 2 },
  { title: "AI Data Privacy Standards", views: 256, questions: 45, acknowledged: 72, gaps: 5 },
  { title: "Client-Facing AI Content", views: 189, questions: 12, acknowledged: 65, gaps: 1 },
  { title: "AI Ethics Framework", views: 210, questions: 18, acknowledged: 78, gaps: 3 },
  { title: "Marketing AI Guidelines", views: 98, questions: 8, acknowledged: 85, gaps: 0 },
];

const unansweredQuestions = [
  { question: "Can I use ChatGPT to draft client proposals?", count: 8, policy: "Client-Facing AI Content" },
  { question: "Is it okay to upload competitor data to AI tools?", count: 5, policy: "AI Data Privacy Standards" },
  { question: "What about personal AI tool accounts for work?", count: 4, policy: "Acceptable AI Use Policy" },
];

export default function AdminPoliciesPage() {
  const { data: policies } = useQuery<Policy[]>({ queryKey: ["/api/policies"] });

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={pageContainer}>
      <motion.div variants={fadeUp} className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-display-xs font-bold">Policy Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Analytics, compliance, and gap analysis</p>
        </div>
        <Button size="sm" className="rounded-full" data-testid="button-create-policy">
          Create Policy
        </Button>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="overflow-visible">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-sm">Policy Analytics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">Policy</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Views</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Questions</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Acknowledged %</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Gaps</th>
                </tr>
              </thead>
              <tbody>
                {policyAnalytics.map((p) => (
                  <tr key={p.title} className="border-b">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-chart-1" />
                        <span className="font-medium">{p.title}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="w-3 h-3 text-muted-foreground" />{p.views}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <MessageSquare className="w-3 h-3 text-muted-foreground" />{p.questions}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant={p.acknowledged >= 80 ? "secondary" : "outline"} className="text-[10px]">
                        {p.acknowledged >= 80 && <CheckCircle2 className="w-3 h-3 mr-0.5 text-green-500" />}
                        {p.acknowledged}%
                      </Badge>
                    </td>
                    <td className="p-3 text-center">
                      {p.gaps > 0 ? (
                        <Badge variant="destructive" className="text-[10px]">
                          <AlertTriangle className="w-3 h-3 mr-0.5" />{p.gaps}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">None</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-3">Unanswered Questions (Gap Report)</h3>
          <div className="space-y-3">
            {unansweredQuestions.map((q, i) => (
              <div key={i} className="flex items-start justify-between gap-4 p-3 bg-muted/50 rounded-md">
                <div>
                  <p className="text-sm font-medium">{q.question}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Related: {q.policy}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="secondary" className="text-[10px]">{q.count} asks</Badge>
                  <Button size="sm" variant="outline" className="text-xs rounded-full">Address</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
