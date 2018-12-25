import React, { Component } from 'react'
import { View, ViewPropTypes } from 'react-native'
import Radio from "./Radio"
import PropTypes from 'prop-types'

export default class RadioGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || props.defaultValue || [],
    }
  }

  static propTypes = {
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    options: PropTypes.array,
    onChange: PropTypes.func,
    optionStyle: ViewPropTypes.style,
  }

  static defaultProps = {
    options: [],
    optionStyle: [],
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      this.setState({
        value: nextProps.value || nextProps.defaultValue || [],
      })
    }
  }

  onToggleOption = (option) => {
    if(option.value === this.state.value) return;

    // 避免外部和内部同时改 value
    if (!('value' in this.props)) {
      this.setState({ value: option.value });
    }

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(option.value);
    }
  }

  render() {
    const {
      value,
      options,
      onChange,
      optionStyle,
      style,
      ...eProps 
    } = this.props
    return (
      <View style={[{ flexDirection: 'row' }, style]}>
        {
          options.map(opt => {
            const {value, label, style, ...extraOptProps} = opt
            return (
              <Radio
                key={opt.value}
                checked={this.state.value === opt.value}
                label={opt.label}
                style={[{}, optionStyle, opt.style]}
                onChange={() => this.onToggleOption(opt)}
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