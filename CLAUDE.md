# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbopack (http://localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npx prisma generate  # Regenerate Prisma client (runs automatically on postinstall)
npx prisma migrate dev # Run database migrations
npx prisma studio    # Open Prisma Studio to browse database
```

## Architecture

This is a personal portfolio website built with Next.js 15 (App Router) featuring:

- **Public website** (`src/app/page.tsx`): Single-page portfolio with About, Experience, and Projects sections
- **Admin dashboard** (`src/app/admin/`): Protected CMS for managing portfolio content via tabs (Profile, Experience, Projects)

### Key Patterns

**Server Components by Default**: Public pages (`/`, `/projects`, `/netart`) are Server Components that fetch data with `Promise.all()` for parallel data loading. Data is passed as props to child components.

**Server Actions**: All database mutations use Next.js Server Actions located in `src/components/actions/`. Each action file corresponds to a domain (profile, experience, project, user, auth).

**Component Organization**:
- `src/components/admin/` - Admin dashboard components (client components for interactivity)
- `src/components/website/` - Public-facing components (server components receiving data as props)
- `src/components/ui/` - Shared UI components

**Text Editor**: The admin profile section includes a rich text editor built with Lexical (`src/components/admin/profile/components/text-editor/`). It has custom plugins, nodes (ImageNode, YouTubeNode), and toolbar components.

### Data Layer

- **Database**: PostgreSQL via Prisma ORM
- **Schema**: `prisma/schema.prisma` defines Profile, Experience, Project, and NextAuth-related models (User, Account, Session)
- **Prisma Client**: Singleton instance in `src/lib/prisma.ts`

### Authentication

- NextAuth.js with Google OAuth provider
- Single-user access controlled by `ALLOWED_EMAIL` environment variable
- JWT session strategy with role-based access (admin role)
- Auth options in `src/app/api/auth/[...nextauth]/auth-options.ts`

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth credentials
- `ALLOWED_EMAIL` - Email address allowed to access admin
- `NEXTAUTH_SECRET` - NextAuth encryption key
