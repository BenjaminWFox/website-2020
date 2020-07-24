// import PropTypes from 'prop-types'
import Error404 from '@/components/errors/404/404'

export default function Home() {
  return <Error404 />
}

export const getStaticProps = async ({ params }) => ({
  props: {
    params: params || null,
  },
})

Home.propTypes = {}
