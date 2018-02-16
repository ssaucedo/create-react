import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pattern1Container from '../containers/Patterns/Pattern1Container';
import Pattern2Container from '../containers/Patterns/Pattern2Container';
import Pattern3Container from '../containers/Patterns/Pattern3Container';
import Pattern6Container from '../containers/Patterns/Pattern6Container';

const ContentResolver = (props) => {
  switch (props.pattern) {
    case 'PATTERN_1':
      return <Pattern1Container />;
    case 'PATTERN_2':
      return <Pattern2Container />;
    case 'PATTERN_3':
      return <Pattern3Container />;
    case 'PATTERN_6':
      return <Pattern6Container />;
    default:
      return null;
  }
};

const mapStateToProps = state => ({
  pattern: state.uiStore.content.pattern,
});

ContentResolver.propTypes = {
  pattern: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ContentResolver);
