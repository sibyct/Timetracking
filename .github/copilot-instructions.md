# AI Coding Agent Instructions for Fast Hiring

## 🎯 Project Overview

**Fast Hiring** is an Employee Onboarding & Interview System that manages the full lifecycle from candidate interview through employee onboarding. It uses a **monorepo structure** with an Angular 17 frontend and Express/Node.js backend.

## 📐 Architecture Patterns

### Monorepo Structure

- **`/client`** - Angular 17 standalone app (uses standalone components & signals)
- **`/server`** - Express backend with modular service architecture
- **Shared Data Models** - TypeScript interfaces enforce type safety across boundaries

### Frontend (Angular 17 Specifics)

- **Standalone Components** - No NgModules; import dependencies directly in components
- **Standalone Routes** - Use `provideRouter()` in `app.config.ts` with route definitions
- **Lazy Loading** - Feature modules lazy-loaded via routes (check `app.routes.ts`)
- **Alias Paths** - Use `@features/`, `@core/`, `@layout/`, `@shared/` for imports (configured in `tsconfig.json`)
- **Component Organization** - Colocate `.ts`, `.html`, `.scss`, and `.spec.ts` files

### Backend (Express/TypeScript)

- **Modular Services** - Each module (auth, interview, onboarding) has: routes → controller → service → model
- **Database Pattern** - PostgreSQL with pg pool in `database.config.ts`; queries in model files
- **Middleware Stack** - Auth verification, validation (Zod), error handling in sequential order
- **Validation** - Use Zod schemas (e.g., `auth.validator.ts`) for request validation
- **Error Handling** - Centralized `error.middleware.ts` wraps custom errors with messages & status codes

## 🔐 Authentication & Authorization

### Server-Side

- **JWT Token** - Signed with RS256 algorithm; expires in 1 day
- **Bcrypt Hashing** - Passwords hashed with salt 10 in `auth.service.ts`
- **Middleware Chain** - `verifyToken` middleware extracts JWT from `Authorization: Bearer <token>` header
- **Key Files** - `auth.service.ts`, `auth.middleware.ts`, `auth.model.ts`

### Client-Side

- **API Service** - Base HTTP service in `core/services/api.service.ts` for API calls
- **Auth Service** - To be extended in `core/services/auth.service.ts` for token management
- **Route Guards** - Implement guards in `core/guards/` to protect authenticated routes

## 🗄️ Data Models & Interfaces

### Consistency Rules

- **Server Interfaces** - Defined in `auth.types.ts` and similar files (matches database schema)
- **Client Interfaces** - Defined in `core/models/` directory (e.g., `user.model.ts`, `project.model.ts`)
- **Database Schema** - Source of truth in `database/schema.sql`
- **Type Mapping** - Server types match database columns; client types match API response structure

### Example Pattern (Auth Module)

```typescript
// Server: auth.types.ts
export interface IUser {
  user_id: number;
  username: string;
  password_hash: string;
  role: string;
}

// Client: core/models/user.model.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "employee" | "manager";
}
```

## 🛠️ Development Workflows

### Client Development

```bash
# Terminal 1 - dev server
cd client && npm start    # http://localhost:4200

# Terminal 2 - watch build
cd client && npm run watch

# Run tests
cd client && npm test     # Karma + Jasmine
```

### Server Development

```bash
# Development with auto-reload
cd server && npm run dev  # Uses nodemon

# Build TypeScript
cd server && npm run build

# Lint & Format
cd server && npm run lint
cd server && npm run format  # Prettier
```

### Database

- Schema located at `server/database/schema.sql`
- Pool configuration with 10 max clients, 30s idle timeout
- Use parameterized queries to prevent SQL injection: `$1, $2, $3`

## 📋 Project-Specific Conventions

### Naming & File Organization

- **Routes** - Define constants in `shared/constants/routes.ts` (e.g., `APP_ROUTES.LOGIN`)
- **Status Codes** - Centralized in `server/constants/statuscodes.ts`
- **Error Messages** - Centralized in `server/constants/messages.ts`
- **Logging** - Use Winston logger from `server/utils/loggers.ts`

### Module Structure (Backend)

```
/modules/auth/
  ├── auth.controller.ts   # Handles HTTP requests
  ├── auth.service.ts      # Business logic
  ├── auth.model.ts        # Database queries
  ├── auth.routes.ts       # Express route definitions
  ├── auth.types.ts        # TypeScript interfaces
  └── auth.validator.ts    # Zod schemas
```

### Component Structure (Frontend)

```
/features/auth/login/
  ├── login.component.ts
  ├── login.component.html
  ├── login.component.scss
  └── login.component.spec.ts
```

## 🔗 Cross-Boundary Communication

### Client → Server

- `ApiService.get/post/put/delete()` methods (to be implemented in `api.service.ts`)
- Include JWT token in Authorization header via interceptor
- Expected response format: `{ data, error, statusCode }`

### Type Safety

- Server endpoints must document expected request/response types
- Client interceptors should handle 401/403 responses and redirect to login

## ⚠️ Critical Development Notes

- **State Machine** - Candidate/user statuses use FSM logic (implement in service layers)
- **Rate Limiting** - 100 req/15min (prod), 1000 req/15min (dev) - see `app.ts`
- **CORS Enabled** - All origins allowed (configure in `app.ts` before deployment)
- **Helmet Security** - Security headers enforced on all responses
- **Tests** - Use Karma + Jasmine (client); extend test suite as features grow
- **Environment Variables** - Required: `DB_URL`, `JWT_SECRET` (see `.env` setup)

## 🚀 When Adding New Features

1. **Define Types First** - Create interfaces in appropriate `*.types.ts` or `*.model.ts` files
2. **Backend Module** - Scaffold new module with: routes → controller → service → model
3. **Add Validation** - Create Zod schema if accepting user input
4. **Frontend Feature** - Create component in `features/` with proper routing
5. **Type Consistency** - Ensure client models match server response structure
6. **Test Coverage** - Add unit tests in `.spec.ts` files alongside implementation
