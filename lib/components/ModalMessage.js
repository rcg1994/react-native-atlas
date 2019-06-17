import React, { Component } from 'react'
import { View, Text, ScrollView, Animated, BackHandler } from 'react-native'
import Modal from './react-native-modalbox'
import Button from './Button'
import HairLine from './HairLine'
import { Theme } from '../theme'

export default class GlobalMessageModal extends Component {
  state = {
    ani: new Animated.Value(0),
    time: 0
  }

  timer = null

  componentDidMount () {
    const { duration, loading, backButtonClose, isToast } = this.props
    this.refs.modal.open()
    this.animation()
    if (duration > 0) {
      if (loading) {
        setTimeout(this.modalClose, duration)
      } else {
        this.setState({
          time: Math.floor(duration / 1000)
        })
        this.timer = setInterval(() => {
          this.setState({
            time: this.state.time - 1
          })
          if (this.state.time === 0) {
            this.modalClose()
          }
        }, 1000)
      }
    }
    if (!backButtonClose && !isToast) {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
  }

  componentWillUnmount () {
    const { backButtonClose, isToast } = this.props
    clearInterval(this.timer)
    if (!backButtonClose && !isToast) {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }
  }

  onBackPress = () => {
    return true
  }

  close = () => {
    this.props.onClose()
  }

  modalClose = () => {
    this.refs.modal && this.refs.modal.close()
  }

  onOk = () => {
    const { onOk } = this.props
    onOk && this.props.onOk()
  }

  onCancel = () => {
    const { onCancel } = this.props
    onCancel && this.props.onCancel()
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
      backdrop,
      position,
      title,
      content,
      backdropOpacity,
      contentAlign,
      animation,
      icon,
      backButtonClose,
      confirm,
      buttons,
      buttonVertical,
      divide,
      style,
      customContent,
      contentStyle,
      autoWidth,
      width,
      contentMaxHeight,
      backdropPressToClose,
      okText,
      cancelText,
      offsetY,
      borderRadius,
      duration
    } = this.props
    const aniScale = this.state.ani.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1]
    })
    const aniY = this.state.ani.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0]
    })
    const iconCom = icon ? <View style={styles.bigIcon}>
      {icon}
    </View> : null
    let btns = [{
      title: duration > 0 ? `${okText}(${this.state.time}s)` : okText,
      color: '',
      onPress: this.onOk
    }]
    if (confirm) {
      btns = [{
        title: cancelText,
        type: 'cancel',
        onPress: this.onCancel
      }, {
        title: okText,
        type: 'primary',
        onPress: this.onOk
      }]
    }
    if (buttons) {
      btns = buttons
    }
    let btnsCom = []
    btns.forEach((v, k) => {
      btnsCom.push(<Button
        full
        ghost
        key={`btn_${k}`}
        type={v.type}
        style={[styles.button, !buttonVertical ? {
          flex: 1
        } : '', v.style]}
        textStyle={v.color ? {
          color: v.color
        } : ''}
        onPress={() => {
          v.onPress()
          this.modalClose()
        }}
      >{v.title}</Button>)
      if (btns.length > 1 && k < btns.length && divide) {
        btnsCom.push(<HairLine key={`line_${k}`} vertical={!buttonVertical} />)
      }
    })
    return (
      <Modal
        backdrop={backdrop}
        backButtonClose={backButtonClose}
        coverScreen={false}
        swipeToClose={false}
        position={position}
        entry={'top'}
        ref={'modal'}
        backdropOpacity={backdropOpacity}
        backdropPressToClose={backdropPressToClose}
        animationDuration={0}
        style={[styles.modal, style, offsetY && position === 'bottom' ? {
          position: 'relative',
          bottom: offsetY
        } : '']}
        onClosed={this.close}
      >
        <Animated.View style={[styles.modalBox, autoWidth ? '' : {
          width: width || Theme.modal_message_width
        }, {
          transform: animation ? [{ scale: aniScale }, { translateY: aniY }] : []
        }, borderRadius ? { borderRadius } : '']}>
          <View style={[styles.header]}>
            {title === null ? null : <Text style={styles.title}>{title}</Text>}
          </View>
          {!customContent ? (
            <View style={[styles.content, contentStyle]}>
              {iconCom}
              <ScrollView style={{
                maxHeight: contentMaxHeight || Theme.modal_content_max_height
              }} alwaysBounceVertical={false}>
                <Text style={[styles.contentText, { textAlign: contentAlign }]}>
                  {content}
                </Text>
              </ScrollView>
            </View>
          ) : (
            <View style={[styles.content, contentStyle]}>
              {customContent}
            </View>
          )}
          {btnsCom.length > 0 ? <HairLine size={1} style={{
            transform: [{ scaleY: 0.5 }]
          }} /> : null}
          {btnsCom.length > 0 ? <View style={{
            flexDirection: buttonVertical ? 'column' : 'row'
          }}>
            {btnsCom}
          </View> : null}
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
    borderRadius: 6,
    backgroundColor: '#fff',
    height: 'auto',
    overflow: 'hidden'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: Theme.modal_title_font_size,
    color: Theme.modal_title_font_color
  },
  content: {
    paddingVertical: 20
  },
  contentText: {
    paddingHorizontal: 20,
    fontSize: Theme.modal_content_font_size,
    color: Theme.modal_content_font_color,
    textAlign: Theme.modal_content_text_align
  },
  button: {
    borderWidth: 0,
    height: Theme.modal_button_height
  },
  bigIcon: {
    alignItems: 'center',
    marginBottom: 10
  }
}
