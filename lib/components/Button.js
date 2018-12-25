import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Metrics, Colors, Theme } from '../theme'
import Helper from '../tool/Help'
import { TYPE } from '../tool/Map'
import Touchable from './Touchable'

export default class Button extends Component {
  static defaultProps = {
    title: '',
    onPress: () => {},
    icon: null,
    text: false,
    iconOnly: false,
    ghost: false,
    disabled: false,
    full: false,
    long: false,
    isView: false,
    throttle: true,
    border: true,
    backgroundColor: '',
    type: 'primary'
  }

  static propTypes = {
    title: PropTypes.any.isRequired,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    icon: PropTypes.any,
    type: PropTypes.oneOf(TYPE),
    style: PropTypes.any,
    textStyle: PropTypes.any,
    text: PropTypes.bool,
    ghost: PropTypes.bool,
    full: PropTypes.bool,
    long: PropTypes.bool,
    border: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledStyle: PropTypes.any,
    disabledTextStyle: PropTypes.any,
    underlayColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    throttle: PropTypes.bool
  }

  render () {
    const {
      title,
      type,
      icon,
      style,
      textStyle,
      disabled,
      disabledStyle,
      disabledTextStyle,
      full,
      long,
      text,
      ghost,
      border,
      iconOnly,
      onPress,
      isView,
      backgroundColor,
      throttle: propThrottle,
      ...props
    } = this.props
    const dStyle = disabledStyle || (ghost ? styles.buttonGhostDisabled : styles.buttonDisabled)
    const dTextStyle = disabledTextStyle || styles.buttonTextDisabled
    const tStyle = [
      styles.textStyle,
      type && text ? styles[`${type}TextButtonTextStyle`] : '',
      type && ghost ? styles[`${type}GhostButtonTextStyle`] : '',
      textStyle,
      disabled ? dTextStyle : '',
    ]
    return (
      <Touchable
        disabled={disabled}
        style={[
          styles.buttonStyle,
          type ? styles[`${type}ButtonStyle`] : '',
          long ? styles.buttonLong : '',
          full ? styles.buttonFull : '',
          ghost ? styles.ghostButtonStyle : '',
          type ? styles[`${type}GhostButtonStyle`] : '',
          text ? styles.textButtonStyle : '',
          iconOnly ? styles.iconOnly : '',
          !border ? styles.iconNoBorder : '',
          backgroundColor ? {backgroundColor} : '',
          style,
          disabled ? dStyle : ''
        ]}
        onPress={onPress}
        throttle={propThrottle}
        underlayColor={
          backgroundColor ? Helper.LightenDarkenColor(Theme.button_underlay_dark, backgroundColor) : (
            text || ghost
              ? Helper.LightenDarkenColor(Theme.button_underlay_light, Colors[type])
              : Helper.LightenDarkenColor(Theme.button_underlay_dark, Colors[type])
          )
        }
        {...props}
      >
        {isView ? (
          <View style={styles.buttonIconOnlyBox}>
            {title}
          </View>
        ) : (
          <View style={styles.buttonBox}>
            {icon ? <Text style={[
              {marginRight: iconOnly ? 0 : Theme.button_padding_h / 2}
            ].concat(tStyle)}>{icon}</Text> : null}
            <Text style={tStyle}>
              {title}
            </Text>
          </View>
        )}
      </Touchable>
    )
  }
}

const mapTypeButtonStyle = {}
const mapTypeGhostButtonStyle = {}
const mapTypeGhostButtonTextStyle = {}
const mapTypeTextButtonTextStyle = {}

TYPE.map(v => {
  mapTypeButtonStyle[`${v}ButtonStyle`] = {
    backgroundColor: Colors[v]
  }
  mapTypeGhostButtonStyle[`${v}GhostButtonStyle`] = {
    borderColor: Colors[v]
  }
  mapTypeGhostButtonTextStyle[`${v}GhostButtonTextStyle`] = {
    color: Colors[v]
  }
  mapTypeTextButtonTextStyle[`${v}TextButtonTextStyle`] = {
    color: Colors[v]
  }
})

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonIconOnlyBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    height: Theme.button_height,
    paddingHorizontal: Theme.button_padding_h,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    borderRadius: Theme.button_border_radius
  },
  ...mapTypeButtonStyle,
  textStyle: {
    textAlign: 'center',
    color: Theme.button_text_color,
    fontSize: Theme.button_font_size
  },
  buttonFull: {
    marginHorizontal: 0,
    borderRadius: 0
  },
  buttonLong: {
    marginHorizontal: Theme.base_margin,
  },
  ghostButtonStyle: {
    backgroundColor: 'transparent',
    borderWidth: Metrics.borderWidth
  },
  ...mapTypeGhostButtonStyle,
  ...mapTypeGhostButtonTextStyle,
  textButtonStyle: {
    backgroundColor: 'transparent',
    height: 'auto',
    paddingHorizontal: Theme.button_text_padding_h,
    paddingVertical: Theme.button_text_padding_v
  },
  ...mapTypeTextButtonTextStyle,
  buttonDisabled: {
    backgroundColor: Helper.LightenDarkenColor(Theme.button_underlay_disabled, Colors.disabled)
  },
  buttonGhostDisabled: {
    borderColor: Colors.disabled
  },
  buttonTextDisabled: {
    color: Colors.disabled
  },
  iconOnly: {
    height: Theme.icon_button_height,
    width: Theme.icon_button_width,
    paddingHorizontal: 0
  },
  iconNoBorder: {
    borderWidth: 0
  }
})
