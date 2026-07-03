import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  PlusCircle,
  HandHelping,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/redux/hook";

const libraryActions = [
  {
    icon: <BookOpen className="h-12 w-12" aria-hidden="true" />,
    title: "View Books",
    description: "Browse the collection of available books.",
    button: "View Books",
    to: "/books",
  },
  {
    icon: <PlusCircle className="h-12 w-12" aria-hidden="true" />,
    title: "Add Book",
    description: "Add a new book to the library database.",
    button: "Add Book",
    to: "/create-book",
  },
  {
    icon: <HandHelping className="h-12 w-12" aria-hidden="true" />,
    title: "Start Borrowing",
    description: "Borrow books from the library easily.",
    button: "Borrow Book",
    to: "/books",
  },
  {
    icon: <ClipboardList className="h-12 w-12" aria-hidden="true" />,
    title: "View Summary",
    description: "See your borrowing history and statistics.",
    button: "See Summary",
    to: "/borrow-summary",
  },
];

const Banner = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4 py-2 md:py-3 lg:py-4">
      {libraryActions.map((action, index) =>
        action.to === "/create-book" && user?.role !== "admin" ? null : (
        <Card
          key={index}
          className="w-full max-w-sm bg-gray-900 border-0 text-gray-300"
        >
          <CardHeader className="text-3xl">{action.icon}</CardHeader>
          <CardContent className="space-y-3">
            <CardTitle>{action.title}</CardTitle>
            <CardDescription>{action.description}</CardDescription>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="button"
              className="w-full bg-gray-300 text-gray-950 cursor-pointer"
              onClick={() => navigate(action.to)}
              aria-label={action.button}
            >
              <span className="w-full flex justify-between">
                <span className="flex gap-x-2 items-center justify-items-center">
                  {action.icon}
                  {action.button}
                </span>
                <ArrowRight className="ml-2" aria-hidden="true" />
              </span>
            </Button>
          </CardFooter>
        </Card>
        ))}
    </div>
  );
};

export default Banner;
