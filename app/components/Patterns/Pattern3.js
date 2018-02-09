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
      open: false,
      transitions: true,
      shadow: true,
      pullRight: true,
    }
  }

  menuButtonClick = (ev) => {
    this.setState({open: !this.state.open})
  }

  render () {

    const sidebarProps = {
      sidebar: sidebar,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      shadow: this.state.shadow,
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