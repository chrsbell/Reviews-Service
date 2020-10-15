import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import StyledReview from './Review.jsx';
import StyledSearchBar from './SearchBar.jsx';
import { Animation } from './Constants.jsx';

const ScrollableFlexColumn = styled.div.attrs((props) => ({ className: props.className }))`
display: flex;
flex-direction: column;
height: 77vh;
min-width: 600px;
margin-top: 0vh;
margin-left: -136px;
margin-right: 3vw;
overflow-y: scroll;

::-webkit-scrollbar {
  width: 10px;
}

&.scroll {
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }
}

::-webkit-scrollbar-thumb {
  background: #888;
  :hover {
    background: #555;
  }
}
`;

const FlexRow = styled.div.attrs((props) => ({ className: props.justify }))`
display: flex;
flex-direction: row;
margin-bottom: 2vh;
`;

class ReviewListModal extends React.Component {
  constructor({ reviews, isExiting }) {
    super();

    // the number of reviews to load at a time
    this.numReviewsToShow = 8;
    const initialReviews = reviews.slice(0, this.numReviewsToShow);

    this.state = {
      allReviews: reviews,
      filteredReviews: reviews, // reviews filtered by search term
      viewableReviews: initialReviews, // reviews which are actually rendered
      searchTerm: '',
      isExiting,
    };

    // whether this is the modal's first time rendering list of reviews
    this.initialRender = true;
    this.scrollWindow = React.createRef();

    this.saveRef = this.saveRef.bind(this);
    this.search = this.search.bind(this);

    // list of review DOM refs
    this.refList = [];
  }

  componentDidMount() {
    this.scrollWindow.current.addEventListener('scroll', e => {
      this.checkScrollBar(e);
    });
  }

  setTransition(transition) {
    let index = 0;
    _.each(this.refList, (ref) => {
      // only show transition on viewable reviews
      if (ref.current) {
        let delay = 0;
        if (transition === 'enter') {
          // animate each review successively after the dim and modal slide animations
          delay = Number(Animation.reviewSlideDelay * (index)) + Number(Animation.modalSlideDuration)
          + Number(Animation.dimDuration);
        } else if (transition === 'exit') {
          delay = Number(Animation.reviewSlideDelay * (index));
        }
        ref.current.setDelay(delay);
        ref.current.setTransition(transition);
        index += 1;
      }
    });
  }

  // load more reviews if the scroll bar is at the bottom
  loadMoreReviews() {
    const { viewableReviews, filteredReviews } = this.state;
    const end = viewableReviews.length;
    const nextReviews = filteredReviews.slice(end, end + this.numReviewsToShow);
    const newRendered = [...viewableReviews, ...nextReviews];
    this.setState({
      viewableReviews: newRendered,
    });
  }

  // check if scrollbar is at bottom and load more reviews if it is
  checkScrollBar(e) {
    if (this.refList.length > 0) {
      const lastReview = this.refList[this.refList.length - 1].current;
      const lastContainer = lastReview.containerRef.current;
      const lastElementOffset = lastContainer.offsetTop + lastContainer.clientHeight;
      const scrollOffset = e.target.scrollTop + e.target.clientHeight + e.target.offsetTop;
      if (scrollOffset >= lastElementOffset) {
        this.loadMoreReviews();
      }
    }
  }

  // save DOM refs of filtered reviews
  saveRef(ref) {
    // this.refList.push(ref);
  }

  // filter the rendered reviews by the search term
  search(e) {
    // clear the ref list so already rendered reviews don't
    // clash with filtered ones within checkScrollBar
    this.refList.splice(0);
    const searchTerm = e.target.value.toLowerCase();
    this.setState({
      searchTerm,
    });
    let filtered = null;

    const { allReviews } = this.state;

    if (searchTerm) {
      filtered = _.filter(allReviews, (review) => {
        return review.reviewText.toLowerCase().includes(searchTerm)
        || review.name.toLowerCase().includes(searchTerm)
        || review.month.toLowerCase().includes(searchTerm)
        || review.year.toLowerCase().includes(searchTerm);
      });
    } else {
      // show all rendered reviews
      filtered = allReviews;
    }
    this.setState({
      filteredReviews: filtered,
      viewableReviews: null,
    }, () => {
      // this is a workaround to make sure the state updates with viewable reviews
      this.setState({
        viewableReviews: filtered.slice(0, this.numReviewsToShow),
      });
    });
  }

  render() {
    const { viewableReviews, searchTerm } = this.state;
    const areViewableReviews = viewableReviews && viewableReviews.length >= 0;
    // React review components generated here to keep return statement a bit cleaner
    let reviewComponents = null;
    if (areViewableReviews) {
      reviewComponents = _.map(viewableReviews, (review, i) => {
        const transition = this.initialRender ? 'enter' : null;
        const reviewRef = React.createRef();
        this.refList.push(reviewRef);
        return (
          <StyledReview
            ref={reviewRef}
            text={review.reviewText}
            name={review.name}
            month={review.month}
            year={review.year}
            userIcon={review.userIcon}
            key={(i)}
            transition={transition}
            callback={this.saveRef}
            isModal
            searchTerm={searchTerm}
          />
        );
      }, this);
      // only show review transition effect once on modal
      if (this.initialRender) {
        this.initialRender = false;
      }
    } else {
      // empty placeholder to maintain modal width
      reviewComponents = [<StyledReview text="" name="" month="" year="" userIcon="" key={-1} />];
    }
    return (
      <>
        <FlexRow>
          <StyledSearchBar callback={this.search} />
        </FlexRow>
        <FlexRow>
          {/* only show the scroll bar track if there are viewable reviews */}
          <ScrollableFlexColumn className={areViewableReviews ? 'scroll' : null} ref={this.scrollWindow}>
            {reviewComponents}
          </ScrollableFlexColumn>
        </FlexRow>
      </>
    );
  }
}

const StyledReviewListModal = styled(ReviewListModal)`
`;

export default StyledReviewListModal;
