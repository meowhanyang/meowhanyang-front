'use client';

import { useState, useEffect } from 'react';
import DiaryCard from '@/components/diary/DiaryCard';
import Filter from '@/components/diary/Filter';
import DiaryListLayout from '@/components/diary/DiaryListLayout';
import DiaryWriteModal from '@/components/diary/DiaryWriteModal';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { DiaryObj } from './diaryType';
import { dateToString } from '@/utils/common';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { diaryDateAtom } from '@/atoms/diaryAtom';
import {
  useQueryClient,
  useInfiniteQuery,
  useQuery,
  useMutation
} from '@tanstack/react-query';
import { getCatsOnServer } from '@/services/cat';
import DiaryEmptyState from '@/components/diary/DiaryEmptyState';
import DiarySkeleton from '@/components/diary/DiarySkeleton';
import FilterSkeleton from '@/components/diary/FilterSkeleton';
import CatRegisterModal from '@/components/zip/CatRegisterModal';
import CatRegisterBtn from '@/components/diary/CatRegisterBtn';
import { useInView } from 'react-intersection-observer';
import { getDiaries } from '@/services/diary';
import {
  getPushNotification,
  togglePushNotificationOnServer
} from '@/services/push-notification';
import Modal from '@/components/ui/Modal';

const DiaryPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { ref: catsRef, inView: catsInView } = useInView();
  const { ref: diaryRef, inView: diaryInView } = useInView();

  const [diaryDate] = useAtom(diaryDateAtom);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState({} as DiaryObj);
  const [showCatRegisterModal, setShowCatRegisterModal] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [openFirstRunModal, setOpenFirstRunModal] = useState(false);

  const handleCatSelect = (id: number) => {
    setSelectedCatId(id === selectedCatId ? null : id);
  };

  const openDetailModal = (item: DiaryObj) => {
    setSelectedModal(item);
    router.push(`/diary/${item.id}`);
  };

  const {
    data: catData,
    isLoading: isCatsLoading,
    fetchNextPage: fetchNextPageCats
  } = useInfiniteQuery({
    queryKey: ['getCats'],
    queryFn: ({ pageParam = 1 }) =>
      getCatsOnServer({
        page: pageParam,
        size: 10
      }),
    getNextPageParam: (_, allPages) => allPages?.length + 1,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5
  });
  useEffect(() => {
    if (catsInView) {
      fetchNextPageCats();
    }
  }, [catsInView, fetchNextPageCats]);

  const {
    data: diaryList,
    isLoading: isDiaryLoading,
    fetchNextPage: fetchNextPageDiary
  } = useInfiniteQuery({
    queryKey: ['diaries', dateToString(diaryDate)],
    queryFn: ({ pageParam = 1 }) =>
      getDiaries({
        date: dateToString(diaryDate),
        page: pageParam,
        size: 10
      }),
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5
  });

  const { data: pushNotofication, isSuccess } = useQuery({
    queryKey: ['getPushNoti'],
    queryFn: () => getPushNotification(),
    staleTime: 1000 * 60 * 10
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenFirstRunModal(
        pushNotofication.receivePushNotification ? false : true
      );
    }
  }, [pushNotofication]);

  const togglePushNotification = useMutation({
    mutationFn: () => togglePushNotificationOnServer(),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        console.error('data.status:', data.status);
      } else {
        // queryClient.invalidateQueries({ queryKey: ['getPushNoti'] });
      }
    }
  });
  const allowNotify = () => {
    console.log('알림 허용 api');
    setOpenFirstRunModal(false);
    togglePushNotification.mutate();
  };
  const disallowNotify = () => {
    console.log('알림 허용 안함 api');
    setOpenFirstRunModal(false);
    togglePushNotification.mutate();
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
        <DiaryListLayout>
          <section className="flex h-28 justify-start overflow-scroll bg-gr-white px-2">
            {isCatsLoading ? (
              <FilterSkeleton />
            ) : catData?.pages[0]?.length === 0 ? (
              <CatRegisterBtn onClick={() => setShowCatRegisterModal(true)} />
            ) : (
              <>
                {catData?.pages.map(page =>
                  page?.map((cat: any) => (
                    <Filter
                      key={cat.id}
                      id={cat.id}
                      imageUrl={cat.imageUrl}
                      name={cat.name}
                      isSelected={selectedCatId === cat.id}
                      onClick={() => handleCatSelect(cat.id)}
                      coParentedCount={cat.coParentedCount}
                    />
                  ))
                )}
                <CatRegisterBtn onClick={() => setShowCatRegisterModal(true)} />
              </>
            )}
          </section>
          <section className="mx-auto max-w-[640px] p-4">
            {isDiaryLoading ? (
              <div className="flex flex-col gap-4">
                <DiarySkeleton />
              </div>
            ) : diaryList?.pages[0]?.length === 0 ? (
              <DiaryEmptyState />
            ) : (
              diaryList?.pages.map(page =>
                page?.map((diary: DiaryObj) => (
                  <DiaryCard
                    key={diary.id}
                    {...diary}
                    onClick={() => openDetailModal(diary)}
                  />
                ))
              )
            )}
            {/* 무한 스크롤 감지 영역 */}
            <div ref={diaryRef} className="h-20 bg-transparent" />
          </section>
        </DiaryListLayout>
      )}
      <FloatingActionButton onClick={() => setShowWriteModal(true)} />
      {showWriteModal && (
        <DiaryWriteModal
          onClose={() => setShowWriteModal(false)}
          id={selectedModal.id}
        />
      )}
      {showCatRegisterModal && (
        <CatRegisterModal
          onClose={() => setShowCatRegisterModal(false)}
          id={selectedModal?.id ?? 0}
        />
      )}
    </>
  );
};

export default DiaryPage;
