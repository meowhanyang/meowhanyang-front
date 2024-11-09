import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import Image from 'next/image';

interface LabelProps {
  content?: string;
  src?: string;
}

const labelTypeVariants = {
  text: 'rounded-md',
  icon: 'flex items-center rounded-full',
  default: 'flex items-center rounded-md py-[2px] pr-1 pl-[2px]'
};

const Label = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <>{children}</>;
};

const Text = ({ content, className }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div className={cn(labelTypeVariants['text'], className)}>
      <p className="text-btn-3">{content}</p>
    </div>
  );
};

const Icon = ({
  src,
  className
}: LabelProps & HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div className={cn(labelTypeVariants['icon'], className)}>
      {src && (
        <Image
          src={src}
          alt="right"
          width={16}
          height={16}
          className="h-4 w-4"
        />
      )}
    </div>
  );
};

export default Object.assign(Label, { Text, Icon });
