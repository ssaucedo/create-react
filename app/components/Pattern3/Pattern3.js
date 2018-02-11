import React from 'react'
import PropTypes from 'prop-types'
import {
  Pattern,
} from '../../containers/StyledComponents'

import SelectionSidebar from './SelectionSidebar'
import ConfirmationModal from './ConfirmationModal'
import StartButton from './StartButton'

import './styles.css'

const Pattern3 = props => (
  <div style={{width: '100%', height: '100%'}}>
    <SelectionSidebar
      open={props.isSidebarOpen}
      loading={props.isSidebarLoading}
      onSetOpen={props.onSetOpen}
      selectOption={props.selectOption}>
      <Pattern>
        <ConfirmationModal open={props.isModalOpen} selectModalOption={props.selectModalOption}/>
        <StartButton onStartFlow={props.onStartFlow}/>
      </Pattern>
    </SelectionSidebar>
  </div>
)

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
