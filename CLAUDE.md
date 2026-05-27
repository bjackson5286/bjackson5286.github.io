# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deploying

Push to `main`. GitHub Pages serves the site automatically from the repo root at `https://bjackson5286.github.io`. No build step.

## Architecture

**Two-page static site — no framework, no build tools.**

| File | Purpose |
|------|---------|
| `index.html` | Single-file app: all CSS (inline `<style>`), all JS (inline `<script>`), and every section of the resume |
| `interests.html` | Standalone Interests page — duplicates the nav and shares the same CSS variables/design system inline |
| `resume.pdf` | Linked by the "Download Resume" button (`<a href="resume.pdf" download>`) |
| `assets/bevo-tower.jpg` | **Required but not yet added.** Education section background image — place a Bevo + UT Tower photo here. The CSS filter `sepia(0.9) hue-rotate(295deg) saturate(0.45) brightness(1.3)` tints it to rose gold automatically. |

## Design system

All visual tokens are CSS custom properties on `:root` in both HTML files. Change a value once to update it everywhere:

```css
--rose:  #C9846A   /* accents, filled pills, section rules, dots */
--blush: #F7C5C0   /* gradient, pill borders */
--mauve: #D4B8C4   /* gradient mid-tone */
--cream: #fdf6f3   /* odd-section backgrounds */
--text:  #5C3A30   /* all body copy */
--muted: #8B5E52   /* nav links, labels */
--light: #B08070   /* dates, secondary labels */
```

Fluid sizing uses `clamp()` throughout — avoid hardcoded `px` values for font sizes or padding.

## JavaScript behaviours (both inline, vanilla JS)

**Typewriter** (`index.html` only) — On `DOMContentLoaded`, types "Brynne" into `#line-brynne`, pauses 420 ms, then types "Jackson" into `#line-jackson` at 80 ms/letter. The cursor element (`#cursor`) moves between the two spans during typing and stays blinking after. Do not add a library for this.

**Scroll fade-up** (both pages) — `IntersectionObserver` watches every `.fade-up` element and adds `.visible` when 12% is in view. Once triggered it `unobserve()`s, so elements never re-animate. Stagger is handled by CSS `transition-delay` on `:nth-child` selectors, not JS.

## Shared patterns

- **Section header** — every content section uses `.sec-header` > `.sec-deco` (✦ + number) > `.sec-title` > `.sec-rule`. Keep numbering sequential: 01 About, 02 Experience, 03 Education, 04 Awards, 05 Skills; interests.html uses 06.
- **Odd/even section backgrounds** — `.sec:nth-of-type(odd)` gets `--cream`, even gets white. Order matters; don't insert sections without checking the alternation.
- **Nav** — `position: sticky; top: 0` with glassmorphism (`backdrop-filter: blur(14px)`). On `interests.html`, nav links that anchor into `index.html` use the form `index.html#about`.
- **Pills** — `.pill` is outlined, `.pill.core` is filled rose gold. Core skills: Java, JavaScript, SQL, AWS, Kubernetes, Docker, Jenkins, CI/CD Pipelines.
- **Education background** — the `.edu-photo-bg` pseudo-layer sits `position: absolute; inset: 0` with `z-index: 0`; all content is `position: relative; z-index: 1`.
