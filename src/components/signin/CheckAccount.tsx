import React from 'react';
import Button from '@/components/ui/Button';
import { useUser } from '@/contexts/EmailContext';
import Image from 'next/image';
import { hideEmail } from '@/utils/common';
import { signIn } from 'next-auth/react';

interface CheckAccountProps {
  setStep: () => void;
}

export default function CheckAccount({ setStep }: CheckAccountProps) {
  const { email, loginType } = useUser();
  const hiddenEmail = hideEmail(email);

  return (
    <section className="w-full px-6 pt-12 text-[24px] font-bold text-gray-800">
      <div className="text-heading-2">이전에 가입한 계정을 확인하세요</div>
      <div className="mb-8 text-body-3 leading-6 text-gray-500">
        기존 계정으로 다시 로그인해주세요.
      </div>
      <div className="border-sm px-s mb-4 flex rounded-lg bg-gr-50 px-10 py-4">
        <Image
          src={`https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/social-login/${loginType.toLowerCase()}-sm.svg`}
          alt="social-login-logo"
          width={20}
          height={20}
        />
        <div className="ml-4 text-heading-5 font-regular">{hiddenEmail}</div>
      </div>
      <Button
        onClick={() => {
          signIn();
          setStep();
        }}
        className="w-full rounded-16 bg-pr-500 px-4 py-2"
      >
        <Button.Text
          text="기존 계정으로 로그인하기"
          className="text-btn-1 text-gr-white"
        />
      </Button>
    </section>
  );
}
