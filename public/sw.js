if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const r=e=>a(e,t),o={module:{uri:t},exports:i,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/247-399b5327f7cb7745.js",revision:"399b5327f7cb7745"},{url:"/_next/static/chunks/311-08c5e6c6ffa789d5.js",revision:"08c5e6c6ffa789d5"},{url:"/_next/static/chunks/framework-114634acb84f8baa.js",revision:"114634acb84f8baa"},{url:"/_next/static/chunks/main-2ee2faaec7a6a836.js",revision:"2ee2faaec7a6a836"},{url:"/_next/static/chunks/pages/_app-d7a3620a3cbb91a6.js",revision:"d7a3620a3cbb91a6"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/about-3b170696bb66a859.js",revision:"3b170696bb66a859"},{url:"/_next/static/chunks/pages/contact-78b848820897ea3b.js",revision:"78b848820897ea3b"},{url:"/_next/static/chunks/pages/faq-81a7d3a02533eab7.js",revision:"81a7d3a02533eab7"},{url:"/_next/static/chunks/pages/flashcard/%5Binventory%5D-b8bfda1987201e22.js",revision:"b8bfda1987201e22"},{url:"/_next/static/chunks/pages/flashcardView/%5Binventory%5D-d2540e13c3ec264d.js",revision:"d2540e13c3ec264d"},{url:"/_next/static/chunks/pages/index-2384be8a05a4b0da.js",revision:"2384be8a05a4b0da"},{url:"/_next/static/chunks/pages/play-2f46beab27c0ee61.js",revision:"2f46beab27c0ee61"},{url:"/_next/static/chunks/pages/profile-c7e91af5079a05b1.js",revision:"c7e91af5079a05b1"},{url:"/_next/static/chunks/pages/settings-c5a2a6a1e0768230.js",revision:"c5a2a6a1e0768230"},{url:"/_next/static/chunks/pages/view-e513c3b36ed9a66b.js",revision:"e513c3b36ed9a66b"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ee7e63bc15b31913.js",revision:"ee7e63bc15b31913"},{url:"/_next/static/css/37373a8c3967726f.css",revision:"37373a8c3967726f"},{url:"/_next/static/hFNY93NgLcwRZGLifYczs/_buildManifest.js",revision:"f9f36c22257abfa05f13874c65384876"},{url:"/_next/static/hFNY93NgLcwRZGLifYczs/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"0809538b59d857dc43ccc216d342c3a4"},{url:"/icon-192x192.png",revision:"680e1cb016543b0ccd6ac63f3f22a2bc"},{url:"/icon-256x256.png",revision:"d6fe7d07ce8b9762d9071236d921a70f"},{url:"/icon-384x384.png",revision:"756a6689d61b06bb74ad40e765ce1224"},{url:"/icon-512x512.png",revision:"5fcd5bff48b48a90e47684e4f802dd0b"},{url:"/manifest.json",revision:"47027674c41c323e15f4576c3e52ba2a"},{url:"/manifest.webmanifest",revision:"47027674c41c323e15f4576c3e52ba2a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
