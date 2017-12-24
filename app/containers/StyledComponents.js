import React from 'react'
import './styles.css'

const WrappWithClassName = (className) =>  props => {
  return (
      <div className={className}>
        {props.children}
      </div>
  );
}

export const MainContainer = WrappWithClassName('main-container')

export const SidebarContainer = WrappWithClassName('sidebar-container')

export const ContentContainer = WrappWithClassName('content-container')

export const Pattern = WrappWithClassName('pattern')

export const FlowSwitch = WrappWithClassName('flow-switch')

export const AppContainer = WrappWithClassName('app-container')
