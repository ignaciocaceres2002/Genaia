import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import type { Policy } from "@shared/schema";
import { FileText, MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const defaultPolicies: Array<{ id: string; title: string; category: string; summary: string; version: string; status: string; updatedAt: string }> = [
  { id: "1", title: "Acceptable AI Use Policy", category: "General", summary: "Guidelines for responsible AI tool usage within the organization, covering approved tools, data handling, and output verification requirements.", version: "2.1", status: "published", updatedAt: "2025-01-15" },
  { id: "2", title: "AI Data Privacy Standards", category: "Privacy", summary: "Requirements for handling sensitive data when using AI tools, including PII restrictions, data retention policies, and cross-border considerations.", version: "1.3", status: "published", updatedAt: "2025-01-10" },
  { id: "3", title: "Client-Facing AI Content", category: "Client-Facing", summary: "Standards for using AI-generated content in client communications, presentations, and deliverables. Includes disclosure requirements.", version: "1.0", status: "published", updatedAt: "2024-12-20" },
  { id: "4", title: "AI Ethics Framework", category: "Ethics", summary: "Core principles guiding AI adoption decisions, bias monitoring, fairness standards, and escalation procedures for ethical concerns.", version: "1.1", status: "published", updatedAt: "2025-01-05" },
  { id: "5", title: "Marketing AI Guidelines", category: "Dept-Specific", summary: "Department-specific rules for AI use in marketing campaigns, brand voice consistency, and creative asset generation.", version: "1.0", status: "published", updatedAt: "2025-02-01" },
];

export default function PoliciesPage() {
  const { data: policies } = useQuery<Policy[]>({ queryKey: ["/api/policies"] });
  const displayPolicies = policies || defaultPolicies;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Hi! I can help you understand any of our AI policies. What would you like to know?" },
  ]);

  const handleSendChat = () => {
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, { role: "user", content: userMsg }]);
    setChatMessage("");
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: `Based on our Acceptable AI Use Policy (v2.1), ${userMsg.toLowerCase().includes("data") ? "all sensitive data must be anonymized before being input into any AI tool. See Section 3.2 of our Data Privacy Standards for specific requirements." : "employees should always verify AI-generated outputs before using them in any business context. Please refer to Section 2.1 of our Acceptable AI Use Policy for detailed guidelines."}` },
      ]);
    }, 1000);
  };

  const categories = [...new Set(displayPolicies.map((p: any) => p.category))];

  return (
    <motion.div className="max-w-4xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Policies</h1>
        <p className="text-muted-foreground text-sm mt-1">AI governance policies and guidelines</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {categories.map((cat) => (
            <motion.div key={cat} variants={fadeUp}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">{cat}</h3>
              <div className="space-y-2">
                {displayPolicies.filter((p: any) => p.category === cat).map((policy: any) => (
                  <Card key={policy.id} className="overflow-visible" data-testid={`card-policy-${policy.id}`}>
                    <div
                      className="p-4 cursor-pointer hover-elevate"
                      onClick={() => setExpandedId(expandedId === policy.id ? null : policy.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <FileText className="w-4 h-4 text-[#7C3AED] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{policy.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">v{policy.version} · Updated {new Date(policy.updatedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        {expandedId === policy.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </div>
                    {expandedId === policy.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed pl-7">{policy.summary}</p>
                      </motion.div>
                    )}
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp}>
          <Card className="p-4 sticky top-20">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-[#7C3AED]" />
              <h3 className="font-semibold text-sm">Policy Chat</h3>
            </div>
            <div className="h-[300px] overflow-y-auto space-y-3 mb-3 pr-1">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-md px-3 py-2 text-xs leading-relaxed ${msg.role === "user" ? "bg-[#7C3AED] text-white" : "bg-muted text-foreground"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about any policy..."
                className="text-xs"
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                data-testid="input-policy-chat"
              />
              <Button size="icon" onClick={handleSendChat} className="bg-[#7C3AED] text-white border-[#7C3AED] flex-shrink-0" data-testid="button-send-policy-chat">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
