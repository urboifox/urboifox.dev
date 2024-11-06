import Slugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

const slugs = new Slugger();

export type TOCHeading = {
    value: string;
    id: string;
    depth: number;
};

export const mdastExtractHeadings = (
    mdast: Root,
    { maxDepth }: { maxDepth: number } = { maxDepth: 3 }
) => {
    slugs.reset();
    const headings: TOCHeading[] = [];

    visit(mdast, 'heading', function (node) {
        const value = toString(node, { includeImageAlt: false });
        const slug = slugs.slug(value);

        if (node.depth <= maxDepth) {
            headings.push({
                value,
                id: slug,
                depth: node.depth
            });
        }
    });

    return headings;
};
