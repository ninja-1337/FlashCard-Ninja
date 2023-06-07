console.log("hello from worker")

self.addEventListener('fetch', e => {
    if (e.request.method === 'POST' && e.request.url.endsWith('/share-target')) {
     return <>Congratz</>;
    }
  })

  function isPushSupported() {
    //checks if user has granted permission to Push notifications
    if (Notification.permission === 'denied') {
      alert('User has blocked push notification.');
      return;
    }
 
    //Checks if current browser supports Push notification
    if (!('PushManager' in window)) {
      alert('Sorry, Push notification isn\'t supported in your browser.');
      return;
    }
    }
  
    
function subscribePush() {
    //Subscribes user to Push notifications
    registration.pushManager.subscribe({
      userVisibleOnly: true //Set user to see every notification
    })
    .then(function (subscription) {
      toast('Subscribed successfully.');
      console.info('Push notification subscribed.');
      console.log(subscription);
    })
    .catch(function (error) {
      console.error('Push notification subscription error: ', error);
    });
  }

  subscribePush();

  self.addEventListener('push', (event) => {
    let body
    if (event.data) {
      //You can set an original message by passing it on the event.
      body = event.data.text()
    } else {
      body = 'Default body'
    }
   
    const options = {
      body: body,
      icon: '/your icon image',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
    }
    event.waitUntil(
      self.registration.showNotification('Your Message Title',    
      options))
  })