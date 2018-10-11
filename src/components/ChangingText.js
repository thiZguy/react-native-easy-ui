import React from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default class ChangingText extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      animationValue: new Animated.Value(2),
      animationOpacity: new Animated.Value(1),
      dataIndex: 0,
    };
    this.changeAnimation = this.changeAnimation.bind(this);
    this.showNext = this.showNext.bind(this);
    this.showPrevious = this.showPrevious.bind(this);

    this.slideAnimate = this.slideAnimate.bind(this);
    this.fadeAnimate = this.fadeAnimate.bind(this);

    if(!props.data || props.data.length === 0) {
      console.warn('please enter at least one element in data array prop');
    }
  }

  componentDidMount(){
    this.changeAnimation('forward');
    if(this.props.autoAnimate){
      this.interval = setInterval(() => this.showNext(), 10000);
    }
  }

  showNext(){
    this.changeAnimation('forward');
    const { dataIndex } = this.state;
    const { data } = this.props;
    if(dataIndex+1 > data.length-1){
      setTimeout(()=>{
        this.setState({ dataIndex: 0 });
      }, 500);
      return;
    }
    setTimeout(()=>{
      this.setState({ dataIndex: dataIndex + 1 });
    }, 500);
  };

  showPrevious(){
    this.changeAnimation('backwards');
    const { dataIndex } = this.state;
    const { data } = this.props;
    if(dataIndex===0){
      setTimeout(()=>{
        this.setState({ dataIndex: data.length-1 });
      }, 500);
      return;
    }
    setTimeout(()=>{
      this.setState({ dataIndex: dataIndex-1 });
    }, 500);
  };
//INTERVAL WITH AUTOANIMATE HAS TO RESPECT ONPRESS ANIMATION
  changeAnimation(direction) {
    const { effect } = this.props;
    switch (effect) {
      case 'slide':
        this.slideAnimate(direction);
        break;
      case 'fade':
        this.fadeAnimate();
        break;
      default:
        this.fadeAnimate();
        break;
    }
  };

  fadeAnimate(){
    Animated.sequence([
      // decay, then spring to start and twirl
      Animated.spring(
        this.state.animationOpacity,
        {
          toValue: 0,
          // duration: 100,
          userNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.animationOpacity,
        {
          toValue: 1,
          duration: 200,
          userNativeDriver: true
        }
      ),
    ]).start();
  }

  slideAnimate(direction){
    Animated.sequence([
      // decay, then spring to start and twirl
      Animated.timing(
        this.state.animationValue,
        {
          toValue: direction==='forward' ? -1 : 1,
          duration: 200,
          userNativeDriver: true,
          easing: Easing.back(),
        },
      ),
      Animated.timing(
        this.state.animationOpacity,
        {
          toValue: 0,
          duration: 100,
          userNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.animationValue,
        {
          toValue: direction==='forward' ? 1 : -1,
          duration: 200,
          userNativeDriver: true,
          easing: Easing.back(),
        },
      ),
      Animated.timing(
        this.state.animationOpacity,
        {
          toValue: 1,
          duration: 100,
          userNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.animationValue,
        {
          toValue: 0,
          duration: 300,
          userNativeDriver: true,
          easing: Easing.back(),
        }
      ),
    ]).start();
  }

  componentWillUnmount() {
    if(this.props.autoAnimate) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { animationValue, dataIndex, animationOpacity } = this.state;
    const { effect } = this.props;
    return(
      <Animated.Text
        style={[
          this.props.style,
          effect==='slide'?
            {
              opacity: animationOpacity,
              transform: [{
                translateX: animationValue.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [(width*-1), 0, (width + 50)]  // 0 : 150, 0.5 : 75, 1 : 0
                }),
              }],
            }
            :
            { opacity: animationOpacity }
          ,]}
      >
        {this.props.data[dataIndex]}
      </Animated.Text>
    );

  }

}

ChangingText.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  autoAnimate: PropTypes.bool,
  showPrevious: PropTypes.func,
  showNext: PropTypes.func,
  effect: PropTypes.oneOf(['fade','slide'])
};

ChangingText.defaultProps = {
  autoAnimate: false,
  effect: 'fade'
};