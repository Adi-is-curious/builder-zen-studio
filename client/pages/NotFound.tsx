import AppLayout from "@/components/common/AppLayout";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <AppLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-extrabold text-primary">404</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Page not found
        </p>
        <Link
          to="/"
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90"
        >
          Go Home
        </Link>
      </div>
    </AppLayout>
  );
};

export default NotFound;
