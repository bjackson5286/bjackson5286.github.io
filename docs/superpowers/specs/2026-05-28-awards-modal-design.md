# Awards Modal & Education Badge Fix — Design Spec
**Date:** 2026-05-28
**Status:** Approved

---

## Overview

Two changes to `index.html`:
1. Remove the 📜 emoji from the "Certificate: Elements of Computing" badge in the Education section.
2. Add hover darkening and click-to-open modal popups to the two Award cards in the Awards & Certs section.

---

## 1. Education Section — Badge Icon Removal

**File:** `index.html` line 814

**Change:** Remove `📜 ` from the certificate badge text.

```html
<!-- Before -->
<span class="edu-badge">📜 Certificate: Elements of Computing</span>

<!-- After -->
<span class="edu-badge">Certificate: Elements of Computing</span>
```

No CSS or JS changes required.

---

## 2. Awards & Certs Section — Hover + Modal Popup

### 2a. Hover darkening

Add a `:hover` rule to `.award-card` in the existing CSS block. The hover state uses `#f0ddd5` (a warm rose-tinted cream derived from the theme) so it reads as darker within the palette without introducing any new color variables.

```css
.award-card {
  cursor: pointer;
  /* existing rules unchanged */
}

.award-card:hover {
  background: #f0ddd5;
  box-shadow: 0 6px 32px rgba(201, 132, 106, 0.32);
  transform: translateY(-2px);
}
```

### 2b. Hidden content divs (Approach B)

Each award card gets a `<div class="popup-content" hidden>` **inside** the `.award-card` element. `card.querySelector('.popup-content')` finds it as a descendant. This supports rich content (links, bold text) without escaping issues in data attributes.

**Hackathon card (full card structure):**
```html
<div class="award-card fade-up">
  <div class="award-icon">🏆</div>
  <div class="award-title">Overall Best Development</div>
  <div class="award-org">Annual Alfa Company Hackathon</div>
  <div class="award-date">April 2025</div>
  <div class="popup-content" hidden>
    <div class="modal-icon">🏆</div>
    <div class="modal-title">Overall Best Development</div>
    <div class="modal-org">Annual Alfa Company Hackathon · April 2025</div>
    <div class="modal-body">
      <p>Collaborated with a team to develop a multithreaded Java-based backend bulk data generation tool. Built a frontend UI and exposed the tool in-app, allowing users to configure data generator parameters — ranges, numbers requested, and variating details — prior to running the bulk data generation.</p>
      <p>Pushed the data generator into production and was responsible for the first client sale and implementation of the tool.</p>
    </div>
  </div>
</div>
```

**AWS cert card (full card structure):**
```html
<div class="award-card fade-up">
  <div class="award-icon">☁️</div>
  <div class="award-title">AWS Certified Cloud Practitioner</div>
  <div class="award-org">Amazon Web Services</div>
  <div class="award-date">Issued April 2026 · Expires April 2029</div>
  <div class="popup-content" hidden>
    <div class="modal-icon">☁️</div>
    <div class="modal-title">AWS Certified Cloud Practitioner</div>
    <div class="modal-org">Amazon Web Services · CLF-C02</div>
    <div class="modal-body">
      <p><strong>Exam:</strong> CLF-C02 · 65 questions · 90 minutes · Issued April 2026 · Expires April 2029</p>
      <p><strong>Covers:</strong> AWS core services (EC2, S3, RDS, Lambda), cloud architecture & best practices, security & compliance, identity &amp; access management, pricing & billing models.</p>
      <a class="modal-link" href="https://www.credly.com/badges/19fffec8-ee98-4292-98ab-32f83d108c18/linked_in_profile" target="_blank" rel="noopener">↗ View Credential on Credly</a>
    </div>
  </div>
</div>
```

### 2c. Shared modal DOM element

One `<div id="award-modal">` added before `</body>`. JS populates it from the clicked card's `.popup-content` sibling.

```html
<div id="award-modal" class="modal-overlay" aria-modal="true" role="dialog" hidden>
  <div class="modal-box">
    <button class="modal-close" aria-label="Close">✕ Close</button>
    <div class="modal-inner"></div>
  </div>
</div>
```

### 2d. Modal CSS

Added to the existing `<style>` block:

```css
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(92, 58, 48, 0.45);
  backdrop-filter: blur(3px);
  display: flex; align-items: center; justify-content: center;
  z-index: 2000;
}

.modal-overlay[hidden] { display: none; }

.modal-box {
  background: var(--white);
  border-radius: 16px;
  box-shadow: 0 12px 56px rgba(92, 58, 48, 0.28);
  padding: 32px 34px 28px;
  max-width: 440px; width: 90%;
  border-top: 3px solid var(--rose);
  position: relative;
  animation: modalFadeUp 0.22s ease;
}

@keyframes modalFadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.modal-close {
  position: absolute; top: 14px; right: 16px;
  font-family: sans-serif; font-size: 10px;
  color: var(--muted); cursor: pointer;
  letter-spacing: 1.5px; text-transform: uppercase;
  border: 1px solid var(--blush); padding: 4px 11px;
  border-radius: 20px; background: transparent;
  transition: background 0.2s, color 0.2s;
}

.modal-close:hover {
  background: var(--rose); color: var(--white); border-color: var(--rose);
}

.modal-icon { font-size: 26px; margin-bottom: 8px; }

.modal-title {
  font-size: clamp(14px, 1.8vw, 17px);
  font-weight: 700; color: var(--text); margin-bottom: 3px; line-height: 1.3;
}

.modal-org {
  font-family: sans-serif; font-size: 10px;
  text-transform: uppercase; letter-spacing: 1.5px;
  color: var(--rose); margin-bottom: 14px;
}

.modal-body {
  font-size: clamp(12px, 1.4vw, 14px);
  color: var(--muted); line-height: 1.75;
}

.modal-body p + p { margin-top: 10px; }

.modal-link {
  display: inline-block; margin-top: 14px;
  font-family: sans-serif; font-size: 10px;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--rose); text-decoration: none;
  border-bottom: 1px solid var(--blush); padding-bottom: 2px;
}

.modal-link:hover { color: var(--text); border-color: var(--text); }
```

### 2e. JS behavior

Added to the existing inline `<script>` block:

```js
(function () {
  const overlay = document.getElementById('award-modal');
  const inner   = overlay.querySelector('.modal-inner');
  const closeBtn = overlay.querySelector('.modal-close');

  function openModal(card) {
    const content = card.querySelector('.popup-content');
    inner.innerHTML = content.innerHTML;
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.award-card').forEach(function (card) {
    card.addEventListener('click', function () { openModal(card); });
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
```

Note: Escape key also closes the modal (good UX practice, costs nothing).

---

## Files Changed

| File | Change |
|------|--------|
| `index.html` | Remove emoji (1 line), add CSS rules, add 2 `.popup-content` divs, add modal DOM element, add JS IIFE |

No new files. No build step needed.
