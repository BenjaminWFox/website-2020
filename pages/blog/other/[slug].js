import { getAllPostIds, getPostData, } from '../../../lib/posts'
import React from 'react'

export default function PostTemplate({ postData, }) {
  return (
    <div>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </div>
  )
}

export const getStaticPaths = async () => {
  const paths = getAllPostIds()

  return {
    fallback: false,
    paths,
  }
}

export const getStaticProps = ({ params, }) => {
  const postData = getPostData(params.slug)

  return {
    props: {
      postData,
    },
  }
}
