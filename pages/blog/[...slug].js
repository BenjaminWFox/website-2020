import { getDynamicPaths, getPost } from '@/lib/posts'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Header from '@/components/header/header'

export default function PostTemplate({ post }) {
  return (
    <div>
      <Head>
        <title>Benjamin W Fox</title>
        <link
          href="/favicon.ico"
          rel="icon"
        />
        {
          console.log(post.relativePath)
        } {
          post.meta.canon
            ? <link href={post.meta.canon} rel="canonical" />
            : ''
        }
        <meta content="Ben Fox" property="og:site_name" />
        <meta content={post.meta.title} property="og:title" />
        <meta content={post.meta.subtitle} property="og:description" />
        <meta content={post.meta.image} property="og:image" />
        <meta content={`${process.env.SITE_ROOT}/blog${post.relativePath}`} property="og:url" />
        <meta content="blog" property="og:type" />
      </Head>

      <main>
        <Header />
        <div
          className="markdown-body"
        >
          <div style={{ textAlign: 'right',
            marginBottom: '.5rem' }}
          >{post.meta.dateLong}
          </div>
          <h1>{post.meta.title}</h1>
          <p>{post.meta.subtitle}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>

        <br />
        <Link href="/"><a>&lt; Home</a></Link>
      </main>

    </div>
  )
}

export const getStaticPaths = async () => {
  const paths = await getDynamicPaths()

  return {
    fallback: false,
    paths,
  }
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug)

  return {
    props: {
      post,
    },
  }
}
