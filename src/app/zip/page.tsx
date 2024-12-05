'use client';

import { CatListObj } from '@/app/zip/catType';
import ZipCard from '@/components/zip/ZipCard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import CatRegisterModal from '@/components/zip/CatRegisterModal';
import ZipSkeleton from '@/components/zip/ZipSkeleton';
import ZipEmptyState from '@/components/zip/ZipEmptyState';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCatsOnServer } from '@/services/cat';

const ZipPage = () => {
  const router = useRouter();
  const { ref, inView } = useInView();

  const [selectedModal, setSelectedModal] = useState({} as CatListObj);
  const [showWriteModal, setShowWriteModal] = useState(false);

  const {
    data: catList,
    isLoading,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['getCats'],
    queryFn: ({ pageParam = 1 }) =>
      getCatsOnServer({
        page: pageParam,
        size: 10
      }),
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const openDetailModal = (item: CatListObj) => {
    setSelectedModal(item);
    router.push(`/zip/${item.id}`);
  };

  return (
    <>
      <h1 className="flex h-12 w-full items-center bg-gr-white px-4 text-heading-3 text-gr-900">
        모음집
      </h1>
      <div className="bg-gr-50">
        <section className="mx-auto max-w-[640px] p-4 px-4 pb-28">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              <ZipSkeleton />
            </div>
          ) : catList?.pages.length === 0 ? (
            <ZipEmptyState />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {catList?.pages.map(page =>
                page.map((cat: CatListObj) => (
                  <ZipCard
                    key={cat.id}
                    {...cat}
                    onClick={() => openDetailModal(cat)}
                  />
                ))
              )}
            </div>
          )}
          {/* 무한 스크롤 감지 영역 */}
          <div ref={ref} className="h-20 bg-transparent" />

          <FloatingActionButton onClick={() => setShowWriteModal(true)} />
          {showWriteModal && (
            <CatRegisterModal
              onClose={() => setShowWriteModal(false)}
              id={selectedModal?.id ?? 0}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default ZipPage;
