import { TextSkeleton } from './TextSkeleton';

export function InfoText({
  text,
  isLoading,
  title,
}: {
  text?: string;
  title?: string;
  isLoading: boolean;
}) {
  return (
    <div className="d-flex align-items-baseline gap-2 mb-1">
      <span className="fw-bold">{title}:</span>
      <TextSkeleton text={text} isLoading={isLoading} />
    </div>
  );
}
