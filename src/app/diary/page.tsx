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
import { togglePushNotificationOnServer } from '@/services/push-notification';
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
    queryKey: ['diaries', dateToString(diaryDate), selectedCatId],
    queryFn: ({ pageParam = 1 }) => {
      const params: {
        date: string;
        page: number;
        size: number;
        'cat-id'?: number;
      } = {
        date: dateToString(diaryDate),
        page: pageParam,
        size: 10
      };
      if (selectedCatId) {
        params['cat-id'] = selectedCatId;
      }
      return getDiaries(params);
    },
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5
  });
  useEffect(() => {
    if (diaryInView) {
      fetchNextPageDiary();
    }
  }, [diaryInView, fetchNextPageDiary]);
  useEffect(() => {
    if (showWriteModal) return;
    queryClient.invalidateQueries({ queryKey: ['diaries'] });
  }, [diaryDate, showWriteModal, queryClient]);

  useEffect(() => {
    const isFirstRun = localStorage.getItem('firstRun') ? true : false;
    if (isFirstRun) {
      setOpenFirstRunModal(isFirstRun);
      localStorage.removeItem('firstRun');
    }
  }, []);

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
    setOpenFirstRunModal(false);
    togglePushNotification.mutate();
  };
  const disallowNotify = () => {
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
                {/* 무한 스크롤 감지 영역 */}
                <div ref={catsRef} className="h-20 bg-transparent" />
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
