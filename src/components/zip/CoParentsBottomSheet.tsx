import BottomSheet from '@/components/ui/BottomSheet';
import React from 'react';
import Image from 'next/image';
import { CoParent } from '@/app/zip/catType';

interface CoParentsBottomSheetProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  coParents: CoParent[];
}

const CoParentsBottomSheet = ({
  isVisible,
  setIsVisible,
  coParents
}: CoParentsBottomSheetProps) => {
  return (
    <BottomSheet
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      topBar={true}
      heightPercent={['80%', '100%']}
    >
      <div className="flex h-12 items-center justify-center text-heading-3 text-gr-900">
        공동집사
      </div>
      <ul className="px-4">
        {coParents?.map((coParent: CoParent) => (
          <li
            key={coParent.memberId}
            className="flex items-center justify-start gap-4 py-2"
          >
            <Image
              src={coParent.imageUrl}
              alt="zip-card"
              width={48}
              height={48}
              className="rounded-full"
            />
            <p>{coParent.nickname}</p>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
};

export default CoParentsBottomSheet;
