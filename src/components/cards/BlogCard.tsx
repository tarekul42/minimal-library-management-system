import { Link } from "react-router";
import { Calendar, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface BlogCardPost {
  _id: string;
  title: string;
  excerpt: string;
  author: { name: string };
  publishedAt: string;
  readingTime: number;
  coverImage?: string;
  tags?: string[];
  slug?: string;
}

interface BlogCardProps {
  post: BlogCardPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden p-0">
      <Link to={`/blog/${post.slug ?? post._id}`} className="block">
        <AspectRatio ratio={16 / 9}>
          <img
            src={post.coverImage || "/images/blog-placeholder.svg"}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </AspectRatio>
      </Link>
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <Link to={`/blog/${post.slug ?? post._id}`}>
          <h3 className="line-clamp-2 font-semibold leading-snug hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author.name}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime} min read
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
