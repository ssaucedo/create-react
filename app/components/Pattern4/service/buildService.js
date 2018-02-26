import axios from 'axios';


const path = 'http://localhost:3100';

const GetRequest = url => new Promise(((resolve, reject) => {
  axios({ method: 'GET', url })
    .then(res => resolve(res.data))
    .catch(error => reject(error));
}));

function getAPIVersion() {
  return GetRequest(`${path}/api/version`);
}

function getBuilds() {
  return GetRequest(`${path}/builds`);
}

function getUsers() {
  return GetRequest(`${path}/users`);
}

export default {
  name: 'buildService',
  getAPIVersion,
  getBuilds,
  getUsers,
};

