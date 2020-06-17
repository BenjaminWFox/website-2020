import { getPostData, getStaticPathsForCategory } from '../../../lib/posts'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const CATEGORY = 'tech'

export default function PostTemplate({ postData }) {
  return (
    <div>
      <Head>
        <title>Benjamin W Fox</title>
        <link
          href="/favicon.ico"
          rel="icon"
        />
      </Head>

      <Link href="/"><a>&lt; Home</a></Link>
      <br />
      {postData.date}
      <br />
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
      <br />
      <Link href="/"><a>&lt; Home</a></Link>
    </div>
  )
}

export const getStaticPaths = async () => {
  const paths = getStaticPathsForCategory(CATEGORY)

  return {
    fallback: false,
    paths,
  }
}

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(CATEGORY, params.slug)

  return {
    props: {
      postData,
    },
  }
}
