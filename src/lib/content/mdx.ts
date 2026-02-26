import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

export async function serializeMdx(source: string): Promise<MDXRemoteSerializeResult> {
  return serialize(source, {
    parseFrontmatter: false,
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  })
}
