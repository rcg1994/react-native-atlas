import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Metrics, Colors, Theme } from '../theme'

export default function Loading (props)  {
  const {
    size,
    color,
    title,
    titleStyle,
    indicator,
    style,
    ...expandProps
  } = props
  
  const titleBox = title ? (<Text style={[styles.title, titleStyle]}>{title}</Text>) : null
  return (
    <View {...expandProps} style={[styles.wrapper, style]}>
      {indicator ? indicator : <ActivityIndicator size={size} color={color}/>}
      {titleBox}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    margin: Theme.double_base_margin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    marginVertical: 0,
    marginTop: Theme.double_base_margin,
    color: Colors.primary
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
  size: PropTypes.string,
  title: PropTypes.any,
  color: PropTypes.string,
  titleStyle: Text.propTypes.style,
  indicator: PropTypes.node
}
