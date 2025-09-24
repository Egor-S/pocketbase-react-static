# pocketbase-react-static

Ready to use SPA template for Pocketbase. Compiles to a single binary/Docker image.

## Quick start

- Fork repository
- Rename go packages with find-and-replace: `github.com/Egor-S/pocketbase-react-static` to `github.com/YOUR-ORG/YOUR-REPO`
- Update first migration in `pocketbase/migrations/1739793600_initial_settings.go`

## Tech stack

- Pocketbase Golang
- React TypeScript
- Tailwind CSS
- Vite
- shadcn/ui
- Storybook
- TanStack Router
- _Some_ State Management

## Integrations

- Pocketbase Typegen
- User auth and registration
- Admin auth
- GitHub action for building Docker image (multiplatform)
- Recommended extensions for VSCode
- Cursor IDE rules
