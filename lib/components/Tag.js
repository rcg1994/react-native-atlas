import React from 'react'
import { StyleSheet, View, Text, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { Metrics, Colors, Theme } from '../theme'
import Helper from '../tool/Help'
import { TYPE } from '../tool/Map'
import ATText from './Text'

export default function Tag ({icon, content, color, type, style, textStyle, left, ...props}) {
  const tStyle = [{
    color: color || Colors[type]
  }, textStyle]
  return <View style={[{
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.tag_padding,
    borderRadius: Theme.tag_border_radius,
    borderWidth: Metrics.borderWidth,
    borderColor: color || Colors[type],
    backgroundColor: Helper.LightenDarkenColor(Theme.tag_background_light, Colors[type])
  }, style]}>
    {left}
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      {icon ? <ATText style={[tStyle, {marginRight: 5}]} {...props}>{icon}</ATText> : null}
      <ATText style={tStyle} {...props}>{content}</ATText>
    </View>
  </View>
}

Tag.defaultProps = {
  content: '请填写',
  color: null,
  type: 'primary',
}

Tag.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.any,
  left: PropTypes.any,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  type: PropTypes.oneOf(TYPE),
}
