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
  useQuery,
  useInfiniteQuery
} from '@tanstack/react-query';
import { catsAtom } from '@/atoms/catsAtom';
import { getCatsOnServer } from '@/services/cat';
import DiaryEmptyState from '@/components/diary/DiaryEmptyState';
import DiarySkeleton from '@/components/diary/DiarySkeleton';
import FilterSkeleton from '@/components/diary/FilterSkeleton';
import CatRegisterModal from '@/components/zip/CatRegisterModal';
import CatRegisterBtn from '@/components/diary/CatRegisterBtn';
import { useInView } from 'react-intersection-observer';
import { getDiaries } from '@/services/diary';

const DiaryPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  const [cats, setCats] = useAtom(catsAtom);
  const [diaryDate] = useAtom(diaryDateAtom);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState({} as DiaryObj);
  const [showCatRegisterModal, setShowCatRegisterModal] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

  const handleCatSelect = (id: number) => {
    setSelectedCatId(id === selectedCatId ? null : id);
  };

  const openDetailModal = (item: DiaryObj) => {
    setSelectedModal(item);
    router.push(`/diary/${item.id}`);
  };

  const { data: catData, isLoading: isCatsLoading } = useQuery({
    queryKey: ['getCats'],
    queryFn: () => getCatsOnServer({ page: 0, size: 10 }),
    staleTime: 1000 * 60 * 10
  });
  useEffect(() => {
    if (catData) {
      setCats(catData);
    }
  }, [catData, setCats]);

  const {
    data: diaryList,
    isLoading: isDiaryLoading,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: ({ pageParam = 1 }) =>
      getDiaries({
        date: dateToString(diaryDate),
        page: pageParam,
        size: 10
      }),
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    if (showWriteModal) return;
    queryClient.invalidateQueries({ queryKey: ['diaries'] });
  }, [diaryDate, showWriteModal, queryClient]);

  return (
    <>
      <DiaryListLayout>
        <section className="flex h-28 justify-start overflow-scroll bg-gr-white px-2">
          {isCatsLoading ? (
            <FilterSkeleton />
          ) : cats?.length === 0 ? (
            <CatRegisterBtn onClick={() => setShowCatRegisterModal(true)} />
          ) : (
            <>
              {cats?.map((cat: any) => (
                <Filter
                  key={cat.id}
                  id={cat.id}
                  imageUrl={cat.imageUrl}
                  name={cat.name}
                  isSelected={selectedCatId === cat.id}
                  onClick={() => handleCatSelect(cat.id)}
                  coParentedCount={cat.coParentedCount}
                />
              ))}
              <CatRegisterBtn onClick={() => setShowCatRegisterModal(true)} />
            </>
          )}
        </section>
        <section className="mx-auto max-w-[640px] p-4">
          {isDiaryLoading ? (
            <div className="flex flex-col gap-4">
              <DiarySkeleton />
            </div>
          ) : diaryList?.pages.length === 0 ? (
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
          <div ref={ref} className="h-20 bg-transparent" />
        </section>
      </DiaryListLayout>

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
