import * as React from 'react';

import { cn } from '@/libs/classnames';

export interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, type, label, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-xs" htmlFor="">
          {label}
        </label>
      )}
      <textarea
        rows={3}
        className={cn(
          'flex w-full resize-none rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
