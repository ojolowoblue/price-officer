import * as React from 'react';
import { cn } from '@/libs/classnames';
import Label from './Label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  onValueChange?: (value: number) => void; // Add this to expose the number value
}

const formatToCurrency = (value: string): string => {
  if (!value) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0);
};

const parseCurrencyValue = (formattedValue: string): number => {
  return parseFloat(formattedValue.replace(/[^0-9.-]+/g, '')) || 0;
};

const AmountInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, errorMessage, onValueChange, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formattedValue = formatToCurrency(rawValue);
      setInputValue(formattedValue);

      if (onValueChange) {
        onValueChange(parseCurrencyValue(formattedValue));
      }
    };

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
            value={inputValue}
            onChange={handleChange}
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

AmountInput.displayName = 'AmountInput';

export default AmountInput;
