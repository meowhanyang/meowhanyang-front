'use client';

import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import usePasswordHandler from '@/utils/usePasswordHandler';
import { useUser } from '@/contexts/EmailContext';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendPwdResetEmail, signInOnServer } from '@/services/signin';
import { useRouter } from 'next/navigation';
import Modal from '../ui/Modal';

interface PasswordProps {
  setStep: () => void;
}

export default function Password({ setStep }: PasswordProps) {
  const { password, handlePwdChange } = usePasswordHandler();
  const { email } = useUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showFindModal, setShowFindModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const signIn = () => {
    signInMutation.mutate({
      email: email,
      password: password.value
    });
  };

  const signInMutation = useMutation({
    mutationFn: (reqObj: { email: string; password: string }) => {
      return signInOnServer(reqObj);
    },
    onSuccess: (response: any) => {
      if (response.status === 200) {
        router.push('/diary');
      } else {
        console.error('로그인 중 오류:', response.message);
        router.push('/signin');
      }
    },
    onError: (error: any) => {
      setShowModal(true);
      setErrorMsg(error.message);
      console.error('로그인 중 오류:', error.message);
    }
  });

  const findPassword = () => {
    resetPwMutation.mutate(email);
    setShowFindModal(true);
  };

  const resetPwMutation = useMutation({
    mutationFn: (email: string) => {
      return sendPwdResetEmail({ email });
    },
    onSuccess: (response: any) => {
      if (response.status === 200) {
      } else {
        console.error('비밀번호 초기화 메일 전송 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      setShowFindModal(true);
      console.error('비밀번호 초기화 메일 전송 중 오류:', error);
    }
  });

  return (
    <section className="w-full px-6 text-[24px] font-bold text-gray-800">
      <div className="mb-[32px]">
        비밀번호를 입력하여 <br /> 로그인해 주세요
      </div>
      <div className="pb-4">
        <Input
          variant="outlined"
          type="password"
          placeholder="비밀번호를 입력하세요"
          helperText={password.error ? '비밀번호를 확인해주세요' : ''}
          value={password.value}
          error={password.error ? true : false}
          onChange={handlePwdChange}
        />
      </div>
      <Button
        onClick={signIn}
        className="w-full rounded-16 bg-pr-500 px-4 py-2 disabled:bg-gr-200"
        disabled={!password.value || password.error}
      >
        <Button.Text text="로그인하기" className="text-btn-1 text-gr-white" />
      </Button>
      <Button
        onClick={findPassword}
        className="mx-auto mt-8 h-fit w-fit rounded-16 border border-gr-100 bg-gr-white px-3 py-2"
      >
        <Button.Text
          text="비밀번호를 잊으셨나요?"
          className="text-btn-3 text-gr-500"
        />
      </Button>
      {showModal && (
        <Modal
          contents={{
            title: '알림',
            body: errorMsg || '입력하신 정보를 다시 한번 확인해주세요'
          }}
          scrim={true}
          buttons={[
            {
              content: '확인',
              btnStyle: 'w-full rounded-[16px] px-4 py-2 bg-pr-500',
              textStyle: 'text-gr-white text-btn-1',
              onClick: () => setShowModal(false)
            }
          ]}
        />
      )}
      {showFindModal && (
        <Modal
          contents={{
            title: '비밀번호 재설정을 위한 \n 메일이 전송되었어요',
            body: '메일을 확인하시고 안내에 따라 \n 비밀번호를 재설정해주세요'
          }}
          scrim={true}
          buttons={[
            {
              content: '확인',
              btnStyle: 'w-full rounded-[16px] px-4 py-2 bg-pr-500',
              textStyle: 'text-gr-white text-btn-1',
              onClick: () => setShowFindModal(false)
            }
          ]}
        />
      )}
    </section>
  );
}
