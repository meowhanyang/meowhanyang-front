import React from 'react';
import Image from 'next/image';
import { DEFAULT_CAT_IMAGES } from '@/constants/cats';

const DiaryEmptyState = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[6px] px-4 py-6">
        <Image
          src={DEFAULT_CAT_IMAGES[1].imageSrc}
          alt="edit"
          width={200}
          height={200}
        />
        <h3 className="text-lg font-medium text-gray-700">
          아직 일지가 없어요
        </h3>
        <p className="text-sm text-gray-500">
          길냥이와의 추억을 기록해 보세요.
        </p>
      </div>
    </section>
  );
};

export default DiaryEmptyState;
