import React from 'react'

import './styles.css'
const Modal = props => {
  return props.open ? <div className='modal-container'>
    <div className='modal-content'>
      <div className="modal-confirm" onClick={() => props.selectModalOption({confirm: true})}>{'CONFIRM'}</div>
      <div className="modal-cancel" onClick={() => props.selectModalOption({cancel: true})}>{'CANCEL'}</div>
    </div>
  </div> : null
}

export default Modal

