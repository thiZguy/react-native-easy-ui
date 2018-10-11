/**
 * @author Santiago Montero
 */

/* eslint global-require: 0 */

module.exports = {
  // Components
  get ImageCarousel() {
    return require('./components/ImageCarousel').default;
  },
  get ChangingText() {
    return require('./components/ChangingText').default;
  },
  get TextContentVisualizer() {
    return require('./components/TextContentVisualizer').default;
  },

};
