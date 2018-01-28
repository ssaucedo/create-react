import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const ERROR_TYPES = {
  UNHANDLED_ERROR_WHILE_MOUNTING: 'UNHANDLED_ERROR_WHILE_MOUNTING',

}

class WebWorkerComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: {},
      data: [],
      webWorker: null,
    }
  }

  componentWillMount () {
    try {
      const ww = new Worker('/assets/pokemonLoop.js')
      ww.onmessage = (function ({data}) {
        if (data.error) {
          this.setState({error: data.error})
        } else {
          this.setState({
            data: data.results.map(r => (
              {
                city: r.city,
                location: r.location,
                country: r.country,
                value: r.value,
              }))
          })
        }
      }).bind(this)
      this.setState({webWorker: ww}, this.start)
    } catch (e) {
      this.setState({
        error: {
          type: ERROR_TYPES.UNHANDLED_ERROR_WHILE_MOUNTING,
        }
      })
    }
  }

  start = () => {
    this.state.webWorker.postMessage({start: true})
  }

  reset = () => {
    this.state.webWorker.postMessage({reset: true})
  }

  stop = () => {
    this.state.webWorker.postMessage({stop: true})
  }

  render () {
    const style = {
      margin: 12,
    }

    return (
      <div>
        <div>
          {this.state.data.map((d, key) => (
            <div key={key}>
              {`${d.location}: ${d.value}`}
            </div>))}
        </div>
        <RaisedButton onClick={this.start} label="Start" primary={true} style={style}/>
        <RaisedButton onClick={this.reset} label="Reset" primary={true} style={style}/>
        <RaisedButton onClick={this.stop} label="Stop" primary={true} style={style}/>

      </div>)
  }
}

export default WebWorkerComponent







































