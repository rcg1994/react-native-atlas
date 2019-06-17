import React, { Component } from 'react'
import { View } from 'react-native'
import ModalMessage from './ModalMessage'
import Input from './Input'
import { Theme, Metrics } from '../theme'

export default class ModalPrompt extends Component {
  state = {
    value: ''
  }

  render () {
    const { onOk, label, autoFocus, placeholder, inputStyle, ...props } = this.props
    return <ModalMessage
      confirm
      customContent={
        <View style={{ paddingHorizontal: 20 }}>
          <Input
            autoFocus={autoFocus}
            value={this.state.value}
            onChangeText={v => this.setState({ value: v })}
            style={[inputStyle || {}, {
              paddingHorizontal: 0,
              borderWidth: 0,
              borderBottomWidth: Metrics.borderWidth,
              borderBottomColor: Theme.base_border_color
            }]}
            label={label || null}
            placeholder={placeholder || '请输入'} />
        </View>
      }
      onOk={() => {
        onOk(this.state.value)
      }}
      {...props}
    />
  }
}
