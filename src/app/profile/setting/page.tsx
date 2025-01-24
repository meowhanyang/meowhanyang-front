'use client';

import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SettingCard from '@/components/setting/SettingCard';
import { Switch } from '@/components/ui/Switch';
import Modal from '@/components/ui/Modal';
import { deleteAccountOnServer } from '@/services/signup';
import { Toaster } from '@/components/ui/Toaster';
import { useToast } from '@/components/ui/hooks/useToast';
import Terms from '@/components/signup/Terms';
import { TermsType } from '@/constants/general';
import { signOut } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getPushNotification,
  togglePushNotificationOnServer
} from '@/services/push-notification';
import { getCurrentDateInYYYYMMDD } from '@/utils/common';

const SettingPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [switchOn, setSwitchOn] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [termsModal, setTermsModal] = useState<string>('');

  const { data: pushNotofication, isSuccess } = useQuery({
    queryKey: ['getPushNoti'],
    queryFn: () => getPushNotification(),
    staleTime: 1000 * 60 * 10
  });
  useEffect(() => {
    if (isSuccess) {
      setSwitchOn(pushNotofication.receivePushNotification);
    }
  }, [pushNotofication]);

  const togglePushNotification = useMutation({
    mutationFn: () => togglePushNotificationOnServer(),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        console.error('data.status:', data.status);
      } else {
        queryClient.invalidateQueries({ queryKey: ['getPushNoti'] });
      }
    }
  });

  const logOut = async () => {
    try {
      document.cookie =
        'Authorization-Refresh=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

      setTimeout(() => {
        document.cookie =
          'Authorization=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        signOut({ redirect: true });
        window.location.href = '/signin';
      }, 100);
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const toggleSwitch = () => {
    setSwitchOn(!switchOn);
    togglePushNotification.mutate();
    toast({
      description: `${getCurrentDateInYYYYMMDD()} 앱 푸시 수신 동의를 ${switchOn ? '철회' : '동의'} 했어요`,
      duration: 2000
    });
  };

  return (
    <>
      <div className="fixed left-1/2 top-0 z-50 h-full w-full max-w-[678px] -translate-x-1/2 overflow-y-auto bg-gr-white">
        <Topbar type="three">
          <Topbar.Back onClick={() => router.back()} />
          <Topbar.Title title="설정" />
          <Topbar.Empty />
        </Topbar>
        <div className="mx-auto max-w-[640px]">
          <section className="flex items-center justify-between pb-4 pl-5 pr-4 pt-16">
            <div>
              <h1 className="text-btn-1 text-gr-800">푸시알림</h1>
              <h1 className="text-body-3 text-gr-400">
                알림을 꺼도 내 소식에서 확인할 수 있어요
              </h1>
            </div>
            <Switch checked={switchOn} onCheckedChange={toggleSwitch} />
          </section>
          <section className="h-2 bg-gr-50" />
          <section>
            <SettingCard
              text="이용약관"
              onClick={() => setTermsModal(TermsType.TERMS_OF_USE)}
            />
            <SettingCard
              text="개인정보 처리방침"
              onClick={() => setTermsModal(TermsType.PRIVACY_POLICY)}
            />
          </section>
          <section className="h-2 bg-gr-50" />
          <SettingCard text="로그아웃" onClick={() => setLogOutModal(true)} />
          <SettingCard text="회원탈퇴" onClick={() => setWithdrawModal(true)} />
          <section className="pt-20 text-center text-body-3 text-gr-400">
            <p>문의사항이 있을 경우,</p>
            <p>meowzzip@gmail.com으로 보내주세요</p>
          </section>
        </div>
        <Toaster />

        {termsModal !== '' && (
          <div className="fixed left-0 top-0 z-[50] mx-auto h-screen w-full max-w-[680px] overflow-y-auto bg-gr-white">
            <Topbar type="three">
              <Topbar.Back onClick={() => setTermsModal('')} />
              <Topbar.Title
                title={
                  termsModal === TermsType.TERMS_OF_USE
                    ? '서비스 이용약관'
                    : '개인정보 수집 및 처리방침'
                }
              />
              <Topbar.Empty />
            </Topbar>
            <div className="flex flex-col gap-2 px-2 py-2 pt-12">
              <Terms type={termsModal} />
            </div>
          </div>
        )}

        {logOutModal && (
          <Modal
            contents={{ title: '로그아웃 하시겠습니까?' }}
            scrim={true}
            buttons={[
              {
                content: '로그아웃',
                btnStyle: 'w-full rounded-16 px-4 py-2 bg-sm-error-500',
                textStyle: 'text-gr-white text-btn-1',
                onClick: () => logOut()
              },
              {
                content: '취소',
                btnStyle: 'w-full rounded-16 px-4 py-2 bg-gr-white',
                textStyle: 'text-gr-300 text-btn-1',
                onClick: () => setLogOutModal(false)
              }
            ]}
          />
        )}
        {withdrawModal && (
          <Modal
            contents={{
              title: '회원탈퇴 하시겠습니까?',
              body: '지금까지의 모든 정보가 삭제되며, \n 복구할 수 없습니다.'
            }}
            scrim={true}
            buttons={[
              {
                content: '탈퇴하기',
                btnStyle: 'w-full rounded-16 px-4 py-2 bg-sm-error-500',
                textStyle: 'text-gr-white text-btn-1',
                onClick: () => deleteAccountOnServer()
              },
              {
                content: '취소',
                btnStyle: 'w-full rounded-16 px-4 py-2 bg-gr-white',
                textStyle: 'text-gr-300 text-btn-1',
                onClick: () => setWithdrawModal(false)
              }
            ]}
          />
        )}
      </div>
    </>
  );
};

export default SettingPage;
