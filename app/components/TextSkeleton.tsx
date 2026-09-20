import { useEffect, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

const MAX_REVEAL_STEPS = 40;

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

const scramble = (template: string) => template.replace(/\S/g, randomChar);

const mask = (template: string) => template.replace(/\S/g, '•');

type TextSkeletonProps = {
  text?: string;
  isLoading: boolean;
  length?: number;
  speed?: number;
  revealSpeed?: number;
};

export const TextSkeleton = ({
  text,
  isLoading,
  length = 20,
  speed = 50,
  revealSpeed = 60,
}: TextSkeletonProps) => {
  const [displayText, setDisplayText] = useState(() =>
    mask(text ?? 'x'.repeat(length))
  );

  useEffect(() => {
    const template = text ?? 'x'.repeat(length);
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let id: ReturnType<typeof setInterval> | undefined;

    if (isLoading) {
      if (reduceMotion) {
        setDisplayText(mask(template));
      } else {
        id = setInterval(() => setDisplayText(scramble(template)), speed);
      }
    } else if (!text || reduceMotion) {
      setDisplayText(text ?? '');
    } else {
      const target = text;
      const step = Math.max(1, Math.ceil(target.length / MAX_REVEAL_STEPS));
      let revealed = 0;

      id = setInterval(() => {
        revealed = Math.min(revealed + step, target.length);
        setDisplayText(
          target.slice(0, revealed) + scramble(target.slice(revealed))
        );
        if (revealed === target.length) clearInterval(id);
      }, revealSpeed);
    }

    return () => clearInterval(id);
  }, [isLoading, text, length, speed, revealSpeed]);

  return (
    <span aria-busy={isLoading}>
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
};
