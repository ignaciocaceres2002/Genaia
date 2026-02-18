import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { AiTool, ToolRequest } from "@shared/schema";
import { CheckCircle2, XCircle, MessageSquare, Bot, FileText, Code, Image, MessageSquareText, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const categoryIcons: Record<string, any> = {
  "Writing": FileText, "Code": Code, "Image": Image, "Chat": MessageSquareText, "Analytics": BarChart3, "Assistant": Bot,
};

const defaultTools = [
  { id: "1", name: "ChatGPT Enterprise", category: "Chat", vendor: "OpenAI", status: "approved", usageCount: 342 },
  { id: "2", name: "GitHub Copilot", category: "Code", vendor: "GitHub", status: "approved", usageCount: 189 },
  { id: "3", name: "Jasper AI", category: "Writing", vendor: "Jasper", status: "approved", usageCount: 156 },
  { id: "4", name: "Midjourney", category: "Image", vendor: "Midjourney", status: "approved", usageCount: 87 },
  { id: "5", name: "Tableau AI", category: "Analytics", vendor: "Salesforce", status: "approved", usageCount: 203 },
  { id: "6", name: "Claude", category: "Assistant", vendor: "Anthropic", status: "approved", usageCount: 278 },
];

const defaultRequests = [
  { id: "r1", userId: "u1", toolName: "Notion AI", reason: "Need for team documentation and knowledge base", task: "Content organization", priority: "high", status: "submitted", user: "Sarah Chen" },
  { id: "r2", userId: "u2", toolName: "Cursor", reason: "Advanced AI coding assistant for frontend work", task: "Development", priority: "medium", status: "submitted", user: "Alex Rivera" },
  { id: "r3", userId: "u3", toolName: "Perplexity Pro", reason: "Research and competitive analysis", task: "Market research", priority: "low", status: "submitted", user: "Priya Patel" },
];

export default function AdminToolsPage() {
  const { data: tools } = useQuery<AiTool[]>({ queryKey: ["/api/ai-tools"] });
  const { data: requests } = useQuery<ToolRequest[]>({ queryKey: ["/api/tool-requests"] });
  const displayTools = tools || defaultTools;
  const displayRequests = requests || defaultRequests;

  const updateRequestMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/tool-requests/${id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/tool-requests"] }),
  });

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">AI Tools Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Inventory, approvals, and usage analytics</p>
      </motion.div>

      <Tabs defaultValue="inventory">
        <TabsList className="mb-4">
          <TabsTrigger value="inventory" data-testid="tab-inventory">Inventory</TabsTrigger>
          <TabsTrigger value="requests" data-testid="tab-requests">
            Approval Queue
            {displayRequests.filter((r: any) => r.status === "submitted").length > 0 && (
              <Badge variant="destructive" className="ml-1.5 text-[10px] px-1.5">
                {displayRequests.filter((r: any) => r.status === "submitted").length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <motion.div variants={fadeUp}>
            <Card className="overflow-visible">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 text-xs text-muted-foreground font-medium">Tool</th>
                      <th className="text-left p-3 text-xs text-muted-foreground font-medium">Category</th>
                      <th className="text-left p-3 text-xs text-muted-foreground font-medium">Vendor</th>
                      <th className="text-center p-3 text-xs text-muted-foreground font-medium">Status</th>
                      <th className="text-center p-3 text-xs text-muted-foreground font-medium">Usage/mo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayTools.map((tool: any) => {
                      const Icon = categoryIcons[tool.category] || Bot;
                      return (
                        <tr key={tool.id} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-[#7C3AED]" />
                              <span className="font-medium">{tool.name}</span>
                            </div>
                          </td>
                          <td className="p-3 text-muted-foreground">{tool.category}</td>
                          <td className="p-3 text-muted-foreground">{tool.vendor}</td>
                          <td className="p-3 text-center">
                            <Badge variant={tool.status === "approved" ? "secondary" : "outline"} className="text-[10px]">
                              {tool.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-center font-medium">{tool.usageCount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="requests">
          <div className="space-y-3">
            {displayRequests.filter((r: any) => r.status === "submitted").map((req: any) => (
              <motion.div key={req.id} variants={fadeUp}>
                <Card className="p-4" data-testid={`card-request-${req.id}`}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-sm">{req.toolName}</h4>
                        <Badge variant={req.priority === "high" ? "destructive" : req.priority === "medium" ? "secondary" : "outline"} className="text-[10px]">
                          {req.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Requested by {req.user || req.userId}</p>
                      <p className="text-sm text-muted-foreground mt-2">{req.reason}</p>
                      {req.task && <p className="text-xs text-muted-foreground mt-1">Task: {req.task}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="rounded-full bg-green-600 hover:bg-green-700 text-white no-default-hover-elevate"
                        onClick={() => updateRequestMutation.mutate({ id: req.id, status: "approved" })}
                        data-testid={`button-approve-${req.id}`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => updateRequestMutation.mutate({ id: req.id, status: "denied" })}
                        data-testid={`button-deny-${req.id}`}
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Deny
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            {displayRequests.filter((r: any) => r.status === "submitted").length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No pending requests</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
