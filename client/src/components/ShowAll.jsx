import React from 'react';
import styled from 'styled-components';
import {FlexColumn, Container, animation, Fonts} from './Constants.jsx';

const Button = styled.button.attrs(props =>
  ({className: props.className})
)`
border-radius: 8px;
color: rgb(34, 34, 34);
border-style: solid;
border-width: 1px;
border-color: rgb(34, 34, 34);
background-color: white;
display: flex;
justify-content: center;
text-align: center;
padding: 13px 23px;
margin-left: -20px;
max-width: 12vw;
max-height: 8vh;
outline:none;
font-weight: ${Fonts.bold};
font-family: ${Fonts.family};
font-size: ${Fonts.large};
transition-duration: 0.5s;
cursor: pointer;
mix-blend-mode: multiply;
:hover{
  background-color: rgb(247, 247, 247);
}

@keyframes press {
  0% {
    transform: scale(1.0, 1.0);;
  }

  10% {
    transform: scale(0.8, 0.8);
  }

  100% {
    transform: scale(0.9, 0.9);
  }
}

&.clicked {
  animation-name: press;
  animation-duration: ${animation.clickDuration}ms;
  animation-fill-mode: both;
  animation-timing-function: linear;
}

`;

class ShowAll extends React.Component {
  constructor({numReviews, onClick}) {
    super();
    this.state = {
      clicked: false,
      numReviews: numReviews,
      className: null
    }
    this.onClick = onClick;
  }


  click(e) {
    this.setState({
      className: `clicked`
    }, () => {
      this.onClick(e);
    });
  }

  render() {
    return (
      <FlexColumn>
        <Container>
          <Button onClick={this.click.bind(this)} className={this.state.className}>{`Show all ${this.state.numReviews} reviews`}</Button>
        </Container>
      </FlexColumn>
    );
  }
}

const StyledShowAll = styled(ShowAll)`
`;

export default StyledShowAll;