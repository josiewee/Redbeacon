# Red Beacon Asset Management

A single-page marketing website for Red Beacon Asset Management — a sustainable, ESG-driven investment firm.

**Live site:** https://josiewee.github.io/Redbeacon

---

## Features

- Responsive, mobile-first layout (breakpoints at 768 px and 1024 px)
- Sticky navigation with scroll-triggered background transition and hamburger menu on mobile
- Full-screen hero with animated ESG stat counters (AUM, clients, years of experience)
- Four USP cards (Sustainable Portfolio Design, Proven Impact Returns, Transparent Impact Reporting, Certified ESG Advisors) with staggered fade-in
- Testimonial carousel — auto-advances every 5 s, dot + arrow controls
- Contact form via FormSubmit.co — client-side validation, inline success/error feedback, no backend required
- Scroll-triggered `IntersectionObserver` fade-in animations throughout
- No build step, no dependencies, no framework

---

## Tech stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements, ARIA attributes) |
| Styles | CSS3 (custom properties, Grid, Flexbox, clamp()) |
| Interactivity | Vanilla ES6 JavaScript |
| Form delivery | [FormSubmit.co](https://formsubmit.co) |
| Heading font | Cormorant Garamond (Google Fonts) |
| Body font | Jost (Google Fonts) |

---

## Project structure

```
AssetManagement/
├── index.html      # All content and structure (single page)
├── styles.css      # All styles — mobile-first
├── script.js       # All interactivity — plain ES6, no imports
├── .gitignore
└── README.md
```

---

## Colour palette

All colours are CSS custom properties on `:root` in `styles.css`.

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#3D1A7A` | Deep purple — brand primary, icons, labels |
| `--primary-dark` | `#0E061C` | Near-black purple — footer, scrolled nav |
| `--primary-light` | `#6830B8` | Medium purple — variant |
| `--accent` | `#27A96B` | Emerald green — sustainability highlight, CTAs |
| `--accent-light` | `#3DC283` | Light emerald — hover states |
| `--white` | `#ffffff` | |
| `--gray-800` | `#343a40` | Body text |
| `--gray-600` | `#6c757d` | Secondary text |

---

## Customisation guide

### Update firm statistics
Edit the `data-target` attribute on each `.counter` element in `index.html`:

```html
<span class="counter" data-target="2" data-prefix="$" data-suffix="B" data-decimals="0">$0B</span>
```

Change `data-target` only — the animation reads it at runtime.

### Update the form recipient email
Replace the email in the `<form action>` attribute:

```html
<form action="https://formsubmit.co/your@email.com" ...>
```

### Update social links
Find the three `<a class="social-link">` elements in the footer and replace each `href="#"` with the real profile URL.

### Update the live domain fallback
Replace `https://your-domain.com/#contact` in the hidden `_next` input with your real domain:

```html
<input type="hidden" name="_next" value="https://josiewee.github.io/Redbeacon/#contact">
```

---

## FormSubmit activation

FormSubmit sends a **one-time confirmation email** to the recipient address on the very first real form submission. The endpoint is inactive until you click that confirmation link. Check your spam folder if it doesn't arrive.

---

## Local development

No build step required. Open `index.html` directly in a browser:

```powershell
# Windows
Start-Process index.html
```

Or serve locally to avoid any `file://` quirks:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

---

## Deployment

The site deploys via GitHub Pages from the `main` branch root. Push to `main` and the live site at https://josiewee.github.io/Redbeacon updates automatically.

---

*Investments carry risk. Past performance does not guarantee future results.*
