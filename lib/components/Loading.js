import React from 'react'
import { View, ActivityIndicator, Text, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { Colors, Theme } from '../theme'
import Helper from '../tool/Help'

export default function Loading (props) {
  const {
    size,
    color,
    title,
    titleStyle,
    indicator,
    style,
    ...expandProps
  } = props

  const titleBox = title ? (
    <Text
      style={[styles.title, { color: color || Colors.primary }, titleStyle]}
    >
      {title}
    </Text>
  ) : null
  let fSize = Platform.OS === 'ios' && typeof size === 'number' ? 'large' : size
  return (
    <View {...expandProps} style={[styles.wrapper, style]}>
      {indicator || <ActivityIndicator size={fSize} color={color} />}
      {titleBox}
    </View>
  )
}

const styles = Helper.createStyle({
  wrapper: {
    margin: Theme.double_base_margin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    marginVertical: 0,
    marginTop: Theme.double_base_margin
  }
})

Loading.defaultProps = {
  size: 'large',
  title: '',
  color: Colors.primary,
  titleStyle: {},
  indicator: null
}

Loading.propTypes = {
  size: PropTypes.any,
  title: PropTypes.any,
  color: PropTypes.string,
  titleStyle: Text.propTypes.style,
  indicator: PropTypes.node
}
