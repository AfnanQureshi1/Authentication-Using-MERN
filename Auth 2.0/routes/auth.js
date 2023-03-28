const express = require('express');
const oauth = require('oauth');
const router = express.Router();

// Set up the OAuth 2.0 client
const client = new oauth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.BASE_URL,
  process.env.AUTHORIZE_URL,
  process.env.TOKEN_URL
);

// Redirect the user to the OAuth 2.0 login page
router.get('/login', (req, res) => {
  const redirectUrl = client.getAuthorizeUrl({
    redirect_uri: process.env.REDIRECT_URL,
    scope: process.env.SCOPE
  });
  res.redirect(redirectUrl);
});

// Handle the OAuth 2.0 callback and redirect the user to the dashboard page
router.get('/callback', (req, res) => {
  const code = req.query.code;
  client.getOAuthAccessToken(
    code,
    { grant_type: 'authorization_code', redirect_uri: process.env.REDIRECT_URL },
    (error, accessToken, refreshToken) => {
      if (error) {
        console.error(error);
        return res.redirect('/login');
      }
      // Successful authentication, redirect to dashboard page
      res.redirect('/dashboard');
    }
  );
});

module.exports = router;
