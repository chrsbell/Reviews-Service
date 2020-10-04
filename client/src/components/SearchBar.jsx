import React from 'react';
import styled from 'styled-components';
import {FlexRow, Container, Fonts} from './Constants.jsx';

const Magnifier = styled.svg`
display: flex;
height: 16px;
max-width: 50%;
margin-right: 8px;
stroke: currentcolor;
stroke-width: 3;
`;

const Input = styled.input.attrs(props => {
  debugger;
  return {
    className: props.className
  }
})`
cursor: text !important;
border: none;
outline: none;
color: rgb(34, 34, 34);
background-color: transparent;
font-family: ${Fonts.family};
font-size: ${Fonts.large};
font-weight: ${Fonts.normal};
line-height: 20px;
flex: 1 1 0%;
text-overflow: ellipsis;

@keyframes expand {
  0% {
    transform: none;
  }
  100% {
    width: 100%;
    transform: none;
  }
}

&.expand {
  animation-name: expand;
  animation-duration: 400ms;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.8, 0.2, 0.2, 0.8);
}

`;

const FlexContainer = styled.div`
display: flex;
width: 100%;
margin-left: -7vw;
margin-top: -2vh;
border: none;
color: rgb(34, 34, 34);
background-color: rgb(247, 247, 247);
align-items: center;
padding: 12px 12px 12px 16px;
border-radius: 100px;
box-shadow: rgb(176, 176, 176) 0px 0px 0px 1px inset;
`;

class SearchBar extends React.Component {
  constructor({callback}) {
    super();
    this.state = {
      expanded: ''
    }
    this.callback = callback;
  }

  expandInput(e) {
    this.setState({
      expanded: `expand`
    })
  }

  render() {
    return (
      <FlexContainer>
        <Magnifier viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g>
        </Magnifier>
        <Input className={this.state.expanded} placeholder="Search reviews" autocomplete="off" type="text" onChange={this.callback} onClick={this.expandInput.bind(this)}></Input>
      </FlexContainer>
    );
  }
}

const StyledSearchBar = styled(SearchBar)`
`;

export default StyledSearchBar;