import { getPostData, getStaticPathsForCategory, } from '../../../lib/posts'
import React from 'react'

const CATEGORY = 'other'

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
  const paths = getStaticPathsForCategory(CATEGORY)

  return {
    fallback: false,
    paths,
  }
}

export const getStaticProps = ({ params, }) => {
  const postData = getPostData(CATEGORY, params.slug)

  return {
    props: {
      postData,
    },
  }
}
