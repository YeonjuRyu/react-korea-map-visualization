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
const ButtonImage = styled.img`
  width: 12px;
  height: 12px;
`;

const ZoomButton = props => {
  return (
    <div style={{ ...props?.style, display: 'flex', flexDirection: 'column' }}>
      <ButtonContainer onClick={props.onClickZoomIn}>
        <ButtonImage src={require('../../public/icons/001-add.svg')} />
      </ButtonContainer>
      <ButtonContainer onClick={props.onClickZoomOut}>
        <ButtonImage src={require('../../public/icons/002-minus.svg')} />
      </ButtonContainer>
    </div>
  );
};

export default ZoomButton;
