import { NextRequest, NextResponse } from 'next/server';
import { Engine } from '@/lib/engine';
import { AdSignal } from '@/lib/types';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.adId || !body.source) {
            return NextResponse.json(
                { error: 'Missing required fields: adId, source' },
                { status: 400 }
            );
        }

        const signal: AdSignal = {
            source: body.source,
            adId: body.adId,
            campaignType: body.campaignType || 'GENERAL',
            timestamp: new Date().toISOString(),
            intent: body.intent || 'UNKNOWN',
            metaData: body.metaData,
        };

        const result = await Engine.ingestSignal(signal);

        return NextResponse.json({
            success: true,
            data: result,
            message: result.matched
                ? 'Signal matched to existing customer.'
                : 'Signal recorded but no customer match found.'
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
