'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const SignInContent = dynamic(
  () => import('@/components/signin/SignInContent'),
  {
    ssr: false
  }
);

const SignInPage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SignInContent />
    </Suspense>
  );
};

export default SignInPage;
