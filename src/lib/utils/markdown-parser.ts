import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdastExtractHeadings } from './mdast-extract-headings';
import rehypePrism from 'rehype-prism-plus';

export async function processMarkdown(markdown: string) {
    return unified()
        .use(remarkParse)
        .use(remarkRehype, {
            allowDangerousHtml: true
        })
        .use(rehypeSlug)
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(markdown)
        .then((result) => {
            return result;
        });
}

export async function parseMarkdown(markdown: string) {
    const tree = fromMarkdown(markdown);
    const toc = mdastExtractHeadings(tree);
    const { value } = await processMarkdown(markdown);

    return { toc, dom: value.toString() };
}
