import Leap from 'leapjs'

import {head, pick} from 'ramda'




var controller = new Leap.Controller()
controller.connect()
controller.setBackground(true)
controller.on('frame', function (frame) {
  if(frame.gestures.length !== 0) {
    console.log(pick(['id', 'type'], head(frame.gestures)))
  }
})