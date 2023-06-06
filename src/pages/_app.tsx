import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider  } from "next-themes";
import { trpc } from "../utils/trpc";
import Layout from "../components/layout";
import { createTheme, NextUIProvider } from "@nextui-org/react"
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';



const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: { }, // optional
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: { }, // optional
  }
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
       {/* <ThemeProvider enableSystem={true} attribute="class"> */}
       <>
       <meta name="application-name" content="PWA App" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="FlashCardNinja" />
<meta name="description" content="FlashCardNinja" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="msapplication-config" content="/icons/browserconfig.xml" />
<meta name="msapplication-TileColor" content="#2B5797" />
<meta name="msapplication-tap-highlight" content="no" />
<meta name="theme-color" content="#000000" />

<link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
<link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="https://yourdomain.com" />
<meta name="twitter:title" content="FlashCardNinja" />
<meta name="twitter:description" content="Best PWA App in the world" />
<meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
<meta name="twitter:creator" content="@DavidWShadow" />
<meta property="og:type" content="website" />
<meta property="og:title" content="FlashCardNinja" />
<meta property="og:description" content="Best PWA App in the world" />
<meta property="og:site_name" content="FlashCardNinja" />
<meta property="og:url" content="https://yourdomain.com" />
<meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />


            <NextThemesProvider
            enableSystem={true}
    defaultTheme="system"
    attribute="class"
    value={{
      light: lightTheme.className,
      dark: darkTheme.className
    }}
  >
      <Layout>
       
        <Component {...pageProps} />
       
      </Layout>
      </NextThemesProvider>
    </>
      {/* </ThemeProvider> */}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
