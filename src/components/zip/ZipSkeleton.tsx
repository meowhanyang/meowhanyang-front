import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';

const SKELETON_ITEMS = Array.from({ length: 6 });
const ZipSkeleton = () => {
  return (
    <>
      {SKELETON_ITEMS.map((_, index) => (
        <div key={index}>
          <Skeleton className="h-[164px] w-full rounded-lg rounded-b-none bg-gr-100" />
          <div className="flex flex-col gap-2 rounded-b-lg bg-gr-white p-4">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-[100px] rounded-[4px] bg-gr-100" />
              <Skeleton className="h-4 w-4 rounded-full bg-gr-100" />
            </div>
            <Skeleton className="h-4 w-[60px] rounded-[4px] bg-gr-100" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ZipSkeleton;
