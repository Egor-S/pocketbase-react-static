import { CurrentUser } from "@/components/CurrentUser";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <CurrentUser className="p-2" />
      <div className="p-2">
        <h3>Welcome to pocketbase-react-static!</h3>
        <Link
          to="/secret"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Open secret
        </Link>
      </div>
    </>
  );
}
