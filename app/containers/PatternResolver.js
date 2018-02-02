import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Pattern1Container from '../containers/Patterns/Pattern1Container'
import Pattern2 from '../containers/Patterns/Pattern2'
import Pattern3 from '../containers/Patterns/Pattern3'


const ContentResolver = props => {

  switch (props.pattern) {
    case 'PATTERN_1':
      return <Pattern1Container/>
    case 'PATTERN_2':
      return <Pattern2/>
    case 'PATTERN_3':
      return <Pattern3/>
  }
}

const mapStateToProps = state => {
  return {
    pattern: state.uiStore.content.pattern,
  }
}

ContentResolver.propTypes = {
  pattern: PropTypes.string.isRequired,
}


export default connect(mapStateToProps)(ContentResolver)
