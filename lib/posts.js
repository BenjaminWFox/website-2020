import * as matter from 'gray-matter'
import fs from 'fs'
import html from 'remark-html'
import path from 'path'
import remark from 'remark'

const POSTS_DIR = './content'
const MAX_BLOGROLL_POSTS = 3

const getAllFilesInFolder = (parentPath, directory) => {
  const allFilePaths = []

  fs.readdirSync(`${parentPath}/${directory}`).forEach((file) => {
    allFilePaths.push(file)
  })

  return allFilePaths
}

/*
 * Returns an array that looks like this:
 * [
 *   {
 *     params: {
 *       id: 'ssg-ssr'
 *     }
 *   },
 *   {
 *     params: {
 *       id: 'pre-rendering'
 *     }
 *   }
 * ]
 */
export const getStaticPathsForCategory = (category) => {
  const readDir = `${POSTS_DIR}/${category}`

  const fileNames = fs.readdirSync(readDir)

  return fileNames.map((fileName) => ({
    params: {
      category,
      slug: fileName.replace(/\.md$/u, ''),
    },
  }))
}

export const getAllPostByCategory = () => {
  const readDir = POSTS_DIR
  const categories = []

  const folderNames = fs.readdirSync(readDir)

  folderNames.forEach((folder) => {
    categories.push({
      name: folder,
      posts: [...getAllFilesInFolder(POSTS_DIR, folder)],
    })
  })

  return categories
}

export const getPostMeta = (category, slug) => {
  const fullPath = path.join(POSTS_DIR, `${category}/${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    slug,
    ...matterResult.data,
  }
}

export const getPostData = async (category, slug) => {
  const fullPath = path.join(POSTS_DIR, `${category}/${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    contentHtml,
    slug,
    ...matterResult.data,
  }
}

export const getAllPostData = () => {
  const categories = getAllPostByCategory()

  const allPostData = []

  categories.forEach((category) => {
    category.posts.forEach((postSlug) => {
      allPostData.push(getPostMeta(category.name, postSlug.replace('.md', '')))
    })
  })

  return allPostData
}

export const buildPostManifest = () => {
  const pData = getAllPostData()

  pData.sort((a, b) => new Date(b.date) - new Date(a.date))

  return pData.splice(0, MAX_BLOGROLL_POSTS)
}
