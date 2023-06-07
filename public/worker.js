console.log("hello from worker")

self.addEventListener('fetch', e => {
    if (e.request.method === 'POST' && e.request.url.endsWith('/share-target')) {
     return <>Congratz</>;
    }
  })