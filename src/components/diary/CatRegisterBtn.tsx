import Button from '@/components/ui/Button';
import Image from 'next/image';

interface CatRegisterBtnType {
  onClick: () => void;
}

const CatRegisterBtn = ({ onClick }: CatRegisterBtnType) => {
  return (
    <div className="flex w-fit flex-col items-center justify-center gap-2 px-2 py-3">
      <Button
        onClick={onClick}
        className="relative flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-gr-white bg-gr-100"
      >
        <Button.Icon alt="right">
          <Image
            src="/images/icons/plus.svg"
            alt="plus"
            width={24}
            height={24}
            className="h-6 w-6 rounded-[20px]"
          />
        </Button.Icon>
      </Button>
      <p className="text-body-4">고양이 등록</p>
    </div>
  );
};

export default CatRegisterBtn;
