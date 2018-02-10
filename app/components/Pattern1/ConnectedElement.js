import React from 'react'
import styled from "styled-components";
import PropTypes from 'prop-types'


const StyledText = styled.p`
  color: palevioletred;
`;

const Wrapper = styled.div`
    background: lightblue;
    width: 50%;
    margin: auto;
    text-align: center;
    margin-top: 10%;
    border-radius: 2px;
    cursor: pointer;
`;

const ConnectedElement = (props) => {
  return (
      <Wrapper onClick={() => props.dispatch({type: 'CONNECTED_ELEMENT_INTERACTION', payload: {}})}>
        <StyledText>{'Connected'}</StyledText>
      </Wrapper>
  )
}

ConnectedElement.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default ConnectedElement
