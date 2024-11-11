'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import OnboardProfileModal from '@/components/onboard/OnboardProfileModal';
import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@/services/profile';

const OnBoardPage = () => {
  const router = useRouter();

  const [showProfileModal, setShowProfileModal] = useState(false);

  const { data: myProfile } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(),
    enabled: !showProfileModal
  });

  return (
    <>
      <section className="px-4 pt-[60px]">
        <article className="flex items-center justify-center">
          <Image
            src={
              myProfile?.profileImageUrl ||
              'https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/can.svg'
            }
            alt="profile"
            width={120}
            height={120}
            className="h-[120px] w-[120px] rounded-[48px]"
          />
        </article>
        <article className="text-bg-black flex flex-col items-center justify-center gap-2 py-8 text-heading-1">
          <h1>
            <span className="text-pr-500">{myProfile?.nickname}</span>님,
          </h1>
          <h1>환영합니다.</h1>
        </article>
        <article className="flex flex-col gap-1">
          <Button
            onClick={() => router.push('/diary')}
            className="w-full rounded-16 bg-pr-500 px-4 py-2"
            disabled={false}
          >
            <Button.Text text="시작하기" className="text-btn-1 text-gr-white" />
          </Button>
          <Button
            onClick={() => setShowProfileModal(true)}
            className="w-full rounded-16 bg-gr-white px-4 py-2"
            disabled={false}
          >
            <Button.Text
              text="프로필 설정하기"
              className="text-btn-1 text-gr-300"
            />
          </Button>
        </article>
      </section>
      {showProfileModal && (
        <OnboardProfileModal
          onClose={() => setShowProfileModal(false)}
          myProfile={myProfile}
        />
      )}
    </>
  );
};

export default OnBoardPage;
