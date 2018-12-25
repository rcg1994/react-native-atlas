import React, { Component } from 'react'
import { View, Text, ScrollView, Animated, BackHandler } from 'react-native'
import Modal from './react-native-modalbox'
import Helper from '../../../../App/Lib/Helper'

export default class GlobalNormalModal extends Component {
  static defaultProps = {
    autoOpen: true
  }
  state = {
    ani: new Animated.Value(0),
    x: -10000,
    y: -10000
  }

  componentDidMount () {
    if (this.props.autoOpen) {
      this.open()
    }
    this.animation()
  }

  componentWillUnmount () {
  }

  close = () => {
    this.props.onClose()
  }

  open = () => {
    this.refs.modal.open()
    if (!this.props.backButtonClose) {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
  }

  modalClose = () => {
    this.refs.modal && this.refs.modal.close()
    if (!this.props.backButtonClose) {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }
  }

  onViewLayout = (evt) => {
    const contentWidth = evt.nativeEvent.layout.width
    const {x, y} = this.props
    setTimeout(() => {
      this.setState({
        x: Helper.APP_WIDTH / 2 - contentWidth / 2 - x,
        y: -y
      })
    }, 50)
  }

  animation = () => {
    this.state.ani.setValue(0)
    Animated.timing(
      this.state.ani,
      {
        toValue: 1,
        duration: this.props.animationDuration
      }
    ).start()
  }

  onBackPress = () => {
    return true
  }

  render () {
    const {
      render,
      backdropOpacity,
      backButtonClose,
      backdropPressToClose,
      style,
      swipeToClose,
      backdrop,
      animationDuration,
      animation,
      entry,
      position,
      float,
      ...otherProps
    } = this.props
    const {x, y} = this.state
    const aniScale = this.state.ani.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1]
    })
    const aniY = this.state.ani.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0]
    })
    return (
      <Modal
        backdrop={backdrop}
        backButtonClose={backButtonClose}
        coverScreen={false}
        swipeToClose={swipeToClose}
        position={position}
        entry={entry}
        ref={'modal'}
        backdropOpacity={backdropOpacity}
        backdropPressToClose={backdropPressToClose}
        animationDuration={animation ? animationDuration : 0}
        style={[styles.modal, style, float ? {
          top: y,
          left: x
        } : null]}
        onClosed={this.close}
        {...otherProps}
      >
        <Animated.View
          onLayout={this.onViewLayout}
          style={[styles.modalBox, animation ? null : {
            transform: [{scale: aniScale}, {translateY: aniY}]
          }]}>
          {render()}
        </Animated.View>
      </Modal>
    )
  }
}

const styles = {
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    height: 'auto',
    width: 'auto',
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  modalBox: {
    backgroundColor: 'transparent',
    height: 'auto',
    overflow: 'hidden'
  }
}
