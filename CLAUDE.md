# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start Expo dev client
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run web version
npm test           # Run Jest tests
npm run lint       # Lint with Expo linter
```

## Architecture

**Dongi** is a two-sided service marketplace: clients request services, service providers fulfill them. Both user types have fully separate auth flows and dashboards.

### Routing

Uses Expo Router (file-based). Key route groups:
- `app/(auth)/clients/` — client signup/signin
- `app/(auth)/service-provider/` — provider signup/signin
- `app/(authenticated)/client/` — client dashboard with bottom tabs (home, search, history, profile)
- `app/(authenticated)/service-provider/` — provider dashboard with bottom tabs (home, services, history, profile)

### Auth & State

- `context/Auth.tsx` — `useAuth()` hook; stores token + userType (`"client" | "service"`) in AsyncStorage; auto-redirects based on auth state
- `store/onboarding-store.ts` — Zustand for temporary user type selection on the index screen
- `providers/GlobalStateProvider.tsx` — `useGlobalContext()` for app-wide loading overlay
- `providers/QueryProvider.tsx` — wraps app with React Query `QueryClientProvider`

### API Layer

- `utils/axiosSetup.ts` — two axios instances: `baseInstance` (unauthenticated) and `authInstance` (auto-injects Bearer token from AsyncStorage; 403 redirects to login)
- `utils/endpoints.ts` — `API` class with methods grouped by domain: auth, services, requests, user info, wallet
- Base URL: `EXPO_PUBLIC_BASE_URL` env var (default `https://dongi-app.onrender.com/api/v1`)
- Google Maps/Places key: `EXPO_PUBLIC_GOOGLE_API`

### Data Fetching

React Query for all server state. Custom hooks in `hooks/` wrap API calls: `useUserInfo`, `useServices`, `useWallet`, `useTransactionHistory`, etc. Prefer these hooks over calling `API.*` directly in components.

### Component Organization

- `components/shared/` — components used by both client and provider flows
- `components/client/` — client-only components
- `components/provider/` — provider-only components
- Root `components/` — app-wide primitives (BaseButton, Modal, Header, etc.)

Avoid importing from `client/` into provider routes and vice versa. Move shared UI to `components/shared/`.

### Styling

NativeWind (Tailwind for React Native). Custom design tokens in `tailwind.config.js`:
- Primary: `#18658B` (blue)
- Secondary: `#E4AE1B` (gold)
- Font: Plus Jakarta Sans (7 weights, all loaded in `app/_layout.tsx`)

Use Tailwind class names via NativeWind. Do not use StyleSheet for new components unless animating.

### Type Definitions

All shared types in `types/index.ts`. Key types: `UserType`, `IService`, `IClient`, `IUser`, `OngoingRequest`, `ServiceProviderPendingRequest`.

### Environment & Builds

EAS (Expo Application Services) manages builds. Three environments in `eas.json`: development, preview, production — each with their own API URL. Use `expo-dev-client` for local development.
