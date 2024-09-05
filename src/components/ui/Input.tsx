import * as React from 'react';

import { cn } from '@/libs/classnames';
import Label from './Label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, errorMessage, ...props }, ref) => {
    return (
      <div>
        {label && <Label className="mb-2.5">{label}</Label>}

        <div
          className={cn(
            'flex items-center px-5 h-11 w-full rounded-md border border-input bg-background placeholder:font-normal text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholder focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            {
              'focus:ring-destructive focus-within:ring-destructive focus:border-destructive border-destructive outline-none':
                error,
            },
            className,
          )}
        >
          <input
            type={type}
            className={cn(
              'h-full w-full bg-transparent py-2 outline-none text-base focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            )}
            ref={ref}
            {...props}
          />
        </div>

        {errorMessage && <p className="mt-2.5 text-destructive text-sm font-medium">{errorMessage}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
