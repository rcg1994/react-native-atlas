import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types'
import { Colors } from '../theme'

export default class Radio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: this.props.checked
    }
  }

  static propTypes = {
    ...(ViewPropTypes || View.PropTypes),
    render: PropTypes.func,
    label: PropTypes.string,
    labelView: PropTypes.element,
    labelStyle: Text.propTypes.style,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    checkedView: PropTypes.element,
    unCheckedView: PropTypes.element,
    checkedViewStyle: ViewPropTypes.style,
    unCheckedViewStyle: ViewPropTypes.style
  }
  static defaultProps = {
    onChange: () => { },
    labelStyle: {},
    checkedViewStyle: {},
    unCheckedViewStyle: {}
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked })
    }
  }

  onChange () {
    // 当有 checked 从外部传入时，内部不再主动更新状态
    if (!('checked' in this.props)) {
      this.setState({ checked: !this.state.checked })
    }

    this.props.onChange(!this.state.checked)
  }

  _renderRight () {
    if (this.props.labelView) return this.props.labelView
    if (!this.props.label) return null
    return (
      <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
    )
  }

  _renderLeft () {
    if (this.state.checked) {
      return this.props.checkedView ? this.props.checkedView : this.genCheckedView()
    } else {
      return this.props.unCheckedView ? this.props.unCheckedView : this.genCheckedView()
    }
  }

  genCheckedView () {
    const { checkedViewStyle, unCheckedViewStyle } = this.props
    return (
      <View
        style={[
          styles.defaultCheckView,
          { backgroundColor: this.state.checked ? Colors.primary : '#d8d8d8' },
          this.state.checked ? checkedViewStyle : unCheckedViewStyle
        ]}
      ></View>
    )
  }

  render () {
    const { style, render, label } = this.props
    return (
      <TouchableHighlight
        onPress={() => this.onChange()}
        underlayColor='transparent'
        disabled={this.props.disabled}
      >
        {
          render ? render(this.state.checked, label, style) : (
            <View style={[styles.container, style]}>
              {this._renderLeft()}
              {this._renderRight()}
            </View>
          )
        }
      </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  defaultCheckView: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  label: {
    marginLeft: 5,
    fontSize: 15,
    color: '#333'
  }
})
