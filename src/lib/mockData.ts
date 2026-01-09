import { Customer } from './types';

export const MOCK_CUSTOMERS: Customer[] = [
    {
        cif: '10001',
        name: 'Budi Santoso',
        segment: 'MASS',
        age: 28,
        balance: 5000000,
        adIds: ['cookie_123'], // Linked to Google Ad ID
    },
    {
        cif: '10002',
        name: 'Siti Aminah',
        segment: 'PREMIER',
        age: 45,
        balance: 150000000,
        adIds: ['cookie_456', 'meta_789'],
    },
    {
        cif: '10003',
        name: 'Andi Pratama',
        segment: 'WEALTH',
        age: 55,
        balance: 5000000000,
        adIds: ['cookie_999'],
    },
];

// Simple in-memory store for demo purposes
// In a real app, this would be a database connection
export const db = {
    customers: [...MOCK_CUSTOMERS],

    findCustomerByAdId: (adId: string) => {
        return db.customers.find(c => c.adIds.includes(adId));
    },

    updateCustomerLastInteraction: (cif: string, signal: any) => {
        const customer = db.customers.find(c => c.cif === cif);
        if (customer) {
            customer.lastAdInteraction = signal;
        }
    },

    getCustomer: (cif: string) => {
        return db.customers.find(c => c.cif === cif);
    }
};
