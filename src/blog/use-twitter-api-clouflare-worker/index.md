---
title: Sending a message with the Twitter API in a Cloudflare worker
date: '05/01/2022'
description: Use and authenticate with the Twitter API in a non node.js environment
---

If you are trying to use the Twitter API, you probably saw many examples using the `twitter-api-v2` npm package which works fine in Node.js but unfortunately does not work in a Cloudflare Worker as it relies on Node.js APIs.

In order to use the Twitter API, you have to handle the OAuth authentication and use `fetch` to send the request. At the time I wrote this post there were no examples of this, so it took me some time to figure out how to do it. The following snippet shows you how to send a tweet, but you can use any API method you want.

```ts
import OAuth from 'oauth-1.0a';
import { HmacSHA1, enc } from 'crypto-js';

const oauth = new OAuth({
  consumer: { key: TWITTER_API_KEY, secret: TWITTER_API_SECRET },
  signature_method: 'HMAC-SHA1',
  hash_function(baseString, key) {
    return HmacSHA1(baseString, key).toString(enc.Base64);
  },
});

const oauthToken = {
  key: TWITTER_ACCESS_TOKEN,
  secret: TWITTER_ACCESS_TOKEN_SECRET,
};

const requestData = {
  url: 'https://api.twitter.com/1.1/statuses/update.json',
  method: 'POST',
  data: { status: 'Hello from Cloudflare worker' },
};

const response = await fetch(requestData.url, {
  method: requestData.method,
  headers: {
    ...oauth.toHeader(oauth.authorize(requestData, oauthToken)),
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams(requestData.data),
});

console.log(await response.json());
```
