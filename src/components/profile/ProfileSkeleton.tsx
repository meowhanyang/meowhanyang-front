import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="mx-auto w-full bg-gr-white">
      <div className="relative mx-auto flex flex-col items-center justify-center gap-2 py-4">
        <Skeleton className="h-[72px] w-[72px] rounded-full" />
        <Skeleton className="h-[16px] w-[50px]" />
      </div>
      <div className="flex w-full justify-center border-gr-200 px-4 py-3">
        <div className="flex w-full max-w-[100px] flex-col items-center gap-1 px-4 py-2">
          <Skeleton className="h-[16px] w-[25px]" />
          <Skeleton className="h-[16px] w-[40px]" />
        </div>
        <div className="flex w-full max-w-[100px] flex-col items-center gap-1 px-4 py-2">
          <Skeleton className="h-[16px] w-[25px]" />
          <Skeleton className="h-[16px] w-[40px]" />
        </div>
        <div className="flex w-full max-w-[100px] flex-col items-center gap-1 px-4 py-2">
          <Skeleton className="h-[16px] w-[25px]" />
          <Skeleton className="h-[16px] w-[40px]" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
