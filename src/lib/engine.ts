import { db } from './mockData';
import { AdSignal, ProductRecommendation } from './types';

export const PRODUCTS: Record<string, ProductRecommendation> = {
    KPR_FLOW: {
        id: 'prod_kpr',
        title: 'Wujudkan Rumah Impian',
        description: 'Bunga spesial 3.88% fix 1 tahun untuk properti pertama Anda.',
        imageUrl: '/images/kpr_banner.jpg',
        actionUrl: '/apply/kpr',
        score: 0.9,
        triggerReason: 'Based on your recent property search',
    },
    TRAVEL_SAVINGS: {
        id: 'prod_valas',
        title: 'Siap Liburan ke Luar Negeri?',
        description: 'Buka Tahapan Valas, bebas biaya admin dan kurs kompetitif.',
        imageUrl: '/images/travel_banner.jpg',
        actionUrl: '/apply/valas',
        score: 0.85,
        triggerReason: 'Based on your travel interest',
    },
    RETIREMENT_PLAN: {
        id: 'prod_pensiun',
        title: 'Masa Tua Tenang & Nyaman',
        description: 'Mulai dana pensiun dari sekarang, imbal hasil hingga 7% p.a.',
        imageUrl: '/images/pensiun_banner.jpg',
        actionUrl: '/apply/dplk',
        score: 0.8,
        triggerReason: 'Recommended for your age group',
    },
    AUTO_DEBIT: {
        id: 'prod_autodebit',
        title: 'Tabungan Auto-Debit',
        description: 'Cara termudah mencapai goals keuangan Anda.',
        imageUrl: '/images/saving_banner.jpg',
        actionUrl: '/apply/tahaka',
        score: 0.6, // Default fallback
        triggerReason: 'Popular among young professionals',
    }
};

export const Engine = {
    // 1. Ingest Signal
    ingestSignal: async (signal: AdSignal) => {
        console.log(`[Engine] Processing signal from ${signal.source}: ${signal.intent}`);

        // 2. Identity Matching
        const customer = db.findCustomerByAdId(signal.adId);

        if (customer) {
            console.log(`[Engine] Matched to customer: ${customer.name} (${customer.cif})`);
            // Update persistent store
            db.updateCustomerLastInteraction(customer.cif, signal);
            return { matched: true, customerId: customer.cif };
        } else {
            console.log(`[Engine] No customer matched for Ad ID: ${signal.adId}`);
            return { matched: false };
        }
    },

    // 3. Recommendation Logic (The "AI" Model)
    getRecommendation: (cif: string): ProductRecommendation => {
        const customer = db.getCustomer(cif);
        if (!customer) return PRODUCTS.AUTO_DEBIT;

        const lastSignal = customer.lastAdInteraction;

        // Heuristic Rules (mimicking AI weights)
        if (lastSignal) {
            if (lastSignal.intent === 'MORTGAGE') return PRODUCTS.KPR_FLOW;
            if (lastSignal.intent === 'TRAVEL') return PRODUCTS.TRAVEL_SAVINGS;
            if (lastSignal.intent === 'RETIREMENT') return PRODUCTS.RETIREMENT_PLAN;
        }

        // Fallback based on demographics
        if (customer.age > 50) return PRODUCTS.RETIREMENT_PLAN;
        if (customer.balance > 100000000) return PRODUCTS.TRAVEL_SAVINGS;

        return PRODUCTS.AUTO_DEBIT;
    }
};
