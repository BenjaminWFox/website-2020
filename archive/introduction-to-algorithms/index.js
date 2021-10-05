import fs from 'fs'
import PropTypes from 'prop-types'

export default function IntroductionToAlgorithms({ pages }) {
  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {pages.map((page) => (
          <li key={page}>
            <a href={`/introduction-to-algorithms/${page}`}>{page}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps = async () => {
  const contents = fs.readdirSync('./pages/introduction-to-algorithms')
  const pages = []

  contents.forEach((entry) => {
    if (entry !== 'index.js') {
      const pageName = entry.replace('.js', '')

      pages.push(pageName)
    }
  })

  return {
    props: {
      pages,
    }
  }
}

IntroductionToAlgorithms.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.string).isRequired,
}
