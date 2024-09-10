import { PropsWithChildren } from 'react';

import Spinner from '@/assets/icons/loader.svg?react';
import { cn } from '@/libs/classnames';
import Button from './ui/Button';

interface Props {
  loading?: boolean;
  title?: string;
  errorMessage?: string;
  retryText?: string;
  notPage?: boolean;
  onRetry?: () => void;
}

const isNetWorkError = (errorMessage?: string) => {
  if (!errorMessage) return;

  if (errorMessage.toLocaleLowerCase().includes('network error')) {
    return {
      title: 'Connection Lost',
      errorMessage: "Oops! It seems you're currently offline.",
    };
  }
};

export default function AppLoader(props: PropsWithChildren<Props>) {
  const { loading, errorMessage, title, retryText, onRetry, notPage, children } = props;

  const networkError = isNetWorkError(errorMessage);

  return errorMessage ? (
    <div className="min-h-[85vh] w-full flex justify-center items-center">
      <div className="max-w-max flex flex-col justify-center items-center">
        <div>
          {(title || networkError?.title) && (
            <h1 className="text-2xl font-bold mb-2 text-center">{networkError?.title ?? title}</h1>
          )}
          <p className="text-muted text-center">{networkError?.errorMessage ?? errorMessage}</p>
        </div>

        <Button variant="outline" fullWidth className="mt-6" onClick={onRetry}>
          {retryText ?? 'Retry'}
        </Button>
      </div>
    </div>
  ) : loading ? (
    <div
      className={cn('min-h-[85vh] w-full flex justify-center items-center', {
        'min-h-max': notPage,
      })}
    >
      <Spinner className="animate-spin" width={30} />
    </div>
  ) : (
    children
  );
}
