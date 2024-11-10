import React from 'react';
import Image from 'next/image';

const ZipEmptyState = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[6px] px-4 py-6">
        <Image
          src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/setting.svg"
          alt="edit"
          width={200}
          height={200}
        />
        <h3 className="text-lg font-medium text-gray-700">
          등록된 고양이가 없어요
        </h3>
        <p className="text-sm text-gray-500">
          길냥이와의 추억을 기록해 보세요.
        </p>
      </div>
    </section>
  );
};

export default ZipEmptyState;
