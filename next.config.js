const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  publicExcludes: [
    '!robots.txt',
    '!sitemap.xml.gz',
],
  disable: process.env.NODE_ENV === 'development'
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = withPWA(nextConfig)