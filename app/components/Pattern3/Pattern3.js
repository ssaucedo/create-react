import React from 'react'
import PropTypes from 'prop-types'
import {
  Pattern,
} from '../../containers/StyledComponents'

import Sidebar from './Sidebar'
import Modal from './Modal'

import './styles.css'

class Pattern3 extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <Sidebar
          open={this.props.isSidebarOpen}
          loading={this.props.isSidebarLoading}
          onSetOpen={this.props.onSetOpen}
          selectOption={this.props.selectOption}>
          <Pattern>
            <Modal open={this.props.isModalOpen} selectModalOption={this.props.selectModalOption}/>

            <div className="start-flow" onClick={this.props.onStartFlow}>
              {'START'}
            </div>
          </Pattern>
        </Sidebar>
      </div>
    )
  }
}

Pattern3.propTypes = {
  isSidebarOpen: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  isSidebarLoading: PropTypes.bool,
  onSetOpen: PropTypes.func,
  onStartFlow: PropTypes.func,
  selectOption: PropTypes.func,
  selectModalOption: PropTypes.func,
}

export default Pattern3