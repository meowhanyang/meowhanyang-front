import { CoParent } from '@/app/zip/catType';
import Image from 'next/image';
import React from 'react';

const ZipDetailCoParents = ({ ...props }: CoParent) => {
  return (
    <div className="flex flex-col items-center gap-2 overflow-scroll p-2">
      <Image
        src={
          props.imageUrl ||
          'https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/can.svg'
        }
        alt={props.nickname}
        width={56}
        height={56}
        className="rounded-full"
      />
      <h3 className="text-body-4 text-gr-black">{props.nickname}</h3>
    </div>
  );
};

export default ZipDetailCoParents;
