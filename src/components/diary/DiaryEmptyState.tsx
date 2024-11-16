import React from 'react';
import Image from 'next/image';
import EmptyState from '@/components/common/EmptyState';
import { DEFAULT_CAT_IMAGES } from '@/constants/cats';

const DiaryEmptyState = () => {
  return (
    <EmptyState
      title="아직 일지가 없어요"
      body="길냥이와의 추억을 기록해 보세요."
      imageTag={
        <Image
          alt="empty state"
          src={DEFAULT_CAT_IMAGES[1].imageSrc}
          alt="edit"
          width={200}
          height={200}
          className="pb-4"
        />
      }
    />
  );
};

export default DiaryEmptyState;
