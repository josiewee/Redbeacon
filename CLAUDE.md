# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Open `index.html` directly in a browser:

```powershell
Start-Process index.html
```

There are no dependencies to install, no dev server, no bundler, and no tests.

## Architecture

Three files, no framework:

| File | Role |
|---|---|
| `index.html` | All content and structure. Single-page; sections are `#home`, `#why-us`, `#testimonials`, `#contact`. |
| `styles.css` | All styles. Mobile-first, breakpoints at 768 px and 1024 px. |
| `script.js` | All interactivity. Plain ES6, no modules, no imports. |

### CSS design system

All colours, fonts, and spacing are CSS custom properties on `:root` in `styles.css`. Change a value there and it propagates everywhere. Key tokens: `--navy` (`#0a2540`), `--gold` (`#d4a017`), `--font-heading` (Playfair Display), `--font-body` (Inter).

### Scroll animations

Any element with class `fade-in` starts invisible (`opacity:0, translateY(28px)`). `script.js` uses a single `IntersectionObserver` to add the `visible` class when the element enters the viewport. Transition timing is on the `.fade-in` rule; stagger delays for USP cards are nth-child rules beneath it.

### Animated counters

Each `.counter` element is driven entirely by `data-*` attributes — no JS constants to update:

```html
<span class="counter" data-target="4.2" data-prefix="$" data-suffix="B" data-decimals="1">$0B</span>
```

To change a stat, edit only the `data-target` (and `data-prefix`/`data-suffix` if the unit changes) in `index.html`. The animation fires once via `IntersectionObserver` at 60 % visibility with an ease-out-cubic `requestAnimationFrame` loop.

### Testimonial carousel

The `.carousel-track` is a flex row; each `.testimonial-card` has `min-width: 100%`. Sliding is done with `transform: translateX(-${index * 100}%)`. State lives in `currentIndex` (module-level variable in `script.js`). Auto-advances every 5 s via `setInterval`; the timer is cleared and restarted on any manual interaction. To add a slide: append an `<article class="testimonial-card">` to the track **and** add a matching `<button class="dot">` to `#carouselDots` — the JS derives `totalSlides` from `.querySelectorAll('.testimonial-card').length` at init time.

### Form submission

The `<form>` posts to `https://formsubmit.co/josephine.wee@redbeaconam.com`. JS intercepts `submit`, validates (required name + email regex), then calls `fetch` with `Accept: application/json` so FormSubmit returns JSON instead of redirecting. Success/error feedback is shown in `#formFeedback` inline without reload. The hidden `_next` input (`https://your-domain.com/#contact`) is only used as a fallback when JS is disabled.

**First-use:** FormSubmit sends a one-time activation email to the receiving address on the first real submission. The endpoint is inactive until that confirmation link is clicked.

## Pending placeholders

- Social link `href="#"` in the footer — replace with real LinkedIn/X/Facebook URLs.
- `_next` hidden input — replace `https://your-domain.com/#contact` with the live domain once deployed.
- Counter `data-target` values — update AUM, client count, and years of experience to match real firm figures.
