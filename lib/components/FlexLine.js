import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
// import { Colors, Metrics } from '../Themes'
import { Metrics, Theme } from '../theme'
import ATText from './Text'

export default class Line extends Component {
  static propTypes = {
    data: PropTypes.array,
    renderItem: PropTypes.any,
    divide: PropTypes.bool,
  }

  static defaultProps = {
    height: Theme.flex_line_height,
    data: [],
    divide: false,
    renderItem: (v) => <ATText>{v}</ATText>
  }

  render () {
    const {height, data, renderItem, style, divide, divideHeight, divideTop} = this.props
    const items = []
    const divideCom = <View style={{
      position: 'absolute',
      right: 0,
      height: divideHeight || '50%',
      width: Metrics.borderWidth,
      backgroundColor: Theme.base_border_color,
      top: divideTop || '25%'
    }} />
    data.forEach((v, k) => {
      items.push(
        <View key={k} style={{
          flex: 1,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {v.renderItem ? v.renderItem(v) : renderItem(v)}
          {divide && k < data.length - 1 ? divideCom : null}
        </View>
      )
    })
    return (
      <View
        style={[{
          height,
          backgroundColor: Theme.flex_line_background_color,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }, style]}
      >
        {items}
      </View>
    )
  }
}
