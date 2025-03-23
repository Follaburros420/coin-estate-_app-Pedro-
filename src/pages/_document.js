/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src='https://cdn.complycube.com/verify/1.0.0/verify.js' />
        <script src='https://assets.complycube.com/web-sdk/v1/complycube.min.js?1736503131321'></script>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://assets.complycube.com/web-sdk/v1/style.css?1736503131321'
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
