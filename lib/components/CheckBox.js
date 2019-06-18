/**
 * react-native-check-box
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/crazycodeboy/react-native-check-box
 * Email:crazycodeboy@gmail.com
 * Blog:http://www.devio.org
 * @flow
 *
 * modified by Linyin Chu on 2018.06.29
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Image,
  Text,
  TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types'
import { Colors } from '../theme'

export default class CheckBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: this.props.checked
    }
  }

  static propTypes = {
    ...(ViewPropTypes || View.PropTypes),
    render: PropTypes.func,
    leftText: PropTypes.string,
    leftTextView: PropTypes.element,
    rightText: PropTypes.string,
    leftTextStyle: Text.propTypes.style,
    rightTextView: PropTypes.element,
    rightTextStyle: Text.propTypes.style,
    checkedView: PropTypes.element,
    unCheckedView: PropTypes.element,
    halfCheckedImage: PropTypes.element,
    onPress: PropTypes.func,
    checked: PropTypes.bool,
    halfChecked: PropTypes.bool,
    tintColor: PropTypes.string,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    onPress: () => {},
    checked: false,
    halfChecked: false,
    tintColor: Colors.primary,
    leftTextStyle: {},
    rightTextStyle: {}
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (prevState.checked !== nextProps.checked) {
  //     return {
  //       checked: nextProps.checked
  //     };
  //   }
  //   return null;
  // }

  componentWillReceiveProps (nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked })
    }
  }

  onPress () {
    if (!('checked' in this.props)) {
      this.setState({
        checked: !this.state.checked
      })
    }
    this.props.onPress(!this.state.checked)
  }

  _renderLeft () {
    if (this.props.leftTextView) return this.props.leftTextView
    if (!this.props.leftText) return null
    return (
      <Text style={[styles.leftText, this.props.leftTextStyle]}>{this.props.leftText}</Text>
    )
  }

  _renderRight () {
    if (this.props.rightTextView) return this.props.rightTextView
    if (!this.props.rightText) return null
    return (
      <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text>
    )
  }

  _renderImage () {
    if (this.props.halfChecked) {
      return this.props.halfCheckedImage ? this.props.halfCheckedImage : this.genCheckedImage()
    }
    if (this.state.checked) {
      return this.props.checkedView ? this.props.checkedView : this.genCheckedImage()
    } else {
      return this.props.unCheckedView ? this.props.unCheckedView : this.genCheckedImage()
    }
  }

  genCheckedImage () {
    var source
    if (this.props.halfChecked) {
      source = require('../assets/check_box/ic_half_check_box.png')
    } else {
      source = this.state.checked ? require('../assets/check_box/ic_check_box.png') : require('../assets/check_box/ic_check_box_outline_blank.png')
    }

    return (
      <Image source={source} style={{ tintColor: this.props.tintColor }} />
    )
  }

  render () {
    const { render, rightText } = this.props
    return (
      <TouchableHighlight
        style={this.props.style}
        onPress={() => this.onPress()}
        underlayColor='transparent'
        disabled={this.props.disabled}
      >
        {
          render ? render(this.state.checked, rightText) : (
            <View style={styles.container}>
              {this._renderLeft()}
              {this._renderImage()}
              {this._renderRight()}
            </View>
          )
        }
      </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftText: {
    // flex: 1,
    marginRight: 5
  },
  rightText: {
    // flex: 1,
    marginLeft: 5
  }
})
