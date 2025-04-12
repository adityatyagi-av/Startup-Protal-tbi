import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@/components/component/spinner';

const ChatClientPage = dynamic(() => import('./ChatPageClient'), {
  ssr: false,
});

export default function ChatDashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <ChatClientPage />
    </Suspense>
  );
}
