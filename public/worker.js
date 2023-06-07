export const handleSubscription = (user) => {
    'use strict'
    const axios = require('axios')
    let isSubscribed = false
    let swRegistration = null
    let anyReminder = false
  
    //user object holds the user's reminder opt-in status as boolean.
    //checking if the user opted-in any of our reminder option
    if (Object.values(user).some((val) => val === true)) anyReminder = true
  
    if (!('Notification' in window)) {
      console.log('Notifications not supported in this browser')
      return
    }
  
    function initializeUI() {
      // If user opted-in any of the reminder, get subscription data and send it to the server / database.
      if (anyReminder) {
        swRegistration.pushManager.getSubscription().then((subscription) => {
          isSubscribed = subscription !== null
  
          if (isSubscribed) {
            updateSubscriptionOnServer(user.id, subscription)
            console.log('User IS subscribed.')
          } else {
            subscribeUser()
          }
        })
      } else {
        //If the user outed-out the reminder, unscribe the user.
        unsubscribeUser()
      }
    }
  
    const applicationServerPublicKey =
      'YOUR_VAPID_PUBLIC_KEY'
  
    function subscribeUser() {
      //Prompt user permission for notification
      Notification.requestPermission((status) => {
        console.log('Notification permission status:', status)
      })
      //If the browser has a permission, process subscribing the user.
      if (Notification.permission === 'granted') {
        const applicationServerKey = urlB64ToUint8Array(
          applicationServerPublicKey
        )
        swRegistration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey,
          })
          .then((subscription) => {
            console.log('User is subscribed:', subscription)
  
            updateSubscriptionOnServer(user.id, subscription)
  
            isSubscribed = true
          })
          .catch((err) => {
            if (Notification.permission === 'denied') {
              console.warn('Permission for notifications was denied')
            } else {
              console.error('Failed to subscribe the user: ', err)
            }
          })
      }
    }
  
    function unsubscribeUser() {
      let userSubsctiption
      swRegistration.pushManager
        .getSubscription()
        .then((subscription) => {
          if (subscription) {
            userSubsctiption = subscription
            return subscription.unsubscribe()
          }
        })
        .catch((err) => {
          console.log('Error unsubscribing', err)
        })
        .then(() => {
        //If user already have subscriotion with the app, remove the data from the database.
          if (userSubsctiption) {
            updateSubscriptionOnServer(user.id, userSubsctiption, null)
          }
          console.log('User is unsubscribed')
          isSubscribed = false
        })
    }
  
    async function updateSubscriptionOnServer(
      userId,
      subscription,
      unsubscribe = 'No'
    ) {
      // Here's where you would send the subscription to the application server/database
      //if the action is subscribe. make POST request to the server with user's subscription data.
      try {
        if (unsubscribe) {
          await axios.post(`/api/subscribe/${userId}`, subscription)
  
          //if the action is unsubscribe. make DELETE request to remove user's subscription from database.
        } else {
          await axios.delete(`/api/subscribe/${userId}`)
          console.log('User is not subscribed')
        }
      } catch (error) {
        console.log('Update Subscription failed', error)
      }
    }
  
    //parsing the VAPID key to correct format.
    function urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')
  
      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)
  
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    }
  
    //Resister service worker.
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        console.log('Service Worker and Push is supported??')
  
        navigator.serviceWorker
          .register('sw.js')
          .then((swReg) => {
            console.log(
              'ServiceWorker registration successful with scope: ',
              swReg.scope
            )
            swRegistration = swReg
  
            initializeUI()
          })
          .catch((err) => {
            console.error('Service Worker Error', err)
          })
      })
    } else {
      console.warn('Push messaging is not supported')
    }
  }