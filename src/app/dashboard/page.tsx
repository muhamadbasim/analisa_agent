'use client'; // Rebuild trigger

import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    Users,
    Target,
    Activity,
    RefreshCw
} from 'lucide-react';
import { PromoBanner } from '@/components/PromoBanner';

// Mock data integration for dashboard demo
const MOCK_STATS = [
    { label: 'Total Sinyal', value: '1,284', change: '+12%', icon: Activity, color: 'text-blue-500' },
    { label: 'User Teridentifikasi', value: '856', change: '+8%', icon: Users, color: 'text-green-500' },
    { label: 'Akurasi Match', value: '67%', change: '+5%', icon: Target, color: 'text-purple-500' },
    { label: 'Konversi', value: '14.2%', change: '+2.1%', icon: BarChart3, color: 'text-orange-500' },
];

export default function Dashboard() {
    const [selectedPersona, setSelectedPersona] = useState('10001');
    const [recommendation, setRecommendation] = useState<any>(null);

    // Simulate fetching a recommendation for the selected persona
    const refreshRecommendation = () => {
        // In a real app, fetch /api/recommendation?cif={selectedPersona}
        // For demo, we just hardcode logic client-side or assume we fetched it
        const demoRecs: any = {
            '10001': { // Budi
                title: 'Wujudkan Rumah Impian',
                description: 'Bunga spesial 3.88% fix 1 tahun untuk properti pertama Anda.',
                intent: 'MORTGAGE'
            },
            '10002': { // Siti
                title: 'Siap Liburan ke Luar Negeri?',
                description: 'Nikmati kurs kompetitif dan bebas biaya tarik tunai di ATM luar negeri.',
                intent: 'TRAVEL'
            },
            '10003': { // Andi
                title: 'Masa Tua Tenang & Nyaman',
                description: 'Persiapkan dana pensiun Anda dengan imbal hasil optimal.',
                intent: 'RETIREMENT'
            }
        };
        setRecommendation(demoRecs[selectedPersona]);
    };

    useEffect(() => {
        refreshRecommendation();
    }, [selectedPersona]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">AI-Driven Personalization Dashboard</h1>
                    <p className="text-gray-500">Monitoring Real-time Ad Signals & Conversions</p>
                </header>

                {/* Stats Grid */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {MOCK_STATS.map((stat, i) => (
                        <div key={i} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`rounded-lg bg-gray-50 p-3 ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="font-medium text-green-600">{stat.change}</span>
                                <span className="ml-2 text-gray-400">vs last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Live Preview Panel */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Live Banner Preview</h2>

                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-500">Test Persona:</span>
                                <select
                                    className="rounded-lg border-gray-300 py-1.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                                    value={selectedPersona}
                                    onChange={(e) => setSelectedPersona(e.target.value)}
                                >
                                    <option value="10001">Budi (Mass - Mortgage)</option>
                                    <option value="10002">Siti (Premier - Travel)</option>
                                    <option value="10003">Andi (Wealth - Retirement)</option>
                                </select>
                                <button
                                    onClick={refreshRecommendation}
                                    className="rounded-lg p-2 hover:bg-gray-100"
                                >
                                    <RefreshCw className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div className="flex h-64 items-center justify-center rounded-2xl bg-gray-100 p-8">
                            {/* Mobile Phone Frame Mockup */}
                            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200">
                                <div className="h-4 bg-gray-100 border-b border-gray-200"></div> {/* Status bar */}
                                <div className="p-4 space-y-4">
                                    <div className="h-8 w-2/3 rounded bg-gray-100 animate-pulse"></div>
                                    <div className="h-32 rounded-xl bg-gray-50 p-2">
                                        {recommendation && (
                                            <PromoBanner
                                                title={recommendation.title}
                                                description={recommendation.description}
                                                intent={recommendation.intent}
                                            />
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-full rounded bg-gray-100 animate-pulse"></div>
                                        <div className="h-4 w-5/6 rounded bg-gray-100 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-center text-sm text-gray-500">
                            Preview of how the recommendation appears in the Mobile Banking App.
                        </p>
                    </div>

                    {/* Activity Log Panel */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900">Recent Ingestion Activity</h2>
                        <div className="flow-root">
                            <ul className="-my-5 divide-y divide-gray-100">
                                {[
                                    { source: 'Google Ads', time: '2m ago', event: 'Search "KPR Bunga Rendah"', match: true },
                                    { source: 'Meta Ads', time: '5m ago', event: 'Click "Travel Insurance"', match: true },
                                    { source: 'Google Ads', time: '12m ago', event: 'View "Retirement Plan"', match: false },
                                    { source: 'Google Ads', time: '18m ago', event: 'Search "Mobil Baru"', match: true },
                                ].map((item, idx) => (
                                    <li key={idx} className="py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className={`h-2 w-2 rounded-full ${item.match ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900">
                                                    {item.event}
                                                </p>
                                                <p className="truncate text-sm text-gray-500">
                                                    Source: {item.source}
                                                </p>
                                            </div>
                                            <div className="text-right text-sm text-gray-500">
                                                {item.time}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6">
                            <span className="block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center text-sm font-medium text-gray-500 hover:border-gray-400 hover:text-gray-900 cursor-pointer">
                                View Full Logs
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
