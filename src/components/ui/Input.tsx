import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import HelperText from './HelperText';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  variant?: 'default' | 'outlined' | 'filled' | 'search' | 'comment';
  inputSize?: 'small' | 'medium' | 'large';
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  onClear?: () => void;
  error?: boolean;
  helperText?: string;
  loading?: boolean;
  mask?: string;
  formatter?: (value: string) => string;
  parser?: (value: string) => any;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  autocomplete?: string;
  placeholder?: string;
  suffixClickHandler?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // validator: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      iconStart,
      iconEnd,
      onClear,
      disabled,
      // validator,
      error,
      helperText,
      loading,
      mask,
      formatter,
      parser,
      prefix,
      suffix,
      autocomplete,
      placeholder,
      type = 'text',
      suffixClickHandler,
      ...props
    },
    ref
  ) => {
    const [isInputActive, setInputActive] = useState(!disabled);

    const enableInput = (e: React.MouseEvent) => {
      setInputActive(true);
    };

    const sizeClass = inputSize ? `input-${inputSize}` : '';
    const inputClassName = cn(
      'common-input flex h-12 font-normal w-full rounded-md border px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gr-50 disabled:font-regular focus:border-2 focus:border-pr-500',
      {
        'border-input bg-background': variant !== 'outlined',
        'bg-gr-50 border-none focus:border-none max-h-[60px]':
          variant === 'comment',
        'border-none focus:border-none': variant === 'search',
        'border-2 focus:border-sm-error-500': error,
        'pr-12': suffix
      },
      sizeClass,
      className
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (formatter) {
        value = formatter(value);
      }
      if (parser) {
        value = parser(value);
      }
      props.onChange?.(e);
    };

    return (
      <div className={`relative ${variant === 'comment' && 'w-full'}`}>
        {prefix && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {prefix}
          </span>
        )}
        <input
          disabled={!isInputActive}
          type={type}
          className={inputClassName}
          ref={ref}
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete={autocomplete}
          {...props}
        />
        {!isInputActive && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              cursor: 'pointer'
            }}
            onClick={enableInput}
          />
        )}
        {suffix && (
          <span
            onClick={suffixClickHandler}
            className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
              variant === 'comment' &&
              !isInputActive &&
              'font-semi-bold text-gr-300'
            } ${variant === 'comment' && isInputActive && 'text-pr-500'} `}
          >
            {suffix}
          </span>
        )}
        {iconStart && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {iconStart}
          </span>
        )}
        {iconEnd && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {iconEnd}
          </span>
        )}
        {loading && <span>Loading...</span>}
        {helperText && <HelperText text={helperText} isError={error} />}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
