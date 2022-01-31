import { getDynamicPaths, getPost } from '@/lib/posts'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Header from '@/components/header/header'
import PropTypes from 'prop-types'

const limitChars = (string, limitInclusive = 200) => {
  if (string.length < limitInclusive) {
    return string
  }

  return `${string.substring(0, limitInclusive - 3)}...`
}

export default function PostTemplate({ post }) {
  const lightboxImage = (e) => {
    e.stopPropagation()

    const [body] = document.getElementsByTagName('body')
    const image = document.createElement('img')

    function removeImage(event) {
      if (event.keyCode === 27 || !event.keyCode) {
        body.classList.remove('overlaid')
        body.removeChild(image)
        body.removeEventListener('click', removeImage)
        body.removeEventListener('keydown', removeImage)
      }
    }

    image.src = e.target.src
    image.classList.add('lightbox')

    body.classList.add('overlaid')
    body.appendChild(image)
    body.addEventListener('click', removeImage)
    body.addEventListener('keydown', removeImage)
  }

  useEffect(() => {
    const images = document.getElementsByTagName('img')

    if (images) {
      [...images].forEach((img) => {
        img.addEventListener('click', lightboxImage)
      })
    }

    return () => {
      [...images].forEach((img) => {
        img.removeEventListener('click', lightboxImage)
      })
    }
  }, [])

  return (
    <div>
      <Head>
        <title>{post.meta.title} | Benjamin W Fox</title>
        <link
          href="/favicon.ico"
          rel="icon"
        />
        {
          post.meta.canon
            ? <link href={post.meta.canon} rel="canonical" />
            : <link href={post.absoluteUrl} rel="canonical" />
        }
        <meta content="Ben Fox" property="og:site_name" />
        <meta content={post.meta.title} property="og:title" />
        <meta content={post.meta.subtitle} property="og:description" />
        <meta content={post.meta.absoluteImage} property="og:image" />
        <meta content={post.absoluteUrl} property="og:url" />
        <meta content="article" property="og:type" />
        <meta content="$ilp.uphold.com/YPyGRY7bJfP3" name="monetization" />

        <meta content={limitChars(`${limitChars(post.meta.subtitle, 200)} Tagged with ${post.meta.tags}.`, 275)} name="description" />
        <meta content={`${post.meta.tags}, ben fox, benjamin fox, software developer`} name="keywords" />

        <meta content={post.meta.absoluteImage} name="twitter:image:src" />
        <meta content="@BenjaminWFox" name="twitter:site" />
        <meta content="@BenjaminWFox" name="twitter:creator" />
        <meta content={post.meta.title} name="twitter:title" />
        <meta content={limitChars(post.meta.subtitle, 200)} name="twitter:description" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="on" name="twitter:widgets:new-embed-design" />

        <meta content={post.meta.updated} name="last-updated" />
      </Head>

      <main>
        <a id="top" />
        <Header />
        <div
          className="markdown-body"
        >
          <div style={{
            textAlign: 'right',
            marginBottom: '.5rem'
          }}
          >Published {post.meta.datePublish}
          </div>
          {post.meta.dateUpdate &&
            <div style={{
              textAlign: 'right',
              marginBottom: '.5rem'
            }}
            >Updated {post.meta.dateUpdate}
            </div>}
          <h1>{post.meta.title}</h1>
          <p>{post.meta.subtitle}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <div style={{
          textAlign: 'center',
          padding: '20px'
        }}
        ><Link href="/"><a>Home</a></Link> | <a href="#top">Top of Page</a>
        </div>
      </main>

      <div className="overlay" />
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

PostTemplate.propTypes = {
  post: PropTypes.object.isRequired,
}
