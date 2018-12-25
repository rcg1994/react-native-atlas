import React, { Component } from 'react'
import { View, ViewPropTypes } from 'react-native'
import { ATCheckBox } from "../index"
import PropTypes from 'prop-types'
import { Colors } from "../theme"

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || props.defaultValue || [],
    }
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    options: PropTypes.array,
    onChange: PropTypes.func,
    optionStyle: ViewPropTypes.style,
    tintColor: PropTypes.string,
    max: PropTypes.number,
    onHint: PropTypes.func
  }

  static defaultProps = {
    options: [],
    optionStyle: [],
    tintColor: Colors.primary,
    max: 1000,
    onHint: () => {}
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      this.setState({
        value: nextProps.value || nextProps.defaultValue || [],
      })
    }
  }

  onToggleOption = (option) => {

    const optionIndex = this.state.value.indexOf(option.value)
    let value = [...this.state.value]

    if(optionIndex === -1) {
      if(value.length >= this.props.max) {
        this.props.onHint()
        return
      } else {
        value.push(option.value)
      }
    } else {
      value.splice(optionIndex, 1)
    }

    // 避免外部和内部同时改 value
    if (!('value' in this.props)) {
      this.setState({ value });
    }

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const {
      value,
      options,
      onChange,
      optionStyle,
      tintColor,
      style,
      ...eProps 
    } = this.props
    return (
      <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>
        {
          options.map(opt => {
            const {value, label, style, ...extraOptProps} = opt
            return (
              <ATCheckBox
                key={opt.value}
                checked={this.state.value.includes(opt.value)}
                rightText={opt.label}
                rightTextStyle={{ marginLeft: 9, fontSize: 14 }}
                style={[{ width: '33%', marginBottom: 20 }, optionStyle, opt.style]}
                tintColor={Colors.primary}
                onPress={() => this.onToggleOption(opt)}
                {...eProps}
                {...extraOptProps}
              />
            )
          })
        }
      </View>
    )
  }
}