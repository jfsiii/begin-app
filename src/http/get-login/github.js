const tiny = require('tiny-json-http')

/**
 * @typedef {{
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: false,
    name: string,
    company: string,
    blog: string,
    location: string,
    email: string,
    hireable: string,
    bio: string,
    twitter_username: string,
    public_repos: number,
    public_gists: number,
    followers: number,
    following: number,
    created_at: string,
    updated_at: string,
  * }} GitHubUser


/**
 *
 * @param {import('@architect/functions').HttpRequest} req
 * @returns Promise<{{
      token: string,
      name: string,
      login: string,
      id: string,
      url: string,
      avatar: string
    }}>
 */
module.exports = async function github(req) {
  try {
    let tokenRes = await tiny.post({
      url: 'https://github.com/login/oauth/access_token',
      headers: {Accept: 'application/json'},
      data: {
        code: req.query.code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_url: process.env.GITHUB_REDIRECT
      }
    })
    const {access_token: token} = tokenRes.body

    /** @type {{ body: GitHubUser, headers: Object.<string, string> }} */
    const userRes = await tiny.get({
      url: `https://api.github.com/user`,
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/json'
      }
    })
    const { body: user } = userRes;
    const response = {
      token,
      name: user.name,
      login: user.login,
      id: user.id,
      url: user.url,
      avatar: user.avatar_url,
    };

    return response
  } catch (err) {
    return {
      error: err.message
    }
  }
}
