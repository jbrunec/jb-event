import { useRouter } from "@tanstack/react-router";
import { AlertTriangle, RefreshCcw } from "lucide-react";

import { Button } from "./ui/Button";
import Card from "./ui/Card";

function ErrorComponent() {
  const router = useRouter();
  return (
    <Card className="flex flex-col items-center justify-center gap-2">
      <AlertTriangle className="size-8" />
      <p>Something went wrong</p>
      <Button variant="ghost" onClick={() => router.invalidate()}>
        <RefreshCcw className="size-4" />
        Try again
      </Button>
    </Card>
  );
}

export default ErrorComponent;
