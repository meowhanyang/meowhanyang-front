import { Slot } from '@radix-ui/react-slot';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface IconProps {
  icon?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  children?: React.ReactNode;
}

const Icon = ({
  icon,
  alt,
  width = 24,
  height = 24,
  className,
  children
}: IconProps) => (
  <>
    {icon ? (
      <Image
        src={icon}
        alt={alt}
        width={width}
        height={height}
        className={clsx(className)}
      />
    ) : (
      children
    )}
  </>
);

interface TextProps {
  text: string;
  className?: string;
}

const Text = ({ text, className }: TextProps) => (
  <span className={clsx(className)}>{text}</span>
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isActive?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, onClick, asChild = false, isActive, children, ...props },
    ref
  ) => {
    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (onClick) onClick(event);
    };

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={clsx(className, 'flex items-center justify-center')}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export default Object.assign(Button, {
  Icon,
  Text
});
