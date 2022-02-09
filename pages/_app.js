import Layout from '../src/components/Layout'
import '../src/styles/style.css'
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
