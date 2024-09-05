import { cn } from '@/libs/classnames';
import { ButtonHTMLAttributes } from 'react';

import Spinner from '@/assets/icons/loader.svg?react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  variant?: 'primary' | 'outline';
  loading?: boolean;
}

export default function Button(props: Props) {
  const { fullWidth, children, className, variant, loading, disabled, ...rest } = props;

  return (
    <button
      className={cn(
        'h-12 px-6 bg-primary text-white text-base rounded-lg flex items-center justify-center',
        { 'bg-background border text-foreground border-border': variant === 'outline' },
        { 'w-full': fullWidth },
        { 'bg-gray-500 cursor-not-allowed': disabled },
        className,
      )}
      {...rest}
    >
      {loading ? <span> {<Spinner width={14} height={14} className="animate-spin text-white" />}</span> : children}
    </button>
  );
}
