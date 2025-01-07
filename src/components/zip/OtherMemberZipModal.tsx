import { CatListObj } from '@/app/zip/catType';
import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import ZipCard from '@/components/zip/ZipCard';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCatsOnServer } from '@/services/cat';

interface OtherMemberZipModalProps {
  onClose: () => void;
  memberId: number;
  memberName: string;
}

const OtherMemberZipModal: React.FC<OtherMemberZipModalProps> = ({
  onClose,
  memberId,
  memberName
}) => {
  const router = useRouter();
  const { ref, inView } = useInView();

  const { data: catList, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getCats', memberId],
    queryFn: ({ pageParam = 1 }) =>
      getCatsOnServer({
        page: pageParam,
        size: 10,
        memberId
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const openDetailModal = (item: CatListObj) => {
    router.push(`/zip/${item.id}`);
  };

  return (
    <div className="fixed left-0 top-0 z-[50] h-screen w-full overflow-y-auto bg-gr-50">
      <Topbar type="three">
        <Topbar.Back onClick={onClose} />
        <Topbar.Title title={`${memberName} 모음집`} />
        <Topbar.Empty />
      </Topbar>
      <section className="pb-30 h-screen bg-gr-50 px-4 pt-16">
        <div className="grid grid-cols-2 gap-4 pb-28">
          {catList?.pages?.map(page =>
            page?.items?.map((cat: CatListObj) => (
              <ZipCard
                key={cat.id}
                {...cat}
                onClick={() => openDetailModal(cat)}
              />
            ))
          )}
          {/* 무한 스크롤 감지 영역 */}
          <div ref={ref} className="h-20 bg-transparent" />
        </div>
      </section>
    </div>
  );
};

export default OtherMemberZipModal;
