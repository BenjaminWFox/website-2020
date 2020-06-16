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

      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
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

export const getStaticProps = ({ params }) => {
  const postData = getPostData(CATEGORY, params.slug)

  return {
    props: {
      postData,
    },
  }
}
