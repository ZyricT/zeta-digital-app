import { defineType, defineField, defineArrayMember, type SchemaTypeDefinition } from 'sanity'

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Homepage / Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'topbar', title: 'Top announcement bar', type: 'string' }),
    defineField({ name: 'heroLine1', title: 'Hero headline — line 1', type: 'string' }),
    defineField({ name: 'heroLine2', title: 'Hero headline — line 2 (gradient)', type: 'string' }),
    defineField({ name: 'heroSub', title: 'Hero subtitle', type: 'text', rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Homepage / Site Settings' }) },
})

const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
  ],
})

const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({
      name: 'language', title: 'Language', type: 'string',
      options: { list: [{ title: 'English', value: 'en' }, { title: '简体中文', value: 'zh' }, { title: 'Bahasa Melayu', value: 'ms' }], layout: 'radio' },
      initialValue: 'en', validation: (r) => r.required(),
    }),
    defineField({ name: 'translationGroup', title: 'Translation Group', type: 'string', description: 'Same value across the EN/ZH/MS versions of one article (e.g. full-stack-2026). Powers hreflang.' }),
    defineField({ name: 'excerpt', type: 'text', rows: 3, description: 'Used for meta description & cards (max ~200 chars)' }),
    defineField({ name: 'mainImage', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })] }),
    defineField({ name: 'categories', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })] }),
    defineField({ name: 'author', type: 'string', initialValue: 'Zeta Digital' }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'body', type: 'array', of: [defineArrayMember({ type: 'block' }), defineArrayMember({ type: 'image', options: { hotspot: true } })] }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO title (optional override)' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, title: 'SEO description (optional override)' }),
    defineField({
      name: 'faqs', title: 'FAQs (powers FAQ schema for AEO)', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [defineField({ name: 'question', type: 'string' }), defineField({ name: 'answer', type: 'text', rows: 3 })],
        preview: { select: { title: 'question' } },
      })],
    }),
  ],
  orderings: [{ title: 'Published, newest', name: 'pubDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'publishedAt' } },
})

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, post, category]
