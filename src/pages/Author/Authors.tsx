import { Link } from "react-router";
import { useGetAuthorsQuery } from "@/redux/api/authorApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { User, Plus } from "lucide-react";
import type { IAuthor } from "@/types/author";

const Authors = () => {
  const { data, isLoading, isError } = useGetAuthorsQuery();
  const authors: IAuthor[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Spinner size={48} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center flex-1 text-destructive">
        <p>Failed to load authors.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl">Authors</h1>
        <Link to="/admin/authors">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Manage Authors
          </Button>
        </Link>
      </div>

      {authors.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">No authors yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {authors.map((author) => (
            <Link key={author._id} to={`/authors/${author._id}`}>
              <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-colors h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {author.photo ? (
                      <img src={author.photo} alt={author.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                    {author.name}
                  </CardTitle>
                </CardHeader>
                {author.bio && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{author.bio}</p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Authors;
