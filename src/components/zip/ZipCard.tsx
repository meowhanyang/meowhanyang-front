'use client';

import { CatListObj } from '@/app/zip/catType';
import Label from '@/components/ui/Label';
import React from 'react';
import Image from 'next/image';

interface ZipCardProps extends CatListObj {
  onClick: () => void;
}

const ZipCard = ({
  imageUrl,
  name,
  isCoParented,
  coParentedCount,
  dDay,
  sex,
  isNeutered,
  onClick
}: ZipCardProps) => {
  return (
    <div className="relative" onClick={onClick}>
      <div className="absolute right-0 top-0 flex items-center gap-1 p-[5px]">
        {isNeutered && (
          <Label.Text
            className="bg-gr-transparent-white p-1 text-gr-800"
            content="TNR"
          />
        )}
        {isCoParented && (
          <div className="flex items-center rounded-md bg-gr-transparent-black py-[2px] pl-[2px] pr-1 text-gr-white">
            <Label.Icon src="/images/icons/share.svg" />
            <Label.Text content={coParentedCount.toString()} className="" />
          </div>
        )}
      </div>
      <Image
        src={imageUrl}
        alt="cat-image"
        layout="responsive"
        width={100}
        height={100}
        className="max-h-[360px] rounded-t-lg object-cover"
      />
      <div className="rounded-b-lg bg-gr-white px-4 pb-4 pt-3">
        <div className="flex gap-1 pb-[6px]">
          <p className="text-heading-5 text-gr-900">{name}</p>
          <div className="rounded-full bg-[#FFF2F1]">
            <Image
              src={`/images/icons/gender-${sex}.svg`}
              alt="cat-gender"
              width={16}
              height={16}
              className={`rounded-full ${
                sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
              }`}
            />
          </div>
        </div>
        <p className="text-btn-3 text-gr-600">만난지 {dDay}일</p>
      </div>
    </div>
  );
};

export default ZipCard;
