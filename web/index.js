// Import dependencies
const express = require('express');
const { shopifyApi, LATEST_API_VERSION } = require('@shopify/shopify-api-node');
require('dotenv').config();

// Initialize Shopify API
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(','),
  hostName: process.env.HOST.replace(/https?:\/\//, ""),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  // You should store sessions persistently in a production app
  sessionStorage: new shopify.session.MemorySessionStorage(),
});

// Create Express app
const app = express();
const port = 3000;

// Shopify OAuth routes
app.get('/auth', async (req, res) => {
  const authUrl = await shopify.auth.begin({
    shop: shopify.utils.sanitizeShop(req.query.shop, true),
    callbackPath: '/auth/callback',
    isOnline: false,
  });
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  try {
    const session = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    // You can now use the session to make API requests
    const client = new shopify.clients.Graphql({ session });
    // For example, get the shop's name
    const shopData = await client.query({
      data: `{
        shop {
          name
        }
      }`,
    });

    // Redirect to the app's home page
    res.redirect(`/?shop=${session.shop}&host=${req.query.host}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Authentication failed');
  }
});

// App home page
app.get('/', (req, res) => {
  res.send('<h1>Shopify App Starter</h1><p>Welcome to your new Shopify app!</p>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
