# Valiant Vineyards Website

A modern static website for Valiant Vineyards Winery & Distillery built with Astro, Svelte, and Tailwind CSS.

## Tech Stack

- **Astro** - Static site framework
- **Svelte** - Interactive components
- **Tailwind CSS v4** - Styling
- **shadcn-svelte** - UI components
- **Cloudflare Pages** - Hosting

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  assets/           # Images (optimized by Astro)
  components/       # Reusable components
  layouts/          # Page layouts
  lib/              # Utilities and UI components
  pages/            # Route pages
  styles/           # Global CSS
public/
  _redirects        # Cloudflare redirects
```

## Pages

### Navigation Pages
- `/` - Home
- `/about/` - Our Story
- `/our-team/` - Our Team
- `/contact/` - Contact
- `/wines/` - Wines
- `/distillery/` - Distillery
- `/tasting-room/` - Tasting Room
- `/bed-and-breakfast/` - Bed & Breakfast
- `/private-events/` - Private Events
- `/private-events/weddings/` - Weddings

### QR-Linked Pages (unlisted)
- `/cherry-bourbon-sour-cocktail/`
- `/gold-rush/`
- `/south-dakota-gold-rush-cocktail/`
- `/the-whiskey-trip-podcast/`

### Legal Pages (footer only)
- `/privacy-policy/`
- `/cookie-policy/`

## Redirects

| Old URL | New URL | Status |
|---------|---------|--------|
| `/about/people/` | `/our-team/` | 301 |

## Status

- [x] Project initialization
- [x] Base layout and components
- [x] All pages created with placeholders
- [x] Navigation (desktop + mobile)
- [x] Footer
- [x] Redirects configured
- [ ] Content authoring
- [ ] Image assets
- [ ] Final styling refinements
- [ ] Deployment to Cloudflare Pages
