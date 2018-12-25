import React, { Component } from 'react'
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native'
import { ATText } from "../index"
import PropTypes from 'prop-types'

export default class FormItem extends Component {
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    required: PropTypes.bool,
    labelStyle: ViewPropTypes.style,
    labelTextStyle: Text.propTypes.style,
    asterisk: PropTypes.element,
    asteriskStyle: Text.propTypes.style,
  }

  static defaultProps = {
    label: '',
    required: false,
    labelStyle: {},
    labelTextStyle: {},
    asteriskStyle: {}
  }

  renderAsterisk = () => {
    const { asterisk, asteriskStyle } = this.props
    return (
        asterisk 
          ? asterisk 
          : <ATText style={[styles.asteriskStyle, asteriskStyle]}>*</ATText>
    )
  }

  render() {
    const { 
      renderLabel, 
      label,
      required,
      asterisk,
      asteriskStyle,
      children,
      labelStyle,
      labelTextStyle,
      style 
    } = this.props
    return (
      <View style={[styles.wrapper, style]}>
        {
          renderLabel 
            ? label
            : (
              <View style={[styles.labelStyle, labelStyle]}>
                <ATText style={[styles.labelTextStyle, labelTextStyle]}>{label}</ATText>
                { required && this.renderAsterisk()}
              </View>
            )
        }
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 13,
  },
  labelStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80, 
    marginRight: 15,
  },
  labelTextStyle: {
    marginRight: 5, 
    fontSize: 15,
    color: '#333',
  },
  asteriskStyle: {
    position: 'relative', 
    top: -4,
    fontSize: 18,
    color: "#ff1C40",
  }
})