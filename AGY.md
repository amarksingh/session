# @ostro/session — Antigravity AI Architecture & Knowledge Base

> **Package Name**: `@ostro/session`
> **Version**: `2.0.0-alpha.1`
> **Role in Ecosystem**: Modular Core Framework Library

---

## 1. Package Purpose & Overview
HTTP session store managing lifecycle, state persistence across stores (cookie, file, database, redis), and CSRF token generation.

- **Primary Architectural Patterns**: Session store driver abstraction, flash session attributes, cookie synchronization.
- **Key Exported Entities**: `SessionManager`, `Session`, `Store`, `CookieSession`

---

## 2. Dependencies & Interoperability
- **Direct Dependencies**:
  - `@ostro/console`: `^1.0.7`
  - `@ostro/contracts`: `^1.0.0`
  - `@ostro/cookie`: `^1.0.2`
  - `@ostro/support`: `^1.0.2`
  - `cookie`: `^0.4.0`
  - `cookie-signature`: `^1.1.0`
  - `csrf`: `^3.1.0`
  - `fs-extra`: `^8.1.0`
  - `lodash`: `^4.17.21`
  - `lodash.get`: `^4.4.2`
  - `on-headers`: `^1.0.2`
  - `proxy-addr`: `^2.0.8`
  - `uid-safe`: `^2.1.5`
- **Framework Consumers**: Consumed across the OstroJS ecosystem via `@ostro/framework` and direct imports.

---

## 3. Directory & Source Layout
```text
origin/session/
├── adapter/cache.ts
├── adapter/database.ts
├── adapter/file.ts
├── adapter/memory.ts
├── console/sessionTableCommand.ts
├── cookieSession.ts
├── invalidCookieClassException.ts
├── middleware/startSession.ts
├── session.ts
├── sessionManager.ts
├── sessionServiceProvider.ts
├── sessionStarter.ts
├── sessionStore.ts
├── sessionStoreException.ts
├── util.ts
```

---

## 4. TypeScript Typing & Code Standards
1. **Access Modifiers**: All class properties and methods declare explicit visibility (`public`, `protected`, `private`).
2. **Inheritance & Overrides**: Classes overriding base class methods use the `override` keyword to safeguard contracts.
3. **Immutability**: Constant lookup tables and static registries use `readonly` and strict record types.
4. **No Implicit Any**: Public APIs avoid `any` in favor of generics (`<T = unknown>`) and typed contracts from `@ostro/contracts`.
5. **Contract Binding**: Core managers implement contracts from `@ostro/contracts/session/*`.

---

## 5. Development & Verification Guide
- **Compile / Build**: `npm run build` (runs `npx tsc -p tsconfig.build.json`)
- **Run Tests**: `npm test` (executes Jest with 100% coverage target via `c8`)
- **Published Artifacts**: Target output compiled to `./build` with accompanying `.d.ts` declarations and source maps.

---
*Generated for Antigravity AI high-speed codebase comprehension with minimal token consumption.*
