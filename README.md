# Red Beacon Asset Management

A modern, professional one-page marketing website for Red Beacon Asset Management — built with pure HTML, CSS, and JavaScript (no frameworks).

## Live Site

[https://josiewee.github.io/Redbeacon](https://josiewee.github.io/Redbeacon)

## Features

- **Sticky navigation** — transparent on load, solid on scroll, hamburger menu on mobile
- **Hero section** — animated number counters (AUM, clients, years of experience)
- **Why Us** — 4 feature cards with hover effects
- **Testimonials** — auto-rotating carousel with touch/swipe support
- **Enquiry form** — client-side validation, async submission via FormSubmit.co
- **Fully responsive** — mobile-first, tested from 320px to 1920px
- **Scroll animations** — fade-in on scroll using IntersectionObserver

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styles | CSS3 — custom properties, CSS Grid, Flexbox |
| Scripts | Vanilla JavaScript (ES6) |
| Form delivery | [FormSubmit.co](https://formsubmit.co) |
| Fonts | Cormorant Garamond + Jost (Google Fonts) |

## Project Structure

```
├── index.html       # All content and structure
├── styles.css       # All styles and responsive breakpoints
├── script.js        # All interactivity
└── README.md
```

## Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Primary | `#651D32` | Brand burgundy — hero gradient, section backgrounds, icons |
| Accent | `#C9A84C` | Champagne gold — counters, highlights, buttons |
| Primary Dark | `#1a0810` | Near-black — footer, sticky nav |

## Customisation

- **Stats** — update `data-target` attributes on `.counter` elements in `index.html`
- **Form email** — replace `josephine.wee@redbeaconam.com` in the `<form action>` attribute
- **Social links** — replace `href="#"` on LinkedIn, X, and Facebook links in the footer
- **Domain redirect** — update the `_next` hidden input in the form once a custom domain is live

## Form Setup (FormSubmit.co)

The enquiry form posts to FormSubmit.co which forwards submissions to the configured email address. **On first submission, FormSubmit sends a one-time activation email — click the confirmation link before enquiries will be delivered.**

## Local Development

No build step required. Open `index.html` directly in any modern browser.

---

*Investments carry risk. Past performance does not guarantee future results.*
