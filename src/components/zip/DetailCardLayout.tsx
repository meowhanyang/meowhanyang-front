import Button from '@/components/ui/Button';
import React from 'react';

interface DetailCardLayoutProps {
  titleObj: {
    title: string;
    onClick?: () => void;
  };
  btnObj: {
    text: string;
    onClick: () => void;
  };
  children: React.ReactNode;
}

const DetailCardLayout = ({
  titleObj,
  btnObj,
  children
}: DetailCardLayoutProps) => {
  return (
    <section className="rounded-16 bg-gr-white">
      <h1
        className="px-5 pb-2 pt-5 text-heading-4 text-gr-900"
        onClick={() => titleObj.onClick && titleObj.onClick()}
      >
        {titleObj.title}
      </h1>
      <div className="px-5">{children}</div>
      <div className="mx-auto px-5 pb-6 pt-4">
        <Button
          onClick={() => btnObj.onClick()}
          className="h-12 w-full rounded-lg bg-gr-50 px-4 py-2"
        >
          <Button.Text text={btnObj.text} className="text-btn-2 text-gr-600" />
          <Button.Icon icon="/images/icons/right.svg" alt="right" />
        </Button>
      </div>
    </section>
  );
};

export default DetailCardLayout;
