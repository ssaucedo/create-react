import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'
const ConfirmationModal = props => {
  return props.open ? <div className='modal-container'>
    <div className='modal-content'>
      <div className="modal-confirm" onClick={() => props.selectModalOption({confirm: true})}>{'CONFIRM'}</div>
      <div className="modal-cancel" onClick={() => props.selectModalOption({cancel: true})}>{'CANCEL'}</div>
    </div>
  </div> : null
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  selectModalOption: PropTypes.func.isRequired,
}

export default ConfirmationModal

