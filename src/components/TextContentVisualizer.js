import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class TextContentVisualizer extends React.PureComponent{
  render() {
    const { content, containerStyle, headerColor, headerFont, defaultContentColor } =  this.props;
    return(
      <View style={containerStyle}>
        {
          content.map((element, key) => {
            let textStyle = null;
            if(element.customTextStyling) {
              textStyle = element.customTextStyling;
            } else {
              switch (element.type) {
                case 'h1':
                  textStyle={
                    fontSize: 25,
                    color: headerColor,
                    fontFamily: headerFont,
                  };
                  break;
                case 'h2':
                  textStyle={
                    fontSize: 23,
                    color: headerColor,
                    fontFamily: headerFont,
                  };
                  break;
                case 'h3':
                  textStyle={
                    fontSize: 21,
                    color: headerColor,
                    fontFamily: headerFont,
                  };
                  break;
                case 'h4':
                  textStyle={
                    fontSize: 19,
                    color: headerColor,
                    fontFamily: headerFont,
                  };
                  break;
                case 'h5':
                  textStyle={
                    fontSize: 17,
                    color: headerColor,
                    fontFamily: headerFont,
                  };
                  break;
                case 'h6':
                  textStyle={
                    fontSize: 15,
                    color: headerColor,
                    fontFamily: headerFont,
                  };
                  break;
                default:
                  textStyle={
                    fontSize: 13,
                    color: defaultContentColor
                  };
                  break;
              }
            }
            const isList = element.type === 'blist' || element.type === 'nlist';
            return(
              <View key={key} style={{ marginVertical: 5 }}>
                {
                  !isList &&
                  <Text style={[textStyle, { textAlign: element.textAlign ? element.textAlign: 'auto' }]}>{element.content + '\n'}</Text>
                }
                {
                  isList &&
                  element.content.map((listElement, index) => {
                    const elementIndex = element.type === 'blist' ? '\u2022' : (index+1).toString() + '.';
                    return <Text key={index.toString()} style={[textStyle, { textAlign: element.textAlign ? element.textAlign: 'auto', paddingLeft: 20 }]}>{`${elementIndex} ${listElement}`}</Text>
                  })
                }
              </View>
            );
          })
        }
      </View>
    );
  }
}

TextContentVisualizer.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  containerStyle: PropTypes.shape({}),
  headerColor: PropTypes.string,
  headerFont: PropTypes.string,
  defaultContentColor: PropTypes.string,
};

TextContentVisualizer.defaultProps = {
  containerStyle: {
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  headerColor: 'black',
  defaultContentColor: '#313131'
};