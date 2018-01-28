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
  if (data.start) {
    setInterval(() => getMeasurements.call(this), 2000)
  }
}

function getMeasurements () {
  console.log(this.state.page)
  let page = this.state.page
  this.updateState({page: ++page})
  if (page >= 3) {
    postMessage({updateRequired: true})
  } else {
    postMessage({updateRequired: false})
  }
}
