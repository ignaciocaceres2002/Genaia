import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Course } from "@shared/schema";
import { CheckCircle2, Lock, Circle, ArrowRight } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const defaultCourses = [
  { id: "1", title: "Reading the Machine", skill: "Data Fluency", description: "Learn to interpret AI outputs with confidence", modulesCount: 6, progress: 83, status: "active" },
  { id: "2", title: "The Change Lab", skill: "Adaptive Mindset", description: "Build learning agility for the AI era", modulesCount: 5, progress: 60, status: "active" },
  { id: "3", title: "Trust But Verify", skill: "Verification Mindset", description: "Master the art of AI verification", modulesCount: 6, progress: 66, status: "active" },
  { id: "4", title: "The Tandem", skill: "Co-Intelligence", description: "Design powerful human-AI partnerships", modulesCount: 6, progress: 33, status: "active" },
  { id: "5", title: "The Self-Starter", skill: "Autonomous Drive", description: "Lead your own AI transformation", modulesCount: 5, progress: 60, status: "active" },
  { id: "6", title: "Reimagine Everything", skill: "Process Reimagination", description: "See the workflows that should exist", modulesCount: 6, progress: 16, status: "active" },
  { id: "7", title: "Your AI Playbook", skill: "Role-Specific", description: "Tailored strategies for your exact role", modulesCount: 4, progress: 0, status: "locked" },
  { id: "8", title: "The Superagent Path", skill: "Advanced", description: "The final push to superhuman capability", modulesCount: 4, progress: 0, status: "locked" },
];

function getModuleStatuses(total: number, progressPct: number) {
  const completed = Math.round((progressPct / 100) * total);
  return Array.from({ length: total }, (_, i) => {
    if (i < completed) return "done";
    if (i === completed) return "current";
    return "locked";
  });
}

export default function LearningPage() {
  const { data: courses } = useQuery<Course[]>({ queryKey: ["/api/courses"] });

  const displayCourses = courses ? defaultCourses.map((dc) => {
    const found = courses.find((c) => c.title === dc.title);
    return found ? { ...dc, ...found } : dc;
  }) : defaultCourses;

  const recommendedIndex = displayCourses.findIndex((c) => c.progress > 0 && c.progress < 100);

  return (
    <motion.div className="max-w-3xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Learning Path</h1>
        <p className="text-muted-foreground text-sm mt-1">Duolingo-style progression through 8 courses</p>
      </motion.div>

      <div className="space-y-2">
        {displayCourses.map((course, courseIdx) => {
          const modules = getModuleStatuses(course.modulesCount, course.progress);
          const isLocked = course.status === "locked";
          const isRecommended = courseIdx === recommendedIndex;

          return (
            <motion.div key={course.id} variants={fadeUp}>
              <Card className={`p-5 ${isLocked ? "opacity-50" : ""}`} data-testid={`card-course-${course.id}`}>
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{course.title}</h3>
                      {isRecommended && (
                        <Badge className="bg-[#7C3AED] text-white text-[10px] no-default-hover-elevate no-default-active-elevate">Recommended</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{course.skill} · {course.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{course.progress}%</p>
                    <p className="text-xs text-muted-foreground">{course.modulesCount} modules</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    {modules.map((status, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {i > 0 && <div className={`w-4 h-0.5 ${status === "locked" ? "bg-muted" : "bg-[#7C3AED]"}`} />}
                        <div className="relative">
                          {status === "done" ? (
                            <CheckCircle2 className="w-7 h-7 text-[#7C3AED]" />
                          ) : status === "current" ? (
                            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                              <Circle className="w-7 h-7 text-[#7C3AED] stroke-2" />
                            </motion.div>
                          ) : (
                            <Lock className="w-5 h-5 text-muted-foreground mx-1" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {!isLocked && (
                    <Button size="sm" variant="ghost" className="text-xs" data-testid={`button-course-${course.id}`}>
                      {course.progress > 0 ? "Continue" : "Start"} <ArrowRight className="w-3 h-3 ml-1" />
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
