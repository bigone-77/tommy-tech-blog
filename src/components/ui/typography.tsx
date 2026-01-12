import React from 'react';

import { cn } from '@/lib/utils';

interface TypographyProps {
  className?: string;
  children: string;
}

interface ListProps {
  className?: string;
  children: React.ReactElement<'li'>[];
}

const H1Typography = ({ className, children }: TypographyProps) => (
  <h1
    className={cn(
      'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
      className,
    )}
  >
    {children}
  </h1>
);

const H2Typography = ({ className, children }: TypographyProps) => (
  <h2
    className={cn(
      'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      className,
    )}
  >
    {children}
  </h2>
);

const H3Typography = ({ className, children }: TypographyProps) => (
  <h3
    className={cn(
      'scroll-m-20 text-2xl font-semibold tracking-tight',
      className,
    )}
  >
    {children}
  </h3>
);

const H4Typography = ({ className, children }: TypographyProps) => (
  <h4
    className={cn(
      'scroll-m-20 text-xl font-semibold tracking-tight',
      className,
    )}
  >
    {children}
  </h4>
);

const PTypography = ({ className, children }: TypographyProps) => (
  <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
    {children}
  </p>
);

const BlockquoteTypography = ({ className, children }: TypographyProps) => (
  <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
    {children}
  </blockquote>
);

const ListTypography = ({ className, children }: ListProps) => (
  <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>
    {children}
  </ul>
);

const InlineCodeTypography = ({ className, children }: TypographyProps) => (
  <code
    className={cn(
      'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      className,
    )}
  >
    {children}
  </code>
);

const LeadTypography = ({ className, children }: TypographyProps) => (
  <p className={cn('text-muted-foreground text-xl', className)}>{children}</p>
);

const LargeTypography = ({ className, children }: TypographyProps) => (
  <div className={cn('text-lg font-semibold', className)}>{children}</div>
);

const MediumTypography = ({ className, children }: TypographyProps) => (
  <div className={cn('text-md font-medium', className)}>{children}</div>
);

const SmallTypography = ({ className, children }: TypographyProps) => (
  <small className={cn('text-sm leading-none font-medium', className)}>
    {children}
  </small>
);

const MutedTypography = ({ className, children }: TypographyProps) => (
  <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
);

export {
  H1Typography,
  H2Typography,
  H3Typography,
  H4Typography,
  PTypography,
  BlockquoteTypography,
  ListTypography,
  InlineCodeTypography,
  LeadTypography,
  LargeTypography,
  MediumTypography,
  SmallTypography,
  MutedTypography,
};
