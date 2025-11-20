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

const libraryActions = [
  {
    icon: <BookOpen className="h-12 w-12" />,
    title: "View Books",
    description: "Browse the collection of available books.",
    button: "View Books",
  },
  {
    icon: <PlusCircle className="h-12 w-12" />,
    title: "Add Book",
    description: "Add a new book to the library database.",
    button: "Add Book",
  },
  {
    icon: <HandHelping className="h-12 w-12" />,
    title: "Start Borrowing",
    description: "Borrow books from the library easily.",
    button: "Borrow Book",
  },
  {
    icon: <ClipboardList className="h-12 w-12" />,
    title: "View Summary",
    description: "See your borrowing history and statistics.",
    button: "See Summary",
  },
];

const Banner = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4 py-2 md:py-3 lg:py-4">
      {libraryActions &&
        libraryActions.map((action, index) => (
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
                type="submit"
                className="w-full bg-gray-300 text-gray-950 cursor-pointer"
              >
                <span className="w-full flex justify-between">
                  <span className="flex gap-x-2 items-center justify-items-center">
                    {action.icon}
                    {action.button}
                  </span>
                  <ArrowRight className="ml-2" />
                </span>
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default Banner;
