import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/secret")({
  component: Secret,
});

function Secret() {
  return <p>Only logged in users can see this page</p>;
}
