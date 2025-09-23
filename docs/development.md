# pocketbase-react-spa development log

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
# [4] Storybook
npm create storybook@latest
# [5] TanStack Router
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
```

References:

1. https://vite.dev/guide/
2. https://tailwindcss.com/docs/installation/using-vite
3. https://ui.shadcn.com/docs/installation/vite
4. https://storybook.js.org/docs/get-started/frameworks/react-vite
5. https://tanstack.com/router/latest/docs/framework/react/quick-start
