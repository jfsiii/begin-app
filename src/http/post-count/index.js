let arc = require('@architect/functions')

async function counter(req) {
  const start = req.session.count || 0;
  const delta = parseInt(req.query.delta, 10) ?? 0;
  const count = start + delta;

  return {
    session: {
      ...req.session,
      count
    },
    location: '/'
  }
}

exports.handler = arc.http.async(counter)
