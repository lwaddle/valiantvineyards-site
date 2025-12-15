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
functions/
  api/           # Cloudflare Pages Functions (serverless)
public/
  _redirects     # Cloudflare redirects
  _headers       # Security headers
```

## Contact Form & Newsletter Integration

The contact form uses:
- **Cloudflare Pages Function** (`functions/api/contact.ts`) for form handling
- **Resend** for transactional email delivery (template: `contact-form-submission`)
- **Cloudflare Turnstile** for spam protection (server-side validation)
- **Mailchimp API** for newsletter subscriptions

When users check "Sign me up for news and updates", the Worker adds them to the Mailchimp audience.

### Email Configuration

Edit `functions/api/contact.ts` to update recipients:

```javascript
const EMAIL_CONFIG = {
  from: "Valiant Vineyards Winery & Distillery <noreply@valiantvineyards.us>",
  to: ["wine@valiantvineyards.us"],
  cc: ["sherry@valiantvineyards.us", "adrienne@valiantvineyards.us", "valiantvineyards@proton.me"],
  subject: "Valiant Vineyards website message",
};
```

### Environment Variables (Cloudflare Pages)

- `RESEND_API_KEY` — Resend API key
- `MAILCHIMP_API_KEY` — Mailchimp API key
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key

### Microsoft 365 Spam Filter

Contact form emails may be flagged as spam due to the Reply-To mismatch pattern. Add `noreply@valiantvineyards.us` to the safe senders list or create a mail flow rule in Exchange admin.

## Updating Business Hours & Contact Info

All business hours, contact details, and address information are centralized in `src/data/site-info.ts`. Edit this file to update:

- **Tasting room hours** — Modify the `tastingRoom` array
- **Seasonal notes** — Update the `note` field (e.g., holiday closures)
- **Phone/email** — Edit the `contact` object
- **Address** — Edit the `address` object

Changes will automatically propagate to the homepage, tasting room page, and contact page.

## Adding an Event

1. Copy the template: `src/content/events/0-TEMPLATE.mdx`
2. Rename it with a descriptive slug (e.g., `summer-wine-tasting-2025.mdx`)
3. Update the frontmatter:
   - `title` — The event headline
   - `description` — Short summary for SEO/previews
   - `date` — Post/publish date (YYYY-MM-DD)
   - `eventDate` — When the event happens (YYYY-MM-DD). Omit if TBD. Displays as a badge on event cards.
   - `featuredImage` — Path to image in `_images/` folder
   - `featuredImageAlt` — Alt text for accessibility
   - `pinned` — Set `true` to feature at top of event listings
   - `draft` — Set `false` when ready to publish
4. Write content in Markdown/MDX below the frontmatter

**Sorting:** Events are sorted by pinned status first, then by `eventDate` (falling back to `date` if no `eventDate` is set).