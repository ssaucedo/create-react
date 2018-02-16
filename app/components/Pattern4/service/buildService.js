import axios from 'axios'


const path = 'http://localhost:3100'

const GetRequest = (url) => {
  return new Promise(function (resolve, reject) {
    axios({method: 'GET', url})
      .then(res => resolve(res.data))
      .catch(error => reject(error))
  })
}

function getAPIVersion () {
  return GetRequest(`${path}/api/version`)
}

function getBuilds () {
  return GetRequest(`${path}/builds`)
}

export default {
  name:'buildService',
  getAPIVersion,
  getBuilds,
}

