let arc = require('@architect/functions')

async function reset(req) {
  const {count, ...rest} = req.session
  return {
    session: rest || {},
    location: '/'
  }
}

exports.handler = arc.http.async(reset)
