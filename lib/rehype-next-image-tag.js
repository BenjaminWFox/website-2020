import { visit } from 'unist-util-visit'

/* eslint-disable */

/**
 * Reference: https://unifiedjs.com/learn/guide/create-a-plugin
 */
export default function attacher() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        node.tagName = 'Image'
        node.properties.layout = 'fill'
        console.log('Node...', node)
      }
    })
  }
}