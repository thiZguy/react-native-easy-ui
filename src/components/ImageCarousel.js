import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, StyleSheet } from 'react-native';

class ImageCarousel extends Component {
  constructor() {
    super();
    this.state = {
      currentPosition: 0,
    };
    this.scrolling = this.scrolling.bind(this);
  }

  componentDidMount(){
    if(this.props.automate){
      this.activeInterval = setInterval(this.scrolling, 3000);
    }
  }

  componentWillUnmount(){
    clearInterval(this.activeInterval);
  }

  scrolling() {
    const { xStepDistance, animatedMove, maxOffsetMove } = this.props;
    // Increment position with each new interval
    let position = this.state.currentPosition + xStepDistance;
    this.ticker.scrollTo({ x: position, animated: animatedMove });
    // After position passes this value, snaps back to beginning

    // Set animation to repeat at end of scroll
    if (this.state.currentPosition > maxOffsetMove) {
      this.ticker.scrollTo({ x: 0, animated: true });
      this.setState({ currentPosition: 0 });
    }
    else {
      this.setState({ currentPosition: position });
    }
  }

  render() {
    const { imageWrapperStyle, resizeMode, imageAssets } = this.props;
    return (
      <ScrollView
        horizontal={true}
        ref={(ref) => this.ticker = ref}
        style={{ flexDirection: 'row' }}
      >
        {
          imageAssets.map((element, index) => {
            return(
              <Image key={index.toString()} resizeMode={resizeMode} source={element} style={imageWrapperStyle}/>
            );
          })
        }
      </ScrollView>
    );
  }
}

ImageCarousel.propTypes = {
  automate: PropTypes.bool,
  xStepDistance: PropTypes.number,
  animatedMove: PropTypes.bool,
  maxOffsetMove: PropTypes.number,
  imageWrapperStyle: PropTypes.shape({}),
  resizeMode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'center', 'repeat']),
  imageAssets: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  imageWrapper: {
    height: 70,
    width: 110,
    marginHorizontal: 15,
    padding: 10
  }
});

ImageCarousel.defaultProps = {
  automate: false,
  xStepDistance: 200,
  animatedMove: true,
  maxOffsetMove: 550,
  imageWrapperStyle: styles.imageWrapper,
  resizeMode: 'stretch'

};



export default ImageCarousel;
