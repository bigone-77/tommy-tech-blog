import {
  Accordions,
  Accordion as FumadocsAccordion,
} from 'fumadocs-ui/components/accordion';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { CopyHeader } from '@/components/editor/copy-header';
import { VideoViewer } from '@/components/editor/media-viewer';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,

    Accordion: Accordions,
    Accordions: Accordions,
    AccordionItem: FumadocsAccordion,
    accordion: Accordions,
    accordionitem: FumadocsAccordion,

    img: (props) => <ImageZoom {...(props as any)} />,

    a: ({ href, children, ...props }: any) => {
      const isVideo = href?.match(/\.(mp4|webm|ogg)$/i);
      if (isVideo) return <VideoViewer src={href} alt={children as string} />;
      return (
        <a href={href} {...props} target='_blank' rel='noopener noreferrer'>
          {children}
        </a>
      );
    },

    pre: ({ children, ...props }: any) => {
      const language = props['data-language'];
      const displayTitle = props['data-title'] || language?.toUpperCase();
      return (
        <CodeBlock allowCopy keepBackground title={displayTitle} {...props}>
          <Pre {...props}>{children}</Pre>
        </CodeBlock>
      );
    },

    h1: (props) => <CopyHeader id={props.id} level={1} {...props} />,
    h2: (props) => <CopyHeader id={props.id} level={2} {...props} />,
    h3: (props) => <CopyHeader id={props.id} level={3} {...props} />,

    ...components,
  };
}
