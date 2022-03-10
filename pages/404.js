export default function Custom404() {
  return (
    <>
      <Head>
        <title>404</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <div className="absolute top-0 bg w-screen h-screen flex items-center justify-center text-white">
        <h1>404 - Page Not Found</h1>
      </div>
    </>
  );
}
