let arc = require('@architect/functions')

/** @type {import('@architect/functions').HttpHandler} */
async function logout(req) {
  const {account, ...rest} = req.session
  return {
    session: rest || {},
    location: '/'
  }
}

exports.handler = arc.http.async(logout)
