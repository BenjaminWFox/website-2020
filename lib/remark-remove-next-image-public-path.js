import { visit } from 'unist-util-visit'

/* eslint-disable */

/**
 * Reference: https://unifiedjs.com/learn/guide/create-a-plugin
 */
export default function attacher() {
  return transformer

  function transformer(tree, file) {

    visit(tree, 'paragraph', visitor)

    function visitor(node) {

      const children = node.children

      children.forEach(child => {
        if (child.type === 'image') {
          if (child.url && child.url.indexOf('/public') === 0) {
            child.url = child.url.replace('/public', '')
          }
        }
      })
    }
  }
}