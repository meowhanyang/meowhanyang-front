import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import React from 'react';
import Image from 'next/image';

interface CoParentAcceptBottomSheetProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const CoParentAcceptBottomSheet = ({
  isVisible,
  setIsVisible
}: CoParentAcceptBottomSheetProps) => {
  return (
    <BottomSheet
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      heightPercent={['50%', '100%']}
      overflow="overflow-visible"
    >
      <section className="-mt-[40px] flex justify-center">
        <Image
          src="https://d2jzc2rxltjw7u.cloudfront.net/images/DIARY/3a424060-b8c7-4d28-946b-81705b73485f-image.jpg"
          width={120}
          height={120}
          alt="cat"
        />
      </section>
      <section className="justfy-center flex flex-col items-center">
        <div className="flex h-12 items-center justify-center text-heading-3 text-gr-900">
          오늘부터 공동집사!
        </div>
        <div className="px-4 pb-6 pt-3 text-body-2 text-gr-800">
          <p>모음집에 고양이가 추가되고</p>
          <p>태그하여 일지를 작성할 수 있어요.</p>
        </div>
      </section>
      <section className="px-4">
        <Button
          onClick={() => setIsVisible(false)}
          className="w-full rounded-16 bg-pr-500 py-2"
        >
          <Button.Text
            text="공동냥육 시작하기"
            className="text-btn-1 text-gr-white"
          />
        </Button>
      </section>
    </BottomSheet>
  );
};

export default CoParentAcceptBottomSheet;