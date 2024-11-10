'use client';

import { useState, useEffect } from 'react';
import DiaryCard from '@/components/diary/DiaryCard';
import Filter from '@/components/diary/Filter';
import DiaryListLayout from '@/components/diary/DiaryListLayout';
import DiaryWriteModal from '@/components/diary/DiaryWriteModal';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { DiaryObj } from './diaryType';
import { useDiaries } from '@/hooks/useDiaries';
import { dateToString } from '@/utils/common';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { diaryDateAtom } from '@/atoms/diaryAtom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { catsAtom } from '@/atoms/catsAtom';
import { getCatsOnServer } from '@/services/cat';
import DiaryEmptyState from '@/components/diary/DiaryEmptyState';
import DiarySkeleton from '@/components/diary/DiarySkeleton';
import FilterSkeleton from '@/components/diary/FilterSkeleton';
import Image from 'next/image';
import CatRegisterModal from '@/components/zip/CatRegisterModal';

const DiaryPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [cats, setCats] = useAtom(catsAtom);
  const [diaryDate] = useAtom(diaryDateAtom);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState({} as DiaryObj);
  const [showCatRegisterModal, setShowCatRegisterModal] = useState(false);

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

  const { data: diaryList, isLoading: isDiaryLoading } = useDiaries({
    date: dateToString(diaryDate),
    page: 0,
    size: 10
  });

  useEffect(() => {
    if (showWriteModal) return;
    queryClient.invalidateQueries({ queryKey: ['diaries'] });
  }, [diaryDate, showWriteModal, queryClient]);

  return (
    <>
      <DiaryListLayout>
        <section className="flex justify-start overflow-scroll bg-gr-white">
          {isCatsLoading ? (
            <FilterSkeleton />
          ) : cats?.length === 0 ? (
            <div className="py-3 pl-4 pr-2">
              <div className="flex flex-col items-center justify-center gap-2 bg-gr-white px-0 py-0">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gr-100"
                  onClick={() => setShowCatRegisterModal(true)}
                >
                  <Image
                    src="/images/icons/plus.svg"
                    alt="plus"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="text-body-4">고양이 등록</div>
              </div>
            </div>
          ) : (
            cats?.map((cat: any) => (
              <Filter
                key={cat.id}
                id={cat.id}
                imageUrl={cat.imageUrl}
                isCoParented={cat.isCoparented}
                name={cat.name}
              />
            ))
          )}
        </section>
        <section className="p-4">
          {isDiaryLoading ? (
            <div className="flex flex-col gap-4">
              <DiarySkeleton />
              <DiarySkeleton />
            </div>
          ) : diaryList?.length === 0 ? (
            <DiaryEmptyState />
          ) : (
            diaryList?.map((diary: DiaryObj) => (
              <DiaryCard
                key={diary.id}
                {...diary}
                onClick={() => openDetailModal(diary)}
              />
            ))
          )}
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
