'use client';

import { useState } from 'react';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useUser } from '@/contexts/EmailContext';
import { useMutation } from '@tanstack/react-query';
import { signUpOnServer } from '@/services/signup';
import { useRouter } from 'next/navigation';
import SignupAgreeBottomSheet from '../../components/signup/SignupAgreeBottomSheet';
import usePasswordHandler from '@/utils/usePasswordHandler';
import Modal from '@/components/ui/Modal';
import { signInOnServer } from '@/services/signin';

const SignUpPage = () => {
  const router = useRouter();

  const [openAgreeBottom, setOpenAgreeBottom] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { password, passwordCheck, handlePwdChange, handlePwdCheckChange } =
    usePasswordHandler();

  const { email } = useUser();

  const signUp = () => {
    signUpMutation.mutate({
      email: email,
      password: password.value,
      loginType: 'EMAIL'
    });
  };

  const signUpMutation = useMutation({
    mutationFn: (reqObj: {
      email: string;
      password: string;
      loginType: string;
    }) => signUpOnServer(reqObj),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        data.message && setErrorMsg(data.message);
        setOpenAgreeBottom(false);
        setOpenModal(true);
      } else {
        signInOnServer({
          email: email,
          password: password.value
        });
        signInMutation.mutate({ email: email, password: password.value });
      }
    }
  });

  const signInMutation = useMutation({
    mutationFn: (reqObj: { email: string; password: string }) => {
      return signInOnServer(reqObj);
    },
    onSuccess: (response: any) => {
      const token = response.headers?.get('Authorization');
      const refreshToken = response.headers?.get('Authorization-Refresh');

      if (token && refreshToken) {
        router.replace('/diary');
      } else {
        console.error('인증 토큰이 없습니다.');
        router.replace('/signin');
      }
    },
    onError: (error: any) => {
      console.error('로그인 중 오류:', error);
      router.replace('/signin');
    }
  });

  return (
    <div className="h-screen bg-gr-white">
      <section className="mx-auto max-w-[640px] px-4 pt-10">
        <article className="pb-8 text-left text-heading-1 text-gr-black">
          <h1>비밀번호 설정하고</h1>
          <h1>회원가입을 완료해 주세요</h1>
        </article>
        <article className="flex flex-col gap-2">
          <Input
            type="password"
            helperText={
              password.error ? '8자 이상 / 영문, 숫자, 특수문자 가능' : ''
            }
            value={password.value}
            placeholder="8자 이상 / 영문, 숫자, 특수문자 가능"
            error={password.error ? true : false}
            onChange={handlePwdChange}
          />
          <Input
            type="password"
            helperText={passwordCheck.error ? '비밀번호를 확인해주세요' : ''}
            value={passwordCheck.value}
            placeholder="비밀번호 확인"
            error={passwordCheck.error ? true : false}
            onChange={handlePwdCheckChange}
          />
        </article>
        <article className="py-4">
          <Button
            onClick={() => setOpenAgreeBottom(true)}
            className="w-full rounded-16 bg-pr-500 px-4 py-2 disabled:bg-gr-200"
            disabled={
              !password.value ||
              !passwordCheck.value ||
              password.error ||
              passwordCheck.error
                ? true
                : false
            }
          >
            <Button.Text text="가입하기" className="text-btn-1 text-gr-white" />
          </Button>
        </article>

        <SignupAgreeBottomSheet
          open={openAgreeBottom}
          setIsVisible={setOpenAgreeBottom}
          onClick={signUp}
        />
        {openModal && (
          <Modal
            contents={{ title: '알림', body: errorMsg }}
            scrim={true}
            buttons={[
              {
                content: '확인',
                btnStyle: 'w-full rounded-16 px-4 py-2 bg-sm-error-700',
                textStyle: 'text-gr-white text-btn-1',
                onClick: () => {
                  setOpenModal(false), setOpenAgreeBottom(false);
                }
              }
            ]}
          />
        )}
      </section>
    </div>
  );
};

SignUpPage.displayName = 'SignUpPage';
export default SignUpPage;
