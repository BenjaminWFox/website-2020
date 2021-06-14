import * as matter from 'gray-matter'
import fs from 'fs'
import highlight from 'remark-highlight.js'
import html from 'remark-html'
// import path from 'path'
import remark from 'remark'
import { postStatuses } from '@/lib/config'
import { isProduction } from '@/lib/utility'

const headings = require('remark-autolink-headings')
const slug = require('remark-slug')
const removePublic = require('./remark-remove-next-image-public-path')
// const externalLinks = require('remark-external-links')

const ROOT_CONTENT_DIR = './content'
const PUBLISHED_POSTS_DIR = `/${postStatuses.published}`
const DRAFT_POSTS_DIR = `/${postStatuses.draft}`
const { SITE_ROOT } = process.env
// const MAX_BLOGROLL_POSTS = 8 .
let ALL_POSTS = undefined
let ALL_PATHS = undefined

const DATE_OPTIONS = {
  // dateStyle: 'medium',
  // weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC'
}

const isNotPrimaryDirectory = (pathPartString) => (
  !ROOT_CONTENT_DIR.includes(pathPartString) &&
    !PUBLISHED_POSTS_DIR.includes(pathPartString) &&
    !DRAFT_POSTS_DIR.includes(pathPartString)
)

const getFallbackCategory = (filepath) => {
  const lastPathDir = filepath.match(/\/(?:.(?!\/))+$/ugm)[0].replace('/', '')
  const fallbackCategory = isNotPrimaryDirectory(lastPathDir) ? lastPathDir : 'unknown'

  return fallbackCategory
}

// eslint-disable-next-line func-style, max-params
function Post(filepath, filename, status, matterResult, processedContent) {
  const category = matterResult.data.category ?? getFallbackCategory(filepath)

  this.name = filename.replace('.md', '')
  this.dynamicPath = []
  this.relativeUrl = ''
  this.absoluteUrl = ''
  this.filepath = filepath
  this.filename = filename
  this.status = status
  this.meta = {
    title: matterResult.data.title ?? '',
    subtitle: matterResult.data.subtitle ?? '',
    date: matterResult.data.date ?? '',
    dateLong: new Date(matterResult.data.date).toLocaleDateString('en-US', DATE_OPTIONS),
    category,
    image: matterResult.data.image ?? '',
    absoluteImage: matterResult.data.image ? `${SITE_ROOT}/${matterResult.data.image}` : null,
    canon: matterResult.data.canon ?? '',
    tags: [],
  }
  this.html = processedContent.toString()

  const buildPathAndUrls = () => {
    if (status === postStatuses.draft) {
      this.dynamicPath.push(postStatuses.draft)
      this.relativeUrl += `/${postStatuses.draft}`
    }
    this.relativeUrl += `/${matterResult.data.category}`
    this.dynamicPath.push(category)
    this.relativeUrl += `/${this.name}`
    this.absoluteUrl = `${SITE_ROOT}/blog${this.relativeUrl}`
    this.dynamicPath.push(this.name)
  }

  buildPathAndUrls()

  return this
}

const makePost = async (filepath, filename, status) => {
  const rawContents = fs.readFileSync(`${filepath}/${filename}`, 'utf8')
  const matterResult = matter(rawContents)
  const processedContent = await remark()
    .use(highlight)
    .use(slug)
    .use(headings)
    // .use(externalLinks, {
    //   target: '_blank',
    //   rel: ['nofollow'],
    //   content: [],
    //   contentProperties: {
    //     'aria-label': 'external link',
    //   }
    //   // content: [
    //   //   {
    //   //     type: 'element',
    //   //     tagName: 'img',
    //   //     properties: {
    //   //       src: '/images/icons/external-link-icon-blue.png',
    //   //       className: [''],
    //   //       style: ['margin-left: 4px;'],
    //   //       alt: 'external link'
    //   //     }
    //   //   }
    //   // ],
    // })
    .use(html)
    .use(removePublic)
    .process(matterResult.content)

  return { ...new Post(filepath, filename, status, matterResult, processedContent) }
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

/**
 * Recursive traversal of the 'content' directory, looking for both `published` and
 * `draft` posts. Builds out arrays used to create the post at a later stage.
 *
 * @return {array} an array [PostPath, PostFilename, PostStatus] that can be used to build out the post content.
 */
const getAllPostsFromFiles = () => {
  const mainDir = 'content'
  const pubDir = 'published'
  const draftDir = 'draft'
  const posts = []

  /**
   * For each path, read everything within that path. If it is a .md file,
   * create an entry in the posts array so we can build the content. If it
   * is a directory, rinse and repeat
   *
   * @param {string} dirPath the relative directory path to read
   */
  const traverseDirectory = (dirPath) => {
    fs.readdirSync(dirPath).forEach((itemName) => {
      const drafts = Boolean(dirPath.includes(draftDir))
      const pubStatus = drafts ? postStatuses.draft : postStatuses.published
      const itemPath = `${dirPath}/${itemName}`
      const itemStats = fs.statSync(itemPath)

      if (itemStats.isFile()) {
        if (itemName.includes('.md')) {
          posts.push([dirPath, itemName, pubStatus])
        }
        else {
          console.error('Unsupported file type. Only markdown (.md) files supported.')
        }
      }
      else {
        traverseDirectory(itemPath)
      }
    })
  }

  traverseDirectory(mainDir)

  return posts
}

/**
 * Builds out an `ALL_POSTS` object with `published` and `draft` properties.
 * Each of those properties holds and object containing some common elements
 * (`all` array, `sortAsc` and `sortDesc` functions), as well as unique category
 * child properties. Each unique child category holds an array of posts.
 */
const buildPostData = async () => {
  const { published } = postStatuses
  const { draft } = postStatuses

  const allPostDetails = getAllPostsFromFiles()

  const posts = await Promise.all(allPostDetails.map((postDetails) => makePost(...postDetails)))

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

      if ((post.status === draft && process.env.NODE_ENV !== 'production') || post.status === published) {
        ALL_PATHS.push({
          params: { slug: post.dynamicPath }
        })
      }
    }
  })

  ALL_POSTS[postStatuses.published].sortAsc('all')
  if (process.env.NODE_ENV !== 'production') {
    ALL_POSTS[postStatuses.draft].sortAsc('all')
  }
}

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

/**
 * This will rebuild the entire post for the passed slug. Used in
 * developmenet only.
 *
 * @param {array} slug an array containing the path parts & post name
 */
const rebuildContentForPost = (slug) => {
  if (isDraftPost(slug)) {
    return makePost(`content/${slug[0]}/${slug[1]}`, `${slug[2]}.md`, postStatuses.draft)
  }

  return makePost(`content/published/${slug[0]}`, `${slug[1]}.md`, postStatuses.published)

}

export const getPost = async (slug) => {
  // If both exist, don't rebuild the post manifest or it will duplicate items in the blogroll
  // This will automatically rebuild all content for posts.
  if (!ALL_PATHS || !ALL_POSTS) {
    await buildPostManifest()
  }
  // If development, always rebuild the content for posts for better editing experience.
  else if (process.env.NODE_ENV === 'development') {
    return rebuildContentForPost(slug)
  }

  // TODO: This `if` could probably be removed...not necessary for production, and will be superceeded
  // by the `else if` above. Actually the whole order of these things could be moved around. Some other time.
  if (isDraftPost(slug)) {
    const postsOfStatus = ALL_POSTS[postStatuses.draft]
    const postsOfCategory = postsOfStatus[slug[1]]

    return postsOfCategory.find((post) => post.name === slug[2])
  }

  return ALL_POSTS[postStatuses.published][slug[0]].find((post) => post.name === slug[1])
}
