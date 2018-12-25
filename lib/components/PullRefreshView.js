import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  Animated,
  PanResponder,
  UIManager,
  Dimensions,
  Text
} from 'react-native'
import Helper from '../tool/Help'

export default class PullRefreshView extends React.Component {
  state = {
    scrollEnabled: true,
    scrollY: new Animated.Value(0)
  }

  static propTypes = {}

  static defaultProps = {}

  componentDidMount () {
    this.scroll.scrollTo({y: 100, animated: false})
  }

  componentWillReceiveProps (props) {
  }

  nativeScroll = (e) => {
    const scrollY = e.nativeEvent.contentOffset.y
    this.state.scrollY.setValue(scrollY)
    if (scrollY < 100) {
      // this.scroll.scrollTo({y: 100, animated: false})
    }
  }

  handleRelease = (e) => {
    const {_value: scrollY} = this.state.scrollY
    if (scrollY < 100) {
      this.scroll.scrollTo({y: 100})
    }
  }

  onMomentumScrollEnd = () => {
    const {_value: scrollY} = this.state.scrollY
    if (scrollY < 100) {
      this.scroll.scrollTo({y: 100})
    }
  }

  render () {
    const {scrollEnabled} = this.state
    const scrollTop = this.state.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: [200, 0],
      extrapolate: 'clamp',
    })
    const mockData = [1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((v, k) => {
      return <View style={{height: 40, marginTop: 20}} key={k}>
        <Text>{k}</Text>
      </View>
    })
    return (
      <View
        style={{flex: 1, backgroundColor: '#aaa', position: 'relative'}}
      >
        <ScrollView
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={16}
          onScroll={this.nativeScroll}
          onResponderRelease={this.handleRelease}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScrollEndDrag={this.handleRelease}
          bounces={false}
          ref={v => {this.scroll = v}}
          style={{
            position: 'relative',
            // paddingTop: scrollTop,
            backgroundColor: '#999'
          }}
        >
          <Animated.View style={{
            position: 'absolute',
            top: 0,
            backgroundColor: 'blue',
            width: '100%',
            zIndex: 9,
            height: 100
          }}>

          </Animated.View>
          <Animated.View style={{flex: 1, paddingTop: 100}}>
            {mockData}
          </Animated.View>
        </ScrollView>
      </View>
    )
  }
}