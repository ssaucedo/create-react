import React from 'react'

import './styles.css'

const Square = props => {
  let className = 'square '
  console.log(props.gesture)
  if (props.gesture === 'swipe-left') {
    className = className + 'swipe-left'
  }

  if (props.gesture === 'swipe-right') {
    className = className + 'swipe-right'
  }


  if (props.gesture === 'circle-right') {
    className = className + 'rotate-right'
  }

  if (props.gesture === 'circle-left') {
    className = className + 'rotate-left'
  }
  return (
    <div className={className}>{'SQUARE'}</div>
  )
}

export default Square
