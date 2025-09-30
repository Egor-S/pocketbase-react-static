import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/secret")({
  component: Me,
});

function Me() {
  return <div className="p-2">Only logged in users can see this page</div>;
}
