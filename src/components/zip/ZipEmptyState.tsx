import React from 'react';
import Image from 'next/image';
import EmptyState from '@/components/common/EmptyState';

const ZipEmptyState = () => {
  return (
    <EmptyState
      title="등록된 고양이가 없어요"
      body="길냥이와의 추억을 기록해 보세요."
      imageTag={
        <Image
          src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/setting.svg"
          alt="empty state"
          width={200}
          height={200}
          className="pb-4"
        />
      }
    />
  );
};

export default ZipEmptyState;
