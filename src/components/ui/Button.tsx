import { cn } from '@/lib/classnames';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export default function Button(props: Props) {
  const { fullWidth, children, className } = props;

  return (
    <button className={cn('h-12 px-6 bg-primary text-white text-base rounded-lg', { 'w-full': fullWidth }, className)}>
      {children}
    </button>
  );
}
