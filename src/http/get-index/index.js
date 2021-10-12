const arc = require('@architect/functions')
const render = require('./render')

/** @type {import('@architect/functions').HttpHandler} */
async function home(req) {
  const {count=0, account} = req.session

  const clientID = process.env.GITHUB_CLIENT_ID
  const redirectURL = process.env.GITHUB_REDIRECT
  const oAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_url=${redirectURL}`;

  return {
    html: await render({
      count,
      account,
      oAuthUrl
    })
  }
}

exports.handler = arc.http.async(home)
