import React, { Component } from 'react'
import { View, Text, ScrollView, Animated, Dimensions, Platform, BackHandler } from 'react-native'
import Modal from './react-native-modalbox'
import List from './List'
import { Theme, Metrics } from '../theme'

const offset = 20

export default class GlobalSelectorModal extends Component {
  state = {
    ani: new Animated.Value(0),
    x: -10000,
    y: -10000
  }

  componentDidMount () {
    this.refs.modal.open()
    this.animation()
    if (!this.props.backButtonClose) {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
  }

  componentWillUnmount () {
    if (!this.props.backButtonClose) {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }
  }

  onBackPress = ()=>{
    return true
  }

  close = () => {
    this.props.onClose()
  }

  modalClose = () => {
    this.refs.modal && this.refs.modal.close()
  }

  onOk = () => {
    const {onOk} = this.props
    onOk && this.props.onOk()
  }

  onCancel = () => {
    const {onCancel} = this.props
    onCancel && this.props.onCancel()
  }

  onViewLayout = (evt) => {
    const {x, y} = this.props
    const screen = Dimensions.get('window')
    const {height: lH, width: lW} = evt.nativeEvent.layout
    this.setState({
      x: x + lW > screen.width ? x - lW + offset : x - offset,
      y: y + lH > screen.height ? y - lH + offset : y - offset
    })
  }

  animation = () => {
    this.state.ani.setValue(0)
    Animated.timing(
      this.state.ani,
      {
        toValue: 1,
        duration: 200
      }
    ).start()
  }

  render () {
    const {
      backdropOpacity,
      contentAlign,
      backButtonClose,
      backdropPressToClose,
      buttons,
      style,
      width,
      bottom,
      onSelect,
      float
    } = this.props
    const {x, y} = this.state
    const isBottom = bottom
    const aniScale = this.state.ani.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1]
    })
    const data = []
    buttons.forEach(({onPress, ...d}) => {
      data.push({
        ...d,
        onPress: () => {
          this.modalClose()
          onPress ? onPress(d) : onSelect(d)
        }
      })
    })
    const list = <List data={data} contentStyle={{
      height: Theme.modal_select_button_height
    }} />
    return (
      <Modal
        backdrop={true}
        backButtonClose={backButtonClose}
        coverScreen={false}
        swipeToClose={false}
        float={float}
        position={isBottom ? 'bottom' : 'center'}
        entry={'bottom'}
        ref={'modal'}
        backdropOpacity={float ? 0 : backdropOpacity}
        backdropPressToClose={backdropPressToClose}
        animationDuration={isBottom ? 200 : 0}
        style={[
          styles.modal,
          style,
          float ? {
            position: 'absolute',
            top: y,
            left: x,
            width: 'auto'
          } : null,
          bottom ? null : {
            width: 'auto',
          }]}
        onClosed={this.close}
      >
        <Animated.View
          onLayout={this.onViewLayout}
          style={[styles.modalBox, {
            width: width || (isBottom ? '100%' : Theme.modal_message_width),
            borderRadius: isBottom || float ? 0 : 6
          }, float ? {
            shadowRadius: 8,
            shadowOpacity: 0.1,
            shadowColor: '#000000',
            backgroundColor: 'transparent',
            overflow: 'visible'
          } : null, {
            transform: isBottom ? [] : [{scale: aniScale}]
          }]}>
          <ScrollView>
            {float ? (
              <View style={{
                backgroundColor: '#ffffff',
                elevation: Theme.modal_select_button_elevation,
                margin: offset
              }}>
                {list}
              </View>
            ) : list}
          </ScrollView>
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
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  modalBox: {
    backgroundColor: '#ffffff',
    height: 'auto',
    overflow: 'hidden',
    maxHeight: Theme.modal_select_max_height
  },
  contentScroll: {
    maxHeight: Theme.modal_content_max_height
  },
  button: {
    borderWidth: 0,
    height: Theme.modal_button_height
  }
}
