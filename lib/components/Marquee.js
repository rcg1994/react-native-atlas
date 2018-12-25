import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Animated, Easing, findNodeHandle, UIManager } from 'react-native'

const directionMap = {
  'horizontal': 'row',
  'vertical': 'column',
}

class Marquee extends Component {
  static defaultProps = {
    width: '100%',
    height: '100%',
    data: [],
    textStyle: {},
    direction: 'vertical',
    offsetDistance: 0,
    duration: 400,
    delay: 0,
  }

  static propTypes = {
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    offsetDistance: PropTypes.number,
    duration: PropTypes.number,
    delay: PropTypes.number,

    data: PropTypes.array,
    render: PropTypes.func,
    textStyle: PropTypes.any
  }

  state = {
    wrapperNode: {},
    contentNode: {},
    needDouble: false,
    transformY: new Animated.Value(0),
    transformX: new Animated.Value(0),
  }

  offsetY = 0
  scrollY = this.state.transformY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1]
  })
  
  offsetX = 0
  scrollX = this.state.transformX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1]
  })

  componentDidMount() {
    setTimeout(this.init, 0)
  }

  componentWillUnmount(){
    this.stopAnimation()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      this.setState({ needDouble: false })
      setTimeout(this.init, 0)
    } 
  }

  init = () => {
    this.measureSize().then(needAnimation => {
      this.stopAnimation()
      if(needAnimation) {
        this.startAnimation()
      }
    })
  }

  measureSize = () => {
    const wrapper = this.layout(this.refs.wrapper)
    const content = this.layout(this.refs.content)
    return Promise.all([wrapper, content]).then(([wrapper, content]) => {
      this.setState({
        wrapperNode: wrapper,
        contentNode: content
      })
      if(this.props.direction === 'vertical') {
        if(wrapper.height < content.height) {
          this.setState({ needDouble: true })
          return true
        } else {
          return false
        }
      } else {
        if(wrapper.width < content.width) {
          this.setState({ needDouble: true })
          return true
        } else {
          return false
        }          
      }
    })    
  }  

  layout = (ref) => {
    const handle = findNodeHandle(ref)
    return new Promise((resolve) => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        resolve({x, y, width, height, pageX, pageY})
      })
    })
  }

  handleLayout = (e) => {}

  startAnimation = () => {
    const { direction, delay, duration, offsetDistance } = this.props
    const { contentNode } = this.state
    const len = this.props.data.length
    // ? delay==0 时去掉定时器

    animation = () => {
      if(direction === 'vertical') {
        this.offsetY = this.offsetY + offsetDistance
        Animated.timing(this.state.transformY, {
          toValue: this.offsetY,
          duration,
          easing: Easing.linear
        }).start(() => {
          if (this.offsetY >= contentNode.height) this.offsetY = 0
          this.state.transformY.setValue(this.offsetY)
          this.timer = setTimeout(animation, delay)
        })
      } else {        
        this.offsetX = this.offsetX + offsetDistance
        Animated.timing(this.state.transformY, {
          toValue: this.offsetX,
          duration,
          easing: Easing.linear
        }).start(() => {
          if (this.offsetX >= contentNode.width) this.offsetX = 0
          this.state.transformX.setValue(this.offsetX)
          this.timer = setTimeout(animation, delay)
        })
      }
    }

    this.timer = setTimeout(animation, delay);
  }

  stopAnimation = () => {
    Animated.timing(this.state.transformX).stop()
    Animated.timing(this.state.transformY).stop()
    this.timer && clearTimeout(this.timer)
    this.offsetX = 0
    this.offsetY = 0
    this.state.transformX.setValue(this.offsetX)
    this.state.transformY.setValue(this.offsetY)
  }

  render() {
    const {
      width, height, direction,
      offsetDistance, duration, delay,
      data, render,
      style, textStyle,
    } = this.props
    return (
      <View 
        ref="wrapper"
        style={[styles.wrapper, { width, height }, style]}
        onLayout={({nativeEvent:e}) => this.handleLayout(e)}
      >
        <Animated.View
          ref="content"
          style={{
            transform: [{ translateX: this.scrollX }, { translateY: this.scrollY }], 
            flexDirection: directionMap[direction],
            justifyContent: 'flex-start',
          }}
        >
          {data.map(render)}
          {this.state.needDouble && data.map(render)}
        </Animated.View>
      </View>
    )
  }
}

const styles = {
  wrapper: {
    flex: 1,
    overflow: 'hidden',
    zIndex: 20,
  }
}

export default Marquee
