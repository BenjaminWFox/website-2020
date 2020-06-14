import * as matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

const POSTS_DIR = './content'

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(POSTS_DIR)

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
  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/u, ''),
    },
  }))
}

export const getPostData = (slug) => {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    slug,
    ...matterResult.data,
  }
}

export const getAllPostData = () => {
  const pIds = getAllPostIds()

  const allPostData = []

  pIds.forEach((obj) => {
    allPostData.push(getPostData(obj.params.slug))
  })

  return allPostData
}

export const buildPostManifest = () => {
  const pData = getAllPostData()

  pData.sort((a, b) => new Date(b.date) - new Date(a.date))

  return pData.splice(0, 2)
}
