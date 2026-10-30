import type { MarkdownOptions } from 'vitepress';
import { transformerMetaWordHighlight, transformerNotationWordHighlight } from '@shikijs/transformers';
import ComponentPreviewPlugin from '../plugins/previewer';
import CodeFencePlugin from '../plugins/code-fence';
import CodeWrapperPlugin from '../plugins/codewrapper';
import ComponentInstallPlugin from '../plugins/component-install';
import { CODE_THEME_REGISTRATIONS } from './shiki';

type CodeTransformer = NonNullable<MarkdownOptions['codeTransformers']>[number];

/** Markdown (Shiki + fence plugins) options for the docs site; shared with the unit tests. */
export const markdownOptions: MarkdownOptions = {
  theme: CODE_THEME_REGISTRATIONS,
  codeTransformers: [
    transformerMetaWordHighlight() as CodeTransformer,
    transformerNotationWordHighlight({ matchAlgorithm: 'v3' }) as CodeTransformer,
  ],
  config(md) {
    md.use(ComponentPreviewPlugin);
    // The fence plugin has to come before CodeWrapper, which wraps what the fence renders.
    md.use(CodeFencePlugin);
    md.use(CodeWrapperPlugin);
    md.use(ComponentInstallPlugin);
  },
};
