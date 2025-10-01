# pocketbase-react-spa development log

## pocketbase

```bash
mkdir pocketbase
cd pocketbase
go mod init github.com/Egor-S/pocketbase-react-static/pocketbase
go get github.com/pocketbase/pocketbase
```

## react

```bash
# [1] React Vite
npm create vite@latest -- --template react-ts
cd react
npm install
# [2] Tailwind CSS
npm install tailwindcss @tailwindcss/vite
# [3] Shadcn/UI
npm install -D @types/node
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dropdown-menu
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add login-05
npx shadcn@latest add navigation-menu
# [4] Storybook
npm create storybook@latest
# [5] TanStack Router
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
# [6] Pocketbase Typegen
npm install pocketbase
npm install -D pocketbase-typegen
npm run typegen
# [7] TanStack Query
npm install @tanstack/react-query
npm install -D @tanstack/eslint-plugin-query @tanstack/react-query-devtools
```

References:

1. https://vite.dev/guide/
2. https://tailwindcss.com/docs/installation/using-vite
3. https://ui.shadcn.com/docs/installation/vite
4. https://storybook.js.org/docs/get-started/frameworks/react-vite
5. https://tanstack.com/router/latest/docs/framework/react/quick-start
6. https://github.com/patmood/pocketbase-typegen
7. https://tanstack.com/query/latest/docs/framework/react/installation
