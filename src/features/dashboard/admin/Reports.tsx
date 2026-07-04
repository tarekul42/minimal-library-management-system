import { useState } from "react";
import { useDownloadReportMutation } from "@/redux/api/reportsApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileDown, FileSpreadsheet, Download } from "lucide-react";
import { toast } from "sonner";

const REPORT_TYPES = [
  { value: "borrows", label: "Borrows" },
  { value: "returns", label: "Returns" },
  { value: "fines", label: "Fines" },
  { value: "users", label: "Users" },
  { value: "inventory", label: "Inventory" },
] as const;

export default function Reports() {
  const [reportType, setReportType] = useState("borrows");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [downloadReport, { isLoading }] = useDownloadReportMutation();

  const handleExport = async (format: "csv" | "pdf") => {
    const params = new URLSearchParams();
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);

    const url = `/reports/${reportType}?format=${format}&${params.toString()}`;
    const filename = `${reportType}-report-${new Date().toISOString().slice(0, 10)}.${format}`;

    try {
      await downloadReport({ url, filename }).unwrap();
      toast.success(`${format.toUpperCase()} report downloaded`);
    } catch {
      toast.error("Failed to download report");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Reports" description="Generate and export library reports." />

      <Card className="p-0">
        <CardHeader className="p-6 pb-4"><CardTitle>Report Generator</CardTitle></CardHeader>
        <CardContent className="p-6 pt-0 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPES.map((rt) => (
                    <SelectItem key={rt.value} value={rt.value}>{rt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-date">From Date</Label>
              <Input id="from-date" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-date">To Date</Label>
              <Input id="to-date" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleExport("csv")} disabled={isLoading}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={() => handleExport("pdf")} disabled={isLoading} variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardHeader className="p-6 pb-4"><CardTitle>Recent Reports</CardTitle></CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <Download className="h-12 w-12 text-muted-foreground/40" />
            <div>
              <p className="font-medium">No reports generated yet</p>
              <p className="text-sm text-muted-foreground">Use the generator above to create your first report.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
