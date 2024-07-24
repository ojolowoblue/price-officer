import { cn } from '@/lib/classnames';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  variant?: 'primary' | 'outline';
}

export default function Button(props: Props) {
  const { fullWidth, children, className, variant } = props;

  return (
    <button
      className={cn(
        'h-12 px-6 bg-primary text-white text-base rounded-lg',
        { 'bg-background border text-foreground border-border': variant === 'outline' },
        { 'w-full': fullWidth },
        className,
      )}
    >
      {children}
    </button>
  );
}
