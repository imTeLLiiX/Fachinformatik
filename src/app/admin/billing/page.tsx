'use client';

import { BillingManagement } from '@/components/admin/BillingManagement';

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Abrechnung</h1>
        <p className="text-gray-500">Verwalten Sie Abrechnungen und Transaktionen</p>
      </div>
      <BillingManagement />
    </div>
  );
} 