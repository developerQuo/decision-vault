import { FileQuestion } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export interface EmptyStateProps extends React.ComponentProps<'div'> {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  className,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-4 p-12 text-center',
        className,
      )}
      {...props}
    >
      <div className="text-muted-foreground">
        {icon || <FileQuestion className="size-12" />}
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-foreground text-lg font-semibold">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
