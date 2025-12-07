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
- **Web3Forms** (Pro plan) for form submissions with Cloudflare Turnstile spam protection
- **Cloudflare Worker** to handle newsletter signups via Mailchimp

### How it works

1. User submits the contact form (optionally checking "Sign me up for news and updates")
2. Web3Forms processes the submission and sends emails to configured recipients
3. Web3Forms sends a webhook to our Cloudflare Worker
4. The worker checks if `subscribe === "yes"` and adds the user to Mailchimp if so

### Cloudflare Worker Configuration

The worker is deployed separately and requires these environment variables (set as secrets in Cloudflare dashboard):

| Variable | Description |
|----------|-------------|
| `MAILCHIMP_API_KEY` | Mailchimp API key |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp audience/list ID |
| `MAILCHIMP_DC` | Mailchimp data center prefix (e.g., `us21`) |

The worker URL is configured as a webhook endpoint in the Web3Forms dashboard.

## Documentation

See [PROJECT.md](PROJECT.md) for detailed project status and page inventory.
