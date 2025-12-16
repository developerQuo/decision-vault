import type * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ButtonSecondaryProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonSecondary({
  className,
  ...props
}: ButtonSecondaryProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        'border-border hover:bg-muted/50 rounded-sm border bg-transparent shadow-none',
        'transition-colors duration-[120ms]',
        className,
      )}
      {...props}
    />
  );
}
