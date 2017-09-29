import React from "react";
import getImagePalette from "./get-image-palette";

export default class ImagePaletteProvider extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { colors: null };
    this.onImageload = this.onImageload.bind(this);
  }

  componentDidMount() {
    const image = (this.image = new Image());
    image.crossOrigin = "Anonymous";
    image.src = this.props.image;
    image.onload = this.onImageload;
  }

  componentWillUnmount() {
    this.image.onload = null;
  }

  onImageload() {
    var image = this.image;
    var colors = getImagePalette(this.image);
    this.setState({ colors });
  }

  onImageError() {
    if (this.props.defaults) {
      this.setState({ colors: this.props.defaults })
    }
  }

  render() {
    const { colors } = this.state;
    const { children } = this.props;
    return colors ? children(colors) : null;
  }
}
