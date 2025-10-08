// FIX: Import React to provide type definitions for React.ReactNode.
import type React from 'react';

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface NavLinkItem {
  name: string;
  path: string;
}

// FIX: Added missing EstimateResult interface.
export interface EstimateResult {
  diagnosis: string;
  recommended_actions: string[];
  estimated_cost_range: string;
  disclaimer: string;
}