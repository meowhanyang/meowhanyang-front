import Topbar from '@/components/ui/Topbar';
import { useEffect, useState } from 'react';
import { useCats } from '@/hooks/useCats';
import { CatType } from '@/types/cat';
import Image from 'next/image';

interface SearchCatModalProps {
  setSearchCatModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTaggedCatList: React.Dispatch<React.SetStateAction<CatType[]>>;
}

export default function SearchCatModal({
  setSearchCatModal,
  setTaggedCatList
}: SearchCatModalProps) {
  const [catList, setCatList] = useState<CatType[]>([]);
  const { data: cats } = useCats({ page: 0, size: 10 });

  useEffect(() => {
    setCatList(cats);
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
        <Topbar type="two" className="justify-start">
          <Topbar.Back onClick={closeCurrentModal} />
          <Topbar.SearchInput onChange={handleOnChange} />
        </Topbar>
        <ul className="mx-auto flex max-w-[640px] flex-col gap-2 px-4 py-2 pt-12">
          {catList ? (
            <>
              {catList.map((cat: CatType) => (
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
            </>
          ) : (
            <div>고양이가 없습니다.</div>
          )}
        </ul>
      </div>
    </article>
  );
}
