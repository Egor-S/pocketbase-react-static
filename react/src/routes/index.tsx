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

      <div>
        <Link
          to="/secret"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Open /secret
        </Link>
        <span className="text-gray-500"> (authorization required)</span>
      </div>

      <div>
        <Link
          to="/topsecret"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Open /topsecret
        </Link>
        <span className="text-gray-500"> (admin authorization required)</span>
      </div>
    </>
  );
}
