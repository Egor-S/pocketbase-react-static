import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/secret")({
  component: Secret,
});

function Secret() {
  return (
    <p>
      If you haven't been redirected to the login page, you are authenticated!
    </p>
  );
}
