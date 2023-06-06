// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["https:/cdn.discordapp.com", "cdn.discordapp.com","https://lh3.googleusercontent.com","lh3.googleusercontent.com"],
  },
  
};

// @ts-ignore
export default withPWA(config);
