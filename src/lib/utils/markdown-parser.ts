import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdastExtractHeadings } from './mdast-extract-headings';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import rehypeExternalLinks from 'rehype-external-links';

export async function processMarkdown(markdown: string) {
    return unified()
        .use(remarkParse) // parse markdown
        .use(remarkGfm) // support github flavored markdown
        .use(remarkRehype, {
            // convert to html
            allowDangerousHtml: true
        })
        .use(rehypeSlug) // add slug to headings
        .use(rehypeExternalLinks, { target: '_blank' }) // add target to external links
        .use(rehypePrism) // syntax highlighting
        .use(rehypeStringify) // convert to string
        .process(markdown)
        .then((result) => {
            return result;
        });
}

export async function parseMarkdown(markdown: string) {
    const tree = fromMarkdown(markdown); // parse markdown to mdast
    const toc = mdastExtractHeadings(tree); // extract headings from mdast
    const { value } = await processMarkdown(markdown);

    return { toc, dom: value.toString() };
}
