import React from 'react'
import PropTypes from 'prop-types'
import {
  Pattern,
} from '../../containers/StyledComponents'

import Sidebar from '../Sidebar'

import '../styles.css'

class Pattern3 extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <Sidebar open={this.props.isSidebarOpen} onSetOpen={this.onSetOpen}>
          <Pattern>
            <a onClick={() => this.onSetOpen()}>{'OPEN'}</a>
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