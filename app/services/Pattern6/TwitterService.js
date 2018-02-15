import axios from 'axios'

const path = 'http://localhost:3000'

const GetRequest = (url) => {
  return new Promise(function (resolve, reject) {
    axios({method: 'GET', url})
      .then(res => resolve(res.data))
      .catch(error => reject(error))
  })
}

export function searchTwits (searchWord) {
  return new GetRequest(`${path}/?q=${searchWord}`).then(twitts => twitts.map(t => ({
    id: t.id,
    text: t.text,
    user: {
      name: t.user.name,
      userImage: t.user.profile_image_url,
    }
  })))
}

export function getTwitDetails (twitId) {
  return new GetRequest(`${path}/twit/?id=${twitId}`).then(t => {
      try {
        const twit = t[0]
        if (twit.errors !== undefined) {
          return {
            error: twit,
          }
        } else {
          return {
            id: String(twit.id_str),
            text: twit.text,
            user: {
              name: twit.user.name,
              userImage: twit.user.profile_image_url,
            }
          }
        }
      } catch (e) {
        return {
          error: 'UNHANDLED ERROR ON TWITTER SERVICE',
        }
      }
    }
  )
}
