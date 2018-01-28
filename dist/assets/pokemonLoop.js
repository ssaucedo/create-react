/*
 *  OpenAirData: https://docs.openaq.org/#api-Measurements
 */

this.state = {
  page: 0,
  intervalId: null
}

this.updateState = (update) => {
  this.state = {
    ...this.state,
    ...update,
  }
}

onmessage = function ({data}) {
  if(data.start) {
    const intervalId = setInterval(() => getMeasurements.call(this), 3000)
    this.updateState({intervalId})
  } else if(data.reset) {
    this.updateState({page: 0})
  } else if(data.stop) {
    clearInterval(this.state.intervalId);
    this.updateState({intervalId: null})
  }
}

function getMeasurements () {
  let page = this.state.page
  this.updateState({page: ++page})
  fetch(`https://api.openaq.org/v1/measurements?limit=3&page=${page}`, {
    mode: 'cors',
  }).then(res => {
      return res.json()
  }).then(json => {
    postMessage(json)
  }).catch(e => {
    postMessage({
      error: 'Unexpected error in worker promise',
      params: {id},
      cause: JSON.stringify(e)
    })
  })
}
