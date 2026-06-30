import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { projectId, dataset, apiVersion } from './env'

export const client = createClient({ projectId, dataset, apiVersion, useCdn: true })

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{ topbar, heroLine1, heroLine2, heroSub }`)
}

export async function getLatestPosts() {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3]{
      _id, title, "slug": slug.current, excerpt, publishedAt, mainImage, "categories": categories[]->title }`
  )
}

export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
      _id, title, "slug": slug.current, excerpt, publishedAt, mainImage, language, translationGroup, "categories": categories[]->title }`
  )
}

export async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id, title, "slug": slug.current, excerpt, body, publishedAt, _updatedAt,
      mainImage, "categories": categories[]->title, author, seoTitle, seoDescription,
      language, translationGroup, faqs[]{ question, answer } }`,
    { slug }
  )
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`)
}

export async function getCaseStudies(lang: string) {
  const language = ['en', 'zh', 'ms'].includes(lang) ? lang : 'en'
  return client.fetch(
    `*[_type == "caseStudy" && language == $language] | order(coalesce(order, 999) asc, client asc){
      _id, client, industry, packageName, headline, summary, order,
      metrics[]{ value, label }, challenge, approach,
      testimonialQuote, testimonialAuthor, testimonialRole }`,
    { language }
  )
}

export async function getTranslations(group: string): Promise<{ slug: string; language: string }[]> {
  if (!group) return []
  return client.fetch(
    `*[_type == "post" && translationGroup == $group && defined(slug.current)]{ "slug": slug.current, language }`,
    { group }
  )
}
