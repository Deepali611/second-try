# Second Try — Blinkit Growth Fellowship MVP (Part 4)

An AI-native recovery system for **Lapsed Category Expanders** — customers who tried a new category once on Blinkit and didn't return. Built directly on Part 1's review-mining evidence and Part 2's interview findings.

---

## 🎯 Primary Business Metric
- **Lapsed Category Expander Recovery Rate (LCER)**:
  $$\text{LCER} = \left(\frac{\text{Recovered}}{\text{Reached}}\right) \times 100$$
- Measures stalled trial conversion into repeat purchases within 30 days of a Second Try intervention.

---

## 🔍 Evidence-Backed vs. Design Hypothesis
- **Evidence-backed (Part 2 directly)**: Customers wanted the specific fix named, not a generic apology — that's the real finding behind 45.5% of Part 1's signal.
- **Design hypothesis (MVP test)**: Delivering that fix as a one-tap pre-built reorder (rather than a message sending the customer back to browse) reduces effort at the exact moment they decide to retry. Tested as a product bet layered on top of validated evidence (worth an A/B test against "specific message, standard checkout").

---

## 🚀 Application Routes
- `/`: Blinkit Home Screen with product rows, 4-column category grid, top bar, and dynamic PDP Policy simulator.
- `/orders`: Dedicated **Order Again** screen with 4 seed orders (Pet Supplies, Personal Care, Baby Products, Electronics) matching the 4 failure types (`quality_expiry`, `no_proof`, `support_unresolved`, `high_value_hesitation`). Includes one-tap reorder execution, LCER metric counter, and 1-try non-repeatable guardrail.
- `/api/diagnose`: Next.js App Router server endpoint integrating Groq API (`llama-3.3-70b-versatile`) with structured JSON classification and automatic static scenario fallback.

---

## 🛠️ Local Setup & Run Commands

```bash
# 1. Install dependencies
npm install

# 2. Add Groq API Key in .env.local (optional, automatic fallback active)
GROQ_API_KEY=your_groq_api_key_here

# 3. Run development server
npm run dev

# 4. Build production bundle
npm run build
```
