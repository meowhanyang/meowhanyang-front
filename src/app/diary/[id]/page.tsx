'use client';

import React, { useEffect, useState } from 'react';
import Topbar from '@/components/ui/Topbar';
import Carousel from '@/components/ui/Carousel';
import Label from '@/components/ui/Label';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteDiaryOnServer, getDiaryDetail } from '@/services/diary';
import { useRouter } from 'next/navigation';
import DiaryWriteModal from '@/components/diary/DiaryWriteModal';
import { CatType } from '@/types/cat';
import Image from 'next/image';

const DiaryDetailPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);

  const {
    data: diaryDetail,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['diaryDetail', id, showWriteModal],
    queryFn: () => getDiaryDetail(id),
    staleTime: 1000 * 60 * 10
  });

  useEffect(() => {
    if (!diaryDetail) return;
  }, [diaryDetail, id]);

  const deleteDidary = () => {
    deleteDiaryMutation.mutate(id);
  };
  const deleteDiaryMutation = useMutation({
    mutationFn: (id: number) => deleteDiaryOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        router.push('/diary');
      } else {
        console.error('일지 삭제 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('일지 삭제 중 오류:', error);
    }
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-screen overflow-y-auto bg-gr-white">
      <Topbar type="two">
        <Topbar.Back onClick={() => router.back()} />
        <Topbar.Title title="날짜 props" />
        <Topbar.More onClick={() => setEditBottomSheet(true)} />
      </Topbar>
      <div className="m-auto max-w-[640px]">
        <section className="flex flex-col gap-4 border-b border-gr-100 px-4 pb-8 pt-12">
          <h5 className="text-end text-body-4 text-gr-500">
            {diaryDetail.memberNickname} • {diaryDetail.caredTime}
          </h5>
          <div className="flex h-[300px]">
            {diaryDetail.images && (
              <Carousel images={diaryDetail.images} style="rounded-16" />
            )}
          </div>
          <h4 className="text-body-3 text-gr-black">{diaryDetail.content}</h4>
          <article className="mb-2 flex items-center justify-start gap-1">
            {diaryDetail.isFeed && (
              <Label.Text
                content="🐟 사료"
                className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
              />
            )}
            {diaryDetail.isGivenWater && (
              <Label.Text
                content="💧 물"
                className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
              />
            )}
          </article>
        </section>
        <section className="px-4 pb-[120px] pt-4">
          <h3 className="py-3 text-heading-5 text-gr-900">
            태그된 고양이
            <span className="pl-1 text-pr-500">
              {diaryDetail.taggedCats.length}
            </span>
          </h3>
          {diaryDetail?.taggedCats?.map((cat: CatType) => (
            <article key={cat.id} className="flex items-center gap-4 py-2">
              <Image
                src={cat.imageUrl}
                alt="cat-image"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div className="flex items-center gap-2">
                <h4 className="text-body-3 text-gr-900">{cat.name}</h4>
                <Image
                  src={`/images/icons/gender-${cat.sex}.svg`}
                  alt="cat-gender"
                  width={16}
                  height={16}
                  className={`rounded-full ${
                    cat.sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
                  }`}
                />
              </div>
            </article>
          ))}
        </section>
      </div>
      <MoreBtnBottomSheet
        type="diary"
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        heightPercent={['50%', '40%']}
        name={diaryDetail.memberNickname}
        memberId={diaryDetail?.memberId}
        onDelete={deleteDidary}
        onEdit={() => setShowWriteModal(true)}
      />

      {showWriteModal && (
        <DiaryWriteModal
          onClose={() => setShowWriteModal(false)}
          id={diaryDetail.id}
          diaryDetail={diaryDetail}
        />
      )}
    </div>
  );
};

export default DiaryDetailPage;
