import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

const CoParentAlarmSkeleton = () => {
  return (
    <>
      <article className="justicy-center flex flex-col items-center gap-1 pt-14">
        <Skeleton className="h-14 w-14 rounded-full" />
        <Skeleton className="mt-3 h-6 w-[200px] rounded-16" />
        <Skeleton className="h-6 w-[200px] rounded-16" />
      </article>
      <article className="flex flex-col gap-3 py-10">
        <Skeleton className="h-[200px] w-[200px] rounded-16" />
        <Skeleton className="h-24 w-[200px] rounded-16" />
        <Skeleton className="h-10 w-full rounded-16" />
      </article>
    </>
  );
};

export default CoParentAlarmSkeleton;
