import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    libraryName: "City Library",
    description: "A modern library serving the community with thousands of books and digital resources.",
    contactEmail: "library@example.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Library St, Booktown, BK 10001",
    loanPeriod: 14,
    renewalLimit: 3,
    finePerDay: 0.5,
    maxBorrows: 5,
    emailNotifications: true,
    smsNotifications: false,
    dueReminders: true,
    overdueAlerts: true,
  });

  const update = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast.success("Settings saved (mock)");
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Configure library-wide settings." />

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="borrowing">Borrowing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="p-0">
            <CardHeader className="p-6 pb-4"><CardTitle>General Settings</CardTitle></CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lib-name">Library Name</Label>
                <Input id="lib-name" value={settings.libraryName} onChange={(e) => update("libraryName", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lib-desc">Description</Label>
                <Textarea id="lib-desc" value={settings.description} onChange={(e) => update("description", e.target.value)} rows={3} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" value={settings.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" value={settings.contactPhone} onChange={(e) => update("contactPhone", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" value={settings.address} onChange={(e) => update("address", e.target.value)} rows={2} />
              </div>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="borrowing" className="mt-6">
          <Card className="p-0">
            <CardHeader className="p-6 pb-4"><CardTitle>Borrowing Rules</CardTitle></CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="loan-period">Loan Period (days)</Label>
                  <Input id="loan-period" type="number" value={settings.loanPeriod} onChange={(e) => update("loanPeriod", Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="renewal-limit">Renewal Limit</Label>
                  <Input id="renewal-limit" type="number" value={settings.renewalLimit} onChange={(e) => update("renewalLimit", Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fine-per-day">Fine Per Day ($)</Label>
                  <Input id="fine-per-day" type="number" step="0.01" value={settings.finePerDay} onChange={(e) => update("finePerDay", Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-borrows">Max Borrows Per User</Label>
                  <Input id="max-borrows" type="number" value={settings.maxBorrows} onChange={(e) => update("maxBorrows", Number(e.target.value))} />
                </div>
              </div>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="p-0">
            <CardHeader className="p-6 pb-4"><CardTitle>Notification Settings</CardTitle></CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              {[
                { key: "emailNotifications" as const, label: "Email Notifications", desc: "Send email notifications for all events" },
                { key: "smsNotifications" as const, label: "SMS Notifications", desc: "Send SMS for due reminders" },
                { key: "dueReminders" as const, label: "Due Reminders", desc: "Remind users before due date" },
                { key: "overdueAlerts" as const, label: "Overdue Alerts", desc: "Alert users when items are overdue" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch checked={settings[item.key]} onCheckedChange={(v) => update(item.key, v)} />
                </div>
              ))}
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="mt-6">
          <Card className="p-0">
            <CardHeader className="p-6 pb-4"><CardTitle>Branding</CardTitle></CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Library Logo</Label>
                <Input id="logo" type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground">Upload a logo image (PNG, SVG, or JPG, max 2MB).</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon</Label>
                <Input id="favicon" type="file" accept="image/*" />
              </div>
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  {["#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed", "#0891b2"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="h-8 w-8 rounded-full border-2 border-border transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                      onClick={() => toast.success(`Color ${color} selected (mock)`)}
                    />
                  ))}
                </div>
              </div>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
