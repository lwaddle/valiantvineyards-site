# Semantic HTML & ARIA Audit Report

**Date:** 2025-12-08
**Overall Assessment:** Good (7.5/10)

The project has solid semantic HTML foundations with correct use of main landmark elements. There are some areas for improvement, particularly around keyboard accessibility and form labels.

---

## Table of Contents
- [What's Working Well](#whats-working-well)
- [Issues Found](#issues-found)
- [Todo Checklist](#todo-checklist)
- [File Reference](#file-reference)

---

## What's Working Well

### Layout Structure
- **BaseLayout.astro** - Proper document structure with `<header>`, `<main>`, `<footer>` landmark elements
- **NewsPostLayout.astro** - Excellent use of `<article>`, `<header>`, and `<footer>` for blog posts
- All pages have exactly one `<h1>` with proper h2→h3 hierarchy

### Semantic Elements
- Extensive use of `<section>` tags throughout (60+ instances)
- Proper `<article>` tags for wine cards and news posts
- `<figure>` and `<figcaption>` used appropriately (about.astro)
- `<dl>`, `<dt>`, `<dd>` for hours display (index.astro)
- `<nav>` elements for header navigation and pagination

### ARIA & Accessibility
- `aria-label` on social media icon links (Footer.astro)
- `aria-hidden="true"` on decorative SVGs
- `aria-current="page"` on pagination
- `aria-label="Pagination"` on pagination nav
- Good focus indicators with gold outline on galleries
- Descriptive alt text on hero images (e.g., contact page dogs)

### Forms
- Labels properly associated with inputs via `for` attribute
- Proper input types (email, tel, text, checkbox, textarea)
- `autocomplete` attributes present
- Required fields visually marked

---

## Issues Found

### Critical (Accessibility Barriers)

#### 1. Desktop dropdown menus not keyboard accessible
**File:** `src/components/Header.astro` (lines 54-79)

**Problem:**
- Missing `aria-haspopup`, `aria-expanded` attributes
- Dropdowns only work on hover, not keyboard
- No `role="menu"` or `role="menuitem"` on submenus
- Keyboard users cannot access dropdown menu items at all

**Solution:**
- Add `aria-haspopup="true"` and `aria-expanded` to dropdown buttons
- Add keyboard event handlers (Enter, Space, Escape, Arrow keys)
- Add `role="menu"` to dropdown container and `role="menuitem"` to items

---

### Major Issues

#### 2. Newsletter email inputs missing labels (2 locations)
**Files:**
- `src/components/Footer.astro` (newsletter form)
- `src/pages/tasting-room-sign-up.astro` (lines 55-62)

**Problem:** Uses placeholder only, no `<label>` for screen readers

**Solution:** Add visually-hidden label:
```html
<label for="newsletter-email" class="sr-only">Email address</label>
<input id="newsletter-email" type="email" ... />
```

---

#### 3. Mobile nav backdrop uses div as button
**File:** `src/components/MobileNav.svelte` (lines 94-105)

**Problem:** Has `role="button"` but `tabindex="-1"` (not keyboard focusable)

**Solution:** Change to `tabindex="0"` or use actual `<button>` element

---

#### 4. Turnstile captcha needs aria-label
**File:** `src/pages/contact.astro` (line 134)

**Problem:** Screen readers won't announce what this element is for

**Solution:** Add `aria-label="Security verification"`

---

### Moderate Issues

#### 5. Footer link sections missing `<nav>` wrappers
**File:** `src/components/Footer.astro`

**Problem:** Link groups (Visit & Events, Wine & Spirits, About, etc.) use `<div>` instead of `<nav>`

**Solution:** Wrap each link section in `<nav aria-label="Section Name">`

---

#### 6. News cards in index.astro missing `<article>` tags
**File:** `src/pages/index.astro` (lines 84-106)

**Problem:** Wine cards use `<article>` correctly, but news cards don't

**Solution:** Wrap news cards in `<article>` elements

---

#### 7. Contact info should use `<address>` element
**File:** `src/pages/contact.astro` (lines 165-186)

**Problem:** Contact information uses generic `<div>` elements

**Solution:** Wrap in semantic `<address>` element

---

#### 8. Hours display inconsistent
**Files:**
- `src/pages/index.astro` - uses proper `<dl>/<dt>/<dd>` ✓
- `src/pages/tasting-room.astro` - uses `<div>` + `<span>`
- `src/pages/contact.astro` - uses `<div>` + `<span>`

**Solution:** Standardize to use `<dl>/<dt>/<dd>` everywhere

---

### Minor Issues

#### 9. Image alt text sometimes generic
**Problem:**
- Wine bottles: just wine name vs. "2002 Wild Grape Port wine bottle"
- B&B rooms: just room name vs. descriptive content

---

#### 10. Required field indicators could be enhanced
**Problem:** Visual asterisk only, no ARIA attributes

**Solution:** Add `aria-required="true"` to required inputs

---

#### 11. SVG icons in private-events.astro missing aria-labels
**File:** `src/pages/private-events.astro`

---

#### 12. No skip-to-content link for keyboard users
**Problem:** Keyboard users must tab through entire header to reach main content

**Solution:** Add skip link at top of page

---

## Todo Checklist

### Phase 1: Critical Accessibility
- [x] Add keyboard support to desktop dropdown menus (Header.astro)
  - [x] Add `aria-haspopup="true"` to dropdown buttons
  - [x] Add `aria-expanded` state management
  - [x] Add keyboard event handlers (Enter, Space, Escape, Arrow keys)
  - [x] Add `role="menu"` and `role="menuitem"`
- [x] Add visually-hidden labels to newsletter email inputs
  - [x] Footer.astro newsletter form
  - [x] tasting-room-sign-up.astro email input

### Phase 2: Major Improvements
- [x] Fix mobile nav backdrop to be properly focusable (MobileNav.svelte)
- [x] Add aria-label to Turnstile captcha div (contact.astro)
- [x] Wrap footer link sections in `<nav>` elements (Footer.astro)

### Phase 3: Semantic Enhancements
- [x] Add `<article>` to news cards in index.astro
- [x] Wrap contact info in `<address>` element (contact.astro)
- [x] Standardize hours display with `<dl>/<dt>/<dd>`
  - [x] tasting-room.astro
  - [x] contact.astro

### Phase 4: Polish
- [x] Enhance required field indicators with `aria-required="true"` (contact.astro)
- [ ] Improve image alt text specificity where needed
- [x] Add skip-to-content link (BaseLayout.astro)
- [x] Add aria-labels to SVG icons (private-events.astro)

### Phase 5: Form Accessibility (NEW)
- [x] Add `aria-live="polite"` to newsletter message containers (Footer.astro, tasting-room-sign-up.astro)
- [x] Add `aria-required="true"` to newsletter email inputs (Footer.astro, tasting-room-sign-up.astro)
- [x] Add `aria-describedby` for contact form phone helper text (contact.astro)
- [x] Add error/success feedback with `aria-live="assertive"` to contact form (contact.astro)
- [x] Increase auto-hide delay to 8 seconds for newsletter messages (Footer.astro)
- [x] Add `aria-busy` to submit buttons during form submission (contact.astro)

---

## File Reference

| File | Status | Issues |
|------|--------|--------|
| `src/layouts/BaseLayout.astro` | ✅ Fixed | Skip-to-content link added |
| `src/layouts/NewsPostLayout.astro` | ✅ Excellent | None |
| `src/components/Header.astro` | ✅ Fixed | Keyboard accessibility added |
| `src/components/Footer.astro` | ✅ Fixed | Newsletter label + nav wrappers added |
| `src/components/MobileNav.svelte` | ✅ Fixed | Backdrop properly marked as presentation |
| `src/pages/contact.astro` | ✅ Fixed | aria-required, address, Turnstile, hours |
| `src/pages/index.astro` | ✅ Fixed | News cards wrapped in article |
| `src/pages/wines.astro` | ✅ Good | None |
| `src/pages/tasting-room.astro` | ✅ Fixed | Hours using dl/dt/dd |
| `src/pages/tasting-room-sign-up.astro` | ✅ Fixed | Newsletter label added |
| `src/pages/private-events.astro` | ✅ Fixed | SVG icons marked aria-hidden |
