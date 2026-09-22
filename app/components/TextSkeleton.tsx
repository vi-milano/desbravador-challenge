import type { HTMLAttributes } from 'react';

type TextSkeletonProps = HTMLAttributes<HTMLSpanElement> & {
  isLoading: boolean;
  text?: string;
  className?: string;
};

export const TextSkeleton = ({
  isLoading,
  text,
  className = '',
  children,
  ...props
}: TextSkeletonProps) => {
  if (!isLoading) {
    return <>{text ?? children}</>;
  }

  return (
    <span
      role="status"
      aria-label="Carregando..."
      className={`inline-block h-[1em] w-[12ch] align-middle animate-pulse rounded bg-gray-200 dark:bg-gray-700 ${className}`}
      {...props}
    />
  );
};
