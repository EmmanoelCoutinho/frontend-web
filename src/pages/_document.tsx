import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" type="imagex/png" href="/logo-si.ico" />
        <title>Santos Imóveis</title>

        <meta
          name="adopt-website-id"
          content="67911adb-8b3b-4d73-ad52-afe0eb84956e"
        />
        <script
          async
          src="//tag.goadopt.io/injector.js?website_code=67911adb-8b3b-4d73-ad52-afe0eb84956e"
          className="adopt-injector"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
