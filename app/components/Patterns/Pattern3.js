import React from 'react'
import PropTypes from 'prop-types'
import {
  Pattern,
} from '../../containers/StyledComponents'

import Sidebar from '../Sidebar'

const sidebar = <div style={{width: '100%', height: '100%'}}>{'AHHHH'}</div>

import '../styles.css'

class Pattern3 extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: true,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
    }
  }

  menuButtonClick = (ev) => {
    this.setState({open: !this.state.open})
  }

  render () {

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    }

    return (

      <div style={{width: '100%', height: '100%'}}>
        <Sidebar {...sidebarProps} onSetOpen={this.menuButtonClick}>
          <Pattern>
            <a onClick={this.menuButtonClick}>{'OPEN'}</a>
          </Pattern>
        </Sidebar>

      </div>

    )
  }
}

Pattern3.propTypes = {
  isSidebarOpen: PropTypes.bool,
}

export default Pattern3