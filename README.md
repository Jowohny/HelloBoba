# Hello Boba

Marketing site for Hello Boba (El Monte, CA). Nuxt 4 + Tailwind + GSAP.

## Stack

- **Framework:** Nuxt 4 (Vue 3, `<script setup>`)
- **Styling:** Tailwind CSS via `@nuxtjs/tailwindcss`
- **Images:** `@nuxt/image` (`<NuxtPicture>` / `<NuxtImg>`)
- **Animation:** GSAP (core, `ScrollTrigger`, `SplitText`) — plugins registered once in `app/plugins/gsap.client.ts`
- **Type system:** strict TypeScript via `nuxi typecheck`

## Project layout

```
app/
  app.vue                 # Root component
  layouts/default.vue     # Navbar + page slot + SiteFooter
  pages/                  # index, news, menu, locations, contact
  components/             # PageHeader, SiteFooter, WaveDivider, Carousel
  composables/            # useIntroSequence — gates page intro on navbar drop
  data/                   # topDrinks, menu, locations, news, social
  types/index.ts          # Drink, MenuItem, StoreLocation, NewsItem, SocialLink
  plugins/gsap.client.ts  # ScrollTrigger + SplitText registration
  assets/css/main.css     # Nunito + .font-sans (global)
public/                   # Static images (drinks/, toppings/, banners)
```

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build       # Production build
npm run preview     # Preview production build locally
npm run generate    # Static site generation
npm run typecheck   # vue-tsc strict typecheck
```

## Conventions

- Page content (drinks, hours, news, social links) lives in `app/data/*` — edit there, not in templates.
- Page entry animations use `useIntroSequence((timeline) => { ... })` so they wait for the navbar drop before running.
- The SiteFooter is mounted in the layout (visible on every route). Its wave divider is part of the footer, not the page.
- Crosshatch pattern is only on the home page's Top 10 section.
- Per-page background gradients live in each page's wrapper; the footer's `z-50` keeps it above them.
