function handlePushEvent(event) {
  const DEFAULT_TAG = 'web-push-book-example-site'
  return Promise.resolve()
  .then(() => {
    return event.data.json();
  })
  .then((data) => {
    const title = data.notification.title;
    const options = data.notification;
    if (!options.tag) {
      options.tag = DEFAULT_TAG;
    }
    return registration.showNotification(title, options);
  })
  .catch((err) => {
    console.error('Push event caused an error: ', err);

    const title = 'Message Received';
    const options = {
      body: event.data.text(),
      tag: DEFAULT_TAG
    };
    return registration.showNotification(title, options);
  });
}

self.addEventListener('push', function(event) {
  event.waitUntil(handlePushEvent(event));
});

const doSomething = (url) => {
  console.log('trigger url' + url)
  clients.openWindow(url)
  return Promise.resolve();
};

// This is here just to highlight the simple version of notification click.
// Normally you would only have one notification click listener.
/**** START simpleNotification ****/
self.addEventListener('notificationclick', function(event) {
  console.log('click sa mere ' + event.notification.data.url)
  const clickedNotification = event.notification;
  clickedNotification.close();

  // Do something as the result of the notification click
  const promiseChain = doSomething(event.notification.data.url);
  event.waitUntil(promiseChain);
});
/**** END simpleNotification ****/
