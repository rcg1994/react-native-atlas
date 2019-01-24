import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import ATModal from "../components/Modal"
import ATText from "../components/Text"
import ATTouchable from "../components/Touchable"
import PropTypes from 'prop-types'
import {  Metrics, Theme, Colors } from "../theme"

const sortDown = require('../assets/sort-down.png')

export default class Select extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || props.defaultValue
    }

    this.valueMap = {}
    props.options.forEach(option => {
      this.valueMap[option.value] = option.label
    })
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    shape: PropTypes.oneOf(['default', 'underline', 'rounded']),
    right: PropTypes.element,
    textStyle: Text.propTypes.style,
    rightStyle: Text.propTypes.style,
    placeholderStyle: Text.propTypes.style,
  }

  static defaultProps = {
    options: [],
    placeholder: '请选择',
    shape: 'default',
    right: null,
    textStyle: {},
    rightStyle: {},
    placeholderStyle: {},
    numberOfLines: null
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      this.setState({
        value: nextProps.value || nextProps.defaultValue
      })

      this.valueMap = {}
      nextProps.options.forEach(option => {
        this.valueMap[option.value] = option.label
      })
    }
  }

  onSelect = (e) => {
    const { options, onChange } = this.props

    const buttons = options.map(option => ({
      content: option.label,
      onPress: () => {
        // 避免外部和内部同时改 value
        if (!('value' in this.props)) {
          this.setState({ value: option.value });
        }

        if (onChange) {
          onChange( option.value);
        }
      }
    }))

    ATModal.select({
      buttons,
    }, e)
  }

  render() {
    const {
      placeholder,
      shape,
      right,
      textStyle,
      rightStyle,
      placeholderStyle,
      style,
      numberOfLines
    } = this.props

    const isUnderline = shape === 'underline'
    const isRounded = shape === 'rounded'
    const label = this.valueMap[this.state.value]
    return (
      <ATTouchable onPress={this.onSelect} style={{width: '100%'}}>
        <View style={[
          styles.defaultWrapper,
          isUnderline && styles.underlineWrapper,
          isRounded && styles.roundedWrapper,
          style]}
        >
          {
            label
              ? <ATText style={[styles.text, textStyle]} numberOfLines={numberOfLines}>{label}</ATText>
              : <ATText style={[styles.text, textStyle, styles.placeholder, placeholderStyle]} numberOfLines={numberOfLines}>{placeholder}</ATText>
          }
          {right || <Image source={sortDown} style={[styles.right, rightStyle]}/>}
        </View>
      </ATTouchable>
    )
  }
}


const styles = StyleSheet.create({
  defaultWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Theme.input_height,
    paddingHorizontal: Theme.base_margin,
    borderColor: Theme.base_border_color,
    borderWidth: Metrics.borderWidth,
    backgroundColor: Theme.input_background_color,
  },
  underlineWrapper: {
    borderWidth: 0,
    borderBottomWidth: Metrics.borderWidth,
    backgroundColor: 'transparent',
  },
  roundedWrapper: {
    borderRadius: Theme.input_border_radius,
  },
  text: {
    flex: 1,
    textAlign: 'left',
    color: Theme.input_font_color,
    fontSize: Theme.input_font_size,
  },
  placeholder: {
    color: '#999',
  },
  right: {
    width: 10,
    height: 10,
  }
})
