'use client';

import Topbar from '@/components/ui/Topbar';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  acceptCoParenting,
  getCoParentCat,
  rejectCoParenting
} from '@/services/cat';
import CoParentAcceptBottomSheet from '@/components/profile/CoParentAcceptBottomSheet';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CoParentAlarmSkeleton from '@/components/profile/CoParentAlarmSkeleton';

const CoParentAlarmPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const { data: coParentCat, isLoading: isCoParentCatLoading } = useQuery({
    queryKey: ['coParentCat', id],
    queryFn: () => getCoParentCat(id),
    staleTime: 1000 * 60 * 10
  });

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
        {isCoParentCatLoading ? (
          <CoParentAlarmSkeleton />
        ) : (
          <>
            <article className="justicy-center flex flex-col items-center pt-14 text-heading-4 text-gr-900">
              <Image
                src={coParentCat?.ownerProfileImage}
                alt="alarm type"
                width={48}
                height={48}
                className="rounded-full"
              />
              <p className="pt-3">{coParentCat?.ownerNickname} 님이 </p>
              <p>공동냥육 요청을 보냈어요!</p>
            </article>
            <article className="flex flex-col gap-3 py-10">
              <Image
                src={coParentCat?.catImageUrl}
                width={200}
                height={200}
                alt="cat"
                className="aspect-square rounded-xl object-cover"
              />
              <div className="w-[200px] rounded-16 bg-gr-50 px-5 py-4">
                <div className="justify-left flex items-center gap-2">
                  <div className="w-[60px] text-heading-5 text-gr-900">
                    이름
                  </div>
                  <div className="text-body-3 text-gr-700">
                    {coParentCat?.catName}
                  </div>
                </div>
                <div className="justify-left flex items-center gap-2">
                  <div className="w-[60px] text-heading-5 text-gr-900">
                    성별
                  </div>
                  <div className="flex items-center gap-2 text-body-3 text-gr-700">
                    <p>{coParentCat?.sex === 'F' ? '여아' : '남아'}</p>
                    <Label.Icon
                      src={`/images/icons/gender-${coParentCat?.sex}.svg`}
                      className={`p-[2px] ${
                        coParentCat?.sex === 'F'
                          ? 'bg-[#FFF2F1]'
                          : 'bg-[#ECF5FF]'
                      }`}
                    />
                  </div>
                </div>
                <div className="justify-left flex items-center gap-2">
                  <div className="w-[60px] text-heading-5 text-gr-900">
                    중성화
                  </div>
                  <div className="text-body-3 text-gr-700">
                    {coParentCat?.isNeutered}
                  </div>
                </div>
              </div>
              <div className="w-fit rounded-16 bg-gr-50 px-5 py-4">
                함께 {coParentCat?.catName} 냥이를 돌보실래요?
              </div>
            </article>
          </>
        )}
        <div className="fixed bottom-0 left-1/2 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 transform bg-gr-white px-6 pb-9">
          <article className="flex items-center justify-center gap-2">
            <Button
              onClick={() => {
                rejectCoParentingMutation.mutate(coParentCat?.coParentId);
                router.back();
              }}
              className="w-1/2 rounded-16 border border-pr-500 bg-gr-white px-4 py-2"
            >
              <Button.Text text="거절" className="text-btn-2 text-pr-500" />
            </Button>
            <Button
              onClick={() => {
                acceptCoParentingMutation.mutate(coParentCat?.coParentId);
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
