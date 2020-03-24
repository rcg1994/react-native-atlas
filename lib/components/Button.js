import React, { Component } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { Metrics, Colors, Theme } from '../theme'
import Helper from '../tool/Help'
import { TYPE } from '../tool/Map'
import Touchable from './Touchable'

export default class Button extends Component {
  static defaultProps = {
    onPress: () => {},
    icon: null,
    text: false,
    iconOnly: false,
    isImageIcon: false,
    ghost: false,
    disabled: false,
    full: false,
    interspace: false,
    throttle: true,
    border: true,
    buttonColor: '',
    type: 'primary'
  }

  static propTypes = {
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    icon: PropTypes.any,
    type: PropTypes.oneOf(TYPE),
    style: PropTypes.any,
    textStyle: PropTypes.any,
    text: PropTypes.bool,
    ghost: PropTypes.bool,
    full: PropTypes.bool,
    interspace: PropTypes.bool,
    border: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledStyle: PropTypes.any,
    disabledTextStyle: PropTypes.any,
    underlayColor: PropTypes.string,
    buttonColor: PropTypes.string,
    throttle: PropTypes.bool,
    isImageIcon: PropTypes.bool
  }

  render () {
    const {
      children,
      type,
      icon,
      style,
      textStyle,
      disabled,
      disabledStyle,
      disabledTextStyle,
      full,
      interspace,
      text,
      ghost,
      border,
      iconOnly,
      onPress,
      buttonColor,
      throttle: propThrottle,
      isImageIcon,
      ...props
    } = this.props
    const bgTransparent = ghost || text
    const dStyle =
      disabledStyle ||
      (ghost ? styles.buttonGhostDisabled : styles.buttonDisabled)
    const dTextStyle = disabledTextStyle || styles.buttonTextDisabled
    const content = typeof children === 'string' ? children : 'Only String'
    const tStyle = [
      styles.textStyle,
      type && text ? styles[`${type}TextButtonTextStyle`] : '',
      type && ghost ? styles[`${type}GhostButtonTextStyle`] : '',
      buttonColor && bgTransparent ? { color: buttonColor } : '',
      textStyle,
      disabled ? dTextStyle : ''
    ]
    const IconContainer = iconOnly ? View : Text
    return (
      <Touchable
        disabled={disabled}
        style={[
          styles.buttonStyle,
          type ? styles[`${type}ButtonStyle`] : '',
          interspace ? styles.buttonWithInterspace : '',
          full ? styles.buttonFull : '',
          ghost ? styles.ghostButtonStyle : '',
          type ? styles[`${type}GhostButtonStyle`] : '',
          text ? styles.textButtonStyle : '',
          iconOnly ? styles.iconOnly : '',
          !border ? styles.iconNoBorder : '',
          buttonColor && !bgTransparent ? { backgroundColor: buttonColor } : '',
          buttonColor && bgTransparent ? { borderColor: buttonColor } : '',
          style,
          disabled ? dStyle : ''
        ]}
        onPress={onPress}
        throttle={propThrottle}
        underlayColor={
          buttonColor && !bgTransparent
            ? Helper.LightenDarkenColor(Theme.button_underlay_dark, buttonColor)
            : bgTransparent
              ? Helper.LightenDarkenColor(
                Theme.button_underlay_light,
                buttonColor || Colors[type]
              )
              : Helper.LightenDarkenColor(
                Theme.button_underlay_dark,
                buttonColor || Colors[type]
              )
        }
        {...props}
      >
        <View style={styles.buttonBox}>
          {icon ? (
            <IconContainer
              style={[
                { marginRight: iconOnly ? 0 : Theme.button_padding_h / 2 }
              ].concat(tStyle)}
            >
              {isImageIcon ? icon : <Text style={tStyle}>{icon}</Text>}
            </IconContainer>
          ) : null}
          {!iconOnly ? <Text style={tStyle}>{content}</Text> : null}
        </View>
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

const styles = Helper.createStyle({
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
  buttonWithInterspace: {
    marginHorizontal: Theme.button_interspace
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
    backgroundColor: Helper.LightenDarkenColor(
      Theme.button_underlay_disabled,
      Colors.disabled
    )
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
