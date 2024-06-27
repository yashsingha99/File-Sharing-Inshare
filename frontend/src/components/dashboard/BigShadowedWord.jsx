import React from 'react'
import styled from 'styled-components';

const StyledWord = styled.span`
  font-size: 5rem; // large text
  font-weight: bold;
  font-style: italic; // italic
  text-shadow: 24px 12px 36px rgba(0, 0, 0, 1); // shadow
  color: #333; // text color
  margin: 20px;
`;

const BigShadowedWord = ({child}) => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <StyledWord>{child}</StyledWord>
    </div>
  );


export default BigShadowedWord