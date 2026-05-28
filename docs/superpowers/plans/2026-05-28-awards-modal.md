# Awards Modal & Education Badge Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the 📜 emoji from the education certificate badge and add hover darkening + click-to-open modal popups to the two award cards in `index.html`.

**Architecture:** All changes are confined to a single file (`index.html`). CSS rules are added inline to the existing `<style>` block. Two `.popup-content` hidden divs are added inside each `.award-card`. One shared `#award-modal` overlay is added to the DOM. A JS IIFE handles open/close behavior and is appended to the existing inline `<script>` block.

**Tech Stack:** Vanilla HTML, CSS, JavaScript. No build step. No dependencies. Static site served directly from the repo root.

---

## File Map

| File | What changes |
|------|-------------|
| `index.html` | Remove emoji (line 814), add hover + modal CSS, add `.popup-content` divs inside cards, add modal DOM, add JS IIFE |

---

### Task 1: Remove 📜 emoji from education certificate badge

**Files:**
- Modify: `index.html:814`

- [ ] **Step 1: Open the file and locate the badge**

  In `index.html`, find line 814:
  ```html
  <span class="edu-badge">📜 Certificate: Elements of Computing</span>
  ```

- [ ] **Step 2: Remove the emoji**

  Replace with:
  ```html
  <span class="edu-badge">Certificate: Elements of Computing</span>
  ```

- [ ] **Step 3: Verify in browser**

  Open `index.html` directly in a browser (or via a local server). Scroll to the **Education** section. The certificate badge should read "Certificate: Elements of Computing" with no icon — identical style to before, just no emoji.

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "Remove emoji from education certificate badge"
  ```

---

### Task 2: Add hover CSS to award cards

**Files:**
- Modify: `index.html` — `<style>` block, awards CSS section (~line 554)

- [ ] **Step 1: Locate the `.award-card` CSS rule**

  In `index.html`, find the `.award-card` rule (around line 554):
  ```css
  .award-card {
    background: var(--white);
    border-radius: 12px;
    padding: clamp(18px, 2.5vw, 28px);
    box-shadow: 0 2px 20px rgba(201, 132, 106, 0.1);
    border-top: 3px solid var(--rose);
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  ```

- [ ] **Step 2: Add cursor and transition to the existing rule**

  The rule already has no `cursor` or `transition`. Update it to:
  ```css
  .award-card {
    background: var(--white);
    border-radius: 12px;
    padding: clamp(18px, 2.5vw, 28px);
    box-shadow: 0 2px 20px rgba(201, 132, 106, 0.1);
    border-top: 3px solid var(--rose);
    display: flex;
    flex-direction: column;
    gap: 7px;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  }
  ```

- [ ] **Step 3: Add the hover rule immediately after `.award-card`**

  Insert after the closing `}` of `.award-card`:
  ```css
  .award-card:hover {
    background: #f0ddd5;
    box-shadow: 0 6px 32px rgba(201, 132, 106, 0.32);
    transform: translateY(-2px);
  }
  ```

- [ ] **Step 4: Verify in browser**

  Reload `index.html`. Scroll to **Awards & Certs**. Hover over each card — the background should warm to a rose-tinted cream (`#f0ddd5`) and the card should lift slightly. No click behavior yet (that comes in Task 6).

- [ ] **Step 5: Commit**

  ```bash
  git add index.html
  git commit -m "Add hover darkening and lift to award cards"
  ```

---

### Task 3: Add modal CSS to the style block

**Files:**
- Modify: `index.html` — `<style>` block, just before the `FOOTER` CSS comment (~line 629)

- [ ] **Step 1: Locate the footer CSS comment**

  Find this line in the `<style>` block:
  ```css
  /* ══════════════════════════════════════
     FOOTER
  ══════════════════════════════════════ */
  ```

- [ ] **Step 2: Insert the modal CSS block immediately before that comment**

  ```css
  /* ══════════════════════════════════════
     AWARD MODAL
  ══════════════════════════════════════ */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(92, 58, 48, 0.45);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }

  .modal-overlay[hidden] { display: none; }

  .modal-box {
    background: var(--white);
    border-radius: 16px;
    box-shadow: 0 12px 56px rgba(92, 58, 48, 0.28);
    padding: 32px 34px 28px;
    max-width: 440px;
    width: 90%;
    border-top: 3px solid var(--rose);
    position: relative;
    animation: modalFadeUp 0.22s ease;
  }

  @keyframes modalFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .modal-close {
    position: absolute;
    top: 14px;
    right: 16px;
    font-family: sans-serif;
    font-size: 10px;
    color: var(--muted);
    cursor: pointer;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: 1px solid var(--blush);
    padding: 4px 11px;
    border-radius: 20px;
    background: transparent;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  .modal-close:hover {
    background: var(--rose);
    color: var(--white);
    border-color: var(--rose);
  }

  .modal-icon { font-size: 26px; margin-bottom: 8px; }

  .modal-title {
    font-size: clamp(14px, 1.8vw, 17px);
    font-weight: 700;
    color: var(--text);
    margin-bottom: 3px;
    line-height: 1.3;
  }

  .modal-org {
    font-family: sans-serif;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--rose);
    margin-bottom: 14px;
  }

  .modal-body {
    font-size: clamp(12px, 1.4vw, 14px);
    color: var(--muted);
    line-height: 1.75;
  }

  .modal-body p + p { margin-top: 10px; }

  .modal-link {
    display: inline-block;
    margin-top: 14px;
    font-family: sans-serif;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--rose);
    text-decoration: none;
    border-bottom: 1px solid var(--blush);
    padding-bottom: 2px;
    transition: color 0.2s, border-color 0.2s;
  }

  .modal-link:hover { color: var(--text); border-color: var(--text); }
  ```

- [ ] **Step 3: Verify CSS compiles (no broken page)**

  Reload `index.html`. The page should look exactly as before — no visible change yet since the modal is not in the DOM. Check browser DevTools console for any CSS parse errors.

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "Add modal overlay CSS to style block"
  ```

---

### Task 4: Add popup-content divs inside award cards

**Files:**
- Modify: `index.html:840-855` — the two `.award-card` elements in the awards section

- [ ] **Step 1: Locate the first award card (Hackathon)**

  Find this block (~line 841):
  ```html
  <div class="award-card fade-up">
    <div class="award-icon">🏆</div>
    <div class="award-title">Overall Best Development</div>
    <div class="award-org">Annual Alfa Company Hackathon</div>
    <div class="award-date">April 2025</div>
  </div>
  ```

- [ ] **Step 2: Add popup-content div inside the hackathon card**

  Replace with:
  ```html
  <div class="award-card fade-up">
    <div class="award-icon">🏆</div>
    <div class="award-title">Overall Best Development</div>
    <div class="award-org">Annual Alfa Company Hackathon</div>
    <div class="award-date">April 2025</div>
    <div class="popup-content" hidden>
      <div class="modal-icon">🏆</div>
      <div class="modal-title">Overall Best Development</div>
      <div class="modal-org">Annual Alfa Company Hackathon &nbsp;·&nbsp; April 2025</div>
      <div class="modal-body">
        <p>Collaborated with a team to develop a multithreaded Java-based backend bulk data generation tool. Built a frontend UI and exposed the tool in-app, allowing users to configure data generator parameters — ranges, numbers requested, and variating details — prior to running the bulk data generation.</p>
        <p>Pushed the data generator into production and was responsible for the first client sale and implementation of the tool.</p>
      </div>
    </div>
  </div>
  ```

- [ ] **Step 3: Locate the second award card (AWS cert)**

  Find this block (~line 847):
  ```html
  <div class="award-card fade-up">
    <div class="award-icon">☁️</div>
    <div class="award-title">AWS Certified Cloud Practitioner</div>
    <div class="award-org">Amazon Web Services</div>
    <div class="award-date">Issued April 2026 &nbsp;·&nbsp; Expires April 2029</div>
  </div>
  ```

- [ ] **Step 4: Add popup-content div inside the AWS cert card**

  Replace with:
  ```html
  <div class="award-card fade-up">
    <div class="award-icon">☁️</div>
    <div class="award-title">AWS Certified Cloud Practitioner</div>
    <div class="award-org">Amazon Web Services</div>
    <div class="award-date">Issued April 2026 &nbsp;·&nbsp; Expires April 2029</div>
    <div class="popup-content" hidden>
      <div class="modal-icon">☁️</div>
      <div class="modal-title">AWS Certified Cloud Practitioner</div>
      <div class="modal-org">Amazon Web Services &nbsp;·&nbsp; CLF-C02</div>
      <div class="modal-body">
        <p><strong>Exam:</strong> CLF-C02 &nbsp;·&nbsp; 65 questions &nbsp;·&nbsp; 90 minutes &nbsp;·&nbsp; Issued April 2026 &nbsp;·&nbsp; Expires April 2029</p>
        <p><strong>Covers:</strong> AWS core services (EC2, S3, RDS, Lambda), cloud architecture &amp; best practices, security &amp; compliance, identity &amp; access management, pricing &amp; billing models.</p>
        <a class="modal-link" href="https://www.credly.com/badges/19fffec8-ee98-4292-98ab-32f83d108c18/linked_in_profile" target="_blank" rel="noopener">↗ &nbsp;View Credential on Credly</a>
      </div>
    </div>
  </div>
  ```

- [ ] **Step 5: Verify page is unchanged visually**

  Reload `index.html`. The awards section should look exactly the same as before — the `.popup-content` divs are `hidden` and invisible. No card layout change.

- [ ] **Step 6: Commit**

  ```bash
  git add index.html
  git commit -m "Add hidden popup-content divs inside award cards"
  ```

---

### Task 5: Add modal DOM element to the page

**Files:**
- Modify: `index.html` — add before the `<script>` block (~line 947)

- [ ] **Step 1: Locate the script block opening comment**

  Find this in `index.html`:
  ```html
  <!-- ══════════════════════════════════════
       JAVASCRIPT
  ══════════════════════════════════════ -->
  <script>
  ```

- [ ] **Step 2: Insert the modal DOM element immediately before that comment**

  ```html
  <!-- ══════════════════════════════════════
       AWARD MODAL
  ══════════════════════════════════════ -->
  <div id="award-modal" class="modal-overlay" aria-modal="true" role="dialog" hidden>
    <div class="modal-box">
      <button class="modal-close" aria-label="Close">&#x2715;&nbsp; Close</button>
      <div class="modal-inner"></div>
    </div>
  </div>
  ```

- [ ] **Step 3: Verify modal is hidden**

  Reload `index.html`. Page should look exactly as before — the overlay has `hidden` and is not visible. Open DevTools → Elements → confirm `#award-modal` exists in the DOM with `hidden` attribute.

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "Add award modal overlay DOM element"
  ```

---

### Task 6: Add JS modal behavior

**Files:**
- Modify: `index.html` — `<script>` block, appended before the closing `</script>` tag

- [ ] **Step 1: Locate the closing tag of the script block**

  Find the `</script>` closing tag at the end of the inline script (~line 988).

- [ ] **Step 2: Insert the modal IIFE before `</script>`**

  Add this block immediately before `</script>`:
  ```js
  /* ── 3. AWARD CARD MODALS ── */
  (function () {
    var overlay  = document.getElementById('award-modal');
    var inner    = overlay.querySelector('.modal-inner');
    var closeBtn = overlay.querySelector('.modal-close');

    function openModal(card) {
      var content = card.querySelector('.popup-content');
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

- [ ] **Step 3: Verify hackathon card opens correctly**

  Reload `index.html`. Click the **Overall Best Development** card. Verify:
  - Page dims with rose-tinted backdrop
  - Modal animates in from below
  - Title reads "Overall Best Development"
  - Org reads "Annual Alfa Company Hackathon · April 2025"
  - Body contains two paragraphs about the Java tool and production deployment

- [ ] **Step 4: Verify close button works**

  Click the "✕ Close" button. Modal should dismiss and page scrolling should restore.

- [ ] **Step 5: Verify click-outside dismissal**

  Open the modal again, then click anywhere on the dimmed backdrop (not the white box). Modal should dismiss.

- [ ] **Step 6: Verify Escape key dismissal**

  Open the modal again, then press Escape. Modal should dismiss.

- [ ] **Step 7: Verify AWS cert card opens correctly**

  Click the **AWS Certified Cloud Practitioner** card. Verify:
  - Title reads "AWS Certified Cloud Practitioner"
  - Org reads "Amazon Web Services · CLF-C02"
  - Exam details paragraph shows CLF-C02, 65 questions, 90 minutes, issued/expiry dates
  - Covers paragraph lists EC2, S3, RDS, Lambda, security, compliance, IAM, billing
  - "↗ View Credential on Credly" link is present and clickable (opens Credly in new tab)

- [ ] **Step 8: Commit**

  ```bash
  git add index.html
  git commit -m "Add JS modal open/close behavior for award cards"
  ```

---

### Task 7: Final verification and push

- [ ] **Step 1: Full walkthrough**

  Reload `index.html` fresh (Ctrl+Shift+R). Check:
  1. Education section — certificate badge shows no emoji
  2. Awards section — both cards show hover effect (darkening + lift)
  3. Hackathon card — click opens modal with correct content, all three dismiss methods work
  4. AWS cert card — click opens modal with correct content, Credly link opens in new tab
  5. No console errors (DevTools → Console)
  6. No layout regressions in About, Experience, Skills, or footer sections

- [ ] **Step 2: Push to GitHub Pages**

  ```bash
  git push origin main
  ```

  Live at `https://bjackson5286.github.io` within ~60 seconds.
