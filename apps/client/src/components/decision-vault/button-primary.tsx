import type * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ButtonPrimaryProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonPrimary({
  className,
  ...props
}: ButtonPrimaryProps) {
  return (
    <Button
      className={cn(
        'rounded-sm bg-[#F2B705] text-[#1A1A1A] shadow-none hover:bg-[#D9A304]',
        'font-medium transition-colors duration-[120ms]',
        className,
      )}
      {...props}
    />
  );
}
