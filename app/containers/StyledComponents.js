import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

/* eslint-disable react/display-name, react/prop-types */

const WrappWithClassName = className => props => (
  <div className={className}>
    {props.children}
  </div>
);

WrappWithClassName.propTypes = {
  children: PropTypes.node,
};

export const MainContainer = WrappWithClassName('main-container');

export const SidebarContainer = WrappWithClassName('sidebar-container');

export const ContentContainer = WrappWithClassName('content-container');

export const Pattern = WrappWithClassName('pattern');

export const FlowSwitch = WrappWithClassName('flow-switch');

export const AppContainer = WrappWithClassName('app-container');
