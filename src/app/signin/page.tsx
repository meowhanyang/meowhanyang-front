'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import Email from '@/components/signin/Email';
import Password from '@/components/signin/Password';
import CheckAccount from '@/components/signin/CheckAccount';
import SignInMain from '@/components/signin/SignInMain';
import Complete from '@/components/signin/Complete';
import Topbar from '@/components/ui/Topbar';
import { useFunnel } from '@/components/common/Funnel';

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type Step = 'main' | 'email' | 'accountInfo' | 'password' | 'complete';

const SignInPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const steps = [
    'main',
    'email',
    'accountInfo',
    'password',
    'complete'
  ] as const;

  type Step = (typeof steps)[number];

  const [Funnel, setStep] = useFunnel(steps, 'main');

  useEffect(() => {
    const step = searchParams.get('step') as Step;
    if (step && steps.includes(step)) {
      setStep(step);
    } else {
      // URL에 step 파라미터가 없으면 main으로 설정
      setStep('main');
    }
  }, [searchParams, steps]);

  const handleNextStep = (nextStep: Step) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('step', nextStep);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handlePrevStep = (currentStep: Step) => {
    const stepMap: Record<Step, Step> = {
      main: 'main',
      email: 'main',
      accountInfo: 'email',
      password: 'accountInfo',
      complete: 'password'
    };

    // 이전 단계의 URL로 이동
    const prevStep = stepMap[currentStep];
    if (prevStep === 'main') {
      // main으로 돌아갈 때는 step 파라미터 제거
      router.push(pathname);
    } else {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('step', prevStep);
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  };

  return (
    <div className="bg-gr-20 h-screen w-screen">
      <div className="relative mx-auto flex h-full max-w-[640px] flex-col items-center bg-white">
        <div className="w-full">
          <Funnel>
            <Funnel.Step name="main">
              <SignInMain setStep={() => handleNextStep('email')} />
            </Funnel.Step>
            <Funnel.Step name="email">
              <div className="fixed left-1/2 top-0 w-full max-w-[640px] -translate-x-1/2 transform">
                <Topbar type="three">
                  <Topbar.Back onClick={() => handlePrevStep('email')} />
                  <Topbar.Title title="이메일로 계속하기" />
                  <Topbar.Empty />
                </Topbar>
              </div>
              <Email setStep={(nextStep: Step) => handleNextStep(nextStep)} />
            </Funnel.Step>
            <Funnel.Step name="accountInfo">
              <div className="fixed left-1/2 top-0 w-full max-w-[640px] -translate-x-1/2 transform">
                <Topbar type="three">
                  <Topbar.Back onClick={() => handlePrevStep('accountInfo')} />
                  <Topbar.Title title="계정 확인" />
                  <Topbar.Empty />
                </Topbar>
              </div>
              <CheckAccount setStep={() => handleNextStep('password')} />
            </Funnel.Step>
            <Funnel.Step name="password">
              <div className="fixed left-1/2 top-0 w-full max-w-[640px] -translate-x-1/2 transform">
                <Topbar type="three">
                  <Topbar.Back onClick={() => handlePrevStep('password')} />
                  <Topbar.Title title="비밀번호 입력" />
                  <Topbar.Empty />
                </Topbar>
              </div>
              <Password />
            </Funnel.Step>
            <Funnel.Step name="complete">
              <div className="fixed left-1/2 top-0 w-full max-w-[640px] -translate-x-1/2 transform">
                <Topbar type="three">
                  <Topbar.Back onClick={() => handlePrevStep('complete')} />
                  <Topbar.Title title="로그인 완료" />
                  <Topbar.Empty />
                </Topbar>
              </div>
              <Complete />
            </Funnel.Step>
          </Funnel>
        </div>
      </div>
    </div>
  );
};

SignInPage.displayName = 'SignInPage';
export default SignInPage;
