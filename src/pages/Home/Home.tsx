import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl p-1 sm:p-2 lg:p-4">Minimal Library Management System</h1>
        <h1 className="text-xl md:text-2xl lg:text-3xl p-1 sm:p-2 lg:p-4">Our Available Books</h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4 py-2 md:py-3 lg:py-4">
          <Card className="w-full max-w-sm bg-gray-900 border-0 text-gray-300">
            <CardHeader>
              <img
                className="rounded-xl"
                src="https://i.ibb.co/j9pJxVL0/LmpwZw.jpg"
                alt="The Theory of Everything Book Image"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>Theory of Everything</CardTitle>
              <CardDescription>Stephen Hawking</CardDescription>
              {/* <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction> */}
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-gray-300 text-gray-950"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                className="w-full bg-gray-900 border-gray-800"
              >
                Borrow this book
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-full max-w-sm bg-gray-900 border-0 text-gray-300">
            <CardHeader>
              <img
                className="rounded-xl"
                src="https://i.ibb.co/j9pJxVL0/LmpwZw.jpg"
                alt="The Theory of Everything Book Image"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>Theory of Everything</CardTitle>
              <CardDescription>Stephen Hawking</CardDescription>
              {/* <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction> */}
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-gray-300 text-gray-950"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                className="w-full bg-gray-900 border-gray-800"
              >
                Borrow this book
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-full max-w-sm bg-gray-900 border-0 text-gray-300">
            <CardHeader>
              <img
                className="rounded-xl"
                src="https://i.ibb.co/j9pJxVL0/LmpwZw.jpg"
                alt="The Theory of Everything Book Image"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>Theory of Everything</CardTitle>
              <CardDescription>Stephen Hawking</CardDescription>
              {/* <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction> */}
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-gray-300 text-gray-950"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                className="w-full bg-gray-900 border-gray-800"
              >
                Borrow this book
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-full max-w-sm bg-gray-900 border-0 text-gray-300">
            <CardHeader>
              <img
                className="rounded-xl"
                src="https://i.ibb.co/j9pJxVL0/LmpwZw.jpg"
                alt="The Theory of Everything Book Image"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>Theory of Everything</CardTitle>
              <CardDescription>Stephen Hawking</CardDescription>
              {/* <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction> */}
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-gray-300 text-gray-950"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                className="w-full bg-gray-900 border-gray-800"
              >
                Borrow this book
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-full max-w-sm bg-gray-900 border-0 text-gray-300">
            <CardHeader>
              <img
                className="rounded-xl"
                src="https://i.ibb.co/j9pJxVL0/LmpwZw.jpg"
                alt="The Theory of Everything Book Image"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>Theory of Everything</CardTitle>
              <CardDescription>Stephen Hawking</CardDescription>
              {/* <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction> */}
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-gray-300 text-gray-950"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                className="w-full bg-gray-900 border-gray-800"
              >
                Borrow this book
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-full max-w-sm bg-gray-900 border-0 text-gray-300">
            <CardHeader>
              <img
                className="rounded-xl"
                src="https://i.ibb.co/j9pJxVL0/LmpwZw.jpg"
                alt="The Theory of Everything Book Image"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>Theory of Everything</CardTitle>
              <CardDescription>Stephen Hawking</CardDescription>
              {/* <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction> */}
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-gray-300 text-gray-950"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                className="w-full bg-gray-900 border-gray-800"
              >
                Borrow this book
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Link to="/books">
          <Button className="rounded bg-gray-300 text-gray-950 my-2 md:my-3 lg:my-4">
            Explore all books
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Home;
