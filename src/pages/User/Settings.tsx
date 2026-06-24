import { Navigate } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Settings = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-1 items-start justify-center p-4 pt-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Notifications</h3>
            <p className="text-sm text-gray-400 mb-3">
              Manage your notification preferences
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Notification settings coming soon")}
            >
              Configure Notifications
            </Button>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="font-medium mb-2">Account</h3>
            <p className="text-sm text-gray-400 mb-3">Change your password or deactivate account</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Password change coming soon")}
            >
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
