import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/topsecret")({
  component: TopSecret,
});

function TopSecret() {
  return (
    <div>
      If you haven't been redirected to the admin login page, you are
      authenticated as admin!
    </div>
  );
}
