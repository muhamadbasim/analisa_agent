import { Engine } from './src/lib/engine';
import { db } from './src/lib/mockData';

async function runTest() {
    console.log('--- Starting Verification ---');

    // Test 1: Ingest Signal for existing user (Budi - 10001)
    console.log('\nTest 1: Ingest "MORTGAGE" signal for Budi (cookie_123)');
    const res1 = await Engine.ingestSignal({
        source: 'google',
        adId: 'cookie_123',
        campaignType: 'SEARCH',
        timestamp: new Date().toISOString(),
        intent: 'MORTGAGE'
    });
    console.log('Ingest Result:', res1);

    // Test 2: Check Recommendation for Budi
    const rec1 = Engine.getRecommendation('10001');
    console.log('Recommendation for Budi:', rec1.id, '-', rec1.title);

    if (rec1.id !== 'prod_kpr') {
        console.error('FAIL: Expected Mortgage recommendation (prod_kpr). Got:', rec1.id);
    } else {
        console.log('PASS: Correctly recommended KPR.');
    }

    // Test 3: Unknown user
    console.log('\nTest 3: Ingest signal for unknown cookie');
    const res2 = await Engine.ingestSignal({
        source: 'meta',
        adId: 'unknown_cookie_999',
        campaignType: 'DISPLAY',
        timestamp: new Date().toISOString(),
        intent: 'TRAVEL'
    });
    console.log('Ingest Result:', res2);

    console.log('\n--- Verification Complete ---');
}

runTest();
