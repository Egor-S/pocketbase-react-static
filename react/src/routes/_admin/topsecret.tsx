import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/topsecret")({
  component: TopSecret,
});

function TopSecret() {
  return <div>Only admins can see this page</div>;
}
