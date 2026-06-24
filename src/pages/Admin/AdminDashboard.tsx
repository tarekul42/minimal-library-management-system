import { Navigate, Link } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Tags } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user || (user.role !== "admin" && user.role !== "librarian")) {
    return <Navigate to="/login" replace />;
  }

  const links = [
    {
      title: "Books",
      description: "Manage book catalog",
      icon: BookOpen,
      href: "/admin/books",
    },
    {
      title: "Authors",
      description: "Manage authors",
      icon: Users,
      href: "/admin/authors",
    },
    {
      title: "Categories",
      description: "Manage categories",
      icon: Tags,
      href: "/admin/categories",
    },
  ];

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <h1 className="text-3xl mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.href} to={link.href}>
            <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-colors h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <link.icon className="h-5 w-5" />
                  {link.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
