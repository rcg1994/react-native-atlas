import PropTypes from 'prop-types'
import React, { Component, Children } from 'react'
import {
  Text,
  TouchableHighlight,
  View,
  ViewPropTypes
} from 'react-native'
import throttle from 'lodash.throttle'
import Helper from '../tool/Help'
import { Colors, Theme } from '../theme'

function coalesceNonElementChildren (children, coalesceNodes) {
  var coalescedChildren = []

  var contiguousNonElements = []
  Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      contiguousNonElements.push(child)
      return
    }

    if (contiguousNonElements.length) {
      coalescedChildren.push(
        coalesceNodes(contiguousNonElements, coalescedChildren.length)
      )
      contiguousNonElements = []
    }

    coalescedChildren.push(child)
  })

  if (contiguousNonElements.length) {
    coalescedChildren.push(
      coalesceNodes(contiguousNonElements, coalescedChildren.length)
    )
  }

  return coalescedChildren
}

const systemButtonOpacity = Theme.touchable_opacity

export default class Touchable extends Component {
  static propTypes = {
    ...TouchableHighlight.propTypes,
    accessibilityLabel: PropTypes.string,
    allowFontScaling: Text.propTypes.allowFontScaling,
    containerStyle: ViewPropTypes.style,
    disabledContainerStyle: ViewPropTypes.style,
    disabled: PropTypes.bool,
    updatePress: PropTypes.bool,
    style: Text.propTypes.style,
    styleDisabled: Text.propTypes.style,
    childGroupStyle: ViewPropTypes.style
  }

  static defaultProps = {
    style: {},
    throttle: Theme.touchable_throttle,
    updatePress: Theme.touchable_updatePress,
    throttleWaiting: Theme.touchable_waiting
  }

  componentWillReceiveProps (nextProps) {
    // Typical usage (don't forget to compare props):
    if (nextProps.throttle && nextProps.updatePress && this.props.onPress !== nextProps.onPress) {
      this.onPress = throttle(nextProps.onPress, nextProps.throttleWaiting, {
        'leading': true,
        'trailing': false
      })
    }
  }

  onPress = throttle(this.props.onPress, this.props.throttleWaiting, {
    'leading': true,
    'trailing': false
  })

  render () {
    const { throttle, onPress, ...props } = this.props
    let touchableProps = {
      activeOpacity: this._computeActiveOpacity()
    }
    let containerStyle = [
      this.props.containerStyle,
      this.props.disabled ? this.props.disabledContainerStyle : null
    ]

    if (!this.props.disabled) {
      // 优化响应 不然调用 setState 时候会阻塞
      touchableProps.onPress = (e) => {
        // 保存事件响应，不然异步无法获取
        e.persist()
        requestAnimationFrame(() => {
          throttle ? this.onPress(e) : onPress(e)
        })
      }
      touchableProps.onPressIn = this.props.onPressIn
      touchableProps.onPressOut = this.props.onPressOut
      touchableProps.onLongPress = this.props.onLongPress
      touchableProps.delayPressIn = this.props.delayPressIn
      touchableProps.delayPressOut = this.props.delayPressOut
      touchableProps.delayLongPress = this.props.delayLongPress
    }

    return (
      <TouchableHighlight
        {...touchableProps}
        style={this.props.style}
        underlayColor={this.props.underlayColor || Theme.touchable_underlay_color || Helper.LightenDarkenColor(Theme.button_underlay_light, Colors.primary)}
        {...props}
      >
        {this._renderGroupedChildren()}
      </TouchableHighlight>
    )
  }

  _renderGroupedChildren () {
    let { disabled } = this.props
    let style = [
      styles.text,
      disabled ? styles.disabledText : null,
      this.props.style,
      disabled ? this.props.styleDisabled : null
    ]
    let childGroupStyle = [
      // styles.group,
      this.props.childGroupStyle
    ]

    let children = coalesceNonElementChildren(this.props.children, (children, index) => {
      return (
        <Text key={index} style={style} allowFontScaling={this.props.allowFontScaling}>
          {children}
        </Text>
      )
    })

    switch (children.length) {
      case 0:
        return null
      case 1:
        return children[0]
      default:
        return <View style={childGroupStyle}>{children}</View>
    }
  }

  _computeActiveOpacity () {
    if (this.props.disabled) {
      return 1
    }
    return this.props.activeOpacity !== null ? this.props.activeOpacity : systemButtonOpacity
  }
};

const styles = Helper.createStyle({
  text: {
    color: '#007aff',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center'
  },
  disabledText: {
    color: '#dcdcdc'
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
