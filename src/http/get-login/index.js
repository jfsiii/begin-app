const arc = require('@architect/functions')
const github = require('./github')

/** @type {import('@architect/functions').HttpHandler} */
async function login(req) {
  let account
  if (req.queryStringParameters.code) {
    try {
      account = await github(req)
    } catch (err) {
      return {
        statusCode: err.code,
        body: err.message
      }
    }

    const session = {
      ...req.session,
      account
    };

    const response = {
      session,
      location: '/'
    };

    return response
  } else {
    return {
      location: '/'
    }
  }
}

exports.handler = arc.http.async(login)
