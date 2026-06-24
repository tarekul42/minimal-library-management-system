import { Navigate, Link } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { toast } from "sonner";

const Reports = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleExport = (format: string) => {
    toast.info(`${format.toUpperCase()} export coming soon`);
  };

  const reports = [
    {
      title: "Borrow Report",
      description: "All borrow records with user and book details",
      onCsv: () => handleExport("csv"),
      onPdf: () => handleExport("pdf"),
    },
    {
      title: "Fines Report",
      description: "All fine records with payment status",
      onCsv: () => handleExport("csv"),
      onPdf: () => handleExport("pdf"),
    },
    {
      title: "Popular Books",
      description: "Most borrowed books ranking",
      onCsv: () => handleExport("csv"),
      onPdf: () => handleExport("pdf"),
    },
  ];

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Admin
      </Link>

      <h1 className="text-3xl mb-6 flex items-center gap-2">
        <FileText className="h-5 w-5" />
        Reports
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((r) => (
          <Card key={r.title} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>{r.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{r.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={r.onCsv}>
                  <Download className="h-4 w-4 mr-1" /> CSV
                </Button>
                <Button variant="outline" size="sm" onClick={r.onPdf}>
                  <Download className="h-4 w-4 mr-1" /> PDF
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
