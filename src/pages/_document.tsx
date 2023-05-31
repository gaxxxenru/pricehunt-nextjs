import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <link
                    rel="shortcut icon"
                    href="https://assets.maccarianagency.com/favicons/thefront/favicon.ico"
                />
                <meta name="theme-color" content="#ffffff" />
                <meta
                    name="description"
                    content="A modern design system for your new landing and web pages."
                />
                <meta
                    name="robots"
                    content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://assets.maccarianagency.com/screenshots/the-front/social.png"
                />
                <meta
                    property="og:title"
                    content="Cleany - лучший клининговый сервис в Москве"
                />
                <meta
                    property="og:description"
                    content="Лучший клининговый сервис в Москве"
                />
                <meta
                    property="og:url"
                    content="https://thefront.maccarianagency.com/"
                />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
