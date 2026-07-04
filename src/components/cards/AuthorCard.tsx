import { Link } from "react-router";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { IAuthor } from "@/types/author";

interface AuthorCardProps {
  author: IAuthor;
  bookCount?: number;
}

export function AuthorCard({ author, bookCount }: AuthorCardProps) {
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="flex flex-col items-center p-6 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <Avatar className="mb-4 h-20 w-20">
        <AvatarImage src={author.photo} alt={author.name} />
        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
      </Avatar>
      <CardContent className="p-0 space-y-1">
        <h3 className="font-semibold">{author.name}</h3>
        {bookCount !== undefined && (
          <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <BookOpen className="h-3 w-3" />
            {bookCount} {bookCount === 1 ? "book" : "books"}
          </p>
        )}
        {author.bio && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{author.bio}</p>
        )}
      </CardContent>
      <CardFooter className="p-0 pt-4">
        <Button asChild variant="outline" size="sm">
          <Link to={`/authors/${author._id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
