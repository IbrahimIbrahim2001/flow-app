# Project: flow

An Expo (SDK 57) + React Native app built with Expo Router.

## Stack

- **Expo SDK 57** (`~57.0.7`), `expo-router` with **typed routes** and **React Compiler** enabled
- **React 19** / **react-native 0.86**
- **State**: `zustand` (global stores)
- **Data fetching**: `@tanstack/react-query` (v5)
- **Forms/validation**: `react-hook-form` + `zod` (`@hookform/resolvers`)
- **Styling**: `tailwindcss` v4 + `uniwind` (Tailwind for React Native)
- **Animation/Gestures**: `react-native-reanimated` + `react-native-gesture-handler`
- **Lists**: `@shopify/flash-list`
- **Secure storage**: `expo-secure-store` (auth tokens, secrets)
- **Language**: TypeScript (`~6.0.3`)

## Project structure

- `src/app/` — Expo Router screens and routes (file-based routing, typed routes on)
- `src/components/` — reusable UI components
- `src/global.css` — Tailwind / uniwind styles
- `src/uniwind-types.d.ts` — uniwind type definitions
- `assets/` — icons, splash, images
- `app.json` — Expo config (scheme `flow`, package `com.ibrahim255.flow`)

## Rules

- **Read versioned Expo docs** at https://docs.expo.dev/versions/v57.0.0/ before writing any Expo/router/native code — APIs change between SDK versions.
- Use **typed routes** (`href`/`Link` with typed paths). Do not hardcode route strings.
- Styling: prefer **uniwind/Tailwind** classes over inline `StyleSheet`. Keep raw `StyleSheet.create` only for dynamic/animated styles.
- Validation: define **zod** schemas and feed them to `react-hook-form` via `@hookform/resolvers/zod`. Never validate by hand.
- Data fetching: use **TanStack Query** hooks; co-locate query hooks with the feature. Handle loading/error states.
- Secrets/tokens go in **expo-secure-store**, never in code or `app.json` `extra` beyond the EAS projectId.
- Respect the **React Compiler** — avoid manual `useMemo`/`React.memo` unless profiling shows a need.
- Run `expo lint` (the project's `lint` script) before committing.
- Never commit secrets or keys.

## Available agent skills

Project-relevant skills (installed globally via `npx skills`):

- `expo/skills@expo-tailwind-setup` — uniwind/Tailwind setup guidance
- `expo/skills@expo-native-ui` — building native UI
- `expo/skills@expo-router` — routing patterns
- `expo/skills@expo-project-structure` — recommended structure
- `expo/skills@expo-upgrade` — SDK upgrade guidance
- `expo/skills@eas-workflows` — EAS CI/CD workflows
- `vercel-labs/agent-skills@vercel-react-native-skills` — RN best practices
- `callstackincubator/agent-skills@react-native-best-practices` — RN best practices
