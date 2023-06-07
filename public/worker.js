// self.addEventListener("fetch", (event) => {
//     console.log(`Handling fetch event for ${event.request.url}`);
  
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         if (response) {
//           console.log("Found response in cache:", response);
//           return response;
//         }
//         console.log("No response found in cache. About to fetch from network…");
  
//         return fetch(event.request)
//           .then((response) => {
         
//             return response;
//           })
//           .catch((error) => {
//             console.error(`Fetching failed: ${error}`);
//             throw error;
//           });
//       })
//     );
//   });

const cacheName = 'v1'

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

const fetchEvent = () => {
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      cacheClone(e)
        .catch(() => caches.match(e.request))
        .then((res) => res)
    );
  });
};

fetchEvent();