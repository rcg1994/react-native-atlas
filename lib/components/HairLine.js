import React from 'react'
import { View } from 'react-native'
import { Metrics, Theme } from '../theme'

export default ({size, vertical, style, ...eProps}) => {
  return <View {...eProps} style={[{
    backgroundColor: Theme.base_border_color
  }, vertical ? {
    height: '100%',
    width: size || Metrics.borderWidth,
  } : {
    width: '100%',
    height: size || Metrics.borderWidth,
  }, style]} />
}