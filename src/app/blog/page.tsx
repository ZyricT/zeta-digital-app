import BlogList from '@/components/BlogList'
import { getAllPosts } from '@/sanity/client'

export const revalidate = 60

export default async function BlogPage() {
  let posts: any[] = []
  try { posts = await getAllPosts() } catch { posts = [] }
  return <BlogList posts={posts || []} />
}
