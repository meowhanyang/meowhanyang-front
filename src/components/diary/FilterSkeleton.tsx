import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';

const SKELETON_ITEMS = Array.from({ length: 5 });
const FilterSkeleton = () => {
  return (
    <>
      {SKELETON_ITEMS.map((_, index) => (
        <div
          key={index}
          className={`py-3 ${index === 0 ? 'pl-4 pr-2' : 'px-2'}`}
        >
          <div className="flex flex-col items-center justify-center gap-2 bg-gr-white px-0 py-0">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-gr-100 bg-gr-white">
              <Skeleton className="h-14 w-14 rounded-[20px] border border-gr-50" />
            </div>
            <Skeleton className="h-4 w-full rounded-sm border-gr-50" />
          </div>
        </div>
      ))}
    </>
  );
};

export default FilterSkeleton;
