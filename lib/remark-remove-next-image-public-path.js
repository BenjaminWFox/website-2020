const visit = require('unist-util-visit')

/* eslint-disable */
module.exports = attacher

/**
 * Reference: https://unifiedjs.com/learn/guide/create-a-plugin
 */
function attacher() {
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