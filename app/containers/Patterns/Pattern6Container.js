import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Pattern6 from '../../components/Pattern6/Pattern6';

class Pattern6Container extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.dispatch = dispatch;
    this.operations = {
      onChangeTimeSpan: this.onChangeTimeSpan.bind({ dispatch }),
      onChangeSearchQuery: this.onChangeSearchQuery.bind(this),
      addCycle: this.addCycle.bind({ dispatch }),
      displayCycle: this.displayCycle.bind({ dispatch }),
      removeCycle: this.removeCycle.bind({ dispatch }),
    };
  }

  onChangeTimeSpan(e, value) {
    this.dispatch({ type: 'UPDATE_TIME_SPAN', payload: { span: Math.round(value) } });
  }

  onChangeSearchQuery(e, value) {
    this.dispatch({ type: 'UPDATE_SEARCH_QUERY_SAGA', payload: { searchQuery: value } });
  }

  addCycle() {
    this.dispatch({ type: 'ADD_NEW_CYCLE' });
  }

  displayCycle(cycleId) {
    this.dispatch({ type: 'DISPLAY_CYCLE', payload: { cycleId } });
  }

  removeCycle(cycleId) {
    this.dispatch({ type: 'REMOVE_CYCLE', payload: { cycleId } });
  }

  render() {
    return (
      <Pattern6 {...this.props} {...this.operations}/>
    );
  }
}

Pattern6Container.propTypes = {
  displaying: PropTypes.string,
  cycles: PropTypes.object,
  timeSpan: PropTypes.number,
  searchQuery: PropTypes.string,
  tweets: PropTypes.object,
};

const mapStateToProps = ({ pattern6, tweets }) => {
  const { displaying } = pattern6;
  return {
    displaying,
    errors: pattern6.errors,
    cycles: pattern6.cycles,
    timeSpan: pattern6.cycles[displaying].timeSpan,
    searchQuery: pattern6.cycles[displaying].searchQuery,
    tweets: tweets.tweets[displaying] || {},
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Pattern6Container);
