import { Button } from "./button";

interface ErrorRetryProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorRetry({ message = "Failed to load data", onRetry }: ErrorRetryProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center" role="alert">
      <p className="text-destructive mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
