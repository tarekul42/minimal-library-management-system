import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SwitchField } from "@/components/forms";
import { useTheme } from "next-themes";
import { toast } from "sonner";

type NotificationSettings = {
  dueSoon: boolean;
  overdue: boolean;
  reservationReady: boolean;
  newsletter: boolean;
};

type PrivacySettings = {
  hideProfile: boolean;
};

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState<NotificationSettings>({
    dueSoon: true,
    overdue: true,
    reservationReady: true,
    newsletter: false,
  });
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    hideProfile: false,
  });

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Notification preference updated");
  };

  const togglePrivacy = (key: keyof PrivacySettings) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Privacy setting updated");
  };

  const tabs = ["Notifications", "Appearance", "Privacy"] as const;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Notifications");

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account preferences." />

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors -mb-px border-b-2 ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Notifications" && (
        <Card className="p-0">
          <CardHeader className="p-6 pb-4"><CardTitle>Email Notifications</CardTitle></CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <SwitchField label="Due soon reminders" checked={notifications.dueSoon} onCheckedChange={() => toggleNotification("dueSoon")} hint="Get a reminder 3 days before a book is due." />
            <SwitchField label="Overdue alerts" checked={notifications.overdue} onCheckedChange={() => toggleNotification("overdue")} hint="Get notified when a book becomes overdue." />
            <SwitchField label="Reservation ready" checked={notifications.reservationReady} onCheckedChange={() => toggleNotification("reservationReady")} hint="Get notified when a reserved book is available." />
            <SwitchField label="Newsletter" checked={notifications.newsletter} onCheckedChange={() => toggleNotification("newsletter")} hint="Monthly reading recommendations and library news." />
          </CardContent>
        </Card>
      )}

      {activeTab === "Appearance" && (
        <Card className="p-0">
          <CardHeader className="p-6 pb-4"><CardTitle>Theme</CardTitle></CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="flex flex-wrap gap-3">
              {(["light", "dark", "system"] as const).map((t) => (
                <Button
                  key={t}
                  variant={theme === t ? "default" : "outline"}
                  onClick={() => setTheme(t)}
                  className="capitalize"
                >
                  {t}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "Privacy" && (
        <Card className="p-0">
          <CardHeader className="p-6 pb-4"><CardTitle>Privacy</CardTitle></CardHeader>
          <CardContent className="p-6 pt-0">
            <SwitchField
              label="Hide profile from public reviews"
              checked={privacy.hideProfile}
              onCheckedChange={() => togglePrivacy("hideProfile")}
              hint="Your name won't appear next to book reviews you've written."
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
