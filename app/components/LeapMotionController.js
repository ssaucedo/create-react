import React from 'react'

import Leap from 'leapjs'
import { head, sum, takeLast } from 'ramda'

import Square from './Square'

class LeapMotionController extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      controller: null,
      currentGesture: null,
      gestureState: null,
      gestureStack: [],
      framesStack: []
    }
  }

  componentWillMount () {
    var controller = new Leap.Controller()
    controller.connect()
    controller.on('frame', this.handleFrames)
    this.setState({
      controller
    })
  }

  handleFrames = (frame) => {
    if (frame.gestures.length !== 0) {
      const gesture = head(frame.gestures)
      console.log(gesture.type)
      const latest = takeLast(3, this.state.gestureStack)
      if (latest.length !== 0 && latest.every(g => g.type === gesture.type)) {
        let gestureType = gesture.type
        if (gestureType === 'swipe') {
          const s = sum(this.state.gestureStack.map(l => (l.direction || [])[0]))
          if (s > 0) {
            gestureType = 'swipe-right'
          } else {
            gestureType = 'swipe-left'
          }
        }

        if (gestureType === 'circle') {
          const pointableID = gesture.pointableIds[0]
          const direction = frame.pointable(pointableID).direction
          const dotProduct = Leap.vec3.dot(direction, gesture.normal)
          let clockwise = dotProduct > 0
          if (clockwise) {
            gestureType = 'circle-right'
          } else {
            gestureType = 'circle-left'
          }
        }
        this.setState({currentGesture: gestureType})
      }
      this.setState({gestureStack: [...takeLast(5, this.state.gestureStack), gesture]})
    }
  }

  render () {

    return (
      <div>
        <Square gesture={this.state.currentGesture}/>
      </div>)
  }
}

export default LeapMotionController







































