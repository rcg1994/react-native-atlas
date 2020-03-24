import React, { Component } from 'react'
import { View, Animated, Easing } from 'react-native'
import PropTypes from 'prop-types'
import { Colors } from '../theme'

export default class Spin extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    spiner: PropTypes.any,
    duration: PropTypes.number
  }
  static defaultProps = {
    size: 4,
    color: Colors.primary,
    spiner: null,
    duration: 500
  }

  state = {
    freshRotate: new Animated.Value(0)
  }

  spin = () => {
    this.state.freshRotate.setValue(0)
    Animated.timing(this.state.freshRotate, {
      toValue: 1,
      duration: this.props.duration,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      this.spin()
    })
  }

  componentDidMount () {
    this.spin()
  }

  render () {
    const { size, color, spiner } = this.props
    const spin = this.state.freshRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {spiner ? (
          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ rotate: spin }]
            }}
          >
            {spiner}
          </Animated.View>
        ) : (
          <Animated.View
            style={{
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
              transform: [{ rotate: spin }]
            }}
          >
            <Circle
              size={size}
              style={{
                backgroundColor: color,
                marginRight: 2,
                position: 'relative'
              }}
            />
            <Circle
              size={size}
              style={{
                opacity: 0.5,
                backgroundColor: color,
                position: 'relative'
              }}
            />
          </Animated.View>
        )}
      </View>
    )
  }
}

const Circle = props => {
  const { style, size, ...eProps } = props
  return (
    <Animated.View
      style={[
        { width: size, height: size, backgroundColor: '#eee', borderRadius: 6 },
        style
      ]}
      {...eProps}
    />
  )
}
