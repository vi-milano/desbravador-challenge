import { TextSkeleton } from './TextSkeleton';

export function InfoText({
  text,
  isLoading,
  title,
  length = 20,
}: {
  text?: string;
  title?: string;
  isLoading: boolean;
  length?: number;
}) {
  return (
    <div>
      <span>{title}: </span>
      <TextSkeleton
        text={text}
        isLoading={isLoading}
        length={length}
        speed={40}
        revealSpeed={50}
      />
    </div>
  );
}
