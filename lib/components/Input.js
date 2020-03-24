import React, { Component } from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { View, TextInput, Text, StyleSheet, ViewPropTypes, Keyboard } from 'react-native'
import Touchable from './Touchable'
import { Metrics, Theme } from '../theme'

export default class Input extends Component {
  static propTypes = {
    shape: PropTypes.oneOf(['default', 'underline', 'rounded']),
    label: PropTypes.any,
    textarea: PropTypes.bool,
    alwaysChange: PropTypes.bool,
    right: PropTypes.any,
    labelStyle: ViewPropTypes.style,
    textInputStyle: ViewPropTypes.style,
    onPress: PropTypes.func
  }

  static defaultProps = {
    shape: 'default',
    label: '标签',
    textarea: false,
    alwaysChange: false,
    right: null,
    onPress: () => {}
  }

  // shouldComponentUpdate (nextProps) {
  //   // return Platform.OS !== 'ios' || this.props.value === nextProps.value
  //   return Platform.OS !== 'ios' ||
  //     nextProps.alwaysChange ||
  //     (this.props.value === nextProps.value && (nextProps.defaultValue === undefined || nextProps.defaultValue === '' )) ||
  //     (this.props.defaultValue === nextProps.defaultValue && (nextProps.value === undefined || nextProps.value === '' ))
  // }

  _keyboardDidHide = () => {
    if (this._input) {
      this._input.blur()
    }
  }
  componentDidMount = () => {
    this.keyboardEvent = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }
  componentWillUnmount () {
    this.keyboardEvent.remove()
  }

  render () {
    const {
      shape,
      label,
      right,
      labelStyle,
      textInputStyle,
      style,
      onPress,
      onChangeText,
      onChange,
      ...props
    } = this.props

    const isUnderline = shape === 'underline'
    const isRounded = shape === 'rounded'
    return (
      <Touchable onPress={onPress} style={{ width: '100%' }}>
        <View style={[
          styles.inputWrapper,
          isUnderline && styles.underlineWrapper,
          isRounded && styles.roundedWrapper,
          style]}>
          {label &&
          R.is(String, label)
            ? <Text style={[styles.label, labelStyle]}>{label}</Text>
            : label
          }
          <TextInput
            underlineColorAndroid='transparent'
            style={[styles.textInput, textInputStyle]}
            pointerEvents="box-none"
            ref={v => (this._input = v)}
            onChangeText={(value) => {
              onChangeText && onChangeText(value)
              onChange && onChange(value)
            }}
            {...props}
          />
          {right || null}
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Theme.input_height,
    paddingHorizontal: Theme.base_margin,
    borderColor: Theme.base_border_color,
    borderWidth: Metrics.borderWidth,
    backgroundColor: Theme.input_background_color
  },
  underlineWrapper: {
    borderWidth: 0,
    borderBottomWidth: Metrics.borderWidth,
    backgroundColor: 'transparent'
  },
  roundedWrapper: {
    borderRadius: Theme.input_border_radius
  },
  label: {
    color: Theme.input_label_font_color,
    marginRight: Theme.base_margin,
    fontSize: Theme.input_label_font_size
  },
  textInput: {
    height: '100%',
    flex: 1,
    paddingVertical: 0,
    textAlign: 'left',
    color: Theme.input_font_color,
    fontSize: Theme.input_font_size
  }
})
