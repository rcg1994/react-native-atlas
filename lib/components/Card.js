import React from 'react'
import { View } from 'react-native'
import Metrics from '../theme/Metrics'
import Theme from '../theme/Theme'
import Helper from '../tool/Help'

export default function Card (props) {
  const { children, style, ...expandProps } = props
  return <View style={[styles.card, style]} {...expandProps}>
    {children}
  </View>
}

const styles = Helper.createStyle({
  card: {
    borderWidth: Metrics.borderWidth,
    marginHorizontal: Theme.base_margin,
    borderColor: Theme.base_border_color,
    borderRadius: Theme.card_border_radius,
    backgroundColor: Theme.card_border_background_color,
    overflow: 'hidden',
    zIndex: 1
  }
})
