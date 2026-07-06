import { lazy, type ComponentType } from 'react';

export const writingContentMap: Record<string, ComponentType> = {};

export const writingContentSlugs = Object.keys(writingContentMap);
