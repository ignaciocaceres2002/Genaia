import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Team, ImportedEmployee } from "@shared/schema";
import { Search, Minus, Trophy, Users, Download, Upload, FileSpreadsheet, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import writeXlsxFile from "write-excel-file/browser";
import readXlsxFile from "read-excel-file/browser";
import { useToast } from "@/hooks/use-toast";
import { fadeUp, pageContainer } from "@/lib/motion-variants";

const CHART_1 = "hsl(var(--chart-1))";
const CHART_2 = "hsl(var(--chart-2))";

const defaultTeams: Team[] = [
  { id: "1", name: "Engineering", department: "Engineering", headcount: 45, avgNq: 62, completionPct: 78, engagementScore: 85, champion: "Marcus Johnson" },
  { id: "2", name: "Marketing", department: "Marketing", headcount: 22, avgNq: 58, completionPct: 65, engagementScore: 72, champion: "Elena Rodriguez" },
  { id: "3", name: "Finance", department: "Finance", headcount: 18, avgNq: 51, completionPct: 55, engagementScore: 63, champion: "James Wright" },
  { id: "4", name: "Product", department: "Product", headcount: 15, avgNq: 66, completionPct: 82, engagementScore: 88, champion: "Aisha Patel" },
  { id: "5", name: "Sales", department: "Sales", headcount: 30, avgNq: 44, completionPct: 42, engagementScore: 48, champion: null },
  { id: "6", name: "Legal", department: "Legal", headcount: 10, avgNq: 55, completionPct: 60, engagementScore: 65, champion: "David Kim" },
  { id: "7", name: "People Ops", department: "People Ops", headcount: 12, avgNq: 60, completionPct: 70, engagementScore: 75, champion: null },
];

const selectedTeamSkills = [
  { skill: "Data", score: 68, companyAvg: 55 },
  { skill: "Adaptive", score: 62, companyAvg: 52 },
  { skill: "Verify", score: 72, companyAvg: 58 },
  { skill: "Co-Intel", score: 55, companyAvg: 48 },
  { skill: "Drive", score: 65, companyAvg: 50 },
  { skill: "Process", score: 58, companyAvg: 45 },
];

const KNOWN_FIELDS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "department", label: "Department" },
  { key: "title", label: "Title" },
  { key: "isChampion", label: "Is Champion" },
] as const;

type KnownFieldKey = typeof KNOWN_FIELDS[number]["key"];

type SortKey = keyof Pick<ImportedEmployee, "name" | "email" | "role" | "department" | "title" | "isChampion">;

async function downloadTemplate(format: "csv" | "xlsx") {
  const headers = ["Name", "Email", "Role", "Team/Department", "Title", "Is Champion"];

  if (format === "csv") {
    const csvContent = headers.join(",") + "\n";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employee_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  } else {
    const data = [headers.map((h) => ({ value: h, fontWeight: "bold" as const }))];
    await writeXlsxFile(data, { fileName: "employee_template.xlsx" });
  }
}

export default function AdminTeamsPage() {
  const { data: teams } = useQuery<Team[]>({ queryKey: ["/api/teams"] });
  const { data: importedEmployees, isLoading: employeesLoading } = useQuery<ImportedEmployee[]>({ queryKey: ["/api/imported-employees"] });
  const displayTeams = teams || defaultTeams;
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"teams" | "employees">("teams");

  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importStep, setImportStep] = useState<"upload" | "mapping">("upload");
  const [dragOver, setDragOver] = useState(false);
  const [parsedColumns, setParsedColumns] = useState<string[]>([]);
  const [parsedRows, setParsedRows] = useState<Record<string, string>[]>([]);
  const [fieldMapping, setFieldMapping] = useState<Record<string, KnownFieldKey | "">>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [empSearch, setEmpSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const { toast } = useToast();

  const bulkImportMutation = useMutation({
    mutationFn: (employees: object[]) =>
      apiRequest("POST", "/api/imported-employees/bulk", { employees }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/imported-employees"] });
      setImportModalOpen(false);
      setImportStep("upload");
      setParsedColumns([]);
      setParsedRows([]);
      setFieldMapping({});
      toast({ title: "Import successful", description: "Employees have been imported." });
    },
    onError: () => {
      toast({ title: "Import failed", description: "Could not save employees.", variant: "destructive" });
    },
  });

  const filteredTeams = displayTeams.filter((t: Team) => t.name.toLowerCase().includes(search.toLowerCase()));
  const selected = displayTeams.find((t: Team) => t.id === selectedTeam);

  function applyParsedRows(rows: string[][]) {
    if (!rows || rows.length === 0) {
      toast({ title: "Empty file", description: "The file contains no data rows.", variant: "destructive" });
      return;
    }
    const headers = rows[0].map(String);
    if (headers.length === 0) {
      toast({ title: "No columns found", description: "Could not detect column headers.", variant: "destructive" });
      return;
    }
    const dataRows = rows.slice(1).map((r) =>
      Object.fromEntries(headers.map((h, i) => [h, String(r[i] ?? "")]))
    );
    setParsedColumns(headers);
    setParsedRows(dataRows);
    const autoMapping: Record<string, KnownFieldKey | ""> = {};
    for (const col of headers) {
      const lc = col.toLowerCase().trim();
      const match = KNOWN_FIELDS.find(
        (f) =>
          f.label.toLowerCase() === lc ||
          f.key.toLowerCase() === lc ||
          (f.key === "isChampion" && (lc === "is champion" || lc === "champion")) ||
          (f.key === "department" && (lc === "team/department" || lc === "team" || lc === "dept"))
      );
      autoMapping[col] = match ? match.key : "";
    }
    setFieldMapping(autoMapping);
    setImportStep("mapping");
  }

  function parseFile(file: File) {
    const isXlsx = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");

    if (isXlsx) {
      readXlsxFile(file)
        .then((rows) => {
          applyParsedRows(rows.map((row) => row.map((cell) => (cell === null ? "" : String(cell)))));
        })
        .catch(() => {
          toast({ title: "Failed to parse file", description: "The file could not be read. Ensure it is a valid XLSX file.", variant: "destructive" });
        });
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const rows = text
            .split(/\r?\n/)
            .filter((line) => line.trim() !== "")
            .map((line) => line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, "")));
          applyParsedRows(rows);
        } catch {
          toast({ title: "Failed to parse file", description: "The file could not be read. Ensure it is a valid CSV file.", variant: "destructive" });
        }
      };
      reader.onerror = () => {
        toast({ title: "File read error", description: "Could not read the file.", variant: "destructive" });
      };
      reader.readAsText(file);
    }
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) parseFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
  };

  function handleConfirmImport() {
    const employees = parsedRows.map((row) => {
      const emp: Record<string, unknown> = {};
      for (const col of parsedColumns) {
        const field = fieldMapping[col];
        if (!field) continue;
        if (field === "isChampion") {
          const val = row[col]?.toLowerCase?.() ?? "";
          emp[field] = val === "true" || val === "yes" || val === "1";
        } else {
          const v = (row[col] ?? "").trim();
          emp[field] = v;
        }
      }
      return emp;
    }).filter((e) => (e.name as string)?.trim() || (e.email as string)?.trim());

    if (employees.length === 0) {
      toast({ title: "No valid rows", description: "Make sure Name or Email columns are mapped and have data.", variant: "destructive" });
      return;
    }

    bulkImportMutation.mutate(employees);
  }

  const filteredEmployees = (importedEmployees ?? [])
    .filter((e) => {
      const q = empSearch.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        (e.email ?? "").toLowerCase().includes(q) ||
        (e.role ?? "").toLowerCase().includes(q) ||
        (e.department ?? "").toLowerCase().includes(q) ||
        (e.title ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortKey === "isChampion") {
        const aB = a.isChampion ? 1 : 0;
        const bB = b.isChampion ? 1 : 0;
        return sortDir === "asc" ? aB - bB : bB - aB;
      }
      const aVal = String(a[sortKey] ?? "");
      const bVal = String(b[sortKey] ?? "");
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />;
  }

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={pageContainer}>
      <motion.div variants={fadeUp} className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-display-xs font-bold">Teams</h1>
          <p className="text-muted-foreground text-sm mt-1">Compare team performance and AI adoption</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {activeTab === "teams" && (
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search teams..."
                className="pl-9 text-sm"
                data-testid="input-search-teams"
              />
            </div>
          )}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDownloadMenu((v) => !v)}
              data-testid="button-download-template"
            >
              <Download className="w-4 h-4 mr-1" />
              Download Template
            </Button>
            {showDownloadMenu && (
              <div className="absolute right-0 mt-1 bg-popover border rounded-md shadow-lg z-10 min-w-[140px]">
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent"
                  onClick={() => { downloadTemplate("csv"); setShowDownloadMenu(false); }}
                  data-testid="button-download-csv"
                >
                  CSV
                </button>
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent"
                  onClick={() => { downloadTemplate("xlsx"); setShowDownloadMenu(false); }}
                  data-testid="button-download-xlsx"
                >
                  XLSX
                </button>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setImportModalOpen(true); setImportStep("upload"); }}
            data-testid="button-import-employees"
          >
            <Upload className="w-4 h-4 mr-1" />
            Import Employees
          </Button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex gap-1 border-b">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "teams" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("teams")}
          data-testid="tab-teams"
        >
          Teams
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "employees" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("employees")}
          data-testid="tab-employees"
        >
          Employees
          {importedEmployees && importedEmployees.length > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">{importedEmployees.length}</Badge>
          )}
        </button>
      </motion.div>

      {activeTab === "teams" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div variants={fadeUp}>
              <Card className="overflow-visible">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-xs text-muted-foreground font-medium">Team</th>
                        <th className="text-center p-3 text-xs text-muted-foreground font-medium">Size</th>
                        <th className="text-center p-3 text-xs text-muted-foreground font-medium">Avg SQ</th>
                        <th className="text-center p-3 text-xs text-muted-foreground font-medium">Trend</th>
                        <th className="text-center p-3 text-xs text-muted-foreground font-medium">Completion</th>
                        <th className="text-center p-3 text-xs text-muted-foreground font-medium">Engagement</th>
                        <th className="text-left p-3 text-xs text-muted-foreground font-medium">Champion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTeams.map((team: Team) => {
                        const TrendIcon = Minus;
                        const trendColor = "text-muted-foreground";
                        return (
                          <tr
                            key={team.id}
                            className={`border-b cursor-pointer hover-elevate ${selectedTeam === team.id ? "bg-chart-1/5" : ""}`}
                            onClick={() => setSelectedTeam(team.id)}
                            data-testid={`row-team-${team.id}`}
                          >
                            <td className="p-3 font-medium">{team.name}</td>
                            <td className="p-3 text-center text-muted-foreground">{team.headcount}</td>
                            <td className="p-3 text-center font-semibold">{team.avgNq}</td>
                            <td className="p-3 text-center"><TrendIcon className={`w-4 h-4 mx-auto ${trendColor}`} /></td>
                            <td className="p-3 text-center">{team.completionPct}%</td>
                            <td className="p-3 text-center">{team.engagementScore}</td>
                            <td className="p-3">
                              {team.champion ? (
                                <div className="flex items-center gap-1">
                                  <Trophy className="w-3 h-3 text-amber-500" />
                                  <span className="text-xs">{team.champion}</span>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">None</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={fadeUp}>
            {selected ? (
              <Card className="p-5 sticky top-20">
                <h3 className="font-semibold mb-1">{selected.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  <Users className="w-3 h-3 inline mr-1" />{selected.headcount} members
                </p>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={selectedTeamSkills}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                      <Radar name="Team" dataKey="score" stroke={CHART_1} fill={CHART_1} fillOpacity={0.2} strokeWidth={2} />
                      <Radar name="Company" dataKey="companyAvg" stroke="hsl(var(--muted-foreground))" fill="none" strokeDasharray="4 4" strokeWidth={1} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            ) : (
              <Card className="p-5">
                <p className="text-sm text-muted-foreground text-center py-8">Select a team to view details</p>
              </Card>
            )}
          </motion.div>
        </div>
      )}

      {activeTab === "employees" && (
        <motion.div variants={fadeUp} className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-muted-foreground">{filteredEmployees.length} employee{filteredEmployees.length !== 1 ? "s" : ""}</p>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={empSearch}
                onChange={(e) => setEmpSearch(e.target.value)}
                placeholder="Search employees..."
                className="pl-9 text-sm"
                data-testid="input-search-employees"
              />
            </div>
          </div>
          <Card className="overflow-visible">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {(["name", "email", "role", "department", "title"] as SortKey[]).map((col) => (
                      <th
                        key={col}
                        className="text-left p-3 text-xs text-muted-foreground font-medium cursor-pointer select-none hover:text-foreground"
                        onClick={() => toggleSort(col)}
                        data-testid={`th-${col}`}
                      >
                        {col.charAt(0).toUpperCase() + col.slice(1)} <SortIcon col={col} />
                      </th>
                    ))}
                    <th
                      className="text-left p-3 text-xs text-muted-foreground font-medium cursor-pointer select-none hover:text-foreground"
                      onClick={() => toggleSort("isChampion")}
                      data-testid="th-isChampion"
                    >
                      Champion <SortIcon col="isChampion" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeesLoading ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground text-sm">Loading...</td>
                    </tr>
                  ) : filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground text-sm">
                        {empSearch ? "No employees match your search." : "No employees imported yet. Use the Import Employees button above."}
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="border-b hover:bg-muted/30" data-testid={`row-employee-${emp.id}`}>
                        <td className="p-3 font-medium" data-testid={`text-emp-name-${emp.id}`}>{emp.name}</td>
                        <td className="p-3 text-muted-foreground" data-testid={`text-emp-email-${emp.id}`}>{emp.email}</td>
                        <td className="p-3" data-testid={`text-emp-role-${emp.id}`}>{emp.role || <span className="text-muted-foreground">—</span>}</td>
                        <td className="p-3" data-testid={`text-emp-dept-${emp.id}`}>{emp.department || <span className="text-muted-foreground">—</span>}</td>
                        <td className="p-3" data-testid={`text-emp-title-${emp.id}`}>{emp.title || <span className="text-muted-foreground">—</span>}</td>
                        <td className="p-3" data-testid={`text-emp-champion-${emp.id}`}>
                          {emp.isChampion ? (
                            <Badge variant="secondary" className="text-xs gap-1">
                              <Trophy className="w-3 h-3 text-amber-500" /> Champion
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}

      <Dialog open={importModalOpen} onOpenChange={(open) => { setImportModalOpen(open); if (!open) { setImportStep("upload"); setParsedColumns([]); setParsedRows([]); setFieldMapping({}); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5" />
              Import Employees
            </DialogTitle>
          </DialogHeader>

          {importStep === "upload" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Upload a CSV or XLSX file to import employees. Accepted columns: Name, Email, Role, Department, Title, Is Champion.</p>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-muted-foreground/50"}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                data-testid="dropzone-import"
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Drag & drop or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">CSV or XLSX files accepted</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={handleFileChange}
                  data-testid="input-file-import"
                />
              </div>
            </div>
          )}

          {importStep === "mapping" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {parsedRows.length} row{parsedRows.length !== 1 ? "s" : ""} detected. Map each column to an employee field.
              </p>
              {(() => {
                const counts: Record<string, number> = {};
                for (const v of Object.values(fieldMapping)) { if (v) counts[v] = (counts[v] || 0) + 1; }
                const hasDups = Object.values(counts).some((c) => c > 1);
                return hasDups ? (
                  <p className="text-xs text-destructive">Warning: multiple columns are mapped to the same field. Only the last mapped value will be used for each row.</p>
                ) : null;
              })()}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {parsedColumns.map((col) => {
                  const mappedVal = fieldMapping[col];
                  const counts: Record<string, number> = {};
                  for (const v of Object.values(fieldMapping)) { if (v) counts[v] = (counts[v] || 0) + 1; }
                  const isDuplicate = mappedVal && (counts[mappedVal] ?? 0) > 1;
                  return (
                    <div key={col} className="flex items-center gap-3">
                      <span className={`text-sm font-medium w-32 truncate ${isDuplicate ? "text-destructive" : ""}`} title={col}>{col}</span>
                      <span className="text-muted-foreground text-sm">→</span>
                      <Select
                        value={fieldMapping[col] || "__none__"}
                        onValueChange={(val) => setFieldMapping((prev) => ({ ...prev, [col]: val === "__none__" ? "" : val as KnownFieldKey }))}
                      >
                        <SelectTrigger className={`flex-1 text-sm h-8 ${isDuplicate ? "border-destructive" : ""}`} data-testid={`select-map-${col}`}>
                          <SelectValue placeholder="Skip this column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">Skip this column</SelectItem>
                          {KNOWN_FIELDS.map((f) => (
                            <SelectItem key={f.key} value={f.key}>{f.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">At least Name or Email must be mapped for a row to be imported.</p>
            </div>
          )}

          <DialogFooter className="gap-2">
            {importStep === "mapping" && (
              <Button variant="outline" size="sm" onClick={() => setImportStep("upload")} data-testid="button-back-mapping">
                Back
              </Button>
            )}
            {importStep === "mapping" && (
              <Button
                size="sm"
                onClick={handleConfirmImport}
                disabled={bulkImportMutation.isPending}
                data-testid="button-confirm-import"
              >
                {bulkImportMutation.isPending ? "Importing..." : `Import ${parsedRows.length} Employees`}
              </Button>
            )}
            {importStep === "upload" && (
              <Button variant="outline" size="sm" onClick={() => setImportModalOpen(false)} data-testid="button-cancel-import">
                Cancel
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
