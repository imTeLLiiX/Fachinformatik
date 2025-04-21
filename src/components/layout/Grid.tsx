import React from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    desktop?: number;
    tablet?: number;
    mobile?: number;
  };
  spacing?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export function Grid({
  children,
  className,
  columns = {
    desktop: 4,
    tablet: 2,
    mobile: 1
  },
  spacing = 'clamp(1rem, 4vw, 4rem)',
  aspectRatio = '16:9'
}: GridProps) {
  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square'
  };

  return (
    <div 
      className={cn(
        'grid gap-4',
        'grid-cols-1',
        `sm:grid-cols-${columns.mobile}`,
        `md:grid-cols-${columns.tablet}`,
        `lg:grid-cols-${columns.desktop}`,
        className
      )}
      style={{
        gap: spacing
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn(
              (child as React.ReactElement<any>).props.className,
              aspectRatioClasses[aspectRatio]
            )
          });
        }
        return child;
      })}
    </div>
  );
}

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: {
    desktop?: number;
    tablet?: number;
    mobile?: number;
  };
}

export function GridItem({
  children,
  className,
  span = {
    desktop: 1,
    tablet: 1,
    mobile: 1
  }
}: GridItemProps) {
  return (
    <div 
      className={cn(
        'col-span-1',
        `sm:col-span-${span.mobile}`,
        `md:col-span-${span.tablet}`,
        `lg:col-span-${span.desktop}`,
        className
      )}
    >
      {children}
    </div>
  );
} 