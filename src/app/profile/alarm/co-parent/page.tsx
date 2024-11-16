'use client';

import Topbar from '@/components/ui/Topbar';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptCoParenting, rejectCoParenting } from '@/services/cat';
import CoParentAcceptBottomSheet from '@/components/profile/CoParentAcceptBottomSheet';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const catData = {
  coParentId: 0,
  catName: '농농',
  ownerNickname: '좌익수뒤로',
  imageUrl:
    'https://d2jzc2rxltjw7u.cloudfront.net/images/DIARY/3a424060-b8c7-4d28-946b-81705b73485f-image.jpg',
  sex: 'F',
  isNeutered: 'Y'
};

const CoParentAlarmPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const acceptCoParentingMutation = useMutation({
    mutationFn: (coParentId: number) => acceptCoParenting(coParentId),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        console.log('error');
      } else {
        queryClient.invalidateQueries({
          queryKey: ['getCoparentsNotifications']
        });
      }
    }
  });

  const rejectCoParentingMutation = useMutation({
    mutationFn: (coParentId: number) => rejectCoParenting(coParentId),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        console.log('error', data.message);
      } else {
        queryClient.invalidateQueries({
          queryKey: ['getCoparentsNotifications']
        });
      }
    }
  });

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-full overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={() => router.back()} />
        <Topbar.Empty />
        <Topbar.Empty />
      </Topbar>
      <section className="mx-auto w-full max-w-[640px] px-6">
        <article className="justicy-center flex flex-col items-center pt-14 text-heading-4 text-gr-900">
          <p>{catData.ownerNickname} 님이 </p>
          <p>공동냥육 요청을 보냈어요!</p>
        </article>
        <article className="flex flex-col gap-3 py-10">
          <Image
            src={catData.imageUrl}
            width={200}
            height={200}
            alt="cat"
            className="rounded-xl"
          />
          <div className="w-[200px] rounded-16 bg-gr-50 px-5 py-4">
            <div className="justify-left flex items-center gap-2">
              <div className="w-[60px] text-heading-5 text-gr-900">이름</div>
              <div className="text-body-3 text-gr-700">{catData.catName}</div>
            </div>
            <div className="justify-left flex items-center gap-2">
              <div className="w-[60px] text-heading-5 text-gr-900">성별</div>
              <div className="flex items-center gap-2 text-body-3 text-gr-700">
                <p>{catData.sex === 'F' ? '여아' : '남아'}</p>
                <Label.Icon
                  src={`/images/icons/gender-${catData.sex}.svg`}
                  className={`p-[2px] ${
                    catData.sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
                  }`}
                />
              </div>
            </div>
            <div className="justify-left flex items-center gap-2">
              <div className="w-[60px] text-heading-5 text-gr-900">중성화</div>
              <div className="text-body-3 text-gr-700">
                {catData.isNeutered}
              </div>
            </div>
          </div>
          <div className="w-fit rounded-16 bg-gr-50 px-5 py-4">
            함께 {catData.catName} 냥이를 돌보실래요?
          </div>
        </article>
        <div className="fixed bottom-0 left-1/2 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 transform bg-gr-white px-6 pb-9">
          <article className="flex items-center justify-center gap-2">
            <Button
              onClick={() => {
                rejectCoParentingMutation.mutate(catData.coParentId);
                router.back();
              }}
              className="w-1/2 rounded-16 border border-pr-500 bg-gr-white px-4 py-2"
            >
              <Button.Text text="거절" className="text-btn-2 text-pr-500" />
            </Button>
            <Button
              onClick={() => {
                acceptCoParentingMutation.mutate(catData.coParentId);
                setOpenBottomSheet(true);
              }}
              className="w-1/2 rounded-16 bg-pr-500 px-4 py-2"
            >
              <Button.Text text="수락" className="text-btn-2 text-gr-white" />
            </Button>
          </article>
        </div>
      </section>
      <CoParentAcceptBottomSheet
        isVisible={openBottomSheet}
        setIsVisible={() => {
          setOpenBottomSheet(!openBottomSheet);
        }}
      />
    </div>
  );
};

export default CoParentAlarmPage;
