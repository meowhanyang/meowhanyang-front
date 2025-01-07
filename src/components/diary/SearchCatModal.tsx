import Topbar from '@/components/ui/Topbar';
import { useEffect, useState } from 'react';
import { CatType } from '@/types/cat';
import Image from 'next/image';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCatsOnServer } from '@/services/cat';
import { useInView } from 'react-intersection-observer';

interface SearchCatModalProps {
  setSearchCatModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTaggedCatList: React.Dispatch<React.SetStateAction<CatType[]>>;
}

export default function SearchCatModal({
  setSearchCatModal,
  setTaggedCatList
}: SearchCatModalProps) {
  const { ref, inView } = useInView();

  const [catList, setCatList] = useState<CatType[]>([]);

  const { data: cats, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getCats'],
    queryFn: ({ pageParam = 1 }) =>
      getCatsOnServer({
        page: pageParam,
        size: 10
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
  useEffect(() => {
    const catsData = cats?.pages?.map(page => page.items).flat();
    setCatList(catsData ?? []);
  }, [cats]);

  const closeCurrentModal = () => setSearchCatModal(false);

  const selectCat = (cat: CatType) => {
    setTaggedCatList(prev => {
      if (prev.some(prevCat => prevCat.id === cat.id)) {
        return prev;
      } else {
        return [...prev, cat];
      }
    });
    closeCurrentModal();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm !== '') {
      const filteredAndSortedCats = catList
        .filter((cat: CatType) => cat.name.toLowerCase().includes(searchTerm))
        .concat(
          catList.filter(
            (cat: CatType) => !cat.name.toLowerCase().includes(searchTerm)
          )
        );
      setCatList(filteredAndSortedCats);
    } else {
      setCatList(catList);
    }
  };

  return (
    <article className="w-screen bg-gr-white">
      <div className="fixed left-0 top-0 z-[50] h-screen w-full overflow-y-auto bg-gr-white">
        <Topbar type="search" className="justify-start">
          <Topbar.Back onClick={closeCurrentModal} />
          <Topbar.SearchInput onChange={handleOnChange} />
        </Topbar>
        <ul className="mx-auto flex max-w-[640px] flex-col gap-2 px-4 py-2 pt-12">
          {catList ? (
            <>
              {catList?.map((cat: CatType) => (
                <li
                  key={cat.id}
                  className="flex items-center gap-4 py-2"
                  onClick={() => selectCat(cat)}
                >
                  <Image
                    src={cat.imageUrl}
                    alt="cat-image"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex gap-2">
                    <h5 className="text-body-2 text-gr-900">{cat.name}</h5>
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
                </li>
              ))}
              {/* 무한 스크롤 감지 영역 */}
              <div ref={ref} className="h-20 bg-transparent" />
            </>
          ) : (
            <div>고양이가 없습니다.</div>
          )}
        </ul>
      </div>
    </article>
  );
}
