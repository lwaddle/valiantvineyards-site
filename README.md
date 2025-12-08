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

## Adding a News Post

1. Copy the template: `src/content/news/0-TEMPLATE.mdx`
2. Rename it with a descriptive slug (e.g., `summer-wine-tasting-event.mdx`)
3. Update the frontmatter:
   - `title` — The post headline
   - `description` — Short summary for SEO/previews
   - `date` — Publication date (YYYY-MM-DD)
   - `featuredImage` — Path to image in `_images/` folder
   - `featuredImageAlt` — Alt text for accessibility
   - `pinned` — Set `true` to feature at top of news list
   - `draft` — Set `false` when ready to publish
4. Write content in Markdown/MDX below the frontmatter

## Documentation

See [PROJECT.md](PROJECT.md) for detailed project status and page inventory.
