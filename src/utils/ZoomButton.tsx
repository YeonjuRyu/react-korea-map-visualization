import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const ZoomButton = props => {
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
        rel="stylesheet"></link>
      <div
        style={{ ...props?.style, display: 'flex', flexDirection: 'column' }}>
        <ButtonContainer onClick={props.onClickZoomIn}>
          <i className="fas fa-plus" />
        </ButtonContainer>
        <ButtonContainer onClick={props.onClickZoomOut}>
          <i className="fas fa-minus" />
        </ButtonContainer>
      </div>
    </>
  );
};

export default ZoomButton;
