import BottomSheet from '@/components/ui/BottomSheet';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { CoParent } from '@/app/zip/catType';
import { useToast } from '@/components/ui/hooks/useToast';

interface CoparentsRequestBottomSheetProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  coParent: CoParent;
  toggleRequestCoParenting: () => void;
}

const REQUEST_CONTENT = {
  title: '공동냥육 요청',
  message: '공동냥육 요청을 보내시겠습니까?',
  btnVariant: 'primary',
  ok: '요청 보내기',
  cancel: '취소'
};
const CANCEL_CONTENT = {
  title: '요청 취소',
  message: '공동냥육 요청을 취소하시겠습니까?',
  btnVariant: 'outline',
  ok: '요청 취소하기',
  cancel: '닫기'
};

const CoParentsRequestBottomSheet = ({
  isVisible,
  setIsVisible,
  coParent,
  toggleRequestCoParenting
}: CoparentsRequestBottomSheetProps) => {
  const { toast } = useToast();

  const [contents, setContents] = useState(REQUEST_CONTENT);

  useEffect(() => {
    if (coParent.isRequested) {
      setContents(CANCEL_CONTENT);
    } else {
      setContents(REQUEST_CONTENT);
    }
  }, [coParent]);

  return (
    <BottomSheet
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      topBar={false}
      heightPercent={['70%', '70%']}
    >
      <div className="flex h-12 items-center justify-center pt-2 text-heading-3 text-gr-900">
        {contents.title}
      </div>
      <div className="flex flex-col items-center px-4 pb-8 pt-3">
        <Image
          src={coParent.imageUrl || 'https://github.com/shadcn.png'}
          alt="send"
          width={48}
          height={48}
          className="rounded-full"
        />
        <p className="py-[10px] text-heading-4 text-gr-900">
          {coParent.nickname}
        </p>
        <p className="text-body-2 text-gr-800">{contents.message}</p>
      </div>

      <div className="flex flex-col gap-1 px-4">
        <Button
          onClick={() => {
            toggleRequestCoParenting(),
              setIsVisible(false),
              toast({
                description: `${coParent.nickname}님께 공동냥육 요청을 보냈습니다.`
              });
          }}
          className="w-full rounded-16 border border-pr-500 bg-pr-500 px-4 py-2"
          disabled={false}
        >
          <Button.Text
            text={contents.ok}
            className="text-btn-1 text-gr-white"
          />
        </Button>
        <Button
          onClick={() => setIsVisible(false)}
          className="w-full rounded-16 bg-gr-white px-4 py-2"
          disabled={false}
        >
          <Button.Text
            text={contents.cancel}
            className="text-btn-1 text-gr-300"
          />
        </Button>
      </div>
    </BottomSheet>
  );
};

export default CoParentsRequestBottomSheet;
