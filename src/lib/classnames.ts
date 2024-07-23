import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/***
 * Use these to merge classNames together and define conditional classnames
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
