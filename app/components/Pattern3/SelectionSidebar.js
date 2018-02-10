import React, { Component } from 'react'
import PropTypes from 'prop-types'

const defaultStyles = {
  root: {
    className: 'root-sidebar',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  sidebar: {
    position: 'absolute',
    width: '30%',
    height: '100%',
    zIndex: 2,
    transition: 'transform .3s ease-out',
    willChange: 'transform',
  },
  content: {
    position: 'absolute',
    transition: 'left .3s ease-out, right .3s ease-out',
  },
  overlay: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out, visibility .3s ease-out',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
}

class SelectionSidebar extends Component {

  constructor (props) {
    super(props)
    this.saveSidebarRef = this.saveSidebarRef.bind(this)
  }

  saveSidebarRef (node) {
    this.sidebar = node
  }

  render () {
    const sidebarStyle = {...defaultStyles.sidebar}
    const contentStyle = {...defaultStyles.content}
    const overlayStyle = {...defaultStyles.overlay}
    const rootProps = {
      style: {...defaultStyles.root},
      role: 'navigation',
    }

    if (this.props.pullRight) {
      sidebarStyle.right = 0
      sidebarStyle.transform = 'translateX(100%)'
      if (this.props.shadow) {
        sidebarStyle.boxShadow = '-2px 2px 4px rgba(0, 0, 0, 0.15)'
      }
    } else {
      sidebarStyle.left = 0
      sidebarStyle.transform = 'translateX(-100%)'
      if (this.props.shadow) {
        sidebarStyle.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)'
      }
    }

    if (this.props.open) {
      // slide open sidebar
      sidebarStyle.transform = `translateX(0%)`

      // show overlay
      overlayStyle.opacity = 1
      overlayStyle.visibility = 'visible'
    }

    if (!this.props.transitions) {
      sidebarStyle.transition = 'none'
      contentStyle.transition = 'none'
      overlayStyle.transition = 'none'
    }
    return (
      <div {...rootProps}>
        <div className='custom-sidebar-class' style={sidebarStyle} ref={this.saveSidebarRef}>
          <div style={{width: '100%', height: '100%'}}>
            {
              this.props.loading ? <div>{'LOADING'}</div> : (
                <div>
                  <div className="next-selection-flow"
                       onClick={() => this.props.selectOption({next: true})}>{'NEXT'}</div>
                  <div className="cancel-flow" onClick={() => this.props.selectOption({cancel: true})}>{'CANCEL'}</div>
                </div>
              )
            }
          </div>
        </div>
        <div className={this.props.overlayClassName}
             style={overlayStyle}
             role="presentation"
             tabIndex="0"
             onClick={() => this.props.selectOption({cancel: true})}
        />
        <div style={{width: '100%', height: '100%'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

SelectionSidebar.defaultProps = {
  open: false,
  transitions: true,
  pullRight: true,
  shadow: true,
  styles: {},
}

SelectionSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  transitions: PropTypes.bool,
  pullRight: PropTypes.bool,
  shadow: PropTypes.bool,
  onSetOpen: PropTypes.func.isRequired,
  selectOption: PropTypes.func.isRequired,
}

export default SelectionSidebar
