import * as React from 'react';

import { cn } from '@/libs/classnames';
import { Search } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBox = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        'flex items-center px-5 h-11 w-full rounded-md border border-input bg-background placeholder:font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholder focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        className,
      )}
    >
      <input
        type={type}
        className={cn(
          'h-full w-full py-2 outline-none text-base focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        )}
        ref={ref}
        {...props}
      />

      <Search className="text-placeholder" />
    </div>
  );
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;
