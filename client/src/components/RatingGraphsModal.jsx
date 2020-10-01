import React from 'react';
import styled from 'styled-components';
import StyledBarGraph from './BarGraph.jsx';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`;

const Container = styled.div`
display: inline-block;
max-width: 100vw;
`;

const RatingGraphsColumn = ({ratings}) => {
  return (
    <Container>
        <StyledBarGraph text='Cleanliness' rating={ratings.cleanliness}></StyledBarGraph>
        <StyledBarGraph text='Accuracy' rating={ratings.accuracy}></StyledBarGraph>
        <StyledBarGraph text='Communication' rating={ratings.communication}></StyledBarGraph>
        <StyledBarGraph text='Location' rating={ratings.location}></StyledBarGraph>
        <StyledBarGraph text='Check-in' rating={ratings.checkIn}></StyledBarGraph>
        <StyledBarGraph text='Value' rating={ratings.value}></StyledBarGraph>
    </Container>
  );
}

const StyledRatingGraphsColumn = styled(RatingGraphsColumn)`
display: inline-block;
`;

export default StyledRatingGraphsColumn;