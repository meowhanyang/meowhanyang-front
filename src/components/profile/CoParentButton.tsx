import React from 'react';
import Button from '@/components/ui/Button';
import RightIcon from '../../../public/images/icons/right.svg';

interface CoParentButtonProps {
  onClick: () => void;
}

const CoParentButton = ({ onClick }: CoParentButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="h-9 w-full rounded-md bg-gr-white px-4 py-2"
      disabled={false}
    >
      <Button.Text text="요청메시지 보기" className="text-btn-3 text-pr-500" />
      <Button.Icon alt="right">
        <RightIcon width={16} height={16} stroke="var(--pr-500)" />
      </Button.Icon>
    </Button>
  );
};

export default CoParentButton;
