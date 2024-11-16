import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';

const ProfileFeedSkeleton = () => {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col bg-gr-white">
      {[1, 2, 3].map(item => (
        <div key={item} className="flex flex-col gap-4 border-b p-4">
          {/* 시간 영역 */}
          <Skeleton className="h-4 w-[60px]" />

          {/* 본문 텍스트 영역 */}
          <div className="flex flex-col gap-[6px]">
            <Skeleton className="h-[16px] w-full" />
            <Skeleton className="h-[16px] w-[80%]" />
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

export default ProfileFeedSkeleton;
