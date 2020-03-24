import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  Animated,
  Easing,
  ScrollView,
  Platform
} from 'react-native'
import Helper from '../tool/Help'
import PropTypes from 'prop-types'
import RefreshControl from './RefreshControl'

const MIN_PULLDOWN_DISTANCE = 60

class RefreshView extends Component {
  static propTypes = {
    flat: PropTypes.bool
  }

  static defaultProps = {
    flat: false
  }
  state = {
    loading: false,
    refreshing: false,
    readyToRefresh: false,
    scrollY: new Animated.Value(0),
    freshRotate: new Animated.Value(0)
  }

  handleRelease = () => {
    const { flat } = this.props
    if (this.state.readyToRefresh) {
      flat ? this.flatlist.scrollToOffset({ offset: -60 }) : this.scrollView.scrollTo({ y: -60 })
      this.spin()
      this.refresh().then(d => {
        flat ? this.flatlist.scrollToOffset({ offset: 0 }) : this.scrollView.scrollTo({ y: 0 })
      })
    }
    return this.setState({ readyToRefresh: false })
  }

  refresh = () => {
    this.setState({ loading: true })
    return this.props.refreshData().then(d => {
      this.setState({ loading: false })
      return d
    })
  }

  handleScroll = (pullDownDistance) => {
    this.setState({
      vs: pullDownDistance.value
    })
    const { value } = pullDownDistance
    if (value < 0) {
      if (Math.abs(value) >= MIN_PULLDOWN_DISTANCE) {
        return this.setState({ readyToRefresh: true })
      } else {
        return this.setState({ readyToRefresh: false })
      }
    }
  }

  spin = () => {
    this.state.freshRotate.setValue(0)
    Animated.timing(
      this.state.freshRotate,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear
      }
    ).start(() => {
      if (this.state.loading) {
        this.spin()
      }
    })
  }

  onEndReached = () => {
    const { data, loadData, noMore } = this.props
    const { loading } = this.state
    if (data.length > 0 && !loading && !noMore && loadData) {
      this.setState({
        loading: true
      })
      loadData(false).then(() => {
        this.setState({
          loading: false
        })
      })
    }
  }

  componentDidMount () {
    this.state.scrollY.addListener((value) => this.handleScroll(value))
  }

  componentWillUnmount () {
    this.state.scrollY.removeAllListeners()
  }

  render () {
    const { flat, children, renderItem, noMore, ...eProps } = this.props
    const { readyToRefresh, loading } = this.state
    const freshSize = 4
    const freshColor = '#888'
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [-Helper.APP_HEIGHT, 0],
      outputRange: [Helper.APP_HEIGHT, 0],
      extrapolate: 'clamp'
    })
    const circleTop = this.state.scrollY.interpolate({
      inputRange: [-60, 0],
      outputRange: [0, 30],
      extrapolate: 'clamp'
    })
    const circleSize = this.state.scrollY.interpolate({
      inputRange: [-60, 0],
      outputRange: [freshSize, 0],
      extrapolate: 'clamp'
    })
    const circleOpacity = this.state.scrollY.interpolate({
      inputRange: [-60, 0],
      outputRange: [0.5, 0],
      extrapolate: 'clamp'
    })
    const spin = this.state.freshRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const footer = flat && eProps.data.length === 0 ? null : <Text>{!noMore ? '加载中' : '没有更多了'}</Text>
    const container = flat ? <FlatList
      onScroll={Animated.event([
        {
          nativeEvent: {
            contentOffset: {
              y: this.state.scrollY
            }
          }
        }
      ])}
      scrollEventThrottle={10}
      onResponderRelease={this.handleRelease}
      onEndReachedThreshold={0.1}
      onEndReached={this.onEndReached}
      renderItem={renderItem}
      ref={v => { this.flatlist = v }}
      style={{ flex: 1 }}
      refreshControl={<RefreshControl
        refreshing={loading}
        onRefresh={this.refresh}
        title={loading ? '' : ' '}
      />}
      ListFooterComponent={footer}
      {...eProps}
    /> : <ScrollView
      onScroll={Animated.event([
        {
          nativeEvent: {
            contentOffset: {
              y: this.state.scrollY
            }
          }
        }
      ])}
      scrollEventThrottle={16}
      onResponderRelease={this.handleRelease}
      ref={v => { this.scrollView = v }}
      style={{ flex: 1 }}
      refreshControl={
        Platform.OS === 'android' ? <RefreshControl
          refreshing={loading}
          onRefresh={this.refresh}
          title={loading ? '' : ' '}
        /> : null
      }
      {...eProps}
    >{children}</ScrollView>
    return (
      <View style={styles.scrollview}>
        <View style={styles.fillParent}>
          {/* <Animated.View */}
          {/* style={{ */}
          {/* height: headerHeight, */}
          {/* width: '100%', */}
          {/* position: 'absolute', */}
          {/* top: 0, */}
          {/* zIndex: 99, */}
          {/* backgroundColor: '#eee', */}
          {/* overflow: 'hidden' */}
          {/* }}> */}
          {/* <View style={{ */}
          {/* position: 'absolute', */}
          {/* bottom: 0, */}
          {/* width: '100%', */}
          {/* height: 60, */}
          {/* justifyContent: 'center' */}
          {/* }}> */}
          {/* <View style={{ */}
          {/* width: '100%', */}
          {/* flexDirection: 'row', */}
          {/* justifyContent: 'center', */}
          {/* alignItems: 'center' */}
          {/* }}> */}
          {/* <Animated.View style={{ */}
          {/* marginRight: 10, */}
          {/* flexDirection: 'row', */}
          {/* alignItems: 'center', */}
          {/* transform: [{'rotate': spin}] */}
          {/* }}> */}
          {/* <Circle */}
          {/* size={circleSize} */}
          {/* style={{ */}
          {/* backgroundColor: freshColor, */}
          {/* marginRight: 2, */}
          {/* position: 'relative', */}
          {/* top: circleTop */}
          {/* }} /> */}
          {/* <Circle */}
          {/* size={circleSize} */}
          {/* style={{ */}
          {/* opacity: circleOpacity, */}
          {/* backgroundColor: freshColor, */}
          {/* position: 'relative', */}
          {/* bottom: circleTop */}
          {/* }} /> */}
          {/* </Animated.View> */}
          {/* <Text style={{ */}
          {/* color: '#888', */}
          {/* fontSize: 12 */}
          {/* }}>{loading ? '正在刷新' : (readyToRefresh ? '松开刷新' : '下拉刷新')}</Text> */}
          {/* </View> */}
          {/* </View> */}
          {/* </Animated.View> */}
          <Animated.View style={{ flex: 1 }}>
            {container}
          </Animated.View>
        </View>
      </View>
    )
  }
}

const Circle = (props) => {
  const { style, size, ...eProps } = props
  return <Animated.View
    style={[{ width: size, height: size, backgroundColor: '#eee', borderRadius: 6 }, style]} {...eProps} />
}

const styles = Helper.createStyle({
  scrollview: {
    flex: 1
    // backgroundColor: '#999'
  },
  fillParent: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  row: {
    padding: 10,
    height: 125,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    marginBottom: -1,
    borderBottomColor: '#E5EDF5',
    borderTopColor: '#E5EDF5',
    borderBottomWidth: 1
  },
  text: {
    textAlign: 'center',
    color: '#A4C8D9'
  },
  navText: {
    color: '#A4C8D9',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 30
  }
})

module.exports = RefreshView
