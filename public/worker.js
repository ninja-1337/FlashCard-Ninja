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