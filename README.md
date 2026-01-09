# AI-Driven Hyper-Personalization System

A Proof of Concept (PoC) for a banking personalization engine that connects external ad signals (Google/Meta Ads) with internal customer profiles to deliver hyper-relevant product recommendations.

![Dashboard Preview](./dashboard-preview.png)
*(Note: You can add a screenshot of the dashboard here)*

## 🚀 Features

* **Ad Signal Ingestion**: API to receive intent signals (Search, Click, View) from ad platforms.
* **Identity Matching**: Links Ad Cookies/IDs to internal Customer Information Files (CIF) securely.
* **Recommendation Engine**: Heuristic-based logic to suggest products (Mortgage, Travel, Retirement) based on user intent and demographics.
* **Admin Dashboard**: Real-time visualization of matched signals, conversion metrics, and a live banner preview.
* **Dynamic Banner**: A React component that changes its aesthetic and content based on the recommended product.

## 🛠 Tech Stack

* **Framework**: Next.js 14+ (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Deployment**: Vercel / Local

## 📂 Project Structure

```
src/
├── app/
│   ├── api/ingest/    # API Route for receiving ad signals
│   └── dashboard/     # Admin Dashboard Page
├── components/
│   └── PromoBanner.tsx # Dynamic Banner Component
├── lib/
│   ├── engine.ts      # Core matching & recommendation logic
│   ├── mockData.ts    # Simulated database of customers
│   └── types.ts       # Domain interfaces
```

## 🏁 Getting Started

### Prerequisites

* Node.js 18+
* npm

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/muhamadbasim/analisa_agent.git
    cd analisa_agent
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the analytics dashboard.

## 🧪 Verification

To test the core logic without the UI, run the verification script:

```bash
npx tsx verify_logic.ts
```

This script will:

1. Ingest a mock "MORTGAGE" signal.
2. Verify the engine matches it to customer "Budi".
3. Confirm the recommendation is updated to "KPR".

## 📡 API Endpoints

### `POST /api/ingest`

Receives an ad interaction signal.

**Body:**

```json
{
  "source": "google",
  "adId": "cookie_123",
  "intent": "MORTGAGE",
  "campaignType": "SEARCH"
}
```

**Response:**

```json
{
  "success": true,
  "data": { "matched": true, "customerId": "10001" },
  "message": "Signal matched to existing customer."
}
```
