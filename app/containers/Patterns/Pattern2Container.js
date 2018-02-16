import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Pattern2 from '../../components/Pattern2/Pattern2'

class Pattern2Container extends Component {

  constructor (props) {
    super(props)
    this.startOperation = this.startOperation.bind(this)
  }


  startOperation () {
    this.props.dispatch({type: 'START_NEW_OPERATION'})
  }


  render () {
    return (
      <Pattern2 {...this.props} startOperation={this.startOperation}/>
    )
  }
}

Pattern2Container.propTypes = {
  operations: PropTypes.object,
}

const mapStateToProps = ({pattern2}) => ({
    operations: pattern2.operations,
  })

export default connect(mapStateToProps)(Pattern2Container)
