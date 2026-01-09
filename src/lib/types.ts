export type IntentCategory = 'MORTGAGE' | 'TRAVEL' | 'SAVINGS' | 'RETIREMENT' | 'UNKNOWN';

export interface AdSignal {
  source: 'google' | 'meta';
  adId: string;
  campaignType: string;
  timestamp: string;
  intent: IntentCategory;
  metaData?: Record<string, any>;
}

export interface Customer {
  cif: string; // Customer Identification File (ID)
  name: string;
  segment: 'MASS' | 'PREMIER' | 'WEALTH';
  age: number;
  balance: number;
  adIds: string[]; // Linked Ad Cookies/IDs
  lastAdInteraction?: AdSignal;
}

export interface ProductRecommendation {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // For the banner
  actionUrl: string; // Deeplink
  score: number; // Relevance score
  triggerReason: string; // "Because you viewed..."
}
