// src/components/pages/account/AccountView.tsx
import React from 'react';
import Link from 'src/components/shared/Link';

interface AccountViewProps {
  children: React.ReactNode;
}

export default function AccountView({ children }: AccountViewProps) {
  return (
    <div className="w-full rounded-xl border border-orange-200">
      {children}
    </div>
  );
}
