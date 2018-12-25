import React, { Component } from 'react'
import { RefreshControl as RefreshControlRN } from 'react-native'
import Colors from '../theme/Colors'
import Theme from '../theme/Theme'

export default class RefreshControl extends Component {
  render () {
    const {
      ...props
    } = this.props
    return (
      <RefreshControlRN
        titleColor={Theme.refreshControl_color || Colors.primary}
        tintColor={Theme.refreshControl_color || Colors.primary}
        colors={[Theme.refreshControl_color || Colors.primary]}
        {...props}
      />
    )
  }
}
