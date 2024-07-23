import * as React from 'react';

import { cn } from '@/lib/classnames';
import Label from './Label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, ...props }, ref) => {
  return (
    <div>
      {label && <Label className="mb-2.5">{label}</Label>}

      <div className="flex items-center px-5 h-11 w-full rounded-md border border-input bg-background placeholder:font-normal text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholder focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type={type}
          className={cn(
            'h-full w-full bg-transparent py-2 outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
