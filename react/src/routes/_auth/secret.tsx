import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/secret")({
  component: Me,
});

function Me() {
  return <p>Only logged in users can see this page</p>;
}
