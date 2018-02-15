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

export const SidebarContent = WrappWithClassName('sidebar-content')

export const TimeSpanInput = WrappWithClassName('timespan-input')

export const Seconds = WrappWithClassName('seconds')

export const ContentContainer = WrappWithClassName('content-container')

export const AppContainer = WrappWithClassName('app-container')