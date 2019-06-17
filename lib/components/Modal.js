import React from 'react'
import { Text, View } from 'react-native'
import R from 'ramda'
import RootSiblings from './RootSiblings'
import ModalMessage from './ModalMessage'
import ModalSelector from './ModalSelector'
import ModalNormal from './ModalNormal'
import ModalPrompt from './ModalPrompt'
import Spin from './Spin'
import { Theme } from '../theme'

let uuid = 0
const elements = {}

const destroy = (currentId) => {
  if (elements[currentId] && elements[currentId].destroy) {
    elements[currentId].destroy()
    delete elements[currentId]
  }
}

const modal = (options = {}) => {
  let currentId = uuid
  let modal = null
  const props = {
    render: options.render || (() => null),
    backdropOpacity: R.is(Number, options.backdropOpacity) ? options.backdropOpacity : 0.5,
    animationDuration: R.is(Number, options.animationDuration) ? options.animationDuration : 200,
    backButtonClose: !R.isNil(options.backButtonClose) ? options.backButtonClose : true,
    animation: options.animation || false,
    swipeToClose: options.swipeToClose || false,
    float: options.float || false,
    entry: options.entry || 'bottom',
    position: options.position || 'center',
    backdropPressToClose: !R.isNil(options.backdropPressToClose) ? options.backdropPressToClose : true,
    backdrop: !R.isNil(options.backdrop) ? options.backdrop : true
  }
  if (props.float) {
    props.x = options.x
    props.y = options.y
  }
  elements[currentId] = new RootSiblings(
    <ModalNormal
      ref={v => (modal = v)}
      {...props}
      onClose={() => destroy(currentId)}
    />)
  uuid++
  return {
    close: () => modal && modal.modalClose && modal.modalClose()
  }
}

const message = (options = {}) => {
  let currentId = uuid
  const props = {
    title: (options.title === null || options.title) ? options.title : '提示',
    content: options.content || '提示信息为空',
    contentAlign: options.contentAlign || 'center',
    icon: options.icon || null,
    width: options.width || null,
    contentMaxHeight: options.contentMaxHeight || null,
    backButtonClose: options.backButtonClose || false,
    okText: options.okText || '我知道了',
    onOk: options.onOk || (() => {}),
    backdropPressToClose: options.backdropPressToClose || false,
    backdropOpacity: R.is(Number, options.backdropOpacity) ? options.backdropOpacity : 0.5,
    duration: options.duration || 0,
    position: options.position || 'center',
    backdrop: !R.isNil(options.backdrop) ? options.backdrop : true,
    animation: !R.isNil(options.animation) ? options.animation : true
  }
  elements[currentId] = new RootSiblings(
    <ModalMessage
      {...props}
      onClose={() => destroy(currentId)}
    />)
  uuid++
  return {
    close: () => destroy(currentId)
  }
}

const confirm = (options = {}) => {
  let currentId = uuid
  const props = {
    title: (options.title === null || options.title) ? options.title : '提示',
    content: options.content || '提示信息为空',
    contentAlign: options.contentAlign || 'center',
    icon: options.icon || null,
    backButtonClose: options.backButtonClose || false,
    buttonVertical: options.buttonVertical || false,
    buttons: options.buttons || null,
    width: options.width || null,
    onOk: options.onOk || (() => {}),
    okText: options.okText || '确定',
    onCancel: options.onCancel || (() => {}),
    cancelText: options.cancelText || '取消',
    contentMaxHeight: options.contentMaxHeight || null,
    backdropPressToClose: !R.isNil(options.backdropPressToClose) ? options.backdropPressToClose : true,
    divide: !R.isNil(options.divide) ? options.divide : true,
    animation: !R.isNil(options.animation) ? options.animation : true,
    backdropOpacity: R.is(Number, options.backdropOpacity) ? options.backdropOpacity : 0.5
  }
  elements[currentId] = new RootSiblings(
    <ModalMessage
      confirm
      {...props}
      onClose={() => destroy(currentId)}
    />)
  uuid++
  return {
    close: () => destroy(currentId)
  }
}

const prompt = (options = {}) => {
  let currentId = uuid
  const props = {
    title: (options.title === null || options.title) ? options.title : '提示',
    backButtonClose: !R.isNil(options.backButtonClose) ? options.backButtonClose : true,
    buttonVertical: options.buttonVertical || false,
    buttons: options.buttons || null,
    width: options.width || null,
    onOk: options.onOk || (() => {}),
    okText: options.okText || '确定',
    onCancel: options.onCancel || (() => {}),
    cancelText: options.cancelText || '取消',
    contentMaxHeight: options.contentMaxHeight || null,
    backdropPressToClose: options.backdropPressToClose || false,
    divide: !R.isNil(options.divide) ? options.divide : true,
    autoFocus: !R.isNil(options.autoFocus) ? options.autoFocus : true,
    animation: !R.isNil(options.animation) ? options.animation : true,
    backdropOpacity: R.is(Number, options.backdropOpacity) ? options.backdropOpacity : 0.5
  }
  elements[currentId] = new RootSiblings(
    <ModalPrompt
      label={options.label}
      inputStyle={options.inputStyle}
      placeholder={options.placeholder}
      {...props}
      onClose={() => destroy(currentId)}
    />
  )
  uuid++
  return {
    close: () => destroy(currentId)
  }
}

const loading = (options = {}) => {
  let currentId = uuid
  const props = {
    loading: true,
    duration: options.duration || 0,
    backButtonClose: options.backButtonClose || false,
    backdropPressToClose: !R.isNil(options.backdropPressToClose) ? options.backdropPressToClose : true,
    backdropOpacity: R.is(Number, options.backdropOpacity) ? options.backdropOpacity : Theme.modal_loading_backdrop_opacity
  }
  elements[currentId] = new RootSiblings(
    <ModalMessage
      confirm
      autoWidth
      title={null}
      buttons={[]}
      position='center'
      backdrop={true}
      animation={Theme.modal_loading_animation}
      {...props}
      contentStyle={{
        paddingVertical: Theme.modal_loading_padding,
        backgroundColor: Theme.modal_loading_background_color
      }}
      customContent={<View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Theme.modal_loading_padding || 20
      }}>
        <Spin color={Theme.modal_loading_font_color} />
        <Text style={{
          fontSize: Theme.modal_loading_font_size,
          color: Theme.modal_loading_font_color,
          textAlign: 'center'
        }}>{options.content || '加载中...'}</Text>
      </View>}
      onClose={() => destroy(currentId)}
    />)
  uuid++
  return {
    close: () => destroy(currentId)
  }
}

const select = (options = {}, e = null) => {
  let currentId = uuid
  const props = {
    backButtonClose: !R.isNil(options.backButtonClose) ? options.backButtonClose : true,
    backdropPressToClose: !R.isNil(options.backdropPressToClose) ? options.backdropPressToClose : true,
    buttons: options.buttons || [],
    bottom: options.bottom || false,
    float: options.float || false,
    width: options.width || null,
    onSelect: options.onSelect || (() => {})
  }
  if (props.float) {
    props.x = e.nativeEvent.pageX
    props.y = e.nativeEvent.pageY
  }
  elements[currentId] = new RootSiblings(
    <ModalSelector
      {...props}
      onClose={() => destroy(currentId)}
    />)
  uuid++
  return {
    close: () => destroy(currentId)
  }
}

const toast = (options = {}) => {
  let currentId = uuid
  const props = {
    loading: true,
    duration: options.duration || Theme.modal_toast_duration,
    backButtonClose: options.backButtonClose || false,
    position: options.position || Theme.modal_toast_position,
    offsetY: R.is(Number, options.offsetY) ? options.offsetY : Theme.modal_toast_offsetY
  }
  elements[currentId] = new RootSiblings(
    <ModalMessage
      isToast
      confirm
      autoWidth
      title={null}
      buttons={[]}
      {...props}
      backdrop={false}
      animation={false}
      contentStyle={{
        paddingHorizontal: Theme.modal_toast_padding_horizontal,
        paddingVertical: Theme.modal_toast_padding_vertical,
        backgroundColor: Theme.modal_toast_background_color,
        maxWidth: Theme.modal_toast_max_width,
        borderRadius: Theme.modal_toast_border_radius
      }}
      borderRadius={Theme.modal_toast_border_radius}
      customContent={<View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: Theme.modal_toast_font_size,
          lineHeight: Theme.modal_toast_font_size * 1.5,
          color: Theme.modal_toast_font_color,
          textAlign: Theme.modal_toast_text_align
        }}>{options.content || '提示信息为空'}</Text>
      </View>}
      onClose={() => destroy(currentId)}
    />)
  uuid++
  return {
    close: () => destroy(currentId)
  }
}

export default {
  modal,
  create: modal,
  message,
  confirm,
  prompt,
  loading,
  select,
  toast
}
