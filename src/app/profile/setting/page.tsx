'use client';

import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SettingCard from '@/components/setting/SettingCard';
import { Switch } from '@/components/ui/Switch';
import Modal from '@/components/ui/Modal';
import { deleteAccountOnServer } from '@/services/signup';
import { Toaster } from '@/components/ui/Toaster';
import { useToast } from '@/components/ui/hooks/useToast';
import Terms from '@/components/signup/Terms';
import { TermsType } from '@/constants/general';
import { signOut } from 'next-auth/react';

const SettingPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [openFirstRunModal, setOpenFirstRunModal] = useState(true);
  const [switchOn, setSwitchOn] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [termsModal, setTermsModal] = useState<string>('');

  const allowNotify = () => {
    console.log('알림 허용 api');
    setSwitchOn(true);
    setOpenFirstRunModal(false);
  };
  const disallowNotify = () => {
    console.log('알림 허용 안함 api');
    setSwitchOn(false);
    setOpenFirstRunModal(false);
  };

  const openTermsOfUseModal = () => {
    setTermsModal(TermsType.TERMS_OF_USE);
  };

  const openPrivacyModal = () => {
    setTermsModal(TermsType.PRIVACY_POLICY);
  };

  const logOut = () => {
    document.cookie = 'Authorization=; Max-Age=0; Path=/;';
    signOut({ callbackUrl: '/diary' });
  };

  const toggleSwitch = () => {
    setSwitchOn(!switchOn);
    toast({
      description: `${formatToday()} 앱 푸시 수신 동의를 ${switchOn ? '철회' : '동의'} 했어요`
    });
  };

  const formatToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${year}.${month}.${date}`;
  };

  return (
    <>
      {openFirstRunModal ? (
        <Modal
          contents={{
            title: '‘냥.zip’에서 알림을 \n 보내고자 합니다.',
            body: '경고, 사운드 및 아이콘 배지가 알림에 \n 포함 될 수 있습니다. 설정에서 이를 구성할 \n 수 있습니다.'
          }}
          scrim={true}
          buttons={[
            {
              content: '허용',
              btnStyle: 'w-full rounded-16 px-4 py-2 bg-pr-500',
              textStyle: 'text-gr-white text-btn-1',
              onClick: () => allowNotify()
            },
            {
              content: '허용 안함',
              btnStyle: 'w-full rounded-16 px-4 py-2 bg-gr-white',
              textStyle: 'text-pr-400 text-btn-1',
              onClick: () => disallowNotify()
            }
          ]}
        />
      ) : (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
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
              <SettingCard text="이용약관" onClick={openTermsOfUseModal} />
              <SettingCard
                text="개인정보 처리방침"
                onClick={openPrivacyModal}
              />
            </section>
            <section className="h-2 bg-gr-50" />
            <SettingCard text="로그아웃" onClick={() => setLogOutModal(true)} />
            <SettingCard
              text="회원탈퇴"
              onClick={() => setWithdrawModal(true)}
            />
            <section className="pt-20 text-center text-body-3 text-gr-400">
              <p>문의사항이 있을 경우,</p>
              <p>meowzzip@gmail.com으로 보내주세요</p>
            </section>
          </div>
          <Toaster />

          {termsModal !== '' && (
            <div className="fixed left-0 top-0 z-[50] mx-auto h-screen w-full max-w-[640px] overflow-y-auto bg-gr-white">
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
      )}
    </>
  );
};

export default SettingPage;
