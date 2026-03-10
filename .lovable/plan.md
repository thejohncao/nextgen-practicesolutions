

# Replace App with Consolidated Assessment Component

The uploaded file is a self-contained React component (1057 lines) that serves as the entire app — a landing page with hero section + 100-point practice assessment engine. It uses inline styles, custom design tokens, and Google Fonts (Bebas Neue, DM Mono, DM Sans) loaded via an inline `<style>` tag.

## What needs to happen

1. **Copy the uploaded file** into the project as `src/App.tsx` (renamed from .jsx, with minor TypeScript adjustments)
2. **Simplify `main.tsx`** — remove Router, AuthProvider, Toaster wrapping since the new App is self-contained with no routing
3. **Keep existing files** — The user said "remove unused files from the default template" but the existing `/g/app`, `/portal`, `/o/app` code may still be needed. I'll only clean up `main.tsx` to render the new App directly.

## Key changes

- **`src/App.tsx`**: Replace entirely with the uploaded consolidated component. Add TypeScript type annotations where needed (e.g., function params, state types).
- **`src/main.tsx`**: Simplify to just render `<App />` without Router/AuthProvider/Toaster wrappers (the new App doesn't use routing).
- **`index.html`**: Keep as-is; the component loads its own fonts via inline `<style>` tags.

## TypeScript adjustments needed
- Add types to function parameters (`Ring`, `TopBar`, `HomeView`, etc.)
- Type the `useState` calls appropriately
- Type event handlers and callback params
- The `fmt` helper and style objects need minor type fixes

