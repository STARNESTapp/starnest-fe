This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Copy `.env.example` to `.env.local` and fill in the values, then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 with a shadcn-style CSS-variable theme (`tailwindcss-animate`, `@tailwindcss/typography`)
- TanStack Query v4
- react-hook-form + zod + @hookform/resolvers
- axios + cookies-next (token/refresh-token interceptor pattern in `lib/http.ts`)
- firebase
- nuqs (URL search-param state)
- sonner (toasts)
- lucide-react (icons)
- ESLint 9 flat config (`eslint-config-next`)
