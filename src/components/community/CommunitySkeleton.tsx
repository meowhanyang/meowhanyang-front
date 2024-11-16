import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';

const CommunitySkeleton = () => {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col bg-gr-white">
      {[1, 2, 3].map(item => (
        <div key={item} className="flex flex-col gap-3 border-b p-4">
          {/* 프로필 영역 */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-[16px] w-[80px]" />
              <Skeleton className="h-[14px] w-[60px]" />
            </div>
          </div>

          {/* 본문 텍스트 영역 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[16px] w-full" />
            <Skeleton className="h-[16px] w-[90%]" />
            <Skeleton className="h-[16px] w-[50%]" />
          </div>

          {/* 이미지 영역 */}
          <Skeleton className="h-[240px] w-full rounded-lg" />

          {/* 하단 액션 버튼 영역 */}
          <div className="flex justify-between gap-4">
            <div className="flex gap-1">
              <Skeleton className="h-6 w-6 rounded-[4px]" />
              <Skeleton className="h-6 w-6 rounded-[4px]" />
            </div>
            <Skeleton className="h-6 w-6 rounded-[4px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunitySkeleton;
