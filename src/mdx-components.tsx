import React from 'react';

import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { CopyHeader } from '@/components/editor/copy-header';
import {
  ImageViewer,
  MediaViewer,
  VideoViewer,
} from '@/components/editor/media-viewer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const createHeading = (level: number) => {
  const Heading = ({
    children,
    id,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <CopyHeader id={id} level={level} {...props}>
        {children}
      </CopyHeader>
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
};

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    img: (props) => <ImageZoom {...(props as any)} />,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    MediaViewer,
    ImageViewer,
    VideoViewer,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    ...components,
  };
}
