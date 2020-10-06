import React from 'react';
import styled from 'styled-components';
import {FlexRow, Container, Fonts, margins} from './Constants.jsx';

const Header = styled.h1`
display: inline-block;
font-family: ${Fonts.family};
font-weight: ${Fonts.bold};
font-size: ${props => props.fontSize};
margin-left: ${props => props.marginLeft};
margin-bottom: -5vh;
`;

const Star = styled.img`
display: inline-block;
mix-blend-mode: multiply;
margin-left: ${props => props.marginLeft};
margin-right: 10px;
max-width: ${props => props.imageSize};
`;

const RatingOverview = ({average, numReviews, isModal}) => {
  // size of text/star depends on whether this is a modal or not
  const fontSize = isModal ? Fonts.largeHeader : Fonts.header;
  const imageSize = isModal ? margins.modalImageSize : margins.imageSize;
  const marginLeft = isModal ? `10px` : `5px`;
  return (
    <FlexRow>
      <Container className='header'>
        <Star marginLeft={marginLeft} imageSize={imageSize} src="/static/star.png"></Star>
        <Header marginLeft={marginLeft} fontSize={fontSize}>{`${average} (${numReviews} reviews)`}</Header>
      </Container>
    </FlexRow>
  );
}

const StyledRatingOverview = styled(RatingOverview)`
`;

export default StyledRatingOverview;