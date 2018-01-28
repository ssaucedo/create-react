import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const ERROR_TYPES = {
  UNHANDLED_ERROR_WHILE_MOUNTING: 'UNHANDLED_ERROR_WHILE_MOUNTING',

}

class CheckRefreshWorkerComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
      ],
      updateRequired: false,
      error: null,
    }
  }

  componentWillMount () {
    try {
      const ww = new Worker('/assets/refreshRequired.js')
      ww.onmessage = (function ({data}) {
        console.log(data)
        this.setState({updateRequired: data.updateRequired})
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

  render () {

    return (
      <div>
        <div>
          {this.state.data.map((d, key) => (
            <div key={key}>
              {`${d.id}`}
            </div>))
          }
          {
            this.state.updateRequired && (
              <div>{'REFRESH NEEDED DUDE'}</div>
            )
          }
        </div>
      </div>)
  }
}

export default CheckRefreshWorkerComponent







































