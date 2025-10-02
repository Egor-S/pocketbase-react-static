import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        Welcome to pocketbase-react-static!
      </h3>
      <Link
        to="/secret"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Open secret
      </Link>
    </>
  );
}
