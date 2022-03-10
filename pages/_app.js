import Layout from "../src/components/Layout";
import "../src/styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout >
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
