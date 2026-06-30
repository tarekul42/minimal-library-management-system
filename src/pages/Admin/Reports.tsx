import { useState } from "react";
import { Navigate, Link } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FileText, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDownloadReportMutation } from "@/redux/api/reportsApi";

type ExportStatus = Record<string, "idle" | "loading" | "error">;

const Reports = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [downloadReport] = useDownloadReportMutation();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [exporting, setExporting] = useState<ExportStatus>({});

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const buildUrl = (base: string, format: string) => {
    const params = new URLSearchParams({ format });
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (status) params.set("status", status);
    return `${base}?${params.toString()}`;
  };

  const handleExport = async (key: string, url: string, filename: string) => {
    setExporting((prev) => ({ ...prev, [key]: "loading" }));
    try {
      await downloadReport({ url, filename }).unwrap();
      toast.success(`${filename} downloaded`);
    } catch (err) {
      console.error("Report download failed:", err);
      toast.error(`Failed to download ${filename}`);
    } finally {
      setExporting((prev) => ({ ...prev, [key]: "idle" }));
    }
  };

  const reports = [
    {
      key: "borrows",
      title: "Borrow Report",
      description: "All borrow records with user and book details",
      hasDateRange: true,
      hasStatus: true,
      csv: () => handleExport("borrows-csv", buildUrl("/reports/borrows", "csv"), "borrows-report.csv"),
      pdf: () => handleExport("borrows-pdf", buildUrl("/reports/borrows", "pdf"), "borrows-report.pdf"),
    },
    {
      key: "fines",
      title: "Fines Report",
      description: "All fine records with payment status",
      hasDateRange: true,
      hasStatus: false,
      csv: () => handleExport("fines-csv", buildUrl("/reports/fines", "csv"), "fines-report.csv"),
      pdf: () => handleExport("fines-pdf", buildUrl("/reports/fines", "pdf"), "fines-report.pdf"),
    },
    {
      key: "books",
      title: "Books Report",
      description: "Complete book catalog with availability and ratings",
      hasDateRange: false,
      hasStatus: false,
      csv: () => handleExport("books-csv", "/reports/books?format=csv", "books-report.csv"),
      pdf: () => handleExport("books-pdf", "/reports/books?format=pdf", "books-report.pdf"),
    },
    {
      key: "popular",
      title: "Popular Books",
      description: "Most borrowed books ranking",
      hasDateRange: false,
      hasStatus: false,
      csv: () => handleExport("popular-csv", "/reports/popular?format=csv", "popular-books-report.csv"),
      pdf: () => handleExport("popular-pdf", "/reports/popular?format=pdf", "popular-books-report.pdf"),
    },
  ];

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0 space-y-6">
      <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Admin
      </Link>

      <h1 className="text-3xl mb-6 flex items-center gap-2">
        <FileText className="h-5 w-5" />
        Reports
      </h1>

      <Card className="bg-gray-900 border-gray-800 p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Date Range Filter</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <Label className="text-xs text-muted-foreground">From</Label>
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-44 bg-gray-800 border-gray-700" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">To</Label>
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-44 bg-gray-800 border-gray-700" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Status</Label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-36 h-10 rounded-md border border-gray-700 bg-gray-800 px-3 text-sm text-gray-300">
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="returned">Returned</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            {(from || to || status) && (
              <Button variant="ghost" size="sm" onClick={() => { setFrom(""); setTo(""); setStatus(""); }}>
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {reports.map((r) => (
          <Card key={r.key} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-base">{r.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{r.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={r.csv} disabled={exporting[`${r.key}-csv`] === "loading"}>
                  {exporting[`${r.key}-csv`] === "loading" ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Download className="h-4 w-4 mr-1" />}
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={r.pdf} disabled={exporting[`${r.key}-pdf`] === "loading"}>
                  {exporting[`${r.key}-pdf`] === "loading" ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Download className="h-4 w-4 mr-1" />}
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
