import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { AiTool } from "@shared/schema";
import { ExternalLink, Plus, Bot, FileText, Code, Image, MessageSquare, BarChart3 } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const categoryIcons: Record<string, any> = {
  "Writing": FileText, "Code": Code, "Image": Image, "Chat": MessageSquare, "Analytics": BarChart3, "Assistant": Bot,
};

const defaultTools: Array<{ id: string; name: string; category: string; vendor: string; status: string; usageCount: number }> = [
  { id: "1", name: "ChatGPT Enterprise", category: "Chat", vendor: "OpenAI", status: "approved", usageCount: 342 },
  { id: "2", name: "GitHub Copilot", category: "Code", vendor: "GitHub", status: "approved", usageCount: 189 },
  { id: "3", name: "Jasper AI", category: "Writing", vendor: "Jasper", status: "approved", usageCount: 156 },
  { id: "4", name: "Midjourney", category: "Image", vendor: "Midjourney", status: "approved", usageCount: 87 },
  { id: "5", name: "Tableau AI", category: "Analytics", vendor: "Salesforce", status: "approved", usageCount: 203 },
  { id: "6", name: "Claude", category: "Assistant", vendor: "Anthropic", status: "approved", usageCount: 278 },
  { id: "7", name: "Notion AI", category: "Writing", vendor: "Notion", status: "review", usageCount: 0 },
  { id: "8", name: "Cursor", category: "Code", vendor: "Cursor Inc.", status: "review", usageCount: 0 },
];

export default function ToolsPage() {
  const { data: tools } = useQuery<AiTool[]>({ queryKey: ["/api/ai-tools"] });
  const displayTools = tools || defaultTools;

  return (
    <motion.div className="max-w-4xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp} className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">AI Tools</h1>
          <p className="text-muted-foreground text-sm mt-1">Your approved tools and requests</p>
        </div>
        <Button size="sm" className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-request-tool">
          <Plus className="w-4 h-4 mr-1" /> Request Tool
        </Button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayTools.map((tool: any) => {
          const Icon = categoryIcons[tool.category] || Bot;
          return (
            <motion.div key={tool.id} variants={fadeUp}>
              <Card className="p-4 h-full flex flex-col" data-testid={`card-tool-${tool.id}`}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-md bg-[#7C3AED]/10 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-[#7C3AED]" />
                  </div>
                  <Badge variant={tool.status === "approved" ? "secondary" : "outline"} className="text-[10px]">
                    {tool.status === "approved" ? "Approved" : "In Review"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm">{tool.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">{tool.vendor} · {tool.category}</p>
                {tool.status === "approved" && (
                  <p className="text-xs text-muted-foreground mb-auto">{tool.usageCount} uses this month</p>
                )}
                <div className="mt-3">
                  {tool.status === "approved" ? (
                    <Button size="sm" variant="outline" className="w-full rounded-full text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" /> Launch
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary" className="w-full rounded-full text-xs" disabled>
                      Pending Review
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
