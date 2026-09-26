import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
const tags=z.union([z.array(z.string()),z.string()]).optional().transform(v=>Array.isArray(v)?v:v?v.split(/\s+/).filter(Boolean):[]);
const id=({entry}:{entry:string})=>entry.replace(/\.mdx?$/,'').replace(/^\d{4}-\d{2}-\d{2}-/,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
export const collections={
 posts:defineCollection({loader:glob({pattern:'**/*.{md,mdx}',base:'./src/content/posts',generateId:id}),schema:z.object({title:z.string(),date:z.coerce.date(),description:z.string().optional(),tags,draft:z.boolean().default(false)})}),
 notes:defineCollection({loader:glob({pattern:'**/*.{md,mdx}',base:'./src/content/notes',generateId:id}),schema:z.object({title:z.string().optional(),date:z.coerce.date(),tags,draft:z.boolean().default(false)})}),
 projects:defineCollection({loader:glob({pattern:'**/*.{md,mdx}',base:'./src/content/projects',generateId:id}),schema:z.object({title:z.string(),description:z.string().optional(),status:z.enum(['active','paused','complete','archived']).default('active'),tags,draft:z.boolean().default(false)})})
};
