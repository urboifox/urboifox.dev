import type { Component } from 'svelte';

export type BlogMetadata = {
    title: string;
    summary: string;
    tags: string[];
    date: string;
    readingTime: number;
    published: boolean;
    image: string;
    youtubeId?: string;
};

export type BlogFile = {
    metadata: BlogMetadata;
    default: Component;
};
