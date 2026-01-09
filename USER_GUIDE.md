# User Guide & Demo Scenarios

This guide details how to demonstrate the capabilities of the AI-Driven Hyper-Personalization System.

## Demo Scenarios

### Scenario 1: The First-Time Home Buyer (Budi)

**Persona:** Budi is looking for a house. He has searched for "KPR Bunga Murah" on Google.

1. **Action:** In the Live Banner Preview, select **"Budi (Mass - Mortgage)"** from the dropdown.
2. **Observation:** The banner turns **Blue/Indigo**.
3. **Content:** "Wujudkan Rumah Impian" (Realize your dream home).
4. **Why:** The engine detected his mortgage intent and matched it to his CIF.

### Scenario 2: The World Traveler (Siti)

**Persona:** Siti loves traveling. She clicked an ad for "Travel Insurance" on Instagram.

1. **Action:** In the Live Banner Preview, select **"Siti (Premier - Travel)"** from the dropdown.
2. **Observation:** The banner turns **Teal/Emerald**.
3. **Content:** "Siap Liburan ke Luar Negeri?" (Ready for vacaction?).
4. **Why:** The engine prioritized her travel interest over generic offers.

### Scenario 3: The Wealthy Planner (Andi)

**Persona:** Andi is approaching retirement age.

1. **Action:** In the Live Banner Preview, select **"Andi (Wealth - Retirement)"** from the dropdown.
2. **Observation:** The banner turns **Amber/Orange**.
3. **Content:** "Masa Tua Tenang & Nyaman" (Peaceful Retirement).
4. **Why:** Even without a specific ad click, the engine falls back to his demographic profile (Age 55+).

## Technical Demo: Triggering Signals via API

You can simulate a new ad event using `curl` to update the backend state for a mock user.

**Command:**

```bash
curl -X POST http://localhost:3000/api/ingest \
  -H "Content-Type: application/json" \
  -d '{"source": "google", "adId": "cookie_123", "intent": "TRAVEL"}'
```

**Expected Result:**
The Dashboard Activity Log will update, and if the matched user (Budi, linked to `cookie_123`) is selected, their recommendation will change to a Travel offer.
