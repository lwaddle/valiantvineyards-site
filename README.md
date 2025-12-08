# Valiant Vineyards

The official website for **Valiant Vineyards Winery & Distillery** — featuring the winery, distillery, bed & breakfast, and private event venue.

## Tech Stack

- [Astro](https://astro.build/) — Static site framework
- [Svelte](https://svelte.dev/) — Interactive components
- [Tailwind CSS v4](https://tailwindcss.com/) — Styling
- [shadcn-svelte](https://shadcn-svelte.com/) — UI components
- [Cloudflare Pages](https://pages.cloudflare.com/) — Hosting

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
  assets/        # Images (optimized by Astro)
  components/    # Reusable components
  layouts/       # Page layouts
  lib/           # Utilities and UI components
  pages/         # Route pages
  styles/        # Global CSS
public/
  _redirects     # Cloudflare redirects
```

## Contact Form & Newsletter Integration

The contact form uses:
- **Basin Forms** for form submissions with built-in Mailchimp integration
- **Cloudflare Turnstile** for spam protection

When users check "Sign me up for news and updates", Basin automatically adds them to the Mailchimp audience.

## Documentation

See [PROJECT.md](PROJECT.md) for detailed project status and page inventory.
