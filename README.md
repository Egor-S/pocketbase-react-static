# pocketbase-react-static

Ready to use opinionated SPA template for Pocketbase. Compiles to a single binary/Docker image.

## Quick start

- Create a new repository from this template (`gh repo create --template Egor-S/pocketbase-react-static`)
- Rename go packages with find-and-replace: `github.com/Egor-S/pocketbase-react-static` to `github.com/YOUR-ORG/YOUR-REPO`
- Update first migration in `pocketbase/migrations/1739793600_initial_settings.go`

```bash
# terminal 1
cd pocketbase
go run . serve
# terminal 2
cd react
npm install
npm run dev
```

## Tech stack & features

- Pocketbase Golang
- React TypeScript
- Tailwind CSS
- Vite
- shadcn/ui
- Storybook
- TanStack Router
- TanStack Query

Integrations:

- Pocketbase Typegen
- User auth and registration
- Admin auth
- GitHub action for building Docker image (multiplatform)
- Recommended extensions for VS Code
- Cursor IDE rules

## Why?

I love Pocketbase's idea of a single binary with minimal resources requirements, but fullstack frameworks like Next.js bring heavy Node.js for SSR. I've forced SvelteKit into SPA mode and created [pocketbase-sveltekit-static](https://github.com/Egor-S/pocketbase-sveltekit-static) template (basically, Svelte with file-based routing). It was fun, but I had hard time finding UI frameworks and components.

This time I've decided to start with React because of its ecosystem. Instead of fullstack frameworks, I've chosen TanStack Router. For UI I took shadcn/ui. TanStack Query is also a very popular library for data fetching and caching. Storybook requires some discipline, but it's a great way to develop and test your components in isolation.

Core features are the same as in pocketbase-sveltekit-static. You can register, login, and logout: session is stored in localStorage and automatically refreshed. Pages under `_auth` group check session and redirect to login page if not authenticated. Pages under `_admin` group check admin session (shared with Pocketbase's admin panel) and redirect to login page if not authenticated. For deployment you build React static bundle and embed it into Pocketbase binary.
