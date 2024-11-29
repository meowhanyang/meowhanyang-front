import React from 'react';
import Button from '@/components/ui/Button';
import RightIcon from '../../../public/images/icons/right.svg';

interface CoParentButtonProps {
  onClick: () => void;
  isRead: boolean;
}

const CoParentButton = ({ onClick, isRead }: CoParentButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`h-9 w-full rounded-md px-4 py-2 ${isRead ? 'bg-gr-50' : 'bg-gr-white'}`}
      disabled={false}
    >
      <Button.Text
        text="요청메시지 보기"
        className={`text-btn-3 ${isRead ? 'text-gr-600' : 'text-pr-500'}`}
      />
      <Button.Icon alt="right">
        <RightIcon
          width={16}
          height={16}
          stroke={`${isRead ? 'var(--gr-600)' : 'var(--pr-500)'}`}
        />
      </Button.Icon>
    </Button>
  );
};

export default CoParentButton;
