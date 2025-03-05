// src/components/pages/account/AccountView.tsx
import React from 'react';
import Link from 'src/components/shared/Link';

interface AccountViewProps {
  children: React.ReactNode;
}

export default function AccountView({ children }: AccountViewProps) {
  return (
    <div className="w-full rounded-xl border border-orange-200">
      <div className="border-b border-orange-200 p-4">
        <nav className="flex space-x-4">
          <Link href="/account/view" styled>
            View
          </Link>
          <Link href="/account/view/orders" styled>
            View Orders
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
