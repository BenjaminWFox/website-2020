import * as matter from 'gray-matter'
import fs from 'fs'
import highlight from 'remark-highlight.js'
import html from 'remark-html'
import path from 'path'
import remark from 'remark'
import { postStatuses } from '@/lib/config'
import { isProduction } from '@/lib/utility'

// console.log(Prism.plugins)
// console.log('')
// Prism.plugins.autoloader = true


const ROOT_CONTENT_DIR = './content'
const PUBLISHED_POSTS_DIR = `/${postStatuses.published}`
const DRAFT_POSTS_DIR = `/${postStatuses.draft}`
const MAX_BLOGROLL_POSTS = 8
let ALL_POSTS = undefined
let ALL_PATHS = undefined

const makePost = async (filepath, filename, status) => {
  const rawContents = fs.readFileSync(`${filepath}/${filename}`, 'utf8')
  const matterResult = matter(rawContents)

  const processedContent = await remark()
    .use(highlight)
    .use(html)
    .process(matterResult.content)

  const name = filename.replace('.md', '')
  const dynamicPath = []
  const { category, title, subtitle, date, canon, image } = matterResult.data
  const dateOptions = {
    dateStyle: 'medium',
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const dateLong = new Date(date).toLocaleDateString('en-US', dateOptions)
  let relativePath = ''

  if (status === postStatuses.draft) {
    dynamicPath.push(postStatuses.draft)
    relativePath += `/${postStatuses.draft}`
  }
  relativePath += `/${matterResult.data.category}`
  dynamicPath.push(matterResult.data.category)
  relativePath += `/${name}`
  dynamicPath.push(name)

  console.log('DPATH', category)

  return {
    dynamicPath,
    relativePath,
    filepath,
    filename,
    name,
    status,
    meta: {
      title,
      subtitle,
      date,
      dateLong,
      category,
      image: image ?? '',
      canon: canon ?? '',
      tags: [],
    },
    html: processedContent.toString(),
  }
}

/**
 * `this` must be bound to an object that contains array `arrKey`
 */
const sortAsc = function sortAsc(arrKey) {
  // eslint-disable-next-line no-invalid-this
  this[arrKey] = this[arrKey].sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
}

const sortDesc = function sortDesc(arrKey) {
  // eslint-disable-next-line no-invalid-this
  this[arrKey] = this[arrKey].sort((a, b) => new Date(a.meta.date) - new Date(b.meta.date))
}

const buildPostData = async () => {
  const { published } = postStatuses
  const { draft } = postStatuses

  const posts = await Promise.all([
    makePost(`${ROOT_CONTENT_DIR}${PUBLISHED_POSTS_DIR}/tech`, 'nextjs-setup-config-testing-linting-absolute-imports.md', published),
    makePost(`${ROOT_CONTENT_DIR}${DRAFT_POSTS_DIR}/tech`, 'share-state-between-screens-custom-navigators-react-navigation.md', draft),
    makePost(`${ROOT_CONTENT_DIR}${DRAFT_POSTS_DIR}/tech`, 'creating-react-component-library-abstracting-react-component-library.md', draft),
    makePost(`${ROOT_CONTENT_DIR}${DRAFT_POSTS_DIR}/tech`, 'get-started-with-nextjs.md', draft),
    makePost(`${ROOT_CONTENT_DIR}${DRAFT_POSTS_DIR}/other`, 'some-silly-writeup.md', draft)
  ])

  posts.forEach((post) => {
    if ((!isProduction()) || (isProduction && post.status !== postStatuses.draft)) {
      if (!ALL_POSTS) {
        ALL_PATHS = []
      }
      if (!ALL_POSTS) {
        ALL_POSTS = {}
      }
      if (!ALL_POSTS[post.status]) {
        ALL_POSTS[post.status] = {}
        ALL_POSTS[post.status].sortAsc = sortAsc.bind(ALL_POSTS[post.status])
        ALL_POSTS[post.status].sortDesc = sortDesc.bind(ALL_POSTS[post.status])
      }
      if (!ALL_POSTS[post.status].all) {
        ALL_POSTS[post.status].all = []
      }
      if (!ALL_POSTS[post.status][post.meta.category]) {
        ALL_POSTS[post.status][post.meta.category] = []
      }

      ALL_POSTS[post.status].all.push(post)
      ALL_POSTS[post.status][post.meta.category].push(post)

      if ((post.status === draft && process.env.NODE_ENV !== 'productio') || post.status === published) {
        ALL_PATHS.push({
          params: { slug: post.dynamicPath }
        })
      }
    }
  })

  ALL_POSTS[postStatuses.published].sortAsc('all')
  ALL_POSTS[postStatuses.draft].sortAsc('all')
}

// const getAllFilesInFolder = (parentPath, directory) => {
//   const allFilePaths = []

//   fs.readdirSync(`${parentPath}/${directory}`).forEach((file) => {
//     allFilePaths.push(file)
//   })

//   return allFilePaths
// }

// /*
//  * Returns an array that looks like this:
//  * [
//  *   {
//  *     params: {
//  *       id: 'ssg-ssr'
//  *     }
//  *   },
//  *   {
//  *     params: {
//  *       id: 'pre-rendering'
//  *     }
//  *   }
//  * ]
//  */
// export const getStaticPathsForCategory = (category) => {
//   const readDir = `${PUBLISHED_POSTS_DIR}/${category}`

//   const fileNames = fs.readdirSync(readDir)

//   return fileNames.map((fileName) => ({
//     params: {
//       category,
//       slug: fileName.replace(/\.md$/u, ''),
//     },
//   }))
// }

// export const getAllPostByCategory = (postStatus) => {
//   const readDir = postStatus === postStatuses.published
//     ? PUBLISHED_POSTS_DIR
//     : DRAFT_POSTS_DIR
//   const categories = []

//   const folderNames = fs.readdirSync(readDir)

//   folderNames.forEach((folder) => {
//     categories.push({
//       name: folder,
//       posts: [...getAllFilesInFolder(readDir, folder)],
//     })
//   })

//   return categories
// }

// export const getPostMeta = (category, slug) => {
//   const fullPath = path.join(PUBLISHED_POSTS_DIR, `${category}/${slug}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents)

//   // Combine the data with the id
//   return {
//     slug,
//     ...matterResult.data,
//   }
// }

// export const getPostData = async (category, slug) => {
//   const fullPath = path.join(PUBLISHED_POSTS_DIR, `${category}/${slug}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents)

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark()
//     .use(highlight)
//     .use(html)
//     .process(matterResult.content)

//   const contentHtml = processedContent.toString()

//   // Combine the data with the id
//   return {
//     contentHtml,
//     slug,
//     ...matterResult.data,
//   }
// }

// export const getAllPostData = (postStatus) => {
//   const categories = getAllPostByCategory(postStatus)

//   const allPostData = []

//   categories.forEach((category) => {
//     category.posts.forEach((postSlug) => {
//       allPostData.push(getPostMeta(category.name, postSlug.replace('.md', '')))
//     })
//   })

//   return allPostData
// }

const isDraftPost = (postOrSlug) => {
  if (postOrSlug.length) {
    return postOrSlug[0] === postStatuses.draft
  }

  return postOrSlug.status === postStatuses.draft
}

export const buildPostManifest = async () => {
  await buildPostData()
}

export const getPostManifest = async (maxPostsToReturn, postStatusToShow) => {
  if (!ALL_POSTS) {
    await buildPostManifest()
  }

  const startIndex = 0

  if (ALL_POSTS[postStatusToShow]) {
    return ALL_POSTS[postStatusToShow].all.slice(startIndex, startIndex + maxPostsToReturn)
  }

  return []
}

export const getDynamicPaths = async () => {
  if (!ALL_PATHS || !ALL_POSTS) {
    await buildPostManifest()
  }

  return ALL_PATHS
}

export const getPost = async (slug) => {

  /**
   * This check isn't really necessary. It also prevents markdown changing after edits in dev.
   * ^ that guy lies
   * - This is necessary to prevent duplicating blogroll in dev
   */
  if (!ALL_PATHS || !ALL_POSTS) {
    await buildPostManifest()
  }

  if (isDraftPost(slug)) {
    const postsOfStatus = ALL_POSTS[postStatuses.draft]
    const postsOfCategory = postsOfStatus[slug[1]]

    return postsOfCategory.find((post) => post.name === slug[2])
  }

  return ALL_POSTS[postStatuses.published][slug[0]].find((post) => post.name === slug[1])
}
